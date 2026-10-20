/**
 * js/planos.js
 * Renderizador da página 'Meus Planos' na área de membros do Edev.
 * Exibe status do aluno (Fundador / Mensal / Anual / Free) e opções de assinatura.
 */

import { registerRenderer, esc } from './main.js';
import { isFounder, getUserPlan } from './auth.js';

const KIWIFY_MONTHLY = 'https://pay.kiwify.com.br/ksvrvDc';
const KIWIFY_YEARLY  = 'https://pay.kiwify.com.br/U9fA01u';

export function renderPlanosPage() {
  const container = document.getElementById('page-planos');
  if (!container) return;

  const founder = isFounder();
  const plan = getUserPlan();

  let userObj = null;
  try {
    const raw = localStorage.getItem('edev_user');
    userObj = raw ? JSON.parse(raw) : null;
  } catch {
    userObj = null;
  }

  let expiresStr = null;
  if (userObj?.plan_expires_at) {
    try {
      expiresStr = new Date(userObj.plan_expires_at).toLocaleDateString('pt-BR');
    } catch {
      expiresStr = null;
    }
  }

  // ── CASO 1: FUNDADOR VITALÍCIO ──────────────────────────────
  if (founder) {
    container.innerHTML = `
      <div class="planos-header">
        <div class="planos-badge" style="background:rgba(245,158,11,0.15);color:#F59E0B;border-color:rgba(245,158,11,0.35);">
          ⭐ Membro Fundador
        </div>
        <h2 class="section-title" style="font-size:1.8rem;margin-bottom:8px">Acesso Vitalício Gratuito</h2>
        <p class="planos-subtitle">
          Você garantiu uma das 10 primeiras vagas do Edev. Seu acesso é permanente e irrestrito.
        </p>
      </div>

      <div class="panel" style="max-width:760px;margin:0 auto 32px;background:linear-gradient(180deg, var(--card) 0%, rgba(245,158,11,0.06) 100%);border:1px solid rgba(245,158,11,0.4);border-radius:var(--radius-lg);padding:36px;">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;">
          <div style="width:48px;height:48px;border-radius:12px;background:rgba(245,158,11,0.2);color:#F59E0B;display:flex;align-items:center;justify-content:center;font-size:1.5rem;">
            👑
          </div>
          <div>
            <h3 style="font-size:1.35rem;color:var(--text);margin-bottom:2px;">Plano Atual: Fundador</h3>
            <span style="font-size:0.85rem;color:#F59E0B;font-weight:700;">ACESSO VITALÍCIO • 100% GRATUITO</span>
          </div>
        </div>

        <p style="color:var(--text-soft);font-size:0.98rem;line-height:1.65;margin-bottom:24px;">
          Como reconhecimento pelo seu apoio no início da nossa jornada, você tem direito a <strong>todos os módulos</strong> de todos os cursos (Front-end, Python, Java, C++, PHP e SQL), presentes e futuros, sem qualquer custo ou mensalidade.
        </p>

        <ul class="plano-features" style="margin-bottom:28px;">
          <li>✅ <strong>100% das aulas liberadas:</strong> Sem travas nos módulos 1, 2, 3 ou avançados</li>
          <li>✅ <strong>Projetos acumulativos completos:</strong> Código fonte para download em .zip</li>
          <li>✅ <strong>Certificados digitais:</strong> Emissão inclusa ao final de cada trilha</li>
          <li>✅ <strong>Badge especial de Fundador:</strong> Destaque permanente no seu perfil</li>
        </ul>

        <button class="btn btn-primary" style="width:100%;justify-content:center;" type="button" onclick="document.querySelector('[data-page=cursos]').click()">
          Continuar Estudando Agora →
        </button>
      </div>
    `;
    return;
  }

  // ── CASO 2: ASSINANTE MENSAL OU ANUAL ATIVO ─────────────────
  if (plan === 'monthly' || plan === 'yearly') {
    const isYearly = plan === 'yearly';
    container.innerHTML = `
      <div class="planos-header">
        <div class="planos-badge" style="background:var(--blue-subtle);color:var(--blue);border-color:rgba(28,168,227,0.35);">
          ✅ Assinatura Ativa
        </div>
        <h2 class="section-title" style="font-size:1.8rem;margin-bottom:8px">Sua Assinatura Edev</h2>
        <p class="planos-subtitle">
          Todos os cursos e módulos estão totalmente liberados para a sua conta.
        </p>
      </div>

      <div class="panel" style="max-width:760px;margin:0 auto 32px;background:var(--card);border:1px solid var(--blue);border-radius:var(--radius-lg);padding:36px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
          <div>
            <h3 style="font-size:1.35rem;color:var(--text);margin-bottom:4px;">
              Plano ${isYearly ? 'Anual PRO' : 'Mensal PRO'}
            </h3>
            <span style="font-size:0.88rem;color:var(--blue);font-weight:700;">
              ${isYearly ? 'R$ 299,90 / ano' : 'R$ 49,90 / mês'}
            </span>
          </div>
          <div style="background:rgba(34,197,94,0.12);color:var(--green);border:1px solid rgba(34,197,94,0.3);padding:6px 14px;border-radius:var(--radius-full);font-size:0.82rem;font-weight:700;">
            ● Ativo
          </div>
        </div>

        ${expiresStr ? `
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:14px 18px;margin-bottom:24px;font-size:0.92rem;color:var(--text-soft);">
            📅 Próxima data de renovação / vigência: <strong>${expiresStr}</strong>
          </div>
        ` : ''}

        <ul class="plano-features" style="margin-bottom:28px;">
          <li>✅ <strong>Todos os módulos liberados</strong> em todos os 6 cursos</li>
          <li>✅ <strong>Downloads completos de código</strong> dos projetos práticos</li>
          <li>✅ <strong>Emissão instantânea de certificados digitais</strong></li>
        </ul>

        <div style="border-top:1px solid var(--border);padding-top:20px;display:flex;flex-direction:column;gap:14px;">
          <h4 style="font-size:1rem;color:var(--text);font-weight:700;">Gerenciar ou Cancelar Assinatura</h4>
          <p style="font-size:0.88rem;color:var(--muted);line-height:1.5;">
            Os pagamentos e renovações são processados de forma 100% segura pela <strong>Kiwify</strong>. Você pode alterar a forma de pagamento ou cancelar a qualquer momento sem taxas ou multas. Ao cancelar, você continua com acesso liberado até a data de expiração.
          </p>
          <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
            <a href="https://dashboard.kiwify.com.br" target="_blank" rel="noopener noreferrer" class="btn btn-ghost" id="btnCancelSub" style="color:#EF4444;border-color:rgba(239,68,68,0.45);font-weight:700;display:inline-flex;align-items:center;gap:8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              Cancelar assinatura
            </a>
            <a href="contato.html" class="btn btn-ghost" style="color:var(--text-soft);display:inline-flex;">
              Falar com Suporte Edev
            </a>
          </div>
        </div>
      </div>
    `;
    return;
  }

  // ── CASO 3: USUÁRIO NO PLANO GRATUITO (FREEMIUM) ────────────
  container.innerHTML = `
    <div class="planos-header">
      <div class="planos-badge">Plano Atual: Gratuito</div>
      <h2 class="section-title" style="font-size:1.8rem;margin-bottom:8px">Desbloqueie Todos os Módulos</h2>
      <p class="planos-subtitle">
        Você tem acesso livre ao Módulo 0 de todas as linguagens. Faça o upgrade para ter acesso ilimitado a todos os módulos e projetos práticos.
      </p>
    </div>

    <div class="planos-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(310px, 1fr));gap:28px;max-width:960px;margin:0 auto 36px;">

      <!-- Card Mensal -->
      <div class="plano-card" style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:32px;display:flex;flex-direction:column;">
        <div style="font-size:0.85rem;color:var(--muted);text-transform:uppercase;font-weight:700;margin-bottom:6px;">Flexível</div>
        <h3 style="font-size:1.35rem;color:var(--text);margin-bottom:8px;">Assinatura Mensal</h3>
        <div style="font-size:2.2rem;font-weight:800;color:var(--text);margin-bottom:18px;">
          R$ 49,90 <span style="font-size:0.9rem;color:var(--muted);font-weight:500;">/ mês</span>
        </div>
        <p style="font-size:0.92rem;color:var(--muted);margin-bottom:24px;line-height:1.5;">
          Acesso completo a todas as trilhas com liberdade para cancelar quando quiser.
        </p>
        <ul class="plano-features" style="margin-bottom:28px;flex:1;">
          <li>✅ Acesso a todos os módulos de todos os 6 cursos</li>
          <li>✅ Projetos completos para o seu portfólio</li>
          <li>✅ Editor ao vivo e testes interativos</li>
          <li>✅ Certificados inclusos sem taxa extra</li>
          <li>✅ Cancele com 1 clique a qualquer momento</li>
        </ul>
        <button type="button" class="btn btn-ghost" id="btnAssinarMensalArea" style="width:100%;justify-content:center;border-color:var(--blue);color:var(--blue);font-weight:700;">
          Assinar Mensal (R$ 49,90)
        </button>
      </div>

      <!-- Card Anual (Destaque) -->
      <div class="plano-card pro" style="background:linear-gradient(180deg, var(--card) 0%, rgba(28,168,227,0.06) 100%);border:1px solid var(--blue);border-radius:var(--radius-lg);padding:32px;display:flex;flex-direction:column;position:relative;">
        <div style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--blue);color:#0A0A0A;padding:3px 14px;border-radius:var(--radius-full);font-size:0.75rem;font-weight:800;text-transform:uppercase;">
          Economize 50%
        </div>
        <div style="font-size:0.85rem;color:var(--blue);text-transform:uppercase;font-weight:700;margin-bottom:6px;">Melhor Custo-Benefício</div>
        <h3 style="font-size:1.35rem;color:var(--text);margin-bottom:8px;">Assinatura Anual</h3>
        <div style="font-size:2.2rem;font-weight:800;color:var(--text);margin-bottom:18px;">
          R$ 299,90 <span style="font-size:0.9rem;color:var(--muted);font-weight:500;">/ ano (R$ 24,99/mês)</span>
        </div>
        <p style="font-size:0.92rem;color:var(--muted);margin-bottom:24px;line-height:1.5;">
          12 meses de acesso irrestrito para se capacitar e dominar as tecnologias mais pedidas.
        </p>
        <ul class="plano-features" style="margin-bottom:28px;flex:1;">
          <li>⭐ <strong>12 meses de acesso completo</strong> a todas as trilhas</li>
          <li>⭐ Acesso antecipado a novos cursos e projetos</li>
          <li>⭐ Todos os certificados inclusos</li>
        </ul>
        <button type="button" class="btn btn-primary" id="btnAssinarAnualArea" style="width:100%;justify-content:center;font-weight:800;">
          Assinar Anual (R$ 299,90)
        </button>
      </div>

    </div>
  `;

  // Listeners dos botões de assinatura na área de membros
  document.getElementById('btnAssinarMensalArea')?.addEventListener('click', () => {
    window.open(KIWIFY_MONTHLY, '_blank');
  });

  document.getElementById('btnAssinarAnualArea')?.addEventListener('click', () => {
    window.open(KIWIFY_YEARLY, '_blank');
  });
}

// Auto-registro como renderer de 'planos'
registerRenderer('planos', renderPlanosPage);
