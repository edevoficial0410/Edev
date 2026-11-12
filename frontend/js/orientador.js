/**
 * js/orientador.js
 * Módulo do Orientador de Estudos da Edev.
 * Gerencia o questionário interativo de onboarding e a página de visualização da trilha.
 */

import { state, registerRenderer, openNavPage, progress, esc, allLessons, statusOf } from './main.js';
import { apiFetch, isAuthenticated } from './auth.js';
import { ORIENTADOR_QUESTIONS, generateRecommendations, getPacingDetails } from '../data/orientador.js';
import { COURSES } from '../data/cursos.js';

const LS_STUDY_PROFILE = 'edev_study_profile';

// ============================================================
// PERSISTÊNCIA DO PERFIL DE ESTUDO
// ============================================================

/**
 * Retorna o perfil de estudo do localStorage ou null
 */
export function getLocalStudyProfile() {
  try {
    const raw = localStorage.getItem(LS_STUDY_PROFILE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Salva o perfil de estudo localmente
 */
export function setLocalStudyProfile(profile) {
  try {
    if (profile) {
      localStorage.setItem(LS_STUDY_PROFILE, JSON.stringify(profile));
    } else {
      localStorage.removeItem(LS_STUDY_PROFILE);
    }
  } catch (err) {
    console.warn('[ORIENTADOR] Falha ao gravar cache local:', err);
  }
}

/**
 * Busca o perfil de estudos do backend e atualiza o cache local
 */
export async function syncStudyProfile() {
  if (!isAuthenticated()) return getLocalStudyProfile();

  try {
    const res = await apiFetch('/api/users/study-profile');
    if (res && res.studyProfile !== undefined) {
      setLocalStudyProfile(res.studyProfile);
      return res.studyProfile;
    }
  } catch (err) {
    console.warn('[ORIENTADOR] Não foi possível sincronizar perfil do backend:', err.message);
  }
  return getLocalStudyProfile();
}

/**
 * Envia atualização do perfil de estudo para o backend e atualiza cache local
 */
export async function persistStudyProfile(profileData) {
  setLocalStudyProfile(profileData);

  if (isAuthenticated()) {
    try {
      await apiFetch('/api/users/study-profile', {
        method: 'PUT',
        body: JSON.stringify({ studyProfile: profileData })
      });
      console.log('✅ [ORIENTADOR] Perfil de estudos persistido no backend com sucesso.');
    } catch (err) {
      console.error('❌ [ORIENTADOR] Falha ao persistir no backend:', err);
    }
  }
}

// ============================================================
// VERIFICAÇÃO AUTOMÁTICA DE ONBOARDING NO PRIMEIRO LOGIN
// ============================================================

/**
 * Verifica se o usuário atual precisa responder ao questionário de boas-vindas.
 * Aparece automaticamente APENAS se o usuário nunca respondeu nem pulou.
 */
export async function checkAndPromptOnboarding(user) {
  if (!isAuthenticated()) return;

  // 1. Prioriza o que veio direto do perfil do usuário na autenticação
  let profile = user?.study_profile || getLocalStudyProfile();

  // 2. Se ainda não há dado local, tenta consultar o backend
  if (!profile) {
    profile = await syncStudyProfile();
  }

  // Se profile for nulo (usuário novo que nunca passou pelo processo)
  if (!profile) {
    console.log('👋 [ORIENTADOR] Novo usuário detectado. Exibindo boas-vindas e questionário...');
    // Pequeno atraso para interface carregar suavemente
    setTimeout(() => {
      openOnboardingModal(false);
    }, 450);
  } else {
    console.log('ℹ️ [ORIENTADOR] Usuário já possui status de estudos registrado:', profile.skipped ? 'Pulou' : 'Concluído');
  }
}

// ============================================================
// MODAL DE ONBOARDING / WIZARD INTERATIVO
// ============================================================

let _currentStepIndex = 0; // 0 = Welcome, 1..4 = Perguntas, 5 = Finalizando
let _answers = {};
let _isRetakeMode = false;

/**
 * Cria ou recupera o elemento do modal no DOM
 */
function getOrCreateModal() {
  let modal = document.getElementById('orientadorModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'orientadorModal';
    modal.className = 'orientador-modal-overlay';
    document.body.appendChild(modal);
  }
  return modal;
}

/**
 * Abre o modal interativo do Orientador
 * @param {boolean} isRetake Se é uma reedição manual pelo usuário
 */
export function openOnboardingModal(isRetake = false) {
  _isRetakeMode = isRetake;
  const existing = getLocalStudyProfile();

  if (isRetake && existing && existing.answers) {
    _answers = { ...existing.answers };
    _currentStepIndex = 1; // Pula a tela de boas-vindas ao refazer
  } else {
    _answers = {};
    _currentStepIndex = isRetake ? 1 : 0;
  }

  const modal = getOrCreateModal();
  renderModalStep(modal);
  modal.classList.add('active');
}

/**
 * Fecha o modal do Orientador
 */
export function closeOnboardingModal() {
  const modal = document.getElementById('orientadorModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

/**
 * Pula o questionário sem penalidade
 */
export async function skipOnboarding() {
  console.log('[ORIENTADOR] Usuário optou por pular o questionário.');
  const skippedProfile = {
    skipped: true,
    skippedAt: new Date().toISOString()
  };
  await persistStudyProfile(skippedProfile);
  closeOnboardingModal();

  // Feedback amigável
  showOrientadorNotice('Você pulou o questionário por enquanto. Quando quiser montar seu caminho de estudos, acesse o menu <strong>"Orientador"</strong> na barra lateral!');
}

/**
 * Renderiza o conteúdo do passo atual dentro do modal
 */
function renderModalStep(modal) {
  const totalQuestions = ORIENTADOR_QUESTIONS.length;
  const userName = localStorage.getItem('edev_name') || 'Aluno';
  const firstName = userName.split(' ')[0];

  // Cálculo da barra de progresso
  let progressPct = 0;
  if (_currentStepIndex === 0) progressPct = 5;
  else if (_currentStepIndex <= totalQuestions) {
    progressPct = Math.round((_currentStepIndex / totalQuestions) * 100);
  } else {
    progressPct = 100;
  }

  let bodyContent = '';
  let footerContent = '';
  let headerStepText = '';

  // ── ETAPA 0: Boas-Vindas ─────────────────────────────────
  if (_currentStepIndex === 0) {
    headerStepText = 'Boas-vindas à Edev';
    bodyContent = `
      <div class="orientador-welcome-view">
        <div class="orientador-welcome-badge">
          ✨ Experiência de Entrada
        </div>
        
        <div class="orientador-welcome-avatar-glow">
          🧭
        </div>

        <h2 class="orientador-welcome-title">
          Bem-vindo à Edev, <span>${esc(firstName)}</span>!
        </h2>

        <p class="orientador-welcome-text">
          A Edev não é apenas um catálogo de cursos soltos. Nós ajudamos você a descobrir <strong>exatamente o que estudar e em qual ordem</strong> para atingir seu objetivo sem perder tempo.
        </p>

        <div class="orientador-welcome-features">
          <div class="orientador-feature-card">
            <span class="feat-icon">🎯</span>
            <div class="feat-title">Foco no seu Objetivo</div>
            <div class="feat-desc">Emprego, hobby, faculdade ou projetos próprios</div>
          </div>
          <div class="orientador-feature-card">
            <span class="feat-icon">🗺️</span>
            <div class="feat-title">Trilha Organizada</div>
            <div class="feat-desc">Sequência lógica e conteúdos reais da plataforma</div>
          </div>
          <div class="orientador-feature-card">
            <span class="feat-icon">⏱️</span>
            <div class="feat-title">No seu Tempo</div>
            <div class="feat-desc">Ritmo ajustado à sua rotina diária real</div>
          </div>
        </div>
      </div>
    `;

    footerContent = `
      <div class="orientador-footer-left">
        <button type="button" class="btn btn-ghost btn-sm" id="btnOrientadorSkip">
          Pular por enquanto
        </button>
      </div>
      <div class="orientador-footer-right">
        <button type="button" class="btn btn-primary" id="btnOrientadorStart">
          Montar Meu Caminho de Estudos →
        </button>
      </div>
    `;
  }
  // ── ETAPAS 1 a 4: Perguntas ──────────────────────────────
  else if (_currentStepIndex >= 1 && _currentStepIndex <= totalQuestions) {
    const qIndex = _currentStepIndex - 1;
    const q = ORIENTADOR_QUESTIONS[qIndex];
    headerStepText = `Etapa ${_currentStepIndex} de ${totalQuestions}`;

    const selectedOptionId = _answers[q.id] || null;

    bodyContent = `
      <div class="orientador-question-step">
        <div class="orientador-step-headline">
          <h3 class="orientador-step-title">${esc(q.title)}</h3>
          <p class="orientador-step-subtitle">${esc(q.subtitle)}</p>
        </div>

        <div class="orientador-options-list" id="orientadorOptionsList">
          ${q.options.map(opt => {
            const isSelected = selectedOptionId === opt.id;
            return `
              <div class="orientador-option-item ${isSelected ? 'selected' : ''}" data-opt-id="${esc(opt.id)}">
                <div class="orientador-opt-icon">${opt.icon || '📌'}</div>
                <div class="orientador-opt-content">
                  <div class="orientador-opt-label">${esc(opt.label)}</div>
                  <div class="orientador-opt-desc">${esc(opt.desc)}</div>
                </div>
                <div class="orientador-opt-radio"></div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    const isLast = _currentStepIndex === totalQuestions;
    const canContinue = !!selectedOptionId;

    footerContent = `
      <div class="orientador-footer-left">
        ${_currentStepIndex > 1 ? `
          <button type="button" class="btn btn-ghost btn-sm" id="btnOrientadorBack">
            ← Voltar
          </button>
        ` : (!_isRetakeMode ? `
          <button type="button" class="btn btn-ghost btn-sm" id="btnOrientadorSkip">
            Pular
          </button>
        ` : '')}
      </div>
      <div class="orientador-footer-right">
        <button type="button" class="btn btn-primary" id="btnOrientadorNext" ${canContinue ? '' : 'disabled'}>
          ${isLast ? 'Concluir e Ver Meu Caminho ✨' : 'Continuar →'}
        </button>
      </div>
    `;
  }
  // ── ETAPA 5: Finalizando e Gerando ───────────────────────
  else {
    headerStepText = 'Finalizando Trilha';
    bodyContent = `
      <div class="orientador-welcome-view" style="padding: 40px 12px;">
        <div class="orientador-welcome-avatar-glow" style="animation: spinSlow 3s linear infinite;">
          ⚙️
        </div>
        <h3 class="orientador-welcome-title">Montando sua Trilha Personalizada...</h3>
        <p class="orientador-welcome-text">
          Conectando seu nível e objetivo aos cursos e projetos da Edev.
        </p>
      </div>
    `;
    footerContent = '';
  }

  modal.innerHTML = `
    <div class="orientador-modal-container">
      <div class="orientador-progress-track">
        <div class="orientador-progress-fill" style="width: ${progressPct}%;"></div>
      </div>

      <div class="orientador-modal-header">
        <div class="orientador-header-title-wrap">
          <div class="orientador-header-icon">🧭</div>
          <div>
            <div class="orientador-header-step">${headerStepText}</div>
            <h4 class="orientador-header-title">Orientador de Estudos Edev</h4>
          </div>
        </div>
        <button type="button" class="orientador-btn-close" id="btnOrientadorClose" title="Fechar">&times;</button>
      </div>

      <div class="orientador-modal-body">
        ${bodyContent}
      </div>

      ${footerContent ? `
        <div class="orientador-modal-footer">
          ${footerContent}
        </div>
      ` : ''}
    </div>
  `;

  bindModalEvents(modal);
}

/**
 * Conecta os eventos de clique do modal
 */
function bindModalEvents(modal) {
  // Fechar
  modal.querySelector('#btnOrientadorClose')?.addEventListener('click', () => {
    if (!_isRetakeMode && _currentStepIndex === 0) {
      skipOnboarding();
    } else {
      closeOnboardingModal();
    }
  });

  // Pular
  modal.querySelector('#btnOrientadorSkip')?.addEventListener('click', skipOnboarding);

  // Iniciar da tela 0
  modal.querySelector('#btnOrientadorStart')?.addEventListener('click', () => {
    _currentStepIndex = 1;
    renderModalStep(modal);
  });

  // Voltar
  modal.querySelector('#btnOrientadorBack')?.addEventListener('click', () => {
    if (_currentStepIndex > 1) {
      _currentStepIndex--;
      renderModalStep(modal);
    }
  });

  // Seleção de opções
  modal.querySelectorAll('.orientador-option-item').forEach(item => {
    item.addEventListener('click', () => {
      const optId = item.dataset.optId;
      const q = ORIENTADOR_QUESTIONS[_currentStepIndex - 1];
      if (!q) return;

      _answers[q.id] = optId;

      // Atualiza visual imediato
      modal.querySelectorAll('.orientador-option-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');

      const nextBtn = modal.querySelector('#btnOrientadorNext');
      if (nextBtn) nextBtn.disabled = false;
    });
  });

  // Próximo / Concluir
  modal.querySelector('#btnOrientadorNext')?.addEventListener('click', async () => {
    const totalQuestions = ORIENTADOR_QUESTIONS.length;
    if (_currentStepIndex < totalQuestions) {
      _currentStepIndex++;
      renderModalStep(modal);
    } else {
      // Concluir questionário
      _currentStepIndex = totalQuestions + 1;
      renderModalStep(modal);

      try {
        const recommendations = generateRecommendations(_answers);
        const profilePayload = {
          skipped: false,
          answers: _answers,
          recommendations,
          completedAt: new Date().toISOString()
        };

        await persistStudyProfile(profilePayload);

        setTimeout(() => {
          closeOnboardingModal();
          // Navega para a página do orientador para exibir a trilha
          openNavPage('orientador');
          showOrientadorNotice('🎉 Seu caminho de estudos foi gerado com sucesso! Confira abaixo sua trilha recomendada.');
        }, 600);
      } catch (err) {
        console.error('Erro ao finalizar orientador:', err);
        closeOnboardingModal();
      }
    }
  });
}

/**
 * Toast de notificação amigável
 */
function showOrientadorNotice(htmlMessage) {
  const existing = document.getElementById('orientadorNotice');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'orientadorNotice';
  toast.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 99999;
    background: #12171C; border: 1px solid #1CA8E3; color: #FFFFFF;
    border-radius: 12px; padding: 16px 22px; box-shadow: 0 12px 36px rgba(0,0,0,0.6);
    display: flex; align-items: center; gap: 14px; max-width: 440px; animation: fadeIn 0.3s ease;
  `;
  toast.innerHTML = `
    <div style="width:36px;height:36px;border-radius:10px;background:rgba(28,168,227,0.18);color:#1CA8E3;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;">
      🧭
    </div>
    <div style="flex:1;font-size:0.86rem;line-height:1.45;color:#E5E7EB;">
      ${htmlMessage}
    </div>
    <button type="button" style="background:transparent;border:none;color:#8A94A0;font-size:1.2rem;cursor:pointer;" onclick="this.parentElement.remove()">&times;</button>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast?.remove(), 8000);
}

// ============================================================
// PÁGINA PRINCIPAL DO ORIENTADOR (#page-orientador)
// ============================================================

/**
 * Renderiza a visualização completa na página #page-orientador
 */
export function renderOrientadorPage() {
  const container = document.getElementById('page-orientador');
  if (!container) return;

  const profile = getLocalStudyProfile();

  // Caso 1: Usuário ainda não tem trilha gerada ou pulou
  if (!profile || profile.skipped || !profile.recommendations) {
    container.innerHTML = `
      <div class="orientador-page-wrap">
        <div class="orientador-hero">
          <div class="orientador-hero-content">
            <div class="orientador-hero-tag">🧭 Orientador de Estudos Edev</div>
            <h2 class="orientador-hero-title">Monte seu Caminho de Estudos Personalizado</h2>
            <p class="orientador-hero-desc">
              Não sabe por onde começar? Responda a 4 perguntas simples sobre seu conhecimento e tempo para receber uma trilha clara, passo a passo, baseada nos cursos reais da Edev.
            </p>
          </div>
          <div class="orientador-hero-actions">
            <button class="btn btn-primary" id="btnStartOrientadorPage" type="button">
              Iniciar Questionário →
            </button>
          </div>
        </div>

        <div class="orientador-empty-state">
          <span class="orientador-empty-icon">🧭</span>
          <h3 class="orientador-empty-title">Você ainda não tem uma trilha definida</h3>
          <p class="orientador-empty-desc">
            Nosso algoritmo avalia seu nível atual, objetivo e tempo disponível para indicar exatamente qual curso começar primeiro e como continuar.
          </p>
          <button class="btn btn-primary" id="btnStartOrientadorEmpty" type="button">
            Começar Agora (Leva menos de 1 minuto)
          </button>
        </div>
      </div>
    `;

    const startHandler = () => openOnboardingModal(true);
    container.querySelector('#btnStartOrientadorPage')?.addEventListener('click', startHandler);
    container.querySelector('#btnStartOrientadorEmpty')?.addEventListener('click', startHandler);
    return;
  }

  // Caso 2: Usuário já possui recomendações geradas
  const rec = profile.recommendations;
  const answers = profile.answers || {};
  const pacing = rec.pacing || getPacingDetails(answers.time);

  // Mapeamentos legíveis das respostas
  const levelLabels = {
    nunca: 'Nunca programou (Zero absoluto)',
    iniciante: 'Iniciante',
    conceitos: 'Conhece alguns conceitos',
    experiente: 'Com experiência prévia'
  };

  const goalLabels = {
    emprego: 'Conquistar primeiro emprego na área',
    hobby: 'Programar por hobby e curiosidade',
    projetos: 'Criar projetos próprios e produtos',
    faculdade: 'Aprimorar conhecimentos para faculdade',
    transicao: 'Transição de carreira para tecnologia'
  };

  const interestLabels = {
    frontend: 'Front-end Completo',
    python: 'Python & Lógica',
    java: 'Java Corporativo',
    cpp: 'C++ Moderno',
    php: 'PHP & Web Dinâmica',
    sql: 'Banco de Dados SQL',
    recomendacao: 'Recomendação da Edev'
  };

  container.innerHTML = `
    <div class="orientador-page-wrap">

      <!-- Hero com Trilha Ativa -->
      <div class="orientador-hero">
        <div class="orientador-hero-content">
          <div class="orientador-hero-tag">🧭 Seu Caminho de Estudos Ativo</div>
          <h2 class="orientador-hero-title">${esc(rec.trackName || 'Trilha Recomendada Edev')}</h2>
          <p class="orientador-hero-desc">
            ${esc(rec.overview || 'Esta sequência foi estruturada sob medida para seu perfil e objetivos.')}
          </p>
        </div>
        <div class="orientador-hero-actions">
          <button class="btn btn-ghost btn-sm" id="btnRetakeOrientador" type="button" style="border: 1px solid rgba(28,168,227,0.4); color: #FFFFFF;">
            🔄 Refazer Questionário
          </button>
        </div>
      </div>

      <!-- Resumo do Perfil e Ritmo Recomendado -->
      <div class="orientador-summary-grid">

        <div class="orientador-summary-card">
          <div class="orientador-summary-title">
            <span>🎯</span> Suas Preferências & Metas
          </div>
          <div class="orientador-tags-row">
            <div class="orientador-pill">
              <span>Nível:</span>
              <strong>${esc(levelLabels[answers.level] || 'Iniciante')}</strong>
            </div>
            <div class="orientador-pill">
              <span>Foco:</span>
              <strong>${esc(goalLabels[answers.goal] || 'Primeiro Emprego')}</strong>
            </div>
            <div class="orientador-pill">
              <span>Interesse:</span>
              <strong>${esc(interestLabels[answers.interest] || 'Recomendado')}</strong>
            </div>
          </div>
          <p style="font-size: 0.82rem; color: var(--muted); margin: 0;">
            Você pode atualizar suas respostas a qualquer momento para recalibrar a sequência de cursos.
          </p>
        </div>

        <div class="orientador-summary-card">
          <div class="orientador-summary-title">
            <span>⏱️</span> Ritmo de Dedicação Recomendado
          </div>
          <div class="orientador-pacing-box">
            <div class="orientador-pacing-header">
              <span class="orientador-pacing-name">${esc(pacing.paceLabel)}</span>
              <span class="orientador-pacing-hours">${esc(pacing.daily)} (${esc(pacing.weekly)})</span>
            </div>
            <p class="orientador-pacing-tip">${esc(pacing.tip)}</p>
          </div>
        </div>

      </div>

      <!-- Sequência Visual dos Cursos -->
      <div class="orientador-path-section">
        <div class="orientador-path-header">
          <h3 class="orientador-path-title">
            <span>🗺️</span> Sequência de Cursos Recomendada
          </h3>
          <span style="font-size: 0.82rem; color: var(--muted);">
            ${rec.courses.length} curso(s) na sua trilha
          </span>
        </div>

        <div class="orientador-timeline">
          ${rec.courses.map((c, idx) => {
            const prog = progress(c.courseId);
            const isFirst = idx === 0;
            const isDone = prog.pct === 100;

            let ctaText = '▶ Começar Curso';
            if (isDone) ctaText = '✓ Concluído (Revisar)';
            else if (prog.done > 0) ctaText = '▶ Continuar de Onde Parou';

            return `
              <div class="orientador-course-card ${isFirst && !isDone ? 'first-step' : ''}">
                <div class="orientador-step-indicator">
                  ${isDone ? '✓' : c.stepNumber}
                </div>

                <div class="orientador-course-body">
                  <div class="orientador-course-top-row">
                    <div>
                      <div class="orientador-badge-role">
                        ${isFirst && !isDone ? '🚀 Ponto de Partida • ' : ''}${esc(c.role)}
                      </div>
                      <h4 class="orientador-course-name">${esc(c.name)}</h4>
                    </div>
                    <div class="orientador-course-meta">
                      <span class="orientador-meta-tag">${esc(c.tag)}</span>
                      <span class="orientador-meta-hours">⏱️ ${esc(c.hours)}</span>
                    </div>
                  </div>

                  <!-- Por que este curso foi indicado -->
                  <div class="orientador-why-box">
                    <div class="orientador-why-label">
                      <span>💡</span> Por que este curso foi indicado?
                    </div>
                    <p class="orientador-why-text">${esc(c.why)}</p>
                  </div>

                  <!-- O que você aprenderá -->
                  ${c.learn && c.learn.length > 0 ? `
                    <div class="orientador-learn-box">
                      <div class="orientador-learn-title">O que você aprenderá:</div>
                      <ul class="orientador-learn-list">
                        ${c.learn.map(item => `<li>${esc(item)}</li>`).join('')}
                      </ul>
                    </div>
                  ` : ''}

                  <!-- Barra de Progresso e Botão de Acesso -->
                  <div class="orientador-course-bottom">
                    <div class="orientador-course-prog-wrap">
                      <div class="orientador-course-prog-head">
                        <span>Progresso neste curso:</span>
                        <strong>${prog.done}/${prog.total} aulas (${prog.pct}%)</strong>
                      </div>
                      <div class="bar" style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden;">
                        <div class="fill" style="width: ${prog.pct}%; height: 100%; background: var(--blue); border-radius: 999px;"></div>
                      </div>
                    </div>

                    <button class="btn ${isFirst && !isDone ? 'btn-primary' : 'btn-ghost'} btn-sm btn-open-trilha-course" data-course-id="${esc(c.courseId)}" type="button" style="${!isFirst || isDone ? 'border: 1px solid rgba(28,168,227,0.3);' : ''}">
                      ${ctaText} →
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

    </div>
  `;

  // Bind de cliques
  container.querySelector('#btnRetakeOrientador')?.addEventListener('click', () => {
    openOnboardingModal(true);
  });

  container.querySelectorAll('.btn-open-trilha-course').forEach(btn => {
    btn.addEventListener('click', async () => {
      const cid = btn.dataset.courseId;
      if (!cid || !COURSES[cid]) return;

      // Localiza a primeira aula disponível não concluída
      const lessons = allLessons(cid);
      const targetLesson = lessons.find(l => statusOf(cid, l.id) === 'current') || lessons[0];

      if (targetLesson) {
        const aulaMod = await import('./aula.js');
        aulaMod.openLesson(cid, targetLesson.id);
      } else {
        openNavPage('cursos');
      }
    });
  });
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================

export function initOrientador() {
  registerRenderer('orientador', renderOrientadorPage);
}
