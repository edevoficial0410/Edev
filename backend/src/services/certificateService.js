const crypto = require('crypto');
const db = require('../db/connection');

const COURSE_NAMES = {
  frontend: 'Front-end Completo',
  python: 'Python — Lógica de Programação',
  java: 'Java Completo: Do Zero ao Profissional',
  cpp: 'C++ do Zero — Alta Performance',
  php: 'PHP do Zero — Web Dinâmica & MySQL',
  sql: 'Banco de Dados do Zero — SQL na Prática'
};

/**
 * Gera um sufixo alfanumérico aleatório e criptograficamente imprevisível de 5 caracteres em caixa alta (ex: A3F9K)
 */
function generateRandomSuffix() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Caracteres alfanuméricos limpos
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(crypto.randomInt(0, chars.length));
  }
  return result;
}

/**
 * Gera um código único no formato "EDEV-2026-XXXXX" garantindo que não colida com o banco
 */
function generateUniqueCertificateCode() {
  let attempts = 0;
  while (attempts < 20) {
    const code = `EDEV-2026-${generateRandomSuffix()}`;
    const existing = db.prepare('SELECT id FROM certificates WHERE code = ?').get(code);
    if (!existing) {
      return code;
    }
    attempts++;
  }
  // Fallback caso raro de colisão
  return `EDEV-2026-${Date.now().toString(36).toUpperCase().slice(-5)}`;
}

/**
 * Busca certificado existente para o usuário e curso ou gera e persiste um novo
 */
function getOrCreateCertificate(userId, courseId) {
  if (!userId) {
    throw new Error('Identificador do usuário é obrigatório.');
  }
  if (!courseId) {
    throw new Error('Identificador do curso é obrigatório.');
  }

  const cleanCourseId = String(courseId).trim().toLowerCase();

  // 1. Verifica se já existe certificado para esse aluno + curso
  const existing = db.prepare(`
    SELECT c.id, c.code, c.user_id, c.course_id, c.issued_at, u.name AS student_name
    FROM certificates c
    JOIN users u ON u.id = c.user_id
    WHERE c.user_id = ? AND c.course_id = ?
  `).get(userId, cleanCourseId);

  if (existing) {
    return {
      code: existing.code,
      courseId: existing.course_id,
      courseName: COURSE_NAMES[existing.course_id] || existing.course_id,
      studentName: existing.student_name,
      issuedAt: existing.issued_at,
      isNew: false
    };
  }

  // 2. Se não existir, gera um novo código e salva
  const code = generateUniqueCertificateCode();
  const insert = db.prepare(`
    INSERT INTO certificates (code, user_id, course_id, issued_at)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
  `).run(code, userId, cleanCourseId);

  const created = db.prepare(`
    SELECT c.id, c.code, c.user_id, c.course_id, c.issued_at, u.name AS student_name
    FROM certificates c
    JOIN users u ON u.id = c.user_id
    WHERE c.id = ?
  `).get(insert.lastInsertRowid);

  return {
    code: created.code,
    courseId: created.course_id,
    courseName: COURSE_NAMES[created.course_id] || created.course_id,
    studentName: created.student_name,
    issuedAt: created.issued_at,
    isNew: true
  };
}

/**
 * Verifica publicamente a autenticidade de um certificado pelo código
 */
function verifyCertificate(code) {
  if (!code || typeof code !== 'string') {
    return {
      valid: false,
      message: 'Certificado não encontrado'
    };
  }

  const cleanCode = code.trim().toUpperCase();

  const cert = db.prepare(`
    SELECT c.id, c.code, c.user_id, c.course_id, c.issued_at, u.name AS student_name
    FROM certificates c
    JOIN users u ON u.id = c.user_id
    WHERE UPPER(c.code) = ?
  `).get(cleanCode);

  if (!cert) {
    return {
      valid: false,
      message: 'Certificado não encontrado'
    };
  }

  return {
    valid: true,
    code: cert.code,
    studentName: cert.student_name,
    courseName: COURSE_NAMES[cert.course_id] || cert.course_id,
    courseId: cert.course_id,
    issuedAt: cert.issued_at
  };
}

module.exports = {
  COURSE_NAMES,
  getOrCreateCertificate,
  verifyCertificate
};
