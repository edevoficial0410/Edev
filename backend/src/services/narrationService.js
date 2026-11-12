const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const env = require('../config/env');

// Diretório de cache persistente para áudios e metadados.
// Em ambiente local, isola fora da pasta monitorada pelo Live Server (ex: ~/.edev/narration_cache)
// para evitar que o watcher do VS Code dispare recarregamento automático da página ao gravar áudios.
function resolveCacheDir() {
  if (process.env.NARRATION_CACHE_DIR) {
    const custom = path.resolve(process.env.NARRATION_CACHE_DIR);
    if (!fs.existsSync(custom)) fs.mkdirSync(custom, { recursive: true });
    return custom;
  }
  const isolated = path.resolve(os.homedir(), '.edev/narration_cache');
  try {
    if (!fs.existsSync(isolated)) fs.mkdirSync(isolated, { recursive: true });
    return isolated;
  } catch (err) {
    const fallback = path.resolve(__dirname, '../../data/narration_cache');
    if (!fs.existsSync(fallback)) fs.mkdirSync(fallback, { recursive: true });
    return fallback;
  }
}

const CACHE_DIR = resolveCacheDir();

// Modelo recomendado para português brasileiro e alinhamento com timestamps
const MODEL_ID = 'eleven_multilingual_v2';

// Vozes oficiais ElevenLabs da categoria 'premade' (disponíveis para uso via API em todos os planos, inclusive Free)
const COMPATIBLE_PREMADE_VOICES = {
  alice: 'Xb7hH8MSUJpSbSDYk0k2',   // Alice - Clear, Engaging Educator (Padrão Edev)
  george: 'JBFqnCBsd6RMkjVDRZzb',  // George - Warm, Captivating Storyteller
  daniel: 'onwK4e9ZLuTAKqWW03F9',  // Daniel - Steady Broadcaster
  lily: 'pFZP5JQG7iQjIQuC4Bku',    // Lily - Velvety Actress
  sarah: 'EXAVITQu4vr4xnSDxMaL',   // Sarah - Mature, Reassuring
  brian: 'nPczCjzI2devNBz1zQrb'    // Brian - Deep, Resonant
};

// Voz oficial padrão da Edev: Alice (premade, excelente para narração educacional em português)
const DEFAULT_VOICE_ID = COMPATIBLE_PREMADE_VOICES.alice;
const FALLBACK_VOICE_ID = COMPATIBLE_PREMADE_VOICES.alice;

class NarrationService {
  /**
   * Obtém a chave da API e o Voice ID configurados
   * @param {string} [courseId] - ID do curso opcional
   */
  getCredentials(courseId) {
    const apiKey = (env.elevenlabsApiKey || process.env.ELEVENLABS_API_KEY || '').trim();
    const voiceId = (env.elevenlabsVoiceId || process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID).trim();
    return { apiKey, voiceId };
  }

