/**
 * frontend/js/landing.js
 * Lógica da Landing Page do Edev:
 * - Contador dinâmico de vagas de fundador (/api/stats a cada 30s)
 * - Detecção de usuário logado (redirecionamento ou adaptação de botões)
 * - Fluxos de checkout Kiwify e acordeão de FAQ
 */

const KIWIFY_MONTHLY = 'https://pay.kiwify.com.br/ksvrvDc';
const KIWIFY_YEARLY = 'https://pay.kiwify.com.br/U9fA01u';

const API_BASE = window.EDEV_API_BASE || (
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:'
    ? 'http://localhost:3001'
    : ''
);

document.addEventListener('DOMContentLoaded', () => {
  initUserSessionState();
  initPlanosPageState();
  initStatsCounter();
  initFaqAccordion();
  initCheckoutButtons();
});

/**
 * 1. Verifica se o usuário já possui sessão ativa
 */
function initUserSessionState() {
  const token = localStorage.getItem('edev_access_token');
  const isLogged = Boolean(token);

  if (isLogged) {
    // Altera botões de cabeçalho para acesso direto ao app
    const btnLogin = document.getElementById('btnHeaderLogin');
    const btnCta = document.getElementById('btnHeaderCta');

    if (btnLogin) {
      btnLogin.textContent = 'Meu App';
      btnLogin.href = 'app.html';
    }
    if (btnCta) {
      btnCta.textContent = 'Acessar Plataforma';
      btnCta.href = 'app.html';
    }

    // Altera o hero CTA se o usuário já estiver cadastrado
    const btnHeroFree = document.getElementById('btnHeroFree');
    if (btnHeroFree) {
      btnHeroFree.textContent = 'Continuar Estudando →';
      btnHeroFree.href = 'app.html';
    }
  }
}

/**
 * 2. Contador dinâmico de vagas restantes de fundador (/api/stats a cada 30s)
 */
