/**
 * js/aula.js
 * Renderização de aulas, verificação de desafios, dica/solução,
 * próxima aula, modo Focar Aula e melhorias de UX (TTS, leitura, objetivos, progresso).
 */

import { state, save, esc, norm, allLessons, bumpStreak, checkAchievements, navigate, openNavPage, onLeavePage } from './main.js';
import { COURSES } from '../data/cursos.js';
import { updateDashboard } from './dashboard.js';
import { isFounder, hasActiveSubscription } from './auth.js';

/** Curso e aula atualmente abertos */
let currentCourse = null;
let currentLesson = null;
let _sessionStart = null;

// ============================================================
// MODO ÁUDIO (TTS - TEXT TO SPEECH) (Melhoria 7)
// ============================================================

let _currentUtterance = null;
let _isTtsSpeaking = false;
let _isTtsPaused = false;

export function stopTts() {
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.warn('[Edev TTS] Erro ao cancelar fala:', e);
    }
  }
  _isTtsSpeaking = false;
  _isTtsPaused = false;
  _currentUtterance = null;
  updateTtsButtonUi();
}

function updateTtsButtonUi() {
  const btn = document.getElementById('btnTts');
  if (!btn) return;
  const icon = btn.querySelector('.tts-icon');
  const label = btn.querySelector('.tts-text');

  if (_isTtsSpeaking && !_isTtsPaused) {
    btn.classList.add('tts-active');
    if (icon) icon.textContent = '⏸️';
    if (label) label.textContent = 'Pausar aula';
    btn.title = 'Pausar leitura da aula';
  } else if (_isTtsPaused) {
    btn.classList.remove('tts-active');
    if (icon) icon.textContent = '▶️';
    if (label) label.textContent = 'Continuar';
    btn.title = 'Continuar ouvindo aula';
  } else {
    btn.classList.remove('tts-active');
    if (icon) icon.textContent = '🔊';
    if (label) label.textContent = 'Ouvir aula';
    btn.title = 'Ouvir teoria da aula em voz alta';
  }
}

