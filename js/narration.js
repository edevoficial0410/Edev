/**
 * js/narration.js
 * Sistema de Narração Inteligente da Edev (Nativo via Web Speech API)
 *
 * COMPATIBILIDADE TOTAL:
 * - Desktop (Chrome, Edge, Firefox, Safari)
 * - Mobile (Android Chrome, iOS / iPadOS Safari)
 *
 * RECURSOS IMPLEMENTADOS:
 * - 100% nativo no navegador do aluno: zero APIs externas, sem custos ou franquias.
 * - Suporte avançado para Safari no iOS e iPadOS com preservação do User Activation (toque direto).
 * - Desbloqueio imediato do canal de áudio no toque inicial do iPhone/iPad.
 * - Tratamento específico de pausa/retomada para contornar o bug crônico do WebKit no iOS.
 * - Carregamento resiliente de vozes com priorização de vozes neurais / naturais (Edge Francisca/Antonio, Google pt-BR, Apple Luciana/Felipe).
 * - Calibração dinâmica de velocidade (rate) e tom (pitch) de acordo com o motor de voz.
 * - Dicionário fonético didático que traduz código e termos técnicos em linguagem natural de professor.
 * - Divisão inteligente em sentenças didáticas com micro-pausas respiratórias humanas calculadas.
 * - Destaque sincronizado PALAVRA POR PALAVRA em tempo real com fallback automático para iOS.
 * - Destaque de bloco no parágrafo ativo com auto-scroll suave.
 * - Botão discreto em cada parágrafo para reouvir qualquer explicação pontual.
 * - Controles completos: Ouvir aula, Pausar, Continuar e Parar.
 * - Cancelamento seguro e imediato ao trocar de aula ou sair da página.
 */

import { isAuthenticated, apiFetch } from './auth.js';

// Chave para cache local de preferências
const PREFS_STORAGE_KEY = 'edev_narration_prefs';

/**
 * Detecção de dispositivos Apple (iOS e iPadOS com suporte a desktop user-agent)
 */
const isIOS = typeof navigator !== 'undefined' && (
  /iPad|iPhone|iPod/.test(navigator.userAgent || '') ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
);

/**
 * Estado interno do módulo de narração
 */
const narrationState = {
  preferences: {
    narrationEnabled: false,
    narrationOnboardingSeen: false,
  },
  currentCourseId: null,
  currentLessonId: null,
  isPlaying: false,
  isPaused: false,
  isLoading: false,
  lastActionTime: 0,
  currentIndex: 0,
  sentences: [], // Lista de sentenças didáticas [{ text, blockEl, words: [{ spanEl, charStart, charEnd }] }]
  repeatSingleBlockId: null, // se estiver repetindo apenas um parágrafo isolado
  keepAliveTimer: null,
  pauseBetweenTimer: null,
  wordFallbackTimer: null,
  activeBlockElement: null,
  activeWordSpan: null,
  selectedVoice: null,
  voiceProfile: {
    rate: 0.98,
    pitch: 1.0,
  },
  audioUnlocked: false,
};

// ============================================================
// DESBLOQUEIO DE ÁUDIO NO iOS / SAFARI (User Gesture)
// ============================================================

/**
 * Desbloqueia o sintetizador de fala do WebKit no primeiro toque do usuário
 * (executa apenas no iOS para não gerar ruídos ou concorrência em navegadores desktop)
 */
function unlockAudioForIOS() {
  if (!('speechSynthesis' in window)) return;
  if (!isIOS) {
    narrationState.audioUnlocked = true;
    return;
  }
  if (narrationState.audioUnlocked) return;

  try {
    const dummy = new SpeechSynthesisUtterance(' ');
    dummy.volume = 0.01;
    dummy.rate = 10;
    dummy.onend = () => {
      narrationState.audioUnlocked = true;
    };
    dummy.onerror = () => {
      narrationState.audioUnlocked = true;
    };
    window.speechSynthesis.speak(dummy);
  } catch (e) {
    narrationState.audioUnlocked = true;
  }
}

// ============================================================
// PREFERÊNCIAS DO ALUNO (LOCAL + SINCRONIZAÇÃO OPCIONAL)
// ============================================================

/**
 * Retorna as preferências de narração de forma estritamente síncrona
 * a partir do cache local, evitando perda de contexto de User Activation
 */
export function getNarrationPreferencesSync() {
  try {
    const raw = localStorage.getItem(PREFS_STORAGE_KEY);
    if (raw) {
      narrationState.preferences = { ...narrationState.preferences, ...JSON.parse(raw) };
    }
  } catch (e) {}
  return narrationState.preferences;
}

/**
 * Carrega preferências do aluno e sincroniza remotamente em segundo plano
 */