async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE}/api/stats`);
    if (!res.ok) return;
    const stats = await res.json();

    const remaining = typeof stats.foundersRemaining === 'number' ? Math.min(10, Math.max(0, stats.foundersRemaining)) : 0;

    // Atualiza todos os contadores da página
    document.querySelectorAll('.counter-remaining').forEach(el => {
      el.textContent = remaining;
    });

    const founderCard = document.getElementById('planCardFounder');
    const heroBadge = document.getElementById('heroFounderBadge');

    if (remaining <= 0) {
      if (founderCard) {
        founderCard.style.opacity = '0.6';
        const btnFounder = founderCard.querySelector('.btn-plan');
        if (btnFounder) {
          btnFounder.textContent = 'Vagas Esgotadas';
          btnFounder.classList.remove('gold');
          btnFounder.classList.add('outline');
          btnFounder.removeAttribute('href');
          btnFounder.style.cursor = 'not-allowed';
        }
      }
      if (heroBadge) {
        heroBadge.innerHTML = `<span class="pulse-dot" style="background:#EF4444;box-shadow:0 0 10px #EF4444;"></span> Vagas de Fundador Esgotadas`;
        heroBadge.style.color = '#EF4444';
        heroBadge.style.borderColor = 'rgba(239,68,68,0.4)';
      }
    } else {
      if (founderCard) founderCard.style.display = 'flex';
    }
  } catch (err) {
    console.warn('[Landing] Erro ao carregar estatísticas do backend:', err);
  }
}

function initStatsCounter() {
  fetchStats();
  setInterval(fetchStats, 30000); // polling a cada 30s
}

/**
 * 3. Gerenciamento do clique nos botões de planos (Mensal, Anual e Fundador)
 */
function initCheckoutButtons() {
  const isLogged = Boolean(localStorage.getItem('edev_access_token'));

  // Botão Mensal
  const btnMonthly = document.getElementById('btnPlanMonthly');
  if (btnMonthly) {
    btnMonthly.addEventListener('click', (e) => {
      e.preventDefault();
      if (isLogged) {
        // Aluno logado: abre direto o checkout da Kiwify em nova aba
        window.open(KIWIFY_MONTHLY, '_blank');
      } else {
        // Visitante: vai para cadastro com redirect=monthly
        window.location.href = 'register.html?redirect=monthly';
      }
    });
  }

  // Botão Anual
  const btnYearly = document.getElementById('btnPlanYearly');
  if (btnYearly) {
    btnYearly.addEventListener('click', (e) => {
      e.preventDefault();
      if (isLogged) {
        // Aluno logado: abre direto o checkout da Kiwify em nova aba
        window.open(KIWIFY_YEARLY, '_blank');
      } else {
        // Visitante: vai para cadastro com redirect=yearly
        window.location.href = 'register.html?redirect=yearly';
      }
    });
  }
}

/**
 * 4. Acordeão de FAQ (Dúvidas Frequentes)
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros itens
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      // Alterna o item atual
      item.classList.toggle('active', !isActive);
    });
  });
}

/**
 * 5. Gerenciamento do estado da página "Meus Planos" (planos.html)
 */
function initPlanosPageState() {
  const container = document.getElementById('userPlanStatusArea');
  if (!container) return;

  const token = localStorage.getItem('edev_access_token');
  if (!token) return;

  let user = null;
  try {
    const raw = localStorage.getItem('edev_user');
    user = raw ? JSON.parse(raw) : null;
  } catch {
    user = null;
  }

  const isFounder = localStorage.getItem('edev_is_founder') === '1' || user?.is_founder === 1 || user?.plan === 'founder';
  const plan = user?.plan || localStorage.getItem('edev_plan') || 'free';
  const expiresAt = user?.plan_expires_at;

  let expiresStr = null;
  if (expiresAt) {
    try {
      expiresStr = new Date(expiresAt).toLocaleDateString('pt-BR');
    } catch {
      expiresStr = null;
    }
  }

  const founderCard = document.getElementById('planCardFounder');

  if (isFounder) {
    if (founderCard) founderCard.style.display = 'none';

    container.innerHTML = `
      <div style="background: linear-gradient(180deg, #1A1F26 0%, rgba(245,158,11,0.08) 100%); border: 1px solid rgba(245,158,11,0.4); border-radius: 16px; padding: 28px; margin-bottom: 24px;">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; margin-bottom:16px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:2rem;">👑</span>
            <div>
              <span style="background:rgba(245,158,11,0.15); color:#F59E0B; border:1px solid rgba(245,158,11,0.35); padding:3px 10px; border-radius:999px; font-size:0.75rem; font-weight:800; text-transform:uppercase;">
                ⭐ Membro Fundador
              </span>
              <h3 style="font-size:1.35rem; color:#FFFFFF; margin-top:6px;">Seu Plano: Acesso Vitalício Gratuito</h3>
            </div>
          </div>
          <a href="app.html" class="btn-plan gold" style="display:inline-flex; align-items:center; padding:10px 20px; font-size:0.9rem;">
            Acessar Meus Cursos →
          </a>
        </div>
        <p style="color:#D1D5DB; font-size:0.95rem; line-height:1.6; margin:0;">
          Você garantiu uma das 10 primeiras vagas do Edev! Seu acesso a todos os módulos, cursos presentes e futuros, projetos acumulativos e certificados de conclusão é vitalício e 100% gratuito.
        </p>
      </div>
    `;
    return;
  }

  if (plan === 'monthly' || plan === 'yearly') {
    const isYearly = plan === 'yearly';
    if (founderCard) founderCard.style.display = 'none';

    container.innerHTML = `
      <div style="background: #1A1F26; border: 1px solid #1CA8E3; border-radius: 16px; padding: 28px; margin-bottom: 24px;">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; margin-bottom:16px;">
          <div>
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
              <span style="background:rgba(34,197,94,0.12); color:#22C55E; border:1px solid rgba(34,197,94,0.3); padding:4px 12px; border-radius:999px; font-size:0.78rem; font-weight:700;">
                ● Assinatura Ativa
              </span>
              <span style="color:#8A94A0; font-size:0.85rem;">Plano ${isYearly ? 'Anual PRO' : 'Mensal PRO'}</span>
            </div>
            <h3 style="font-size:1.4rem; color:#FFFFFF; margin:0;">
              ${isYearly ? 'R$ 299,90 / ano' : 'R$ 49,90 / mês'}
            </h3>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a href="app.html" class="btn-plan primary" style="display:inline-flex; align-items:center; padding:10px 18px; font-size:0.88rem;">
              Ir para os Cursos →
            </a>
          </div>
        </div>

        ${expiresStr ? `
          <div style="background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px 16px; margin-bottom:20px; font-size:0.9rem; color:#D1D5DB;">
            📅 Próxima data de renovação / vigência: <strong>${expiresStr}</strong>
          </div>
        ` : ''}

        <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;">
          <div>
            <h4 style="font-size:0.95rem; color:#FFFFFF; margin-bottom:4px;">Gerenciamento de Assinatura</h4>
            <p style="font-size:0.82rem; color:#8A94A0; margin:0;">
              Pagamentos seguros via Kiwify. Cancele com 1 clique a qualquer momento sem custos adicionais.
            </p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a href="https://dashboard.kiwify.com.br" target="_blank" rel="noopener noreferrer" class="btn-plan outline" style="color:#EF4444; border-color:rgba(239,68,68,0.5); padding:8px 16px; font-size:0.85rem; font-weight:700;">
              Cancelar assinatura
            </a>
            <a href="contato.html" class="btn-plan outline" style="padding:8px 16px; font-size:0.85rem;">
              Suporte
            </a>
          </div>
        </div>
      </div>
    `;
    return;
  }

  // Plano Free
  container.innerHTML = `
    <div style="background: rgba(28,168,227,0.08); border: 1px solid rgba(28,168,227,0.3); border-radius: 14px; padding: 20px 24px; margin-bottom: 24px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;">
      <div>
        <div style="display:inline-block; background:rgba(28,168,227,0.15); color:#1CA8E3; border:1px solid rgba(28,168,227,0.4); padding:2px 10px; border-radius:999px; font-size:0.75rem; font-weight:800; text-transform:uppercase; margin-bottom:6px;">
          Plano Atual: Grátis (Módulo 0)
        </div>
        <h3 style="font-size:1.15rem; color:#FFFFFF; margin:0 0 4px 0;">Você está no plano grátis</h3>
        <p style="color:#94A3B8; font-size:0.88rem; margin:0;">
          Aproveite o Módulo 0 gratuito em todos os cursos. Faça o upgrade para desbloquear todos os módulos, projetos práticos e certificados.
        </p>
      </div>
      <a href="app.html" class="btn-plan outline" style="padding:10px 16px; font-size:0.88rem;">
        Ir para a Plataforma →
      </a>
    </div>
  `;
}
