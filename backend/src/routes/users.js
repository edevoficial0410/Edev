const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const db = require('../db/connection');

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