  /**
   * Higieniza e divide a teoria da aula em segmentos narráveis amigáveis.
   * Evita leitura robótica de código bruto e pontua adequadamente para entonação didática.
   *
   * @param {string} theoryHtml - HTML da teoria da aula
   * @param {string} [exampleCode] - Código de exemplo opcional
   * @returns {Array<{ id: string, type: string, text: string, rawText: string }>}
   */
  prepareSegments(theoryHtml, exampleCode = '') {
    if (!theoryHtml) return [];

    const segments = [];
    let segIndex = 0;

    // Remove elementos que não devem ser narrados (metas da aula, scripts, etc.)
    let cleanHtml = theoryHtml
      .replace(/<div class="aula-goals-box[\s\S]*?<\/div>\s*<\/div>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '');

    // Expressão regular para capturar blocos estruturais principais: h3, p, li, blockquote
    const blockRegex = /<(h[1-6]|p|li|blockquote)(?:[^>]*)>([\s\S]*?)<\/\1>/gi;
    let match;

    while ((match = blockRegex.exec(cleanHtml)) !== null) {
      const tag = match[1].toLowerCase();
      let inner = match[2];

      // Ignora blocos que contenham tags de código inteiras grandes
      if (/<pre[\s\S]*?<\/pre>/i.test(inner)) {
        continue;
      }

      // Converte tags inline comuns para fala natural
      // <code>termo</code> -> termo limpo
      inner = inner.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '$1');
      // Remove tags HTML remanescentes mantendo o texto interno
      let text = inner.replace(/<[^>]+>/g, ' ');
      // Normaliza espaços e quebras de linha
      text = text.replace(/&nbsp;/g, ' ')
                 .replace(/&amp;/g, '&')
                 .replace(/&lt;/g, '<')
                 .replace(/&gt;/g, '>')
                 .replace(/&quot;/g, '"')
                 .replace(/&#39;/g, "'")
                 .replace(/\s+/g, ' ')
                 .trim();

      if (!text || text.length < 2) continue;

      // Adiciona pontuação ao final caso não tenha, para que a voz faça a pausa correta
      let spokenText = text;
      if (tag.startsWith('h')) {
        // Títulos ganham ponto final para criar uma pausa natural antes do próximo parágrafo
        if (!/[.!?:]$/.test(spokenText)) spokenText += '.';
      } else if (!/[.!?;:]$/.test(spokenText)) {
        spokenText += '.';
      }

      segments.push({
        id: `seg-${segIndex++}`,
        tag,
        text: spokenText,
        rawText: text
      });
    }

    // Se houver exemplo de código relevante, adiciona uma transição educacional breve
    if (exampleCode && exampleCode.trim().length > 0) {
      segments.push({
        id: `seg-${segIndex++}`,
        tag: 'code-notice',
        text: 'Observe o exemplo de código na tela para acompanhar na prática.',
        rawText: 'Exemplo prático de código'
      });
    }

    return segments;
  }

  /**
   * Monta o texto completo a ser narrado e mapeia os limites de cada segmento
   */
  composeFullText(segments) {
    let fullText = '';
    const segmentMaps = [];

    for (const seg of segments) {
      const charStart = fullText.length;
      fullText += (fullText ? ' ' : '') + seg.text;
      const charEnd = fullText.length;

      segmentMaps.push({
        ...seg,
        charStart,
        charEnd
      });
    }

    return { fullText, segmentMaps };
  }

  /**
   * Constrói palavras com timestamps a partir do array de caracteres da ElevenLabs
   */
  buildWordTimestamps(characters, startTimes, endTimes, segmentMaps) {
    if (!characters || !startTimes || !endTimes) return { words: [], segmentsWithTimes: segmentMaps };

    const words = [];
    let currentWord = '';
    let wordStart = null;
    let wordEnd = null;

    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      const start = startTimes[i];
      const end = endTimes[i];

      if (/\s/.test(char)) {
        if (currentWord) {
          words.push({ word: currentWord, start: wordStart, end: wordEnd });
          currentWord = '';
          wordStart = null;
        }
      } else {
        if (wordStart === null) wordStart = start;
        wordEnd = end;
        currentWord += char;
      }
    }

    if (currentWord) {
      words.push({ word: currentWord, start: wordStart, end: wordEnd });
    }

    // Mapeia os tempos de início e término de cada segmento
    const segmentsWithTimes = segmentMaps.map(seg => {
      // Encontra a primeira palavra que começa dentro ou próximo do charStart
      let sTime = null;
      let eTime = null;

      if (words.length > 0) {
        // Encontra o timestamp do primeiro caractere do segmento
        if (seg.charStart < startTimes.length) {
          sTime = startTimes[seg.charStart];
        }
        // Encontra o timestamp do último caractere do segmento
        const lastCharIdx = Math.min(seg.charEnd - 1, endTimes.length - 1);
        if (lastCharIdx >= 0) {
          eTime = endTimes[lastCharIdx];
        }
      }

      // Fallback razoável se os arrays estiverem incompletos
      if (sTime === null) sTime = 0;
      if (eTime === null) eTime = sTime + 2.0;

      return {
        ...seg,
        startTime: Math.round(sTime * 1000) / 1000,
        endTime: Math.round(eTime * 1000) / 1000
      };
    });

    return { words, segmentsWithTimes };
  }

  /**
   * Gera hash único para identificar o áudio em cache
   */
  getCacheKey(courseId, lessonId, voiceId, fullText) {
    const textHash = crypto.createHash('md5').update(fullText).digest('hex').substring(0, 12);
    return `${courseId}_${lessonId}_${voiceId.substring(0, 8)}_${textHash}`;
  }

