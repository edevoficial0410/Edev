/**
 * data/conquistas.js
 * Lista de conquistas e ícones SVG.
 */

export const ACHIEVEMENTS = [
  { id: 'first',   name: 'Primeira aula',    desc: 'Conclua sua primeira aula',                icon: 'star' },
  { id: 'streak3', name: 'Consistente',       desc: 'Mantenha 3 dias de streak',                icon: 'fire' },
  { id: 'xp100',   name: 'Centurião',         desc: 'Acumule 100 XP',                           icon: 'xp'   },
  { id: 'html',    name: 'Fundamentos web',   desc: 'Conclua o módulo HTML',                    icon: 'code' },
  { id: 'pyfund',  name: 'Lógica Python',     desc: 'Conclua o módulo Fundamentos de Python',   icon: 'py'   },
  { id: 'perfect', name: 'Sem atalhos',       desc: 'Acerte uma aula sem abrir a dica',         icon: 'ok'   },
  { id: 'both',    name: 'Duas trilhas',      desc: 'Conclua ao menos uma aula em cada curso',  icon: 'cup'  }
];

/** Retorna o SVG inline do ícone de cada conquista */
export function achIcon(type) {
  const map = {
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    fire: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2s1 3-1 6c2 0 5 2 5 6 0 3.3-2.7 6-6 6s-6-2.7-6-6c0-2 1-3.5 2-4.5C6 12 7 14 9 14c0-4 4-8 4-12z"/></svg>',
    xp:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    py:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3c4 0 7 2 7 6v3H9a3 3 0 000 6h2v2c0 2-2 3-4 3-3 0-5-2-5-5V12c0-4 3-9 10-9z"/><circle cx="9" cy="7" r="1" fill="currentColor"/></svg>',
    ok:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    cup:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M6 4h12v7a6 6 0 01-12 0V4z"/><path d="M12 17v4M8 21h8"/></svg>'
  };
  return map[type] ?? map.star;
}
