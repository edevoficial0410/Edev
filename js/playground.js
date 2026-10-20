/**
 * js/playground.js
 * Editor de código interativo com:
 * - Abas HTML / CSS / JS / Python
 * - Preview em iframe para HTML/CSS/JS
 * - Simulação de Python (regex, sem execução real)
 * - CodeMirror 6 via CDN (fallback para textarea)
 * - Templates prontos, copiar, salvar (localStorage), limpar
 */

// ============================================================
// ESTADO DO PLAYGROUND
// ============================================================

const pg = {
  lang: 'html',
  code: {
    html:   '',
    css:    '',
    js:     '',
    python: ''
  },
  _cm6: null,       // EditorView do CodeMirror 6
  _textarea: false  // true se estiver usando fallback textarea
};

// ── Templates prontos ──────────────────────────────────────

const TEMPLATES = {
  html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Playground Edev</title>
  <style>
    body {
      font-family: "Segoe UI", sans-serif;
      background: #0A0A0A;
      color: #E5E7EB;
      display: grid;
      place-items: center;
      min-height: 100vh;
      margin: 0;
    }
    h1 { color: #1CA8E3; }
  </style>
</head>
<body>
  <h1>Olá, Edev!</h1>
  <p>Edite este código e clique em Executar.</p>
</body>
</html>`,

  css: `/* Estilo Edev */
body {
  background: #0A0A0A;
  color: #E5E7EB;
  font-family: "Segoe UI", sans-serif;
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0;
}

h1 {
  color: #1CA8E3;
  font-size: 2.5rem;
}`,

  js: `// JavaScript no Playground Edev
console.log("Olá, mundo!");

const nome = "Edev";
console.log(\`Bem-vindo ao \${nome}!\`);

// Manipulando o DOM
const h1 = document.createElement("h1");
h1.textContent = "Criado com JS!";
h1.style.color = "#1CA8E3";
document.body.appendChild(h1);`,

  python: `# Python no Playground Edev
print("Olá, mundo!")

nome = "Edev"
print(f"Bem-vindo ao {nome}!")

# Loop simples
for i in range(1, 4):
    print(f"Iteração: {i}")

# Dicionário
aluno = {"nome": "João", "xp": 120}
print(f"Aluno: {aluno['nome']} — XP: {aluno['xp']}")`
};

// Inicia com os templates
Object.assign(pg.code, TEMPLATES);

// ============================================================
// INICIALIZAÇÃO
// ============================================================

export async function initPlayground() {
  loadSavedCode();
  setupTabs();
  setupButtons();
  setupTemplateButtons();
  await renderEditor();
}

// ============================================================
// ABAS DE LINGUAGEM
// ============================================================

function setupTabs() {
  document.querySelectorAll('.pg-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      saveCurrentCode();
      switchTab(tab.dataset.lang);
    });
  });
}

function switchTab(lang) {
  pg.lang = lang;
  document.querySelectorAll('.pg-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.lang === lang)
  );
  // Atualiza label do painel
  const labels = { html: 'HTML', css: 'CSS', js: 'JavaScript', python: 'Python' };
  const lbl = document.getElementById('pgEditorLabel');
  if (lbl) lbl.textContent = labels[lang] || lang;

  updateEditorContent();
}

// ============================================================
// EDITOR
// ============================================================

async function renderEditor() {
  const wrap = document.getElementById('pgEditorWrap');
  if (!wrap) return;

  // Tenta usar CodeMirror 6 (carregado via CDN como script ESM)
  try {
    const CM = window.CM;
    if (CM) {
      await initCM6(wrap, CM);
      return;
    }
  } catch (e) {
    console.warn('[Edev Playground] CodeMirror indisponível, usando textarea:', e);
  }

  // Fallback: textarea simples
  wrap.innerHTML = '';
  const ta = document.createElement('textarea');
  ta.id          = 'pgTextarea';
  ta.spellcheck  = false;
  ta.value       = pg.code[pg.lang];
  ta.style.cssText = 'width:100%;height:100%;min-height:320px;resize:none;border:0;outline:none;padding:14px;background:#0A0A0A;color:#E5E7EB;font-family:Consolas,"Cascadia Code",monospace;font-size:0.88rem;line-height:1.6;';
  ta.addEventListener('input', () => { pg.code[pg.lang] = ta.value; });
  wrap.appendChild(ta);
  pg._textarea = true;
}