  /**
   * Gera ou recupera do cache a narração para uma lição
   *
   * @param {object} params
   * @param {string} params.courseId - ID do curso (ex: 'frontend')
   * @param {string} params.lessonId - ID da aula (ex: 'fe-0-0')
   * @param {string} params.theoryHtml - HTML da aula
   * @param {string} [params.exampleCode] - Exemplo de código
   * @param {boolean} [params.forceRefresh] - Se deve forçar regeração
   */
  /**
   * Procura no cache se já existe algum áudio pré-gerado para esta mesma aula/texto,
   * mesmo que tenha sido gravado com outra voz (ex: Lotus antes do bloqueio).
   * Isso preserva áudios já funcionais sem consumir novos caracteres da API.
   */
  findExistingCachedNarration(courseId, lessonId, fullText) {
    const textHash = crypto.createHash('md5').update(fullText).digest('hex').substring(0, 12);
    const prefix = `${courseId}_${lessonId}_`;

    const candidateDirs = [CACHE_DIR];
    const localFallback = path.resolve(__dirname, '../../data/narration_cache');
    if (localFallback !== CACHE_DIR && fs.existsSync(localFallback)) {
      candidateDirs.push(localFallback);
    }

    for (const dir of candidateDirs) {
      try {
        if (!fs.existsSync(dir)) continue;
        const files = fs.readdirSync(dir);
        const matchMeta = files.find(f => f.startsWith(prefix) && f.endsWith(`_${textHash}.json`));
        if (matchMeta) {
          const baseKey = matchMeta.replace(/\.json$/, '');
          const audioFile = path.join(dir, `${baseKey}.mp3`);
          if (fs.existsSync(audioFile)) {
            const cachedMeta = JSON.parse(fs.readFileSync(path.join(dir, matchMeta), 'utf8'));
            console.log(`⚡ [NARRATION CACHE PRESERVADO] Reutilizando áudio existente para ${courseId}/${lessonId} (${baseKey})`);
            return {
              fromCache: true,
              audioUrl: `/api/narration/audio/${baseKey}.mp3`,
              duration: cachedMeta.duration,
              segments: cachedMeta.segments,
              words: cachedMeta.words,
              voiceId: cachedMeta.voiceId || DEFAULT_VOICE_ID
            };
          }
        }
      } catch (err) {
        // ignora
      }
    }
    return null;
  }