export async function loadNarrationPreferences() {
  getNarrationPreferencesSync();

  if (isAuthenticated()) {
    try {
      const res = await apiFetch('/api/users/preferences');
      if (res?.preferences) {
        narrationState.preferences = { ...narrationState.preferences, ...res.preferences };
        try {
          localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(narrationState.preferences));
        } catch (e) {}
      }
    } catch (err) {}
  }

  return narrationState.preferences;
}

/**
 * Salva preferências do aluno sincronamente no cache local e
 * envia para a API em segundo plano sem bloquear a execução imediata
 */
export function saveNarrationPreferences(newPrefs) {
  narrationState.preferences = { ...narrationState.preferences, ...newPrefs };

  try {
    localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(narrationState.preferences));
  } catch (e) {}

  if (isAuthenticated()) {
    apiFetch('/api/users/preferences', {
      method: 'PUT',
      body: JSON.stringify({ preferences: narrationState.preferences }),
    }).catch(() => {});
  }
}

// ============================================================
// APRESENTAÇÃO E CONTROLE DE ENTRADA NA AULA (MODAL DE NARRAÇÃO)
// ============================================================

/**
 * Exibe a tela de escolha da narração antes de iniciar a aula.
 * Permite ao aluno optar explicitamente por ativar ou continuar sem áudio.
 * @param {Function} [onActivate] - Callback chamado se o aluno optar por ativar
 * @param {Function} [onDecline]  - Callback chamado se o aluno optar por continuar sem áudio
 */
export function showNarrationModal(onActivate, onDecline) {
  const existingModal = document.getElementById('narrationOnboardingModal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'narrationOnboardingModal';
  modal.className = 'narration-modal-overlay';
  modal.innerHTML = `
    <div class="narration-modal-card" role="dialog" aria-modal="true" aria-labelledby="narrationModalTitle">
      <button type="button" class="narration-modal-close" id="btnNarrationClose" title="Fechar e continuar sem áudio">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="narration-modal-icon-badge">🎧</div>

      <h3 class="narration-modal-title" id="narrationModalTitle">Aprenda também ouvindo! 🎧</h3>

      <div class="narration-modal-body">
        <p>A Edev conta com narração por voz para tornar suas aulas mais dinâmicas e ajudar você a acompanhar as explicações enquanto estuda.</p>
        <p>Você pode ouvir o conteúdo com voz natural, acompanhar o destaque das palavras em tempo real e reouvir qualquer trecho quando quiser.</p>
        <p>Deseja ativar a narração para esta aula?</p>
      </div>

      <div class="narration-modal-actions">
        <button type="button" class="btn-narration-primary" id="btnNarrationActivate">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Ativar narração
        </button>
        <button type="button" class="btn-narration-secondary" id="btnNarrationDecline">
          Continuar sem áudio
        </button>
      </div>
    </div>
  `;

  const targetContainer = document.fullscreenElement || document.getElementById('page-aula') || document.body;
  targetContainer.appendChild(modal);

  const cleanupListeners = () => {
    document.removeEventListener('keydown', handleKeydown);
  };

  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      cleanupListeners();
      modal.remove();
      updateTopbarButtonUi();
      if (typeof onDecline === 'function') onDecline();
    }
  };
  document.addEventListener('keydown', handleKeydown);

  // Ação 1: Ativar narração (usuário tocou no modal -> desbloqueia o áudio e inicia síncrono no mesmo callstack)
  document.getElementById('btnNarrationActivate')?.addEventListener('click', () => {
    cleanupListeners();
    unlockAudioForIOS();
    modal.remove();
    updateTopbarButtonUi();
    if (typeof onActivate === 'function') {
      onActivate();
    }
  });

  // Ação 2: Continuar sem áudio
  document.getElementById('btnNarrationDecline')?.addEventListener('click', () => {
    cleanupListeners();
    modal.remove();
    updateTopbarButtonUi();
    if (typeof onDecline === 'function') {
      onDecline();
    }
  });

  // Ação 3: Fechar no X ou backdrop (continua sem áudio)
  const handleDismiss = () => {
    cleanupListeners();
    modal.remove();
    updateTopbarButtonUi();
    if (typeof onDecline === 'function') {
      onDecline();
    }
  };

  document.getElementById('btnNarrationClose')?.addEventListener('click', handleDismiss);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) handleDismiss();
  });

  return true;
}

export const checkAndShowOnboarding = showNarrationModal;

// ============================================================
// CARREGAMENTO E SELEÇÃO DE VOZES (pt-BR / iOS / Desktop)
// ============================================================

let _cachedVoices = [];

function refreshVoicesCache() {
  if (!('speechSynthesis' in window)) return [];
  const v = window.speechSynthesis.getVoices() || [];
  if (v.length > 0) {
    _cachedVoices = v;
  }
  return _cachedVoices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  refreshVoicesCache();
  window.speechSynthesis.onvoiceschanged = () => {
    refreshVoicesCache();
    selectBestVoiceSync();
  };
}

