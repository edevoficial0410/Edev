/**
 * js/main.js
 * Núcleo da aplicação: estado global, navegação, sidebar e utilitários.
 * Exportado para todos os outros módulos — sem imports circulares.
 *
 * Arquitetura:
 *   - main.js exporta tudo que os feature modules precisam
 *   - feature modules importam de main.js, mas main.js NÃO importa deles
 *   - index.html importa todos os módulos e dispara init()
 */

import { RANKS, PAGE_TITLES, COURSES } from '../data/cursos.js';
import { ACHIEVEMENTS } from '../data/conquistas.js';
import { requireAuth, logout, isAuthenticated, apiFetch, getAccessToken, API_BASE } from './auth.js';

// ============================================================
// ESTADO GLOBAL — compartilhado por referência com todos os módulos
// ============================================================

export const state = {
  xp:          0,
  streak:      0,
  completed:   [],
  achievements:[],
  certificates:[],
  usedHint:    false,
  perfect:     0,
  lastPractice:null,
  ultimaAula:  null, // { courseId, lessonId, timestamp }
  tempoEstudo: {
    total: 0, // em minutos
    porAula: {}, // { [lessonId]: minutos }
    porCurso: {}, // { [courseId]: minutos }
    sessoes: [] // [{ lessonId, entrada, saida, duracao }]
  }
};

const LS_KEY = 'edev_members_v2';
let _saveDebounceTimer = null;

/**
 * Persiste o estado do aluno:
 * - Imediatamente no localStorage (cache local e fallback offline)
 * - Se logado, envia ao backend via PUT /api/progress com debounce
 */
export function save() {
  console.log('[SAVE] Chamado. XP atual:', state.xp, '| Aulas concluídas:', state.completed.length);

  // 1. Persistência local imediata (optimistic UI + fallback offline)
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
    console.log('[SAVE] Cache local atualizado no localStorage.');
  } catch (err) {
    console.warn('[SAVE] Falha ao persistir estado no localStorage:', err);
  }

  // 2. Se o aluno não estiver autenticado, encerra aqui
  const token = getAccessToken();
  if (!token) {
    console.log('[SAVE] Aluno não autenticado. Salvamento remoto não efetuado (modo offline/visitante).');
    return;
  }

  // 3. Debounce para envio ao backend (600ms)
  if (_saveDebounceTimer) {
    clearTimeout(_saveDebounceTimer);
  }

  _saveDebounceTimer = setTimeout(async () => {
    _saveDebounceTimer = null;
    const payload = {
      xp: typeof state.xp === 'number' ? state.xp : 0,
      completed: Array.isArray(state.completed) ? state.completed : [],
      streak: typeof state.streak === 'number' ? state.streak : 0,
      ultimaAula: state.ultimaAula || null,
      tempoEstudo: state.tempoEstudo || { total: 0, porAula: {}, porCurso: {}, sessoes: [] },
      achievements: Array.isArray(state.achievements) ? state.achievements : [],
      certificates: Array.isArray(state.certificates) ? state.certificates : [],
    };

    console.log('[SAVE] Enviando para backend PUT /api/progress...', payload);

    try {
      const res = await apiFetch('/api/progress', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      console.log('✅ [SAVE] Resposta do backend com sucesso:', res);
    } catch (err) {
      console.error('❌ [SAVE] Erro ao sincronizar progresso com o backend:', err);
    }
  }, 600);
}

// Envia alterações pendentes caso a aba/janela seja fechada
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (_saveDebounceTimer && isAuthenticated()) {
      clearTimeout(_saveDebounceTimer);
      try {
        const payload = JSON.stringify({
          xp: state.xp || 0,
          completed: Array.isArray(state.completed) ? state.completed : [],
          streak: state.streak || 0,
          ultimaAula: state.ultimaAula || null,
          tempoEstudo: state.tempoEstudo || { total: 0, porAula: {}, porCurso: {}, sessoes: [] },
          achievements: Array.isArray(state.achievements) ? state.achievements : [],
          certificates: Array.isArray(state.certificates) ? state.certificates : [],
        });
        const token = getAccessToken();
        fetch(`${API_BASE}/api/progress`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: payload,
          keepalive: true
        });
      } catch {
        // Ignora erros ao descarregar a página
      }
    }
  });
}

/**
 * Reseta o estado global para os valores padrão zerados.
 * Garante que dados de um usuário anterior não vazem para outro.
 */
