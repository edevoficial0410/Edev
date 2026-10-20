const dotenv = require('dotenv');
const path = require('path');

// Carrega o arquivo .env a partir da raiz do backend
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const requiredEnv = ['PORT', 'JWT_SECRET', 'JWT_REFRESH_SECRET', 'CORS_ORIGINS'];
const missingEnv = requiredEnv.filter((key) => !process.env[key] || process.env[key].trim() === '');

if (missingEnv.length > 0) {
  console.error('\n❌ [BOOT ERROR] Variáveis de ambiente obrigatórias não encontradas no .env:');
  missingEnv.forEach((key) => console.error(`   - ${key}`));
  console.error('\nPor favor, defina essas variáveis no seu arquivo backend/.env antes de iniciar o servidor.\n');
  process.exit(1);
}

const rawDbPath = process.env.DB_PATH || './data/edev.db';
const resolvedDbPath = path.isAbsolute(rawDbPath)
  ? rawDbPath
  : path.resolve(__dirname, '../../', rawDbPath);

const env = {
  port: parseInt(process.env.PORT, 10) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  corsOrigins: process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean),
  dbPath: resolvedDbPath,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5500',
  resendApiKey: process.env.RESEND_API_KEY || '',
  emailFrom: process.env.EMAIL_FROM || 'noreply@edev.com.br',
  kiwifyWebhookToken: process.env.KIWIFY_WEBHOOK_TOKEN || 'tap7gfjz911',
  kiwifyMonthlyLink: process.env.KIWIFY_MONTHLY_LINK || 'https://pay.kiwify.com.br/ksvrvDc',
  kiwifyYearlyLink: process.env.KIWIFY_YEARLY_LINK || 'https://pay.kiwify.com.br/U9fA01u',
};

module.exports = env;
