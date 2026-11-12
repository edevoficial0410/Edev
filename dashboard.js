/**
 * js/dashboard.js
 * Renderização e atualização do painel principal (Dashboard).
 * Importa estado de main.js e se auto-registra como renderer.
 */

import { state, rank, progress, formatTempo, registerRenderer, openNavPage, esc, allLessons, statusOf } from './main.js';
import { COURSES, RANKS } from '../data/cursos.js';
import { ACHIEVEMENTS, achIcon } from '../data/conquistas.js';
import { isFounder, hasActiveSubscription } from './auth.js';

// Dicas do dia rotativas da Edev
const TIPS = [
  "Constância supera intensidade. 20 minutos de código hoje valem muito mais do que 4 horas apenas no domingo.",
  "Não tente decorar sintaxe. Entenda a lógica e o fluxo da informação — o Google e a documentação são seus aliados.",
  "Erros no console são seus amigos! Leia a mensagem em vermelho com calma: ela quase sempre aponta a linha exata do problema.",
  "Construa projetos pequenos antes de sonhar com o grande aplicativo. Cada desafio concluído consolida sua base.",
  "Ao aprender JavaScript, treine bastante a manipulação do DOM. É onde o código cria vida visualmente na tela."
];

/** Atualiza todos os elementos do dashboard com o estado atual */
export function updateDashboard() {
  const el = id => document.getElementById(id);

  // Saudação com nome do usuário
  const userName = localStorage.getItem('edev_name') || 'Aluno';
  if (el('dashUserName')) el('dashUserName').textContent = userName;

  // Dica do dia baseada no dia atual
  if (el('dashTipContent')) {
    const tipIdx = (new Date().getDate()) % TIPS.length;
    el('dashTipContent').textContent = `"${TIPS[tipIdx]}"`;
  }

  // Estatísticas numéricas
  if (el('statXp'))     el('statXp').textContent     = state.xp;
  if (el('statRank'))   el('statRank').textContent   = rank();
  if (el('statAch'))    el('statAch').textContent    = `${(state.achievements || []).length}/7`;
  if (el('statStreak')) el('statStreak').textContent = `${state.streak || 0} dias`;
  if (el('streakText')) el('streakText').textContent = `${state.streak || 0} dias`;
  if (el('statTime'))   el('statTime').textContent   = formatTempo(state.tempoEstudo?.total || 0);

  // Mini barra de XP para o próximo Rank
  const currentRankIndex = RANKS.findIndex(r => r.name === rank());
  const nextRank = RANKS[currentRankIndex + 1];
  if (nextRank) {
    const currentMin = RANKS[currentRankIndex].min;
    const needed = nextRank.min - currentMin;
    const progressInRank = Math.max(0, Math.min(100, Math.round(((state.xp - currentMin) / needed) * 100)));
    if (el('statXpBar')) el('statXpBar').style.width = `${progressInRank}%`;
    if (el('statRankNext')) el('statRankNext').textContent = `Próx: ${nextRank.name} (${state.xp}/${nextRank.min} XP)`;
  } else {
    if (el('statXpBar')) el('statXpBar').style.width = '100%';
    if (el('statRankNext')) el('statRankNext').textContent = 'Nível Máximo Alcançado! 🏆';
  }

  // Mini barra de conquistas
  const achPct = Math.round(((state.achievements || []).length / 7) * 100);
  if (el('statAchBar')) el('statAchBar').style.width = `${achPct}%`;

  // Barras de progresso dos cursos
  const fe = progress('frontend');
  const py = progress('python');

  if (el('fePct')) el('fePct').textContent  = `${fe.pct}%`;
  if (el('feBar')) el('feBar').style.width  = `${fe.pct}%`;
  if (el('feProgressFooter')) el('feProgressFooter').textContent = `${fe.done}/${fe.total} aulas concluídas`;

  if (el('pyPct')) el('pyPct').textContent  = `${py.pct}%`;
  if (el('pyBar')) el('pyBar').style.width  = `${py.pct}%`;
  if (el('pyProgressFooter')) el('pyProgressFooter').textContent = `${py.done}/${py.total} aulas concluídas`;

  // Banner para usuário no plano gratuito (incentivo ao upgrade)
  const isFree = !isFounder() && !hasActiveSubscription();
  const freeBanner = el('dashFreeBanner');
  if (freeBanner) {
    freeBanner.style.display = isFree ? 'flex' : 'none';
  }

  // Renderizar banner do Orientador de Estudos (Trilha Recomendada ou Convite)
  renderOrientadorDashboardBanner();

  // Renderizar bloco de continuidade (Última aula acessada e Próxima recomendada)
  renderContinuityCards();

  // Renderizar próximas conquistas na coluna lateral
  renderNextAchievements();

  // Configurar listeners de botões do Dashboard
  setupDashboardActions();
}

