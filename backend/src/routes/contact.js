const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { contactLimiter } = require('../middlewares/rateLimiter');
const { rejectExtraFields } = require('../utils/validators');

// Limite estrito de 10kb para payload de contato, taxa de 3 requisições por hora e rejeição de campos extras
router.post('/', contactLimiter, rejectExtraFields(['name', 'email', 'subject', 'message']), contactController.create);

module.exports = router;
