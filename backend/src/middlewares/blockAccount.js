const db = require('../db/connection');

/**
 * Middleware para checar se a conta está temporariamente bloqueada
 * ou se atingiu o teto de tentativas por email (10 tentativas / 15 min)
 */
function checkAccountLock(req, res, next) {
  const email = (req.body.email || '').trim().toLowerCase();

  if (!email) {
    return next();
  }

  try {
    // 1. Verifica se houve 10 tentativas falhas por esse email nos últimos 15 minutos
    const recentFailures = db.prepare(`
      SELECT COUNT(*) as total 
      FROM login_attempts 
      WHERE lower(email) = ? 
        AND success = 0 
        AND created_at > datetime('now', '-15 minutes')
    `).get(email);

    if (recentFailures && recentFailures.total >= 10) {
      return res.status(429).json({
        status: 'error',
        message: 'Muitas tentativas incorretas para este email. Aguarde 15 minutos antes de tentar novamente.',
      });
    }

    // 2. Verifica se o usuário já está com locked_until ativo
    const user = db.prepare(`
      SELECT id, locked_until, failed_login_attempts 
      FROM users 
      WHERE lower(email) = ?
    `).get(email);

    if (user && user.locked_until) {
      const lockDate = new Date(user.locked_until);
      const now = new Date();

      if (lockDate > now) {
        const remainingMinutes = Math.ceil((lockDate - now) / (60 * 1000));
        return res.status(423).json({
          status: 'error',
          message: `Conta temporariamente bloqueada por segurança. Tente novamente em ${remainingMinutes} minuto(s) ou recupere sua senha.`,
        });
      } else {
        // Bloqueio expirou: limpa o status
        db.prepare(`
          UPDATE users 
          SET locked_until = NULL, failed_login_attempts = 0 
          WHERE id = ?
        `).run(user.id);
      }
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = checkAccountLock;
