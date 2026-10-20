const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

const ACCESS_TOKEN_EXPIRES_IN = '15m'; // 15 minutos
const REFRESH_TOKEN_DAYS = 30; // 30 dias
const RESET_TOKEN_HOURS = 1; // 1 hora

/**
 * Gera JWT de curta duração (Access Token)
 */
function generateAccessToken(payload) {
  // Payload limpo sem informações confidenciais
  return jwt.sign(
    {
      userId: payload.userId || payload.id,
      email: payload.email,
    },
    env.jwtSecret,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      algorithm: 'HS256',
    }
  );
}

/**
 * Gera token de refresh criptográfico seguro (32 bytes hex)
 */
function generateRefreshToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Calcula a data de expiração para o refresh token (30 dias)
 */
function getRefreshTokenExpiresAt() {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_DAYS);
  return expiresAt.toISOString();
}

/**
 * Gera token de recuperação de senha e seu hash SHA-256
 */
function generatePasswordResetToken() {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashToken(rawToken);

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + RESET_TOKEN_HOURS);

  return {
    rawToken,
    tokenHash,
    expiresAt: expiresAt.toISOString(),
  };
}

/**
 * Hasheia tokens sensíveis usando SHA-256 antes de salvar ou comparar no banco
 */
function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenExpiresAt,
  generatePasswordResetToken,
  hashToken,
};
