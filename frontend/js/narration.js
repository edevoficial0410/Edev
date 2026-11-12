/**
 * js/narration.js
 * Sistema de Narração da Edev (Nativo via Web Speech API)
 *
 * - 100% nativo no navegador: zero chamadas externas, sem custos, cotas ou limites de uso.
 * - Seleção inteligente de vozes em Português do Brasil (pt-BR) de alta fidelidade
 *   (prioriza Microsoft Natural/Online, Google pt-BR e vozes neurais locais).
 * - Segmentação inteligente em parágrafos e frases que contorna o bug de 15s do Chromium.
 * - Watchdog keep-alive periódico para garantir reprodução contínua e sem cortes.
 * - Destaque visual sincronizado parágrafo a parágrafo com rolagem suave automática.
 * - Higienização didática: pula blocos de código para não ler sintaxe robótica.
 * - Botão discreto em cada parágrafo para reouvir qualquer explicação pontual.
 * - Controles completos: Ouvir aula, Pausar, Continuar e Parar.
 * - Cancelamento seguro e imediato ao trocar de aula ou sair da página.
 */

import { isAuthenticated, apiFetch } from './auth.js';

// Chave para cache local de preferências
const PREFS_STORAGE_KEY = 'edev_narration_prefs';

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
  currentIndex: 0,
  segments: [], // [{ id, text, element }]
  repeatSingle: false, // se estiver ouvindo apenas um parágrafo isolado
  keepAliveTimer: null,
  activeElement: null,
};

// ============================================================
// PREFERÊNCIAS DO ALUNO (LOCAL + SINCRONIZAÇÃO OPCIONAL)
// ============================================================

/**
 * Carrega preferências do aluno
 */
export async function loadNarrationPreferences() {
  // 1. Carrega do localStorage para resposta imediata
  try {
    const raw = localStorage.getItem(PREFS_STORAGE_KEY);
    if (raw) {
      narrationState.preferences = { ...narrationState.preferences, ...JSON.parse(raw) };
    }
  } catch (e) {}

  // 2. Se autenticado, sincroniza silenciosamente com o backend se disponível
  if (isAuthenticated()) {
    try {
      const res = await apiFetch('/api/users/preferences');
      if (res?.preferences) {
        narrationState.preferences = { ...narrationState.preferences, ...res.preferences };
        try {
          localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(narrationState.preferences));
        } catch (e) {}
      }
    } catch (err) {
      // Falha silenciosa no carregamento remoto (mantém preferências locais)
    }
  }

  return narrationState.preferences;
}

/**
 * Salva preferências do aluno
 */
export async function saveNarrationPreferences(newPrefs) {
  narrationState.preferences = { ...narrationState.preferences, ...newPrefs };

  // 1. Persistência local imediata
  try {
    localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(narrationState.preferences));
  } catch (e) {}

  // 2. Persistência remota opcional se logado
  if (isAuthenticated()) {
    try {
      await apiFetch('/api/users/preferences', {
        method: 'PUT',
        body: JSON.stringify({ preferences: narrationState.preferences }),
      });
    } catch (err) {
      // Não interrompe o fluxo local se o backend estiver offline
    }
  }
}

// ============================================================
// APRESENTAÇÃO INICIAL DA NARRAÇÃO (ONBOARDING MODAL)
// ============================================================

/**
 * Exibe a apresentação amigável da narração (apenas na primeira vez)
 * @param {Function} [onActivate] - Callback chamado se o aluno optar por ativar
 */
