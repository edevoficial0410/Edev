const { body, validationResult } = require('express-validator');
const { validatePasswordStrength } = require('./password');

/**
 * Middleware para checar o resultado das validações do express-validator
 */
/**
 * Middleware para checar o resultado das validações do express-validator
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Dados de entrada inválidos.',
      errors: errors.array().map((err) => ({
        field: err.path || err.param,
        message: err.msg,
      })),
    });
  }
  next();
}

/**
 * Middleware para rejeitar campos extras não autorizados (proteção estrita contra Mass Assignment)
 */
function rejectExtraFields(allowedFields) {
  const allowedSet = new Set(allowedFields);
  return (req, res, next) => {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      return next();
    }
    const extra = Object.keys(req.body).filter((key) => !allowedSet.has(key));
    if (extra.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Campos não autorizados detectados no corpo da requisição: ${extra.join(', ')}`,
      });
    }
    next();
  };
}

/**
 * Validação para Cadastro (Register)
 */
const validateRegister = [
  rejectExtraFields(['name', 'email', 'password', 'plan']),
  body('name')
    .trim()
    .notEmpty().withMessage('O nome é obrigatório.')
    .isLength({ min: 2, max: 100 }).withMessage('O nome deve ter entre 2 e 100 caracteres.'),
  body('email')
    .trim()
    .notEmpty().withMessage('O email é obrigatório.')
    .isEmail().withMessage('Informe um endereço de email válido.')
    .isLength({ max: 255 }).withMessage('O email não pode ultrapassar 255 caracteres.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('A senha é obrigatória.')
    .custom((value) => {
      const check = validatePasswordStrength(value);
      if (!check.valid) {
        throw new Error(check.message);
      }
      return true;
    }),
  handleValidationErrors,
];

/**
 * Validação para Login
 */
const validateLogin = [
  rejectExtraFields(['email', 'password']),
  body('email')
    .trim()
    .notEmpty().withMessage('O email é obrigatório.')
    .isEmail().withMessage('Informe um endereço de email válido.')
    .isLength({ max: 255 }).withMessage('O email não pode ultrapassar 255 caracteres.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('A senha é obrigatória.'),
  handleValidationErrors,
];

/**
 * Validação para Refresh Token e Logout
 */
const validateRefreshToken = [
  rejectExtraFields(['refreshToken']),
  body('refreshToken')
    .trim()
    .notEmpty().withMessage('O refreshToken é obrigatório.')
    .isString().withMessage('O refreshToken deve ser uma string.')
    .isLength({ min: 20, max: 200 }).withMessage('Token em formato inválido.'),
  handleValidationErrors,
];

/**
 * Validação para Esqueci Minha Senha (Forgot Password)
 */
const validateForgotPassword = [
  rejectExtraFields(['email']),
  body('email')
    .trim()
    .notEmpty().withMessage('O email é obrigatório.')
    .isEmail().withMessage('Informe um endereço de email válido.')
    .isLength({ max: 255 }).withMessage('O email não pode ultrapassar 255 caracteres.')
    .normalizeEmail(),
  handleValidationErrors,
];

/**
 * Validação para Redefinição de Senha (Reset Password)
 */
const validateResetPassword = [
  rejectExtraFields(['token', 'newPassword']),
  body('token')
    .trim()
    .notEmpty().withMessage('O token é obrigatório.')
    .isString().withMessage('O token deve ser uma string.')
    .isLength({ min: 20, max: 200 }).withMessage('Token em formato inválido.'),
  body('newPassword')
    .notEmpty().withMessage('A nova senha é obrigatória.')
    .custom((value) => {
      const check = validatePasswordStrength(value);
      if (!check.valid) {
        throw new Error(check.message);
      }
      return true;
    }),
  handleValidationErrors,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateRefreshToken,
  validateForgotPassword,
  validateResetPassword,
  handleValidationErrors,
  rejectExtraFields,
};
