const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const certificateService = require('../services/certificateService');
const { rejectExtraFields } = require('../utils/validators');

/**
 * POST /api/certificates
 * Emite ou recupera o certificado para o aluno autenticado e curso informado
 */
router.post('/', authMiddleware, rejectExtraFields(['courseId']), (req, res, next) => {
  try {
    const { courseId } = req.body || {};
    if (!courseId) {
      return res.status(400).json({
        status: 'error',
        message: 'O identificador do curso (courseId) é obrigatório.'
      });
    }

    const cert = certificateService.getOrCreateCertificate(req.userId, courseId);
    return res.status(200).json({
      status: 'success',
      code: cert.code,
      courseId: cert.courseId,
      courseName: cert.courseName,
      studentName: cert.studentName,
      issuedAt: cert.issuedAt,
      isNew: cert.isNew
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Handler público para verificação de certificados
 */
function verifyCertificateHandler(req, res) {
  try {
    const { code } = req.params;
    const result = certificateService.verifyCertificate(code);
    if (!result.valid) {
      return res.status(200).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      valid: false,
      message: 'Erro interno ao verificar certificado.'
    });
  }
}

// Rota pública de consulta em /api/certificates/verify/:code
router.get('/verify/:code', verifyCertificateHandler);

module.exports = router;
module.exports.verifyCertificateHandler = verifyCertificateHandler;