export function resetState() {
  if (_saveDebounceTimer) {
    clearTimeout(_saveDebounceTimer);
    _saveDebounceTimer = null;
  }
  state.xp = 0;
  state.streak = 0;
  state.completed = [];
  state.achievements = [];
  state.certificates = [];
  state.usedHint = false;
  state.perfect = 0;
  state.lastPractice = null;
  state.ultimaAula = null;
  state.tempoEstudo = {
    total: 0,
    porAula: {},
    porCurso: {},
    sessoes: []
  };
}

/**
 * Carrega o estado do aluno:
 * - Reseta o estado em memória para valores padrão (garante isolamento estrito)
 * - Se o aluno estiver logado, busca do backend via GET /api/progress e SUBSTITUI o state
 * - Nunca faz merge com progresso de outros usuários ou do localStorage antigo
 */
export async function load() {
  // 1. Sempre limpa o estado em memória antes de qualquer carregamento
  resetState();

  // 2. Se autenticado, busca exclusivamente os dados do backend do usuário logado
  if (isAuthenticated()) {
    console.log('🔍 [LOAD] Aluno autenticado. Buscando progresso no backend (GET /api/progress)...');
    try {
      const res = await apiFetch('/api/progress');
      console.log('🔍 [LOAD] Resposta do backend recebida:', res);
      const remote = res?.progress;

      if (remote) {
        // Substitui o estado inteiro de forma atômica
        state.xp = typeof remote.xp === 'number' ? remote.xp : 0;
        state.completed = Array.isArray(remote.completed) ? [...remote.completed] : [];
        state.streak = typeof remote.streak === 'number' ? remote.streak : 0;
        state.ultimaAula = remote.ultimaAula || null;
        state.tempoEstudo = remote.tempoEstudo || { total: 0, porAula: {}, porCurso: {}, sessoes: [] };
        state.achievements = Array.isArray(remote.achievements) ? [...remote.achievements] : [];
        state.certificates = Array.isArray(remote.certificates) ? [...remote.certificates] : [];

        // Atualiza cache local sincronizado com este usuário específico
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(state));
        } catch (e) {}
      }
    } catch (err) {
      console.warn('[LOAD] Servidor inacessível ao buscar progresso:', err.message);
    }
  } else {
    console.log('[LOAD] Aluno visitante / não autenticado. Estado inicializado zerado.');
  }

  // 3. Garante integridade de tipos e valores default
  if (!Array.isArray(state.completed)) state.completed = [];
  if (!Array.isArray(state.achievements)) state.achievements = [];
  if (!Array.isArray(state.certificates)) state.certificates = [];
  if (typeof state.xp !== 'number') state.xp = 0;
  if (typeof state.streak !== 'number') state.streak = 0;
  if (typeof state.perfect !== 'number') state.perfect = 0;

  if (!state.tempoEstudo || typeof state.tempoEstudo !== 'object') {
    state.tempoEstudo = { total: 0, porAula: {}, porCurso: {}, sessoes: [] };
  } else {
    if (typeof state.tempoEstudo.total !== 'number') state.tempoEstudo.total = 0;
    if (!state.tempoEstudo.porAula || typeof state.tempoEstudo.porAula !== 'object') state.tempoEstudo.porAula = {};
    if (!state.tempoEstudo.porCurso || typeof state.tempoEstudo.porCurso !== 'object') state.tempoEstudo.porCurso = {};
    if (!Array.isArray(state.tempoEstudo.sessoes)) state.tempoEstudo.sessoes = [];
  }

  return state;
}

// ============================================================
// UTILITÁRIOS
// ============================================================

/** Escapa HTML — evita XSS ao injetar texto do usuário */
export function esc(s) {
  const d = document.createElement('div');
  d.textContent = String(s ?? '');
  return d.innerHTML;
}

/** Normaliza string para comparação: sem espaços, minúscula */
export function norm(s) {
  return String(s ?? '').replace(/\s+/g, '').toLowerCase();
}

/** Formata tempo em minutos para formato amigável (ex: '2h 30min', '45min', '< 1min') */
export function formatTempo(minutos) {
  const m = Math.round(minutos || 0);
  if (m < 1) return '< 1min';
  const h = Math.floor(m / 60);
  const rest = m % 60;
  if (h === 0) return `${rest}min`;
  if (rest === 0) return `${h}h`;
  return `${h}h ${rest}min`;
}

/** Retorna todas as aulas de um curso como array plano */
export function allLessons(courseId) {
  return COURSES[courseId].modules.flatMap(m => m.lessons);
}