function initTts() {
  const btn = document.getElementById('btnTts');
  if (!btn) return;

  if (!('speechSynthesis' in window)) {
    btn.hidden = true;
    return;
  }
  btn.hidden = false;

  btn.onclick = () => {
    if (_isTtsSpeaking && !_isTtsPaused) {
      window.speechSynthesis.pause();
      _isTtsPaused = true;
      updateTtsButtonUi();
      return;
    }

    if (_isTtsPaused) {
      window.speechSynthesis.resume();
      _isTtsPaused = false;
      updateTtsButtonUi();
      return;
    }

    // Inicia leitura da teoria da aula atual
    const theoryEl = document.getElementById('theory');
    if (!theoryEl) return;

    // Clona para extrair texto excluindo blocos de código e a caixa de metas
    const clone = theoryEl.cloneNode(true);
    clone.querySelectorAll('pre, code, .code, .command-spotlight-code, .aula-goals-box, style, script').forEach(el => el.remove());

    const text = clone.textContent.replace(/\s+/g, ' ').trim();
    if (!text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;

    const voices = window.speechSynthesis.getVoices() || [];
    const ptVoice = voices.find(v => v.lang && v.lang.startsWith('pt'));
    if (ptVoice) utterance.voice = ptVoice;

    utterance.onstart = () => {
      _isTtsSpeaking = true;
      _isTtsPaused = false;
      updateTtsButtonUi();
    };

    utterance.onend = () => {
      _isTtsSpeaking = false;
      _isTtsPaused = false;
      _currentUtterance = null;
      updateTtsButtonUi();
    };

    utterance.onerror = () => {
      _isTtsSpeaking = false;
      _isTtsPaused = false;
      _currentUtterance = null;
      updateTtsButtonUi();
    };

    _currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  };
}

// ============================================================
// TEMPO DE ESTUDO
// ============================================================

/** Finaliza e persiste a sessão de tempo de estudo na aula */
export function finalizeStudySession() {
  if (!_sessionStart || !currentCourse || !currentLesson) return;
  const elapsedSec = Math.floor((Date.now() - _sessionStart) / 1000);
  _sessionStart = null;

  // Ignora se ficou menos de 5 segundos (cliques acidentais)
  if (elapsedSec >= 5) {
    const minutos = Math.round((elapsedSec / 60) * 10) / 10;
    if (!state.tempoEstudo || typeof state.tempoEstudo !== 'object') {
      state.tempoEstudo = { total: 0, porAula: {}, porCurso: {}, sessoes: [] };
    }
    state.tempoEstudo.total = Math.round(((state.tempoEstudo.total || 0) + minutos) * 10) / 10;
    state.tempoEstudo.porAula = state.tempoEstudo.porAula || {};
    state.tempoEstudo.porAula[currentLesson.id] = Math.round(((state.tempoEstudo.porAula[currentLesson.id] || 0) + minutos) * 10) / 10;

    state.tempoEstudo.porCurso = state.tempoEstudo.porCurso || {};
    state.tempoEstudo.porCurso[currentCourse] = Math.round(((state.tempoEstudo.porCurso[currentCourse] || 0) + minutos) * 10) / 10;

    state.tempoEstudo.sessoes = state.tempoEstudo.sessoes || [];
    state.tempoEstudo.sessoes.unshift({
      courseId: currentCourse,
      lessonId: currentLesson.id,
      duracao: minutos,
      timestamp: new Date().toISOString()
    });
    if (state.tempoEstudo.sessoes.length > 30) state.tempoEstudo.sessoes.pop();

    save();
    updateDashboard();
  }
}

// ============================================================
// OBJETIVOS DA AULA (Melhoria 4)
// ============================================================

/** Gera os tópicos da caixa "Nesta aula você vai:" */
function generateLessonGoals(lesson) {
  const goals = [];
  const cleanTitle = (lesson.title || '').split('—')[0].trim();
  const h3s = [...(lesson.theory || '').matchAll(/<h3>(.*?)<\/h3>/gi)]
    .map(m => m[1].replace(/<[^>]*>/g, '').trim())
    .filter(Boolean);

  if (h3s.length >= 2) {
    goals.push(`Entender ${h3s[0].replace(/^[^\wÀ-ÿ]+/g, '')}`);
    goals.push(`Aprender sobre ${h3s[1].replace(/^[^\wÀ-ÿ]+/g, '')}`);
  } else if (h3s.length === 1) {
    goals.push(`Compreender ${h3s[0].replace(/^[^\wÀ-ÿ]+/g, '')}`);
    goals.push(`Ver exemplos práticos aplicados ao projeto`);
  } else {
    goals.push(`Dominar os conceitos de ${cleanTitle}`);
    goals.push(`Ver código e exemplos práticos passo a passo`);
  }

  if (lesson.challenge) {
    if (lesson.challenge.type === 'code') {
      goals.push(`Escrever seu próprio código no desafio interativo`);
    } else {
      goals.push(`Testar seu conhecimento no quiz prático da aula`);
    }
  } else {
    goals.push(`Completar a etapa prática e avançar na trilha`);
  }

  return goals;
}

// ============================================================
// ABRIR AULA
// ============================================================

export function openLesson(courseId, lessonId) {
  const list   = allLessons(courseId);
  const lesson = list.find(l => l.id === lessonId);
  if (!lesson) return;
  const idx = list.indexOf(lesson);

  // Verificação de permissão para módulos pagos (Módulo 1+)
  const course = COURSES[courseId];
  const moduleIndex = course?.modules.findIndex(m => m.lessons.some(l => l.id === lessonId));
  if (moduleIndex > 0 && !(isFounder() || hasActiveSubscription())) {
    import('./cursos.js').then(m => m.showSubscriptionModal());
    return;
  }

  // Interrompe qualquer áudio TTS anterior ao mudar de aula
  stopTts();

  // Fecha sessão anterior caso estivesse em outra aula
  finalizeStudySession();

  currentCourse  = courseId;
  currentLesson  = lesson;
  state.usedHint = false;

  // Salva última aula acessada
  state.ultimaAula = {
    courseId,
    lessonId,
    title: lesson.title,
    timestamp: new Date().toISOString()
  };
  save();

  // Inicia contagem de tempo de estudo
  _sessionStart = Date.now();

  // ── Tempo Estimado de Leitura (Melhoria 3) ───────────────
  const plainText = (lesson.theory || '').replace(/<[^>]*>/g, ' ') + ' ' + (lesson.example || '');
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const readMinutes = Math.max(1, Math.round(wordCount / 200));

  // ── Cabeçalho ──────────────────────────────────────────
  document.getElementById('lessonTitle').textContent = lesson.title;
  document.getElementById('lessonMeta').innerHTML = `
    <span>${esc(COURSES[courseId].name)} — Aula ${idx + 1} de ${list.length}</span>
    <span class="meta-dot">•</span>
    <span class="lesson-read-time" title="Tempo estimado de leitura">⏱️ Leitura: ~${readMinutes} min</span>
  `;

  // ── Caixa "Nesta aula você vai:" (Melhoria 4) ────────────
  const goals = generateLessonGoals(lesson);
  const goalsBoxHtml = `
    <div class="aula-goals-box reveal-item">
      <div class="aula-goals-title">🎯 Nesta aula você vai:</div>
      <ul class="aula-goals-list">
        ${goals.map(g => `<li><span class="goal-check">✅</span> <span>${esc(g)}</span></li>`).join('')}
      </ul>
    </div>
  `;

  // ── Teoria + exemplo ─────────────────────────────────────
  const theoryEl = document.getElementById('theory');
  theoryEl.innerHTML =
    goalsBoxHtml + lesson.theory + `<pre class="code">${esc(lesson.example)}</pre>`;

  // ── Bloco de projeto acumulativo ─────────────────────────
  const projBlock = document.getElementById('projectBlock');
  if (projBlock) {
    if (lesson.projectCode) {
      projBlock.hidden = false;
      projBlock.querySelector('pre').textContent = lesson.projectCode;
    } else {
      projBlock.hidden = true;
    }
  }

  // ── Desafio ou Conclusão direta ───────────────────────────
  const chalBlock = document.getElementById('challengeBlock');
  const compBlock = document.getElementById('completeBlock');
  const area      = document.getElementById('challengeArea');

  if (lesson.challenge) {
    if (chalBlock) chalBlock.hidden = false;
    if (compBlock) compBlock.hidden = true;
    document.getElementById('challengeDesc').textContent = lesson.challenge.desc;
    if (area) area.innerHTML = '';

    if (lesson.challenge.type === 'code') {
      const ta = document.createElement('textarea');
      ta.id          = 'codeInput';
      ta.className   = 'editor';
      ta.spellcheck  = false;
      ta.placeholder = lesson.challenge.placeholder || 'Escreva sua solução aqui...';
      if (area) area.appendChild(ta);
    } else {
      const box = document.createElement('div');
      box.className = 'quiz';
      (lesson.challenge.options || []).forEach((opt, i) => {
        const lab = document.createElement('label');
        lab.className = 'opt';
        lab.innerHTML = `<input type="radio" name="quiz" value="${i}"> ${esc(opt)}`;
        lab.onclick = () => {
          box.querySelectorAll('.opt').forEach(o => o.classList.remove('selected'));
          lab.classList.add('selected');
        };
        box.appendChild(lab);
      });
      if (area) area.appendChild(box);
    }

    // Reset UI do desafio
    document.getElementById('hintBox')?.classList.remove('show');
    document.getElementById('solBox')?.classList.remove('show');
    const fb = document.getElementById('fb');
    if (fb) { fb.className = 'fb'; fb.innerHTML = ''; }
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.hidden = true;
    const verifyBtn = document.getElementById('verifyBtn');
    if (verifyBtn) verifyBtn.disabled = false;

    setSteps('done', 'active', '');
  } else {
    // Aula sem desafio (teórica/prática)
    if (chalBlock) chalBlock.hidden = true;
    if (compBlock) compBlock.hidden = false;
    setSteps('done', 'done', 'done');
    completeCurrent();
  }

  navigate('aula');

  // ── Animações de entrada e leitura imersiva ───────────────
  applyTextAnimations();
  setupReadingProgress();
  triggerAutoFocus();
}

/** Configura barra de progresso de leitura conforme o aluno rola a aula (Melhoria 1) */
function setupReadingProgress() {
  const bar = document.getElementById('readingProgressBar');
  if (!bar) return;
  bar.style.width = '0%';

  const updateProgress = () => {
    const page = document.getElementById('page-aula');
    if (!page || !page.classList.contains('active')) return;

    let scrollTop = 0;
    let scrollHeight = 0;

    if (document.fullscreenElement) {
      scrollTop = page.scrollTop;
      scrollHeight = page.scrollHeight - page.clientHeight;
    } else {
      scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    }

    if (scrollHeight <= 0) {
      bar.style.width = '100%';
      return;
    }
    const pct = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
    bar.style.width = `${pct}%`;
  };

  window.removeEventListener('scroll', window._onReadingScroll);
  document.getElementById('page-aula')?.removeEventListener('scroll', window._onReadingScroll);
  window._onReadingScroll = updateProgress;
  window.addEventListener('scroll', updateProgress, { passive: true });
  document.getElementById('page-aula')?.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/** Animações suaves de fade-in dos blocos com IntersectionObserver (Melhoria 2) */
function applyTextAnimations() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('#theory > *, #projectBlock, #challengeBlock, #completeBlock');

  if (isReducedMotion || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('revealed'));
    return;
  }

  let delayCounter = 0;
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        obs.unobserve(target);
        setTimeout(() => {
          target.classList.add('revealed');
        }, delayCounter * 65);
        delayCounter = (delayCounter + 1) % 5;
      }
    });
  }, { threshold: 0.08 });

  items.forEach(el => {
    el.classList.add('reveal-item');
    observer.observe(el);
  });
}

