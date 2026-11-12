const db = require('../db/connection');
const { hashPassword, comparePassword } = require('../utils/password');
const {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenExpiresAt,
  generatePasswordResetToken,
  hashToken,
} = require('../utils/tokens');
const {
  sendPasswordResetEmail,
  sendPasswordChangedConfirmation,
} = require('../services/emailService');
const { safeJsonParse } = require('../utils/jsonHelpers');
const env = require('../config/env');                     // singleton — carregado uma vez no boot
const { OAuth2Client } = require('google-auth-library'); // idem

class AuthService {
  /**
   * Registra um novo usuário
   */
  async register({ name, email, password, ip, userAgent, plan: requestedPlan }) {
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Verifica se email já existe
    const existing = db.prepare('SELECT id FROM users WHERE lower(email) = ?').get(normalizedEmail);
    if (existing) {
      // Prevenção de enumeração: sinaliza duplicidade para que o controller responda de forma neutra
      console.log(`[SECURITY] Tentativa de cadastro com email já existente: ${normalizedEmail} | IP: ${ip}`);
      return { alreadyExists: true };
    }

    // 2. Gera hash da senha com bcrypt (fator de custo 12)
    const passwordHash = await hashPassword(password);

    // 3. Determina se o usuário é Fundador (primeiros 10 usuários) ou Freemium
    // Permite forçar plano free para testes de desenvolvimento
    const totalUsers = db.prepare('SELECT count(*) as count FROM users').get().count;
    let isFounder = totalUsers < 10 ? 1 : 0;
    let plan = isFounder === 1 ? 'founder' : 'free';

    if (requestedPlan === 'free' || normalizedEmail.includes('free@') || normalizedEmail.includes('+free@') || normalizedEmail.includes('teste_free')) {
      isFounder = 0;
      plan = 'free';
    }

    // 4. Insere novo usuário no SQLite
    const insertUser = db.prepare(`
      INSERT INTO users (name, email, password_hash, is_founder, plan, plan_expires_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NULL, datetime('now'), datetime('now'))
    `);
    const result = insertUser.run(name.trim(), normalizedEmail, passwordHash, isFounder, plan);
    const userId = result.lastInsertRowid;

    // 5. Gera tokens de acesso e refresh
    const accessToken = generateAccessToken({ userId, email: normalizedEmail });
    const refreshToken = generateRefreshToken();
    const expiresAt = getRefreshTokenExpiresAt();

    // 6. Salva a sessão no banco
    db.prepare(`
      INSERT INTO sessions (user_id, refresh_token, user_agent, ip_address, expires_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(userId, refreshToken, userAgent || null, ip || null, expiresAt);

    console.log(`[SECURITY] Nova conta criada com sucesso - User ID: ${userId} | Email: ${normalizedEmail} | Plano: ${plan} (Fundador: ${isFounder}) | IP: ${ip}`);

    return {
      alreadyExists: false,
      user: {
        id: userId,
        name: name.trim(),
        email: normalizedEmail,
        avatar_url: null,
        is_founder: isFounder,
        plan,
        plan_expires_at: null,
        study_profile: null,
        created_at: new Date().toISOString(),
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Autentica usuário com email e senha
   */
  async login({ email, password, ip, userAgent }) {
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Busca usuário pelo email
    const user = db.prepare('SELECT * FROM users WHERE lower(email) = ?').get(normalizedEmail);

    if (!user) {
      // Registra tentativa falha (auditoria)
      this.recordLoginAttempt(normalizedEmail, ip, 0);
      console.log(`[SECURITY] Login falhou (usuário inexistente): ${normalizedEmail} | IP: ${ip}`);
      
      const error = new Error('Email ou senha inválidos.');
      error.statusCode = 401;
      throw error;
    }

    // 2. Verifica se a conta está temporariamente bloqueada
    if (user.locked_until) {
      const lockTime = new Date(user.locked_until);
      const now = new Date();
      if (lockTime > now) {
        const remainingMinutes = Math.ceil((lockTime - now) / (60 * 1000));
        const error = new Error(`Conta temporariamente bloqueada por segurança. Tente novamente em ${remainingMinutes} minuto(s) ou recupere sua senha.`);
        error.statusCode = 423; // Locked
        throw error;
      }
    }

    // 3. Compara senha usando bcrypt
    const passwordValid = await comparePassword(password, user.password_hash);

    if (!passwordValid) {
      // Incrementa falhas e verifica necessidade de bloqueio
      const newFailures = (user.failed_login_attempts || 0) + 1;
      this.recordLoginAttempt(normalizedEmail, ip, 0);

      if (newFailures >= 10) {
        // Bloqueia conta por 30 minutos
        db.prepare(`
          UPDATE users 
          SET failed_login_attempts = ?, locked_until = datetime('now', '+30 minutes')
          WHERE id = ?
        `).run(newFailures, user.id);
        console.warn(`🚨 [SECURITY ALERT] Conta bloqueada por 30 minutos devido a 10 falhas consecutivas: ${normalizedEmail} | IP: ${ip}`);
      } else {
        db.prepare('UPDATE users SET failed_login_attempts = ? WHERE id = ?').run(newFailures, user.id);
        console.log(`[SECURITY] Senha incorreta (${newFailures}/10 falhas) para: ${normalizedEmail} | IP: ${ip}`);
      }

      const error = new Error('Email ou senha inválidos.');
      error.statusCode = 401;
      throw error;
    }

    // 4. Sucesso: zera falhas, atualiza last_login e remove bloqueio
    db.prepare(`
      UPDATE users 
      SET failed_login_attempts = 0, locked_until = NULL, last_login = datetime('now')
      WHERE id = ?
    `).run(user.id);

    this.recordLoginAttempt(normalizedEmail, ip, 1);

    // 5. Gera Access Token e Refresh Token
    const accessToken = generateAccessToken({ userId: user.id, email: user.email });
    const refreshToken = generateRefreshToken();
    const expiresAt = getRefreshTokenExpiresAt();

    // 6. Registra a sessão
    db.prepare(`
      INSERT INTO sessions (user_id, refresh_token, user_agent, ip_address, expires_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(user.id, refreshToken, userAgent || null, ip || null, expiresAt);

    console.log(`[SECURITY] Login bem-sucedido - User ID: ${user.id} | Email: ${user.email} | IP: ${ip}`);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        is_founder: user.is_founder ? 1 : 0,
        plan: user.plan || 'free',
        plan_expires_at: user.plan_expires_at || null,
        study_profile: safeJsonParse(user.study_profile, null),
        created_at: user.created_at,
        last_login: new Date().toISOString(),
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Encerra sessão do usuário (Logout)
   */
  async logout({ refreshToken }) {
    if (!refreshToken) return;
    db.prepare('DELETE FROM sessions WHERE refresh_token = ?').run(refreshToken);
  }

  /**
   * Renova o Access Token rotacionando o Refresh Token
   */
  async refresh({ refreshToken, ip, userAgent }) {
    // 1. Busca a sessão correspondente
    const session = db.prepare('SELECT * FROM sessions WHERE refresh_token = ?').get(refreshToken);

    if (!session) {
      const error = new Error('Sessão inválida ou expirada.');
      error.statusCode = 401;
      throw error;
    }

    // 2. Detecção de roubo de token: se o token já foi rotacionado (revoked = 1)
    if (session.revoked === 1) {
      // Invalida TODAS as sessões ativas deste usuário imediatamente
      db.prepare('DELETE FROM sessions WHERE user_id = ?').run(session.user_id);
      console.warn(`🚨 [SECURITY THEFT DETECTED] Tentativa de reuso de Refresh Token! Todas as sessões do usuário ${session.user_id} foram revogadas. IP: ${ip}`);

      const error = new Error('Tentativa de reutilização de sessão detectada. Por segurança, todas as suas sessões foram desconectadas.');
      error.statusCode = 401;
      throw error;
    }

    // 3. Verifica expiração da sessão
    if (new Date(session.expires_at) <= new Date()) {
      db.prepare('DELETE FROM sessions WHERE id = ?').run(session.id);
      const error = new Error('Sessão expirada. Por favor, realize login novamente.');
      error.statusCode = 401;
      throw error;
    }

    // 4. Busca dados do usuário
    const user = db.prepare('SELECT id, email FROM users WHERE id = ?').get(session.user_id);
    if (!user) {
      db.prepare('DELETE FROM sessions WHERE id = ?').run(session.id);
      const error = new Error('Usuário não encontrado.');
      error.statusCode = 401;
      throw error;
    }

    // 5. Rotação: marca a sessão anterior como revogada
    db.prepare('UPDATE sessions SET revoked = 1 WHERE id = ?').run(session.id);

    // 6. Emite novo Refresh Token e novo Access Token
    const newRefreshToken = generateRefreshToken();
    const newExpiresAt = getRefreshTokenExpiresAt();

    db.prepare(`
      INSERT INTO sessions (user_id, refresh_token, user_agent, ip_address, expires_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(user.id, newRefreshToken, userAgent || session.user_agent, ip || session.ip_address, newExpiresAt);

    const newAccessToken = generateAccessToken({ userId: user.id, email: user.email });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  /**
   * Retorna perfil do usuário logado (sem password_hash)
   */
  async getMe(userId) {
    const user = db.prepare(`
      SELECT id, name, email, avatar_url, is_founder, plan, plan_expires_at, created_at, last_login, study_profile 
      FROM users 
      WHERE id = ?
    `).get(userId);

    if (!user) {
      const error = new Error('Usuário não encontrado.');
      error.statusCode = 404;
      throw error;
    }

    user.study_profile = safeJsonParse(user.study_profile, null);

    return user;
  }

  /**
   * Autentica (ou cadastra) usuário via Google OAuth (GIS ID Token)
   *
   * Referência: https://developers.google.com/identity/openid-connect/openid-connect#an-id-tokens-payload
   *
   * Campos usados:
   *   sub            — Identificador imutável e único da conta Google. Nunca reutilizado.
   *                    É o identificador canônico; o e-mail pode mudar, o sub não.
   *   email          — Endereço de e-mail declarado pelo usuário na conta Google.
   *                    NÃO é garantidamente único nem estável (pode mudar). Não usar
   *                    como identificador primário (aviso explícito na documentação).
   *   email_verified — Boolean. Verdadeiro se o Google verificou que o usuário tem
   *                    acesso ao endereço. Necessário, mas NÃO suficiente para vincular
   *                    automaticamente uma conta com domínio de terceiro.
   *   hd             — Hosted Domain (Google Workspace / Cloud org). Presente SOMENTE
   *                    quando a conta pertence a uma organização gerenciada pelo Google.
   *                    A ausência indica conta de domínio não hospedado pelo Google.
   *
   * Estratégia de vinculação de conta existente por e-mail:
   *   O Google é autoridade sobre um endereço quando:
   *     a) É um endereço @gmail.com (emitido e controlado pelo Google), OU
   *     b) É um endereço de Google Workspace com `hd` presente no token (o Google
   *        gerencia o domínio e confirma a posse do endereço).
   *   Nestes casos, vinculação automática é segura.
   *
   *   Para qualquer outro domínio (ex: @outlook.com, @yahoo.com, domínio próprio
   *   sem Workspace), o Google NÃO é autoridade — um atacante poderia criar uma conta
   *   Google com aquele endereço. Nesses casos, retornamos `requiresPasswordConfirm`
   *   e o frontend deve solicitar a senha da conta Edev existente antes de vincular
   *   (via POST /api/auth/google/confirm-link).
   *
   * Unicidade:
   *   - `google_id` tem UNIQUE INDEX no banco (idx_users_google_id).
   *   - Um google_id não pode ser vinculado a dois usuários diferentes.
   *   - Após a vinculação, logins futuros passam pelo caminho google_id (sem e-mail lookup).
   */
  async googleAuth({ idToken, ip, userAgent }) {
    // env e OAuth2Client importados no topo do módulo (singleton — valor fixado no boot)

    if (!env.googleClientId) {
      console.error('[GOOGLE AUTH] GOOGLE_CLIENT_ID está vazio — verifique backend/.env e reinicie o servidor.');
      const error = new Error('Google OAuth não configurado no servidor.');
      error.statusCode = 503;
      throw error;
    }

    // Diagnóstico seguro: confirma qual audience chega ao verifyIdToken.
    // Exibe apenas os primeiros 12 caracteres — nunca o valor completo nos logs.
    console.log(`[GOOGLE AUTH] Verificando token | audience prefix: ${env.googleClientId.substring(0, 12)}... | IP: ${ip}`);

    // ── 1. Verificação criptográfica do ID token ──────────────────────────────
    //   verifyIdToken() valida: assinatura RS256, aud === googleClientId, exp, iss
    const client = new OAuth2Client(env.googleClientId);
    let payload;
    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: env.googleClientId,
      });
      payload = ticket.getPayload();
      console.log(`[GOOGLE AUTH] Token válido | email: ${payload.email} | IP: ${ip}`);
    } catch (verifyErr) {
      // "Wrong recipient" → audience mismatch; "Token used too late" → token expirado
      console.warn(`[GOOGLE AUTH] Falha na verificação | IP: ${ip} | Motivo: ${verifyErr.message}`);
      const error = new Error('Token Google inválido ou expirado. Tente novamente.');
      error.statusCode = 401;
      throw error;
    }

    // ── 2. email_verified obrigatório ─────────────────────────────────────────
    if (!payload.email_verified) {
      const error = new Error('O e-mail da conta Google não está verificado.');
      error.statusCode = 400;
      throw error;
    }

    const googleId  = payload.sub;   // identificador estável e imutável — usar sempre
    const email     = payload.email.trim().toLowerCase();
    const name      = payload.name || email.split('@')[0];
    const avatarUrl = payload.picture || null;
    const hd        = payload.hd || null;  // hosted domain (Google Workspace), ou null

    // ── 3. Lookup por sub (google_id) — caminho primário ─────────────────────
    let user = db.prepare('SELECT * FROM users WHERE google_id = ?').get(googleId);
    if (user) {
      // Usuário já vinculado — login direto
      return this._issueGoogleSession({ user, ip, userAgent });
    }

    // ── 4. Lookup por e-mail — conta Edev preexistente ───────────────────────
    const existingByEmail = db.prepare('SELECT * FROM users WHERE lower(email) = ?').get(email);

    if (existingByEmail) {
      // ── 4a. Determinar se Google é autoridade sobre este endereço ─────────
      //   @gmail.com  → Google emite e controla → autoridade confirmada
      //   hd presente → Google Workspace/Cloud org → autoridade confirmada
      //   Qualquer outro domínio → Google NÃO é autoridade → exige confirmação
      const isGmailAccount     = email.endsWith('@gmail.com') || email.endsWith('@googlemail.com');
      const isWorkspaceAccount = hd !== null;
      const googleIsAuthority  = isGmailAccount || isWorkspaceAccount;

      if (!googleIsAuthority) {
        // Retorna sinal para o frontend solicitar senha da conta Edev existente
        console.log(`[SECURITY] Google login: vinculação pendente (domínio não-Google) | Email: ${email} | IP: ${ip}`);
        return {
          requiresPasswordConfirm: true,
          email,          // para preencher o campo no frontend
          googleId,       // necessário para o confirm-link
          idToken,        // reenviado ao confirm-link para nova verificação
        };
      }

      // ── 4b. Google é autoridade — vincula automaticamente ─────────────────
      db.prepare(`
        UPDATE users
        SET google_id    = ?,
            avatar_url   = COALESCE(avatar_url, ?),
            updated_at   = datetime('now')
        WHERE id = ?
      `).run(googleId, avatarUrl, existingByEmail.id);

      user = db.prepare('SELECT * FROM users WHERE id = ?').get(existingByEmail.id);
      console.log(`[SECURITY] Conta vinculada ao Google (autoridade confirmada) - User ID: ${user.id} | Email: ${email} | Tipo: ${isGmailAccount ? 'Gmail' : 'Workspace/' + hd} | IP: ${ip}`);
      return this._issueGoogleSession({ user, ip, userAgent });
    }

    // ── 5. Nenhuma conta existente — criar novo usuário Google-only ───────────
    const totalUsers  = db.prepare('SELECT count(*) as count FROM users').get().count;
    const isFounder   = totalUsers < 10 ? 1 : 0;
    const plan        = isFounder === 1 ? 'founder' : 'free';
    const sentinelHash = `google_oauth_${googleId}`;  // nunca passa em comparePassword()

    const ins    = db.prepare(`
      INSERT INTO users
        (name, email, password_hash, google_id, avatar_url, is_founder, plan, plan_expires_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NULL, datetime('now'), datetime('now'))
    `);
    const result = ins.run(name, email, sentinelHash, googleId, avatarUrl, isFounder, plan);
    user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
    console.log(`[SECURITY] Novo usuário via Google - User ID: ${user.id} | Email: ${email} | Plano: ${plan} | IP: ${ip}`);

    return this._issueGoogleSession({ user, ip, userAgent });
  }

  /**
   * Vincula conta Google a uma conta Edev existente de domínio de terceiro,
   * exigindo autenticação com senha antes de vincular.
   * Chamado pelo frontend quando googleAuth retorna requiresPasswordConfirm: true.
   */
  async googleConfirmLink({ idToken, password, ip, userAgent }) {
    // env e OAuth2Client importados no topo do módulo (singleton — valor fixado no boot)

    if (!env.googleClientId) {
      const error = new Error('Google OAuth não configurado no servidor.');
      error.statusCode = 503;
      throw error;
    }

    // 1. Re-verifica o ID token (nunca confiar em dados passados sem re-verificação)
    const client = new OAuth2Client(env.googleClientId);
    let payload;
    try {
      const ticket = await client.verifyIdToken({ idToken, audience: env.googleClientId });
      payload = ticket.getPayload();
    } catch (verifyErr) {
      console.warn(`[GOOGLE AUTH] confirm-link: falha na verificação | IP: ${ip} | Motivo: ${verifyErr.message}`);
      const error = new Error('Token Google inválido ou expirado. Tente novamente.');
      error.statusCode = 401;
      throw error;
    }

    if (!payload.email_verified) {
      const error = new Error('O e-mail da conta Google não está verificado.');
      error.statusCode = 400;
      throw error;
    }

    const googleId  = payload.sub;
    const email     = payload.email.trim().toLowerCase();
    const avatarUrl = payload.picture || null;
    const hd        = payload.hd || null;

    // 2. Garantir que este google_id ainda não está vinculado a outra conta
    const alreadyLinked = db.prepare('SELECT id FROM users WHERE google_id = ?').get(googleId);
    if (alreadyLinked) {
      const error = new Error('Esta conta Google já está vinculada a outro usuário Edev.');
      error.statusCode = 409;
      throw error;
    }

    // 3. Buscar a conta Edev pelo e-mail
    const user = db.prepare('SELECT * FROM users WHERE lower(email) = ?').get(email);
    if (!user) {
      const error = new Error('Nenhuma conta Edev encontrada para este e-mail.');
      error.statusCode = 404;
      throw error;
    }

    // 4. Verificar a senha — confirma posse da conta Edev
    if (!user.password_hash || user.password_hash.startsWith('google_oauth_')) {
      // Conta já é Google-only — não tem senha para confirmar
      const error = new Error('Esta conta não possui senha cadastrada. Use Google para fazer login.');
      error.statusCode = 400;
      throw error;
    }

    const passwordValid = await comparePassword(password, user.password_hash);
    if (!passwordValid) {
      this.recordLoginAttempt(email, ip, 0);
      console.log(`[SECURITY] Senha incorreta no confirm-link Google | Email: ${email} | IP: ${ip}`);
      const error = new Error('Senha incorreta. Informe a senha da sua conta Edev para vincular.');
      error.statusCode = 401;
      throw error;
    }

    // 5. Senha correta — vincular o google_id
    db.prepare(`
      UPDATE users
      SET google_id    = ?,
          avatar_url   = COALESCE(avatar_url, ?),
          updated_at   = datetime('now')
      WHERE id = ?
    `).run(googleId, avatarUrl, user.id);

    const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(user.id);
    console.log(`[SECURITY] Conta vinculada ao Google via senha confirmada - User ID: ${updatedUser.id} | Email: ${email} | Domínio: ${hd || 'terceiro'} | IP: ${ip}`);

    return this._issueGoogleSession({ user: updatedUser, ip, userAgent });
  }

  /**
   * Método interno: gera sessão (access + refresh token) para usuário Google autenticado.
   * Extrai a lógica repetida dos dois fluxos acima.
   * @private
   */
  _issueGoogleSession({ user, ip, userAgent }) {
    db.prepare("UPDATE users SET last_login = datetime('now') WHERE id = ?").run(user.id);

    const accessToken  = generateAccessToken({ userId: user.id, email: user.email });
    const refreshToken = generateRefreshToken();
    const expiresAt    = getRefreshTokenExpiresAt();

    db.prepare(`
      INSERT INTO sessions (user_id, refresh_token, user_agent, ip_address, expires_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(user.id, refreshToken, userAgent || null, ip || null, expiresAt);

    return {
      user: {
        id:              user.id,
        name:            user.name,
        email:           user.email,
        avatar_url:      user.avatar_url,
        is_founder:      user.is_founder,
        plan:            user.plan,
        plan_expires_at: user.plan_expires_at,
        study_profile:   safeJsonParse(user.study_profile, null),
        created_at:      user.created_at,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Solicita redefinição de senha (Forgot Password)
   */
  async forgotPassword({ email, ip }) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = db.prepare('SELECT id, name, email FROM users WHERE lower(email) = ?').get(normalizedEmail);

    if (user) {
      // Invalida tokens anteriores não utilizados deste usuário
      db.prepare('UPDATE password_resets SET used = 1 WHERE user_id = ? AND used = 0').run(user.id);

      // Gera novo token seguro e hash
      const { rawToken, tokenHash, expiresAt } = generatePasswordResetToken();

      db.prepare(`
        INSERT INTO password_resets (user_id, token_hash, expires_at, used)
        VALUES (?, ?, ?, 0)
      `).run(user.id, tokenHash, expiresAt);

      // Despacha email com o link
      await sendPasswordResetEmail({
        to: user.email,
        name: user.name,
        resetToken: rawToken,
      });

      console.log(`[SECURITY] Solicitação de redefinição de senha gerada para: ${user.email} | IP: ${ip}`);
    } else {
      console.log(`[SECURITY] Solicitação de redefinição para email inexistente: ${normalizedEmail} | IP: ${ip}`);
    }

    // Sempre retorna a mesma mensagem neutra para prevenir enumeração de contas
    return {
      message: 'Se o email existir em nossa base, enviaremos as instruções para redefinição de senha.',
    };
  }

  /**
   * Conclui a redefinição de senha (Reset Password)
   */
  async resetPassword({ token, newPassword, ip }) {
    const tokenHash = hashToken(token);

    // 1. Busca token válido, não utilizado e não expirado
    const resetRecord = db.prepare(`
      SELECT * FROM password_resets 
      WHERE token_hash = ? 
        AND used = 0 
        AND expires_at > datetime('now')
    `).get(tokenHash);

    if (!resetRecord) {
      const error = new Error('Token de recuperação inválido ou expirado.');
      error.statusCode = 400;
      throw error;
    }

    // 2. Busca o usuário correspondente
    const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(resetRecord.user_id);
    if (!user) {
      const error = new Error('Usuário associado a este token não foi encontrado.');
      error.statusCode = 400;
      throw error;
    }

    // 3. Gera novo hash de senha com bcrypt (fator 12)
    const newHash = await hashPassword(newPassword);

    // 4. Atualiza a senha no banco, desbloqueia a conta e zera tentativas
    db.prepare(`
      UPDATE users 
      SET password_hash = ?, failed_login_attempts = 0, locked_until = NULL, updated_at = datetime('now')
      WHERE id = ?
    `).run(newHash, user.id);

    // 5. Marca o token como utilizado
    db.prepare('UPDATE password_resets SET used = 1 WHERE id = ?').run(resetRecord.id);

    // 6. Invalida TODAS as sessões abertas deste usuário (força novo login com a nova senha)
    db.prepare('DELETE FROM sessions WHERE user_id = ?').run(user.id);

    // 7. Envia email confirmatório de alteração de senha
    await sendPasswordChangedConfirmation({
      to: user.email,
      name: user.name,
    });

    console.log(`[SECURITY] Senha redefinida com sucesso para o usuário ${user.id} (${user.email}) | IP: ${ip}`);

    return {
      message: 'Senha redefinida com sucesso. Faça login com suas novas credenciais.',
    };
  }

  /**
   * Registra histórico de tentativa de login para auditoria e controle de força bruta
   */
  recordLoginAttempt(email, ip, success) {
    try {
      db.prepare(`
        INSERT INTO login_attempts (email, ip, success, created_at)
        VALUES (?, ?, ?, datetime('now'))
      `).run(email, ip || 'unknown', success);
    } catch (err) {
      console.error('Erro ao gravar login_attempt:', err.message);
    }
  }
}

module.exports = new AuthService();
