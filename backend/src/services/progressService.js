const db = require('../db/connection');
const { safeJsonParse, safeJsonStringify } = require('../utils/jsonHelpers');

const DEFAULT_PROGRESS = {
  xp: 0,
  completed: [],
  streak: 0,
  ultimaAula: null,
  tempoEstudo: {
    total: 0,
    porAula: {},
    porCurso: {},
    sessoes: [],
  },
  achievements: [],
  certificates: [],
};

class ProgressService {
  /**
   * Obtém o progresso do aluno pelo seu user_id
   * @param {number} userId - ID do usuário autenticado
   * @returns {object} Progresso do aluno
   */
  getProgress(userId) {
    const row = db.prepare(`
      SELECT xp, completed, streak, ultima_aula, tempo_estudo, achievements, certificates, updated_at
      FROM progress
      WHERE user_id = ?
    `).get(userId);

    if (!row) {
      return { ...DEFAULT_PROGRESS };
    }

    return {
      xp: typeof row.xp === 'number' ? row.xp : 0,
      completed: safeJsonParse(row.completed, []),
      streak: typeof row.streak === 'number' ? row.streak : 0,
      ultimaAula: safeJsonParse(row.ultima_aula, null),
      tempoEstudo: safeJsonParse(row.tempo_estudo, {
        total: 0,
        porAula: {},
        porCurso: {},
        sessoes: [],
      }),
      achievements: safeJsonParse(row.achievements, []),
      certificates: safeJsonParse(row.certificates, []),
      updatedAt: row.updated_at,
    };
  }

  /**
   * Salva ou atualiza todo o progresso do aluno de forma atômica (UPSERT)
   * @param {number} userId - ID do usuário autenticado
   * @param {object} data - Dados higienizados do progresso
   * @returns {object} Progresso salvo
   */
  saveProgress(userId, data) {
    const xp = typeof data.xp === 'number' ? Math.max(0, Math.floor(data.xp)) : 0;
    const streak = typeof data.streak === 'number' ? Math.max(0, Math.floor(data.streak)) : 0;
    const completedStr = safeJsonStringify(Array.isArray(data.completed) ? data.completed : [], '[]');
    const ultimaAulaStr = safeJsonStringify(data.ultimaAula !== undefined ? data.ultimaAula : null, 'null');
    const tempoEstudoStr = safeJsonStringify(data.tempoEstudo || { total: 0, porAula: {}, porCurso: {}, sessoes: [] }, '{}');
    const achievementsStr = safeJsonStringify(Array.isArray(data.achievements) ? data.achievements : [], '[]');
    const certificatesStr = safeJsonStringify(Array.isArray(data.certificates) ? data.certificates : [], '[]');

    const upsertStmt = db.prepare(`
      INSERT INTO progress (
        user_id, xp, completed, streak, ultima_aula, tempo_estudo, achievements, certificates, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, datetime('now')
      )
      ON CONFLICT(user_id) DO UPDATE SET
        xp = excluded.xp,
        completed = excluded.completed,
        streak = excluded.streak,
        ultima_aula = excluded.ultima_aula,
        tempo_estudo = excluded.tempo_estudo,
        achievements = excluded.achievements,
        certificates = excluded.certificates,
        updated_at = datetime('now')
    `);

    upsertStmt.run(
      userId,
      xp,
      completedStr,
      streak,
      ultimaAulaStr,
      tempoEstudoStr,
      achievementsStr,
      certificatesStr
    );

    return this.getProgress(userId);
  }
}

module.exports = new ProgressService();