/** Tenta entrar em fullscreen suavemente com fallback para banner amigável */
function triggerAutoFocus() {
  const banner = document.getElementById('focusPromptBanner');
  const page = document.getElementById('page-aula');
  if (!page) return;

  if (document.fullscreenElement) {
    if (banner) banner.hidden = true;
    return;
  }

  setTimeout(() => {
    if (!page.classList.contains('active')) return;
    page.requestFullscreen?.().then(() => {
      if (banner) banner.hidden = true;
    }).catch(() => {
      if (banner) banner.hidden = false;
    });
  }, 350);
}

/** Efeito discreto de confetes comemorativos ao acertar o desafio */
function triggerConfetti(target) {
  if (!target) return;
  const layer = document.createElement('div');
  layer.className = 'confetti-layer';
  const colors = ['#38bdf8', '#22c55e', '#facc15', '#a855f7', '#ec4899'];

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-particle';
    p.style.backgroundColor = colors[i % colors.length];
    p.style.left = `${40 + Math.random() * 20}%`;
    p.style.top = '20%';
    p.style.setProperty('--tx', `${(Math.random() - 0.5) * 160}px`);
    p.style.setProperty('--ty', `${60 + Math.random() * 80}px`);
    p.style.animationDelay = `${Math.random() * 0.2}s`;
    layer.appendChild(p);
  }
  target.style.position = 'relative';
  target.appendChild(layer);
  setTimeout(() => layer.remove(), 1600);
}