/** Retorna o nome do rank atual baseado no XP */
export function rank() {
  let name = RANKS[0].name;
  RANKS.forEach(r => { if (state.xp >= r.min) name = r.name; });
  return name;
}

/** Calcula progresso de um curso: { done, total, pct } */
export function progress(courseId) {
  const list = allLessons(courseId);
  const done = list.filter(l => state.completed.includes(l.id)).length;
  return { done, total: list.length, pct: Math.round((done / list.length) * 100) };
}

/** Retorna o status de uma aula: 'done' | 'current' | 'locked' */
export function statusOf(courseId, lessonId) {
  const list = allLessons(courseId);
  const i    = list.findIndex(l => l.id === lessonId);
  if (state.completed.includes(lessonId)) return 'done';
  if (i === 0) return 'current';
  if (i > 0 && state.completed.includes(list[i - 1].id)) return 'current';
  return 'locked';
}

/** Verifica e desbloqueia conquistas e certificados conforme o progresso */
export function checkAchievements() {
  // Módulo HTML do front-end (módulo índice 1)
  const feHtml = COURSES.frontend.modules[1].lessons.every(l => state.completed.includes(l.id));
  // Módulo Fundamentos do Python (módulo índice 1)
  const pyFund = COURSES.python.modules[1].lessons.every(l => state.completed.includes(l.id));
  const feAny  = allLessons('frontend').some(l => state.completed.includes(l.id));
  const pyAny  = allLessons('python').some(l => state.completed.includes(l.id));

  const criteria = {
    first:   state.completed.length >= 1,
    streak3: state.streak >= 3,
    xp100:   state.xp >= 100,
    html:    feHtml,
    pyfund:  pyFund,
    perfect: state.perfect >= 1,
    both:    feAny && pyAny
  };

  ACHIEVEMENTS.forEach(a => {
    if (criteria[a.id] && !state.achievements.includes(a.id)) {
      state.achievements.push(a.id);
    }
  });

  // Certificados — desbloqueados ao concluir 100% do curso
  Object.keys(COURSES).forEach(cid => {
    if (progress(cid).pct === 100 && !state.certificates.includes(cid)) {
      state.certificates.push(cid);
    }
  });
}

/** Atualiza streak de dias consecutivos de estudo */
export function bumpStreak() {
  const today = new Date().toISOString().slice(0, 10);
  if (state.lastPractice === today) return;
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  state.streak = state.lastPractice === yesterday ? state.streak + 1 : 1;
  state.lastPractice = today;
}

// ============================================================
// NAVEGAÇÃO — sistema de páginas sem router externo
// ============================================================

/** Registro de renderers { page: fn } — evita imports circulares */
const _renderers = {};

/**
 * Registra uma função de renderização para uma página.
 * Cada feature module chama isso na inicialização.
 */
export function registerRenderer(page, fn) {
  _renderers[page] = fn;
}

let _onLeavePageCallback = null;
/** Registra callback para quando o usuário sai de uma página (ex: aula) */
export function onLeavePage(fn) {
  _onLeavePageCallback = fn;
}

/**
 * Ativa uma página no DOM (sem chamar o renderer).
 * Use openNavPage para navegar E renderizar.
 */
export function navigate(page) {
  const currentActive = document.querySelector('.page.active');
  const currentPage = currentActive?.id?.replace('page-', '');
  if (currentPage && currentPage !== page) {
    try { _onLeavePageCallback?.(currentPage, page); } catch(e) { console.warn(e); }
  }

  const target = document.getElementById('page-' + page);
  if (!target) return;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  target.classList.add('active');

  // Na aula, mantém 'Cursos' ativo na sidebar
  const navKey = page === 'aula' ? 'cursos' : page;
  document.querySelector(`.nav-item[data-page="${navKey}"]`)?.classList.add('active');

  // Atualiza título na topbar
  document.getElementById('pageTitle').textContent = PAGE_TITLES[page] || page;

  closeSidebar();
}

/** Navega E chama o renderer registrado para a página */
export function openNavPage(page) {
  navigate(page);
  _renderers[page]?.();
}

// ============================================================
// SIDEBAR MOBILE
// ============================================================

function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('show');
}