export function checkAndShowOnboarding(onActivate) {
  if (narrationState.preferences.narrationOnboardingSeen) {
    return;
  }

  const existingModal = document.getElementById('narrationOnboardingModal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'narrationOnboardingModal';
  modal.className = 'narration-modal-overlay';
  modal.innerHTML = `
    <div class="narration-modal-card" role="dialog" aria-modal="true" aria-labelledby="narrationModalTitle">
      <button type="button" class="narration-modal-close" id="btnNarrationClose" title="Fechar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="narration-modal-icon-badge">🎧</div>

      <h3 class="narration-modal-title" id="narrationModalTitle">Aprenda também ouvindo! 🎧</h3>

      <div class="narration-modal-body">
        <p>Que tal experimentar uma nova maneira de aprender?</p>
        <p>A Edev conta com narração por voz para tornar suas aulas mais dinâmicas e ajudar você a acompanhar as explicações enquanto estuda.</p>
        <p>Você pode ouvir o conteúdo com voz natural brasileira, acompanhar o destaque dos parágrafos na tela e reouvir qualquer trecho quando quiser.</p>
        <p>Experimente! Você pode pausar ou ativar esse recurso a qualquer momento.</p>
      </div>

      <div class="narration-modal-actions">
        <button type="button" class="btn-narration-primary" id="btnNarrationActivate">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Ativar narração
        </button>
        <button type="button" class="btn-narration-secondary" id="btnNarrationDecline">
          Continuar lendo
        </button>
      </div>
    </div>
  `;

  const targetContainer = document.fullscreenElement || document.getElementById('page-aula') || document.body;
  targetContainer.appendChild(modal);

  // Ação 1: Ativar narração
  document.getElementById('btnNarrationActivate')?.addEventListener('click', async () => {
    modal.remove();
    await saveNarrationPreferences({
      narrationEnabled: true,
      narrationOnboardingSeen: true,
    });
    updateTopbarButtonUi();
    if (typeof onActivate === 'function') onActivate();
  });

  // Ação 2: Continuar lendo
  document.getElementById('btnNarrationDecline')?.addEventListener('click', async () => {
    modal.remove();
    await saveNarrationPreferences({
      narrationEnabled: false,
      narrationOnboardingSeen: true,
    });
    updateTopbarButtonUi();
  });

  // Ação 3: Fechar no X ou backdrop
  const handleDismiss = async () => {
    modal.remove();
    await saveNarrationPreferences({
      narrationEnabled: false,
      narrationOnboardingSeen: true,
    });
    updateTopbarButtonUi();
  };

  document.getElementById('btnNarrationClose')?.addEventListener('click', handleDismiss);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) handleDismiss();
  });
}

// ============================================================
// CARREGAMENTO E SELEÇÃO DE VOZES BRASILEIRAS (pt-BR)
// ============================================================

let _cachedVoices = [];

function getAvailableVoices() {
  if (!('speechSynthesis' in window)) return [];
  const voices = window.speechSynthesis.getVoices() || [];
  if (voices.length > 0) {
    _cachedVoices = voices;
  }
  return _cachedVoices;
}

// Escuta evento de carregamento assíncrono de vozes nos navegadores
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  getAvailableVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    getAvailableVoices();
  };
}

/**
 * Seleciona a melhor voz disponível em Português do Brasil com ranking de naturalidade
 */
