const env = require('../config/env');

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;
  // Em produção, nunca vaza detalhes internos de banco de dados ou runtime para erros 500
  const message = (env.isProduction && statusCode >= 500)
    ? 'Erro interno do servidor.'
    : (err.message || 'Erro interno do servidor.');

  console.error(`[ERROR ${statusCode}] ${req.method} ${req.url} - ${err.message}`);
  if (env.nodeEnv === 'development' && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(env.nodeEnv === 'development' ? { stack: err.stack } : {})
  });
}

module.exports = errorHandler;
