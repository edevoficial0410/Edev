const express = require('express');
const router = express.Router();
const kiwifyService = require('../services/kiwifyService');

// GET /api/plans - Informações públicas dos planos, preços e vagas de fundadores
router.get('/', (req, res) => {
  try {
    const plans = kiwifyService.getPlans();
    return res.status(200).json(plans);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Erro ao carregar informações dos planos.',
    });
  }
});

// GET /api/plans/stats - Atalho para estatísticas de fundadores
router.get('/stats', (req, res) => {
  try {
    const stats = kiwifyService.getStats();
    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Erro ao carregar estatísticas.',
    });
  }
});

module.exports = router;
