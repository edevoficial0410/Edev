const contactService = require('../services/contactService');

class ContactController {
  /**
   * POST /api/contact
   * Registra uma nova mensagem enviada pelo formulário de contato
   */
  async create(req, res, next) {
    try {
      const { name, email, subject, message } = req.body || {};

      if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({
          status: 'error',
          message: 'Dados inválidos fornecidos no formulário.',
        });
      }

      // Obtém o IP do cliente considerando proxies confiáveis
      const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || req.socket.remoteAddress;

      contactService.createContact({
        name,
        email,
        subject,
        message,
        ip: clientIp,
      });

      return res.status(201).json({
        status: 'success',
        message: 'Mensagem enviada com sucesso',
      });
    } catch (error) {
      // Se for um erro de validação de negócio com mensagem clara, retorna 400
      if (
        error.message.includes('nome') ||
        error.message.includes('email') ||
        error.message.includes('assunto') ||
        error.message.includes('mensagem')
      ) {
        return res.status(400).json({
          status: 'error',
          message: error.message,
        });
      }
      next(error);
    }
  }
}

module.exports = new ContactController();
