const express = require('express');
const router = express.Router();
const kiwifyService = require('../services/kiwifyService');
const { webhookLimiter } = require('../middlewares/rateLimiter');

// POST /api/webhook/kiwify - Recebe notificações de eventos da Kiwify (limitado a 60 req / 15 min)
router.post('/kiwify', webhookLimiter, async (req, res) => {
  // Token pode vir via query (?token=tap7gfjz911), body { token: 'tap7gfjz911' } ou headers
  const token = req.query.token || req.body?.token || req.headers['x-kiwify-token'] || req.headers['authorization']?.replace('Bearer ', '');

  try {
    const result = await kiwifyService.handleWebhook(req.body, token);
    return res.status(200).json({
      status: 'success',
      message: 'Webhook processado com sucesso',
      data: result,
    });
  } catch (error) {
    if (error.statusCode === 401) {
      return res.status(401).json({
        status: 'error',
        message: 'Token de webhook inválido ou ausente.',
      });
    }
    console.error('❌ [KIWIFY WEBHOOK ERROR]', error);
    // Para manter estabilidade com gateways de pagamento, sempre retorna 200 para eventos gerais
    return res.status(200).json({
      status: 'error_handled',
      message: error.message,
    });
  }
});

module.exports = router;
