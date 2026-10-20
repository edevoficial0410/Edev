const db = require('../db/connection');

const ALLOWED_SUBJECTS = ['Dúvida', 'Sugestão', 'Bug', 'Outro'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class ContactService {
  /**
   * Valida e persiste uma mensagem de contato enviada por um visitante ou aluno
   * @param {object} param0
   * @param {string} param0.name - Nome de quem está enviando
   * @param {string} param0.email - Email de contato
   * @param {string} param0.subject - Assunto selecionado
   * @param {string} param0.message - Mensagem de texto
   * @param {string} [param0.ip] - Endereço IP de origem
   * @returns {object} Mensagem persistida
   */
  createContact({ name, email, subject, message, ip }) {
    // 1. Higienização e validação de nome
    const cleanName = typeof name === 'string' ? name.trim() : '';
    if (!cleanName || cleanName.length < 2 || cleanName.length > 100) {
      throw new Error('O nome deve ter entre 2 e 100 caracteres.');
    }

    // 2. Higienização e validação de email
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 255) {
      throw new Error('Informe um endereço de email válido.');
    }

    // 3. Validação de assunto
    const cleanSubject = typeof subject === 'string' ? subject.trim() : '';
    if (!cleanSubject) {
      throw new Error('Selecione um assunto para sua mensagem.');
    }
    // Aceita assuntos da lista ou padrão
    const matchedSubject = ALLOWED_SUBJECTS.find(
      s => s.toLowerCase() === cleanSubject.toLowerCase()
    ) || (cleanSubject.length <= 100 ? cleanSubject : 'Outro');

    // 4. Validação de mensagem
    const cleanMessage = typeof message === 'string' ? message.trim() : '';
    if (!cleanMessage || cleanMessage.length < 10) {
      throw new Error('A mensagem deve conter pelo menos 10 caracteres.');
    }
    if (cleanMessage.length > 3000) {
      throw new Error('A mensagem não pode ultrapassar 3000 caracteres.');
    }

    const cleanIp = typeof ip === 'string' ? ip.slice(0, 45) : null;

    // 5. Inserção no banco SQLite
    const stmt = db.prepare(`
      INSERT INTO contacts (name, email, subject, message, ip)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(cleanName, cleanEmail, matchedSubject, cleanMessage, cleanIp);

    return {
      id: result.lastInsertRowid,
      name: cleanName,
      email: cleanEmail,
      subject: matchedSubject,
      created_at: new Date().toISOString()
    };
  }
}

module.exports = new ContactService();
