/**
 * js/conquistas.js
 * Renderização do grid de conquistas e compartilhamento social (LinkedIn).
 */

import { state, registerRenderer } from './main.js';
import { ACHIEVEMENTS, achIcon } from '../data/conquistas.js';

/** Renderiza o grid de conquistas */
export function renderAch() {
  const grid = document.getElementById('achGrid');
  if (!grid) return;

  grid.innerHTML = ACHIEVEMENTS.map(a => {
    const on = Array.isArray(state.achievements) && state.achievements.includes(a.id);

    const shareBtn = on
      ? `<button class="btn btn-share share-ach" data-name="${a.name}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
          Compartilhar
        </button>`
      : '';

    return `<article class="ach ${on ? 'on' : 'off'}">
      <div class="ach-ic">${achIcon(a.icon)}</div>
      <h4>${a.name}</h4>
      <p>${a.desc}</p>
      ${shareBtn}
    </article>`;
  }).join('');

  // Delega clique nos botões de compartilhamento
  grid.querySelectorAll('.share-ach').forEach(btn => {
    btn.addEventListener('click', () => shareAchievement(btn.dataset.name));
  });
}

/** Abre janela de compartilhamento no LinkedIn para uma conquista */
function shareAchievement(name) {
  const text  = `Acabei de desbloquear a conquista "${name}" no Edev! Do iniciante ao avançado.`;
  const url   = encodeURIComponent('https://edev.dev');
  const title = encodeURIComponent(text);
  window.open(
    `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
    '_blank',
    'width=600,height=520,noopener,noreferrer'
  );
}

// Auto-registro
registerRenderer('conquistas', renderAch);