/**
 * Seleciona a melhor voz disponível em Português de forma síncrona,
 * garantindo compatibilidade imediata no clique do iOS.
 */
function selectBestVoiceSync() {
  const voices = refreshVoicesCache();

  const isPtBr = (v) => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    return lang === 'pt-br' || lang.startsWith('pt-br');
  };

  const isPortugal = (v) => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    const name = (v.name || '').toLowerCase();
    return lang === 'pt-pt' || name.includes('portugal');
  };

  const scoreVoice = (v) => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    const name = (v.name || '').toLowerCase();

    if (!lang.startsWith('pt')) return -100;
    if (isPortugal(v)) return -60; // Descarta sotaque europeu

    let score = 50;

    if (isPtBr(v)) score += 40;

    // 1. Microsoft Edge / Nuvem: Francisca e Antonio
    if (name.includes('natural') || name.includes('neural')) score += 100;
    if (name.includes('online')) score += 80;
    if (name.includes('francisca')) score += 60;
    if (name.includes('antonio')) score += 55;

    // 2. Apple iOS / macOS: Luciana e Felipe (vozes nativas do iPhone/iPad)
    if (name.includes('luciana')) score += 50;
    if (name.includes('felipe')) score += 45;

    // 3. Google Chrome / Android: Google português do Brasil
    if (name.includes('google português') || name.includes('google')) score += 40;

    // 4. Vozes padrão locais (Maria Desktop)
    if (name.includes('maria') || name.includes('daniel')) score += 10;

    if (v.default) score += 5;

    return score;
  };

  const ranked = [...voices]
    .map((v) => ({ voice: v, score: scoreVoice(v) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const best = ranked.length > 0 ? ranked[0].voice : voices.find((v) => (v.lang || '').toLowerCase().startsWith('pt')) || null;

  narrationState.selectedVoice = best;

  // Calibração de perfil de fala por dispositivo e motor
  if (best) {
    const name = (best.name || '').toLowerCase();
    if (name.includes('natural') || name.includes('online') || name.includes('francisca') || name.includes('antonio')) {
      narrationState.voiceProfile = { rate: 1.0, pitch: 1.0 };
    } else if (name.includes('google')) {
      narrationState.voiceProfile = { rate: 0.98, pitch: 1.0 };
    } else if (name.includes('luciana') || name.includes('felipe') || isIOS) {
      // No iOS Safari, taxa de 1.0 é perfeitamente calibrada
      narrationState.voiceProfile = { rate: 1.0, pitch: 1.0 };
    } else {
      // SAPI desktop antiga
      narrationState.voiceProfile = { rate: 0.94, pitch: 0.98 };
    }
  } else {
    // Configuração para iOS quando getVoices() ainda não populou
    narrationState.voiceProfile = { rate: isIOS ? 1.0 : 0.98, pitch: 1.0 };
  }

  return best;
}

// ============================================================
// DICIONÁRIO FONÉTICO DIDÁTICO PARA PROGRAMAÇÃO
// ============================================================

/**
 * Converte termos didáticos e código em fala natural de professor em português
 */
function cleanTextForSpeech(text) {
  if (!text) return '';

  let cleaned = text
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    // Abreviações didáticas
    .replace(/\bex\.:\s*/gi, 'por exemplo: ')
    .replace(/\bex:\s*/gi, 'por exemplo: ')
    .replace(/\bp\.ex\.:\s*/gi, 'por exemplo: ')
    .replace(/\betc\.?/gi, 'e assim por diante')
    // Substitui reticências por ponto simples para evitar pausas excessivamente longas do sintetizador
    .replace(/\s*(\.{3,}|…)/g, '. ')
    // Remove pontuações duplicadas ou consecutivas
    .replace(/([.,!?:;])\s*[.,!?:;]+/g, '$1 ')
    // Linguagens e Tecnologias
    .replace(/\bPython\b/gi, 'Páiton')
    .replace(/\bJavaScript\b/gi, 'Java Script')
    .replace(/\bJS\b/g, 'Jota Esse')
    .replace(/\bHTML\b/g, 'Agá Tê Eme Éle')
    .replace(/\bCSS\b/g, 'Cê Esse Esse')
    .replace(/\bAPI\b/g, 'A P I')
    .replace(/\bUI\b/g, 'U I')
    // Comandos e Funções de Programação
    .replace(/\bprint\(\)/gi, 'comando print')
    .replace(/\binput\(\)/gi, 'função input')
    .replace(/\blen\(\)/gi, 'função len')
    .replace(/\brange\(\)/gi, 'função range')
    .replace(/\bint\(\)/gi, 'função int')
    .replace(/\bstr\(\)/gi, 'função str')
    .replace(/\bfloat\(\)/gi, 'função float')
    .replace(/\bdef\s+/gi, 'comando def ')
    .replace(/\breturn\s+/gi, 'comando return ')
    .replace(/\btrue\b/gi, 'True')
    .replace(/\bfalse\b/gi, 'False')
    .replace(/\bnull\b/gi, 'nulo')
    .replace(/\bundefined\b/gi, 'indefinido')
    // Operadores sem pausas artificiais duplas
    .replace(/===/g, ' é estritamente igual a ')
    .replace(/==/g, ' é igual a ')
    .replace(/!=/g, ' é diferente de ')
    .replace(/>=/g, ' maior ou igual a ')
    .replace(/<=/g, ' menor ou igual a ')
    .replace(/=>/g, ' vai para ')
    .replace(/&&/g, ' e ')
    .replace(/\|\|/g, ' ou ')
    .replace(/[{}<>\[\]`_#*~|\\]/g, ' ')
    .replace(/^[•\-\*]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned;
}

// ============================================================
// PREPARAÇÃO DO DOM: INJEÇÃO DE SPANS DE PALAVRAS E BOTÕES
// ============================================================

/**
 * Envolve cada palavra do texto dentro de um span (.narration-word)
 * preservando a hierarquia do DOM (tags strong, em, links).
 */
function wrapWordsInElement(blockEl) {
  const walker = document.createTreeWalker(blockEl, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (node.parentElement && (node.parentElement.closest('.btn-repeat-seg') || node.parentElement.closest('code') || node.parentElement.closest('pre'))) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  const wordSpans = [];

  textNodes.forEach((node) => {
    const raw = node.nodeValue;
    if (!raw || !raw.trim()) return;

    const tokens = raw.split(/(\s+)/);
    const fragment = document.createDocumentFragment();

    tokens.forEach((token) => {
      if (!token) return;
      if (/\s+/.test(token)) {
        fragment.appendChild(document.createTextNode(token));
      } else {
        const span = document.createElement('span');
        span.className = 'narration-word';
        span.textContent = token;
        fragment.appendChild(span);
        wordSpans.push(span);
      }
    });

    node.parentNode.replaceChild(fragment, node);
  });

  return wordSpans;
}

/**
 * Inspeciona a teoria da aula, injeta os spans de palavra, botões de repetição
 * e divide cada parágrafo em sentenças didáticas com respiração natural.
 */
function prepareTheoryStructure(theoryEl) {
  if (!theoryEl) return [];

  // Remove qualquer resquício anterior para evitar duplicações
  theoryEl.querySelectorAll('.btn-repeat-seg').forEach((b) => b.remove());
  theoryEl.querySelectorAll('.word-active').forEach((el) => el.classList.remove('word-active'));
  theoryEl.querySelectorAll('.narration-block-active').forEach((el) => el.classList.remove('narration-block-active'));

  const candidateBlocks = theoryEl.querySelectorAll('h1, h2, h3, h4, p, li, blockquote');
  const sentencesList = [];
  let blockCounter = 0;

  candidateBlocks.forEach((blockEl) => {
    if (
      blockEl.closest('.aula-goals-box') ||
      blockEl.closest('pre') ||
      blockEl.closest('.code') ||
      blockEl.closest('.command-spotlight-code') ||
      blockEl.closest('script') ||
      blockEl.closest('style')
    ) {
      return;
    }

    blockCounter++;
    const blockId = `edev-block-${blockCounter}`;
    blockEl.setAttribute('data-narration-block', blockId);

    const wordSpans = wrapWordsInElement(blockEl);
    if (!wordSpans || wordSpans.length === 0) return;

    if (!blockEl.classList.contains('narration-seg-wrapper')) {
      blockEl.classList.add('narration-seg-wrapper');
    }

    const btnRepeat = document.createElement('button');
    btnRepeat.type = 'button';
    btnRepeat.className = 'btn-repeat-seg';
    btnRepeat.title = 'Ouvir este trecho novamente';
    btnRepeat.setAttribute('aria-label', 'Repetir este parágrafo');
    btnRepeat.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    `;

    // Toque direto no botão de repetição: desbloqueia o áudio imediatamente no iOS
    btnRepeat.addEventListener('click', (e) => {
      e.stopPropagation();
      unlockAudioForIOS();
      playParagraph(blockId);
    });

    blockEl.appendChild(btnRepeat);

    const clone = blockEl.cloneNode(true);
    clone.querySelectorAll('code, pre, .btn-repeat-seg, script, style').forEach((c) => c.remove());
    const fullText = (clone.textContent || '').replace(/\s+/g, ' ').trim();
    if (!fullText || fullText.length < 3) return;

    const isHeader = /^H[1-6]$/i.test(blockEl.tagName);

    if (isHeader) {
      const spokenTitle = cleanTextForSpeech(fullText);
      sentencesList.push({
        blockId,
        blockEl,
        isHeader: true,
        text: spokenTitle.replace(/[.!?:]+$/, '') + '.',
        wordSpans,
      });
      return;
    }

    // Divide por sentenças didáticas (. ! ? ;)
    const rawSentences = fullText.split(/(?<=[.!?])\s+/);
    let currentWordIdx = 0;

    rawSentences.forEach((rawSent, sIdx) => {
      const trimmed = rawSent.trim();
      if (!trimmed || trimmed.length < 2) return;

      const spokenSentence = cleanTextForSpeech(trimmed);
      if (!spokenSentence) return;

      const sentWordCount = trimmed.split(/\s+/).filter(Boolean).length;
      const sentSpans = wordSpans.slice(currentWordIdx, currentWordIdx + sentWordCount);
      currentWordIdx += sentWordCount;

      sentencesList.push({
        blockId,
        blockEl,
        isHeader: false,
        isLastOfBlock: sIdx === rawSentences.length - 1,
        text: spokenSentence,
        wordSpans: sentSpans,
      });
    });
  });

  return sentencesList;
}

// ============================================================
// WATCHDOG KEEP-ALIVE (CHROMIUM) & CONTROLE DE TIMERS
// ============================================================

function startKeepAlive() {
  stopKeepAlive();
  // No iOS Safari o keep-alive via pause/resume pode pausar indevidamente; ativo em Desktop/Chromium
  if (isIOS) return;

  narrationState.keepAliveTimer = setInterval(() => {
    if (narrationState.isPlaying && !narrationState.isPaused && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }
  }, 8500);
}

function stopKeepAlive() {
  if (narrationState.keepAliveTimer) {
    clearInterval(narrationState.keepAliveTimer);
    narrationState.keepAliveTimer = null;
  }
}

let _startWatchdogTimer = null;

function clearStartWatchdog() {
  if (_startWatchdogTimer) {
    clearTimeout(_startWatchdogTimer);
    _startWatchdogTimer = null;
  }
}

function clearWordFallbackTimer() {
  if (narrationState.wordFallbackTimer) {
    clearInterval(narrationState.wordFallbackTimer);
    narrationState.wordFallbackTimer = null;
  }
}

// ============================================================
// MOTOR DE FALA COM COMPATIBILIDADE SAFARI iOS E onboundary
// ============================================================

/**
 * Executa a sentença didática atual da fila
 */
function playCurrentSentence() {
  if (!('speechSynthesis' in window)) {
    showNarrationToast('Seu navegador não possui suporte à síntese de voz.');
    stopNarration();
    return;
  }

  clearWordFallbackTimer();
  clearStartWatchdog();

  // Fim da aula
  if (narrationState.currentIndex >= narrationState.sentences.length) {
    stopNarration();
    return;
  }

  const item = narrationState.sentences[narrationState.currentIndex];
  if (!item || !item.text) {
    narrationState.currentIndex++;
    playCurrentSentence();
    return;
  }

  // Se estiver repetindo apenas um parágrafo e este item pertencer a outro bloco, encerra
  if (narrationState.repeatSingleBlockId && item.blockId !== narrationState.repeatSingleBlockId) {
    stopNarration();
    return;
  }

  // Se o sintetizador estiver em estado de pausa no Chromium, destrava
  try {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  } catch (e) {}

  const utterance = new SpeechSynthesisUtterance(item.text);

  // Aplica voz ou idioma pt-BR
  if (narrationState.selectedVoice) {
    utterance.voice = narrationState.selectedVoice;
    utterance.lang = narrationState.selectedVoice.lang || 'pt-BR';
  } else {
    // No Safari iOS, definir lang = 'pt-BR' faz o sistema usar a voz brasileira nativa (Luciana)
    utterance.lang = 'pt-BR';
  }

  utterance.rate = narrationState.voiceProfile.rate || (isIOS ? 1.0 : 0.98);
  utterance.pitch = narrationState.voiceProfile.pitch || 1.0;

  // Monta mapa de posições de caracteres para o onboundary
  const wordsTokens = item.text.split(/(\s+)/);
  const wordsMap = [];
  let charPos = 0;

  wordsTokens.forEach((tok) => {
    if (!tok) return;
    if (/\s+/.test(tok)) {
      charPos += tok.length;
    } else {
      wordsMap.push({
        text: tok,
        start: charPos,
        end: charPos + tok.length,
      });
      charPos += tok.length;
    }
  });

  let hasBoundaryFired = false;

  // ── Evento onstart: Ativa o bloco pai e rolagem suave ────────
  utterance.onstart = () => {
    clearStartWatchdog();
    narrationState.isPlaying = true;
    narrationState.isPaused = false;
    narrationState.isLoading = false;

    if (narrationState.activeBlockElement && narrationState.activeBlockElement !== item.blockEl) {
      narrationState.activeBlockElement.classList.remove('narration-block-active');
    }

    if (item.blockEl) {
      item.blockEl.classList.add('narration-block-active');
      narrationState.activeBlockElement = item.blockEl;

      try {
        item.blockEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } catch (e) {}
    }

    updateTopbarButtonUi();

    // ── FALLBACK AUTOMÁTICO PARA iOS (se onboundary não disparar) ──
    // No Safari do iPhone/iPad, onboundary pode não ser emitido pelo WebKit.
    // Este temporizador calcula a cadência da frase e avança as palavras suavemente.
    if (item.wordSpans && item.wordSpans.length > 0) {
      const wordCount = item.wordSpans.length;
      // Estima ~160 palavras por minuto com a taxa de fala aplicada
      const approxDurationMs = Math.max(800, (wordCount / (160 * (utterance.rate || 1.0))) * 60000);
      const intervalMs = Math.max(120, Math.round(approxDurationMs / wordCount));

      let stepIdx = 0;
      narrationState.wordFallbackTimer = setInterval(() => {
        // Se o evento nativo disparar, o fallback desliga imediatamente
        if (hasBoundaryFired) {
          clearWordFallbackTimer();
          return;
        }

        if (stepIdx < wordCount) {
          const target = item.wordSpans[stepIdx];
          if (narrationState.activeWordSpan && narrationState.activeWordSpan !== target) {
            narrationState.activeWordSpan.classList.remove('word-active');
          }
          if (target) {
            target.classList.add('word-active');
            narrationState.activeWordSpan = target;
          }
          stepIdx++;
        } else {
          clearWordFallbackTimer();
        }
      }, intervalMs);
    }
  };

  // ── Evento onboundary: Sincronização palavra por palavra nativa ──
  utterance.onboundary = (event) => {
    if (event.name !== 'word' && event.name !== undefined) return;
    hasBoundaryFired = true;
    clearWordFallbackTimer();

    const charIndex = typeof event.charIndex === 'number' ? event.charIndex : 0;

    let wordIdx = wordsMap.findIndex((w) => charIndex >= w.start && charIndex < w.end);
    if (wordIdx < 0) {
      wordIdx = wordsMap.findIndex((w) => Math.abs(charIndex - w.start) <= 2);
    }

    if (wordIdx >= 0 && item.wordSpans && item.wordSpans[wordIdx]) {
      const targetSpan = item.wordSpans[wordIdx];

      if (narrationState.activeWordSpan && narrationState.activeWordSpan !== targetSpan) {
        narrationState.activeWordSpan.classList.remove('word-active');
      }

      targetSpan.classList.add('word-active');
      narrationState.activeWordSpan = targetSpan;
    }
  };

  // ── Evento onend: Respiração humana didática ──────────────────
  utterance.onend = () => {
    clearStartWatchdog();
    clearWordFallbackTimer();

    if (narrationState.activeWordSpan) {
      narrationState.activeWordSpan.classList.remove('word-active');
      narrationState.activeWordSpan = null;
    }

    if (item.isLastOfBlock && !narrationState.repeatSingleBlockId) {
      if (item.blockEl) {
        item.blockEl.classList.remove('narration-block-active');
      }
    }

    if (narrationState.repeatSingleBlockId && item.isLastOfBlock) {
      stopNarration();
      return;
    }

    narrationState.currentIndex++;

    // Pausas artificiais calibradas para complementar as pausas acústicas naturais
    // do sintetizador (que já adiciona ~100-200ms ao encontrar pontuação).
    // Valores pequenos evitam silêncios duplos sem eliminar a respiração natural.
    const pauseMs = item.isHeader ? 220 : item.isLastOfBlock ? 140 : 80;

    narrationState.pauseBetweenTimer = setTimeout(() => {
      if (narrationState.isPlaying && !narrationState.isPaused) {
        playCurrentSentence();
      }
    }, pauseMs);
  };

  // ── Evento onerror: Tratamento humanizado de falhas ──────────
  utterance.onerror = (e) => {
    clearStartWatchdog();
    clearWordFallbackTimer();

    if (e.error === 'canceled' || e.error === 'interrupted') {
      narrationState.isLoading = false;
      updateTopbarButtonUi();
      return;
    }

    if (narrationState.activeWordSpan) {
      narrationState.activeWordSpan.classList.remove('word-active');
      narrationState.activeWordSpan = null;
    }

    // Tratamento de bloqueio específico do Safari / iOS
    if (e.error === 'not-allowed') {
      showNarrationToast('O Safari bloqueou o áudio. Toque no botão "Ouvir aula" para iniciar.');
      stopNarration();
      return;
    }

    if (e.error === 'audio-busy' || e.error === 'language-unavailable') {
      showNarrationToast('Voz em português indisponível no dispositivo. Verifique as configurações de acessibilidade.');
      stopNarration();
      return;
    }

    console.warn('[Edev Narração] Erro no utterance:', e.error);
    narrationState.currentIndex++;
    playCurrentSentence();
  };

  startKeepAlive();

  // Watchdog de inicialização: se após 1200ms onstart não tiver disparado, tenta desobstruir a fila do Chrome
  _startWatchdogTimer = setTimeout(() => {
    if (narrationState.isLoading && !window.speechSynthesis.speaking) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch (e) {}
    }
  }, 1200);

  window.speechSynthesis.speak(utterance);
}

// ============================================================
// CONTROLES PÚBLICOS DE REPRODUÇÃO (SÍNCRONOS NO CLIQUE)
// ============================================================

/**
 * Inicia ou alterna a reprodução da aula atual
 * IMPORTANTE: Executado de forma síncrona dentro da ação de toque do usuário para atender ao Safari iOS.
 */
export function togglePlayLesson(courseId, lessonId, theoryHtml, exampleCode = '') {
  if (!('speechSynthesis' in window)) {
    showNarrationToast('Síntese de voz não suportada pelo seu dispositivo.');
    return;
  }

  // 0. Previne cliques duplicados rápidos (debounce de 250ms)
  const now = Date.now();
  if (narrationState.lastActionTime && now - narrationState.lastActionTime < 250) {
    return;
  }
  narrationState.lastActionTime = now;

  // 1. Desbloqueio imediato do WebKit no iOS no toque do usuário
  unlockAudioForIOS();

  // 2. Se estiver tocando na MESMA aula, pausa
  if (narrationState.isPlaying && !narrationState.isPaused && narrationState.currentLessonId === lessonId) {
    if (narrationState.pauseBetweenTimer) {
      clearTimeout(narrationState.pauseBetweenTimer);
      narrationState.pauseBetweenTimer = null;
    }
    clearWordFallbackTimer();
    clearStartWatchdog();

    if (isIOS) {
      // No iOS Safari, pause() trava permanentemente a fila.
      // Cancelamos o utterance ativo e guardamos o currentIndex para retomar síncrono no próximo clique.
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    } else {
      try {
        window.speechSynthesis.pause();
      } catch (e) {}
    }

    narrationState.isPaused = true;
    updateTopbarButtonUi();
    return;
  }

  // 3. Se estiver pausado na MESMA aula, retoma
  if (narrationState.isPaused && narrationState.currentLessonId === lessonId) {
    narrationState.isPaused = false;
    narrationState.isPlaying = true;
    startKeepAlive();
    updateTopbarButtonUi();

    if (isIOS) {
      // No iOS Safari, retoma chamando speak() diretamente a partir deste clique
      playCurrentSentence();
    } else {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        } else {
          playCurrentSentence();
        }
      } catch (e) {
        playCurrentSentence();
      }
    }
    return;
  }

  // 4. Início do zero ou troca de aula
  // Se houver fala ativa de outra aula ou processo preso, cancelamos apenas aqui
  try {
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  } catch (e) {}

  stopKeepAlive();
  if (narrationState.pauseBetweenTimer) {
    clearTimeout(narrationState.pauseBetweenTimer);
    narrationState.pauseBetweenTimer = null;
  }
  clearWordFallbackTimer();
  clearStartWatchdog();

  if (narrationState.activeWordSpan) {
    narrationState.activeWordSpan.classList.remove('word-active');
    narrationState.activeWordSpan = null;
  }
  document.querySelectorAll('.word-active').forEach((el) => el.classList.remove('word-active'));

  if (narrationState.activeBlockElement) {
    narrationState.activeBlockElement.classList.remove('narration-block-active');
    narrationState.activeBlockElement = null;
  }
  document.querySelectorAll('.narration-block-active').forEach((el) => el.classList.remove('narration-block-active'));

  narrationState.currentCourseId = courseId;
  narrationState.currentLessonId = lessonId;
  narrationState.repeatSingleBlockId = null;

  const theoryEl = document.getElementById('theory');
  if (!theoryEl) return;

  // Feedback visual imediato de inicialização
  narrationState.isLoading = true;
  narrationState.isPlaying = false;
  narrationState.isPaused = false;
  updateTopbarButtonUi();

  // Seleciona voz de forma síncrona para não quebrar o contexto de toque do iOS
  selectBestVoiceSync();

  // Prepara estrutura do DOM e sentenças didáticas (reaproveita se já calculadas)
  if (!narrationState.sentences || narrationState.sentences.length === 0 || narrationState.sentences[0]?.blockEl?.closest('#theory') !== theoryEl) {
    narrationState.sentences = prepareTheoryStructure(theoryEl);
  }

  if (!narrationState.sentences || narrationState.sentences.length === 0) {
    narrationState.isLoading = false;
    updateTopbarButtonUi();
    showNarrationToast('Nenhum texto didático encontrado para narrar nesta aula.');
    return;
  }

  narrationState.currentIndex = 0;

  // speak() disparado SINCRONAMENTE dentro do mesmo callstack do evento do usuário
  playCurrentSentence();
}

