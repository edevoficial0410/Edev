/**
 * js/cursos.js
 * Catálogo de cursos, detalhe de módulo e download de código (.zip via JSZip).
 */

import { state, progress, statusOf, openNavPage, registerRenderer, esc } from './main.js';
import { COURSES } from '../data/cursos.js';
import { isFounder, hasActiveSubscription } from './auth.js';

const KIWIFY_MONTHLY = 'https://pay.kiwify.com.br/ksvrvDc';
const KIWIFY_YEARLY  = 'https://pay.kiwify.com.br/U9fA01u';

/**
 * Exibe o modal de assinatura para módulos protegidos
 */
export function showSubscriptionModal() {
  let modal = document.getElementById('subscriptionModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'subscriptionModal';
    modal.style.cssText = `
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      padding: 20px; animation: fadeIn 0.2s ease;
    `;
    modal.innerHTML = `
      <div style="background: #1A1F26; border: 1px solid var(--blue, #1CA8E3); border-radius: 18px; max-width: 500px; width: 100%; padding: 36px 28px; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.8); text-align: center;">
        <button id="closeSubModal" type="button" style="position: absolute; top: 16px; right: 18px; background: transparent; border: none; color: #8A94A0; font-size: 1.5rem; cursor: pointer; line-height: 1;">&times;</button>
        
        <div style="width: 52px; height: 52px; border-radius: 14px; background: rgba(28,168,227,0.15); color: #1CA8E3; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; font-size: 1.6rem;">
          🔒
        </div>

        <h3 style="font-size: 1.45rem; color: #FFFFFF; font-weight: 800; margin-bottom: 8px;">Conteúdo Exclusivo</h3>
        <p style="color: #E5E7EB; font-size: 1.05rem; line-height: 1.5; margin-bottom: 24px;">
          Assine para acessar todos os módulos.<br>
          <strong style="color: #1CA8E3;">R$ 49,90/mês</strong> ou <strong style="color: #1CA8E3;">R$ 299,90/ano</strong>.
        </p>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
          <button id="btnSubModalYearly" type="button" style="background: #1CA8E3; color: #0A0A0A; border: none; border-radius: 10px; padding: 14px; font-size: 1rem; font-weight: 800; cursor: pointer; transition: transform 0.2s;">
            Assinar Anual (R$ 299,90/ano — Economize 50%)
          </button>
          <button id="btnSubModalMonthly" type="button" style="background: #12171C; border: 1px solid rgba(28,168,227,0.5); color: #FFFFFF; border-radius: 10px; padding: 14px; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: transform 0.2s;">
            Assinar Mensal (R$ 49,90/mês)
          </button>
        </div>

        <p style="color: #8A94A0; font-size: 0.8rem;">
          Pagamento 100% seguro via Kiwify • Cancele quando quiser sem multas
        </p>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#closeSubModal').onclick = () => { modal.style.display = 'none'; };
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
    modal.querySelector('#btnSubModalYearly').onclick = () => {
      window.open(KIWIFY_YEARLY, '_blank');
      modal.style.display = 'none';
    };
    modal.querySelector('#btnSubModalMonthly').onclick = () => {
      window.open(KIWIFY_MONTHLY, '_blank');
      modal.style.display = 'none';
    };
  }

  modal.style.display = 'flex';
}

/** Curso aberto no momento (usado por aula.js ao navegar de volta) */
export let currentCourse = null;

// ============================================================
// CATÁLOGO
// ============================================================

// Ícones representativos de cada curso no catálogo
const COURSE_ICONS = {
  frontend: '🎨',
  python: '🐍',
  java: '☕',
  cpp: '⚡',
  php: '🐘',
  sql: '🗄️'
};

export function renderCatalog() {
  const cat = document.getElementById('courseCatalog');
  const det = document.getElementById('courseDetail');
  const results = document.getElementById('courseSearchResults');
  const searchInput = document.getElementById('courseSearchInput');
  const clearBtn = document.getElementById('clearCourseSearch');

  if (!cat || !det) return;
  cat.hidden = false;
  det.hidden = true;
  if (results) { results.hidden = true; results.innerHTML = ''; }
  if (searchInput) searchInput.value = '';
  if (clearBtn) clearBtn.hidden = true;

  initCourseSearch();

  cat.innerHTML = `<div class="courses-grid">
    ${Object.keys(COURSES).map(id => {
      const c = COURSES[id];
      const p = progress(id);
      const isLastCourse = state.ultimaAula && state.ultimaAula.courseId === id;
      const icon = COURSE_ICONS[id] || '💻';
      const badgeClass = id === 'python' ? 'py' : (id !== 'frontend' ? id : '');
      const resumeBadge = isLastCourse
        ? `<div class="course-resume-badge" title="Clique para continuar sua última aula acessada">
             <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
             <span>Continuar: <strong>${esc(state.ultimaAula.title || 'Última aula')}</strong></span>
           </div>`
        : '';

      return `<article class="course-card ${isLastCourse ? 'has-resume' : ''}" data-course="${id}" role="button" tabindex="0">
        <div class="course-card-top">
          <div class="course-card-icon-tag">
            <span class="course-icon">${icon}</span>
            <span class="course-badge ${badgeClass}">${c.tag}</span>
          </div>
          ${resumeBadge}
        </div>
        <h3>${c.name}</h3>
        <p>${c.desc}</p>
        
        <!-- Barra de Progresso no Card -->
        <div class="course-card-progress">
          <div class="course-card-prog-head">
            <span>Progresso da Trilha</span>
            <strong>${p.pct}%</strong>
          </div>
          <div class="course-card-bar">
            <div class="course-card-fill ${id}" style="width:${p.pct}%"></div>
          </div>
        </div>

        <div class="course-meta">
          <span>📚 ${p.total} aulas — ⏱️ ${c.hours}</span>
          <span>${p.done}/${p.total} concluídas</span>
        </div>

        <div class="course-card-btn-wrap">
          <button class="btn ${isLastCourse ? 'btn-primary' : 'btn-ghost'} btn-card-action" type="button">
            ${isLastCourse ? '▶ Continuar Aula' : (p.done > 0 ? 'Continuar Trilha' : 'Iniciar Curso')}
          </button>
        </div>
      </article>`;
    }).join('')}
  </div>`;

  cat.querySelectorAll('.course-card').forEach(card => {
    const courseId = card.dataset.course;
    const open = (e) => {
      // Se clicou diretamente no badge de continuar, abre a última aula diretamente
      if (e.target.closest('.course-resume-badge') && state.ultimaAula && state.ultimaAula.courseId === courseId) {
        e.stopPropagation();
        import('./aula.js').then(m => m.openLesson(courseId, state.ultimaAula.lessonId));
        return;
      }
      renderCourse(courseId);
    };
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter') open(e); });
  });
}

// ============================================================
// BARRA DE PESQUISA EM TEMPO REAL
// ============================================================

function initCourseSearch() {
  const searchInput = document.getElementById('courseSearchInput');
  const clearBtn = document.getElementById('clearCourseSearch');
  if (!searchInput || searchInput._searchInitialized) return;
  searchInput._searchInitialized = true;

  searchInput.addEventListener('input', () => {
    filterCourses(searchInput.value);
  });

  clearBtn?.addEventListener('click', () => {
    searchInput.value = '';
    filterCourses('');
    searchInput.focus();
  });
}

function filterCourses(query) {
  const q = String(query || '').trim().toLowerCase();
  const cat = document.getElementById('courseCatalog');
  const det = document.getElementById('courseDetail');
  const results = document.getElementById('courseSearchResults');
  const clearBtn = document.getElementById('clearCourseSearch');

  if (clearBtn) clearBtn.hidden = !q;

  if (!q) {
    if (results) { results.hidden = true; results.innerHTML = ''; }
    if (cat) cat.hidden = false;
    return;
  }

  // Oculta catálogo e detalhe, mostra resultados
  if (cat) cat.hidden = true;
  if (det) det.hidden = true;
  if (!results) return;
  results.hidden = false;

  const matches = [];

  Object.keys(COURSES).forEach(courseId => {
    const course = COURSES[courseId];
    course.modules.forEach((mod, modIdx) => {
      mod.lessons.forEach((lesson, lessonIdx) => {
        const titleLower = (lesson.title || '').toLowerCase();
        const theoryLower = (lesson.theory || '').toLowerCase();
        const titleMatch = titleLower.includes(q);
        const theoryMatch = theoryLower.includes(q);

        if (titleMatch || theoryMatch) {
          matches.push({
            courseId,
            courseName: course.name,
            courseTag: course.tag,
            moduleTitle: mod.title,
            moduleIndex: modIdx,
            lesson,
            lessonIndex: lessonIdx,
            score: titleMatch ? 2 : 1
          });
        }
      });
    });
  });

  if (matches.length === 0) {
    results.innerHTML = `
      <div class="search-empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <h4>Nenhuma aula encontrada para "${esc(query)}"</h4>
        <p>Tente buscar por termos como <em>HTML, CSS, JavaScript, VS Code, Python, listas</em> ou limpe a pesquisa.</p>
        <button class="btn btn-ghost" type="button" id="btnResetSearch">Limpar pesquisa</button>
      </div>
    `;
    document.getElementById('btnResetSearch')?.addEventListener('click', () => {
      const input = document.getElementById('courseSearchInput');
      if (input) input.value = '';
      filterCourses('');
    });
    return;
  }

  // Ordena por relevância (título primeiro)
  matches.sort((a, b) => b.score - a.score);

  // Helper de destaque visual
  const highlight = (text, term) => {
    if (!term) return esc(text);
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedTerm})`, 'gi');
    return esc(text).replace(regex, '<mark class="search-highlight">$1</mark>');
  };

  results.innerHTML = `
    <div class="search-results-header">
      <span>Encontradas <strong>${matches.length}</strong> aula(s) com o termo "<strong>${esc(query)}</strong>"</span>
    </div>
    <div class="search-results-list">
      ${matches.map(m => {
        const st = statusOf(m.courseId, m.lesson.id);
        const isLast = state.ultimaAula && state.ultimaAula.courseId === m.courseId && state.ultimaAula.lessonId === m.lesson.id;
        const stLabel = { done: 'Concluída', current: 'Disponível', locked: 'Bloqueada' }[st];
        return `
          <div class="search-lesson-item ${st} ${isLast ? 'last-accessed' : ''}" data-course="${m.courseId}" data-lesson="${m.lesson.id}" role="button" tabindex="0">
            <div class="search-item-info">
              <div class="search-item-badges">
                <span class="course-mini-badge ${m.courseId}">${m.courseName}</span>
                <span class="module-mini-badge">${esc(m.moduleTitle.split('—')[0].trim())}</span>
                ${isLast ? '<span class="status-pill last-pill">▶ Última acessada</span>' : ''}
              </div>
              <h4 class="search-lesson-title">${highlight(m.lesson.title, query)}</h4>
            </div>
            <div class="search-item-action">
              <span class="status-pill ${st}">${stLabel}</span>
              <button class="btn ${st === 'locked' ? 'btn-ghost' : 'btn-primary'} btn-sm" type="button" ${st === 'locked' ? 'disabled' : ''}>
                ${st === 'locked' ? 'Bloqueada' : 'Abrir Aula'}
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  results.querySelectorAll('.search-lesson-item').forEach(item => {
    const open = () => {
      const courseId = item.dataset.course;
      const lessonId = item.dataset.lesson;
      const st = statusOf(courseId, lessonId);
      if (st === 'locked') return;
      import('./aula.js').then(m => m.openLesson(courseId, lessonId));
    };
    item.addEventListener('click', open);
    item.addEventListener('keydown', e => { if (e.key === 'Enter') open(); });
  });
}