async function initCM6(wrap, CM) {
  const { EditorView, basicSetup } = CM.codemirror || CM['codemirror'];
  const { javascript } = CM['@codemirror/lang-javascript'] || {};
  const { html }       = CM['@codemirror/lang-html']       || {};
  const { css }        = CM['@codemirror/lang-css']        || {};
  const { python }     = CM['@codemirror/lang-python']     || {};
  const { oneDark }    = CM['@codemirror/theme-one-dark']  || {};

  const langExt = () => {
    if (pg.lang === 'html'   && html)       return html();
    if (pg.lang === 'css'    && css)        return css();
    if (pg.lang === 'js'     && javascript) return javascript();
    if (pg.lang === 'python' && python)     return python();
    return javascript ? javascript() : [];
  };

  wrap.innerHTML = '';
  const extensions = [basicSetup];
  if (oneDark) extensions.push(oneDark);
  extensions.push(langExt());
  extensions.push(
    EditorView.updateListener.of(update => {
      if (update.docChanged) pg.code[pg.lang] = update.state.doc.toString();
    })
  );

  pg._cm6 = new EditorView({ doc: pg.code[pg.lang], extensions, parent: wrap });
}

function saveCurrentCode() {
  if (pg._textarea) {
    const ta = document.getElementById('pgTextarea');
    if (ta) pg.code[pg.lang] = ta.value;
  } else if (pg._cm6) {
    pg.code[pg.lang] = pg._cm6.state.doc.toString();
  }
}

function updateEditorContent() {
  if (pg._textarea) {
    const ta = document.getElementById('pgTextarea');
    if (ta) ta.value = pg.code[pg.lang];
  } else if (pg._cm6) {
    pg._cm6.dispatch({
      changes: { from: 0, to: pg._cm6.state.doc.length, insert: pg.code[pg.lang] }
    });
  }
}

function getCurrentCode() {
  saveCurrentCode();
  return pg.code[pg.lang];
}

// ============================================================
// EXECUÇÃO
// ============================================================

export function runPlayground() {
  if (pg.lang === 'python') {
    runPython(getCurrentCode());
  } else {
    runWeb();
  }
}

/** Monta HTML+CSS+JS e injeta no iframe */
function runWeb() {
  const iframe  = document.getElementById('pgIframe');
  const pyOut   = document.getElementById('pgOutput');
  if (!iframe) return;

  saveCurrentCode();
  if (pyOut) { pyOut.style.display = 'none'; pyOut.innerHTML = ''; }
  iframe.style.display = 'block';

  const html = pg.code.html;
  const css  = pg.code.css;
  const js   = pg.code.js;

  let doc;
  if (pg.lang === 'html') {
    // Injeta CSS e JS no HTML do usuário
    doc = html
      .replace('</head>', `<style>${css}</style></head>`)
      .replace('</body>', `<script>\n${js}\n<\/script></body>`);
    if (!html.includes('<html')) {
      doc = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
    }
  } else if (pg.lang === 'css') {
    doc = `<!DOCTYPE html><html><head><style>${css}</style></head><body>
      <h1 style="color:#1CA8E3;font-family:sans-serif;padding:20px">Preview CSS</h1>
      <p style="font-family:sans-serif;padding:0 20px;color:#94a3b8">Edite o CSS e clique em Executar.</p>
    </body></html>`;
  } else {
    // JS puro — console.log redireciona para o painel de saída
    doc = `<!DOCTYPE html><html><head>
      <style>
        body { font-family: Consolas,"Cascadia Code",monospace; background:#0A0A0A; color:#7ee787; padding:16px; margin:0; font-size:14px; line-height:1.6; }
        .err { color:#EF4444; }
      </style>
    </head><body><div id="__out"></div>
    <script>
      const __out = document.getElementById('__out');
      const _log  = console.log.bind(console);
      console.log = (...a) => {
        __out.innerHTML += a.map(x => typeof x === 'object' ? JSON.stringify(x, null, 2) : String(x)).join(' ') + '\\n';
        _log(...a);
      };
      try { ${js} } catch(e) { __out.innerHTML += '<span class="err">\\u274c ' + e.message + '</span>\\n'; }
    <\/script></body></html>`;
  }

  iframe.srcdoc = doc;
}

// ============================================================
// SIMULAÇÃO PYTHON (regex — sem execução real)
// ============================================================