function initSidebar() {
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('overlay');
  const hamburger = document.getElementById('hamburger');

  hamburger?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  });
  overlay?.addEventListener('click', closeSidebar);

  // Delegação e listeners diretos na navegação
  document.querySelectorAll('.nav-item[data-page]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const p = btn.dataset.page;
      if (p) openNavPage(p);
    });
  });

  document.querySelector('.nav')?.addEventListener('click', e => {
    const item = e.target.closest('.nav-item[data-page]');
    if (!item) return;
    e.preventDefault();
    openNavPage(item.dataset.page);
  });
}

// ============================================================
// PERFIL — avatar/nome/email na sidebar
// ============================================================

export function updateSidebarUser() {
  const name    = localStorage.getItem('edev_name')  || 'Aluno';
  const email   = localStorage.getItem('edev_email') || 'aluno@edev.com.br';
  const initials = name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'ED';

  const avatar = document.getElementById('avatar');
  const uName  = document.getElementById('userName');
  const uEmail = document.getElementById('userEmail');
  const dashName = document.getElementById('dashUserName');

  if (avatar) avatar.textContent = initials;
  if (uName)  uName.textContent  = name;
  if (uEmail) uEmail.textContent = email;
  if (dashName) dashName.textContent = name.split(' ')[0];

  // Badge de Fundador no avatar e sidebar
  const isUserFounder = localStorage.getItem('edev_is_founder') === '1' || localStorage.getItem('edev_plan') === 'founder';
  if (isUserFounder) {
    if (avatar) {
      avatar.style.border = '2px solid #F59E0B';
      avatar.style.boxShadow = '0 0 12px rgba(245, 158, 11, 0.4)';
      avatar.title = 'Membro Fundador — Acesso Vitalício';
    }
    if (uName && !document.getElementById('founderBadgeSidebar')) {
      const badge = document.createElement('span');
      badge.id = 'founderBadgeSidebar';
      badge.style.cssText = 'display:inline-block;background:rgba(245,158,11,0.15);color:#F59E0B;border:1px solid rgba(245,158,11,0.35);border-radius:999px;font-size:0.65rem;font-weight:700;padding:1px 6px;margin-left:6px;vertical-align:middle;';
      badge.textContent = 'Fundador';
      uName.appendChild(badge);
    }
  }
}

function showSubscriptionSuccessToast() {
  const toast = document.createElement('div');
  toast.id = 'subSuccessToast';
  toast.style.cssText = `
    position: fixed; top: 24px; right: 24px; z-index: 99999;
    background: #12171C; border: 1px solid #22C55E; color: #FFFFFF;
    border-radius: 12px; padding: 18px 24px; box-shadow: 0 12px 36px rgba(0,0,0,0.6);
    display: flex; align-items: center; gap: 14px; max-width: 440px; animation: fadeIn 0.3s ease;
  `;
  toast.innerHTML = `
    <div style="width:36px;height:36px;border-radius:50%;background:rgba(34,197,94,0.15);color:#22C55E;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;">
      ✓
    </div>
    <div style="flex:1;">
      <h4 style="font-size:0.95rem;color:#22C55E;margin-bottom:2px;">Assinatura Confirmada!</h4>
      <p style="font-size:0.84rem;color:#E5E7EB;margin:0;">Todos os módulos e cursos estão 100% liberados para sua conta.</p>
    </div>
    <button type="button" style="background:transparent;border:none;color:#8A94A0;font-size:1.2rem;cursor:pointer;" onclick="this.parentElement.remove()">&times;</button>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast?.remove(), 7000);
}

// ============================================================
// INICIALIZAÇÃO — chamada pelo app.html após importar tudo
// ============================================================

export async function init() {
  // 1. Verificação de sessão autenticada (redireciona para login.html se inválido)
  const user = await requireAuth();

  // 2. Carrega dados do app (espera backend / migração forçada)
  await load();
  initSidebar();
  updateSidebarUser();

  if (user && user.name) {
    const dashName = document.getElementById('dashUserName');
    if (dashName) dashName.textContent = user.name.split(' ')[0];
  }

  // 3. Listener do botão de Logout na sidebar e no perfil
  const handleLogout = async (e) => {
    e.preventDefault();
    if (confirm('Deseja realmente sair da sua conta no Edev?')) {
      resetState();
      await logout();
    }
  };

  document.getElementById('btnLogout')?.addEventListener('click', handleLogout);
  document.getElementById('btnProfileLogout')?.addEventListener('click', handleLogout);

  // 4. Tratamento do retorno de pagamento com sucesso (?subscription=success)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('subscription') === 'success') {
    showSubscriptionSuccessToast();
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}
