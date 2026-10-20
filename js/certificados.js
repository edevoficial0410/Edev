/**
 * js/certificados.js
 * Renderização de certificados profissionais em formato A4 paisagem,
 * download em PDF (html2pdf.js) com fallback para impressão,
 * integração com API de verificação e compartilhamento (LinkedIn).
 */

import { state, registerRenderer, esc } from './main.js';
import { CERT_DATA } from '../data/certificados.js';
import { COURSES } from '../data/cursos.js';

const API_BASE = (typeof window !== 'undefined' && window.EDEV_API_BASE) || (
  typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3001'
    : ''
);

/**
 * Gera um código temporário de verificação local (fallback no frontend sem salvar no banco)
 * Padrão: EDEV-2026-XXXXX
 */
export function generateVerificationCode(userName, courseId) {
  const storedKey = `edev_cert_code_${courseId}`;
  if (typeof localStorage !== 'undefined') {
    const existing = localStorage.getItem(storedKey);
    if (existing) return existing;
  }

  const uid = (typeof localStorage !== 'undefined' && localStorage.getItem('edev_user_id')) || userName || 'EDEV';
  const ts = Date.now().toString(36).toUpperCase().slice(-3);
  let hash = 0;
  const seed = `${uid}-${courseId}`;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  const h = Math.abs(hash).toString(36).toUpperCase().padStart(2, '0').slice(-2);
  const code = `EDEV-2026-${h}${ts}`;

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(storedKey, code);
    } catch (e) {}
  }
  return code;
}

/**
 * Obtém o código de verificação oficial do certificado via POST /api/certificates
 * Se já existir para o aluno + curso, o backend retorna o existente.
 * Se falhar (offline/erro), aciona fallback para gerar código localmente.
 */