function runPython(code) {
  const iframe = document.getElementById('pgIframe');
  const pyOut  = document.getElementById('pgOutput');
  if (!pyOut) return;

  if (iframe) iframe.style.display = 'none';
  pyOut.style.display = 'block';

  const lines  = code.split('\n');
  const vars   = {}; // variáveis definidas
  const output = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    // ── atribuição de string: nome = "valor" ────────────
    const aStr = line.match(/^([a-zA-Z_]\w*)\s*=\s*["'](.+?)["']$/);
    if (aStr) {
      vars[aStr[1]] = aStr[2];
      output.push(`<span class="out-info">Variável '${esc(aStr[1])}' criada com valor '${esc(aStr[2])}'</span>`);
      continue;
    }

    // ── atribuição numérica: nome = 42 ──────────────────
    const aNum = line.match(/^([a-zA-Z_]\w*)\s*=\s*([\d.]+)$/);
    if (aNum) {
      vars[aNum[1]] = aNum[2];
      output.push(`<span class="out-info">Variável '${esc(aNum[1])}' criada com valor ${esc(aNum[2])}</span>`);
      continue;
    }

    // ── input() ─────────────────────────────────────────
    if (line.includes('input(')) {
      output.push(`<span class="out-info">[Simulação] Aguardando entrada do usuário...</span>`);
      continue;
    }

    // ── print(f"...") com f-string ───────────────────────
    const pF = line.match(/^print\(f["'](.+?)["']\)$/);
    if (pF) {
      const msg = pF[1].replace(/\{([a-zA-Z_]\w*)\}/g,
        (_, v) => vars[v] !== undefined ? String(vars[v]) : `{${v}}`);
      output.push(esc(msg));
      continue;
    }

    // ── print("...") literal ─────────────────────────────
    const pS = line.match(/^print\(["'](.+?)["']\)$/);
    if (pS) { output.push(esc(pS[1])); continue; }

    // ── print(var) ───────────────────────────────────────
    const pV = line.match(/^print\(([a-zA-Z_]\w*)\)$/);
    if (pV) {
      const v = vars[pV[1]];
      output.push(v !== undefined
        ? esc(String(v))
        : `<span class="out-error">NameError: '${esc(pV[1])}' não definida</span>`);
      continue;
    }

    // ── for i in range(n) ────────────────────────────────
    const forR = line.match(/^for\s+(\w+)\s+in\s+range\((\d+)\):$/);
    if (forR) {
      const n = Math.min(Number(forR[2]), 10); // limite de exibição
      for (let i = 0; i < n; i++) {
        vars[forR[1]] = String(i);
        output.push(`<span class="out-info">[Loop] ${esc(forR[1])} = ${i}</span>`);
      }
      continue;
    }

    // ── estruturas de controle/definição ─────────────────
    if (/^(while|if|elif|else|def|class)\b/.test(line)) {
      output.push(`<span class="out-info">[Simulação] ${esc(line.split(':')[0].trim())}</span>`);
      continue;
    }

    // ── linha genérica ────────────────────────────────────
    output.push(`<span class="out-info">[Simulação] ${esc(line)}</span>`);
  }

  pyOut.innerHTML = output.length
    ? output.join('\n')
    : '<span class="out-info">Nenhuma saída. Use print() no seu código.</span>';
}

// ============================================================
// BOTÕES DE CONTROLE
// ============================================================

function setupButtons() {
  document.getElementById('pgRun')?.addEventListener('click', runPlayground);

  document.getElementById('pgCopy')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(getCurrentCode());
      flashBtn('pgCopy', 'Copiado!');
    } catch {
      alert('Não foi possível copiar. Use Ctrl+C.');
    }
  });

  document.getElementById('pgSave')?.addEventListener('click', () => {
    saveCurrentCode();
    localStorage.setItem('edev_playground', JSON.stringify(pg.code));
    flashBtn('pgSave', 'Salvo!');
  });

  document.getElementById('pgClear')?.addEventListener('click', () => {
    pg.code[pg.lang] = '';
    updateEditorContent();
    const pyOut  = document.getElementById('pgOutput');
    const iframe = document.getElementById('pgIframe');
    if (pyOut)  { pyOut.innerHTML = ''; pyOut.style.display = 'none'; }
    if (iframe) { iframe.srcdoc = 'about:blank'; iframe.style.display = 'block'; }
  });
}

function setupTemplateButtons() {
  document.querySelectorAll('.pg-tpl').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang || pg.lang;
      pg.code[lang] = TEMPLATES[lang] || '';
      if (lang === pg.lang) updateEditorContent();
    });
  });
}

/** Feedback visual temporário em um botão */
function flashBtn(id, text) {
  const btn  = document.getElementById(id);
  if (!btn) return;
  const span = btn.querySelector('span');
  const orig = span ? span.textContent : btn.textContent;
  if (span) span.textContent = text; else btn.textContent = text;
  setTimeout(() => {
    if (span) span.textContent = orig; else btn.textContent = orig;
  }, 1500);
}

/** Carrega código salvo do localStorage */
function loadSavedCode() {
  try {
    const saved = localStorage.getItem('edev_playground');
    if (saved) Object.assign(pg.code, JSON.parse(saved));
  } catch { /* ignora JSON inválido */ }
}

/** Escapa HTML — necessário aqui para não importar de main.js */
function esc(s) {
  const d = document.createElement('div');
  d.textContent = String(s ?? '');
  return d.innerHTML;
}