function renderOrientadorDashboardBanner() {
  const banner = document.getElementById('dashOrientadorBanner');
  if (!banner) return;

  const profileRaw = localStorage.getItem('edev_study_profile');
  let profile = null;
  try { profile = profileRaw ? JSON.parse(profileRaw) : null; } catch {}

  // Caso 1: Usuário já possui trilha gerada com recomendações
  if (profile && !profile.skipped && profile.recommendations) {
    const rec = profile.recommendations;
    // Descobre o primeiro curso da trilha que ainda não foi 100% concluído
    const nextCourseItem = rec.courses.find(c => progress(c.courseId).pct < 100) || rec.courses[0];
    const prog = progress(nextCourseItem.courseId);

    banner.innerHTML = `
      <div style="background: linear-gradient(135deg, rgba(28,168,227,0.12) 0%, rgba(18,23,28,0.95) 100%); border: 1px solid rgba(28,168,227,0.35); border-radius: var(--radius-lg); padding: 18px 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.35);">
        <div style="display: flex; align-items: center; gap: 14px; max-width: 650px;">
          <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(28,168,227,0.18); border: 1px solid rgba(28,168,227,0.35); color: var(--blue); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0;">
            🧭
          </div>
          <div>
            <div style="font-size: 0.74rem; font-weight: 800; color: var(--blue); text-transform: uppercase; letter-spacing: 0.5px;">
              Seu Caminho de Estudos Ativo • ${esc(rec.trackName)}
            </div>
            <h3 style="font-size: 1.05rem; color: var(--text); margin: 2px 0;">
              Próximo Passo: <strong>${esc(nextCourseItem.role)} — ${esc(nextCourseItem.name)}</strong>
            </h3>
            <p style="font-size: 0.83rem; color: var(--muted); margin: 0;">
              Progresso neste passo: <strong style="color:var(--text);">${prog.done}/${prog.total} aulas (${prog.pct}%)</strong> • Ritmo sugerido: ${esc(rec.pacing?.daily || 'Consistente')}
            </p>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <button class="btn btn-ghost btn-sm" id="btnDashViewOrientador" type="button" style="border: 1px solid rgba(28,168,227,0.3); color: #FFFFFF;">
            Ver Trilha Completa
          </button>
          <button class="btn btn-primary btn-sm" id="btnDashContinueOrientador" data-course="${esc(nextCourseItem.courseId)}" type="button">
            ${prog.done === 0 ? 'Iniciar Passo →' : 'Continuar Aula →'}
          </button>
        </div>
      </div>
    `;

    banner.querySelector('#btnDashViewOrientador')?.addEventListener('click', () => {
      openNavPage('orientador');
    });

    banner.querySelector('#btnDashContinueOrientador')?.addEventListener('click', async () => {
      const cid = nextCourseItem.courseId;
      const list = allLessons(cid);
      const targetLesson = list.find(l => statusOf(cid, l.id) === 'current') || list[0];
      if (targetLesson) {
        const aulaMod = await import('./aula.js');
        aulaMod.openLesson(cid, targetLesson.id);
      } else {
        openNavPage('cursos');
      }
    });
  }
  // Caso 2: Usuário não tem trilha ou pulou o questionário
  else {
    banner.innerHTML = `
      <div style="background: linear-gradient(135deg, rgba(28,168,227,0.08) 0%, rgba(18,23,28,0.95) 100%); border: 1px dashed rgba(28,168,227,0.3); border-radius: var(--radius-lg); padding: 16px 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(28,168,227,0.12); color: var(--blue); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0;">
            🧭
          </div>
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: var(--blue); text-transform: uppercase; letter-spacing: 0.5px;">
              Orientador de Estudos Edev
            </div>
            <h4 style="font-size: 0.95rem; color: var(--text); margin: 2px 0;">
              Em dúvida por onde começar? Monte seu caminho de estudos personalizado.
            </h4>
            <p style="font-size: 0.8rem; color: var(--muted); margin: 0;">
              Responda a 4 perguntas rápidas e receba uma recomendação precisa na ordem ideal para você.
            </p>
          </div>
        </div>
        <button class="btn btn-primary btn-sm" id="btnDashOpenOrientadorWizard" type="button" style="white-space: nowrap;">
          Montar Meu Caminho →
        </button>
      </div>
    `;

    banner.querySelector('#btnDashOpenOrientadorWizard')?.addEventListener('click', async () => {
      const orientadorMod = await import('./orientador.js');
      orientadorMod.openOnboardingModal(true);
    });
  }
}

