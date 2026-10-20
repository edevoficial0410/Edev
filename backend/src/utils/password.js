const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

// Lista de senhas comuns proibidas para proteger os alunos contra senhas fáceis
const COMMON_PASSWORDS = new Set([
  '12345678',
  '123456789',
  '1234567890',
  'password',
  'password123',
  'senha123',
  'senha1234',
  'admin123',
  'qwerty123',
  'edev1234',
  'mudar123',
  'trocar123',
  'brasil123',
  '12345678a',
  'a12345678',
]);

/**
 * Valida a força da senha:
 * - 8 a 72 caracteres (72 é o limite do algoritmo bcrypt)
 * - Pelo menos uma letra e um número
 * - Não pode estar na lista de senhas comuns
 */
function validatePasswordStrength(password) {
  if (typeof password !== 'string') {
    return { valid: false, message: 'A senha deve ser uma cadeia de caracteres.' };
  }

  if (password.length < 8) {
    return { valid: false, message: 'A senha deve ter no mínimo 8 caracteres.' };
  }

  if (password.length > 72) {
    return { valid: false, message: 'A senha não pode exceder 72 caracteres.' };
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasLetter || !hasNumber) {
    return { valid: false, message: 'A senha deve conter pelo menos uma letra e um número.' };
  }

  if (COMMON_PASSWORDS.has(password.toLowerCase())) {
    return { valid: false, message: 'Esta senha é muito comum e insegura. Escolha uma senha mais forte.' };
  }

  return { valid: true };
}

/**
 * Gera hash seguro com bcrypt (fator de custo 12)
 */
async function hashPassword(password) {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

/**
 * Compara senha em texto puro com o hash bcrypt
 */
async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  validatePasswordStrength,
  hashPassword,
  comparePassword,
};
