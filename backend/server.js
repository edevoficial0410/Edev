const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const env = require('./src/config/env');
const runMigrations = require('./src/db/migrate');
const { globalLimiter } = require('./src/middlewares/rateLimiter');
const errorHandler = require('./src/middlewares/errorHandler');
const healthRoutes = require('./src/routes/health');
const authRoutes = require('./src/routes/auth');
const progressRoutes = require('./src/routes/progress');
const contactRoutes = require('./src/routes/contact');
const plansRoutes = require('./src/routes/plans');
const webhookRoutes = require('./src/routes/webhook');
const certificatesRoutes = require('./src/routes/certificates');
const usersRoutes = require('./src/routes/users');
const kiwifyService = require('./src/services/kiwifyService');

// Inicializa a aplicação Express
const app = express();

// 1. Camada de Segurança HTTP Headers (Helmet)
app.use(helmet());

// 2. CORS com Whitelist configurada via env
const corsOptions = {
  origin: (origin, callback) => {
    // Permite ferramentas locais (curl, postman) que não enviam origin ou origens explicitamente autorizadas
    if (!origin || env.corsOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Bloqueado por CORS: Origem ${origin} não permitida.`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// 3. Limitação no tamanho do Payload JSON
// Permite até 100kb especificamente na rota de progresso do aluno (aulas, módulos, sessões de estudo)
app.use('/api/progress', express.json({ limit: '100kb' }));
// Demais rotas mantêm limite estrito de 10kb contra ataques de negação de serviço (DoS)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 4. Rate Limiter Global (100 req / 15 min)
app.use(globalLimiter);

// 5. Registro de Rotas
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/users', usersRoutes);
app.get('/api/verify/:code', certificatesRoutes.verifyCertificateHandler);

// 6. Rota pública de estatísticas dos fundadores (GET /api/stats)
app.get('/api/stats', (req, res) => {
  try {
    const stats = kiwifyService.getStats();
    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Erro ao carregar estatísticas.' });
  }
});

// 7. Rota 404 para endpoints inexistentes
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Endpoint ${req.method} ${req.originalUrl} não encontrado.`
  });
});

// 7. Middleware de Tratamento Centralizado de Erros (sempre o último)
app.use(errorHandler);

// 8. Inicialização do Banco e do Servidor
try {
  runMigrations();

  app.listen(env.port, () => {
    console.log(`🚀 [SERVER] Edev Backend rodando em http://localhost:${env.port}`);
    console.log(`🔒 [SECURITY] Ambiente: ${env.nodeEnv} | JSON limit: 10kb | Rate Limit: 100/15min`);
    console.log(`🌐 [CORS] Origens permitidas: ${env.corsOrigins.join(', ')}`);
  });
} catch (error) {
  console.error('❌ [FATAL] Falha crítica ao iniciar o servidor:', error);
  process.exit(1);
}

module.exports = app;