// ============================================================
// DETALHE DO CURSO
// ============================================================

export function renderCourse(courseId) {
  currentCourse = courseId;
  const course  = COURSES[courseId];
  const cat = document.getElementById('courseCatalog');
  const det = document.getElementById('courseDetail');
  const results = document.getElementById('courseSearchResults');
  if (!cat || !det) return;

  cat.hidden = true;
  if (results) { results.hidden = true; results.innerHTML = ''; }
  det.hidden = false;

  det.innerHTML = `
    <button class="back-link" id="backCatalog" type="button">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      Todos os cursos
    </button>
    <div class="course-detail-header">
      <h3 class="section-title" style="margin-bottom:4px">${course.name}</h3>
      <p style="color:var(--muted);margin-bottom:18px;font-size:0.93rem">${course.desc}</p>
    </div>

    <!-- Filtro por Módulo -->
    <div class="module-filter-bar" id="moduleFilterBar">
      <button type="button" class="mod-filter-btn active" data-mod="all">
        Todos os Módulos (${course.modules.length})
      </button>
      ${course.modules.map((m, i) => `
        <button type="button" class="mod-filter-btn" data-mod="${i}">
          ${esc(m.title.split('—')[0].trim())}
        </button>
      `).join('')}
    </div>

    <div id="modules"></div>`;

  document.getElementById('backCatalog').onclick = renderCatalog;

  const wrap = document.getElementById('modules');
  course.modules.forEach((mod, mi) => buildModuleEl(wrap, courseId, mod, mi));

  // Eventos do Filtro por Módulo
  setupModuleFilter(wrap);
}

