/**
 * src/utils/jsonHelpers.js
 * Utilitários para serialização e desserialização segura de JSON
 * para armazenamento em campos de texto no SQLite.
 */

/**
 * Realiza o parse seguro de uma string JSON com valor default em caso de falha.
 * @param {string|any} rawString - String JSON armazenada no banco.
 * @param {any} defaultValue - Valor retornado caso o parse falhe ou valor seja nulo.
 * @returns {any}
 */
function safeJsonParse(rawString, defaultValue = null) {
  if (rawString === null || rawString === undefined || rawString === '') {
    return defaultValue;
  }

  // Se já for um objeto ou array (ex: passado diretamente), retorna
  if (typeof rawString === 'object') {
    return rawString;
  }

  try {
    return JSON.parse(rawString);
  } catch (error) {
    console.warn('[JSON_PARSE_ERROR] Falha ao desserializar JSON:', error.message);
    return defaultValue;
  }
}

/**
 * Converte um objeto ou valor para string JSON com fallback seguro.
 * @param {any} value - Valor a ser serializado.
 * @param {string} defaultValue - String default caso a serialização falhe.
 * @returns {string}
 */
function safeJsonStringify(value, defaultValue = '{}') {
  if (value === undefined) {
    return defaultValue;
  }

  try {
    return JSON.stringify(value);
  } catch (error) {
    console.error('[JSON_STRINGIFY_ERROR] Falha ao serializar para JSON:', error.message);
    return defaultValue;
  }
}

module.exports = {
  safeJsonParse,
  safeJsonStringify,
};
