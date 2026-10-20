const rateLimit = require('express-rate-limit');

// Limiter geral da API: 100 requisições a cada 15 minutos por IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 'error',
    message: 'Muitas requisições originadas deste IP. Tente novamente em 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limiter para tentativas de login por IP: 5 tentativas a cada 15 minutos
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: 'error',
    message: 'Muitas tentativas de login a partir deste IP. Tente novamente após 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limiter para novos cadastros por IP: 3 contas por hora
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    status: 'error',
    message: 'Limite de criação de contas atingido para este IP. Tente novamente após 1 hora.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limiter para esqueci minha senha por IP: 3 tentativas por hora
const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    status: 'error',
    message: 'Muitas solicitações de recuperação de senha a partir deste IP. Tente novamente após 1 hora.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limiter para redefinição de senha por IP: 5 tentativas por hora
const resetPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    status: 'error',
    message: 'Muitas tentativas de redefinição de senha a partir deste IP. Tente novamente após 1 hora.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limiter para rotas de progresso do aluno: 60 requisições a cada 15 minutos por IP
const progressLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: {
    status: 'error',
    message: 'Muitas requisições de sincronização de progresso. Tente novamente em alguns minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limiter para envio de mensagens de contato: 3 mensagens por hora por IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    status: 'error',
    message: 'Limite de envio de mensagens atingido para este IP. Tente novamente após 1 hora.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limiter para webhook da Kiwify: 60 requisições a cada 15 minutos por IP
const webhookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: {
    status: 'error',
    message: 'Muitas requisições de webhook originadas deste IP. Tente novamente mais tarde.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  globalLimiter,
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
  resetPasswordLimiter,
  progressLimiter,
  contactLimiter,
  webhookLimiter,
};