  /**
   * Gera ou recupera do cache a narração para uma lição
   *
   * @param {object} params
   * @param {string} params.courseId - ID do curso (ex: 'frontend')
   * @param {string} params.lessonId - ID da aula (ex: 'fe-0-0')
   * @param {string} params.theoryHtml - HTML da aula
   * @param {string} [params.exampleCode] - Exemplo de código
   * @param {boolean} [params.forceRefresh] - Se deve forçar regeração
   */
  async getLessonNarration({ courseId, lessonId, theoryHtml, exampleCode = '', forceRefresh = false }) {
    const { apiKey, voiceId } = this.getCredentials(courseId);
    let effectiveVoiceId = voiceId;

    // 1. Prepara os segmentos e texto consolidado
    const segments = this.prepareSegments(theoryHtml, exampleCode);
    if (segments.length === 0) {
      throw new Error('A aula não contém texto explicativo para ser narrado.');
    }

    const { fullText, segmentMaps } = this.composeFullText(segments);
    const cacheKey = this.getCacheKey(courseId, lessonId, effectiveVoiceId, fullText);
    const audioFilePath = path.join(CACHE_DIR, `${cacheKey}.mp3`);
    const metaFilePath = path.join(CACHE_DIR, `${cacheKey}.json`);

    // 2. Verifica se já existe em cache com a voz configurada
    if (!forceRefresh && fs.existsSync(audioFilePath) && fs.existsSync(metaFilePath)) {
      try {
        const cachedMeta = JSON.parse(fs.readFileSync(metaFilePath, 'utf8'));
        console.log(`⚡ [NARRATION CACHE] Servindo áudio em cache para ${courseId}/${lessonId} (${cacheKey})`);
        return {
          fromCache: true,
          audioUrl: `/api/narration/audio/${cacheKey}.mp3`,
          duration: cachedMeta.duration,
          segments: cachedMeta.segments,
          words: cachedMeta.words,
          voiceId: effectiveVoiceId
        };
      } catch (err) {
        console.warn('[NARRATION CACHE] Erro ao ler metadados em cache, regerando:', err.message);
      }
    }

    // 2b. Verifica se existe áudio pré-gravado para este curso/aula (preserva cursos já funcionais)
    if (!forceRefresh) {
      const existing = this.findExistingCachedNarration(courseId, lessonId, fullText);
      if (existing) {
        return existing;
      }
    }

    // 3. Se a chave da API estiver vazia ou for claramente inválida, trata com mensagem orientativa
    if (!apiKey) {
      const error = new Error('A chave da ElevenLabs (ELEVENLABS_API_KEY) não está configurada no servidor.');
      error.code = 'ELEVENLABS_KEY_MISSING';
      error.statusCode = 503;
      throw error;
    }

    // Aviso seguro caso o usuário tenha colado o Key ID em vez da Secret Key
    if (!apiKey.startsWith('sk_')) {
      console.warn(`[NARRATION WARNING] A ELEVENLABS_API_KEY atual parece ser um Key ID hexadecimal em vez da Secret Key ('sk_...'). Verifique seu painel ElevenLabs se receber erro 401.`);
    }

    console.log(`🎙️ [ELEVENLABS] Gerando áudio para ${courseId}/${lessonId} com modelo ${MODEL_ID} e voz ${effectiveVoiceId}...`);

    // 4. Chamada à API oficial da ElevenLabs com timestamps
    const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(effectiveVoiceId)}/with-timestamps`;

    const requestBody = {
      text: fullText,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.8,
        style: 0.0,
        use_speaker_boost: true
      }
    };

    let response;
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
    } catch (netErr) {
      console.error('[NARRATION] Falha de conexão com ElevenLabs:', netErr.message);
      const error = new Error('Não foi possível conectar ao serviço de narração da ElevenLabs. Verifique sua conexão.');
      error.code = 'ELEVENLABS_NETWORK_ERROR';
      error.statusCode = 502;
      throw error;
    }

    if (!response.ok) {
      let errorDetail = {};
      try {
        errorDetail = await response.json();
      } catch (e) {
        errorDetail = { message: `HTTP ${response.status}` };
      }

      const rawMsg = errorDetail.detail?.message || errorDetail.message || '';
      const rawCode = errorDetail.detail?.code || errorDetail.code || '';

      const isVoiceRestricted =
        response.status === 402 ||
        rawCode === 'paid_plan_required' ||
        rawMsg.includes('Free users cannot use library voices') ||
        rawMsg.includes('upgrade your subscription');

      // Se a conta for Free e a voz solicitada for restrita (ex: biblioteca), tenta fallback imediato para Alice
      if (isVoiceRestricted && effectiveVoiceId !== FALLBACK_VOICE_ID) {
        console.warn(`⚠️ [ELEVENLABS FREE TIER] A voz solicitada (${effectiveVoiceId}) é restrita pela ElevenLabs. Executando fallback para voz educacional compatível Alice (${FALLBACK_VOICE_ID})...`);

        try {
          const fallbackEndpoint = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(FALLBACK_VOICE_ID)}/with-timestamps`;
          const fbResponse = await fetch(fallbackEndpoint, {
            method: 'POST',
            headers: {
              'xi-api-key': apiKey,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });

          if (fbResponse.ok) {
            response = fbResponse;
            effectiveVoiceId = FALLBACK_VOICE_ID;
            console.log(`✅ [ELEVENLABS FALLBACK] Narração gerada com sucesso utilizando a voz compatível Alice!`);
          } else {
            try {
              errorDetail = await fbResponse.json();
            } catch (e) {
              errorDetail = { message: `HTTP ${fbResponse.status}` };
            }
            response = fbResponse;
          }
        } catch (fbErr) {
          console.error('[ELEVENLABS] Erro de rede no fallback:', fbErr.message);
        }
      }

      if (!response.ok) {
        const finalMsg = errorDetail.detail?.message || errorDetail.message || '';
        const finalCode = errorDetail.detail?.code || errorDetail.code || '';
        const finalStatus = errorDetail.detail?.status || '';

        const isQuotaExceeded =
          finalMsg.includes('exceeds your quota') ||
          finalMsg.includes('credits remaining') ||
          finalCode === 'quota_exceeded' ||
          finalStatus === 'quota_exceeded';

        const isStillVoiceRestricted =
          response.status === 402 ||
          finalCode === 'paid_plan_required' ||
          finalMsg.includes('Free users cannot use library voices') ||
          finalMsg.includes('upgrade your subscription');

        const isAuthError =
          (response.status === 401 || finalCode === 'invalid_api_key' || finalStatus === 'missing_permissions') &&
          !isQuotaExceeded;

        const isRateLimit = response.status === 429 && !isQuotaExceeded;

        let errCode = 'TTS_ERROR';
        let userMsg = finalMsg || 'Erro ao sintetizar áudio na ElevenLabs.';
        let statusCode = 502;

        if (isQuotaExceeded) {
          errCode = 'ELEVENLABS_QUOTA_EXCEEDED';
          statusCode = 429;
          userMsg = 'O limite mensal de caracteres da API da ElevenLabs foi atingido na conta configurada.';
          console.error(`❌ [NARRATION ERROR] Limite mensal de caracteres da ElevenLabs atingido: ${finalMsg}`);
        } else if (isStillVoiceRestricted) {
          errCode = 'ELEVENLABS_VOICE_RESTRICTED';
          statusCode = 422;
          userMsg = 'A voz solicitada requer uma assinatura paga do ElevenLabs ou não está disponível via API no plano atual.';
          console.error(`❌ [NARRATION ERROR] Restrição de voz da ElevenLabs (Plano Free): ${finalMsg}`);
        } else if (isAuthError) {
          errCode = 'ELEVENLABS_AUTH_ERROR';
          statusCode = 502; // Retorna 502 para não deslogar o aluno no frontend
          userMsg = 'Falha de autenticação com a API da ElevenLabs. Verifique a chave configurada.';
          console.error(`❌ [NARRATION ERROR] Falha de autenticação na ElevenLabs: ${finalMsg}`);
        } else if (isRateLimit) {
          errCode = 'ELEVENLABS_RATE_LIMIT';
          statusCode = 429;
          userMsg = 'Muitas requisições simultâneas para o serviço ElevenLabs. Aguarde um instante.';
          console.error(`❌ [NARRATION ERROR] Limite de requisições por minuto na ElevenLabs: ${finalMsg}`);
        } else {
          console.error(`❌ [NARRATION ERROR] Falha na síntese de áudio ElevenLabs (HTTP ${response.status}): ${finalMsg}`);
        }

        const err = new Error(userMsg);
        err.statusCode = statusCode;
        err.code = errCode;
        err.detail = errorDetail;
        throw err;
      }
    }

    const data = await response.json();

    if (!data.audio_base64) {
      throw new Error('A ElevenLabs não retornou dados de áudio válidos.');
    }

    // 5. Salva arquivo de áudio MP3 no cache
    const audioBuffer = Buffer.from(data.audio_base64, 'base64');
    fs.writeFileSync(audioFilePath, audioBuffer);

    // 6. Processa alinhamento e mapeia palavras e segmentos
    const characters = data.alignment?.characters || [];
    const startTimes = data.alignment?.character_start_times_seconds || [];
    const endTimes = data.alignment?.character_end_times_seconds || [];

    const { words, segmentsWithTimes } = this.buildWordTimestamps(characters, startTimes, endTimes, segmentMaps);
    const duration = endTimes.length > 0 ? endTimes[endTimes.length - 1] : 0;

    // 7. Salva metadados no cache
    const metadata = {
      courseId,
      lessonId,
      voiceId,
      modelId: MODEL_ID,
      duration: Math.round(duration * 1000) / 1000,
      fullText,
      segments: segmentsWithTimes,
      words,
      createdAt: new Date().toISOString()
    };

    fs.writeFileSync(metaFilePath, JSON.stringify(metadata, null, 2), 'utf8');
    console.log(`✅ [NARRATION SUCCESS] Áudio e timestamps salvos com sucesso (${duration.toFixed(1)}s, ${segmentsWithTimes.length} segmentos, ${words.length} palavras).`);

    return {
      fromCache: false,
      audioUrl: `/api/narration/audio/${cacheKey}.mp3`,
      duration: metadata.duration,
      segments: metadata.segments,
      words: metadata.words,
      voiceId
    };
  }

  /**
   * Retorna o caminho absoluto do arquivo de áudio em cache
   */
  getAudioPath(filename) {
    // Sanitização de path traversal contra ../
    const safeName = path.basename(filename);
    const fullPath = path.join(CACHE_DIR, safeName);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }

    // Fallback: verifica se o arquivo está na pasta local antiga data/narration_cache
    const localFallback = path.resolve(__dirname, '../../data/narration_cache', safeName);
    if (fs.existsSync(localFallback)) {
      return localFallback;
    }

    return null;
  }
}

module.exports = new NarrationService();
