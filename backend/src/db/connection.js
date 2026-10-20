const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const env = require('../config/env');

const dbDir = path.dirname(path.resolve(env.dbPath));
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(path.resolve(env.dbPath));

// Habilitar Write-Ahead Logging (WAL) para melhor performance e concorrência
db.pragma('journal_mode = WAL');
// Habilitar integridade referencial de chaves estrangeiras
db.pragma('foreign_keys = ON');

module.exports = db;
