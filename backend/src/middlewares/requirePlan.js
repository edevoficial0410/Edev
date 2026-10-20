const db = require('../db/connection');

/**
 * Middleware para proteger aulas e módulos pagos da plataforma.
 * - Fundadores (is_founder = 1 ou plan = 'founder'): Acesso liberado vitalício.
 * - Assinantes (monthly ou yearly ativos): Acesso liberado até a expiração.
 * - Usuários gratuitos (free): Bloqueados com HTTP 403.
 */
function requirePlan(req, res, next) {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      status: 'error',
      code: 'UNAUTHORIZED',
      message: 'Autenticação necessária para acessar este conteúdo.',
    });
  }

  const user = db.prepare('SELECT id, is_founder, plan, plan_expires_at FROM users WHERE id = ?').get(userId);

  if (!user) {
    return res.status(401).json({
      status: 'error',
      code: 'USER_NOT_FOUND',
      message: 'Usuário não encontrado.',
    });
  }

  // 1. Fundador tem acesso vitalício irrestrito
  if (user.is_founder === 1 || user.plan === 'founder') {
    return next();
  }

  // 2. Assinantes com plano ativo e não expirado
  if (user.plan === 'monthly' || user.plan === 'yearly') {
    if (!user.plan_expires_at || new Date(user.plan_expires_at) > new Date()) {
      return next();
    }
  }

  // 3. Usuário no plano gratuito (ou plano expirado) tentando acessar conteúdo pago
  return res.status(403).json({
    status: 'error',
    code: 'SUBSCRIPTION_REQUIRED',
    message: 'Assine para acessar todos os módulos. R$ 49,90/mês ou R$ 299,90/ano.',
    plan: user.plan || 'free',
  });
}

module.exports = requirePlan;
