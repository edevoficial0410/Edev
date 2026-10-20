const progressService = require('../services/progressService');

const ALLOWED_FIELDS = new Set([
  'xp',
  'completed',
  'streak',
  'ultimaAula',
  'tempoEstudo',
  'achievements',
  'certificates',
  'updatedAt',
  'updated_at',
]);

class ProgressController {
  /**
   * GET /api/progress
   * Retorna o progresso do aluno autenticado
   */
  async get(req, res, next) {
    try {
      const progress = progressService.getProgress(req.userId);
      return res.status(200).json({
        status: 'success',
        progress,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/progress
   * Substitui todo o progresso do aluno com validação estrita
   */
  async update(req, res, next) {
    try {
      const body = req.body;

      if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return res.status(400).json({
          status: 'error',
          message: 'O corpo da requisição deve ser um objeto JSON válido.',
        });
      }

      // 1. Sanitização: Não aceitar campos extras no body
      const bodyKeys = Object.keys(body);
      const unknownKeys = bodyKeys.filter((k) => !ALLOWED_FIELDS.has(k));
      if (unknownKeys.length > 0) {
        return res.status(400).json({
          status: 'error',
          message: `Campos não permitidos detectados no body: ${unknownKeys.join(', ')}`,
        });
      }

      // 2. Validação: xp (número positivo, máx 1.000.000)
      if (body.xp !== undefined) {
        if (typeof body.xp !== 'number' || isNaN(body.xp) || body.xp < 0 || body.xp > 1000000) {
          return res.status(400).json({
            status: 'error',
            message: 'O campo "xp" deve ser um número entre 0 e 1.000.000.',
          });
        }
      }

      // 3. Validação: completed (array de strings, máx 500 itens)
      if (body.completed !== undefined) {
        if (!Array.isArray(body.completed)) {
          return res.status(400).json({
            status: 'error',
            message: 'O campo "completed" deve ser um array.',
          });
        }
        if (body.completed.length > 500) {
          return res.status(400).json({
            status: 'error',
            message: 'O array "completed" não pode ultrapassar 500 itens.',
          });
        }
        for (const item of body.completed) {
          if (typeof item !== 'string' || item.length > 100) {
            return res.status(400).json({
              status: 'error',
              message: 'Cada item do array "completed" deve ser uma string com até 100 caracteres.',
            });
          }
        }
      }

      // 4. Validação: streak (número >= 0, máx 10.000)
      if (body.streak !== undefined) {
        if (typeof body.streak !== 'number' || isNaN(body.streak) || body.streak < 0 || body.streak > 10000) {
          return res.status(400).json({
            status: 'error',
            message: 'O campo "streak" deve ser um número entre 0 e 10.000.',
          });
        }
      }

      // 5. Validação: ultimaAula (objeto ou null)
      if (body.ultimaAula !== undefined && body.ultimaAula !== null) {
        if (typeof body.ultimaAula !== 'object' || Array.isArray(body.ultimaAula)) {
          return res.status(400).json({
            status: 'error',
            message: 'O campo "ultimaAula" deve ser um objeto ou null.',
          });
        }
      }

      // 6. Validação: tempoEstudo (objeto com total >= 0)
      if (body.tempoEstudo !== undefined && body.tempoEstudo !== null) {
        if (typeof body.tempoEstudo !== 'object' || Array.isArray(body.tempoEstudo)) {
          return res.status(400).json({
            status: 'error',
            message: 'O campo "tempoEstudo" deve ser um objeto.',
          });
        }
        if (body.tempoEstudo.total !== undefined) {
          if (typeof body.tempoEstudo.total !== 'number' || isNaN(body.tempoEstudo.total) || body.tempoEstudo.total < 0) {
            return res.status(400).json({
              status: 'error',
              message: 'O campo "tempoEstudo.total" deve ser um número maior ou igual a 0.',
            });
          }
        }
        if (body.tempoEstudo.sessoes !== undefined && !Array.isArray(body.tempoEstudo.sessoes)) {
          return res.status(400).json({
            status: 'error',
            message: 'O campo "tempoEstudo.sessoes" deve ser um array.',
          });
        }
      }

      // 7. Validação: achievements (array, máx 50 itens)
      if (body.achievements !== undefined) {
        if (!Array.isArray(body.achievements)) {
          return res.status(400).json({
            status: 'error',
            message: 'O campo "achievements" deve ser um array.',
          });
        }
        if (body.achievements.length > 50) {
          return res.status(400).json({
            status: 'error',
            message: 'O array "achievements" não pode ultrapassar 50 itens.',
          });
        }
      }

      // 8. Validação: certificates (array, máx 20 itens)
      if (body.certificates !== undefined) {
        if (!Array.isArray(body.certificates)) {
          return res.status(400).json({
            status: 'error',
            message: 'O campo "certificates" deve ser um array.',
          });
        }
        if (body.certificates.length > 20) {
          return res.status(400).json({
            status: 'error',
            message: 'O array "certificates" não pode ultrapassar 20 itens.',
          });
        }
      }

      // Salva o progresso associado unicamente ao usuário do token
      const updatedProgress = progressService.saveProgress(req.userId, body);

      return res.status(200).json({
        status: 'success',
        message: 'Progresso atualizado com sucesso.',
        progress: updatedProgress,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProgressController();