/**
 * Toca especificamente um parágrafo da aula (reforço didático pontual)
 */
export function playParagraph(blockId) {
  if (!('speechSynthesis' in window)) return;

  unlockAudioForIOS();
  stopNarration();

  const theoryEl = document.getElementById('theory');
  if (!theoryEl) return;

  selectBestVoiceSync();

  if (!narrationState.sentences || narrationState.sentences.length === 0) {
    narrationState.sentences = prepareTheoryStructure(theoryEl);
  }

  const startIdx = narrationState.sentences.findIndex((s) => s.blockId === blockId);
  if (startIdx < 0) return;

  narrationState.repeatSingleBlockId = blockId;
  narrationState.currentIndex = startIdx;
  narrationState.isPlaying = true;
  narrationState.isPaused = false;

  updateTopbarButtonUi();
  playCurrentSentence();
}

export const playSegment = playParagraph;

/**
 * Para completamente a narração e limpa todos os destaques
 */
export function stopNarration() {
  stopKeepAlive();
  clearStartWatchdog();
  clearWordFallbackTimer();

  if (narrationState.pauseBetweenTimer) {
    clearTimeout(narrationState.pauseBetweenTimer);
    narrationState.pauseBetweenTimer = null;
  }

  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }

  // Limpa destaques visuais
  if (narrationState.activeWordSpan) {
    narrationState.activeWordSpan.classList.remove('word-active');
    narrationState.activeWordSpan = null;
  }
  document.querySelectorAll('.word-active').forEach((el) => el.classList.remove('word-active'));

  if (narrationState.activeBlockElement) {
    narrationState.activeBlockElement.classList.remove('narration-block-active');
    narrationState.activeBlockElement = null;
  }
  document.querySelectorAll('.narration-block-active').forEach((el) => el.classList.remove('narration-block-active'));

  narrationState.isPlaying = false;
  narrationState.isPaused = false;
  narrationState.isLoading = false;
  narrationState.repeatSingleBlockId = null;
  narrationState.currentIndex = 0;
  narrationState.currentLessonId = null;
  narrationState.currentCourseId = null;

  updateTopbarButtonUi();
}