function getBestPtBrVoice() {
  const voices = getAvailableVoices();
  if (!voices || voices.length === 0) return null;

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

    // Rejeita ou penaliza severamente idiomas que não sejam português
    if (!lang.startsWith('pt')) return -100;
    if (isPortugal(v)) return 5; // muito baixa prioridade para sotaque de Portugal

    let score = 50; // base para pt-BR

    if (isPtBr(v)) score += 30;

    // Prioridade máxima para vozes neurais / naturais modernas
    if (name.includes('natural') || name.includes('neural')) score += 50;
    if (name.includes('online')) score += 30;

    // Vozes reconhecidas de altíssima qualidade do Windows / Edge / Chrome / macOS
    if (name.includes('francisca') || name.includes('antonio')) score += 25;
    if (name.includes('google português') || name.includes('google')) score += 20;
    if (name.includes('maria') || name.includes('luciana') || name.includes('felipe')) score += 15;
    if (name.includes('daniel')) score += 10;

    if (v.default) score += 5;

    return score;
  };

  const candidates = [...voices]
    .map(v => ({ voice: v, score: scoreVoice(v) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (candidates.length > 0) {
    return candidates[0].voice;
  }

  // Fallback: primeira voz que comece com 'pt'
  return voices.find(v => (v.lang || '').toLowerCase().startsWith('pt')) || null;
}

// ============================================================
// HIGIENIZAÇÃO DE TEXTO PARA LEITURA DIDÁTICA E FLUIDA
// ============================================================

/**
 * Converte o texto bruto de um elemento HTML em fala amigável e natural,
 * evitando a pronúncia mecânica de pontuações e sintaxes de programação.
 */
function cleanTextForSpeech(text) {
  if (!text) return '';

  let cleaned = text
    // Remove emojis comuns para evitar que o leitor soletre seus nomes em voz alta
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    // Substitui abreviações didáticas frequentes
    .replace(/\bex\.:\s*/gi, 'por exemplo: ')
    .replace(/\bex:\s*/gi, 'por exemplo: ')
    .replace(/\bp\.ex\.:\s*/gi, 'por exemplo: ')
    .replace(/\bvs\.\s*/gi, ' versus ')
    .replace(/\betc\./gi, 'e assim por diante.')
    // Remove símbolos de código que atrapalham a fala
    .replace(/[{}<>\[\]`_#*~|\\]/g, ' ')
    .replace(/===/g, ' é estritamente igual a ')
    .replace(/==/g, ' é igual a ')
    .replace(/!=/g, ' é diferente de ')
    .replace(/=>/g, ' vai para ')
    .replace(/&&/g, ' e ')
    .replace(/\|\|/g, ' ou ')
    // Suaviza pontuações de lista (bullets como '•' ou '-')
    .replace(/^[•\-\*]\s+/gm, '')
    // Normaliza espaços e quebras
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned;
}

// ============================================================
// EXTRAÇÃO E PREPARAÇÃO DOS SEGMENTOS DO DOM (#theory)
// ============================================================

/**
 * Inspeciona o container de teoria e cria os segmentos de parágrafos/tópicos
 * vinculando os botões discretos de repetição de trecho.
 */
function prepareTheorySegments(theoryEl) {
  if (!theoryEl) return [];

  // Remove qualquer botão antigo de repetição para evitar duplicações
  theoryEl.querySelectorAll('.btn-repeat-seg').forEach(btn => btn.remove());

  // Elementos textuais a serem narrados
  const candidateBlocks = theoryEl.querySelectorAll('h1, h2, h3, h4, p, li, blockquote');
  const segments = [];
  let segCounter = 0;

  candidateBlocks.forEach((el) => {
    // Ignora elementos dentro de caixas de metas, blocos de código ou preformatados
    if (
      el.closest('.aula-goals-box') ||
      el.closest('pre') ||
      el.closest('.code') ||
      el.closest('.command-spotlight-code') ||
      el.closest('script') ||
      el.closest('style')
    ) {
      return;
    }

    // Cria clone para extrair o texto limpo sem tags inline de código
    const clone = el.cloneNode(true);
    clone.querySelectorAll('code, pre, .btn-repeat-seg, script, style').forEach(c => c.remove());
    const rawText = clone.textContent || '';
    const spokenText = cleanTextForSpeech(rawText);

    // Ignora blocos vazios ou excessivamente curtos (ex: apenas pontuação)
    if (!spokenText || spokenText.length < 3) return;

    segCounter++;
    const segId = `edev-seg-${segCounter}`;
    el.setAttribute('data-narration-seg', segId);

    // Adiciona botão discreto para reouvir este trecho específico
    if (!el.classList.contains('narration-seg-wrapper')) {
      el.classList.add('narration-seg-wrapper');
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

    btnRepeat.addEventListener('click', (e) => {
      e.stopPropagation();
      playSegment(segId);
    });

    el.appendChild(btnRepeat);

    segments.push({
      id: segId,
      element: el,
      text: spokenText,
    });
  });

  return segments;
}

// ============================================================
// WATCHDOG KEEP-ALIVE (CONTORNO DO BUG DE 15s DO CHROMIUM)
// ============================================================

function startKeepAlive() {
  stopKeepAlive();
  narrationState.keepAliveTimer = setInterval(() => {
    if (narrationState.isPlaying && !narrationState.isPaused && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }
  }, 9000);
}

function stopKeepAlive() {
  if (narrationState.keepAliveTimer) {
    clearInterval(narrationState.keepAliveTimer);
    narrationState.keepAliveTimer = null;
  }
}

// ============================================================
// MOTOR DE EXECUÇÃO DE FALA (Web Speech API)
// ============================================================

/**
 * Executa o segmento atual da fila
 */
function playCurrentSegment() {
  if (!('speechSynthesis' in window)) {
    showNarrationToast('Seu navegador não possui suporte à síntese de voz nativa.');
    stopNarration();
    return;
  }

  // Verifica se chegamos ao fim dos segmentos
  if (narrationState.currentIndex >= narrationState.segments.length) {
    stopNarration();
    return;
  }

  const seg = narrationState.segments[narrationState.currentIndex];
  if (!seg || !seg.text) {
    narrationState.currentIndex++;
    playCurrentSegment();
    return;
  }

  // Limpa utterance anterior
  try {
    window.speechSynthesis.cancel();
  } catch (e) {}

  const utterance = new SpeechSynthesisUtterance(seg.text);
  const voice = getBestPtBrVoice();

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || 'pt-BR';
  } else {
    utterance.lang = 'pt-BR';
  }

  // Velocidade didática e tom amigável
  utterance.rate = 0.98;
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    narrationState.isPlaying = true;
    narrationState.isPaused = false;
    narrationState.isLoading = false;

    // Atualiza destaque visual no DOM
    if (narrationState.activeElement && narrationState.activeElement !== seg.element) {
      narrationState.activeElement.classList.remove('narration-block-active');
    }

    if (seg.element) {
      seg.element.classList.add('narration-block-active');
      narrationState.activeElement = seg.element;

      // Rolagem suave automática para manter o parágrafo no campo visual
      try {
        seg.element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } catch (e) {}
    }

    updateTopbarButtonUi();
  };

  utterance.onend = () => {
    // Se o elemento ainda estiver ativo, remove a classe ao término do bloco
    if (seg.element) {
      seg.element.classList.remove('narration-block-active');
    }

    // Se estava ouvindo apenas um parágrafo repetido, encerra aqui
    if (narrationState.repeatSingle) {
      stopNarration();
      return;
    }

    // Avança para o próximo parágrafo
    narrationState.currentIndex++;
    playCurrentSegment();
  };

  utterance.onerror = (e) => {
    // 'canceled' ou 'interrupted' ocorrem normalmente quando o aluno pausa, para ou troca de aula
    if (e.error === 'canceled' || e.error === 'interrupted') {
      return;
    }
    console.warn('[Edev Narração] Erro no utterance:', e.error);

    // Se estava ouvindo trecho único, para; senão tenta avançar para o próximo bloco
    if (narrationState.repeatSingle) {
      stopNarration();
    } else {
      narrationState.currentIndex++;
      playCurrentSegment();
    }
  };

  startKeepAlive();
  window.speechSynthesis.speak(utterance);
}

// ============================================================
// CONTROLES PÚBLICOS DE REPRODUÇÃO
// ============================================================

/**
 * Inicia ou alterna a reprodução da aula atual
 */
export async function togglePlayLesson(courseId, lessonId, theoryHtml, exampleCode = '') {
  if (!('speechSynthesis' in window)) {
    showNarrationToast('Síntese de voz não suportada pelo seu navegador.');
    return;
  }

  // 1. Se estiver tocando na MESMA aula, pausa
  if (narrationState.isPlaying && !narrationState.isPaused && narrationState.currentLessonId === lessonId) {
    try {
      window.speechSynthesis.pause();
    } catch (e) {}
    narrationState.isPaused = true;
    updateTopbarButtonUi();
    return;
  }

  // 2. Se estiver pausado na MESMA aula, retoma
  if (narrationState.isPaused && narrationState.currentLessonId === lessonId) {
    try {
      window.speechSynthesis.resume();
      narrationState.isPaused = false;
      narrationState.isPlaying = true;
      startKeepAlive();
      updateTopbarButtonUi();
      return;
    } catch (e) {}
  }

  // 3. Se for outra aula ou início do zero: interrompe o anterior e inicia novo
  stopNarration();

  narrationState.currentCourseId = courseId;
  narrationState.currentLessonId = lessonId;
  narrationState.repeatSingle = false;

  const theoryEl = document.getElementById('theory');
  if (!theoryEl) return;

  // Extrai parágrafos e injeta botões de repetição
  const segments = prepareTheorySegments(theoryEl);
  if (!segments || segments.length === 0) {
    showNarrationToast('Nenhum texto didático encontrado para narrar nesta aula.');
    return;
  }

  narrationState.segments = segments;
  narrationState.currentIndex = 0;
  narrationState.isPlaying = true;
  narrationState.isPaused = false;

  updateTopbarButtonUi();
  playCurrentSegment();
}

/**
 * Toca especificamente um parágrafo da aula (reforço didático)
 */
export function playSegment(segmentId) {
  if (!('speechSynthesis' in window)) return;

  const segIdx = narrationState.segments.findIndex(s => s.id === segmentId);
  if (segIdx < 0) {
    // Se a lista de segmentos ainda não estava pronta, prepara agora
    const theoryEl = document.getElementById('theory');
    if (theoryEl) {
      narrationState.segments = prepareTheorySegments(theoryEl);
    }
  }

  const targetIdx = narrationState.segments.findIndex(s => s.id === segmentId);
  if (targetIdx < 0) return;

  // Cancela qualquer fala anterior
  try {
    window.speechSynthesis.cancel();
  } catch (e) {}

  narrationState.repeatSingle = true;
  narrationState.currentIndex = targetIdx;
  narrationState.isPlaying = true;
  narrationState.isPaused = false;

  updateTopbarButtonUi();
  playCurrentSegment();
}

/**
 * Para completamente a narração e reseta todos os estados
 */
export function stopNarration() {
  stopKeepAlive();

  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }

  // Remove destaque visual ativo
  if (narrationState.activeElement) {
    narrationState.activeElement.classList.remove('narration-block-active');
    narrationState.activeElement = null;
  }
  document.querySelectorAll('.narration-block-active').forEach(el => el.classList.remove('narration-block-active'));

  narrationState.isPlaying = false;
  narrationState.isPaused = false;
  narrationState.isLoading = false;
  narrationState.repeatSingle = false;
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

  if (narrationState.isPlaying && !narrationState.isPaused) {
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
    btn.classList.remove('tts-active');
    if (icon) icon.textContent = '▶️';
    if (label) label.textContent = 'Continuar';
    btn.title = 'Continuar ouvindo aula de onde parou';
  } else {
    btn.classList.remove('tts-active');
    if (icon) icon.textContent = '🎧';
    if (label) label.textContent = 'Ouvir aula';
    btn.title = 'Ouvir aula em voz alta';
  }

  // Gerencia visibilidade do botão "Parar" (#btnStopTts)
  const btnStop = document.getElementById('btnStopTts');
  if (btnStop) {
    const isStarted = narrationState.isPlaying || narrationState.isPaused;
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
  document.querySelectorAll('.narration-toast').forEach(t => t.remove());

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
  }, 4000);
}
