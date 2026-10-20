const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');
const checkAccountLock = require('../middlewares/blockAccount');
const {
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
  resetPasswordLimiter,
} = require('../middlewares/rateLimiter');
const {
  validateRegister,
  validateLogin,
  validateRefreshToken,
  validateForgotPassword,
  validateResetPassword,
} = require('../utils/validators');

// 1. Cadastro de novo aluno (máximo 3 cadastros/hora por IP)
router.post('/register', registerLimiter, validateRegister, authController.register);

// 2. Login com email + senha (5 tentativas/15min por IP, 10 falhas/15min por email, bloqueio após 10 falhas)
router.post('/login', loginLimiter, checkAccountLock, validateLogin, authController.login);

// 3. Logout (revogação da sessão / refresh token)
router.post('/logout', validateRefreshToken, authController.logout);

// 4. Renovação de token de acesso com rotação de refresh token
router.post('/refresh', validateRefreshToken, authController.refresh);

// 5. Perfil do aluno autenticado
router.get('/me', authMiddleware, authController.me);

// 6. Solicitação de recuperação de senha (3 tentativas/hora por IP, sem enumeração)
router.post('/forgot-password', forgotPasswordLimiter, validateForgotPassword, authController.forgotPassword);

// 7. Conclusão da redefinição de senha com invalidação de sessões prévias
router.post('/reset-password', resetPasswordLimiter, validateResetPassword, authController.resetPassword);

module.exports = router;