export async function fetchCertificateCode(courseId) {
  try {
    const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('edev_access_token') : null;
    if (token) {
      const res = await fetch(`${API_BASE}/api/certificates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.code) {
          if (typeof localStorage !== 'undefined') {
            try {
              localStorage.setItem(`edev_cert_code_${courseId}`, data.code);
            } catch (e) {}
          }
          return data.code;
        }
      }
    }
  } catch (err) {
    console.warn('[CERT] Falha ao obter código via API, acionando fallback:', err);
  }

  // Fallback: código temporário no frontend
  const studentName = (typeof localStorage !== 'undefined' && localStorage.getItem('edev_name')) || 'Aluno';
  return generateVerificationCode(studentName, courseId);
}

/**
 * Obtém os dados completos e formatados do certificado
 */
export function getCertificateData(id, customCode = null) {
  const course = (COURSES && COURSES[id]) || CERT_DATA.find(item => item.id === id) || { name: id, hours: '30 horas' };
  const name   = (typeof localStorage !== 'undefined' && localStorage.getItem('edev_name')) || 'João Silva';
  const dateFormatted = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  const verificationCode = customCode || generateVerificationCode(name, id);
  const logoUrl = (typeof window !== 'undefined' && window.location)
    ? new URL('img/logo/logo-horizontal.png', window.location.href).href
    : 'img/logo/logo-horizontal.png';

  return { course, name, dateFormatted, verificationCode, logoUrl };
}

/**
 * Formata o nome do arquivo PDF conforme padrão: "certificado-[nome]-[curso].pdf"
 * Ex: "certificado-guilherme-java.pdf"
 */
export function formatPdfFilename(studentName, courseId) {
  const sanitize = (str) =>
    (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const aluno = sanitize(studentName) || 'aluno';
  const curso = sanitize(courseId) || 'curso';
  return `certificado-${aluno}-${curso}.pdf`;
}

/**
 * Retorna os estilos CSS completos para o certificado profissional
 */
function getCertificateStyles() {
  return `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      background: #000000;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #cbd5e1;
    }

    .cert-toolbar {
      margin-bottom: 24px;
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .cert-toolbar button {
      padding: 10px 20px;
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: opacity 0.2s;
    }
    .cert-toolbar button:hover { opacity: 0.9; }
    .btn-download-pdf { background: #1CA8E3; color: #000; }
    .btn-print { background: #262c36; color: #fff; border: 1px solid #475569; }

    /* Container A4 Paisagem (proporção 297mm x 210mm = ~1.414) */
    .cert-container {
      width: 1040px;
      height: 735px;
      background: linear-gradient(135deg, #0A0A0A 0%, #001F3F 100%);
      padding: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-sizing: border-box;
      box-shadow: 0 15px 45px rgba(0, 0, 0, 0.85);
      border-radius: 4px;
    }

    /* Borda decorativa dourada com cantos arredondados e fundo com gradiente sutil */
    .cert-box {
      width: 100%;
      height: 100%;
      position: relative;
      border: 2.5px solid #D4AF37;
      border-radius: 16px;
      background: linear-gradient(145deg, #0A0A0A 0%, #061325 50%, #001F3F 100%);
      box-shadow: 0 0 35px rgba(0, 31, 63, 0.7), inset 0 0 35px rgba(212, 175, 55, 0.08);
      padding: 32px 48px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      box-sizing: border-box;
    }

    /* Linha interna sutil de moldura */
    .cert-inner-frame {
      position: absolute;
      inset: 8px;
      border: 1px solid rgba(212, 175, 55, 0.35);
      border-radius: 10px;
      pointer-events: none;
    }

    /* Cantos decorativos dourados */
    .cert-corner {
      position: absolute;
      width: 42px;
      height: 42px;
      pointer-events: none;
      z-index: 2;
    }
    .corner-tl { top: 12px; left: 12px; }
    .corner-tr { top: 12px; right: 12px; transform: scaleX(-1); }
    .corner-bl { bottom: 12px; left: 12px; transform: scaleY(-1); }
    .corner-br { bottom: 12px; right: 12px; transform: scale(-1, -1); }

    /* 1. Logo */
    .cert-logo-wrap {
      margin-top: 2px;
      margin-bottom: 2px;
    }
    .cert-logo {
      height: 50px;
      width: auto;
      display: block;
      margin: 0 auto;
    }

    /* 2. Título */
    .cert-title {
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #1CA8E3;
      text-transform: uppercase;
      letter-spacing: 4px;
      margin-top: 4px;
      margin-bottom: 2px;
    }

    /* 3. Medalha / Selo */
    .cert-medal-wrap {
      margin: 2px auto;
    }
    .cert-medal-svg {
      display: block;
      margin: 0 auto;
      filter: drop-shadow(0 0 12px rgba(234, 179, 8, 0.5));
    }

    /* 4. Certificamos que */
    .cert-intro {
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      color: #cbd5e1;
      margin-top: 2px;
      margin-bottom: 2px;
    }

    /* 5. Nome do Aluno */
    .cert-student {
      font-family: 'Inter', sans-serif;
      font-size: 36px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.5px;
      line-height: 1.15;
      margin-top: 2px;
    }
    .cert-gold-underline {
      width: 280px;
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, #D4AF37 30%, #EAB308 50%, #D4AF37 70%, transparent 100%);
      margin: 6px auto 8px;
    }

    /* 6. Concluiu com êxito */
    .cert-sub {
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      color: #cbd5e1;
      margin-bottom: 3px;
    }

    /* 7. Nome do Curso */
    .cert-course {
      font-family: 'Inter', sans-serif;
      font-size: 22px;
      font-weight: 700;
      color: #1CA8E3;
      line-height: 1.2;
      margin-bottom: 6px;
    }

    /* 8. Informações */
    .cert-info {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      color: #cbd5e1;
      margin-bottom: 4px;
    }
    .cert-info-dot {
      color: #1CA8E3;
      font-size: 12px;
    }

    /* 9. Assinatura do Fundador */
    .cert-signature-block {
      margin-top: 4px;
      margin-bottom: 2px;
      text-align: center;
    }
    .cert-signature-name {
      font-family: 'Great Vibes', cursive;
      font-size: 36px;
      color: #FFFFFF;
      line-height: 1.1;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.25);
    }
    .cert-signature-line {
      width: 260px;
      height: 1px;
      background: rgba(255, 255, 255, 0.35);
      margin: 4px auto 4px;
    }
    .cert-signature-title {
      font-family: 'Inter', sans-serif;
      font-size: 10px;
      font-weight: 600;
      color: #8A94A0;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    /* 10. Código de Verificação */
    .cert-verification {
      font-family: 'Inter', monospace, sans-serif;
      font-size: 9px;
      color: #525A65;
      letter-spacing: 0.5px;
      margin-top: 4px;
    }

    /* 11. Slogan */
    .cert-slogan {
      font-family: 'Inter', sans-serif;
      font-size: 9px;
      color: #525A65;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 2px;
    }

    @media print {
      .cert-toolbar { display: none !important; }
      body { background: transparent; padding: 0; margin: 0; }
      .cert-container {
        width: 100vw;
        height: 100vh;
        padding: 0;
        background: linear-gradient(135deg, #0A0A0A 0%, #001F3F 100%) !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .cert-box {
        border: 2.5px solid #D4AF37 !important;
        background: linear-gradient(145deg, #0A0A0A 0%, #061325 50%, #001F3F 100%) !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  `;
}

/**
 * Retorna o fragmento HTML interno da medalha de conclusão
 */
function getMedalSvg() {
  return `<svg class="cert-medal-svg" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldRibbonL" x1="18" y1="34" x2="28" y2="58" gradientUnits="userSpaceOnUse">
        <stop stop-color="#1CA8E3"/>
        <stop offset="1" stop-color="#0284C7"/>
      </linearGradient>
      <linearGradient id="goldRibbonR" x1="46" y1="34" x2="36" y2="58" gradientUnits="userSpaceOnUse">
        <stop stop-color="#0284C7"/>
        <stop offset="1" stop-color="#0369A1"/>
      </linearGradient>
      <linearGradient id="goldMedalOuter" x1="16" y1="8" x2="48" y2="40" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FEF08A"/>
        <stop offset="0.4" stop-color="#EAB308"/>
        <stop offset="1" stop-color="#CA8A04"/>
      </linearGradient>
      <linearGradient id="goldMedalInner" x1="20" y1="12" x2="44" y2="36" gradientUnits="userSpaceOnUse">
        <stop stop-color="#CA8A04"/>
        <stop offset="0.6" stop-color="#A16207"/>
        <stop offset="1" stop-color="#854D0E"/>
      </linearGradient>
    </defs>
    <!-- Fitas -->
    <path d="M24 34L15 54L26 50L30 58L29 37" fill="url(#goldRibbonL)"/>
    <path d="M40 34L49 54L38 50L34 58L35 37" fill="url(#goldRibbonR)"/>
    <!-- Medalha -->
    <circle cx="32" cy="24" r="18" fill="url(#goldMedalOuter)" stroke="#FDE047" stroke-width="1.5"/>
    <circle cx="32" cy="24" r="14" fill="url(#goldMedalInner)" stroke="#CA8A04" stroke-width="1"/>
    <circle cx="32" cy="24" r="12" stroke="#FEF08A" stroke-width="0.8" stroke-dasharray="2 1.5" fill="none"/>
    <!-- Estrela central -->
    <path d="M32 17L33.9 21.3L38.5 22L35.2 25.3L36 29.9L32 27.7L28 29.9L28.8 25.3L25.5 22L30.1 21.3L32 17Z" fill="#FFFBEB" stroke="#B45309" stroke-width="0.5"/>
  </svg>`;
}

/**
 * Retorna o fragmento HTML interno dos 4 cantos decorativos
 */
function getCornerOrnamentsHtml() {
  const cornerSvg = `<svg width="42" height="42" viewBox="0 0 42 42" fill="none">
    <path d="M4 38V14C4 8.47715 8.47715 4 14 4H38" stroke="#D4AF37" stroke-width="2"/>
    <path d="M10 38V18C10 13.5817 13.5817 10 18 10H38" stroke="#EAB308" stroke-width="1" stroke-opacity="0.7"/>
    <circle cx="9" cy="9" r="2.5" fill="#D4AF37"/>
  </svg>`;

  return `
    <div class="cert-corner corner-tl">${cornerSvg}</div>
    <div class="cert-corner corner-tr">${cornerSvg}</div>
    <div class="cert-corner corner-bl">${cornerSvg}</div>
    <div class="cert-corner corner-br">${cornerSvg}</div>
  `;
}

/**
 * Retorna a estrutura interna do certificado (div.cert-container e div.cert-box)
 */
export function buildCertificateDomString(id, customCode = null) {
  const { course, name, dateFormatted, verificationCode, logoUrl } = getCertificateData(id, customCode);

  return `
    <div class="cert-container" id="certContainer">
      <div class="cert-box">
        <!-- Cantos decorativos dourados -->
        ${getCornerOrnamentsHtml()}

        <!-- Moldura interna fina -->
        <div class="cert-inner-frame"></div>

        <!-- 1. Logo -->
        <div class="cert-logo-wrap">
          <img src="${logoUrl}" alt="Edev" class="cert-logo">
        </div>

        <!-- 2. Título -->
        <div class="cert-title">CERTIFICADO DE CONCLUSÃO</div>

        <!-- 3. Selo/Medalha -->
        <div class="cert-medal-wrap">
          ${getMedalSvg()}
        </div>

        <!-- 4. Texto intro -->
        <div class="cert-intro">Certificamos que</div>

        <!-- 5. Nome do Aluno -->
        <div class="cert-student">${esc(name)}</div>
        <div class="cert-gold-underline"></div>

        <!-- 6. Texto conclusão -->
        <div class="cert-sub">concluiu com êxito o curso</div>

        <!-- 7. Nome do Curso -->
        <div class="cert-course">${esc(course.name)}</div>

        <!-- 8. Informações -->
        <div class="cert-info">
          <span>⏱️ Carga horária: ${esc(course.hours || '30 horas')}</span>
          <span class="cert-info-dot">•</span>
          <span>📅 Concluído em ${esc(dateFormatted)}</span>
        </div>

        <!-- 9. Assinatura do Fundador -->
        <div class="cert-signature-block">
          <div class="cert-signature-name">Guilherme Santana Nascimento</div>
          <div class="cert-signature-line"></div>
          <div class="cert-signature-title">FUNDADOR DA EDEV</div>
        </div>

        <!-- 10. Código de Verificação -->
        <div class="cert-verification">Código de verificação: ${esc(verificationCode)}</div>

        <!-- 11. Slogan -->
        <div class="cert-slogan">EDEV — DO INICIANTE AO AVANÇADO</div>
      </div>
    </div>
  `;
}

/**
 * Retorna o HTML completo do certificado para exibição ou impressão
 */
export function buildCertificateHtml(id, customCode = null) {
  const { course, name, verificationCode } = getCertificateData(id, customCode);
  const filename = formatPdfFilename(name, id);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Certificado Edev — ${course.name}</title>
  <!-- Google Fonts: Inter e Great Vibes -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <!-- html2pdf.js via CDN no HTML do certificado -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  <style>
    ${getCertificateStyles()}
  </style>
</head>
<body>
  <div class="cert-toolbar">
    <button class="btn-download-pdf" onclick="baixarCertificadoPDF()">📥 Baixar Certificado em PDF</button>
    <button class="btn-print" onclick="window.print()">🖨️ Imprimir Certificado</button>
  </div>

  ${buildCertificateDomString(id, verificationCode)}

  <script>
    async function baixarCertificadoPDF() {
      if (typeof html2pdf === 'undefined') {
        alert('Biblioteca html2pdf não carregada. Acionando janela de impressão.');
        window.print();
        return;
      }
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      const el = document.getElementById('certContainer');
      const opt = {
        margin: [0, 0, 0, 0],
        filename: '${filename}',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: 'avoid-all' }
      };
      html2pdf().set(opt).from(el).save();
    }
  </script>
</body>
</html>`;
}

/**
 * Exibe o botão de fallback "Imprimir Certificado" no card correspondente
 */
export function showFallbackPrint(id) {
  const cards = document.querySelectorAll(`[data-cert-card="${id}"]`);
  cards.forEach(card => {
    const fallbackBtn = card.querySelector(`.btn-fallback-print[data-cert="${id}"]`);
    if (fallbackBtn) {
      fallbackBtn.style.display = 'inline-flex';
    }
  });
}

/**
 * Gera e abre o certificado em uma nova janela para impressão (comportamento atual / fallback)
 */
export async function printCert(id) {
  const certCode = await fetchCertificateCode(id);
  const html = buildCertificateHtml(id, certCode);
  const w = window.open('', '_blank');
  if (!w) {
    alert('Permita pop-ups para imprimir o certificado.');
    return;
  }
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 600);
}

/**
 * Converte o certificado diretamente em PDF e faz o download automático
 */
export async function downloadCertPdf(id, btnElement) {
  // Se o html2pdf.js não estiver disponível (navegador antigo ou sem suporte)
  if (typeof window === 'undefined' || typeof window.html2pdf === 'undefined') {
    console.warn('html2pdf.js não encontrado. Acionando fallback de impressão.');
    showFallbackPrint(id);
    printCert(id);
    return;
  }

  const originalContent = btnElement ? btnElement.innerHTML : '';
  if (btnElement) {
    btnElement.innerHTML = '⏳ Gerando certificado...';
    btnElement.disabled = true;
  }

  // 1. Obtém o código de verificação via POST /api/certificates (com fallback)
  const certCode = await fetchCertificateCode(id);

  const { name } = getCertificateData(id, certCode);
  const filename = formatPdfFilename(name, id);

  // Garante que fontes externas (Great Vibes e Inter) estejam carregadas
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (e) {}
  }

  // Cria container temporário fora do viewport para renderização precisa do PDF
  const stage = document.createElement('div');
  stage.id = 'pdf-cert-stage';
  stage.setAttribute('aria-hidden', 'true');
  stage.style.cssText = 'position:fixed;left:-9999px;top:0;width:1040px;height:735px;z-index:-9999;pointer-events:none;background:#000;';

  const styleTag = document.createElement('style');
  styleTag.textContent = getCertificateStyles();
  stage.appendChild(styleTag);

  const wrapper = document.createElement('div');
  wrapper.innerHTML = buildCertificateDomString(id, certCode);
  stage.appendChild(wrapper);
  document.body.appendChild(stage);

  // Aguarda carregamento do logo se necessário
  const img = stage.querySelector('.cert-logo');
  if (img && !img.complete) {
    await new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve;
      setTimeout(resolve, 1500);
    });
  }

  const certContainerEl = stage.querySelector('.cert-container');

  const opt = {
    margin: [0, 0, 0, 0],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      scrollY: 0,
      windowWidth: 1040
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'landscape'
    },
    pagebreak: { mode: 'avoid-all' }
  };

  try {
    await window.html2pdf().set(opt).from(certContainerEl || stage).save();
  } catch (err) {
    console.error('Falha ao converter certificado em PDF via html2pdf:', err);
    showFallbackPrint(id);
    alert('Ocorreu um erro ao gerar o arquivo PDF. A opção de impressão foi habilitada como alternativa.');
  } finally {
    if (stage.parentNode) {
      stage.parentNode.removeChild(stage);
    }
    if (btnElement) {
      btnElement.innerHTML = originalContent || '📥 Baixar Certificado em PDF';
      btnElement.disabled = false;
    }
  }
}

/** Renderiza o grid de certificados */
export function renderCert() {
  const grid = document.getElementById('certGrid');
  if (!grid) return;

  const certSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="4" y="3" width="16" height="18" rx="2"/>
    <path d="M8 7h8M8 11h8M8 15h4"/>
    <circle cx="18" cy="18" r="3.5"/>
    <path d="M16.8 18l.9.9 1.6-1.6"/>
  </svg>`;

  const dlSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>`;

  const shareSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
    <polyline points="16 6 12 2 8 6"/>
    <line x1="12" y1="2" x2="12" y2="15"/>
  </svg>`;

  const hasSupport = typeof window !== 'undefined' && typeof window.html2pdf !== 'undefined';

  grid.innerHTML = CERT_DATA.map(c => {
    const on = Array.isArray(state.certificates) && state.certificates.includes(c.id);
    return `<article class="cert ${on ? 'on' : 'off'}" data-cert-card="${c.id}">
      <div class="cert-ic">${certSvg}</div>
      <h3>${c.name}</h3>
      <p>${c.desc}</p>
      <div class="hours">Carga horária — ${c.hours}</div>
      <div class="cert-btns">
        ${on ? `
          <button class="btn btn-primary btn-download-pdf" data-cert="${c.id}">
            📥 Baixar Certificado em PDF
          </button>
          <button class="btn btn-ghost btn-fallback-print" data-cert="${c.id}" style="${hasSupport ? 'display: none;' : 'display: inline-flex;'}">
            🖨️ Imprimir Certificado
          </button>
          <button class="btn btn-share share-cert" data-name="${c.name}">${shareSvg} Compartilhar</button>
        ` : `
          <button class="btn btn-ghost" disabled>
            ${dlSvg} Bloqueado
          </button>
        `}
      </div>
    </article>`;
  }).join('');

  // Botões de download em PDF
  grid.querySelectorAll('.btn-download-pdf').forEach(btn => {
    btn.addEventListener('click', () => downloadCertPdf(btn.dataset.cert, btn));
  });

  // Botões de fallback para impressão
  grid.querySelectorAll('.btn-fallback-print').forEach(btn => {
    btn.addEventListener('click', () => printCert(btn.dataset.cert));
  });

  // Botões de compartilhamento
  grid.querySelectorAll('.share-cert').forEach(btn => {
    btn.addEventListener('click', () => shareCertificate(btn.dataset.name));
  });
}

/** Abre janela de compartilhamento no LinkedIn para um certificado */
function shareCertificate(name) {
  const text  = `Acabei de concluir o curso "${name}" no Edev! Do iniciante ao avançado.`;
  const url   = encodeURIComponent('https://edev.dev');
  const title = encodeURIComponent(text);
  window.open(
    `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
    '_blank',
    'width=600,height=520,noopener,noreferrer'
  );
}

// Auto-registro
registerRenderer('certificados', renderCert);
