const jwt = require('jsonwebtoken');
const env = require('../config/env');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'Acesso não autorizado: token JWT ausente ou malformatado.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    
    // Garante que o payload contenha o identificador do usuário
    const userId = decoded.userId || decoded.id;
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'Token inválido: identificador de usuário não encontrado no payload.'
      });
    }

    req.user = decoded;
    req.userId = userId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token expirado. Por favor, renove sua sessão.'
      });
    }

    return res.status(401).json({
      status: 'error',
      message: 'Token inválido ou corrompido.'
    });
  }
}

module.exports = authMiddleware;