export const stopTts = stopNarration;

// ============================================================
// ATUALIZAÇÃO DA INTERFACE DO BOTÃO SUPERIOR (TOPBAR)
// ============================================================

/**
 * Atualiza o botão no topo da aula (#btnTts) e o botão Parar (#btnStopTts)
 */
export function updateTopbarButtonUi() {
  const btn = document.getElementById('btnTts');
  if (!btn) return;

  const icon = btn.querySelector('.tts-icon');
  const label = btn.querySelector('.tts-text');

  if (narrationState.isLoading) {
    btn.classList.add('tts-active', 'tts-loading');
    if (icon) icon.textContent = '⏳';
    if (label) label.textContent = 'Iniciando...';
    btn.title = 'Iniciando narração da aula...';
  } else if (narrationState.isPlaying && !narrationState.isPaused) {
    btn.classList.remove('tts-loading');
    btn.classList.add('tts-active');
    if (icon) {
      icon.innerHTML = `
        <span class="tts-pulse-indicator">
          <span class="tts-pulse-bar"></span>
          <span class="tts-pulse-bar"></span>
          <span class="tts-pulse-bar"></span>
        </span>
      `;
    }
    if (label) label.textContent = 'Pausar aula';
    btn.title = 'Pausar narração da aula';
  } else if (narrationState.isPaused) {
    btn.classList.remove('tts-active', 'tts-loading');
    if (icon) icon.textContent = '▶️';
    if (label) label.textContent = 'Continuar';
    btn.title = 'Continuar ouvindo aula de onde parou';
  } else {
    btn.classList.remove('tts-active', 'tts-loading');
    if (icon) icon.textContent = '🎧';
    if (label) label.textContent = 'Ouvir aula';
    btn.title = 'Ouvir aula em voz alta';
  }

  const btnStop = document.getElementById('btnStopTts');
  if (btnStop) {
    const isStarted = narrationState.isPlaying || narrationState.isPaused || narrationState.isLoading;
    btnStop.hidden = !isStarted;
  }
}

/**
 * Inicializa os botões e controles permanentes de narração
 */
export function initNarrationControls() {
  const btnStop = document.getElementById('btnStopTts');
  if (btnStop) {
    btnStop.onclick = () => {
      stopNarration();
    };
  }
}

/**
 * Exibe uma notificação discreta e temporária ao aluno
 */
export function showNarrationToast(message) {
  document.querySelectorAll('.narration-toast').forEach((t) => t.remove());

  const toast = document.createElement('div');
  toast.className = 'narration-toast';
  toast.innerHTML = `
    <span style="font-size: 1.15rem;">🎧</span>
    <span>${message}</span>
  `;

  const container = document.fullscreenElement || document.getElementById('page-aula') || document.body;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('narration-toast-hide');
    setTimeout(() => toast.remove(), 260);
  }, 4500);
}
