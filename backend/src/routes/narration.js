const express = require('express');
const router = express.Router();
const narrationController = require('../controllers/narrationController');

// Permite JSON maior na rota da lição (já que a teoria HTML pode ter alguns kilobytes)
const jsonParser = express.json({ limit: '100kb' });

// 1. Gera ou recupera áudio + timestamps de uma aula
router.post('/lesson', jsonParser, narrationController.getLessonNarration);

// 2. Transmite o arquivo de áudio MP3 (com suporte a Range headers / seek)
router.get('/audio/:filename', narrationController.streamAudio);

module.exports = router;
