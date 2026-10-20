# 🚀 Edev Backend — API & Persistência com SQLite

Backend robusto, rápido e seguro para a plataforma **Edev**, construído com Node.js, Express, better-sqlite3 e autenticação JWT.

---

## ⚡ Como Rodar (3 Comandos)

Na pasta `backend/`:

```bash
# 1. Instalar dependências (caso ainda não tenha feito)
npm install

# 2. Configurar variáveis de ambiente (copiar o template)
cp .env.example .env

# 3. Iniciar o servidor em modo de desenvolvimento
npm run dev
```

*(Em ambiente de produção, use `npm start`)*

---

## 🔑 Como Gerar Chaves Seguras para o JWT

Para gerar segredos criptográficos fortes (32+ caracteres) para `JWT_SECRET` e `JWT_REFRESH_SECRET`, execute no terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie os valores gerados e cole no seu arquivo `.env`:
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`

---

## 💾 Como Fazer Backup do Banco de Dados

Como utilizamos o **SQLite** via `better-sqlite3`, todo o banco de dados vive dentro de um arquivo único na pasta `data/`.

Para fazer backup:
1. Basta copiar o arquivo `backend/data/edev.db` para o local desejado (ex: nuvem, pendrive ou outra pasta).
2. Se o modo WAL estiver ativo com arquivos temporários (`edev.db-wal` e `edev.db-shm`), copie-os juntos ou realize o backup com o comando SQLite padrão:

```bash
# Backup quente seguro via Node.js / SQLite
node -e "require('./src/db/connection').backup('./data/edev-backup.db')"
```

Para restaurar, basta renomear a cópia de volta para `edev.db` na pasta `backend/data/`.

---

## 🛡️ Camadas de Segurança Ativas

- **Helmet:** Headers de segurança HTTP configurados contra ataques comuns.
- **CORS Whitelist:** Apenas origens explicitamente listadas no `.env` podem consumir a API.
- **Body Limit:** Limite de 10kb para payloads JSON, prevenindo ataques de negação de serviço (DoS).
- **Rate Limiting:** 100 requisições a cada 15 minutos por IP globalmente (e limite de 5 req/15min reservado para autenticação).
- **SQLite Parametrizado:** Imunidade nativa a SQL Injection via `better-sqlite3`.
- **Tratamento de Erros:** Stack trace exposto exclusivamente em ambiente de desenvolvimento (`NODE_ENV=development`).
- **Validação de Boot:** O servidor impede a inicialização caso variáveis essenciais do `.env` estejam ausentes.
