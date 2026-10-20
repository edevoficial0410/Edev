const express = require('express');
const router = express.Router();

const progressController = require('../controllers/progressController');
const authMiddleware = require('../middlewares/auth');
const { progressLimiter } = require('../middlewares/rateLimiter');

// Todas as rotas de progresso exigem autenticação obrigatória via JWT
router.use(authMiddleware);

// Permite até 100kb especificamente para rotas de progresso
const progressBodyParser = express.json({ limit: '100kb' });

// 1. Obter progresso do aluno autenticado (60 req / 15 min)
router.get('/', progressLimiter, progressController.get);

// 2. Salvar/Atualizar todo o progresso do aluno autenticado (máx 100kb payload)
router.put('/', progressLimiter, progressBodyParser, progressController.update);

module.exports = router;