// ============================================================
// STEPS INTERNOS
// ============================================================

function setSteps(s1, s2, s3) {
  const set = (id, st) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = 'step' + (st ? ' ' + st : '');
  };
  set('s1', s1);
  set('s2', s2);
  set('s3', s3);
}

// ============================================================
// VERIFICAR DESAFIO
// ============================================================

function verifyAnswer() {
  const chal = currentLesson?.challenge;
  if (!chal) return;
  const fb = document.getElementById('fb');

  let ok = false;
  let userVal = '';

  if (chal.type === 'code') {
    const val = document.getElementById('codeInput')?.value || '';
    userVal = val.trim();
    ok = norm(val).includes(norm(chal.answer));
  } else {
    const sel = document.querySelector('input[name="quiz"]:checked');
    if (!sel) {
      fb.className = 'fb bad';
      fb.innerHTML = `
        <div class="fb-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Selecione uma opção
        </div>
        <p class="fb-desc">Escolha uma das alternativas acima antes de verificar sua resposta.</p>
      `;
      return;
    }
    ok = Number(sel.value) === chal.answer;
  }

  if (ok) {
    fb.className = 'fb ok celebrate-pulse';
    fb.innerHTML = `
      <div class="fb-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        Sensacional! Resposta correta!
      </div>
      <p class="fb-desc">Você dominou o conceito desta aula com sucesso e já pode avançar para a próxima etapa.</p>
      <div class="xp-line">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        +${currentLesson.xp} XP conquistados!
      </div>
    `;

    triggerConfetti(fb);

    if (!state.usedHint) state.perfect = (state.perfect || 0) + 1;
    completeCurrent();
    setSteps('done', 'done', 'done');

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.hidden = false;
    const verifyBtn = document.getElementById('verifyBtn');
    if (verifyBtn) verifyBtn.disabled = true;

  } else {
    fb.className = 'fb bad shake-horizontal';

    let diffHtml = '';
    if (chal.type === 'code' && userVal) {
      diffHtml = `
        <div class="fb-diff-box">
          <div class="fb-diff-row">
            <span class="fb-diff-label">Seu código digitado:</span>
            <code class="fb-user-code">${esc(userVal)}</code>
          </div>
          <div class="fb-diff-row">
            <span class="fb-diff-label">Padrão esperado pelo desafio:</span>
            <code class="fb-expected-code">${esc(chal.answer)}</code>
          </div>
        </div>
      `;
    }

    fb.innerHTML = `
      <div class="fb-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        Ainda não está certo, mas faz parte do aprendizado!
      </div>
      <p class="fb-desc">Revise o código ou conceito apresentado na teoria acima. Pequenos detalhes de sintaxe ou pontuação fazem a diferença.</p>
      ${diffHtml}
      <div class="fb-tip-section">
        💡 <strong>Dica rápida:</strong> Caso precise de ajuda, clique no botão <em>"Ver Dica"</em> logo abaixo para entender a lógica.
      </div>
      <p class="fb-retry-prompt">Ajuste seu código e clique em <em>Verificar</em> novamente!</p>
    `;
  }
}

