/**
 * js/perfil.js
 * Formulário de perfil — salva nome e e-mail, atualiza a sidebar.
 */

import { state, formatTempo, updateSidebarUser, registerRenderer } from './main.js';
import { COURSES } from '../data/cursos.js';

export function initPerfil() {
  function renderStudyTime() {
    const box = document.getElementById('profileStudyTime');
    if (!box) return;

    const tempo = state.tempoEstudo || { total: 0, porAula: {}, porCurso: {}, sessoes: [] };
    const feMin = tempo.porCurso?.frontend || 0;
    const pyMin = tempo.porCurso?.python || 0;

    // Calcula tempo por módulo de Front-end
    const feModulesHtml = COURSES.frontend.modules.map((m, idx) => {
      const mMin = m.lessons.reduce((acc, l) => acc + (tempo.porAula?.[l.id] || 0), 0);
      return `<li><span class="mod-name">${m.title.split('—')[0].trim()}</span> <span class="mod-val">${formatTempo(mMin)}</span></li>`;
    }).join('');

    // Calcula tempo por módulo de Python
    const pyModulesHtml = COURSES.python.modules.map((m, idx) => {
      const mMin = m.lessons.reduce((acc, l) => acc + (tempo.porAula?.[l.id] || 0), 0);
      return `<li><span class="mod-name">${m.title.split('—')[0].trim()}</span> <span class="mod-val">${formatTempo(mMin)}</span></li>`;
    }).join('');

    box.innerHTML = `
      <div class="study-time-total">
        <span class="total-label">Tempo Total Acumulado:</span>
        <span class="total-value">${formatTempo(tempo.total || 0)}</span>
      </div>

      <div class="study-courses-grid">
        <div class="study-course-col">
          <div class="study-course-head fe">
            <h4>Front-end Completo</h4>
            <span>${formatTempo(feMin)}</span>
          </div>
          <ul class="study-modules-list">
            ${feModulesHtml}
          </ul>
        </div>

        <div class="study-course-col">
          <div class="study-course-head py">
            <h4>Python — Lógica</h4>
            <span>${formatTempo(pyMin)}</span>
          </div>
          <ul class="study-modules-list">
            ${pyModulesHtml}
          </ul>
        </div>
      </div>
    `;
  }

  function syncFields() {
    const name  = localStorage.getItem('edev_name')  || '';
    const email = localStorage.getItem('edev_email') || '';
    const nameInput  = document.getElementById('pName');
    const emailInput = document.getElementById('pEmail');
    if (nameInput)  nameInput.value  = name;
    if (emailInput) emailInput.value = email;
    renderStudyTime();
  }
  syncFields();
  registerRenderer('perfil', syncFields);

  // Submit do formulário
  document.getElementById('profileForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const newName  = document.getElementById('pName')?.value.trim();
    const newEmail = document.getElementById('pEmail')?.value.trim();
    if (!newName) return;

    localStorage.setItem('edev_name',  newName);
    localStorage.setItem('edev_email', newEmail || '');
    updateSidebarUser();

    // Feedback visual temporário
    const btn = e.target.querySelector('[type="submit"]');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = 'Salvo!';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 2000);
    }
  });
}