function renderContinuityCards() {
  const container = document.getElementById('dashContinuityGrid');
  if (!container) return;

  // Determinar última aula e próxima disponível
  const last = state.ultimaAula;
  let nextLesson = null;
  let targetCourseId = 'frontend';

  if (last) {
    targetCourseId = last.courseId;
  } else {
    try {
      const pRaw = localStorage.getItem('edev_study_profile');
      const p = pRaw ? JSON.parse(pRaw) : null;
      if (p?.recommendations?.courses?.[0]?.courseId) {
        targetCourseId = p.recommendations.courses[0].courseId;
      }
    } catch {}
  }

  // Procura primeira aula com status 'current'
  const list = allLessons(targetCourseId);
  const foundCurrent = list.find(l => statusOf(targetCourseId, l.id) === 'current');
  nextLesson = foundCurrent || list[0];

  const c = COURSES[targetCourseId] || COURSES.frontend;

  container.innerHTML = `
    <div class="dash-cont-card last-lesson ${last ? '' : 'no-history'}">
      <div class="dash-cont-head">
        <span class="dash-cont-tag">📍 Onde você parou</span>
      </div>
      <h4 class="dash-cont-title">${last ? esc(last.title) : 'Nenhuma aula iniciada ainda'}</h4>
      <p class="dash-cont-desc">${last ? (c ? c.name : 'Curso ativo') : 'Comece sua primeira aula agora mesmo!'}</p>
      ${last ? `
        <button class="btn btn-primary btn-sm btn-dash-open" data-course="${last.courseId}" data-lesson="${last.lessonId}" type="button">
          ▶ Continuar Aula
        </button>
      ` : `
        <button class="btn btn-primary btn-sm btn-dash-open" data-course="${targetCourseId}" data-lesson="${nextLesson ? nextLesson.id : ''}" type="button">
          ▶ Começar ${c ? c.name.split(' ')[0] : 'Estudos'}
        </button>
      `}
    </div>

    <div class="dash-cont-card next-lesson">
      <div class="dash-cont-head">
        <span class="dash-cont-tag next">🚀 Próxima Sugerida</span>
      </div>
      <h4 class="dash-cont-title">${nextLesson ? esc(nextLesson.title) : 'Curso Concluído!'}</h4>
      <p class="dash-cont-desc">${c.name} — +40 XP ao concluir</p>
      ${nextLesson ? `
        <button class="btn btn-ghost btn-sm btn-dash-open" data-course="${targetCourseId}" data-lesson="${nextLesson.id}" type="button">
          Acessar Aula →
        </button>
      ` : ''}
    </div>
  `;

  // Bind de cliques nas aulas do dashboard
  container.querySelectorAll('.btn-dash-open').forEach(btn => {
    btn.onclick = () => {
      const courseId = btn.dataset.course;
      const lessonId = btn.dataset.lesson;
      import('./aula.js').then(m => m.openLesson(courseId, lessonId));
    };
  });
}

function renderNextAchievements() {
  const box = document.getElementById('dashNextAchList');
  if (!box) return;

  const unlocked = state.achievements || [];
  const pending = ACHIEVEMENTS.filter(a => !unlocked.includes(a.id)).slice(0, 3);

  if (pending.length === 0) {
    box.innerHTML = `
      <div class="dash-all-ach-done">
        🎉 Parabéns! Você desbloqueou todas as conquistas da plataforma!
      </div>
    `;
    return;
  }

  box.innerHTML = pending.map(a => `
    <div class="dash-ach-item" title="${esc(a.desc)}">
      <div class="dash-ach-icon">${achIcon(a.icon)}</div>
      <div class="dash-ach-info">
        <h5>${esc(a.name)}</h5>
        <p>${esc(a.desc)}</p>
      </div>
      <span class="dash-ach-lock-badge">Bloqueada</span>
    </div>
  `).join('');
}

function setupDashboardActions() {
  const quickBtn = document.getElementById('dashQuickResumeBtn');
  if (quickBtn && !quickBtn._hasClick) {
    quickBtn._hasClick = true;
    quickBtn.onclick = () => {
      if (state.ultimaAula) {
        import('./aula.js').then(m => m.openLesson(state.ultimaAula.courseId, state.ultimaAula.lessonId));
      } else {
        openNavPage('cursos');
      }
    };
  }

  const goCoursesBtn = document.getElementById('btnGoCourses');
  if (goCoursesBtn && !goCoursesBtn._hasClick) {
    goCoursesBtn._hasClick = true;
    goCoursesBtn.onclick = () => openNavPage('cursos');
  }

  const upgradeBtn = document.getElementById('btnDashUpgradeFree');
  if (upgradeBtn && !upgradeBtn._hasClick) {
    upgradeBtn._hasClick = true;
    upgradeBtn.onclick = () => openNavPage('planos');
  }
}

// Auto-registro: toda vez que o dashboard for aberto, re-renderiza
registerRenderer('dashboard', updateDashboard);