// ============================================================
// CONCLUIR AULA ATUAL
// ============================================================

function completeCurrent() {
  if (!currentLesson) return;
  const isFirst = !state.completed.includes(currentLesson.id);

  if (isFirst) {
    state.completed.push(currentLesson.id);
    state.xp = (state.xp || 0) + currentLesson.xp;
    bumpStreak();
    checkAchievements();
    save();
    updateDashboard();
  }
}

// ============================================================
// INICIALIZAÇÃO DOS EVENTOS DA AULA
// ============================================================

export function initAulaButtons() {
  // ── Botão Verificar ───────────────────────────────────────
  document.getElementById('verifyBtn')?.addEventListener('click', verifyAnswer);

  // ── Botão Dica ────────────────────────────────────────────
  document.getElementById('hintBtn')?.addEventListener('click', () => {
    if (!currentLesson?.challenge) return;
    state.usedHint = true;
    const box = document.getElementById('hintBox');
    box.innerHTML = `<strong>Dica</strong><p style="margin-top:4px">${esc(currentLesson.challenge.hint)}</p>`;
    box.classList.add('show');
  });

  // ── Botão Ver Solução ─────────────────────────────────────
  document.getElementById('solBtn')?.addEventListener('click', () => {
    if (!currentLesson?.challenge) return;
    state.usedHint = true;
    const box = document.getElementById('solBox');
    box.innerHTML = `<strong>Solução</strong><pre class="code">${esc(currentLesson.challenge.solution)}</pre>`;
    box.classList.add('show');
  });

  // ── Próxima Aula ──────────────────────────────────────────
  const goNext = () => {
    stopTts();
    if (!currentCourse || !currentLesson) return;
    const list = allLessons(currentCourse);
    const i    = list.indexOf(currentLesson);
    if (i < list.length - 1) {
      openLesson(currentCourse, list[i + 1].id);
    } else {
      openNavPage('cursos');
      import('./cursos.js').then(m => m.renderCourse(currentCourse));
    }
  };

  document.getElementById('nextBtn')?.addEventListener('click', goNext);
  document.getElementById('btnCompleteDirect')?.addEventListener('click', goNext);

  // ── Voltar ao curso ───────────────────────────────────────
  document.getElementById('backToCourse')?.addEventListener('click', () => {
    stopTts();
    openNavPage('cursos');
    if (currentCourse) {
      import('./cursos.js').then(m => m.renderCourse(currentCourse));
    }
  });

  // ── Modo Áudio TTS ────────────────────────────────────────
  initTts();

  // ── Termo Novo Tooltip Toggle no Mobile (Melhoria 8) ──────
  document.addEventListener('click', (e) => {
    const targetTerm = e.target.closest('.termo-novo');
    document.querySelectorAll('.termo-novo.active').forEach(el => {
      if (el !== targetTerm) el.classList.remove('active');
    });
    if (targetTerm) {
      targetTerm.classList.toggle('active');
    }
  });

  // ── Tela Cheia ────────────────────────────────────────────
  const btnFs = document.getElementById('btnFullscreen');
  btnFs?.addEventListener('click', () => {
    const page = document.getElementById('page-aula');
    if (!document.fullscreenElement) {
      page.requestFullscreen().catch(err => console.warn('[Edev] Fullscreen:', err));
    } else {
      document.exitFullscreen();
    }
  });

  // ── Botão amigável do banner Modo Foco ─────────────────────
  document.getElementById('btnAcceptFocus')?.addEventListener('click', () => {
    const page = document.getElementById('page-aula');
    page?.requestFullscreen?.().then(() => {
      const banner = document.getElementById('focusPromptBanner');
      if (banner) banner.hidden = true;
    }).catch(err => console.warn('[Edev] Fullscreen manual:', err));
  });

  document.addEventListener('fullscreenchange', () => {
    const inFs   = !!document.fullscreenElement;
    const span   = btnFs?.querySelector('span');
    if (span) span.textContent = inFs ? 'Sair' : 'Tela Cheia';
    if (btnFs) btnFs.title = inFs ? 'Sair da tela cheia' : 'Entrar em tela cheia';
    const banner = document.getElementById('focusPromptBanner');
    if (inFs && banner) banner.hidden = true;
  });

  // ── Abrir em Nova Aba ─────────────────────────────────────
  document.getElementById('btnNewTab')?.addEventListener('click', () => {
    if (!currentCourse || !currentLesson) return;
    const url = `https://edev.dev/aula/${currentCourse}/${currentLesson.id}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  // ── Interromper TTS e finalizar tempo ao sair da aula ────
  onLeavePage((from) => {
    if (from === 'aula') {
      stopTts();
      finalizeStudySession();
    }
  });

  window.addEventListener('beforeunload', () => {
    stopTts();
    finalizeStudySession();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      finalizeStudySession();
    } else if (currentCourse && currentLesson && document.getElementById('page-aula')?.classList.contains('active')) {
      _sessionStart = Date.now();
    }
  });
}

export const initAula = initAulaButtons;