function setupModuleFilter(modulesContainer) {
  const bar = document.getElementById('moduleFilterBar');
  if (!bar) return;

  bar.querySelectorAll('.mod-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.mod-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetMod = btn.dataset.mod;
      const allModules = modulesContainer.querySelectorAll('.module');

      allModules.forEach((modEl, idx) => {
        if (targetMod === 'all') {
          modEl.style.display = '';
        } else if (String(idx) === targetMod) {
          modEl.style.display = '';
          modEl.classList.add('open'); // Abre automaticamente o módulo filtrado
        } else {
          modEl.style.display = 'none';
        }
      });
    });
  });
}

// ── Constrói um elemento de módulo (acordeão) ──────────────

function buildModuleEl(container, courseId, mod, mi) {
  const userHasAccess = isFounder() || hasActiveSubscription();
  const isPaidModule = mi > 0;
  const isModuleLocked = isPaidModule && !userHasAccess;

  const done = mod.lessons.filter(l => (state.completed || []).includes(l.id)).length;
  const box  = document.createElement('div');
  box.className = 'module' + (mi === 0 ? ' open' : '');

  const lockSvg  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`;
  const checkSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
  const dlSvg    = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

  const lockModuleBadge = isModuleLocked 
    ? `<span style="font-size:0.75rem;background:rgba(239,68,68,0.14);color:#EF4444;border:1px solid rgba(239,68,68,0.35);padding:3px 10px;border-radius:999px;margin-left:8px;font-weight:750;display:inline-flex;align-items:center;gap:4px;">🔒 Bloqueado (Assinatura)</span>` 
    : '';

  box.innerHTML = `
    <button class="module-head" type="button">
      <div>
        <h4>${mod.title} ${lockModuleBadge}</h4>
        <small>${isModuleLocked ? '🔒 Assine para desbloquear as aulas deste módulo' : `${done}/${mod.lessons.length} aulas concluídas`}</small>
      </div>
      <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>
    <div class="module-body">
      <div class="module-lessons"></div>
    </div>`;

  box.querySelector('.module-head').onclick = () => box.classList.toggle('open');

  const body = box.querySelector('.module-lessons');

  // Linhas de aula
  mod.lessons.forEach((lesson, li) => {
    const st  = statusOf(courseId, lesson.id);
    const effectiveSt = isModuleLocked ? 'locked' : st;
    const isLast = !isModuleLocked && state.ultimaAula && state.ultimaAula.courseId === courseId && state.ultimaAula.lessonId === lesson.id;
    const row = document.createElement('button');
    row.type      = 'button';
    row.className = `lesson-row ${effectiveSt} ${isLast ? 'last-accessed' : ''}`;
    const label   = isModuleLocked ? '🔒 Bloqueada' : ({ done: 'Concluída', current: 'Em andamento', locked: 'Bloqueada' }[st]);

    row.innerHTML = `
      <span class="lesson-num">${li + 1}</span>
      <span class="lesson-name">${lesson.title}</span>
      ${isLast ? '<span class="status-pill last-pill">▶ Última acessada</span>' : ''}
      <span class="status-pill ${effectiveSt}">${label}</span>
      ${effectiveSt === 'locked' ? lockSvg : st === 'done' ? checkSvg : ''}`;

    row.onclick = () => {
      if (isModuleLocked) {
        showSubscriptionModal();
        return;
      }
      if (st === 'locked') return;
      // Importa openLesson dinamicamente (evita circular import)
      import('./aula.js').then(m => m.openLesson(courseId, lesson.id));
    };
    body.appendChild(row);
  });

  // Botão de download do módulo
  const dlWrap = document.createElement('div');
  dlWrap.className = 'module-download';
  const dlBtn = document.createElement('button');
  dlBtn.type      = 'button';
  dlBtn.className = 'btn btn-ghost';
  if (isModuleLocked) {
    dlBtn.innerHTML = `🔒 Baixar Código (Exclusivo Assinantes)`;
    dlBtn.style.opacity = '0.7';
  } else {
    dlBtn.innerHTML = `${dlSvg} Baixar Código do Módulo`;
  }
  dlBtn.onclick   = () => {
    if (isModuleLocked) {
      showSubscriptionModal();
      return;
    }
    downloadModuleCode(courseId, mi);
  };
  dlWrap.appendChild(dlBtn);
  body.appendChild(dlWrap);

  container.appendChild(box);
}

// ============================================================
// DOWNLOAD DO CÓDIGO DO MÓDULO (.zip via JSZip)
// ============================================================

async function downloadModuleCode(courseId, moduleIndex) {
  // JSZip é carregado via CDN no index.html como script global
  const JSZip = window.JSZip;
  if (!JSZip) {
    alert('JSZip não carregado. Verifique sua conexão com a internet.');
    return;
  }

  const course = COURSES[courseId];
  const mod    = course.modules[moduleIndex];
  const zip    = new JSZip();
  const folder = zip.folder(`edev-${courseId}-modulo-${moduleIndex}`);
  const proj   = courseId === 'frontend'
    ? buildFrontendProject(moduleIndex)
    : buildPythonProject(moduleIndex);

  if (courseId === 'frontend') {
    folder.file('index.html', proj.html);
    if (proj.css) folder.file('css/style.css', proj.css);
    if (proj.js)  folder.file('js/script.js',  proj.js);
  } else {
    folder.file('todo.py', proj);
  }

  folder.file('README.md',
    `# ${course.name} — ${mod.title}\n\nCódigo acumulado do projeto até este módulo.\n\nGerado pelo Edev em ${new Date().toLocaleDateString('pt-BR')}\n`);

  const blob = await zip.generateAsync({ type: 'blob' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `edev-${courseId}-modulo-${moduleIndex}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Código acumulado do portfólio (Front-end) ──────────────

function buildFrontendProject(mi) {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Portfólio</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header>
    <nav>
      <a href="#sobre">Sobre</a>
      <a href="#habilidades">Habilidades</a>
      <a href="#contato">Contato</a>
    </nav>
  </header>
  <main>
    <section id="sobre">
      <img src="img/foto.jpg" alt="Minha foto">
      <h1>João Silva</h1>
      <p>Desenvolvedor Front-end em formação. Apaixonado por código e design.</p>
    </section>
    <section id="habilidades">
      <h2>Habilidades</h2>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </ul>
      <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
    </section>
    <section id="projetos">
      <h2>Projetos</h2>
      <ul id="lista-projetos"></ul>
    </section>
    <section id="contato">
      <h2>Contato</h2>
      <form id="formContato">
        <label for="nome">Nome</label>
        <input id="nome" type="text" name="nome" required>
        <label for="email">E-mail</label>
        <input id="email" type="email" name="email" required>
        <label for="msg">Mensagem</label>
        <textarea id="msg" name="msg" rows="4"></textarea>
        <button type="submit">Enviar</button>
      </form>
    </section>
  </main>
  <footer>
    <p>João Silva — 2026</p>
  </footer>
  <script src="js/script.js" defer></script>
</body>
</html>`;

  const css = mi >= 1 ? `/* Portfólio — style.css */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: "Segoe UI", system-ui, sans-serif;
  background: #0f172a;
  color: #e2e8f0;
  line-height: 1.6;
}

h1, h2, h3 { color: #1CA8E3; }
a { color: #1CA8E3; text-decoration: none; }
a:hover { opacity: 0.8; }

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: #0A0A0A;
  border-bottom: 1px solid #1CA8E3;
  position: sticky; top: 0; z-index: 10;
}
nav { display: flex; gap: 24px; }

main { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
section { margin-bottom: 60px; }

section#sobre {
  display: flex;
  align-items: center;
  gap: 32px;
}
section#sobre img {
  width: 120px; height: 120px;
  border-radius: 50%; border: 3px solid #1CA8E3;
  object-fit: cover;
}

ul { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
li {
  padding: 6px 14px; border-radius: 999px;
  background: rgba(28,168,227,0.10);
  border: 1px solid rgba(28,168,227,0.3);
  font-size: 0.9rem;
}

form { display: flex; flex-direction: column; gap: 12px; max-width: 500px; }
form label { font-size: 0.85rem; color: #94a3b8; }
form input, form textarea {
  padding: 10px 12px; border-radius: 8px;
  background: #1e293b; color: #e2e8f0;
  border: 1px solid #334155; outline: none;
}
form input:focus, form textarea:focus { border-color: #1CA8E3; }
form button {
  padding: 12px 24px; border-radius: 8px; border: 0;
  background: #1CA8E3; color: #fff; font-weight: 700; cursor: pointer;
}
form button:hover { opacity: 0.9; }

footer {
  text-align: center; padding: 24px;
  border-top: 1px solid #1e293b;
  color: #64748b; font-size: 0.85rem;
}

@media (max-width: 768px) {
  section#sobre { flex-direction: column; text-align: center; }
  header { flex-direction: column; gap: 12px; }
}` : null;

  const js = mi >= 3 ? `// Portfólio — script.js

const projetos = [
  { titulo: "Portfólio Pessoal", url: "#" },
  { titulo: "To-Do List",        url: "#" }
];

const listaProjetos = document.getElementById("lista-projetos");
if (listaProjetos) {
  listaProjetos.innerHTML = projetos
    .map(p => \`<li><a href="\${p.url}">\${p.titulo}</a></li>\`)
    .join("");
}

const form = document.getElementById("formContato");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    alert(\`Obrigado, \${nome}! Mensagem enviada.\`);
    form.reset();
  });
}` : null;

  return { html, css, js };
}

// ── Código acumulado da To-Do List (Python) ────────────────

function buildPythonProject(mi) {
  const stages = [
    `# todo.py — Módulo 0: Primeiro programa\nprint("Olá, mundo!")\nprint("To-Do List v1.0")`,
    `# todo.py — Módulo 1: Variáveis e I/O\ntitulo = "To-Do List"\nnome = input("Seu nome: ")\nprint(f"Bem-vindo, {nome}!")`,
    `# todo.py — Módulo 2: Controle de fluxo\ntarefas = []\n\nopcao = input("1. Ver  2. Sair\\n> ")\nif opcao == "1":\n    print("Nenhuma tarefa ainda.")\nelse:\n    print("Até logo!")`,
    `# todo.py — Módulo 3: Estruturas de dados\ntarefas = []\n\ndef adicionar(t, p="media"):\n    tarefas.append({"titulo": t, "feita": False, "prioridade": p})\n\nadicionar("Estudar Python", "alta")\nadicionar("Praticar no Playground")\n\nfor i, t in enumerate(tarefas, 1):\n    st = "[x]" if t["feita"] else "[ ]"\n    print(f"{i}. {st} {t['titulo']}  [{t['prioridade']}]")`,
    `# todo.py — Módulo 4: Funções\ntarefas = []\n\ndef mostrar(ts):\n    """Exibe todas as tarefas."""\n    if not ts: print("Nenhuma tarefa."); return\n    for i, t in enumerate(ts, 1):\n        st = "[x]" if t["feita"] else "[ ]"\n        print(f"{i}. {st} {t['titulo']}  [{t['prioridade']}")\n\ndef adicionar(ts):\n    """Adiciona uma tarefa."""\n    titulo = input("Título: ").strip()\n    prio   = input("Prioridade (alta/media/baixa): ").strip() or "media"\n    if titulo:\n        ts.append({"titulo": titulo, "feita": False, "prioridade": prio})\n        print("Adicionada!")\n\nmostrar(tarefas)\nadicionar(tarefas)\nmostrar(tarefas)`,
    `# todo.py — Módulo 5: Projeto Final Completo\ntarefas = []\n\ndef mostrar(ts):\n    """Exibe todas as tarefas com status e prioridade."""\n    if not ts: print("Nenhuma tarefa."); return\n    for i, t in enumerate(ts, 1):\n        st = "[x]" if t["feita"] else "[ ]"\n        print(f"{i}. {st} {t['titulo']}  [{t['prioridade']}]")\n\ndef adicionar(ts):\n    """Adiciona uma tarefa interativamente."""\n    titulo = input("Título: ").strip()\n    prio   = input("Prioridade (alta/media/baixa): ").strip() or "media"\n    if titulo:\n        ts.append({"titulo": titulo, "feita": False, "prioridade": prio})\n        print("Tarefa adicionada!")\n    else:\n        print("Título não pode ser vazio.")\n\ndef concluir(ts):\n    """Marca uma tarefa como concluída."""\n    mostrar(ts)\n    try:\n        n = int(input("Número: ")) - 1\n        ts[n]["feita"] = True\n        print("Concluída!")\n    except (ValueError, IndexError):\n        print("Número inválido.")\n\nprint("=== To-Do List — Edev ===\\n")\nwhile True:\n    print("\\n1. Ver  2. Adicionar  3. Concluir  4. Sair")\n    op = input("> ").strip()\n    if op == "1":   mostrar(tarefas)\n    elif op == "2": adicionar(tarefas)\n    elif op == "3": concluir(tarefas)\n    elif op == "4": print("Até logo!"); break\n    else:           print("Opção inválida.")`
  ];
  return stages[Math.min(mi, stages.length - 1)];
}

// Auto-registro
registerRenderer('cursos', renderCatalog);
