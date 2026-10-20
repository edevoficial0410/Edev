const db = require('./connection');

function runMigrations() {
  const initSchema = `
    -- Tabela de Usuários
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      avatar_url TEXT,
      is_founder INTEGER DEFAULT 0,
      plan TEXT DEFAULT 'free',
      plan_expires_at DATETIME,
      kiwify_customer_id TEXT,
      last_login DATETIME,
      failed_login_attempts INTEGER DEFAULT 0,
      locked_until DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de Progresso dos Alunos (persistência unificada por usuário)
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      xp INTEGER DEFAULT 0,
      completed TEXT DEFAULT '[]',
      streak INTEGER DEFAULT 0,
      ultima_aula TEXT DEFAULT 'null',
      tempo_estudo TEXT DEFAULT '{}',
      achievements TEXT DEFAULT '[]',
      certificates TEXT DEFAULT '[]',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Tabela de Sessões / Refresh Tokens
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      refresh_token TEXT NOT NULL UNIQUE,
      user_agent TEXT,
      ip_address TEXT,
      expires_at DATETIME NOT NULL,
      revoked INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Tabela de Redefinição de Senha
    CREATE TABLE IF NOT EXISTS password_resets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token_hash TEXT NOT NULL,
      expires_at DATETIME NOT NULL,
      used INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Tabela de Registro de Tentativas de Login (Auditoria e Bloqueio)
    CREATE TABLE IF NOT EXISTS login_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      ip TEXT,
      success INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de Mensagens e Contatos
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      ip TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de Certificados Emitidos
    CREATE TABLE IF NOT EXISTS certificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      user_id INTEGER NOT NULL,
      course_id TEXT NOT NULL,
      issued_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Índices para performance e consultas rápidas
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(refresh_token);
    CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_password_resets_hash ON password_resets(token_hash);
    CREATE INDEX IF NOT EXISTS idx_password_resets_user ON password_resets(user_id);
    CREATE INDEX IF NOT EXISTS idx_login_attempts_email_created ON login_attempts(email, created_at);
    CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_created ON login_attempts(ip, created_at);
    CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
    CREATE INDEX IF NOT EXISTS idx_contacts_ip ON contacts(ip);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_certificates_code ON certificates(code);
    CREATE INDEX IF NOT EXISTS idx_certificates_user_course ON certificates(user_id, course_id);
  `;

  // Se a tabela progress antiga existir com colunas legadas, recria com a nova estrutura unificada
  const progressCols = db.prepare("PRAGMA table_info(progress)").all().map(c => c.name);
  if (progressCols.includes('course_id')) {
    db.exec("DROP TABLE IF EXISTS progress;");
  }

  db.exec(initSchema);

  function columnExists(database, table, column) {
    try {
      const cols = database.prepare(`PRAGMA table_info(${table})`).all();
      return cols.some(c => c.name === column);
    } catch {
      return false;
    }
  }

  // Adiciona colunas que possam faltar caso a tabela users já tenha sido criada em versão anterior
  if (!columnExists(db, 'users', 'avatar_url')) {
    db.exec("ALTER TABLE users ADD COLUMN avatar_url TEXT;");
  }
  if (!columnExists(db, 'users', 'last_login')) {
    db.exec("ALTER TABLE users ADD COLUMN last_login DATETIME;");
  }
  if (!columnExists(db, 'users', 'failed_login_attempts')) {
    db.exec("ALTER TABLE users ADD COLUMN failed_login_attempts INTEGER DEFAULT 0;");
  }
  if (!columnExists(db, 'users', 'locked_until')) {
    db.exec("ALTER TABLE users ADD COLUMN locked_until DATETIME;");
  }
  if (!columnExists(db, 'users', 'is_founder')) {
    db.exec("ALTER TABLE users ADD COLUMN is_founder INTEGER DEFAULT 0;");
  }
  if (!columnExists(db, 'users', 'plan')) {
    db.exec("ALTER TABLE users ADD COLUMN plan TEXT DEFAULT 'free';");
  }
  if (!columnExists(db, 'users', 'plan_expires_at')) {
    db.exec("ALTER TABLE users ADD COLUMN plan_expires_at DATETIME;");
  }
  if (!columnExists(db, 'users', 'kiwify_customer_id')) {
    db.exec("ALTER TABLE users ADD COLUMN kiwify_customer_id TEXT;");
  }

  // Garante que o administrador/proprietário da plataforma seja sempre fundador vitalício
  db.exec("UPDATE users SET is_founder = 1, plan = 'founder' WHERE email = 'guilherme@edev.dev' OR id = 1;");

  if (!columnExists(db, 'sessions', 'revoked')) {
    db.exec("ALTER TABLE sessions ADD COLUMN revoked INTEGER DEFAULT 0;");
  }

  console.log('✅ [DATABASE] Migrações executadas com sucesso (users, sessions, password_resets, login_attempts, progress, contacts).');
}

if (require.main === module) {
  runMigrations();
}

module.exports = runMigrations;
