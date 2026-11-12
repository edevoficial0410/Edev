const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const db = require('../db/connection');
const { safeJsonParse, safeJsonStringify } = require('../utils/jsonHelpers');

/**
 * GET /api/users/study-profile
 * Retorna as respostas e recomendações do Orientador de Estudos do usuário autenticado
 */
router.get('/study-profile', authMiddleware, (req, res, next) => {
  try {
    const userId = req.userId;
    const row = db.prepare('SELECT study_profile FROM users WHERE id = ?').get(userId);
    if (!row) {
      return res.status(404).json({ status: 'error', message: 'Usuário não encontrado.' });
    }
    const studyProfile = safeJsonParse(row.study_profile, null);
    return res.status(200).json({
      status: 'success',
      studyProfile,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/users/study-profile
 * Salva ou atualiza as respostas e recomendações do Orientador de Estudos
 */
router.put('/study-profile', authMiddleware, (req, res, next) => {
  try {
    const userId = req.userId;
    const profileData = req.body.studyProfile !== undefined ? req.body.studyProfile : req.body;

    if (profileData !== null && (typeof profileData !== 'object' || Array.isArray(profileData))) {
      return res.status(400).json({
        status: 'error',
        message: 'O perfil de estudo deve ser um objeto JSON ou null.',
      });
    }

    const jsonStr = profileData ? safeJsonStringify(profileData, null) : null;
    db.prepare(`
      UPDATE users 
      SET study_profile = ?, updated_at = datetime('now') 
      WHERE id = ?
    `).run(jsonStr, userId);

    return res.status(200).json({
      status: 'success',
      message: 'Caminho de estudos atualizado com sucesso.',
      studyProfile: safeJsonParse(jsonStr, null),
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/users/preferences
 * Retorna as preferências do usuário autenticado (incluindo narração por IA)
 */
router.get('/preferences', authMiddleware, (req, res, next) => {
  try {
    const userId = req.userId;
    const row = db.prepare('SELECT preferences FROM users WHERE id = ?').get(userId);
    if (!row) {
      return res.status(404).json({ status: 'error', message: 'Usuário não encontrado.' });
    }
    const preferences = safeJsonParse(row.preferences, {
      narrationEnabled: false,
      narrationOnboardingSeen: false,
    });
    return res.status(200).json({
      status: 'success',
      preferences,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/users/preferences
 * Salva ou atualiza as preferências do usuário (faz merge de preferências existentes)
 */
router.put('/preferences', authMiddleware, (req, res, next) => {
  try {
    const userId = req.userId;
    const newPrefs = req.body.preferences !== undefined ? req.body.preferences : req.body;

    if (!newPrefs || typeof newPrefs !== 'object' || Array.isArray(newPrefs)) {
      return res.status(400).json({
        status: 'error',
        message: 'As preferências devem ser um objeto JSON.',
      });
    }

    const row = db.prepare('SELECT preferences FROM users WHERE id = ?').get(userId);
    const currentPrefs = row ? safeJsonParse(row.preferences, {}) : {};
    const merged = { ...currentPrefs, ...newPrefs };
    const jsonStr = safeJsonStringify(merged, '{}');

    db.prepare(`
      UPDATE users 
      SET preferences = ?, updated_at = datetime('now') 
      WHERE id = ?
    `).run(jsonStr, userId);

    return res.status(200).json({
      status: 'success',
      message: 'Preferências atualizadas com sucesso.',
      preferences: merged,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/users/me
 * Exclui permanentemente o usuário autenticado e todos os seus dados associados (LGPD - Direito de Exclusão)
 */
router.delete('/me', authMiddleware, (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'Acesso não autorizado.',
      });
    }

    // Busca usuário para obter o email (utilizado na exclusão de login_attempts)
    const user = db.prepare('SELECT email FROM users WHERE id = ?').get(userId);

    // Executa a exclusão atômica de todos os dados do aluno em transação
    const deleteTransaction = db.transaction(() => {
      // 1. Exclui progresso de aulas, XP e tempo de estudo
      db.prepare('DELETE FROM progress WHERE user_id = ?').run(userId);

      // 2. Exclui sessões ativas e refresh tokens
      db.prepare('DELETE FROM sessions WHERE user_id = ?').run(userId);

      // 3. Exclui certificados emitidos para o aluno
      db.prepare('DELETE FROM certificates WHERE user_id = ?').run(userId);

      // 4. Exclui tokens de redefinição de senha
      db.prepare('DELETE FROM password_resets WHERE user_id = ?').run(userId);

      // 5. Exclui tentativas de login registradas com o email
      if (user && user.email) {
        db.prepare('DELETE FROM login_attempts WHERE lower(email) = ?').run(user.email.toLowerCase());
      }

      // 6. Exclui o registro principal do usuário
      db.prepare('DELETE FROM users WHERE id = ?').run(userId);
    });

    deleteTransaction();

    console.log(`🗑️ [LGPD] Conta excluída com sucesso - User ID: ${userId} (${user?.email || 'N/A'})`);

    return res.status(200).json({
      status: 'success',
      message: 'Conta excluída',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
