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
      SELECT id, name, email, avatar_url, is_founder, plan, plan_expires_at, created_at, last_login 
      FROM users 
      WHERE id = ?
    `).get(userId);

    if (!user) {
      const error = new Error('Usuário não encontrado.');
      error.statusCode = 404;
      throw error;
    }

    return user;
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
