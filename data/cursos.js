/**
 * data/cursos.js
 * Dados completos dos cursos, módulos e aulas da plataforma Edev.
 * Helper: L(id, title, theory, example, challenge, projectCode?)
 *         q(desc, options, answer, hint, solution)  — desafio quiz
 *         c(desc, placeholder, answer, hint, solution) — desafio código
 */

// === Ranks e títulos de página ===
export const RANKS = [
  { min: 0,    name: 'Iniciante'    },
  { min: 120,  name: 'Aprendiz'    },
  { min: 400,  name: 'Desenvolvedor' },
  { min: 900,  name: 'Especialista'  },
  { min: 1600, name: 'Mestre'       }
];

export const PAGE_TITLES = {
  dashboard:    'Dashboard',
  cursos:       'Cursos',
  aula:         'Aula',
  playground:   'Playground',
  conquistas:   'Conquistas',
  certificados: 'Certificados',
  perfil:       'Perfil',
  planos:       'Meus Planos'
};

// === Helpers internos ===
function L(id, title, theory, example, challenge, projectCode) {
  return { id, title, xp: 40, theory, example, challenge: challenge || null, projectCode: projectCode || null };
}
function q(desc, options, answer, hint, solution) {
  return { type: 'quiz', desc, options, answer, hint, solution };
}
function c(desc, placeholder, answer, hint, solution) {
  return { type: 'code', desc, placeholder, answer, hint, solution };
}

// ============================================================
// CURSOS E TRILHAS DA PLATAFORMA EDEV
// ============================================================

export const COURSES = {
  frontend: {
    id: "frontend",
    name: "Front-end Completo",
    tag: "HTML + CSS + JavaScript",
    hours: "40 horas",
    desc: "Aprenda a estruturar, estilizar e dar vida ao seu próprio Portfólio Pessoal na web. Um projeto completo e profissional do zero ao deploy!",
    modules: [
      // ── Módulo 0 — Configuração do Ambiente e Ferramentas ──
      {
        title: "Módulo 0 — Configuração do Ambiente e Ferramentas",
        lessons: [
          L('fe-0-0', "Como este curso funciona — Sua jornada e o projeto do Portfólio",
            `<h3>🎨 Bem-vindo à sua jornada no Front-end!</h3>
<p>Puxa uma cadeira e respira fundo. Se você já olhou para um site bonito e pensou "eu nunca vou conseguir construir algo assim", quero te dizer com todas as letras: você consegue sim.</p>

<p>Criar sites não é privilégio de quem entende de matemática avançada. É como montar blocos de montar coloridos: primeiro você cria a estrutura com HTML, depois pinta e dá estilo com CSS, e por fim coloca os botões para reagir com JavaScript.</p>

<h3>🏆 O Seu Projeto: Um Portfólio Pessoal Moderno</h3>
<p>Aqui na Edev você não vai ficar decorando teorias desconexas. Desde os primeiros passos, tudo o que fizermos servirá para erguer o seu <strong>Portfólio Pessoal</strong>: a sua vitrine profissional na internet com seu nome, foto, projetos, filtros e tema claro/escuro.</p>

<p>No rodapé de cada aula prática, você verá o bloco <strong>Estado do Projeto</strong>. Ele é o seu mapa: mostra exatamente como os arquivos do seu site estão crescendo passo a passo.</p>

<p>Esta aula foi só de apresentação — sem tarefa para você resolver. Na próxima, começamos a construir juntos!</p>`,
            "<!-- Bem-vindo ao curso de Front-end da Edev! -->\n<!-- Ao longo das aulas, você construirá seu Portfólio Pessoal completo. -->",
            null,
            "<!-- === PROJETO DO CURSO: Meu Portfólio Pessoal === -->\n<!-- Este bloco vai mostrar seu código evoluindo aula a aula. -->\n<!-- Na próxima aula, começamos a escrever juntos! -->"),

          L('fe-0-1a', "O que é um editor de código e por que usar o VS Code no Portfólio?",
            `<h3>✍️ A máquina de escrever antiga vs A caneta inteligente</h3>
<p>Imagine tentar escrever um romance inteiro em um bloco de notas simples de papel de pão: sem corretor ortográfico, sem numeração de página e sem luz para enxergar no escuro.</p>

<p>Um <strong>editor de código</strong> é o estúdio de alta precisão do desenvolvedor. Ele entende a linguagem que você está digitando, colore as palavras para seus olhos não cansarem, avisa na hora se você esqueceu de fechar uma tag e sugere comandos automaticamente.</p>

<p>O <strong>Visual Studio Code (VS Code)</strong>, criado pela Microsoft, é hoje o editor mais usado no mundo inteiro por empresas como Google, Uber e Spotify. Ele é gratuito, leve e será a nossa casa durante todo o curso.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Por que o VS Code é essencial?</div>
  <div class="command-spotlight-code">Auto-complete + Realce de Sintaxe + Terminal Integrado</div>
  <ul class="command-spotlight-breakdown">
    <li><code>Realce de Sintaxe</code> → Pinta cada comando com cores diferentes para facilitar a leitura.</li>
    <li><code>Auto-complete</code> → Fecha tags automaticamente para você não cometer erros bobos.</li>
  </ul>
</div>

<p>Na próxima aula, vamos baixar e instalar o VS Code juntos no seu computador!</p>`,
            "<!-- No Bloco de Notas Comum: texto chapado sem cores nem ajuda. -->\n<!-- No VS Code: tags coloridas, sugestões automáticas e atalhos rápidos. -->",
            c("Digite o nome oficial da ferramenta de edição de código que utilizaremos em nosso projeto: VS Code", "# Digite o nome aqui", "VS Code", "Escreva VS Code com as letras V e S maiúsculas.", "VS Code"),
            "<!-- === PROJETO: Portfólio Pessoal === -->\n<!-- Ferramenta de trabalho definida: Visual Studio Code -->"),

          L('fe-0-1b', "Instalando o VS Code — Passo a Passo no seu Computador",
            `<h3>📦 O pacote de ferramentas chegando na sua porta</h3>
<p>Quando você compra um conjunto novo de chaves de fenda, a primeira coisa que faz é tirar da caixa e colocar na gaveta de fácil acesso da sua garagem.</p>

<p>Instalar o VS Code é tão simples quanto baixar qualquer aplicativo:</p>
<ul>
  <li>Acesse o site oficial: <strong>code.visualstudio.com</strong></li>
  <li>Clique no botão azul grande de download correspondente ao seu sistema (Windows, Mac ou Linux).</li>
  <li>Abra o instalador baixado e avance. No Windows, recomendamos marcar a caixinha "Adicionar ao menu de contexto do Windows".</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Atalho Universal do VS Code</div>
  <div class="command-spotlight-code">code .</div>
  <ul class="command-spotlight-breakdown">
    <li><code>code .</code> → Abre a pasta atual diretamente dentro do editor pelo terminal.</li>
  </ul>
</div>

<p>Com o programa instalado, na próxima aula vamos criar a pasta oficial do seu Portfólio!</p>`,
            "# No terminal ou prompt, após instalar:\ncode .\n# Este comando abre o VS Code na pasta onde você estiver!",
            c("Digite o atalho de terminal composto pela palavra code seguida de espaço e um ponto, usado para abrir o editor na pasta atual.", "code ...", "code .", "Escreva code seguido de um espaço e um ponto final.", "code ."),
            "<!-- === PROJETO: Portfólio Pessoal === -->\n<!-- Ambiente configurado: VS Code instalado e pronto para uso -->"),

          L('fe-0-1c', "Primeiros passos no VS Code — Abrindo a Pasta do Portfólio",
            `<h3>📁 A mesa limpa antes de começar o trabalho</h3>
<p>Nenhum bom artesão começa a esculpir com a bancada cheia de pratos sujos e papéis espalhados. Ele limpa a mesa e coloca apenas o bloco de madeira daquele projeto específico.</p>

<p>No desenvolvimento web, um site mora dentro de uma <strong>pasta dedicada</strong> no seu computador. Para começar:</p>
<ul>
  <li>Crie uma nova pasta em um local seguro (por exemplo, na sua Área de Trabalho) chamada <code>meu-portfolio</code>.</li>
  <li>Abra o VS Code, vá no menu superior em <strong>File &gt; Open Folder...</strong> (Arquivo &gt; Abrir Pasta).</li>
  <li>Selecione a pasta <code>meu-portfolio</code> e confirme.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Barra Lateral do VS Code (Explorer)</div>
  <div class="command-spotlight-code">Ctrl + Shift + E  (ou Cmd + Shift + E no Mac)</div>
  <ul class="command-spotlight-breakdown">
    <li><code>Explorer</code> → Mostra a árvore de arquivos e pastas do seu projeto aberta na esquerda.</li>
  </ul>
</div>

<p>Agora sua mesa de trabalho está aberta e pronta para receber o primeiro arquivo HTML!</p>`,
            "meu-portfolio/\n  # Pasta raiz criada e aberta no VS Code\n  # Aqui dentro guardaremos todo o código do nosso site!",
            c("Digite o nome da pasta principal que utilizaremos como raiz do nosso projeto: meu-portfolio", "# Digite o nome da pasta", "meu-portfolio", "Escreva meu-portfolio com letras minúsculas e hífen no meio.", "meu-portfolio"),
            "<!-- Pasta do projeto: meu-portfolio/ -->\n<!-- Área de trabalho pronta no VS Code -->"),

          L('fe-0-2a', "O que é um arquivo HTML e como o navegador o lê?",
            `<h3>🧱 As vigas de concreto e tijolos de uma casa</h3>
<p>Quando você passa na frente de uma obra em construção, a primeira coisa que vê são as colunas de concreto, vigas de sustentação e paredes de tijolos. Ainda não tem pintura nem lâmpadas, mas a forma da casa já existe.</p>

<p>O <strong>HTML</strong> (HyperText Markup Language) é exatamente essa estrutura da casa na web. Ele não serve para deixar nada colorido ou interativo; ele serve para dizer: "aqui tem um título", "aqui tem um parágrafo", "aqui tem uma foto".</p>

<p>O navegador (Chrome, Edge, Firefox) é o mestre de obras: ele lê o arquivo de texto com extensão <code>.html</code>, interpreta as <strong>tags</strong> e desenha os elementos na tela do usuário.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Anatomia de uma Tag HTML</div>
  <div class="command-spotlight-code">&lt;p&gt;Meu texto aqui&lt;/p&gt;</div>
  <ul class="command-spotlight-breakdown">
    <li><code>&lt;p&gt;</code> → Tag de abertura (informa que começa um parágrafo).</li>
    <li><code>Meu texto aqui</code> → O conteúdo textual visível.</li>
    <li><code>&lt;/p&gt;</code> → Tag de fechamento (a barra / avisa que o parágrafo terminou).</li>
  </ul>
</div>

<p>Na próxima aula, vamos montar o esqueleto base de um documento HTML entendendo cada pedaço!</p>`,
            "<!-- Exemplo de tag HTML simples -->\n<p>Olá! Este é meu primeiro parágrafo estruturado em HTML.</p>",
            c("Escreva uma tag de parágrafo completa envolvendo a palavra Olá, abrindo com <p> e fechando com </p>.", "<p>...", "<p>Olá</p>", "Digite <p>Olá</p> sem espaços entre as tags e a palavra.", "<p>Olá</p>"),
            "<!-- === PROJETO: Portfólio Pessoal === -->\n<!-- Estrutura básica: aprendendo como as tags funcionam -->"),

          L('fe-0-2b', "Criando o Esqueleto Oficial do Portfólio (index.html)",
            `<h3>🦴 O esqueleto humano: cada osso no seu lugar</h3>
<p>O corpo humano tem uma cabeça (onde ficam os pensamentos e o cérebro) e um tronco/corpo (onde ficam os braços e pernas que o mundo enxerga). Se você colocar a cabeça na barriga, nada funciona.</p>

<p>Um documento HTML segue essa exata anatomia:</p>
<ul>
  <li><code>&lt;!DOCTYPE html&gt;</code>: Avisa ao navegador que estamos usando a versão mais moderna (HTML5).</li>
  <li><code>&lt;html lang="pt-BR"&gt;</code>: A casca que abraça o site inteiro, configurada para português do Brasil.</li>
  <li><code>&lt;head&gt;</code>: A "cabeça" invisível, onde ficam as configurações (título da aba, codificação de acentos UTF-8).</li>
  <li><code>&lt;body&gt;</code>: O "corpo" visível, onde fica tudo o que aparece na janela do site!</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Declaração do Tipo de Documento</div>
  <div class="command-spotlight-code">&lt;!DOCTYPE html&gt;</div>
  <ul class="command-spotlight-breakdown">
    <li><code>&lt;!DOCTYPE html&gt;</code> → A primeiríssima linha obrigatória de qualquer página web moderna.</li>
  </ul>
</div>

<p>Veja no rodapé da aula o primeiro arquivo real do seu projeto nascendo com comentários!</p>`,
            "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Meu Portfólio</title>\n</head>\n<body>\n  <h1>Meu Primeiro Portfólio</h1>\n</body>\n</html>",
            c("Escreva a instrução doctype que inicia todo arquivo HTML5: <!DOCTYPE html>", "<!DOCTYPE ...", "<!DOCTYPE html>", "Escreva <!DOCTYPE html> respeitando o ponto de exclamação no início.", "<!DOCTYPE html>"),
            "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Meu Portfólio — Desenvolvedor</title>\n</head>\n<body>\n  <!-- O conteúdo visível do portfólio entrará aqui -->\n  <h1>Portfólio em Construção</h1>\n</body>\n</html>"),

          L('fe-0-2c', "Abrindo seu HTML no Navegador e Entendendo o Resultado",
            `<h3>👀 O primeiro teste no mundo real</h3>
<p>Você acabou de escrever seu primeiro arquivo <code>index.html</code>. Agora dá aquela vontade de ver como ele ficou na tela do computador, não é?</p>

<p>Você não precisa de internet nem de servidor pago para abrir sua página. Um arquivo HTML é um documento local. Basta abrir a pasta <code>meu-portfolio</code> no explorador do Windows ou Mac e dar dois cliques rápidos sobre o <code>index.html</code>.</p>

<p>Seu navegador padrão (como Google Chrome) vai abrir instantaneamente uma aba exibindo o título que você colocou e o conteúdo do corpo!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Tag de Título da Aba</div>
  <div class="command-spotlight-code">&lt;title&gt;Meu Portfólio — Edev&lt;/title&gt;</div>
  <ul class="command-spotlight-breakdown">
    <li><code>&lt;title&gt;</code> → Define o nome que aparece na orelha da aba do navegador.</li>
  </ul>
</div>

<p>Na próxima aula, vamos aprender a organizar pastas para imagens, folhas de estilo e scripts!</p>`,
            "<!-- Exemplo de como o navegador lê a URL local: -->\n<!-- file:///C:/Users/seu-nome/meu-portfolio/index.html -->\n<!-- O navegador processa o arquivo diretamente do seu computador! -->",
            c("Escreva uma tag de título completa com o texto Portfólio, abrindo com <title> e fechando com </title>.", "<title>...", "<title>Portfólio</title>", "Digite <title>Portfólio</title> com acento na letra o.", "<title>Portfólio</title>"),
            "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Portfólio — Desenvolvedor Front-end</title>\n</head>\n<body>\n  <h1>Portfólio — Desenvolvedor Front-end</h1>\n</body>\n</html>"),

          L('fe-0-3a', "Por que organizar pastas em um projeto web?",
            `<h3>🗄️ A gaveta de meias misturada com talheres</h3>
<p>Se você jogar meias, garfos, documentos fiscais e cabos de celular todos dentro da mesma gaveta, você vai demorar 20 minutos toda vez que quiser almoçar ou calçar um tênis.</p>

<p>Em um site profissional acontece o mesmo: um projeto real tem dezenas de imagens, arquivos de estilo visual e códigos interativos. Se tudo ficar solto na raiz, o projeto vira um caos impossível de manter.</p>

<p>A convenção padrão mundial da web é separar em pastas com nomes padronizados em letras minúsculas:</p>
<ul>
  <li><code>css/</code> → Guarda os arquivos de estilização (cores, fontes, espaçamentos).</li>
  <li><code>js/</code> → Guarda os scripts com a lógica de JavaScript.</li>
  <li><code>img/</code> → Guarda fotos de perfil, ícones e capturas de tela dos seus projetos.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Estrutura de Pastas Profissional</div>
  <div class="command-spotlight-code">meu-portfolio/<br>&nbsp;&nbsp;├── index.html<br>&nbsp;&nbsp;├── css/estilo.css<br>&nbsp;&nbsp;├── js/script.js<br>&nbsp;&nbsp;└── img/perfil.jpg</div>
  <ul class="command-spotlight-breakdown">
    <li><code>index.html</code> → Sempre na raiz do projeto (é o arquivo que os servidores buscam primeiro).</li>
  </ul>
</div>

<p>Vamos criar essa estrutura agora na próxima aula prática!</p>`,
            "meu-portfolio/\n  index.html\n  css/\n    estilo.css\n  js/\n    script.js\n  img/\n    foto.jpg",
            c("Digite o nome da pasta em que guardamos as folhas de estilo visual do nosso projeto: css", "# Digite o nome da pasta", "css", "Escreva css em letras minúsculas.", "css"),
            "<!-- Arquitetura de pastas planejada: -->\n<!-- css/ para estilos visuais -->\n<!-- js/ para interatividade -->\n<!-- img/ para fotos e ícones -->"),

          L('fe-0-3b', "Criando a Arquitetura de Pastas do Portfólio",
            `<h3>🔨 Mãos na massa: erguendo a estrutura de diretórios</h3>
<p>Com a pasta do seu projeto aberta no VS Code, você não precisa sair do editor para criar pastas ou arquivos novos. A barra lateral esquerda (Explorer) tem botões rápidos para isso.</p>

<p>Passe o mouse sobre o nome <code>meu-portfolio</code> na barra lateral e você verá pequenos ícones:</p>
<ul>
  <li>O ícone de folha com sinal de mais: <strong>New File (Novo Arquivo)</strong></li>
  <li>O ícone de pasta com sinal de mais: <strong>New Folder (Nova Pasta)</strong></li>
</ul>

<p>Crie as três pastas essenciais: <code>css</code>, <code>js</code> e <code>img</code>. Depois, dentro da pasta <code>css</code>, crie o arquivo <code>estilo.css</code>; e dentro de <code>js</code>, crie o arquivo <code>script.js</code>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 O Nome Oficial da Folha de Estilo</div>
  <div class="command-spotlight-code">css/estilo.css</div>
  <ul class="command-spotlight-breakdown">
    <li><code>.css</code> → Extensão que indica folha de estilo em cascata (Cascading Style Sheets).</li>
  </ul>
</div>

<p>Na próxima aula, vamos instalar uma ferramenta que recarrega seu site automaticamente a cada alteração!</p>`,
            "# Arquitetura física no seu computador:\nmeu-portfolio/\n├── index.html\n├── css/\n│   └── estilo.css\n├── js/\n│   └── script.js\n└── img/",
            c("Digite o caminho relativo do arquivo de estilo dentro da pasta css: css/estilo.css", "css/...", "css/estilo.css", "Escreva css/estilo.css usando a barra inclinada normal.", "css/estilo.css"),
            "<!-- Estrutura de pastas do Portfólio criada com sucesso -->\n<!-- Pronta para receber conexões de CSS e JS nas próximas etapas -->"),

          L('fe-0-4a', "O que é Live Server e por que ele acelera o Portfólio?",
            `<h3>🪞 O espelho mágico que reflete na hora</h3>
<p>Imagine se vestir para uma festa sem ter um espelho por perto: você coloca uma gravata, anda até a casa do vizinho para ver o reflexo na janela dele, volta, troca o sapato e anda até lá de novo.</p>

<p>Programar sem o <strong>Live Server</strong> é assim: você altera uma linha de código, aperta Ctrl + S, vai até o navegador e precisa apertar F5 para recarregar a página manualmente a cada segundo.</p>

<p>A extensão <strong>Live Server</strong> cria um servidor local no seu computador. Toda vez que você salva o arquivo no VS Code, a página no navegador pisca e se atualiza instantaneamente com o novo visual. É como ter um espelho mágico na sua frente!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 O Botão de Inicialização</div>
  <div class="command-spotlight-code">Go Live  (na barra inferior azul do VS Code)</div>
  <ul class="command-spotlight-breakdown">
    <li><code>Go Live</code> → Inicia o servidor local na porta 5500 (http://127.0.0.1:5500).</li>
  </ul>
</div>

<p>Vamos instalar e ligar essa extensão incrível na próxima aula!</p>`,
            "<!-- Sem Live Server: editar -> salvar -> ir ao Chrome -> apertar F5 -->\n<!-- Com Live Server: editar -> salvar -> Chrome atualiza sozinho no mesmo milissegundo! -->",
            c("Digite o nome da extensão mais popular do VS Code para recarregamento automático no navegador: Live Server", "# Digite o nome da extensão", "Live Server", "Escreva Live Server com L e S maiúsculos.", "Live Server"),
            "<!-- Extensão recomendada do ambiente: Live Server -->"),

          L('fe-0-4b', "Instalando e Ativando o Live Server no Portfólio",
            `<h3>⚡ Ligando a chave geral do servidor local</h3>
<p>Chegou a hora de turbinar seu VS Code com a extensão favorita de todo desenvolvedor front-end.</p>

<p>Siga os passos rápidos:</p>
<ul>
  <li>Pressione <code>Ctrl + Shift + X</code> (ou clique no ícone de quatro bloquinhos na barra lateral).</li>
  <li>No campo de busca, digite <strong>Live Server</strong> (criada por Ritwick Dey).</li>
  <li>Clique no botão azul <strong>Install</strong>.</li>
  <li>Abra seu arquivo <code>index.html</code> e clique com o botão direito em qualquer lugar do texto.</li>
  <li>Escolha a opção: <strong>Open with Live Server</strong>!</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Endereço Local do Servidor</div>
  <div class="command-spotlight-code">http://127.0.0.1:5500/index.html</div>
  <ul class="command-spotlight-breakdown">
    <li><code>127.0.0.1</code> → O endereço universal que aponta para o seu próprio computador (localhost).</li>
  </ul>
</div>

<p>Agora você pode mudar qualquer palavra no código e vê-la mudar no Chrome no mesmo instante!</p>`,
            "<!-- Para ativar o Live Server: -->\n<!-- 1. Clique com botão direito no index.html -->\n<!-- 2. Selecione: Open with Live Server -->\n<!-- 3. Sua página abre no navegador com recarregamento em tempo real! -->",
            c("Digite o atalho de teclado do VS Code que abre o painel de extensões: Ctrl+Shift+X", "Ctrl+...", "Ctrl+Shift+X", "Escreva Ctrl+Shift+X sem espaços entre os sinais de mais.", "Ctrl+Shift+X"),
            "<!-- Servidor local operacional em http://127.0.0.1:5500 -->"),

          L('fe-0-5a', "O que são as DevTools e como abrir no Portfólio?",
            `<h3>🥽 Os óculos de raio-X do desenvolvedor web</h3>
<p>Imagine um médico que pudesse colocar um óculos especial e enxergar os ossos e a circulação sanguínea de um paciente em tempo real, sem precisar de cirurgia. Tudo ficaria muito mais fácil de diagnosticar.</p>

<p>As <strong>DevTools</strong> (Ferramentas do Desenvolvedor) embutidas no seu navegador são esses óculos de raio-X. Elas permitem que você clique em qualquer botão ou texto de qualquer site da internet e veja o código HTML e CSS exato que está desenhando aquilo!</p>

<p>Para abrir as DevTools no Google Chrome ou Edge:</p>
<ul>
  <li>Pressione a tecla <strong>F12</strong> no teclado (ou <code>Ctrl + Shift + I</code>).</li>
  <li>Ou clique com o botão direito em qualquer parte do site e escolha <strong>Inspecionar</strong>.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Tecla Universal das Ferramentas</div>
  <div class="command-spotlight-code">F12  (ou botão direito &gt; Inspecionar)</div>
  <ul class="command-spotlight-breakdown">
    <li><code>Aba Elements</code> → Mostra a árvore viva do HTML e as regras ativas de CSS.</li>
  </ul>
</div>

<p>Na próxima aula, vamos usar as DevTools para ver como nosso Portfólio se comporta na tela de um celular!</p>`,
            "<!-- Abrindo as DevTools no navegador: -->\n<!-- Pressione F12 ou clique com botão direito em qualquer elemento e escolha \"Inspecionar\" -->",
            c("Digite a tecla de atalho do teclado mais conhecida para abrir as DevTools no navegador: F12", "# Digite a tecla", "F12", "Escreva a letra F maiúscula seguida do número 12.", "F12"),
            "<!-- Ferramenta de inspeção pronta: DevTools ativada com F12 -->"),

          L('fe-0-5b', "Inspecionando Elementos e Simulando Celulares nas DevTools",
            `<h3>📱 O camaleão digital: testando no celular sem ter o aparelho na mão</h3>
<p>Mais de 70% das pessoas que visitarem seu Portfólio na internet estarão usando um smartphone na palma da mão. Se o seu site ficar quebrado ou com letras microscópicas na tela pequena, a pessoa fecha a página em 3 segundos.</p>

<p>Com as DevTools abertas, você não precisa pegar seu telefone para testar: basta clicar no ícone de <strong>Toggle Device Toolbar</strong> (um ícone que parece um celular ao lado de um tablet no canto superior esquerdo da barra de ferramentas, ou pressionar <code>Ctrl + Shift + M</code>).</p>

<p>A tela do navegador se transforma instantaneamente no tamanho de um iPhone ou Samsung Galaxy, permitindo testar a rolagem com o dedo e os botões!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Atalho para Simular Dispositivos Móveis</div>
  <div class="command-spotlight-code">Ctrl + Shift + M  (Cmd + Shift + M no Mac)</div>
  <ul class="command-spotlight-breakdown">
    <li><code>Device Toolbar</code> → Alterna entre o modo computador e a simulação de celular/tablet.</li>
  </ul>
</div>

<p>Parabéns! O seu ambiente de desenvolvimento está 100% pronto. No Módulo 1, vamos construir cada seção do HTML do seu Portfólio!</p>`,
            "<!-- Atalhos vitais das DevTools: -->\n<!-- F12: Abre as ferramentas -->\n<!-- Ctrl + Shift + M: Simula a tela de um celular -->",
            c("Digite o atalho para alternar a barra de dispositivos móveis nas DevTools: Ctrl+Shift+M", "Ctrl+...", "Ctrl+Shift+M", "Escreva Ctrl+Shift+M com as iniciais corretas e sem espaços.", "Ctrl+Shift+M"),
            "<!-- === PROJETO DO CURSO: Meu Portfólio Pessoal === -->\n<!-- Módulo 0 Concluído: Ambiente, Ferramentas, Pastas e DevTools 100% Operacionais -->\n<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Meu Portfólio — Desenvolvedor Web</title>\n</head>\n<body>\n  <h1>Meu Portfólio Pessoal</h1>\n  <!-- Na próxima aula começaremos a estrutura das seções! -->\n</body>\n</html>")
        ]
      },

      // ── Módulo 1 — HTML Estrutural do Portfólio Pessoal ──
      {
        title: "Módulo 1 — HTML Estrutural do Portfólio Pessoal",
        lessons: [
          L('fe-1-1', "Criando o Header e a Navegação do Portfólio",
            `<h3>🧭 A bússola no topo do navio</h3>
<p>Quando você sobe no convés de um navio de cruzeiro, a primeira coisa que você procura é a placa com setas indicando: "Restaurantes à esquerda", "Piscina em frente", "Cabines no 3º andar". Sem isso, você se perde pelos corredores.</p>

<p>No desenvolvimento web, essa bússola fica dentro da tag semântica <strong>&lt;header&gt;</strong> (cabeçalho). Dentro dele colocamos o logotipo ou seu nome, e a tag <strong>&lt;nav&gt;</strong> (área de navegação) com links <code>&lt;a&gt;</code> apontando para as seções do site.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Tag de Navegação Semântica</div>
  <div class="command-spotlight-code">&lt;nav&gt;<br>&nbsp;&nbsp;&lt;a href="#projetos"&gt;Projetos&lt;/a&gt;<br>&nbsp;&nbsp;&lt;a href="#contato"&gt;Contato&lt;/a&gt;<br>&lt;/nav&gt;</div>
  <ul class="command-spotlight-breakdown">
    <li><code>&lt;nav&gt;</code> → Avisa ao Google e a leitores de tela para deficientes visuais que aqui estão os links principais.</li>
    <li><code>href="#projetos"</code> → Link âncora que rola a página suavemente até a seção de projetos.</li>
  </ul>
</div>

<p>Esta é a aula de abertura do nosso módulo de HTML estrutural — sem exercícios para resolver. Na próxima aula, vamos erguer a seção Hero de apresentação de impacto!</p>`,
            "<!-- Exemplo de cabeçalho com menu semântico -->\n<header>\n  <div class=\"logo\">MeuPortfólio</div>\n  <nav>\n    <a href=\"#sobre\">Sobre</a>\n    <a href=\"#projetos\">Projetos</a>\n    <a href=\"#contato\">Contato</a>\n  </nav>\n</header>",
            null,
            "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Meu Portfólio — Desenvolvedor Web</title>\n</head>\n<body>\n  <!-- Header e Menu de Navegação -->\n  <header>\n    <div class=\"logo\">Edev.Dev</div>\n    <nav>\n      <a href=\"#sobre\">Sobre</a>\n      <a href=\"#projetos\">Projetos</a>\n      <a href=\"#habilidades\">Habilidades</a>\n      <a href=\"#contato\">Contato</a>\n    </nav>\n  </header>\n</body>\n</html>"),

          L('fe-1-2', "A Seção Hero: Nome, Título de Impacto e Chamada para Ação",
            `<h3>🦸 O outdoor iluminado na entrada da cidade</h3>
<p>Quando você passa por uma rodovia movimentada, um outdoor de 10 metros tem apenas 3 segundos para chamar a sua atenção: ele traz uma foto marcante, uma frase de grande impacto e um botão de ação como "Conheça agora".</p>

<p>No web design, chamamos a primeira tela que o usuário vê de <strong>Seção Hero</strong> (ou banner principal). Ela precisa responder três perguntas em 5 segundos: Quem é você? O que você faz? Como posso entrar em contato?</p>

<p>Para isso, usamos a tag semântica <code>&lt;section&gt;</code>, o título principal da página <code>&lt;h1&gt;</code> e um link estilizado em formato de botão <strong>CTA</strong> (Call To Action):</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Estrutura da Seção Hero</div>
  <div class="command-spotlight-code">&lt;section class="hero"&gt;<br>&nbsp;&nbsp;&lt;h1&gt;Olá, eu sou [Seu Nome]&lt;/h1&gt;<br>&nbsp;&nbsp;&lt;p&gt;Desenvolvedor Front-end focado em experiências web modernas.&lt;/p&gt;<br>&nbsp;&nbsp;&lt;a href="#contato" class="btn"&gt;Fale Comigo&lt;/a&gt;<br>&lt;/section&gt;</div>
  <ul class="command-spotlight-breakdown">
    <li><code>&lt;h1&gt;</code> → O título mais importante da página (só deve existir um por página para SEO).</li>
    <li><code>class="hero"</code> → Um rótulo para podermos estilizar essa seção depois no CSS.</li>
  </ul>
</div>

<p>Na próxima aula, vamos criar a seção Sobre Mim com a sua foto de perfil!</p>`,
            "<!-- Seção Hero completa -->\n<section class=\"hero\">\n  <h1>Olá, sou Lucas Silva</h1>\n  <p>Desenvolvedor Front-end especializado em interfaces limpas.</p>\n  <a href=\"#projetos\" class=\"btn\">Ver Meus Projetos</a>\n</section>",
            c("Escreva uma tag h1 com o texto Olá, sou Desenvolvedor Web, abrindo com <h1> e fechando com </h1>.", "<h1>...", "<h1>Olá, sou Desenvolvedor Web</h1>", "Digite <h1>Olá, sou Desenvolvedor Web</h1> com as maiúsculas e pontuação corretas.", "<h1>Olá, sou Desenvolvedor Web</h1>"),
            "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Meu Portfólio — Desenvolvedor Web</title>\n</head>\n<body>\n  <header>\n    <div class=\"logo\">Edev.Dev</div>\n    <nav>\n      <a href=\"#sobre\">Sobre</a>\n      <a href=\"#projetos\">Projetos</a>\n      <a href=\"#habilidades\">Habilidades</a>\n      <a href=\"#contato\">Contato</a>\n    </nav>\n  </header>\n\n  <!-- Seção Hero de Apresentação -->\n  <section class=\"hero\">\n    <h1>Olá, eu sou Desenvolvedor Front-end</h1>\n    <p>Construo páginas modernas, responsivas e focadas na experiência do usuário.</p>\n    <a href=\"#projetos\" class=\"btn\">Ver Meus Trabalhos</a>\n  </section>\n</body>\n</html>"),

          L('fe-1-3', "Seção Sobre Mim e Foto de Perfil Otimizada",
            `<h3>🖼️ O porta-retrato na recepção da empresa</h3>
<p>Pessoas compram e contratam de outras pessoas. Um recrutador ou cliente quer saber quem está por trás do código: uma foto profissional e simpática gera conexão e confiança imediata.</p>

<p>Para colocar imagens em HTML, usamos a tag <strong>&lt;img&gt;</strong>. Repare que ela é uma tag especial que não precisa de fechamento (ela é auto-fechável). Ela usa dois atributos vitais:</p>
<ul>
  <li><code>src="caminho"</code> (source): Informa onde a foto está guardada (ex: <code>img/perfil.jpg</code>).</li>
  <li><code>alt="descrição"</code> (alternative text): Descreve a foto para pessoas cegas que usam leitores de tela e para quando a imagem não puder carregar.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Tag de Imagem com Acessibilidade</div>
  <div class="command-spotlight-code">&lt;img src="img/perfil.jpg" alt="Foto de perfil de Carlos Souza sorrindo"&gt;</div>
  <ul class="command-spotlight-breakdown">
    <li><code>src</code> → O caminho da foto no computador.</li>
    <li><code>alt</code> → Obrigatório para acessibilidade e bom ranqueamento no Google.</li>
  </ul>
</div>

<p>Na próxima aula, vamos criar o coração do portfólio: a vitrine dos seus projetos!</p>`,
            "<!-- Seção Sobre Mim com imagem -->\n<section id=\"sobre\">\n  <h2>Sobre Mim</h2>\n  <img src=\"img/perfil.jpg\" alt=\"Foto profissional do desenvolvedor\">\n  <p>Sou apaixonado por transformar ideias em produtos digitais rápidos e acessíveis.</p>\n</section>",
            c("Escreva uma tag img com o atributo src=\"img/perfil.jpg\" e o atributo alt=\"Minha foto\".", "<img src=...", "<img src=\"img/perfil.jpg\" alt=\"Minha foto\">", "Digite <img src=\"img/perfil.jpg\" alt=\"Minha foto\"> sem tag de fechamento.", "<img src=\"img/perfil.jpg\" alt=\"Minha foto\">"),
            "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Meu Portfólio — Desenvolvedor Web</title>\n</head>\n<body>\n  <header>\n    <div class=\"logo\">Edev.Dev</div>\n    <nav>\n      <a href=\"#sobre\">Sobre</a>\n      <a href=\"#projetos\">Projetos</a>\n      <a href=\"#habilidades\">Habilidades</a>\n      <a href=\"#contato\">Contato</a>\n    </nav>\n  </header>\n\n  <section class=\"hero\">\n    <h1>Olá, eu sou Desenvolvedor Front-end</h1>\n    <p>Construo páginas modernas, responsivas e focadas na experiência do usuário.</p>\n    <a href=\"#projetos\" class=\"btn\">Ver Meus Trabalhos</a>\n  </section>\n\n  <!-- Seção Sobre Mim -->\n  <section id=\"sobre\">\n    <h2>Sobre Mim</h2>\n    <img src=\"img/perfil.jpg\" alt=\"Foto de perfil do desenvolvedor\">\n    <p>Tenho paixão por tecnologia e foco na criação de interfaces limpas e acessíveis.</p>\n  </section>\n</body>\n</html>"),

          L('fe-1-4', "Grid de Projetos do Portfólio: Estruturando os Cards com Article",
            `<h3>🖼️ Os quadros em uma galeria de arte</h3>
<p>Em uma galeria de arte contemporânea, cada quadro na parede tem sua própria moldura, iluminação dedicada e uma plaquinha com o título da obra e o autor. Um quadro não se confunde com o vizinho.</p>

<p>No HTML semântico, usamos a tag <strong>&lt;article&gt;</strong> para representar cada projeto. Um <code>&lt;article&gt;</code> é uma peça de conteúdo independente: se você recortasse aquele card e colocasse em outro site, ele ainda faria sentido por si só!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 O Card de Projeto com Article</div>
  <div class="command-spotlight-code">&lt;article class="card-projeto"&gt;<br>&nbsp;&nbsp;&lt;h3&gt;Gerenciador de Tarefas&lt;/h3&gt;<br>&nbsp;&nbsp;&lt;p&gt;Aplicação completa em Python com persistência em JSON.&lt;/p&gt;<br>&nbsp;&nbsp;&lt;a href="#"&gt;Ver Projeto&lt;/a&gt;<br>&lt;/article&gt;</div>
  <ul class="command-spotlight-breakdown">
    <li><code>&lt;article&gt;</code> → A moldura independente de cada projeto.</li>
    <li><code>&lt;h3&gt;</code> → O título do projeto (nível hierárquico correto abaixo do h2 da seção).</li>
  </ul>
</div>

<p>Na próxima aula, vamos montar a seção com as suas habilidades técnicas em formato de badges!</p>`,
            "<!-- Card semântico de projeto -->\n<article class=\"card\">\n  <h3>Edev Cursos Online</h3>\n  <p>Plataforma interativa de ensino de tecnologia com gamificação.</p>\n  <a href=\"https://github.com\" target=\"_blank\">Acessar no GitHub</a>\n</article>",
            c("Escreva a abertura e fechamento de um artigo semântico com a classe card: <article class=\"card\"></article>", "<article ...", "<article class=\"card\"></article>", "Digite <article class=\"card\"></article> com aspas na classe.", "<article class=\"card\"></article>"),
            "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Meu Portfólio — Desenvolvedor Web</title>\n</head>\n<body>\n  <header>\n    <div class=\"logo\">Edev.Dev</div>\n    <nav>\n      <a href=\"#sobre\">Sobre</a>\n      <a href=\"#projetos\">Projetos</a>\n      <a href=\"#habilidades\">Habilidades</a>\n      <a href=\"#contato\">Contato</a>\n    </nav>\n  </header>\n\n  <section class=\"hero\">\n    <h1>Olá, eu sou Desenvolvedor Front-end</h1>\n    <p>Construo páginas modernas, responsivas e focadas na experiência do usuário.</p>\n    <a href=\"#projetos\" class=\"btn\">Ver Meus Trabalhos</a>\n  </section>\n\n  <section id=\"sobre\">\n    <h2>Sobre Mim</h2>\n    <img src=\"img/perfil.jpg\" alt=\"Foto de perfil do desenvolvedor\">\n    <p>Tenho paixão por tecnologia e foco na criação de interfaces limpas e acessíveis.</p>\n  </section>\n\n  <!-- Seção de Projetos -->\n  <section id=\"projetos\">\n    <h2>Meus Projetos em Destaque</h2>\n    <div class=\"grid-projetos\">\n      <article class=\"card\">\n        <h3>Gerenciador de Tarefas</h3>\n        <p>App completo no terminal com persistência em arquivos JSON.</p>\n        <a href=\"#\">Ver Código</a>\n      </article>\n      <article class=\"card\">\n        <h3>Portfólio Responsivo</h3>\n        <p>Site pessoal moderno desenvolvido com HTML5, CSS3 e JS puro.</p>\n        <a href=\"#\">Ver Demonstração</a>\n      </article>\n    </div>\n  </section>\n</body>\n</html>"),

          L('fe-1-5', "Lista de Habilidades e Tecnologias com Badges Semânticos",
            `<h3>🎖️ As medalhas na jaqueta do explorador</h3>
<p>Um escoteiro usa insígnias costuradas na manga para mostrar suas especialidades: primeiros socorros, orientação com bússola, sobrevivência na selva. Qualquer um bate o olho e sabe o que ele sabe fazer.</p>

<p>No seu portfólio, os recrutadores buscam as suas <strong>habilidades técnicas</strong> (HTML5, CSS3, JavaScript, Git, Python). A melhor forma semântica de listar esses tópicos é através de uma lista não ordenada com a tag <strong>&lt;ul&gt;</strong> (unordered list) e itens <strong>&lt;li&gt;</strong> (list item).</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Lista Não Ordenada Semântica</div>
  <div class="command-spotlight-code">&lt;ul class="skills-list"&gt;<br>&nbsp;&nbsp;&lt;li&gt;HTML5 Semântico&lt;/li&gt;<br>&nbsp;&nbsp;&lt;li&gt;CSS3 Moderno&lt;/li&gt;<br>&nbsp;&nbsp;&lt;li&gt;JavaScript ES6+&lt;/li&gt;<br>&lt;/ul&gt;</div>
  <ul class="command-spotlight-breakdown">
    <li><code>&lt;ul&gt;</code> → Cria a lista de marcadores.</li>
    <li><code>&lt;li&gt;</code> → Cada competência individual listada.</li>
  </ul>
</div>

<p>Na próxima aula, vamos criar o formulário acessível para as pessoas entrarem em contato!</p>`,
            "<!-- Lista de tecnologias -->\n<ul class=\"skills\">\n  <li>HTML5</li>\n  <li>CSS3</li>\n  <li>JavaScript</li>\n  <li>Git & GitHub</li>\n</ul>",
            c("Crie um item de lista li contendo a palavra HTML5: <li>HTML5</li>", "<li>...", "<li>HTML5</li>", "Escreva <li>HTML5</li> abrindo e fechando a tag li.", "<li>HTML5</li>"),
            "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Meu Portfólio — Desenvolvedor Web</title>\n</head>\n<body>\n  <!-- Header, Hero, Sobre e Projetos anteriores -->\n  <section id=\"habilidades\">\n    <h2>Habilidades e Tecnologias</h2>\n    <ul class=\"skills-list\">\n      <li>HTML5 Semântico</li>\n      <li>CSS3 & Flexbox/Grid</li>\n      <li>JavaScript Moderno</li>\n      <li>Git & Controle de Versão</li>\n    </ul>\n  </section>\n</body>\n</html>"),

          L('fe-1-6', "Criando o Formulário de Contato com Campos Acessíveis",
            `<h3>📬 A caixa postal com envelope timbrado</h3>
<p>Quando você quer enviar uma mensagem oficial para uma empresa, você preenche um formulário com seu nome, seu email de retorno e a mensagem que quer entregar.</p>

<p>Na web, usamos a tag <strong>&lt;form&gt;</strong>. Para torná-lo 100% profissional e acessível a deficientes visuais, NUNCA coloque um campo de texto solto: use sempre a tag <strong>&lt;label&gt;</strong> (etiqueta) conectada ao seu <strong>&lt;input&gt;</strong> através do atributo <code>for</code> e <code>id</code> correspondentes!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Campo de Entrada Acessível com Label</div>
  <div class="command-spotlight-code">&lt;label for="nome"&gt;Seu Nome:&lt;/label&gt;<br>&lt;input type="text" id="nome" name="nome" required&gt;</div>
  <ul class="command-spotlight-breakdown">
    <li><code>for="nome"</code> → Conecta o clique no texto diretamente ao campo de digitação.</li>
    <li><code>required</code> → Impede o envio do formulário se o campo estiver vazio.</li>
  </ul>
</div>

<p>Na próxima aula, vamos fechar o HTML com o rodapé semântico da página!</p>`,
            "<!-- Formulário de contato acessível -->\n<form id=\"form-contato\">\n  <label for=\"email\">Seu Melhor E-mail:</label>\n  <input type=\"email\" id=\"email\" required>\n  \n  <label for=\"msg\">Mensagem:</label>\n  <textarea id=\"msg\" rows=\"4\" required></textarea>\n  \n  <button type=\"submit\">Enviar Mensagem</button>\n</form>",
            c("Escreva um botão de envio de formulário com o tipo submit e o texto Enviar: <button type=\"submit\">Enviar</button>", "<button ...", "<button type=\"submit\">Enviar</button>", "Digite <button type=\"submit\">Enviar</button> com aspas no tipo submit.", "<button type=\"submit\">Enviar</button>"),
            "<!-- Seção de Contato Completa -->\n<section id=\"contato\">\n  <h2>Entre em Contato</h2>\n  <form id=\"form-contato\">\n    <label for=\"nome\">Seu Nome:</label>\n    <input type=\"text\" id=\"nome\" required>\n\n    <label for=\"email\">Seu E-mail:</label>\n    <input type=\"email\" id=\"email\" required>\n\n    <label for=\"mensagem\">Sua Mensagem:</label>\n    <textarea id=\"mensagem\" rows=\"4\" required></textarea>\n\n    <button type=\"submit\">Enviar Mensagem</button>\n  </form>\n</section>"),

          L('fe-1-7', "Rodapé Semântico (Footer) com Redes Sociais e Copyright",
            `<h3>⚓ A assinatura no final de um livro ou contrato</h3>
<p>No finalzinho de um livro impresso, na última página, você encontra as informações da editora, o ano de publicação, o símbolo de copyright e links para contato. Aquela é a assinatura formal da obra.</p>

<p>No HTML usamos a tag semântica <strong>&lt;footer&gt;</strong> (rodapé). Nela colocamos os links para o seu GitHub, LinkedIn e a menção dos direitos autorais usando o código especial <code>&amp;copy;</code> que desenha o símbolo oficial de copyright (©).</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Entidade HTML de Copyright</div>
  <div class="command-spotlight-code">&lt;footer&gt;<br>&nbsp;&nbsp;&lt;p&gt;&amp;copy; 2026 Meu Portfólio. Todos os direitos reservados.&lt;/p&gt;<br>&lt;/footer&gt;</div>
  <ul class="command-spotlight-breakdown">
    <li><code>&amp;copy;</code> → Entidade oficial do HTML que se transforma no símbolo © no navegador.</li>
  </ul>
</div>

<p>Na próxima aula, vamos validar e revisar todo o HTML do seu portfólio para deixá-lo impecável!</p>`,
            "<!-- Exemplo de rodapé semântico -->\n<footer>\n  <div class=\"sociais\">\n    <a href=\"https://github.com\" target=\"_blank\">GitHub</a>\n    <a href=\"https://linkedin.com\" target=\"_blank\">LinkedIn</a>\n  </div>\n  <p>&copy; 2026 Desenvolvido com foco e disciplina.</p>\n</footer>",
            c("Escreva a entidade HTML que gera o símbolo de copyright no navegador: &copy;", "&...", "&copy;", "Digite &copy; iniciando com e-comercial e fechando com ponto e vírgula.", "&copy;"),
            "<!-- Rodapé do Portfólio -->\n<footer>\n  <div class=\"redes-sociais\">\n    <a href=\"#\" target=\"_blank\">GitHub</a>\n    <a href=\"#\" target=\"_blank\">LinkedIn</a>\n  </div>\n  <p>&copy; 2026 Meu Portfólio Pessoal. Todos os direitos reservados.</p>\n</footer>"),

          L('fe-1-8', "Revisão do HTML do Portfólio e Validação W3C",
            `<h3>🔍 O inspetor de qualidade com prancheta em mãos</h3>
<p>Antes de um carro sair da fábrica para as concessionárias, um inspetor passa verificando se todas as portas fecham perfeitamente, se os cintos estão travando e se a fiação está protegida.</p>

<p>Na web, o órgão regulador oficial se chama <strong>W3C (World Wide Web Consortium)</strong>. Eles mantêm uma ferramenta online gratuita chamada <em>W3C Markup Validator</em>, onde você pode colocar o seu HTML para checar se esqueceu de fechar alguma tag ou se colocou atributos no lugar errado.</p>

<p>Veja no rodapé da aula o <strong>Estado do Projeto</strong>: o documento <code>index.html</code> completo com todas as seções semânticas integradas e prontas para receber a magia visual do CSS no Módulo 2!</p>`,
            "<!-- Validador oficial da W3C: validator.w3.org -->\n<!-- Um HTML sem erros garante que seu site abre bem em qualquer navegador do mundo! -->",
            c("Escreva a tag semântica de fechamento do corpo da página: </body>", "</...", "</body>", "Digite </body> com a barra de fechamento e letras minúsculas.", "</body>"),
            "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Meu Portfólio — Desenvolvedor Front-end</title>\n</head>\n<body>\n  <!-- 1. Cabeçalho e Menu -->\n  <header>\n    <div class=\"logo\">Dev.Portfolio</div>\n    <nav>\n      <a href=\"#sobre\">Sobre</a>\n      <a href=\"#projetos\">Projetos</a>\n      <a href=\"#habilidades\">Habilidades</a>\n      <a href=\"#contato\">Contato</a>\n    </nav>\n  </header>\n\n  <!-- 2. Apresentação Principal (Hero) -->\n  <section class=\"hero\">\n    <h1>Olá, eu sou Desenvolvedor Front-end</h1>\n    <p>Construo páginas web acessíveis, velozes e com design moderno.</p>\n    <a href=\"#projetos\" class=\"btn\">Ver Meus Projetos</a>\n  </section>\n\n  <!-- 3. Sobre Mim -->\n  <section id=\"sobre\">\n    <h2>Sobre Mim</h2>\n    <img src=\"img/perfil.jpg\" alt=\"Foto de perfil do desenvolvedor\">\n    <p>Entusiasta de tecnologia com foco em interfaces elegantes e código limpo.</p>\n  </section>\n\n  <!-- 4. Meus Projetos -->\n  <section id=\"projetos\">\n    <h2>Projetos em Destaque</h2>\n    <div class=\"grid-projetos\">\n      <article class=\"card\">\n        <h3>Gerenciador de Tarefas</h3>\n        <p>Aplicação completa com persistência e filtros em terminal.</p>\n        <a href=\"#\">Acessar Projeto</a>\n      </article>\n      <article class=\"card\">\n        <h3>Edev Membros</h3>\n        <p>Interface moderna de micro SaaS com gamificação e aulas interativas.</p>\n        <a href=\"#\">Acessar Projeto</a>\n      </article>\n    </div>\n  </section>\n\n  <!-- 5. Habilidades -->\n  <section id=\"habilidades\">\n    <h2>Tecnologias</h2>\n    <ul class=\"skills-list\">\n      <li>HTML5 Semântico</li>\n      <li>CSS3 Moderno</li>\n      <li>JavaScript ES6+</li>\n      <li>Git & GitHub</li>\n    </ul>\n  </section>\n\n  <!-- 6. Contato -->\n  <section id=\"contato\">\n    <h2>Vamos Conversar?</h2>\n    <form id=\"form-contato\">\n      <label for=\"nome\">Seu Nome:</label>\n      <input type=\"text\" id=\"nome\" required>\n\n      <label for=\"email\">Seu E-mail:</label>\n      <input type=\"email\" id=\"email\" required>\n\n      <label for=\"mensagem\">Mensagem:</label>\n      <textarea id=\"mensagem\" rows=\"4\" required></textarea>\n\n      <button type=\"submit\">Enviar Mensagem</button>\n    </form>\n  </section>\n\n  <!-- 7. Rodapé -->\n  <footer>\n    <div class=\"sociais\">\n      <a href=\"#\">GitHub</a>\n      <a href=\"#\">LinkedIn</a>\n    </div>\n    <p>&copy; 2026 Meu Portfólio Pessoal. Desenvolvido com HTML5.</p>\n  </footer>\n</body>\n</html>")
        ]
      },

      // ── Módulo 2 — CSS Moderno e Design Responsivo do Portfólio ──
      {
        title: "Módulo 2 — CSS Moderno e Design Responsivo do Portfólio",
        lessons: [
          L('fe-2-1', "Conectando o CSS e Definindo Variáveis de Cores (Design System)",
            `<h3>🎨 A paleta de tintas na bancada do pintor</h3>
<p>Um arquiteto de interiores não escolhe tintas aleatórias para cada parede da casa. Ele monta uma paleta oficial: o tom de azul principal, o cinza dos pisos e o branco das sancas de gesso.</p>

<p>O <strong>CSS (Cascading Style Sheets)</strong> é o designer do seu site. Para ligar seu arquivo <code>css/estilo.css</code> ao <code>index.html</code>, usamos a tag <code>&lt;link rel="stylesheet" href="css/estilo.css"&gt;</code> dentro do <code>&lt;head&gt;</code>.</p>

<p>E para criar sua paleta de cores oficial e profissional, usamos as <strong>variáveis CSS</strong> declaradas no seletor especial <code>:root</code>. Toda vez que você quiser mudar a cor do site inteiro, basta alterar em um único lugar!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Variáveis de Cores no CSS</div>
  <div class="command-spotlight-code">:root {<br>&nbsp;&nbsp;--bg-principal: #0d1117;<br>&nbsp;&nbsp;--cor-destaque: #1ca8e3;<br>&nbsp;&nbsp;--texto-claro: #f0f6fc;<br>}</div>
  <ul class="command-spotlight-breakdown">
    <li><code>--nome-da-cor</code> → Variável personalizada reaproveitável em todo o CSS.</li>
    <li><code>var(--cor-destaque)</code> → Aplica a cor armazenada na variável.</li>
  </ul>
</div>

<p>Esta é a aula de abertura do nosso módulo sobre CSS — sem tarefas para resolver. Na próxima aula, vamos aplicar o reset universal de margens e o box-sizing!</p>`,
            "/* Conectando no HTML: <link rel=\"stylesheet\" href=\"css/estilo.css\"> */\n:root {\n  --bg-dark: #0f172a;\n  --primaria: #38bdf8;\n  --texto: #f8fafc;\n}\n\nbody {\n  background-color: var(--bg-dark);\n  color: var(--texto);\n}",
            null,
            "/* css/estilo.css - Arquivo de Estilo do Portfólio */\n:root {\n  --bg-fundo: #0f172a;\n  --bg-card: #1e293b;\n  --cor-primaria: #38bdf8;\n  --texto-principal: #f8fafc;\n  --texto-suave: #94a3b8;\n  --borda: #334155;\n}\n\nbody {\n  background-color: var(--bg-fundo);\n  color: var(--texto-principal);\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n}"),

          L('fe-2-2', "Reset Universal, Box-Sizing e Tipografia Global",
            `<h3>📏 A régua milimétrica que elimina imperfeições</h3>
<p>Cada navegador da internet (Chrome, Safari, Firefox) vem de fábrica com margens e espaçamentos invisíveis que bagunçam seu layout se você não tomar cuidado.</p>

<p>Por isso, todo projeto profissional começa com um <strong>Reset Universal</strong> usando o seletor asterisco (<code>*</code>):</p>
<ul>
  <li><code>margin: 0; padding: 0;</code> → Zera todos os espaçamentos padrão indesejados.</li>
  <li><code>box-sizing: border-box;</code> → Faz com que preenchimentos e bordas fiquem <strong>dentro</strong> da largura definida, sem estourar o layout na tela!</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 O Reset Universal Obrigatório</div>
  <div class="command-spotlight-code">* {<br>&nbsp;&nbsp;margin: 0;<br>&nbsp;&nbsp;padding: 0;<br>&nbsp;&nbsp;box-sizing: border-box;<br>}</div>
  <ul class="command-spotlight-breakdown">
    <li><code>box-sizing: border-box</code> → A propriedade mais importante para manter o tamanho dos cards sob controle.</li>
  </ul>
</div>

<p>Na próxima aula, vamos estilizar o cabeçalho fixo com o efeito moderno de vidro (Glassmorphism)!</p>`,
            "/* Reset básico */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}",
            c("Escreva a propriedade CSS que inclui bordas e paddings no cálculo da largura da caixa: box-sizing: border-box;", "box-sizing: ...", "box-sizing: border-box;", "Digite box-sizing: border-box; terminando com ponto e vírgula.", "box-sizing: border-box;"),
            "/* css/estilo.css - Reset e Variáveis */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n:root {\n  --bg-fundo: #0f172a;\n  --bg-card: #1e293b;\n  --cor-primaria: #38bdf8;\n  --texto-principal: #f8fafc;\n  --texto-suave: #94a3b8;\n  --borda: #334155;\n}\n\nbody {\n  background-color: var(--bg-fundo);\n  color: var(--texto-principal);\n  font-family: 'Segoe UI', system-ui, sans-serif;\n  line-height: 1.6;\n}"),

          L('fe-2-3', "Estilizando o Header Fixo e o Efeito de Vidro (Glassmorphism)",
            `<h3>🪟 A janela de vidro fosco em um dia chuvoso</h3>
<p>Sabe quando você olha pela janela de um restaurante moderno e o vidro é levemente translúcido e desfocado? Você vê o fundo passando suavemente por trás da bancada.</p>

<p>Esse efeito visual elegante se chama <strong>Glassmorphism</strong>. No CSS, conseguimos isso combinando um fundo com transparência (como <code>rgba(15, 23, 42, 0.8)</code>) com o filtro <code>backdrop-filter: blur(12px)</code>.</p>

<p>E para que o menu continue visível no topo enquanto a pessoa rola a página, usamos <code>position: sticky; top: 0;</code>!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Efeito de Vidro Fosco no Header</div>
  <div class="command-spotlight-code">header {<br>&nbsp;&nbsp;position: sticky;<br>&nbsp;&nbsp;top: 0;<br>&nbsp;&nbsp;backdrop-filter: blur(12px);<br>}</div>
  <ul class="command-spotlight-breakdown">
    <li><code>position: sticky</code> → Cola o elemento no topo ao rolar.</li>
    <li><code>backdrop-filter: blur()</code> → Desfoca o que estiver passando por baixo.</li>
  </ul>
</div>

<p>Na próxima aula, vamos estilizar a seção Hero com tipografia imponente e botões com efeito hover!</p>`,
            "/* Header fixo elegante */\nheader {\n  position: sticky;\n  top: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 2rem;\n  background: rgba(15, 23, 42, 0.8);\n  backdrop-filter: blur(10px);\n  z-index: 100;\n}",
            c("Escreva a propriedade CSS que fixa o elemento no topo ao rolar a página: position: sticky;", "position: ...", "position: sticky;", "Digite position: sticky; finalizando com ponto e vírgula.", "position: sticky;"),
            "/* Header com Glassmorphism */\nheader {\n  position: sticky;\n  top: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.2rem 2rem;\n  background: rgba(15, 23, 42, 0.85);\n  backdrop-filter: blur(12px);\n  border-bottom: 1px solid var(--borda);\n  z-index: 1000;\n}\n\nheader nav a {\n  color: var(--texto-suave);\n  text-decoration: none;\n  margin-left: 1.5rem;\n  font-weight: 500;\n  transition: color 0.3s;\n}\n\nheader nav a:hover {\n  color: var(--cor-primaria);\n}"),

          L('fe-2-4', "Estilizando a Seção Hero: Tipografia e Botões Chamativos",
            `<h3>✨ O holofote que destaca a atração principal</h3>
<p>No teatro, quando a estrela da noite entra em cena, todas as luzes da plateia se apagam e um holofote brilhante foca exclusivamente nela. Ela se torna o centro absoluto do ambiente.</p>

<p>Na seção Hero do seu Portfólio, queremos o mesmo destaque: um título <code>&lt;h1&gt;</code> grande e imponente com degradê de cores, e um botão de ação com efeito <code>:hover</code> (quando o mouse passa por cima, o botão sobe suavemente e muda de cor).</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Efeito Hover no Botão de Ação</div>
  <div class="command-spotlight-code">.btn:hover {<br>&nbsp;&nbsp;transform: translateY(-3px);<br>&nbsp;&nbsp;box-shadow: 0 10px 20px rgba(56, 189, 248, 0.3);<br>}</div>
  <ul class="command-spotlight-breakdown">
    <li><code>transform: translateY(-3px)</code> → Faz o botão levitar sutilmente 3 pixels para cima.</li>
    <li><code>box-shadow</code> → Projeta uma sombra iluminada no botão.</li>
  </ul>
</div>

<p>Na próxima aula, vamos montar a grade moderna de cards usando o poder do CSS Grid!</p>`,
            "/* Botão com transição suave */\n.btn {\n  display: inline-block;\n  padding: 0.8rem 1.8rem;\n  background-color: #38bdf8;\n  color: #0f172a;\n  font-weight: bold;\n  border-radius: 8px;\n  text-decoration: none;\n  transition: all 0.3s ease;\n}\n\n.btn:hover {\n  transform: translateY(-3px);\n}",
            c("Escreva a pseudoclasse de passar o mouse sobre o elemento com a classe btn: .btn:hover", ".btn...", ".btn:hover", "Digite .btn:hover com dois pontos antes da palavra hover.", ".btn:hover"),
            "/* Seção Hero e Botões */\n.hero {\n  padding: 6rem 2rem;\n  text-align: center;\n  max-width: 800px;\n  margin: 0 auto;\n}\n\n.hero h1 {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n  color: var(--texto-principal);\n}\n\n.hero p {\n  font-size: 1.2rem;\n  color: var(--texto-suave);\n  margin-bottom: 2rem;\n}\n\n.btn {\n  display: inline-block;\n  padding: 0.85rem 2rem;\n  background-color: var(--cor-primaria);\n  color: var(--bg-fundo);\n  font-weight: 600;\n  border-radius: 8px;\n  text-decoration: none;\n  transition: transform 0.25s, box-shadow 0.25s;\n}\n\n.btn:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 10px 25px rgba(56, 189, 248, 0.35);\n}"),

          L('fe-2-5', "Grid de Cards de Projetos com CSS Grid e Efeito de Elevação",
            `<h3>🧱 O tabuleiro de xadrez com divisões perfeitas</h3>
<p>Em um tabuleiro de xadrez, as casas são perfeitamente alinhadas em colunas e linhas: nenhum peão fica torto ou esbarrando na casa ao lado. O espaço é calculado com precisão matemática.</p>

<p>O <strong>CSS Grid</strong> é a ferramenta mais moderna para criar esse tabuleiro no seu site. Com apenas duas linhas de código, você cria uma grade responsiva que se adapta automaticamente a telas grandes e pequenas:</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Mágica do CSS Grid Auto-fit</div>
  <div class="command-spotlight-code">.grid-projetos {<br>&nbsp;&nbsp;display: grid;<br>&nbsp;&nbsp;grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));<br>&nbsp;&nbsp;gap: 2rem;<br>}</div>
  <ul class="command-spotlight-breakdown">
    <li><code>auto-fit</code> → Calcula sozinho quantas colunas cabem na tela.</li>
    <li><code>minmax(300px, 1fr)</code> → Cada card terá no mínimo 300px e ocupará 1 fração do espaço restante.</li>
    <li><code>gap: 2rem</code> → Espaçamento uniforme entre todos os cards.</li>
  </ul>
</div>

<p>Na próxima aula, vamos estilizar as pílulas de habilidades técnicas usando Flexbox!</p>`,
            "/* Grade com CSS Grid */\n.grade {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}\n\n.card {\n  background: #1e293b;\n  padding: 1.5rem;\n  border-radius: 12px;\n  transition: transform 0.3s;\n}\n\n.card:hover {\n  transform: translateY(-5px);\n}",
            c("Escreva a propriedade CSS que ativa o modelo de layout em grade no elemento: display: grid;", "display: ...", "display: grid;", "Digite display: grid; finalizando com ponto e vírgula.", "display: grid;"),
            "/* Seção de Projetos e Grid */\n#projetos {\n  padding: 4rem 2rem;\n  max-width: 1100px;\n  margin: 0 auto;\n}\n\n.grid-projetos {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 2rem;\n  margin-top: 2rem;\n}\n\n.card {\n  background-color: var(--bg-card);\n  border: 1px solid var(--borda);\n  border-radius: 12px;\n  padding: 2rem;\n  transition: transform 0.3s, border-color 0.3s;\n}\n\n.card:hover {\n  transform: translateY(-6px);\n  border-color: var(--cor-primaria);\n}"),

          L('fe-2-6', "Pílulas de Habilidades com Flexbox (Badges Modernos)",
            `<h3>🍬 As pastilhas coloridas alinhadas na caixa</h3>
<p>Imagine abrir uma caixinha de pastilhas de hortelã: cada pastilha tem formato arredondado, tamanho ajustado ao texto e todas se organizam em fila, pulando suavemente para a linha de baixo quando a caixinha enche.</p>

<p>Para alinhar elementos em uma direção (como linha ou coluna) com flexibilidade total, usamos o <strong>Flexbox</strong> (<code>display: flex</code>). Combinado com <code>flex-wrap: wrap</code>, os badges de tecnologias nunca quebram o layout!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Alinhamento com Flexbox e Wrap</div>
  <div class="command-spotlight-code">.skills-list {<br>&nbsp;&nbsp;display: flex;<br>&nbsp;&nbsp;flex-wrap: wrap;<br>&nbsp;&nbsp;gap: 0.8rem;<br>}</div>
  <ul class="command-spotlight-breakdown">
    <li><code>display: flex</code> → Coloca todos os itens lado a lado em linha.</li>
    <li><code>flex-wrap: wrap</code> → Permite que os badges pulem de linha quando a tela for estreita.</li>
    <li><code>border-radius: 999px</code> → Cria o formato de pílula perfeita.</li>
  </ul>
</div>

<p>Na próxima aula, vamos estilizar os campos do formulário de contato com estados de foco!</p>`,
            "/* Estilizando badges com Flexbox */\n.tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  list-style: none;\n}\n\n.tags li {\n  background: #334155;\n  color: #38bdf8;\n  padding: 6px 16px;\n  border-radius: 999px;\n  font-size: 0.9rem;\n}",
            c("Escreva a propriedade CSS que permite que elementos flexíveis pulem para a próxima linha: flex-wrap: wrap;", "flex-wrap: ...", "flex-wrap: wrap;", "Digite flex-wrap: wrap; com ponto e vírgula no final.", "flex-wrap: wrap;"),
            "/* Seção de Habilidades e Badges */\n#habilidades {\n  padding: 4rem 2rem;\n  max-width: 1100px;\n  margin: 0 auto;\n}\n\n.skills-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.8rem;\n  list-style: none;\n  margin-top: 1.5rem;\n}\n\n.skills-list li {\n  background-color: var(--bg-card);\n  color: var(--cor-primaria);\n  border: 1px solid var(--borda);\n  padding: 0.5rem 1.2rem;\n  border-radius: 999px;\n  font-weight: 500;\n  font-size: 0.95rem;\n}"),

          L('fe-2-7', "Estilizando o Formulário de Contato com Focus e Validação Visual",
            `<h3>💡 A luz de leitura acendendo quando você senta na poltrona</h3>
<p>Quando você senta em uma poltrona de biblioteca, a luminária de leitura acende suavemente sobre o seu livro, mostrando exatamente onde a sua atenção deve estar focada.</p>

<p>Nos formulários da web, quando o usuário clica dentro de uma caixa de digitação, ela entra no estado de <strong>foco</strong> (<code>:focus</code>). Devemos mudar a cor da borda e colocar uma sombra suave para indicar ao usuário onde ele está digitando!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 O Efeito :focus nos Inputs</div>
  <div class="command-spotlight-code">input:focus, textarea:focus {<br>&nbsp;&nbsp;outline: none;<br>&nbsp;&nbsp;border-color: var(--cor-destaque);<br>&nbsp;&nbsp;box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);<br>}</div>
  <ul class="command-spotlight-breakdown">
    <li><code>outline: none</code> → Remove a borda preta padrão e feia do navegador.</li>
    <li><code>border-color</code> → Aplica a cor da sua paleta oficial.</li>
  </ul>
</div>

<p>Na próxima aula, vamos garantir que todo esse visual fique perfeito na tela de celulares com Media Queries!</p>`,
            "/* Input moderno com foco */\ninput, textarea {\n  width: 100%;\n  padding: 0.8rem;\n  background: #1e293b;\n  border: 1px solid #334155;\n  border-radius: 8px;\n  color: #fff;\n  transition: border-color 0.3s;\n}\n\ninput:focus, textarea:focus {\n  outline: none;\n  border-color: #38bdf8;\n}",
            c("Escreva a pseudoclasse de foco aplicada a um campo de input: input:focus", "input:...", "input:focus", "Digite input:focus sem espaços.", "input:focus"),
            "/* Estilos do Formulário */\n#contato {\n  padding: 4rem 2rem;\n  max-width: 600px;\n  margin: 0 auto;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n  gap: 1.2rem;\n  margin-top: 1.5rem;\n}\n\nform label {\n  font-weight: 500;\n  color: var(--texto-suave);\n}\n\nform input, form textarea {\n  width: 100%;\n  padding: 0.9rem;\n  background-color: var(--bg-card);\n  border: 1px solid var(--borda);\n  border-radius: 8px;\n  color: var(--texto-principal);\n  font-family: inherit;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n\nform input:focus, form textarea:focus {\n  outline: none;\n  border-color: var(--cor-primaria);\n  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);\n}"),

          L('fe-2-8', "Media Queries para Celulares: O Portfólio 100% Responsivo",
            `<h3>🚪 A porta pantográfica que se ajusta à passagem</h3>
<p>Pense num portão pantográfico que pode se esticar para cobrir uma garagem larga de 5 metros, ou se encolher para fechar uma portinha estreita de 80 centímetros mantendo toda a sua estrutura firme.</p>

<p>As <strong>Media Queries</strong> (<code>@media</code>) são essa flexibilidade no CSS. Elas dizem ao navegador: "SE a tela tiver menos de 768 pixels de largura (o tamanho de um celular ou tablet), mude estas regras específicas de layout!".</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Sintaxe de Media Query para Mobile</div>
  <div class="command-spotlight-code">@media (max-width: 768px) {<br>&nbsp;&nbsp;.hero h1 { font-size: 2rem; }<br>&nbsp;&nbsp;header { flex-direction: column; gap: 1rem; }<br>}</div>
  <ul class="command-spotlight-breakdown">
    <li><code>max-width: 768px</code> → Aplica as regras apenas em telas de até 768px.</li>
  </ul>
</div>

<p>Na próxima aula, vamos adicionar suporte visual para o tema claro (Light Mode)!</p>`,
            "/* Adaptações para celulares */\n@media (max-width: 768px) {\n  .hero h1 {\n    font-size: 2.2rem;\n  }\n  \n  .grid-projetos {\n    grid-template-columns: 1fr;\n  }\n}",
            c("Escreva a declaração inicial de uma media query para telas de no máximo 768px: @media (max-width: 768px)", "@media ...", "@media (max-width: 768px)", "Digite @media (max-width: 768px) com os parênteses corretos.", "@media (max-width: 768px)"),
            "/* Responsividade Mobile com Media Query */\n@media (max-width: 768px) {\n  header {\n    flex-direction: column;\n    padding: 1rem;\n    gap: 0.8rem;\n  }\n\n  header nav a {\n    margin: 0 0.5rem;\n  }\n\n  .hero h1 {\n    font-size: 2.2rem;\n  }\n\n  .hero p {\n    font-size: 1.05rem;\n  }\n\n  .grid-projetos {\n    grid-template-columns: 1fr;\n  }\n}"),

          L('fe-2-9', "Alternador de Cores: Suporte a Tema Claro (Light Mode)",
            `<h3>🌓 O dia e a noite na mesma janela</h3>
<p>Alguns usuários amam o tema escuro (Dark Mode) porque descansa a vista à noite. Outros preferem ler em fundo branco brilhante à luz do sol da tarde. Um site de alto nível respeita as duas preferências!</p>

<p>Como criamos variáveis no <code>:root</code> na primeira aula do módulo, suportar o tema claro é moleza: basta criar uma classe <code>body.tema-claro</code> que redefine os valores das variáveis de fundo e texto!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Alternância de Variáveis para Tema Claro</div>
  <div class="command-spotlight-code">body.tema-claro {<br>&nbsp;&nbsp;--bg-fundo: #f8fafc;<br>&nbsp;&nbsp;--bg-card: #ffffff;<br>&nbsp;&nbsp;--texto-principal: #0f172a;<br>&nbsp;&nbsp;--texto-suave: #475569;<br>&nbsp;&nbsp;--borda: #e2e8f0;<br>}</div>
  <ul class="command-spotlight-breakdown">
    <li><code>body.tema-claro</code> → Inverte a paleta sem você precisar reescrever nenhum card ou botão!</li>
  </ul>
</div>

<p>No Módulo 3, vamos usar JavaScript para alternar essa classe com um clique no botão!</p>`,
            "/* Suporte a Tema Claro */\nbody.tema-claro {\n  --bg-fundo: #ffffff;\n  --bg-card: #f1f5f9;\n  --texto-principal: #0f172a;\n}",
            c("Escreva o seletor CSS que mira a classe tema-claro aplicada na tag body: body.tema-claro", "body...", "body.tema-claro", "Digite body.tema-claro sem espaços entre a tag e o ponto.", "body.tema-claro"),
            "/* Suporte Completo a Tema Claro */\nbody.tema-claro {\n  --bg-fundo: #f8fafc;\n  --bg-card: #ffffff;\n  --texto-principal: #0f172a;\n  --texto-suave: #475569;\n  --borda: #e2e8f0;\n}\n\nbody {\n  transition: background-color 0.3s, color 0.3s;\n}"),

          L('fe-2-10', "Revisão e Checklist Visual do CSS do Portfólio",
            `<h3>✨ O polimento final da joia lapidada</h3>
<p>Um joalheiro lapida a pedra bruta e, antes de colocar na vitrine da joalheria, passa uma flanela macia para tirar qualquer marca de dedo ou poeira. A joia brilha sob qualquer ângulo de luz.</p>

<p>Nesta aula de fechamento do Módulo 2, nós revisamos o design system inteiro do seu Portfólio: paleta de cores consistente, tipografia legível, grid flexível, formulário acolhedor e responsividade em celulares.</p>

<p>Veja no rodapé da aula o <strong>Estado do Projeto</strong>: o arquivo <code>css/estilo.css</code> completo e consolidado. No Módulo 3, vamos entrar no universo do JavaScript para fazer tudo reagir e criar vida!</p>`,
            "/* Checklist do CSS: */\n/* 1. Reset universal com box-sizing */\n/* 2. Variáveis de cores no :root */\n/* 3. Header fixo com glassmorphism */\n/* 4. Grid de cards responsivo */\n/* 5. Suporte a tema claro e media queries */",
            c("Escreva a propriedade CSS usada no body para fazer a troca de cores acontecer de forma suave em 0.3 segundos: transition: background-color 0.3s;", "transition: ...", "transition: background-color 0.3s;", "Digite transition: background-color 0.3s; com ponto e vírgula.", "transition: background-color 0.3s;"),
            "/* ============================================================\n   ESTILO OFICIAL DO PORTFÓLIO PESSOAL — EDEV\n   css/estilo.css\n   ============================================================ */\n\n/* 1. Reset Universal e Variáveis */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n:root {\n  --bg-fundo: #0f172a;\n  --bg-card: #1e293b;\n  --cor-primaria: #38bdf8;\n  --texto-principal: #f8fafc;\n  --texto-suave: #94a3b8;\n  --borda: #334155;\n}\n\nbody.tema-claro {\n  --bg-fundo: #f8fafc;\n  --bg-card: #ffffff;\n  --texto-principal: #0f172a;\n  --texto-suave: #475569;\n  --borda: #e2e8f0;\n}\n\nbody {\n  background-color: var(--bg-fundo);\n  color: var(--texto-principal);\n  font-family: 'Segoe UI', system-ui, sans-serif;\n  line-height: 1.6;\n  transition: background-color 0.3s, color 0.3s;\n}\n\n/* 2. Header e Menu */\nheader {\n  position: sticky;\n  top: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.2rem 2rem;\n  background: rgba(15, 23, 42, 0.85);\n  backdrop-filter: blur(12px);\n  border-bottom: 1px solid var(--borda);\n  z-index: 1000;\n}\n\nheader .logo {\n  font-weight: 700;\n  font-size: 1.25rem;\n  color: var(--cor-primaria);\n}\n\nheader nav a {\n  color: var(--texto-suave);\n  text-decoration: none;\n  margin-left: 1.5rem;\n  font-weight: 500;\n  transition: color 0.25s;\n}\n\nheader nav a:hover {\n  color: var(--cor-primaria);\n}\n\n/* 3. Hero */\n.hero {\n  padding: 6rem 2rem;\n  text-align: center;\n  max-width: 800px;\n  margin: 0 auto;\n}\n\n.hero h1 {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n}\n\n.hero p {\n  font-size: 1.2rem;\n  color: var(--texto-suave);\n  margin-bottom: 2rem;\n}\n\n.btn {\n  display: inline-block;\n  padding: 0.85rem 2rem;\n  background-color: var(--cor-primaria);\n  color: var(--bg-fundo);\n  font-weight: 600;\n  border-radius: 8px;\n  text-decoration: none;\n  transition: transform 0.25s, box-shadow 0.25s;\n}\n\n.btn:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 10px 25px rgba(56, 189, 248, 0.35);\n}\n\n/* 4. Projetos em Grid */\n#projetos, #sobre, #habilidades, #contato {\n  padding: 4rem 2rem;\n  max-width: 1100px;\n  margin: 0 auto;\n}\n\n.grid-projetos {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 2rem;\n  margin-top: 2rem;\n}\n\n.card {\n  background-color: var(--bg-card);\n  border: 1px solid var(--borda);\n  border-radius: 12px;\n  padding: 2rem;\n  transition: transform 0.3s, border-color 0.3s;\n}\n\n.card:hover {\n  transform: translateY(-6px);\n  border-color: var(--cor-primaria);\n}\n\n/* 5. Habilidades com Flexbox */\n.skills-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.8rem;\n  list-style: none;\n  margin-top: 1.5rem;\n}\n\n.skills-list li {\n  background-color: var(--bg-card);\n  color: var(--cor-primaria);\n  border: 1px solid var(--borda);\n  padding: 0.5rem 1.2rem;\n  border-radius: 999px;\n  font-weight: 500;\n}\n\n/* 6. Formulário */\nform {\n  display: flex;\n  flex-direction: column;\n  gap: 1.2rem;\n  margin-top: 1.5rem;\n  max-width: 600px;\n}\n\nform input, form textarea {\n  width: 100%;\n  padding: 0.9rem;\n  background-color: var(--bg-card);\n  border: 1px solid var(--borda);\n  border-radius: 8px;\n  color: var(--texto-principal);\n  font-family: inherit;\n}\n\nform input:focus, form textarea:focus {\n  outline: none;\n  border-color: var(--cor-primaria);\n  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);\n}\n\n/* 7. Responsividade */\n@media (max-width: 768px) {\n  header {\n    flex-direction: column;\n    padding: 1rem;\n    gap: 0.8rem;\n  }\n  .hero h1 {\n    font-size: 2.2rem;\n  }\n  .grid-projetos {\n    grid-template-columns: 1fr;\n  }\n}")
        ]
      },

      // ── Módulo 3 — JavaScript — Interatividade Real do Portfólio ──
      {
        title: "Módulo 3 — JavaScript — Interatividade Real do Portfólio",
        lessons: [
          L('fe-3-1', "Conectando o JavaScript com Defer e Testando o Console",
            `<h3>🧠 O cérebro que dá vida ao corpo inanimado</h3>
<p>Até agora, seu Portfólio tem um esqueleto firme (HTML) e uma roupa impecável e elegante (CSS). Mas se você clicar no botão de trocar tema ou tentar filtrar projetos, nada acontece. É como um robô desligado da tomada.</p>

<p>O <strong>JavaScript (JS)</strong> é a eletricidade e o sistema nervoso do navegador. Ele permite que o site responda a cliques, valide textos digitados, busque dados e faça animações inteligentes.</p>

<p>Para ligar o arquivo <code>js/script.js</code> no seu <code>index.html</code>, usamos a tag <code>&lt;script src="js/script.js" defer&gt;&lt;/script&gt;</code> dentro do <code>&lt;head&gt;</code>. A palavra mágica <strong>defer</strong> garante que o navegador só executará o código depois que todo o visual da página já estiver carregado!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Conexão com o script.js</div>
  <div class="command-spotlight-code">&lt;script src="js/script.js" defer&gt;&lt;/script&gt;</div>
  <ul class="command-spotlight-breakdown">
    <li><code>defer</code> → Faz o script esperar o HTML ser lido completamente, evitando erros de elementos não encontrados.</li>
    <li><code>console.log("Olá")</code> → Envia mensagens para a aba Console das DevTools.</li>
  </ul>
</div>

<p>Esta é a aula de abertura do nosso módulo de JavaScript — sem exercícios para resolver. Na próxima aula, vamos criar o banco de dados em memória dos seus projetos!</p>`,
            "// js/script.js — Primeiro teste de conexão\nconsole.log(\"JavaScript conectado com sucesso ao Portfólio!\");",
            null,
            "// js/script.js - Arquivo de Lógica do Portfólio\nconsole.log(\"Sistema interativo do Portfólio inicializado com sucesso.\");"),

          L('fe-3-2', "Array de Objetos: Estruturando o Banco de Dados de Projetos",
            `<h3>🗃️ O álbum de fotografias com fichas técnicas</h3>
<p>Imagine um fotógrafo profissional que guarda suas fotos em um álbum: cada foto tem uma ficha com o título do ensaio, a data em que foi tirada e a categoria (casamento, natureza, retrato).</p>

<p>No JavaScript, usamos uma <strong>lista de objetos (Array de Objetos)</strong> para guardar todos os dados dos nossos projetos. Cada projeto tem seu <code>id</code>, <code>titulo</code>, <code>categoria</code>, <code>descricao</code> e <code>link</code>:</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Criando a Coleção de Projetos</div>
  <div class="command-spotlight-code">const projetos = [<br>&nbsp;&nbsp;{ id: 1, titulo: "Gerenciador", categoria: "python" },<br>&nbsp;&nbsp;{ id: 2, titulo: "Portfólio", categoria: "frontend" }<br>];</div>
  <ul class="command-spotlight-breakdown">
    <li><code>const</code> → Declara uma variável cujo valor base não será reatribuído.</li>
    <li><code>[ ]</code> → Array que guarda a coleção inteira.</li>
  </ul>
</div>

<p>Na próxima aula, vamos fazer o JavaScript desenhar esses cards no HTML automaticamente com uma única linha de código!</p>`,
            "// Banco de projetos do portfólio\nconst listaProjetos = [\n  {\n    titulo: \"Gerenciador de Tarefas\",\n    categoria: \"python\",\n    desc: \"App completo de produtividade em terminal.\"\n  }\n];\n\nconsole.log(listaProjetos);",
            c("Declare uma constante chamada projetos recebendo um array vazio usando colchetes: const projetos = [];", "const ...", "const projetos = [];", "Digite const projetos = []; finalizando com ponto e vírgula.", "const projetos = [];"),
            "// js/script.js - Banco de Dados de Projetos\nconst projetos = [\n  {\n    id: 1,\n    titulo: \"Gerenciador de Tarefas\",\n    categoria: \"python\",\n    descricao: \"Aplicação de console com persistência de dados em arquivos JSON.\",\n    link: \"#\"\n  },\n  {\n    id: 2,\n    titulo: \"Portfólio Moderno\",\n    categoria: \"frontend\",\n    descricao: \"Página pessoal responsiva com tema escuro e filtros interativos.\",\n    link: \"#\"\n  },\n  {\n    id: 3,\n    titulo: \"API de E-commerce\",\n    categoria: \"backend\",\n    descricao: \"Serviço de autenticação e pedidos com arquitetura REST.\",\n    link: \"#\"\n  }\n];"),

          L('fe-3-3', "Renderizando Cards no DOM com Template Literals e forEach",
            `<h3>🖨️ A gráfica rápida imprimindo panfletos em lote</h3>
<p>Em vez de um funcionário desenhar 500 panfletos à mão um por um, a impressora recebe o modelo digital e imprime centenas de cópias idênticas em segundos, mudando apenas os dados do cliente.</p>

<p>Com o método <strong>forEach()</strong> e os <strong>Template Literals</strong> (crases <code>\` \`</code>), o JavaScript percorre o nosso array de projetos e gera o HTML de cada card dinamicamente no container da página usando <code>innerHTML</code>!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Gerando HTML Dinâmico com Crases</div>
  <div class="command-spotlight-code">container.innerHTML = projetos.map(p =&gt; \`<br>&nbsp;&nbsp;&lt;article class="card"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;h3&gt;\${p.titulo}&lt;/h3&gt;<br>&nbsp;&nbsp;&lt;/article&gt;\`).join('');</div>
  <ul class="command-spotlight-breakdown">
    <li><code>\${p.titulo}</code> → Interpola a propriedade do objeto diretamente dentro do HTML.</li>
    <li><code>container.innerHTML</code> → Injeta o código gerado dentro do elemento do site.</li>
  </ul>
</div>

<p>Na próxima aula, vamos criar botões de filtro para mostrar projetos por categoria com um clique!</p>`,
            "// Inserindo cards na página\nconst grid = document.querySelector('.grid-projetos');\n\nfunction renderizar(lista) {\n  grid.innerHTML = lista.map(item => `\n    <article class=\"card\">\n      <h3>${item.titulo}</h3>\n      <p>${item.desc}</p>\n    </article>\n  `).join('');\n}",
            c("Escreva a instrução que seleciona um elemento do HTML pela classe grid-projetos usando document.querySelector: document.querySelector(\".grid-projetos\")", "document...", "document.querySelector(\".grid-projetos\")", "Digite document.querySelector(\".grid-projetos\") com aspas e ponto na classe.", "document.querySelector(\".grid-projetos\")"),
            "// js/script.js - Renderização Dinâmica\nconst containerProjetos = document.querySelector('.grid-projetos');\n\nfunction renderizarProjetos(lista) {\n  if (!containerProjetos) return;\n  containerProjetos.innerHTML = lista.map(p => `\n    <article class=\"card\" data-categoria=\"${p.categoria}\">\n      <h3>${p.titulo}</h3>\n      <p>${p.descricao}</p>\n      <a href=\"${p.link}\" class=\"btn-card\">Acessar Projeto</a>\n    </article>\n  `).join('');\n}\n\n// Chamada inicial\nrenderizarProjetos(projetos);"),

          L('fe-3-4', "Sistema de Filtro Interativo de Projetos por Categoria",
            `<h3>🗂️ As abas separadoras na pasta de arquivos</h3>
<p>Quando você abre uma pasta sanfonada de documentos, você puxa a aba "Contas Pagas" para ver só os recibos, ou a aba "Contratos" para ver os acordos assinados. Tudo continua lá dentro, mas você foca apenas no que escolheu.</p>

<p>Para criar esse filtro, usamos o método <strong>filter()</strong> do JavaScript. Quando o usuário clica em um botão (escutado com <code>addEventListener('click')</code>), filtramos o array e chamamos nossa função de renderização novamente!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Filtrando Itens por Categoria</div>
  <div class="command-spotlight-code">const filtrados = categoria === 'todos'<br>&nbsp;&nbsp;? projetos<br>&nbsp;&nbsp;: projetos.filter(p =&gt; p.categoria === categoria);</div>
  <ul class="command-spotlight-breakdown">
    <li><code>.filter(...)</code> → Cria um novo array contendo apenas os projetos que atendem à condição.</li>
  </ul>
</div>

<p>Na próxima aula, vamos criar o alternador de Dark/Light mode com salvamento no LocalStorage!</p>`,
            "// Filtro simples\nconst botoes = document.querySelectorAll('.filtro-btn');\n\nbotoes.forEach(btn => {\n  btn.addEventListener('click', () => {\n    const cat = btn.dataset.categoria;\n    const res = cat === 'todos' ? projetos : projetos.filter(p => p.categoria === cat);\n    renderizarProjetos(res);\n  });\n});",
            c("Escreva a chamada do método addEventListener para escutar o evento de clique: elemento.addEventListener(\"click\", () => {})", "elemento.add...", "elemento.addEventListener(\"click\", () => {})", "Digite elemento.addEventListener(\"click\", () => {}) com aspas em click.", "elemento.addEventListener(\"click\", () => {})"),
            "// js/script.js - Sistema de Filtro\nconst botoesFiltro = document.querySelectorAll('.btn-filtro');\n\nbotoesFiltro.forEach(botao => {\n  botao.addEventListener('click', () => {\n    botoesFiltro.forEach(b => b.classList.remove('ativo'));\n    botao.classList.add('ativo');\n    \n    const categoria = botao.getAttribute('data-filtro');\n    const filtrados = categoria === 'todos'\n      ? projetos\n      : projetos.filter(p => p.categoria === categoria);\n      \n    renderizarProjetos(filtrados);\n  });\n});"),

          L('fe-3-5', "Alternador de Tema Dark/Light com Salvamento no LocalStorage",
            `<h3>💾 A memória que não se apaga quando você sai da loja</h3>
<p>Se você entra na sua cafeteria favorita e o atendente já sabe que você toma café sem açúcar e com leite de aveia, você se sente acolhido. Você não precisa repetir sua preferência toda vez.</p>

<p>O <strong>localStorage</strong> é o cofre permanente do navegador. Ele permite gravar pequenos dados (como a escolha do tema <code>'claro'</code> ou <code>'escuro'</code>) para que, quando o visitante fechar a janela e voltar amanhã, o site continue no tema que ele escolheu!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Alternando e Gravando no LocalStorage</div>
  <div class="command-spotlight-code">document.body.classList.toggle('tema-claro');<br>localStorage.setItem('tema', 'claro');</div>
  <ul class="command-spotlight-breakdown">
    <li><code>classList.toggle(...)</code> → Adiciona a classe se não existir, ou remove se já existir.</li>
    <li><code>localStorage.setItem(...)</code> → Guarda a preferência no navegador do usuário.</li>
  </ul>
</div>

<p>Na próxima aula, vamos validar o formulário de contato em tempo real antes de enviar!</p>`,
            "// Alternando tema\nconst btnTema = document.getElementById('btn-tema');\n\nbtnTema.addEventListener('click', () => {\n  document.body.classList.toggle('tema-claro');\n  const ativo = document.body.classList.contains('tema-claro');\n  localStorage.setItem('tema', ativo ? 'claro' : 'escuro');\n});",
            c("Escreva a instrução que alterna a classe tema-claro no corpo da página usando classList.toggle: document.body.classList.toggle(\"tema-claro\")", "document.body...", "document.body.classList.toggle(\"tema-claro\")", "Digite document.body.classList.toggle(\"tema-claro\") com aspas.", "document.body.classList.toggle(\"tema-claro\")"),
            "// js/script.js - Alternador de Tema Persistente\nconst btnTema = document.getElementById('btn-tema');\n\n// Recupera tema salvo\nconst temaSalvo = localStorage.getItem('edev_tema');\nif (temaSalvo === 'claro') {\n  document.body.classList.add('tema-claro');\n}\n\nif (btnTema) {\n  btnTema.addEventListener('click', () => {\n    document.body.classList.toggle('tema-claro');\n    const ehClaro = document.body.classList.contains('tema-claro');\n    localStorage.setItem('edev_tema', ehClaro ? 'claro' : 'escuro');\n  });\n}"),

          L('fe-3-6', "Validação em Tempo Real do Formulário de Contato",
            `<h3>🛡️ O segurança checando o ingresso na porta</h3>
<p>Em um evento concorrido, o segurança confere o ingresso antes de você entrar na fila. Se o ingresso estiver rasgado ou vencido, ele avisa com educação na hora, em vez de deixar você entrar e ser barrado lá dentro.</p>

<p>Na web, nunca devemos enviar um formulário com dados inválidos para o servidor. Usamos o evento <code>submit</code> combinado com <code>event.preventDefault()</code> para interceptar o envio e avisar o usuário com mensagens amigáveis na tela!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Interceptando o Envio Padrão</div>
  <div class="command-spotlight-code">form.addEventListener('submit', (evento) =&gt; {<br>&nbsp;&nbsp;evento.preventDefault();<br>&nbsp;&nbsp;// Valida os campos aqui<br>});</div>
  <ul class="command-spotlight-breakdown">
    <li><code>preventDefault()</code> → Evita que a página recarregue e perca o que foi digitado.</li>
  </ul>
</div>

<p>Na próxima aula, vamos criar o efeito visual de máquina de escrever no subtítulo da apresentação!</p>`,
            "// Validação de formulário\nconst form = document.querySelector('form');\n\nform.addEventListener('submit', (e) => {\n  e.preventDefault();\n  const nome = document.getElementById('nome').value.trim();\n  if (nome.length < 3) {\n    alert(\"Por favor, digite seu nome completo.\");\n    return;\n  }\n  alert(\"Mensagem enviada com sucesso!\");\n  form.reset();\n});",
            c("Escreva a instrução que impede o comportamento padrão de um evento: evento.preventDefault()", "evento....", "evento.preventDefault()", "Digite evento.preventDefault() chamando a função com parênteses.", "evento.preventDefault()"),
            "// js/script.js - Validação do Formulário\nconst formContato = document.getElementById('form-contato');\n\nif (formContato) {\n  formContato.addEventListener('submit', (e) => {\n    e.preventDefault();\n    const nome = document.getElementById('nome').value.trim();\n    const email = document.getElementById('email').value.trim();\n    const msg = document.getElementById('mensagem').value.trim();\n\n    if (!nome || !email || !msg) {\n      alert(\"⚠️ Por favor, preencha todos os campos do formulário.\");\n      return;\n    }\n\n    alert(\"🎉 Mensagem enviada com sucesso! Entrarei em contato em breve.\");\n    formContato.reset();\n  });\n}"),

          L('fe-3-7', "Efeito de Digitação Animada no Subtítulo do Hero (Typewriter)",
            `<h3>⌨️ A máquina de escrever mágica trabalhando sozinha</h3>
<p>Sabe quando você vê um filme de espionagem e as letras do relatório confidencial aparecem uma a uma na tela verde como se houvesse alguém invisível digitando em tempo real? O visual prende a atenção imediatamente.</p>

<p>Esse efeito se chama <strong>Typewriter</strong>. Conseguimos isso no JavaScript pegando uma frase completa e inserindo letra por letra dentro de um elemento com um pequeno intervalo de tempo usando <code>setTimeout()</code>!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Lógica do Typewriter com setTimeout</div>
  <div class="command-spotlight-code">function digitarTexto(elemento, texto, indice = 0) {<br>&nbsp;&nbsp;if (indice &lt; texto.length) {<br>&nbsp;&nbsp;&nbsp;&nbsp;elemento.textContent += texto.charAt(indice);<br>&nbsp;&nbsp;&nbsp;&nbsp;setTimeout(() =&gt; digitarTexto(elemento, texto, indice + 1), 50);<br>&nbsp;&nbsp;}<br>}</div>
  <ul class="command-spotlight-breakdown">
    <li><code>texto.charAt(indice)</code> → Pega a letra atual da sequência.</li>
    <li><code>setTimeout(..., 50)</code> → Aguarda 50 milissegundos para digitar a próxima letra.</li>
  </ul>
</div>

<p>Na próxima aula, vamos revelar elementos da página suavemente conforme a pessoa rola a tela!</p>`,
            "// Exemplo de digitação suave\nconst titulo = document.querySelector('.hero p');\nconst frase = \"Desenvolvedor Front-end & Criador de Soluções.\";\nlet i = 0;\n\nfunction escrever() {\n  if (i < frase.length) {\n    titulo.textContent += frase.charAt(i);\n    i++;\n    setTimeout(escrever, 60);\n  }\n}",
            c("Escreva a função nativa do JavaScript usada para agendar uma execução após um tempo em milissegundos: setTimeout", "set...", "setTimeout", "Digite setTimeout respeitando a letra T maiúscula.", "setTimeout"),
            "// js/script.js - Efeito Typewriter\nfunction iniciarTypewriter(seletor, texto, velocidade = 60) {\n  const el = document.querySelector(seletor);\n  if (!el) return;\n  el.textContent = \"\";\n  let i = 0;\n\n  function digitar() {\n    if (i < texto.length) {\n      el.textContent += texto.charAt(i);\n      i++;\n      setTimeout(digitar, velocidade);\n    }\n  }\n  digitar();\n}\n\n// Inicia a animação no subtítulo\niniciarTypewriter('.hero p', 'Construo páginas web modernas, velozes e focadas na experiência do usuário.');"),

          L('fe-3-8', "Animação de Revelação de Elementos ao Rolar (Scroll Reveal)",
            `<h3>👀 O sensor de presença no corredor do prédio</h3>
<p>Quando você anda pelo corredor do condomínio à noite, a luz não fica acesa à toa gastando energia: um sensor de presença percebe que você chegou perto e acende a lâmpada suavemente bem na sua frente.</p>

<p>O <strong>IntersectionObserver</strong> é o sensor de presença oficial dos navegadores modernos. Ele avisa o JavaScript no instante exato em que uma seção do site entrou no campo de visão do usuário, permitindo adicionar uma classe de animação suave!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Criando um Observador de Rolagem</div>
  <div class="command-spotlight-code">const observer = new IntersectionObserver((entries) =&gt; {<br>&nbsp;&nbsp;entries.forEach(entry =&gt; {<br>&nbsp;&nbsp;&nbsp;&nbsp;if (entry.isIntersecting) entry.target.classList.add('visivel');<br>&nbsp;&nbsp;});<br>});</div>
  <ul class="command-spotlight-breakdown">
    <li><code>isIntersecting</code> → Verdadeiro quando o elemento está visível na tela.</li>
  </ul>
</div>

<p>Na próxima aula, vamos criar um contador numérico animado para suas métricas de experiência!</p>`,
            "// Observador de elementos\nconst obs = new IntersectionObserver((entradas) => {\n  entradas.forEach(e => {\n    if (e.isIntersecting) {\n      e.target.classList.add('revelado');\n    }\n  });\n});\n\ndocument.querySelectorAll('section').forEach(sec => obs.observe(sec));",
            c("Escreva a propriedade do objeto de entrada do IntersectionObserver que indica se o elemento está visível: entry.isIntersecting", "entry....", "entry.isIntersecting", "Digite entry.isIntersecting respeitando o camelCase.", "entry.isIntersecting"),
            "// js/script.js - Animação de Scroll Reveal\nconst observadorSecoes = new IntersectionObserver((entradas) => {\n  entradas.forEach(entrada => {\n    if (entrada.isIntersecting) {\n      entrada.target.classList.add('animar-entrada');\n      observadorSecoes.unobserve(entrada.target);\n    }\n  });\n}, { threshold: 0.15 });\n\ndocument.querySelectorAll('section').forEach(s => observadorSecoes.observe(s));"),

          L('fe-3-9', "Contador Dinâmico de Métricas e Estatísticas",
            `<h3>⏱️ O cronômetro do painel eletrônico acelerando até o alvo</h3>
<p>Em um placar digital de estádio, quando o relógio é acionado, os números correm velozes (0, 10, 20... até 100) gerando emoção e impacto visual na torcida.</p>

<p>No seu portfólio, exibir métricas (como "15 projetos concluídos", "100% de satisfação") animando do zero até o número final dá uma sensação imediata de sofisticação. Usamos a função <code>setInterval()</code> para somar unidades até atingir a meta!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Função de Repetição por Intervalo</div>
  <div class="command-spotlight-code">const timer = setInterval(() =&gt; {<br>&nbsp;&nbsp;atual += passo;<br>&nbsp;&nbsp;if (atual &gt;= meta) clearInterval(timer);<br>}, 20);</div>
  <ul class="command-spotlight-breakdown">
    <li><code>setInterval</code> → Repete a ação a cada 20 milissegundos.</li>
    <li><code>clearInterval</code> → Pára a repetição quando o alvo é atingido.</li>
  </ul>
</div>

<p>Na próxima aula, vamos criar o pop-up (modal) de detalhes ao clicar em um projeto!</p>`,
            "// Contador animado simples\nfunction animarContador(elemento, alvo) {\n  let count = 0;\n  const timer = setInterval(() => {\n    count++;\n    elemento.textContent = count;\n    if (count >= alvo) clearInterval(timer);\n  }, 30);\n}",
            c("Escreva a função nativa do JavaScript usada para cancelar um intervalo de tempo em execução: clearInterval", "clear...", "clearInterval", "Digite clearInterval respeitando a letra I maiúscula.", "clearInterval"),
            "// js/script.js - Contador de Métricas\nfunction iniciarContadores() {\n  const elementos = document.querySelectorAll('.numero-metrica');\n  elementos.forEach(el => {\n    const alvo = parseInt(el.getAttribute('data-alvo'), 10) || 0;\n    let atual = 0;\n    const passo = Math.ceil(alvo / 40);\n    const relogio = setInterval(() => {\n      atual += passo;\n      if (atual >= alvo) {\n        el.textContent = alvo + \"+\";\n        clearInterval(relogio);\n      } else {\n        el.textContent = atual;\n      }\n    }, 25);\n  });\n}"),

          L('fe-3-10', "Modal de Detalhes dos Projetos (Pop-up Dinâmico)",
            `<h3>🎭 A cortina do camarim que abre para mostrar a obra em detalhe</h3>
<p>Quando você quer inspecionar um produto caro na loja, o vendedor não joga todas as caixas na mesa: ele abre uma vitrine de vidro dedicada, coloca o produto sob a luz para você ver os detalhes e depois guarda com segurança.</p>

<p>Um <strong>modal</strong> é essa janela flutuante que aparece sobre o site, escurecendo o fundo para prender a atenção do visitante nos detalhes técnicos, tecnologias usadas e fotos ampliadas do projeto.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Abrindo e Fechando o Modal</div>
  <div class="command-spotlight-code">modal.classList.add('aberto');<br>btnFechar.onclick = () =&gt; modal.classList.remove('aberto');</div>
  <ul class="command-spotlight-breakdown">
    <li><code>.classList.add('aberto')</code> → Torna o modal visível na tela.</li>
    <li><code>.classList.remove('aberto')</code> → Fecha a janela ao clicar no X ou fora dela.</li>
  </ul>
</div>

<p>Na próxima aula, vamos criar o menu hambúrguer interativo para telas de celular!</p>`,
            "// Abrindo e fechando modal\nconst modal = document.querySelector('.modal');\nconst fechar = document.querySelector('.modal-fechar');\n\nfunction abrirModal(dados) {\n  modal.querySelector('h2').textContent = dados.titulo;\n  modal.classList.add('visivel');\n}\n\nfechar.addEventListener('click', () => modal.classList.remove('visivel'));",
            c("Escreva a instrução que adiciona a classe ativo a um elemento modal usando classList: modal.classList.add(\"ativo\")", "modal...", "modal.classList.add(\"ativo\")", "Digite modal.classList.add(\"ativo\") com aspas na classe.", "modal.classList.add(\"ativo\")"),
            "// js/script.js - Modal de Detalhes\nconst modalEl = document.getElementById('modal-projeto');\nconst btnFecharModal = document.getElementById('btn-fechar-modal');\n\nfunction abrirDetalhes(projetoId) {\n  const p = projetos.find(item => item.id === projetoId);\n  if (!p || !modalEl) return;\n  \n  modalEl.querySelector('.modal-titulo').textContent = p.titulo;\n  modalEl.querySelector('.modal-desc').textContent = p.descricao;\n  modalEl.classList.add('aberto');\n}\n\nif (btnFecharModal && modalEl) {\n  btnFecharModal.addEventListener('click', () => modalEl.classList.remove('aberto'));\n  modalEl.addEventListener('click', (e) => {\n    if (e.target === modalEl) modalEl.classList.remove('aberto');\n  });\n}"),

          L('fe-3-11', "Menu Hambúrguer Interativo para Celulares",
            `<h3>🍔 O sanduíche de três risquinhos que abre a porta</h3>
<p>Em telas pequenas de smartphones, não dá para colocar 5 links compridos lado a lado no topo: eles esbarrariam uns nos outros e quebrariam o layout. Por isso o mundo inteiro adotou o ícone de três barrinhas horizontais (o menu hambúrguer).</p>

<p>Quando o usuário toca nas três barrinhas com o polegar, o menu desliza suavemente da direita para a esquerda. Ao tocar em qualquer link ou tocar de novo no botão, ele se recolhe com elegância!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Alternando o Menu Mobile</div>
  <div class="command-spotlight-code">btnMenu.addEventListener('click', () =&gt; {<br>&nbsp;&nbsp;navMenu.classList.toggle('aberto');<br>});</div>
  <ul class="command-spotlight-breakdown">
    <li><code>.classList.toggle('aberto')</code> → Mostra e esconde a gaveta lateral de links no celular.</li>
  </ul>
</div>

<p>Na próxima aula, vamos fazer a revisão final e integrar todas as funções no script.js!</p>`,
            "// Menu Mobile simples\nconst btnHamburguer = document.querySelector('.btn-hamburguer');\nconst menuNav = document.querySelector('header nav');\n\nbtnHamburguer.addEventListener('click', () => {\n  menuNav.classList.toggle('ativo');\n});",
            c("Escreva a instrução que seleciona o botão com a classe btn-hamburguer usando document.querySelector: document.querySelector(\".btn-hamburguer\")", "document.querySelector(...)", "document.querySelector(\".btn-hamburguer\")", "Digite document.querySelector(\".btn-hamburguer\") com ponto na classe.", "document.querySelector(\".btn-hamburguer\")"),
            "// js/script.js - Menu Hambúrguer Mobile\nconst btnMenuMobile = document.getElementById('btn-mobile');\nconst menuNavegacao = document.querySelector('header nav');\n\nif (btnMenuMobile && menuNavegacao) {\n  btnMenuMobile.addEventListener('click', () => {\n    menuNavegacao.classList.toggle('aberto');\n    const expandido = menuNavegacao.classList.contains('aberto');\n    btnMenuMobile.setAttribute('aria-expanded', expandido);\n  });\n\n  // Fecha o menu ao clicar em qualquer link\n  menuNavegacao.querySelectorAll('a').forEach(link => {\n    link.addEventListener('click', () => menuNavegacao.classList.remove('aberto'));\n  });\n}"),

          L('fe-3-12', "Revisão Geral e Integração Completa do script.js",
            `<h3>🎻 A sinfonia afinada: tudo funcionando em perfeita harmonia</h3>
<p>Todos os instrumentos estão prontos: o banco de projetos em memória, a renderização dinâmica, o filtro por botões, a persistência de tema claro/escuro no localStorage, a validação de contato e o menu mobile.</p>

<p>Nesta aula de fechamento do Módulo 3, nós revisamos a arquitetura do <code>script.js</code> para garantir que nenhuma função cause erros se um elemento não existir na página, organizando tudo com clareza e comentários profissionais.</p>

<p>Veja no rodapé da aula o <strong>Estado do Projeto</strong>: o código completo e unificado de JavaScript que dá vida definitiva ao seu Portfólio!</p>`,
            "// Checklist do script.js:\n// 1. Dados e renderização dinâmica\n// 2. Filtro com data-attributes\n// 3. Tema claro/escuro com localStorage\n// 4. Validação de formulário\n// 5. Menu mobile responsivo",
            c("Escreva a chamada da função nativa que exibe um alerta pop-up no navegador com o texto Sucesso!: alert(\"Sucesso!\")", "alert(...)", "alert(\"Sucesso!\")", "Digite alert(\"Sucesso!\") com exclamação entre aspas.", "alert(\"Sucesso!\")"),
            "/* ============================================================\n   LÓGICA INTERATIVA DO PORTFÓLIO PESSOAL — EDEV\n   js/script.js\n   ============================================================ */\n\n// 1. Banco de Dados dos Projetos\nconst projetos = [\n  {\n    id: 1,\n    titulo: \"Gerenciador de Tarefas\",\n    categoria: \"python\",\n    descricao: \"Aplicação completa de produtividade no terminal com persistência em arquivos JSON.\",\n    link: \"https://github.com\"\n  },\n  {\n    id: 2,\n    titulo: \"Portfólio Pessoal Moderno\",\n    categoria: \"frontend\",\n    descricao: \"Site pessoal com design responsivo, alternador de tema e filtros em tempo real.\",\n    link: \"https://github.com\"\n  },\n  {\n    id: 3,\n    titulo: \"Sistema de Gestão Escolar\",\n    categoria: \"backend\",\n    descricao: \"Arquitetura orientada a objetos com classes, métodos e relatórios analíticos.\",\n    link: \"https://github.com\"\n  }\n];\n\n// 2. Renderização de Cards\nconst containerProjetos = document.querySelector('.grid-projetos');\n\nfunction renderizarProjetos(lista) {\n  if (!containerProjetos) return;\n  containerProjetos.innerHTML = lista.map(p => `\n    <article class=\"card\" data-categoria=\"${p.categoria}\">\n      <h3>${p.titulo}</h3>\n      <p>${p.descricao}</p>\n      <a href=\"${p.link}\" target=\"_blank\" class=\"btn\">Ver Código</a>\n    </article>\n  `).join('');\n}\n\n// 3. Filtros de Projetos\nconst botoesFiltro = document.querySelectorAll('.btn-filtro');\nbotoesFiltro.forEach(btn => {\n  btn.addEventListener('click', () => {\n    botoesFiltro.forEach(b => b.classList.remove('ativo'));\n    btn.classList.add('ativo');\n    const cat = btn.getAttribute('data-filtro');\n    const resultado = (cat === 'todos') ? projetos : projetos.filter(p => p.categoria === cat);\n    renderizarProjetos(resultado);\n  });\n});\n\n// 4. Alternador de Tema Dark/Light\nconst btnTema = document.getElementById('btn-tema');\nif (localStorage.getItem('edev_tema') === 'claro') {\n  document.body.classList.add('tema-claro');\n}\nif (btnTema) {\n  btnTema.addEventListener('click', () => {\n    document.body.classList.toggle('tema-claro');\n    const ehClaro = document.body.classList.contains('tema-claro');\n    localStorage.setItem('edev_tema', ehClaro ? 'claro' : 'escuro');\n  });\n}\n\n// 5. Validação de Formulário\nconst formContato = document.getElementById('form-contato');\nif (formContato) {\n  formContato.addEventListener('submit', (e) => {\n    e.preventDefault();\n    const nome = document.getElementById('nome').value.trim();\n    const email = document.getElementById('email').value.trim();\n    const msg = document.getElementById('mensagem').value.trim();\n\n    if (!nome || !email || !msg) {\n      alert(\"Por favor, preencha todos os campos do formulário.\");\n      return;\n    }\n    alert(\"🎉 Mensagem enviada com sucesso! Entrarei em contato em breve.\");\n    formContato.reset();\n  });\n}\n\n// Inicialização\nrenderizarProjetos(projetos);")
        ]
      },

      // ── Módulo 4 — Publicação, Deploy e Compartilhamento do Portfólio ──
      {
        title: "Módulo 4 — Publicação, Deploy e Compartilhamento do Portfólio",
        lessons: [
          L('fe-4-1', "Checklist de Qualidade, Performance e Acessibilidade (Lighthouse)",
            `<h3>🔍 A vistoria final antes de abrir as portas do restaurante</h3>
<p>Antes de inaugurar um restaurante premiado, a vigilância sanitária e o corpo de bombeiros fazem uma vistoria completa: conferem a saída de emergência, a refrigeração dos alimentos e o acesso para cadeirantes.</p>

<p>Na web, o Google criou uma ferramenta automática oficial chamada <strong>Lighthouse</strong>, embutida dentro das DevTools (F12). Ela avalia seu site em quatro pilares vitais:</p>
<ul>
  <li><strong>Performance:</strong> O site abre em menos de 1 segundo?</li>
  <li><strong>Acessibilidade:</strong> Todas as imagens têm <code>alt</code>? Os contrastes de cor são legíveis?</li>
  <li><strong>Melhores Práticas:</strong> O código segue os padrões modernos da indústria?</li>
  <li><strong>SEO:</strong> As tags de título e meta descrição ajudam o Google a encontrar seu portfólio?</li>
</ul>

<p>Esta é a aula de abertura do nosso módulo final de publicação — sem tarefas para resolver. Na próxima aula, vamos colocar seu Portfólio no ar gratuitamente na internet!</p>`,
            "<!-- Como rodar o Lighthouse no Google Chrome: -->\n<!-- 1. Pressione F12 para abrir as DevTools -->\n<!-- 2. Clique na aba \"Lighthouse\" no menu superior -->\n<!-- 3. Clique em \"Analyze page load\" para gerar a nota de 0 a 100! -->",
            null,
            "<!-- === PROJETO DO CURSO: Meu Portfólio Pessoal === -->\n<!-- Módulo 4: Auditoria Lighthouse concluída com notas verdes (90+) -->\n<!-- Site validado e pronto para deploy público mundial! -->"),

          L('fe-4-2', "Publicação Gratuita no GitHub Pages ou Netlify",
            `<h3>🌐 O foguete decolando para o espaço público</h3>
<p>Até agora, seu site só existia dentro do seu próprio computador. Se você mandasse o link <code>file:///C:/meu-portfolio</code> para um amigo no WhatsApp, ele não conseguiria abrir porque o arquivo estava no seu disco rígido.</p>

<p>Fazer o <strong>Deploy</strong> significa subir os arquivos do site para um servidor conectado à internet 24 horas por dia. O <strong>GitHub Pages</strong> e o <strong>Netlify</strong> oferecem isso de forma 100% gratuita:</p>
<ul>
  <li><strong>Pelo GitHub Pages:</strong> Crie um repositório público com os arquivos do site, vá em <em>Settings &gt; Pages</em> e escolha a branch principal. Em 2 minutos, seu site ganha um endereço oficial como <code>seu-usuario.github.io</code>!</li>
  <li><strong>Pelo Netlify:</strong> Basta arrastar a pasta <code>meu-portfolio</code> para a área de drop do Netlify e o site entra no ar instantaneamente com certificado de segurança SSL (HTTPS).</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 O Comando Git para Enviar ao Servidor</div>
  <div class="command-spotlight-code">git push origin main</div>
  <ul class="command-spotlight-breakdown">
    <li><code>git push</code> → Envia seus arquivos locais para o servidor remoto do GitHub.</li>
  </ul>
</div>

<p>Na próxima aula, vamos aprender a apresentar seu portfólio no LinkedIn para atrair recrutadores!</p>`,
            "# Enviando as atualizações para o GitHub Pages:\ngit add .\ngit commit -m \"Meu portfólio pessoal no ar!\"\ngit push origin main",
            c("Digite o comando Git usado para empurrar suas alterações locais para o servidor remoto na branch main: git push origin main", "git push ...", "git push origin main", "Escreva git push origin main com espaços entre as palavras.", "git push origin main"),
            "<!-- === PORTFÓLIO PUBLICADO NA INTERNET === -->\n<!-- URL pública: https://seu-usuario.github.io/meu-portfolio -->\n<!-- Certificado HTTPS ativo e acessível por qualquer pessoa no mundo! -->"),

          L('fe-4-3', "Compartilhando no LinkedIn e Próximos Passos na Carreira",
            `<h3>🎓 O diploma na parede e o aperto de mão com o mercado</h3>
<p>Olhe para trás e veja a obra que você ergueu com suas próprias mãos. Você começou aprendendo o que é uma tag HTML, estilizou cada pixel com CSS moderno e responsivo, colocou filtros e tema escuro com JavaScript e publicou um site real na internet.</p>

<p>Agora é hora de colher os frutos: compartilhe o link do seu portfólio no LinkedIn com uma postagem explicando o que você aprendeu e os desafios que superou. Recrutadores e clientes adoram ver profissionais que mostram projetos práticos e código bem estruturado.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Estrutura de uma Postagem Profissional</div>
  <div class="command-spotlight-code">"Acabei de publicar meu novo Portfólio desenvolvido com HTML5, CSS3 e JavaScript puro..."</div>
  <ul class="command-spotlight-breakdown">
    <li>Mostre o link do projeto, o repositório do GitHub e marque as tecnologias que dominou.</li>
  </ul>
</div>

<p>Parabéns por concluir o curso de Front-end Completo da Edev! O seu futuro como desenvolvedor web começa agora!</p>`,
            "<!-- Parabéns por concluir o curso Front-end Completo da Edev! -->\n<!-- Seu Portfólio Pessoal está pronto, publicado e responsivo. -->\n<!-- Continue praticando e construindo projetos incríveis! -->",
            c("Digite a palavra comemorativa de conclusão do seu primeiro grande site: parabéns", "# Digite parabéns", "parabéns", "Escreva parabéns em letras minúsculas com acento circunflexo.", "parabéns"),
            "<!-- ============================================================\n   PROJETO FINAL CONCLUÍDO COM SUCESSO!\n   Portfólio Pessoal Moderno — Plataforma Edev\n   HTML5 Semântico + CSS3 Grid/Flexbox + JavaScript ES6+\n   ============================================================ -->")
        ]
      }
    ]
  },

  python: {
    id: "python",
    name: "Python — Lógica de Programação",
    tag: "Python + Lógica",
    hours: "30 horas",
    desc: "Aprenda lógica de programação com a linguagem mais amigável do mundo. Construa do zero um Gerenciador de Tarefas completo e profissional no terminal!",
    modules: [
      // ── Módulo 0 — Configuração do Ambiente e Primeiros Passos ──
      {
        title: "Módulo 0 — Configuração do Ambiente e Primeiros Passos",
        lessons: [
          L('py-0-0', "Como este curso funciona — Sua jornada e o projeto do Gerenciador",
            `<h3>👋 Seja muito bem-vindo à sua jornada</h3>
<p>Antes de tudo: respira fundo. Se você já abriu tutoriais no YouTube e saiu com a sensação de que programação é uma sopa de letrinhas para quem é gênio da matemática, esqueça isso agora.</p>

<p>Aprender a programar não é decorar comandos isolados. É aprender a resolver problemas pequenos, um de cada vez, conversando com o computador com paciência e clareza.</p>

<h3>🎯 O que nós vamos construir juntos?</h3>
<p>Neste curso, cada conceito que você aprender terá um destino certo: o seu <strong>Gerenciador de Tarefas no Terminal</strong>. Nada de exemplos infantis ou códigos que você nunca usará na vida real.</p>

<p>Ao longo dos módulos, o seu aplicativo vai ganhar:</p>
<ul>
  <li>Um menu interativo e elegante no console.</li>
  <li>Cadastro de tarefas com título, descrição e níveis de prioridade.</li>
  <li>Filtros para listar pendências, tarefas concluídas e estatísticas.</li>
  <li>Salvamento permanente em disco no formato JSON, o padrão mais usado na web.</li>
</ul>

<h3>🗺️ Como tirar o máximo de cada aula?</h3>
<p>Nesta plataforma, cada aula é pensada para ser degustada com calma. Leia a explicação, preste atenção no código de exemplo e faça as atividades no seu ritmo. Quando tiver dúvidas, releia sem pressa.</p>

<p>Esta aula foi só de apresentação — sem tarefa para você resolver. Na próxima, começamos a construir juntos!</p>`,
            "# Visão geral da aplicação que você criará do zero:\n# Arquivo: app.py\n# Um sistema completo de tarefas rodando no seu terminal!",
            null,
            "# === PROJETO DO CURSO: Gerenciador de Tarefas no Terminal ===\n# Este bloco vai mostrar seu código evoluindo aula a aula.\n# Na próxima aula, começamos a escrever juntos!"),

          L('py-0-1', "Instalação do Python — Passo a Passo no Windows, Mac e Linux",
            `<h3>🌍 Você já tentou ler uma placa em mandarim sem saber uma palavra?</h3>
<p>Se você olhar para uma placa em chinês arcaico, para você aquilo serão apenas traços sem sentido. Para quem fala a língua, no entanto, é uma mensagem claríssima.</p>

<p>O seu computador funciona exatamente desse jeito: por baixo do teclado, ele só entende eletricidade pura — zeros e uns. Ele não faz ideia do que significa uma palavra em inglês como <code>print</code> ou <code>input</code>.</p>

<p>É aqui que entra o <strong>interpretador Python</strong>. Ele é o tradutor juramentado que fica entre o seu texto e o cérebro do computador. Quando você escreve um arquivo de código, o Python lê linha por linha e traduz imediatamente para a máquina executar.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 O Comando de Verificação no Terminal</div>
  <div class="command-spotlight-code">python --version</div>
  <ul class="command-spotlight-breakdown">
    <li><code>python</code> → O nome do programa interpretador instalado no seu sistema.</li>
    <li><code>--version</code> → A instrução que solicita ao programa responder qual é a versão instalada.</li>
  </ul>
</div>

<h3>📥 Instalando sem complicação</h3>
<ul>
  <li>Acesse o site oficial: <strong>python.org/downloads</strong> e baixe a versão recomendada (qualquer versão 3.10 ou superior).</li>
  <li><strong>Atenção máxima no Windows:</strong> na primeira janelinha do instalador, marque com cuidado a opção <em>"Add python.exe to PATH"</em> na parte inferior antes de clicar em instalar. Essa caixinha ensina ao seu sistema onde o tradutor mora.</li>
  <li>No Mac e Linux, você pode usar seu gerenciador de pacotes habitual (como <code>brew install python</code> no Mac).</li>
</ul>

<h3>🔍 Como saber se deu tudo certo?</h3>
<p>Abra o terminal do seu computador (Prompt de Comando ou PowerShell no Windows, Terminal no Mac/Linux). Digite a instrução de checagem. Se a resposta for algo como <code>Python 3.12.x</code>, seu ambiente está oficialmente vivo!</p>

<p>Se aparecer um aviso dizendo que o comando não foi reconhecido, basta reinstalar marcando a caixinha do PATH. Com o motor funcionando, na próxima lição vamos dar vida ao nosso arquivo do projeto!</p>`,
            "# No terminal do seu sistema operacional:\n# Digite a instrução abaixo para conferir a instalação:\npython --version\n\n# Resposta de sucesso esperada no console:\n# Python 3.12.2",
            c("No terminal, execute o comando que verifica qual versão do interpretador Python está instalada no seu computador.", "python ...", "python --version", "Escreva o nome do programa Python seguido de um espaço e a opção de versão com dois hifens.", "python --version"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 0: Ambiente operacional com Python configurado"),

          L('py-0-2', "Primeiro Programa no Projeto — Imprimindo o Banner de Abertura",
            `<h3>📮 O bilhete na porta da geladeira</h3>
<p>Você já acordou e viu um recado grudado com ímã na geladeira dizendo "Comprei pão, está no forno"? Aquele bilhete não muda a estrutura da cozinha, mas orienta todo mundo da casa.</p>

<p>Na programação nós fazemos isso o tempo todo usando <strong>comentários</strong>. Um comentário é uma anotação feita exclusivamente para seres humanos. Quando o Python vê o caractere <code>#</code>, ele ignora solenemente o resto da linha.</p>

<div class="comment-explain-box">
  <div class="comment-explain-title">💡 Por que usamos comentários no código?</div>
  <p>Comentários servem para explicar o porquê de uma decisão importante ou organizar visualmente os blocos do programa. Em Python, toda linha que começa com <code>#</code> não é executada pelo computador.</p>
</div>

<h3>🗣️ Dando uma voz ao seu aplicativo</h3>
<p>Para o nosso Gerenciador de Tarefas conversar com o usuário, precisamos que ele mostre textos na tela. O comando para isso é a função <code>print()</code>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Função de Saída no Terminal</div>
  <div class="command-spotlight-code">print("=== GERENCIADOR DE TAREFAS EDEV ===")</div>
  <ul class="command-spotlight-breakdown">
    <li><code>print</code> → É o verbo de comando que envia informações para a saída padrão (o console).</li>
    <li><code>( )</code> → Os parênteses delimitam o que deve ser enviado para a função.</li>
    <li><code>" "</code> → As aspas indicam uma sequência de caracteres de texto (uma string).</li>
  </ul>
</div>

<p>Para construir um cabeçalho bonito no nosso <code>app.py</code>, combinamos linhas de texto com separadores visuais:</p>

<pre><code># app.py - Inicialização do Gerenciador de Tarefas
print("====================================")
print("=== GERENCIADOR DE TAREFAS EDEV ===")
print("Organize seu dia com foco e clareza")
print("====================================")
</code></pre>

<p>O resultado ao rodar é uma tela limpa e acolhedora para o usuário:</p>
<pre><code>====================================
=== GERENCIADOR DE TAREFAS EDEV ===
Organize seu dia com foco e clareza
====================================</code></pre>

<p>Veja no rodapé da aula o <strong>Estado do Projeto</strong>: ele já traz o seu arquivo completo pronto para receber novos recursos nas próximas etapas!</p>`,
            "# Exemplo: como combinar linhas de print para desenhar uma interface no console\nprint(\"====================================\")\nprint(\"=== GERENCIADOR DE TAREFAS EDEV ===\")\n# Mensagem de orientação para o usuário\nprint(\"Organize seu dia com foco e clareza\")\nprint(\"====================================\")",
            c("Escreva a instrução em Python que exibe no console a linha divisória de fechamento do nosso banner com trinta e seis sinais de igual (\"====================================\").", "# Escreva aqui a sua instrução print", "print(\"====================================\")", "Chame a função print abrindo parênteses e colocando a sequência de sinais de igual entre aspas.", "print(\"====================================\")"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Autor: Aluno Edev\n# Módulo 0: Estrutura inicial do terminal\n\n# Banner visual de abertura\nprint(\"====================================\")\nprint(\"=== GERENCIADOR DE TAREFAS EDEV ===\")\nprint(\"Organize seu dia com foco e clareza\")\nprint(\"====================================\")"),

          L('py-0-3', "Configurando o VS Code para Python com Extensão Oficial",
            `<h3>🛠️ Arrumando a bancada do desenvolvedor</h3>
<p>Um bom marceneiro pode até cortar uma madeira usando um serrote enferrujado no escuro, mas com uma bancada iluminada e ferramentas ajustadas ele trabalha com rapidez e sem cansar a mão.</p>

<p>O <strong>Visual Studio Code (VS Code)</strong> é essa bancada. Ele organiza os arquivos do projeto, colore cada parte da sintaxe para evitar erros de digitação e inclui um terminal embutido para você testar tudo no mesmo lugar.</p>

<h3>⚙️ Como preparar sua estação de trabalho:</h3>
<ul>
  <li>Abra o VS Code e clique no ícone de Extensões na barra lateral (ou pressione <code>Ctrl + Shift + X</code>).</li>
  <li>Procure por <strong>Python</strong> (publicada pela Microsoft) e clique em <em>Instalar</em>.</li>
  <li>Abra a pasta do seu projeto e crie seu arquivo <code>app.py</code> caso ainda não o tenha criado.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Executando o Projeto pelo Terminal Embutido</div>
  <div class="command-spotlight-code">python app.py</div>
  <ul class="command-spotlight-breakdown">
    <li><code>python</code> → Aciona o interpretador que já configuramos no sistema.</li>
    <li><code>app.py</code> → Passa o arquivo do nosso gerenciador como alvo de execução.</li>
  </ul>
</div>

<p>Agora vamos acrescentar ao nosso projeto uma linha indicando que a aplicação carregou com sucesso e está pronta para receber os comandos do Módulo 1:</p>

<pre><code># Status de inicialização do sistema
print("Status: Ambiente pronto. Carregando dados...")
</code></pre>

<p>Repare como o bloco <strong>Estado do Projeto</strong> no rodapé agora contém o código acumulado das duas aulas anteriores somado a essa nova instrução!</p>`,
            "# Executando nosso script pelo terminal integrado do VS Code:\n# 1. Pressione Ctrl + ' para abrir o terminal\n# 2. Digite o comando abaixo e tecle Enter:\npython app.py",
            c("Digite no console o comando que aciona o Python para executar o arquivo app.py do nosso projeto.", "# Digite o comando aqui", "python app.py", "Escreva o nome do comando do interpretador seguido por espaço e o nome do arquivo com a extensão .py.", "python app.py"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Autor: Aluno Edev\n# Módulo 0: Estrutura inicial do terminal\n\n# Banner visual de abertura\nprint(\"====================================\")\nprint(\"=== GERENCIADOR DE TAREFAS EDEV ===\")\nprint(\"Organize seu dia com foco e clareza\")\nprint(\"====================================\")\n\n# Status de inicialização do sistema\nprint(\"Status: Ambiente pronto. Carregando dados...\")")
        ]
      },

      // ── Módulo 1 — Fundamentos e Variáveis Aplicados ao Gerenciador ──
      {
        title: "Módulo 1 — Fundamentos e Variáveis Aplicados ao Gerenciador",
        lessons: [
          L('py-1-1', "O que são Variáveis: As Caixas Etiquetadas do Gerenciador",
            `<h3>📦 A mesa de trabalho e as caixas organizadoras</h3>
<p>Imagine que você tem uma oficina cheia de parafusos, porcas e ferramentas espalhadas. Se você jogar tudo num balde sem identificação, perde meia hora procurando qualquer coisa.</p>

<p>Agora imagine colocar caixas plásticas com etiquetas adesivas na prateleira: uma escrita "Parafusos Médios", outra escrita "Fita Isolante". Toda vez que você precisar de algo, basta ler a etiqueta e pegar o conteúdo.</p>

<p>Uma <strong>variável</strong> em programação é exatamente essa caixa etiquetada na memória RAM do computador. Ela guarda uma informação e dá a ela um nome claro, para que possamos usá-la em qualquer parte do nosso Gerenciador de Tarefas!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Criando sua Primeira Variável</div>
  <div class="command-spotlight-code">nome_app = "Gerenciador Edev"</div>
  <ul class="command-spotlight-breakdown">
    <li><code>nome_app</code> → O nome da variável (a etiqueta da caixinha).</li>
    <li><code>=</code> → O operador de atribuição ("guarde este valor dentro da caixinha").</li>
    <li><code>"Gerenciador Edev"</code> → O valor guardado na memória.</li>
  </ul>
</div>

<p>Veja como é simples no arquivo <code>app.py</code>: você cria a variável uma vez e depois pode passá-la para a função <code>print()</code> sem precisar redigitar o texto todo.</p>

<pre><code># Criando uma variável com o nome da aplicação
nome_app = "Gerenciador Edev"

# Usando o valor guardado na variável
print(nome_app)
</code></pre>

<p>Esta é a aula de abertura do nosso módulo sobre variáveis — sem tarefas para resolver. Na próxima aula, vamos guardar números para contar as tarefas do nosso sistema!</p>`,
            "# app.py — Guardando o nome da aplicação em uma variável\nnome_app = \"Gerenciador Edev\"\n\n# Imprimindo o valor armazenado\nprint(nome_app)",
            null,
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 1: Fundamentos e Variáveis\n\n# Dados de configuração da aplicação\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\n\n# Banner de abertura do sistema\nprint(\"====================================\")\nprint(f\"=== {nome_app} (v{versao_app}) ===\")\nprint(\"Organize seu dia com foco e clareza\")\nprint(\"====================================\")"),

          L('py-1-2', "Números Inteiros (int): Contando Tarefas e Identificadores",
            `<h3>🔢 O contador na catraca do metrô</h3>
<p>Você já reparou na catraca do metrô ou do ônibus? Cada vez que alguém passa, a catraca gira e soma uma unidade: 1, 2, 3 passageiros. Não existe "meio passageiro" nem "2,7 passageiros". São números inteiros e exatos.</p>

<p>No Python, esse tipo de dado é chamado de <strong>int</strong> (abreviação de <em>integer</em>, ou número inteiro). Usamos <code>int</code> para qualquer informação que possa ser contada de forma exata: quantidade de tarefas pendentes, identificador único (ID) de uma tarefa ou total de dias de prazo.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Declarando um Número Inteiro</div>
  <div class="command-spotlight-code">total_tarefas = 0</div>
  <ul class="command-spotlight-breakdown">
    <li><code>total_tarefas</code> → O nome da variável contadora.</li>
    <li><code>=</code> → Atribui o valor à variável.</li>
    <li><code>0</code> → O número inteiro (sem aspas, pois não é texto).</li>
  </ul>
</div>

<p><strong>Atenção de ouro:</strong> nunca coloque aspas ao redor de um número quando você quiser fazer cálculos com ele! Se você colocar <code>"0"</code> com aspas, o Python entende que é uma palavra, não uma quantidade.</p>

<pre><code># Quantidade inicial de tarefas no nosso sistema
total_tarefas = 0
id_tarefa = 101

print("Total inicial de tarefas cadastradas:")
print(total_tarefas)
</code></pre>

<p>Veja no rodapé como o nosso <code>app.py</code> agora mantém a contagem inicial de tarefas do sistema!</p>`,
            "# Criando contadores inteiros no projeto\ntotal_tarefas = 0\nlimite_diario = 10\n\n# Exibindo os valores\nprint(\"Total de tarefas:\")\nprint(total_tarefas)",
            c("Crie uma variável chamada total_pendentes recebendo o número inteiro zero, para inicializar o contador de pendências do nosso sistema.", "# Crie a variável aqui", "total_pendentes = 0", "Escreva o nome da variável total_pendentes, coloque o sinal de igual e o número 0 sem aspas.", "total_pendentes = 0"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 1: Variáveis e Contadores\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\n\n# Contadores inteiros do sistema\ntotal_tarefas = 0\ntotal_pendentes = 0\n\nprint(\"====================================\")\nprint(f\"=== {nome_app} (v{versao_app}) ===\")\nprint(\"Organize seu dia com foco e clareza\")\nprint(\"====================================\")\nprint(f\"Tarefas cadastradas no momento: {total_tarefas}\")"),

          L('py-1-3', "Números Decimais (float): Estimativas de Tempo e Horas",
            `<h3>⏱️ A balança de precisão da farmácia</h3>
<p>Quando você sobe na balança da farmácia, ela não diz apenas "você pesa 70 quilos". Ela diz: 70,45 kg. Esse pedacinho quebrado depois da vírgula faz toda a diferença para medir remédios, peso e tempo.</p>

<p>Na programação, números com casas decimais são chamados de <strong>float</strong> (ponto flutuante). No Python nós usamos o <strong>ponto (.)</strong> e não a vírgula para separar a parte inteira dos centavos ou frações de hora.</p>

<p>No Gerenciador de Tarefas, usamos <code>float</code> para estimar quanto tempo uma tarefa vai levar: por exemplo, <code>1.5</code> horas (uma hora e meia) ou calcular a porcentagem de conclusão do dia.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Declarando um Número Decimal (float)</div>
  <div class="command-spotlight-code">horas_estimadas = 2.5</div>
  <ul class="command-spotlight-breakdown">
    <li><code>horas_estimadas</code> → O nome da variável de tempo.</li>
    <li><code>2.5</code> → Representa duas horas e meia (use ponto, nunca vírgula).</li>
  </ul>
</div>

<pre><code># Tempo estimado para concluir a primeira tarefa
horas_estimadas = 1.5

print("Horas previstas para esta atividade:")
print(horas_estimadas)
</code></pre>

<p>Na próxima aula, vamos aprender sobre strings para guardar os títulos e descrições detalhadas das tarefas!</p>`,
            "# Armazenando valores decimais\nhoras_estimadas = 2.5\nmeta_horas_dia = 6.0\n\nprint(\"Estimativa em horas:\")\nprint(horas_estimadas)",
            c("Declare uma variável chamada tempo_estimado guardando o valor decimal 1.5 para representar uma hora e meia de trabalho em uma tarefa.", "# Declare a variável decimal aqui", "tempo_estimado = 1.5", "Escreva tempo_estimado seguido de igual e 1.5 com ponto no lugar da vírgula.", "tempo_estimado = 1.5"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 1: Variáveis Numéricas\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\ntotal_tarefas = 0\ntotal_pendentes = 0\n\n# Estimativas em ponto flutuante (horas)\ntempo_estimado_padrao = 1.0\n\nprint(\"====================================\")\nprint(f\"=== {nome_app} (v{versao_app}) ===\")\nprint(\"Organize seu dia com foco e clareza\")\nprint(\"====================================\")"),

          L('py-1-4', "Textos (str): Títulos, Descrições e Categorias das Tarefas",
            `<h3>🏷️ As etiquetas na pasta de documentos</h3>
<p>Abra uma gaveta de escritório: cada pasta tem um título escrito como "Contratos 2026" ou "Notas Fiscais". Esses textos dizem para o ser humano o que está guardado ali dentro.</p>

<p>Em Python, todo pedaço de texto é chamado de <strong>string</strong> (ou simplesmente <code>str</code>). Uma string é sempre envolvida por <strong>aspas simples (' ')</strong> ou <strong>aspas duplas (" ")</strong>.</p>

<p>No Gerenciador de Tarefas, quase tudo que o usuário vê é texto: o título da tarefa, a descrição, a categoria (como "Estudos" ou "Trabalho") e a data de entrega.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Declarando uma String em Python</div>
  <div class="command-spotlight-code">titulo_tarefa = "Estudar Python na Edev"</div>
  <ul class="command-spotlight-breakdown">
    <li><code>titulo_tarefa</code> → Identificador claro do dado.</li>
    <li><code>"Estudar Python na Edev"</code> → Texto delimitado por aspas duplas.</li>
  </ul>
</div>

<pre><code># Guardando os dados textuais de uma tarefa
titulo_tarefa = "Criar o layout do projeto"
categoria = "Trabalho"

print(titulo_tarefa)
print(categoria)
</code></pre>

<p>Agora o nosso projeto já consegue armazenar o nome da primeira tarefa real do sistema no arquivo acumulado!</p>`,
            "# Declarando strings para uma tarefa\ntitulo = \"Comprar café para o escritório\"\ncategoria = \"Pessoal\"\n\nprint(titulo)\nprint(categoria)",
            c("Crie uma variável chamada categoria_padrao com o texto \"Geral\" para definir o grupo padrão das novas tarefas.", "# Crie a variável de texto aqui", "categoria_padrao = \"Geral\"", "Escreva categoria_padrao = \"Geral\" usando aspas duplas ao redor da palavra.", "categoria_padrao = \"Geral\""),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 1: Variáveis de Texto e Números\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\ntotal_tarefas = 1\ntotal_pendentes = 1\n\n# Primeira tarefa modelo guardada em variáveis\ntarefa_titulo = \"Configurar ambiente do projeto\"\ntarefa_categoria = \"Estudos\"\ntarefa_tempo = 1.5\n\nprint(\"====================================\")\nprint(f\"=== {nome_app} (v{versao_app}) ===\")\nprint(\"Organize seu dia com foco e clareza\")\nprint(\"====================================\")\nprint(f\"Primeira tarefa: {tarefa_titulo} [{tarefa_categoria}]\")"),

          L('py-1-5', "Verdadeiro ou Falso (bool): O Interruptor de Conclusão da Tarefa",
            `<h3>💡 O interruptor da lâmpada do seu quarto</h3>
<p>Pense no interruptor da parede. Ele não tem meio-termo: ou está ligado e o quarto está aceso, ou está desligado e o quarto está escuro. É uma decisão binária de dois estados possíveis.</p>

<p>Na programação, chamamos isso de <strong>booleano</strong> (tipo <code>bool</code>). No Python só existem dois valores booleanos no universo inteiro: <strong>True</strong> (Verdadeiro) e <strong>False</strong> (Falso), ambos sempre com a primeira letra maiúscula!</p>

<p>No nosso Gerenciador de Tarefas, o booleano é a alma do aplicativo: quando uma tarefa é criada, ela começa com <code>concluida = False</code>. Quando o usuário clica para marcar como feita, ela vira <code>concluida = True</code>!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Declarando um Estado Booleano</div>
  <div class="command-spotlight-code">tarefa_concluida = False</div>
  <ul class="command-spotlight-breakdown">
    <li><code>tarefa_concluida</code> → O nome da variável de status.</li>
    <li><code>False</code> → Começa com F maiúsculo, sem aspas (é um valor booleano nativo).</li>
  </ul>
</div>

<pre><code># Status de conclusão da primeira tarefa
tarefa_concluida = False

print("A tarefa já foi concluída?")
print(tarefa_concluida)
</code></pre>

<p>Com inteiros, decimais, textos e booleanos, você domina os quatro tipos fundamentais de qualquer sistema moderno!</p>`,
            "# Estados booleanos em Python\ntarefa_feita = False\nsistema_ativo = True\n\nprint(\"Status da tarefa:\")\nprint(tarefa_feita)",
            c("Crie a variável tarefa_feita com o valor booleano False, indicando que uma nova tarefa ainda está pendente.", "# Crie a variável booleana aqui", "tarefa_feita = False", "Escreva tarefa_feita = False com o F de False em maiúsculo e sem aspas.", "tarefa_feita = False"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 1: Variáveis e Estado Booleano\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\ntotal_tarefas = 1\ntotal_pendentes = 1\n\n# Dados da tarefa inicial\ntarefa_titulo = \"Configurar ambiente do projeto\"\ntarefa_categoria = \"Estudos\"\ntarefa_horas = 1.5\ntarefa_concluida = False\n\nprint(\"====================================\")\nprint(f\"=== {nome_app} (v{versao_app}) ===\")\nprint(\"Organize seu dia com foco e clareza\")\nprint(\"====================================\")\nprint(f\"Tarefa: {tarefa_titulo}\")\nprint(f\"Concluída: {tarefa_concluida}\")"),

          L('py-1-6', "Boas Práticas de Nomes: O Padrão snake_case no Python",
            `<h3>🐍 A cobra rastejando no chão de palavras</h3>
<p>Imagine tentar ler uma frase onde todas as palavras estão grudadas sem espaço: "sistemadegerenciamentodetarefascompleto". Dá dor de cabeça só de olhar!</p>

<p>Como não podemos usar a barra de espaço para separar palavras no nome de uma variável em código, a comunidade oficial do Python adotou o padrão <strong>snake_case</strong> (caso cobra). Usamos letras minúsculas e separamos as palavras com um sublinhado (<code>_</code>).</p>

<p>Regras de ouro para nomes de variáveis em Python:</p>
<ul>
  <li>Use sempre letras minúsculas separadas por <code>_</code>: <code>total_de_tarefas</code>, não <code>totalDeTarefas</code>.</li>
  <li>Nunca comece um nome com número: <code>tarefa_1</code> é válido, mas <code>1_tarefa</code> causa erro de sintaxe.</li>
  <li>Escolha nomes autoexplicativos: <code>descricao_tarefa</code> é mil vezes melhor do que apenas <code>d</code> ou <code>x</code>.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Comparando Nomes Bons vs Nomes Ruins</div>
  <div class="command-spotlight-code">prazo_final_dias = 7  # Excelente snake_case</div>
  <ul class="command-spotlight-breakdown">
    <li><code>prazo_final_dias</code> → Quem lê o código sabe exatamente o que o número 7 significa.</li>
  </ul>
</div>

<p>No nosso projeto, todos os identificadores seguirão esse padrão profissional desde o primeiro dia!</p>`,
            "# Exemplos corretos de snake_case no Python\nlimite_maximo_tarefas = 50\ndias_para_entrega = 3\nnome_usuario_logado = \"Ana Silva\"\n\nprint(limite_maximo_tarefas)",
            c("Crie uma variável no padrão snake_case chamada limite_maximo_tarefas recebendo o valor inteiro 50.", "# Crie a variável em snake_case aqui", "limite_maximo_tarefas = 50", "Escreva todas as palavras em minúsculas separadas por sublinhado: limite_maximo_tarefas = 50", "limite_maximo_tarefas = 50"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 1: Boas Práticas de Variáveis\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\nlimite_maximo_tarefas = 50\n\n# Dados da tarefa inicial em snake_case\ntarefa_titulo = \"Configurar ambiente do projeto\"\ntarefa_categoria = \"Estudos\"\ntarefa_horas = 1.5\ntarefa_concluida = False\n\nprint(\"====================================\")\nprint(f\"=== {nome_app} (v{versao_app}) ===\")\nprint(\"Organize seu dia com foco e clareza\")\nprint(\"====================================\")"),

          L('py-1-7', "Operadores Aritméticos: Calculando Métricas e Saldos do Gerenciador",
            `<h3>🧮 A calculadora de bolso do coordenador</h3>
<p>Imagine que você tem 10 tarefas para fazer hoje. Você conclui 3 no almoço e adiciona mais 2 antes do jantar. Quantas sobraram? Para responder isso, seu cérebro fez duas operações básicas: subtração e soma.</p>

<p>O computador é a calculadora mais veloz do planeta. Em Python, os operadores aritméticos básicos são:</p>
<ul>
  <li><code>+</code> (Adição) e <code>-</code> (Subtração)</li>
  <li><code>*</code> (Multiplicação) e <code>/</code> (Divisão que sempre resulta em float)</li>
  <li><code>//</code> (Divisão inteira, descarta os decimais) e <code>%</code> (Resto da divisão)</li>
</ul>

<p>No Gerenciador de Tarefas, usamos cálculos para manter o saldo de pendências sempre atualizado:</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Calculando o Saldo de Tarefas Pendentes</div>
  <div class="command-spotlight-code">tarefas_pendentes = total_tarefas - tarefas_concluidas</div>
  <ul class="command-spotlight-breakdown">
    <li><code>total_tarefas</code> → Quantidade total cadastrada no sistema.</li>
    <li><code>-</code> → Operador de subtração.</li>
    <li><code>tarefas_concluidas</code> → Quantidade já finalizada pelo usuário.</li>
  </ul>
</div>

<p>Veja como o nosso projeto fecha o Módulo 1 com cálculos automáticos e métricas em tempo real!</p>`,
            "# Calculando estatísticas no console\ntotal_tarefas = 10\ntarefas_concluidas = 4\n\n# Subtraindo para descobrir as pendências\ntarefas_pendentes = total_tarefas - tarefas_concluidas\n\nprint(\"Total de tarefas:\", total_tarefas)\nprint(\"Concluídas:\", tarefas_concluidas)\nprint(\"Ainda pendentes:\", tarefas_pendentes)",
            c("Escreva a instrução que calcula tarefas_pendentes subtraindo tarefas_concluidas de total_tarefas.", "# Escreva o cálculo aqui", "tarefas_pendentes = total_tarefas - tarefas_concluidas", "Use o operador de menos: tarefas_pendentes = total_tarefas - tarefas_concluidas", "tarefas_pendentes = total_tarefas - tarefas_concluidas"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 1: Variáveis, Tipos e Operações Concluídos\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\nlimite_maximo_tarefas = 50\n\n# Métricas acumuladas do Gerenciador\ntotal_tarefas = 5\ntarefas_concluidas = 2\ntarefas_pendentes = total_tarefas - tarefas_concluidas\n\nprint(\"====================================\")\nprint(f\"=== {nome_app} (v{versao_app}) ===\")\nprint(\"Organize seu dia com foco e clareza\")\nprint(\"====================================\")\nprint(f\"Total de Tarefas: {total_tarefas}\")\nprint(f\"Concluídas: {tarefas_concluidas} | Pendentes: {tarefas_pendentes}\")")
        ]
      },

      // ── Módulo 2 — Controle de Fluxo e Menu do Gerenciador ──
      {
        title: "Módulo 2 — Controle de Fluxo e Menu do Gerenciador",
        lessons: [
          L('py-2-1', "Entrada do Usuário com input(): Ouvindo o Teclado no Gerenciador",
            `<h3>🎙️ O microfone aberto na cabine de atendimento</h3>
<p>Até agora, nosso programa era como uma televisão ligada: ele falava com você através do <code>print()</code>, mas você não podia responder de volta.</p>

<p>Um aplicativo de verdade precisa de um microfone. Ele precisa perguntar: "Qual o nome da sua tarefa?", esperar você digitar no teclado e teclar Enter, e aí sim capturar o que você disse para guardar na memória.</p>

<p>A função que faz isso em Python se chama <code>input()</code>. Quando o computador chega nessa linha, ele pausa a execução e fica esperando pacientemente o usuário digitar.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Capturando Dados do Teclado</div>
  <div class="command-spotlight-code">titulo_digitado = input("Digite o título da tarefa: ")</div>
  <ul class="command-spotlight-breakdown">
    <li><code>titulo_digitado</code> → A variável que receberá o texto digitado.</li>
    <li><code>input(...)</code> → Mostra a pergunta na tela e aguarda a resposta do usuário.</li>
  </ul>
</div>

<p>Veja no exemplo abaixo como o programa se torna uma conversa real entre o humano e o computador.</p>

<pre><code># Perguntando o nome da tarefa
nova_tarefa = input("Qual tarefa você quer cadastrar? ")

print("Você digitou:")
print(nova_tarefa)
</code></pre>

<p>Esta é a aula de abertura do nosso módulo de controle de fluxo — sem tarefas para resolver. Na próxima aula, vamos aprender a misturar variáveis e textos de forma elegante com f-strings!</p>`,
            "# Testando a captura de dados\nnome_usuario = input(\"Qual é o seu nome? \")\nprint(\"Bem-vindo ao sistema,\")\nprint(nome_usuario)",
            null,
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 2: Controle de Fluxo e Interatividade\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\n\nprint(\"====================================\")\nprint(f\"=== {nome_app} (v{versao_app}) ===\")\nprint(\"Organize seu dia com foco e clareza\")\nprint(\"====================================\")\n\n# Capturando a primeira tarefa via teclado\ntitulo_tarefa = input(\"Digite o título da sua primeira tarefa: \")\nprint(f\"Tarefa cadastrada com sucesso: {titulo_tarefa}\")"),

          L('py-2-2', "Textos Dinâmicos com f-strings: Mensagens Elegantes no Console",
            `<h3>🧩 As peças de encaixe do quebra-cabeça</h3>
<p>Imagine escrever uma carta modelo onde o nome do destinatário muda para cada pessoa: "Olá, [NOME], sua encomenda de número [ID] chegou!". Você só troca os cartões nos lugares certos.</p>

<p>Nas versões modernas do Python, usamos as <strong>f-strings</strong> (strings formatadas) para fazer exatamente isso. Você coloca a letrinha <code>f</code> minúscula antes de abrir as aspas e coloca o nome da variável entre chaves <code>{ }</code>.</p>

<p>O Python substitui na mesma hora o conteúdo da chave pelo valor da variável. É muito mais limpo, legível e rápido do que ficar somando textos com sinal de mais!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Formatando com f-string</div>
  <div class="command-spotlight-code">print(f"Tarefa cadastrada: {titulo_tarefa} [Prioridade: Alta]")</div>
  <ul class="command-spotlight-breakdown">
    <li><code>f"..."</code> → O 'f' avisa ao Python para interpretar expressões dentro das chaves.</li>
    <li><code>{titulo_tarefa}</code> → As chaves são substituídas pelo valor real da variável.</li>
  </ul>
</div>

<pre><code># Criando uma mensagem rica e profissional
tarefa = "Comprar cadernos"
prazo = "Hoje às 18h"

print(f"📌 Pendência: {tarefa} | Horário limite: {prazo}")
</code></pre>

<p>Na próxima aula, vamos aprender o que fazer quando o usuário digita números no teclado!</p>`,
            "# Formatando dados com f-string\nusuario = \"Carlos\"\ntarefas_concluidas = 3\ntotal_hoje = 5\n\nprint(f\"Parabéns, {usuario}! Você completou {tarefas_concluidas} de {total_hoje} tarefas.\")",
            c("Use uma f-string para exibir a mensagem formatada: print(f\"Tarefa ativa: {titulo}\") onde a variável titulo aparece entre chaves.", "# Escreva o print com f-string aqui", "print(f\"Tarefa ativa: {titulo}\")", "Abra o print, coloque f antes das aspas e escreva {titulo} entre chaves dentro do texto.", "print(f\"Tarefa ativa: {titulo}\")"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 2: Mensagens Dinâmicas com f-strings\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\n\nprint(\"====================================\")\nprint(f\"=== {nome_app} (v{versao_app}) ===\")\nprint(\"Organize seu dia com foco e clareza\")\nprint(\"====================================\")\n\ntitulo_tarefa = input(\"Digite o título da sua tarefa: \")\ncategoria_tarefa = input(\"Digite a categoria (ex: Estudos, Trabalho): \")\n\n# Exibição rica formatada com f-string\nprint(f\"✅ Cadastrada: {titulo_tarefa} [{categoria_tarefa}]\")"),

          L('py-2-3', "Conversão de Tipos: Transformando Texto Digitado em Número",
            `<h3>💱 A casa de câmbio no aeroporto</h3>
<p>Se você chega nos Estados Unidos com reais na carteira, você não pode pagar o almoço diretamente com cédulas brasileiras. Você precisa ir a uma casa de câmbio e converter seus reais em dólares.</p>

<p>Quando o usuário digita algo no <code>input()</code>, o Python SEMPRE entrega esse dado no formato de <strong>texto (str)</strong>, mesmo que a pessoa tenha digitado o número <code>10</code>. Para somar ou fazer contas com esse número, precisamos convertê-lo usando a função <code>int()</code> ou <code>float()</code>!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Convertendo a Entrada em Número Inteiro</div>
  <div class="command-spotlight-code">opcao_escolhida = int(input("Escolha uma opção: "))</div>
  <ul class="command-spotlight-breakdown">
    <li><code>input(...)</code> → Captura o texto digitado ("1", "2" etc).</li>
    <li><code>int(...)</code> → Converte o texto em um número inteiro de verdade.</li>
  </ul>
</div>

<pre><code># Capturando a quantidade de tarefas planejadas para o dia
resposta = input("Quantas tarefas você pretende fazer hoje? ")
meta_diaria = int(resposta)

# Agora podemos fazer cálculos matemáticos com segurança!
dobro_meta = meta_diaria * 2
print(f"Sua meta diária é {meta_diaria} e o dobro seria {dobro_meta}")
</code></pre>

<p>Com essa conversão em mãos, estamos prontos para tomar decisões no código com if e else!</p>`,
            "# Convertendo valores numéricos\nhoras_digitadas = input(\"Quantas horas você vai dedicar? \")\nhoras = float(horas_digitadas)\n\nprint(f\"Tempo registrado: {horas} horas\")",
            c("Converta a variável texto_opcao em número inteiro atribuindo o resultado a numero_opcao.", "# Converta a variável aqui", "numero_opcao = int(texto_opcao)", "Use a função int(texto_opcao) e atribua para a variável numero_opcao.", "numero_opcao = int(texto_opcao)"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 2: Conversão de Tipos\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\n\nprint(\"====================================\")\nprint(f\"=== {nome_app} (v{versao_app}) ===\")\nprint(\"====================================\")\n\ntitulo_tarefa = input(\"Título da tarefa: \")\nhoras_estimadas = float(input(\"Horas estimadas para concluir (ex: 1.5): \"))\n\nprint(f\"✅ Cadastrada: {titulo_tarefa} ({horas_estimadas}h previstas)\")"),

          L('py-2-4', "Tomada de Decisão com if e else: Validando Entradas do Gerenciador",
            `<h3>🚦 O semáforo no cruzamento da avenida</h3>
<p>Pense num semáforo de trânsito. Se o sinal estiver verde, você avança com o carro; se estiver vermelho, você pisa no freio. O caminho que seu carro faz depende de uma condição clara daquele momento.</p>

<p>No Python, tomamos decisões usando as palavras mágicas <strong>if</strong> (se) e <strong>else</strong> (senão). Uma regra fundamental: todo bloco subordinado ao <code>if</code> precisa estar <strong>indentado</strong> (com quatro espaços para a direita).</p>

<p>No Gerenciador de Tarefas, usamos <code>if/else</code> para não deixar o usuário cadastrar uma tarefa vazia por engano!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Estrutura Condicional if/else</div>
  <div class="command-spotlight-code">if titulo != "":<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Tarefa válida")<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Erro: Título vazio")</div>
  <ul class="command-spotlight-breakdown">
    <li><code>if</code> → Avalia se a condição é verdadeira.</li>
    <li><code>!=</code> → Operador de diferença ("diferente de").</li>
    <li><code>else:</code> → Caminho alternativo caso a condição seja falsa.</li>
  </ul>
</div>

<pre><code># Validando o preenchimento de uma tarefa
titulo = input("Nome da tarefa: ")

if titulo != "":
    print(f"Tarefa '{titulo}' aceita!")
else:
    print("Aviso: você precisa digitar pelo menos um caractere!")
</code></pre>

<p>Na próxima aula, vamos expandir essas decisões para múltiplos caminhos com o elif!</p>`,
            "# Validação de prioridade com if/else\nprioridade = input(\"Prioridade (Alta ou Baixa): \")\n\nif prioridade == \"Alta\":\n    print(\"⚠️ Tarefa urgente! Faça primeiro.\")\nelse:\n    print(\"☕ Tarefa de rotina normal.\")",
            c("Escreva a primeira linha de uma condicional que verifica se a variável opcao é igual a 1 (use dois sinais de igual e dois pontos no final).", "# Escreva o if aqui", "if opcao == 1:", "Lembre-se de usar if opcao == 1: com dois pontos no final.", "if opcao == 1:"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 2: Tomada de Decisão com if / else\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\n\nprint(\"====================================\")\nprint(f\"=== {nome_app} (v{versao_app}) ===\")\nprint(\"====================================\")\n\ntitulo_tarefa = input(\"Digite o nome da tarefa: \")\n\n# Validação do título\nif titulo_tarefa != \"\":\n    print(f\"✅ Sucesso: '{titulo_tarefa}' cadastrada!\")\nelse:\n    print(\"❌ Erro: o título não pode ficar em branco!\")"),

          L('py-2-5', "Múltiplas Escolhas com elif: O Menu de Navegação da Aplicação",
            `<h3>🎛️ Os botões no painel do elevador</h3>
<p>Num prédio de 5 andares, você entra no elevador e não tem apenas duas opções ("subir" ou "descer"). Você tem o 1º andar, o 2º andar, o 3º andar e o térreo. Cada botão aciona um destino diferente.</p>

<p>Quando um programa tem mais de duas alternativas, usamos o <strong>elif</strong> (abreviação de <em>else if</em>, ou "senão, se"). O Python vai testando uma por uma até encontrar a verdadeira!</p>

<p>No Gerenciador de Tarefas, é o <code>elif</code> que permite criar um menu completo: opção 1 para adicionar tarefa, opção 2 para listar, opção 3 para concluir e opção 0 para sair.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Estrutura de Múltipla Escolha</div>
  <div class="command-spotlight-code">if opcao == 1:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Nova tarefa")<br>elif opcao == 2:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Listar tarefas")<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Opção inválida")</div>
  <ul class="command-spotlight-breakdown">
    <li><code>elif</code> → Testa uma nova condição quando a anterior foi falsa.</li>
    <li><code>else</code> → Executa apenas se nenhuma das anteriores for atendida.</li>
  </ul>
</div>

<pre><code># Simulando as opções do menu
opcao = int(input("Escolha [1] Cadastrar | [2] Listar | [0] Sair: "))

if opcao == 1:
    print("Modo de cadastro ativado.")
elif opcao == 2:
    print("Exibindo todas as tarefas...")
elif opcao == 0:
    print("Saindo do sistema. Até logo!")
else:
    print("Opção desconhecida.")
</code></pre>

<p>Agora só falta um ingrediente para o menu ficar perfeito: fazer ele repetir sem fechar a janela!</p>`,
            "# Menu de prioridades com elif\ncodigo = int(input(\"Digite o nível de prioridade (1, 2 ou 3): \"))\n\nif codigo == 1:\n    print(\"Prioridade: Baixa\")\nelif codigo == 2:\n    print(\"Prioridade: Média\")\nelif codigo == 3:\n    print(\"Prioridade: Alta\")\nelse:\n    print(\"Nível inválido\")",
            c("Escreva a linha com elif para testar se a variável opcao é igual a 2 (lembre-se dos dois pontos no final).", "# Escreva o elif aqui", "elif opcao == 2:", "Digite elif seguido de espaco, opcao == 2 e dois pontos.", "elif opcao == 2:"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 2: Rotas do Menu com elif\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\n\nprint(\"====================================\")\nprint(f\"=== {nome_app} (v{versao_app}) ===\")\nprint(\"====================================\")\nprint(\"1 - Nova Tarefa\")\nprint(\"2 - Ver Tarefas\")\nprint(\"0 - Sair\")\nprint(\"------------------------------------\")\n\nopcao = int(input(\"Escolha uma opção: \"))\n\nif opcao == 1:\n    tarefa = input(\"Nome da nova tarefa: \")\n    print(f\"✅ Cadastrada: {tarefa}\")\nelif opcao == 2:\n    print(\"📋 Suas tarefas serão listadas aqui em breve!\")\nelif opcao == 0:\n    print(\"👋 Encerrando o Gerenciador. Bom trabalho!\")\nelse:\n    print(\"⚠️ Opção inválida! Escolha 1, 2 ou 0.\")"),

          L('py-2-6', "Laço de Repetição com while: Mantendo o Gerenciador Ativo",
            `<h3>🎠 O carrossel no parque de diversões</h3>
<p>Quando a música do carrossel começa a tocar, os cavalinhos sobem e descem em voltas contínuas. Eles não param sozinhos depois de 3 segundos; continuam girando <strong>enquanto</strong> o operador não desligar a chave principal.</p>

<p>Em programação, chamamos essa repetição de <strong>loop</strong> ou laço. A palavra-chave <strong>while</strong> significa literalmente "enquanto". Ela repete um bloco de comandos sem parar enquanto a condição for verdadeira.</p>

<p>No Gerenciador de Tarefas, queremos que o programa continue rodando enquanto o usuário não escolher a opção 0 para sair!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Estrutura de Repetição com while</div>
  <div class="command-spotlight-code">while rodando:<br>&nbsp;&nbsp;&nbsp;&nbsp;# Comandos do menu repetem aqui</div>
  <ul class="command-spotlight-breakdown">
    <li><code>while</code> → Inicia o laço de repetição.</li>
    <li><code>rodando</code> → Uma variável booleana de controle (True para continuar, False para parar).</li>
  </ul>
</div>

<pre><code># Mantendo o sistema aberto com uma variável de controle
sistema_ativo = True

while sistema_ativo:
    escolha = input("Deseja continuar usando o app? (s/n): ")
    if escolha == "n":
        sistema_ativo = False
        print("Até logo!")
</code></pre>

<p>Na próxima aula, vamos juntar while, if, elif e input para montar o menu interativo definitivo!</p>`,
            "# Exemplo de contador com while\ncontador = 1\nwhile contador <= 3:\n    print(f\"Processando item {contador}...\")\n    contador = contador + 1\n\nprint(\"Processamento finalizado!\")",
            c("Escreva a instrução inicial de um loop while que repete enquanto a variável sistema_ativo for verdadeira.", "# Escreva a linha do while aqui", "while sistema_ativo:", "Escreva while sistema_ativo: com dois pontos no final.", "while sistema_ativo:"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 2: Loop Principal com while\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\nsistema_ativo = True\n\nwhile sistema_ativo:\n    print(\"\n====================================\")\n    print(f\"=== {nome_app} (v{versao_app}) ===\")\n    print(\"====================================\")\n    print(\"1 - Cadastrar Tarefa\")\n    print(\"0 - Sair do Sistema\")\n    \n    opcao = int(input(\"Escolha: \"))\n    \n    if opcao == 1:\n        t = input(\"Título da tarefa: \")\n        print(f\"✅ Cadastrada: {t}\")\n    elif opcao == 0:\n        print(\"👋 Saindo do sistema... Até a próxima!\")\n        sistema_ativo = False\n    else:\n        print(\"Opção inválida, tente novamente.\")"),

          L('py-2-7', "O Menu Interativo do Gerenciador: Unindo Todos os Blocos de Fluxo",
            `<h3>🎯 O maestro regendo a orquestra inteira</h3>
<p>Pense num maestro na frente dos músicos: ele dá a entrada dos violinos, depois dos instrumentos de sopro e marca o ritmo até o encerramento da música. Cada músico sabe sua hora exata de tocar.</p>

<p>Nesta aula, você é o maestro do seu código. Nós vamos juntar tudo o que aprendemos no Módulo 2: o <code>while</code> como batuta contínua, o <code>input()</code> ouvindo o usuário, a conversão <code>int()</code>, as condições <code>if/elif/else</code> e a formatação rica das <code>f-strings</code>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Estrutura Central de Navegação</div>
  <div class="command-spotlight-code">if opcao == 1:<br>&nbsp;&nbsp;&nbsp;&nbsp;# Cadastra<br>elif opcao == 2:<br>&nbsp;&nbsp;&nbsp;&nbsp;# Lista<br>elif opcao == 0:<br>&nbsp;&nbsp;&nbsp;&nbsp;rodando = False</div>
  <ul class="command-spotlight-breakdown">
    <li><code>rodando = False</code> → Interrompe o loop do while e encerra o aplicativo com elegância.</li>
  </ul>
</div>

<p>Veja no rodapé da aula o <strong>Estado do Projeto</strong>: agora você tem uma aplicação de console totalmente funcional que você pode abrir no VS Code e interagir à vontade!</p>`,
            "# Arquitetura de menu profissional\nexecutando = True\n\nwhile executando:\n    print(\"\n--- MENU DE TAREFAS ---\")\n    print(\"1. Adicionar\")\n    print(\"2. Sair\")\n    op = input(\"Opção: \")\n    \n    if op == \"1\":\n        item = input(\"Nome do item: \")\n        print(f\"Salvo: {item}\")\n    elif op == \"2\":\n        print(\"Saindo...\")\n        executando = False",
            c("Escreva a linha de código para encerrar o loop principal, definindo a variável sistema_ativo como False.", "# Altere a variável de controle aqui", "sistema_ativo = False", "Atribua False para sistema_ativo com F maiúsculo: sistema_ativo = False", "sistema_ativo = False"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 2: Menu Interativo Completo\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\nsistema_ativo = True\n\n# Última tarefa cadastrada na memória temporária\nultima_tarefa = \"Nenhuma tarefa cadastrada ainda\"\n\nwhile sistema_ativo:\n    print(\"\n====================================\")\n    print(f\"=== {nome_app} (v{versao_app}) ===\")\n    print(\"====================================\")\n    print(\"1 - Cadastrar Nova Tarefa\")\n    print(\"2 - Ver Última Tarefa\")\n    print(\"0 - Sair do Sistema\")\n    print(\"------------------------------------\")\n    \n    opcao = int(input(\"Escolha uma opção: \"))\n    \n    if opcao == 1:\n        titulo = input(\"Digite o título da tarefa: \")\n        if titulo != \"\":\n            ultima_tarefa = titulo\n            print(f\"✅ Tarefa '{titulo}' salva com sucesso!\")\n        else:\n            print(\"❌ Erro: o título não pode ser vazio.\")\n    elif opcao == 2:\n        print(f\"📋 Tarefa no sistema: {ultima_tarefa}\")\n    elif opcao == 0:\n        print(\"👋 Encerrando o Gerenciador. Parabéns pelo foco hoje!\")\n        sistema_ativo = False\n    else:\n        print(\"⚠️ Opção inválida! Por favor, escolha 1, 2 ou 0.\")")
        ]
      },

      // ── Módulo 3 — Estruturas de Dados das Tarefas (Listas e Dicionários) ──
      {
        title: "Módulo 3 — Estruturas de Dados das Tarefas (Listas e Dicionários)",
        lessons: [
          L('py-3-1', "Listas em Python: O Fichário de Múltiplas Tarefas",
            `<h3>🗂️ O fichário com várias gavetas no consultório</h3>
<p>Até agora, nosso programa só conseguia guardar uma única tarefa em uma variável. Se você cadastrasse uma segunda, a primeira era substituída e sumia para sempre na memória.</p>

<p>Pense numa secretária em um consultório médico: ela não tem uma folha de papel na mesa para atender um paciente só. Ela tem um <strong>fichário</strong> organizado com várias fichas enfileiradas uma atrás da outra.</p>

<p>No Python, chamamos essa coleção ordenada de <strong>lista</strong> (tipo <code>list</code>). Uma lista usa <strong>colchetes <code>[ ]</code></strong> e separa cada item com uma vírgula. Ela pode crescer tanto quanto a memória do computador permitir!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Criando uma Lista Vazia para Tarefas</div>
  <div class="command-spotlight-code">lista_tarefas = []</div>
  <ul class="command-spotlight-breakdown">
    <li><code>lista_tarefas</code> → O nome da coleção.</li>
    <li><code>[ ]</code> → Colchetes vazios indicam uma lista pronta para receber novos itens.</li>
  </ul>
</div>

<pre><code># Criando uma lista com tarefas iniciais
tarefas = ["Estudar Python", "Fazer exercícios", "Descansar"]

print("Quantidade de tarefas na lista:")
print(len(tarefas))
</code></pre>

<p>Esta é a aula inaugural do nosso módulo sobre estruturas de dados — sem atividades para resolver. Na próxima aula, vamos aprender a colocar novos itens na lista usando o método append!</p>`,
            "# Criando e imprimindo listas\ntarefas = [\"Revisar código\", \"Enviar email\"]\nprint(tarefas)",
            null,
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 3: Estruturas de Dados\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\nsistema_ativo = True\n\n# Lista principal para armazenar todas as tarefas do usuário\nlista_de_tarefas = []\n\nprint(f\"=== {nome_app} ===\")\nprint(f\"Sistema iniciado com {len(lista_de_tarefas)} tarefas na lista.\")"),

          L('py-3-2', "Adicionando e Removendo Itens: Os Métodos append() e remove()",
            `<h3>🛒 O carrinho de compras no supermercado</h3>
<p>Quando você entra no mercado com um carrinho vazio, você caminha pelos corredores e vai <strong>adicionando</strong> produtos dentro dele. Se mudar de ideia sobre uma bolacha, você simplesmente <strong>tira</strong> o pacote do carrinho.</p>

<p>As listas em Python têm ações próprias chamadas de <strong>métodos</strong>:</p>
<ul>
  <li><code>lista.append("item")</code> → Adiciona o novo item no finalzinho da lista.</li>
  <li><code>lista.remove("item")</code> → Procura o item e o remove da lista.</li>
  <li><code>len(lista)</code> → Devolve quantos itens existem guardados ali no momento.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Adicionando um Elemento na Lista</div>
  <div class="command-spotlight-code">lista_tarefas.append(novo_titulo)</div>
  <ul class="command-spotlight-breakdown">
    <li><code>.append(...)</code> → Empurra o elemento para a última posição da coleção.</li>
  </ul>
</div>

<pre><code># Adicionando tarefas dinamicamente
minhas_tarefas = []
minhas_tarefas.append("Montar o wireframe")
minhas_tarefas.append("Configurar o Git")

print("Tarefas acumuladas:", minhas_tarefas)
</code></pre>

<p>Na próxima aula, vamos aprender a listar cada tarefa uma por uma na tela usando o laço for!</p>`,
            "# Testando adição e remoção\ncompras = []\ncompras.append(\"Café\")\ncompras.append(\"Açúcar\")\nprint(\"Lista atual:\", compras)\n\ncompras.remove(\"Açúcar\")\nprint(\"Após remoção:\", compras)",
            c("Use o método append para adicionar a variável nova_tarefa ao final da lista chamada lista_tarefas.", "# Adicione o item aqui", "lista_tarefas.append(nova_tarefa)", "Escreva lista_tarefas.append(nova_tarefa) chamando o método com a variável entre parênteses.", "lista_tarefas.append(nova_tarefa)"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 3: Adicionando Tarefas na Lista\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\nsistema_ativo = True\nlista_de_tarefas = []\n\nwhile sistema_ativo:\n    print(\"\n1 - Adicionar Tarefa | 2 - Ver Quantidade | 0 - Sair\")\n    op = int(input(\"Opção: \"))\n    \n    if op == 1:\n        titulo = input(\"Nome da tarefa: \")\n        if titulo != \"\":\n            lista_de_tarefas.append(titulo)\n            print(f\"✅ '{titulo}' inserida na lista!\")\n    elif op == 2:\n        print(f\"Total de tarefas cadastradas: {len(lista_de_tarefas)}\")\n    elif op == 0:\n        sistema_ativo = False"),

          L('py-3-3', "Percorrendo a Lista com for: Exibindo Cada Tarefa Numerada",
            `<h3>📜 O pregoeiro lendo a lista de convocados</h3>
<p>Imagine o pregoeiro na praça abrindo um pergaminho longo: ele lê o primeiro nome, depois o segundo, depois o terceiro, até chegar ao final do papel. Ele não pula nenhum item.</p>

<p>O laço <strong>for</strong> no Python faz exatamente essa leitura sequencial. Ele visita cada elemento da lista, coloca o item atual em uma variável temporária e executa o bloco de comandos para aquele elemento!</p>

<p>Para numerar as tarefas (1, 2, 3...), combinamos o <code>for</code> com a função especial <code>enumerate()</code>:</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Laço for com enumerate</div>
  <div class="command-spotlight-code">for i, tarefa in enumerate(lista_tarefas, start=1):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(f"{i}. {tarefa}")</div>
  <ul class="command-spotlight-breakdown">
    <li><code>i</code> → O número da posição da tarefa (1, 2, 3...).</li>
    <li><code>tarefa</code> → O texto da tarefa da vez.</li>
    <li><code>start=1</code> → Começa a contagem visual pelo número 1 e não pelo 0.</li>
  </ul>
</div>

<pre><code># Exibindo a lista formatada para o usuário
tarefas = ["Comprar pão", "Ler 10 páginas", "Enviar relatório"]

print("--- SUAS TAREFAS DE HOJE ---")
for posicao, item in enumerate(tarefas, start=1):
    print(f"[{posicao}] {item}")
</code></pre>

<p>Agora a opção 'Listar Tarefas' do nosso projeto já consegue mostrar todas as pendências numeradas!</p>`,
            "# Exemplo simples com for\nitens = [\"Foco\", \"Disciplina\", \"Consistência\"]\nfor palavra in itens:\n    print(\"Meta:\", palavra)",
            c("Escreva a linha inicial de um laço for que percorre cada item da lista chamada tarefas (coloque dois pontos no final).", "# Escreva o laço for aqui", "for item in tarefas:", "Escreva for item in tarefas: com dois pontos no final.", "for item in tarefas:"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 3: Listagem Formatada com for e enumerate\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\nsistema_ativo = True\nlista_de_tarefas = [\"Estudar Python\", \"Fazer exercícios da Edev\"]\n\nwhile sistema_ativo:\n    print(\"\n1 - Adicionar Tarefa | 2 - Listar Tarefas | 0 - Sair\")\n    op = int(input(\"Opção: \"))\n    \n    if op == 1:\n        t = input(\"Nova tarefa: \")\n        if t != \"\":\n            lista_de_tarefas.append(t)\n            print(f\"✅ Adicionada!\")\n    elif op == 2:\n        print(\"\n--- SUAS TAREFAS ATUAIS ---\")\n        if len(lista_de_tarefas) == 0:\n            print(\"Nenhuma tarefa pendente.\")\n        else:\n            for i, t in enumerate(lista_de_tarefas, start=1):\n                print(f\"[{i}] {t}\")\n    elif op == 0:\n        sistema_ativo = False"),

          L('py-3-4', "Dicionários em Python: A Ficha Cadastral da Tarefa",
            `<h3>🪪 A carteira de identidade com vários campos</h3>
<p>Olhe para sua carteira de identidade ou documento de motorista: ela não tem apenas o seu nome jogado. Ela tem campos rotulados: <em>Nome: Carlos</em>, <em>Data de Nascimento: 15/03/1995</em>, <em>Órgão Emissor: SSP</em>.</p>

<p>Uma tarefa de verdade também não é apenas uma palavra. Ela tem um <strong>título</strong>, uma <strong>prioridade</strong> e um status de <strong>conclusão</strong>. Para juntar todos esses campos diferentes em um objeto só, o Python oferece os <strong>dicionários</strong> (tipo <code>dict</code>)!</p>

<p>Um dicionário usa <strong>chaves <code>{ }</code></strong> e organiza as informações em pares de <strong>chave: valor</strong>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Criando um Dicionário de Tarefa</div>
  <div class="command-spotlight-code">tarefa = {<br>&nbsp;&nbsp;&nbsp;&nbsp;"titulo": "Estudar Python",<br>&nbsp;&nbsp;&nbsp;&nbsp;"prioridade": "Alta",<br>&nbsp;&nbsp;&nbsp;&nbsp;"concluida": False<br>}</div>
  <ul class="command-spotlight-breakdown">
    <li><code>"titulo"</code> → A chave (o nome do campo).</li>
    <li><code>"Estudar Python"</code> → O valor associado àquela chave.</li>
  </ul>
</div>

<pre><code># Criando uma ficha de tarefa completa
tarefa_exemplo = {
    "titulo": "Preparar almoço",
    "prioridade": "Normal",
    "concluida": False
}

print(tarefa_exemplo)
</code></pre>

<p>Na próxima aula, vamos aprender a acessar e alterar os campos de um dicionário!</p>`,
            "# Dicionário de configuração da aplicação\napp_config = {\n    \"nome\": \"Gerenciador Edev\",\n    \"versao\": \"1.0\",\n    \"modo_escuro\": True\n}\nprint(app_config)",
            c("Crie um dicionário com a chave \"titulo\" recebendo o valor \"Estudar\" (lembre-se de usar chaves { }).", "# Crie o dicionário aqui", "tarefa = {\"titulo\": \"Estudar\"}", "Escreva tarefa = {\"titulo\": \"Estudar\"} com aspas nas chaves e nos valores.", "tarefa = {\"titulo\": \"Estudar\"}"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 3: Ficha da Tarefa com Dicionário\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\n\n# Modelo de dados de uma tarefa rica\ntarefa_modelo = {\n    \"id\": 1,\n    \"titulo\": \"Configurar ambiente\",\n    \"prioridade\": \"Alta\",\n    \"concluida\": False\n}\n\nprint(f\"=== {nome_app} ===\")\nprint(\"Estrutura de dados pronta para tarefas completas!\")"),

          L('py-3-5', "Acessando e Modificando Valores: Marcando Tarefas como Feitas",
            `<h3>✏️ Marcando com caneta marca-texto</h3>
<p>Imagine uma prancheta de tarefas impressa: quando você termina de limpar a casa, você pega uma caneta e faz um "V" verde na coluna de status daquela linha.</p>

<p>Para ler ou alterar uma informação dentro de um dicionário em Python, usamos o nome da variável seguido de <strong>colchetes com o nome da chave entre aspas</strong>:</p>
<ul>
  <li><code>tarefa["titulo"]</code> → Lê o valor da chave título.</li>
  <li><code>tarefa["concluida"] = True</code> → Atualiza o valor para Verdadeiro!</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Alterando um Campo do Dicionário</div>
  <div class="command-spotlight-code">tarefa["concluida"] = True</div>
  <ul class="command-spotlight-breakdown">
    <li><code>["concluida"]</code> → Indica qual chave queremos modificar.</li>
    <li><code>= True</code> → Grava o novo valor booleano no campo.</li>
  </ul>
</div>

<pre><code># Modificando o estado de uma tarefa
tarefa = {"titulo": "Lavar o carro", "concluida": False}

print(f"Antes: Concluída? {tarefa['concluida']}")

# Marcando como feita!
tarefa["concluida"] = True
print(f"Depois: Concluída? {tarefa['concluida']}")
</code></pre>

<p>Na próxima aula, vamos juntar listas e dicionários para criar o banco de dados em memória do nosso aplicativo!</p>`,
            "# Acessando campos do dicionário\naluno = {\"nome\": \"Lucas\", \"curso\": \"Python\"}\nprint(\"Nome do aluno:\", aluno[\"nome\"])\n\n# Modificando valor\naluno[\"curso\"] = \"Python Avançado\"\nprint(\"Curso atualizado:\", aluno[\"curso\"])",
            c("Altere a chave \"concluida\" do dicionário tarefa para o valor booleano True.", "# Modifique o campo aqui", "tarefa[\"concluida\"] = True", "Escreva tarefa[\"concluida\"] = True com o T maiúsculo em True.", "tarefa[\"concluida\"] = True"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 3: Atualizando Status de Tarefas\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\n\ntarefa = {\n    \"titulo\": \"Estudar estruturas de dados\",\n    \"prioridade\": \"Alta\",\n    \"concluida\": False\n}\n\n# Simulando a conclusão da tarefa\ntarefa[\"concluida\"] = True\n\nstatus = \"Concluída\" if tarefa[\"concluida\"] else \"Pendente\"\nprint(f\"Tarefa: {tarefa['titulo']} [{status}]\")"),

          L('py-3-6', "Lista de Dicionários: A Estrutura Central do Gerenciador",
            `<h3>🗄️ A pasta suspensa cheia de formulários preenchidos</h3>
<p>Pense numa gaveta de arquivo de aço: dentro dela existem 50 pastas suspensas. Cada pasta suspensa contém um formulário completo com nome, idade e endereço de uma pessoa diferente.</p>

<p>Em programação, a união de uma <strong>lista</strong> com <strong>dicionários</strong> é a estrutura mais poderosa e comum do mundo. A lista é a gaveta inteira (que aceita dezenas de itens); cada elemento dentro dela é um dicionário independente!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Lista de Dicionários no Gerenciador</div>
  <div class="command-spotlight-code">tarefas = [<br>&nbsp;&nbsp;&nbsp;&nbsp;{"titulo": "Estudar Python", "concluida": False},<br>&nbsp;&nbsp;&nbsp;&nbsp;{"titulo": "Pagar boletos", "concluida": True}<br>]</div>
  <ul class="command-spotlight-breakdown">
    <li><code>[ ]</code> → A lista que guarda todas as tarefas.</li>
    <li><code>{ }</code> → Cada tarefa individual com seus próprios atributos.</li>
  </ul>
</div>

<pre><code># Cadastro de múltiplas tarefas completas
tarefas = []

tarefas.append({"titulo": "Aprender listas", "concluida": True})
tarefas.append({"titulo": "Dominar dicionários", "concluida": False})

for t in tarefas:
    print(f"- {t['titulo']} (Feita: {t['concluida']})")
</code></pre>

<p>Veja no rodapé como o projeto agora consegue cadastrar tarefas completas com título e status!</p>`,
            "# Percorrendo uma lista de dicionários\nprodutos = [\n    {\"nome\": \"Mouse\", \"preco\": 80.0},\n    {\"nome\": \"Teclado\", \"preco\": 150.0}\n]\n\nfor p in produtos:\n    print(f\"Item: {p['nome']} por R$ {p['preco']}\")",
            c("Adicione um novo dicionário {\"titulo\": novo_titulo, \"concluida\": False} à lista tarefas usando o método append.", "# Adicione o dicionário à lista aqui", "tarefas.append({\"titulo\": novo_titulo, \"concluida\": False})", "Escreva tarefas.append({\"titulo\": novo_titulo, \"concluida\": False}) com colchetes e chaves corretos.", "tarefas.append({\"titulo\": novo_titulo, \"concluida\": False})"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 3: Lista de Dicionários\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\nsistema_ativo = True\n\n# O banco de dados em memória do nosso gerenciador!\ntarefas = [\n    {\"titulo\": \"Configurar ambiente\", \"concluida\": True},\n    {\"titulo\": \"Aprender listas e dicionários\", \"concluida\": True},\n    {\"titulo\": \"Construir filtros de busca\", \"concluida\": False}\n]\n\nprint(f\"=== {nome_app} ===\")\nprint(f\"Banco em memória carregado com {len(tarefas)} tarefas.\")"),

          L('py-3-7', "Filtrando Tarefas: Separando Pendentes e Concluídas",
            `<h3>🔍 A peneira do garimpeiro separando pedras de ouro</h3>
<p>Imagine um garimpeiro na beira do rio com uma bateia: a água e a areia passam pelos furos, e apenas as pedras que interessam ficam na peneira.</p>

<p>Quando o usuário abre o Gerenciador de Tarefas depois de um dia corrido, ele não quer ver 40 tarefas que já fez. Ele quer bater o olho e ver apenas <strong>o que ainda está pendente</strong>. Para isso, combinamos o laço <code>for</code> com o <code>if</code>!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Filtrando Tarefas Pendentes</div>
  <div class="command-spotlight-code">for t in tarefas:<br>&nbsp;&nbsp;&nbsp;&nbsp;if not t["concluida"]:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(f"[PENDENTE] {t['titulo']}")</div>
  <ul class="command-spotlight-breakdown">
    <li><code>not t["concluida"]</code> → É o mesmo que <code>t["concluida"] == False</code> ("se NÃO estiver concluída").</li>
  </ul>
</div>

<p>Veja no rodapé da aula o <strong>Estado do Projeto</strong>: encerramos o Módulo 3 com cadastro de tarefas, listagem completa, marcação de concluída e filtros de visualização!</p>`,
            "# Exemplo de filtragem de dados\nnumeros = [10, 25, 30, 45, 50]\nprint(\"Números maiores que 20:\")\nfor n in numeros:\n    if n > 20:\n        print(n)",
            c("Escreva a linha condicional que verifica se a tarefa está pendente usando if not t[\"concluida\"]:", "# Escreva o if do filtro aqui", "if not t[\"concluida\"]:", "Escreva if not t[\"concluida\"]: com dois pontos no final.", "if not t[\"concluida\"]:"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 3: Estruturas de Dados e Filtros Completos\n\nnome_app = \"Gerenciador Edev\"\nversao_app = \"1.0\"\nsistema_ativo = True\n\ntarefas = [\n    {\"titulo\": \"Instalar VS Code\", \"concluida\": True},\n    {\"titulo\": \"Estudar controle de fluxo\", \"concluida\": True},\n    {\"titulo\": \"Praticar modularização e funções\", \"concluida\": False}\n]\n\nwhile sistema_ativo:\n    print(\"\n====================================\")\n    print(f\"=== {nome_app} (v{versao_app}) ===\")\n    print(\"====================================\")\n    print(\"1 - Cadastrar Tarefa\")\n    print(\"2 - Listar Todas as Tarefas\")\n    print(\"3 - Listar Somente Pendentes\")\n    print(\"4 - Concluir uma Tarefa\")\n    print(\"0 - Sair do Sistema\")\n    print(\"------------------------------------\")\n    \n    opcao = int(input(\"Escolha: \"))\n    \n    if opcao == 1:\n        nome = input(\"Título da tarefa: \")\n        if nome != \"\":\n            tarefas.append({\"titulo\": nome, \"concluida\": False})\n            print(f\"✅ '{nome}' cadastrada!\")\n    elif opcao == 2:\n        print(\"\n--- TODAS AS TAREFAS ---\")\n        for i, t in enumerate(tarefas, start=1):\n            status = \"✔ Concluída\" if t[\"concluida\"] else \"⏳ Pendente\"\n            print(f\"[{i}] {t['titulo']} ({status})\")\n    elif opcao == 3:\n        print(\"\n--- TAREFAS PENDENTES ---\")\n        for i, t in enumerate(tarefas, start=1):\n            if not t[\"concluida\"]:\n                print(f\"[{i}] {t['titulo']}\")\n    elif opcao == 4:\n        num = int(input(\"Digite o número da tarefa para concluir: \"))\n        if 1 <= num <= len(tarefas):\n            tarefas[num - 1][\"concluida\"] = True\n            print(\"🎉 Tarefa marcada como concluída!\")\n    elif opcao == 0:\n        print(\"👋 Até logo!\")\n        sistema_ativo = False")
        ]
      },

      // ── Módulo 4 — Modularização e Funções da Aplicação ──
      {
        title: "Módulo 4 — Modularização e Funções da Aplicação",
        lessons: [
          L('py-4-1', "O que é uma Função em Python: A Máquina de Carimbos Reutilizável",
            `<h3>🖨️ A fábrica de carimbos do cartório</h3>
<p>Imagine um escrivão de cartório que precisa escrever à mão o texto "DOCUMENTO AUTENTICADO E REGISTRADO" em 500 certidões todo dia. No final da semana o braço dele cai.</p>

<p>O que ele faz? Ele manda fazer um <strong>carimbo</strong> com aquele texto gravado. A partir daí, basta apertar o carimbo na folha e o texto inteiro é carimbado em um décimo de segundo.</p>

<p>Uma <strong>função</strong> em Python é esse carimbo. É um bloco de código que você batiza com um nome usando a palavra-chave <code>def</code>. Toda vez que você precisar daquele conjunto de instruções, você apenas "chama" a função pelo nome!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Definindo sua Primeira Função</div>
  <div class="command-spotlight-code">def exibir_banner():<br>&nbsp;&nbsp;&nbsp;&nbsp;print("=== GERENCIADOR EDEV ===")<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Organize seu dia com foco")</div>
  <ul class="command-spotlight-breakdown">
    <li><code>def</code> → A palavra que ensina ao Python que estamos criando uma nova função.</li>
    <li><code>exibir_banner()</code> → O nome da função seguido de parênteses e dois pontos.</li>
  </ul>
</div>

<p>Para usar a função depois de criada, basta chamá-la: <code>exibir_banner()</code>.</p>

<pre><code># Criando e chamando a função
def exibir_banner():
    print("====================================")
    print("=== GERENCIADOR DE TAREFAS EDEV ===")
    print("====================================")

# Chamada da função!
exibir_banner()
</code></pre>

<p>Esta é a aula de abertura do nosso módulo sobre funções — sem exercícios para resolver. Na próxima aula, vamos aprender a passar dados específicos para dentro das nossas funções!</p>`,
            "# Exemplo de função simples\ndef saudar_usuario():\n    print(\"Olá! Tenha um dia muito produtivo.\")\n\nsaudar_usuario()",
            null,
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 4: Modularização e Funções\n\n# Função dedicada para desenhar a abertura\ndef exibir_cabecalho():\n    print(\"====================================\")\n    print(\"=== GERENCIADOR DE TAREFAS EDEV ===\")\n    print(\"Organize seu dia com foco e clareza\")\n    print(\"====================================\")\n\n# Chamando no início do sistema\nexibir_cabecalho()"),

          L('py-4-2', "Parâmetros de Funções: Enviando Dados para a Ação de Cadastro",
            `<h3>☕ A cafeteira automática e a escolha do sabor</h3>
<p>Pense numa cafeteira de cápsulas moderna: a máquina é a mesma, mas se você coloca uma cápsula de café expresso, sai café expresso; se você coloca uma cápsula de chá de hortelã, sai chá.</p>

<p>Os <strong>parâmetros</strong> são as cápsulas que você entrega para a função trabalhar. Eles ficam dentro dos parênteses da definição: <code>def cadastrar_tarefa(titulo):</code>. Quando chamamos a função, passamos o valor que queremos processar!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Função com Parâmetro</div>
  <div class="command-spotlight-code">def cadastrar_tarefa(lista, titulo):<br>&nbsp;&nbsp;&nbsp;&nbsp;lista.append({"titulo": titulo, "concluida": False})</div>
  <ul class="command-spotlight-breakdown">
    <li><code>(lista, titulo)</code> → Os dois dados necessários para a função operar.</li>
  </ul>
</div>

<pre><code># Função modular que cadastra uma tarefa em qualquer lista
def adicionar_tarefa(colecao, nome):
    colecao.append({"titulo": nome, "concluida": False})
    print(f"Tarefa '{nome}' inserida com sucesso!")

minhas_tarefas = []
adicionar_tarefa(minhas_tarefas, "Fazer café")
adicionar_tarefa(minhas_tarefas, "Estudar funções")
</code></pre>

<p>Na próxima aula, vamos aprender a fazer a função devolver uma resposta para quem a chamou usando o return!</p>`,
            "# Função com parâmetro simples\ndef saudar_aluno(nome):\n    print(f\"Bem-vindo à aula de hoje, {nome}!\")\n\nsaudar_aluno(\"Mariana\")",
            c("Defina a primeira linha de uma função chamada cadastrar_tarefa que recebe um parâmetro chamado titulo (use def e dois pontos).", "# Defina a função aqui", "def cadastrar_tarefa(titulo):", "Escreva def cadastrar_tarefa(titulo): com dois pontos no final.", "def cadastrar_tarefa(titulo):"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 4: Funções com Parâmetros\n\ntarefas = []\n\ndef cadastrar_tarefa(titulo):\n    if titulo != \"\":\n        tarefas.append({\"titulo\": titulo, \"concluida\": False})\n        print(f\"✅ Tarefa '{titulo}' cadastrada com sucesso!\")\n    else:\n        print(\"❌ Erro: o título não pode ser vazio.\")\n\n# Testando a modularização\ncadastrar_tarefa(\"Organizar ambiente de trabalho\")\ncadastrar_tarefa(\"Revisar código de funções\")\nprint(f\"Total na lista: {len(tarefas)}\")"),

          L('py-4-3', "Retornando Valores com return: Calculando Métricas do Aplicativo",
            `<h3>🥖 O mensageiro que vai à padaria e volta com o pão</h3>
<p>Se você pede para seu irmão ir até a padaria comprar pão, você não quer que ele apenas compre e coma tudo lá. Você espera que ele <strong>volte</strong> e entregue o pacote de pães na sua mão.</p>

<p>A instrução <strong>return</strong> em Python faz exatamente isso. Ela calcula um resultado dentro da função e o <strong>devolve</strong> para quem a chamou, permitindo guardar esse valor em uma variável ou usá-lo em outros cálculos!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Retornando um Valor da Função</div>
  <div class="command-spotlight-code">def contar_pendentes(lista):<br>&nbsp;&nbsp;&nbsp;&nbsp;return sum(1 for t in lista if not t["concluida"])</div>
  <ul class="command-spotlight-breakdown">
    <li><code>return</code> → Devolve o resultado e encerra a execução da função imediatamente.</li>
  </ul>
</div>

<pre><code># Função que calcula e devolve a quantidade de tarefas pendentes
def calcular_pendentes(lista):
    pendentes = 0
    for t in lista:
        if not t["concluida"]:
            pendentes += 1
    return pendentes

tarefas = [
    {"titulo": "A", "concluida": True},
    {"titulo": "B", "concluida": False}
]

total = calcular_pendentes(tarefas)
print(f"Total de pendências: {total}")
</code></pre>

<p>Na próxima aula, vamos entender a diferença entre variáveis criadas dentro e fora de funções com o escopo!</p>`,
            "# Função com return simples\ndef somar(a, b):\n    return a + b\n\nresultado = somar(10, 5)\nprint(\"Resultado da soma:\", resultado)",
            c("Escreva uma instrução dentro de uma função que devolve o valor da variável total usando a palavra return.", "# Escreva o return aqui", "return total", "Digite a palavra return seguida de espaço e o nome da variável total.", "return total"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 4: Funções com Retorno de Dados\n\ntarefas = [\n    {\"titulo\": \"Estudar Python\", \"concluida\": True},\n    {\"titulo\": \"Praticar funções\", \"concluida\": False},\n    {\"titulo\": \"Beber água\", \"concluida\": False}\n]\n\ndef obter_estatisticas(lista):\n    total = len(lista)\n    concluidas = sum(1 for t in lista if t[\"concluida\"])\n    pendentes = total - concluidas\n    return total, concluidas, pendentes\n\ntotal, concluidas, pendentes = obter_estatisticas(tarefas)\nprint(f\"Resumo: {total} tarefas ({concluidas} concluídas, {pendentes} pendentes)\")"),

          L('py-4-4', "Escopo de Variáveis: A Gaveta Pessoal vs O Mural Público",
            `<h3>🏠 A gaveta do seu criado-mudo vs O mural do condomínio</h3>
<p>Se você guarda um relógio na gaveta do seu quarto, só você tem acesso a ele quando está no quarto. Mas um aviso colado no mural do hall do prédio pode ser lido por qualquer morador a qualquer momento.</p>

<p>Em programação, chamamos isso de <strong>escopo</strong>:</p>
<ul>
  <li><strong>Escopo Local:</strong> Variáveis criadas dentro de uma função só existem enquanto aquela função está rodando. Assim que ela termina, a variável desaparece da memória.</li>
  <li><strong>Escopo Global:</strong> Variáveis criadas no corpo principal do arquivo (fora de qualquer função) podem ser lidas por todo o programa.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Compreendendo o Escopo Local</div>
  <div class="command-spotlight-code">def criar_item():<br>&nbsp;&nbsp;&nbsp;&nbsp;codigo = 42  # Variável local (só existe aqui dentro)</div>
  <ul class="command-spotlight-breakdown">
    <li><code>codigo</code> → Se você tentar fazer <code>print(codigo)</code> fora da função, o Python acusará NameError!</li>
  </ul>
</div>

<p>Essa separação é uma bênção: ela impede que uma função altere acidentalmente variáveis de outra parte do sistema!</p>`,
            "# Demonstrando escopo local\ndef calcular():\n    taxa = 0.15 # local\n    print(\"Taxa calculada:\", taxa)\n\ncalcular()",
            c("Crie uma variável local chamada status_temp recebendo o texto \"ativo\" dentro do bloco indentado de uma função.", "    # Crie a variável local com 4 espaços aqui", "    status_temp = \"ativo\"", "Indente com quatro espaços e digite status_temp = \"ativo\".", "    status_temp = \"ativo\""),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 4: Escopo e Organização Limpa\n\nVERSAO_SISTEMA = \"1.0\" # Constante global\n\ndef formatar_titulo(texto):\n    # texto_limpo é uma variável local, segura dentro desta função\n    texto_limpo = texto.strip().capitalize()\n    return texto_limpo\n\nt = formatar_titulo(\"  estudar python na edev  \")\nprint(f\"Título formatado: {t} (App v{VERSAO_SISTEMA})\")"),

          L('py-4-5', "Valores Padrão em Parâmetros: Prioridades Automáticas no Cadastro",
            `<h3>🍔 O combo padrão na lanchonete</h3>
<p>Quando você pede um hambúrguer na lanchonete sem falar nada sobre o queijo, o chapeiro já coloca o queijo padrão da casa. Mas se você disser "quero com queijo cheddar", ele troca a seu pedido.</p>

<p>Em Python, você pode definir um <strong>valor padrão</strong> para um parâmetro colocando <code>parametro = "valor"</code> na hora de criar a função. Se quem chamou não informar nada, o Python usa o padrão!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Parâmetro com Valor Padrão</div>
  <div class="command-spotlight-code">def criar_tarefa(titulo, prioridade="Normal"):<br>&nbsp;&nbsp;&nbsp;&nbsp;return {"titulo": titulo, "prioridade": prioridade, "concluida": False}</div>
  <ul class="command-spotlight-breakdown">
    <li><code>prioridade="Normal"</code> → Se o usuário não informar, será considerada Normal.</li>
  </ul>
</div>

<pre><code># Chamando com e sem o parâmetro opcional
t1 = criar_tarefa("Lavar a louça") # assume prioridade Normal
t2 = criar_tarefa("Pagar imposto", prioridade="Alta") # usa Alta

print(t1)
print(t2)
</code></pre>

<p>Na próxima aula, vamos refatorar o Gerenciador inteiro dividindo cada ação em sua própria função!</p>`,
            "# Função com valor default\ndef exibir_mensagem(texto, autor=\"Sistema\"):\n    print(f\"[{autor}]: {texto}\")\n\nexibir_mensagem(\"Seja bem-vindo!\")\nexibir_mensagem(\"Atenção ao prazo!\", autor=\"Diretoria\")",
            c("Defina a primeira linha de uma função chamada adicionar com o parâmetro titulo e o parâmetro prioridade com valor padrão \"Normal\".", "# Defina a função com parâmetro default aqui", "def adicionar(titulo, prioridade=\"Normal\"):", "Escreva def adicionar(titulo, prioridade=\"Normal\"): com dois pontos no final.", "def adicionar(titulo, prioridade=\"Normal\"):"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 4: Parâmetros com Valores Padrão\n\ntarefas = []\n\ndef cadastrar_tarefa(titulo, prioridade=\"Normal\"):\n    tarefa = {\n        \"titulo\": titulo,\n        \"prioridade\": prioridade,\n        \"concluida\": False\n    }\n    tarefas.append(tarefa)\n    print(f\"✅ '{titulo}' adicionada com prioridade [{prioridade}]!\")\n\ncadastrar_tarefa(\"Enviar relatório mensal\", prioridade=\"Alta\")\ncadastrar_tarefa(\"Regar as plantas\") # usará a prioridade Normal automaticamente"),

          L('py-4-6', "Modularizando o Gerenciador: Código Limpo, Profissional e Escalável",
            `<h3>🏗️ Os blocos de encaixe de um edifício inteligente</h3>
<p>Um engenheiro civil não constrói um prédio com uma massa informe de cimento seco. Ele usa vigas pré-moldadas, tubulações padronizadas e fiação modular. Se uma lâmpada queima, ele não precisa quebrar a parede inteira.</p>

<p>Nesta aula de fechamento do Módulo 4, nós vamos transformar o nosso Gerenciador de Tarefas em uma aplicação verdadeiramente profissional: cada responsabilidade terá sua própria função dedicada:</p>
<ul>
  <li><code>exibir_menu()</code>: Desenha a interface de opções.</li>
  <li><code>adicionar_tarefa()</code>: Coleta os dados e valida o título.</li>
  <li><code>listar_tarefas()</code>: Itera e desenha a lista com status.</li>
  <li><code>concluir_tarefa()</code>: Atualiza o booleano da pendência.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Estrutura Modular Profissional</div>
  <div class="command-spotlight-code">def main():<br>&nbsp;&nbsp;&nbsp;&nbsp;# O loop principal que chama as funções especializadas</div>
  <ul class="command-spotlight-breakdown">
    <li><code>main()</code> → A função central que orquestra todas as outras peças.</li>
  </ul>
</div>

<p>Veja no rodapé da aula o <strong>Estado do Projeto</strong>: nosso código agora é limpo, elegante e pronto para persistência em disco no Módulo 5!</p>`,
            "# Arquitetura modular limpa\ndef menu():\n    print(\"1. Adicionar | 0. Sair\")\n\ndef executar():\n    while True:\n        menu()\n        op = input(\"Opção: \")\n        if op == \"0\":\n            break",
            c("Defina a primeira linha da função principal do sistema chamada main (use def e dois pontos).", "# Defina a função main aqui", "def main():", "Escreva def main(): com parênteses e dois pontos.", "def main():"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 4: Gerenciador de Tarefas Modularizado com Funções\n\ntarefas = []\n\ndef exibir_cabecalho():\n    print(\"\n====================================\")\n    print(\"=== GERENCIADOR DE TAREFAS EDEV ===\")\n    print(\"====================================\")\n\ndef exibir_menu():\n    print(\"1 - Cadastrar Nova Tarefa\")\n    print(\"2 - Listar Todas as Tarefas\")\n    print(\"3 - Listar Somente Pendentes\")\n    print(\"4 - Concluir Tarefa\")\n    print(\"0 - Sair do Sistema\")\n    print(\"------------------------------------\")\n\ndef adicionar_tarefa(titulo, prioridade=\"Normal\"):\n    if titulo.strip() != \"\":\n        tarefas.append({\"titulo\": titulo.strip(), \"prioridade\": prioridade, \"concluida\": False})\n        print(f\"✅ '{titulo}' cadastrada com sucesso!\")\n    else:\n        print(\"❌ Erro: o título não pode ser vazio.\")\n\ndef listar_tarefas(apenas_pendentes=False):\n    print(\"\n--- SUAS TAREFAS ---\")\n    encontradas = 0\n    for i, t in enumerate(tarefas, start=1):\n        if apenas_pendentes and t[\"concluida\"]:\n            continue\n        status = \"✔ Feita\" if t[\"concluida\"] else \"⏳ Pendente\"\n        print(f\"[{i}] {t['titulo']} [{t['prioridade']}] - {status}\")\n        encontradas += 1\n    if encontradas == 0:\n        print(\"Nenhuma tarefa para exibir.\")\n\ndef concluir_tarefa(posicao):\n    if 1 <= posicao <= len(tarefas):\n        tarefas[posicao - 1][\"concluida\"] = True\n        print(f\"🎉 Tarefa '{tarefas[posicao - 1]['titulo']}' marcada como concluída!\")\n    else:\n        print(\"❌ Posição inválida.\")\n\n# Loop principal do aplicativo\ndef main():\n    exibir_cabecalho()\n    while True:\n        exibir_menu()\n        opcao = input(\"Escolha uma opção: \")\n        if opcao == \"1\":\n            nome = input(\"Título: \")\n            prio = input(\"Prioridade (Alta, Normal, Baixa) [Normal]: \")\n            if prio == \"\": prio = \"Normal\"\n            adicionar_tarefa(nome, prio)\n        elif opcao == \"2\":\n            listar_tarefas(apenas_pendentes=False)\n        elif opcao == \"3\":\n            listar_tarefas(apenas_pendentes=True)\n        elif opcao == \"4\":\n            listar_tarefas(apenas_pendentes=False)\n            num = int(input(\"Número da tarefa para concluir: \"))\n            concluir_tarefa(num)\n        elif opcao == \"0\":\n            print(\"👋 Encerrando o Gerenciador. Até a próxima!\")\n            break\n        else:\n            print(\"⚠️ Opção inválida!\")\n\nif __name__ == \"__main__\":\n    main()")
        ]
      },

      // ── Módulo 5 — Persistência em JSON e Conclusão do Gerenciador ──
      {
        title: "Módulo 5 — Persistência em JSON e Conclusão do Gerenciador",
        lessons: [
          L('py-5-1', "Persistência de Dados: O Caderno Físico que Não Apaga no Escuro",
            `<h3>📓 O caderno na cabeceira da cama vs O pensamento passageiro</h3>
<p>Se você tem uma ideia brilhante no meio da noite e não anota, na manhã seguinte ela sumiu da sua memória. Mas se você escreve a caneta em um caderno físico, a anotação estará lá intacta amanhã, semana que vem ou daqui a 10 anos.</p>

<p>A memória RAM do computador é igualzinha ao pensamento noturno: enquanto o programa está rodando, tudo está lá; assim que você fecha o terminal ou desliga o computador, toda a memória RAM é apagada.</p>

<p>Para o nosso Gerenciador de Tarefas ser um produto útil de verdade, ele precisa de <strong>persistência</strong>. Ele precisa gravar a lista de tarefas no disco rígido (SSD) da sua máquina, para que suas pendências estejam salvas quando você reabrir o programa amanhã!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Biblioteca Nativa de JSON do Python</div>
  <div class="command-spotlight-code">import json</div>
  <ul class="command-spotlight-breakdown">
    <li><code>import</code> → Traz para o nosso arquivo um módulo pronto da biblioteca padrão do Python.</li>
    <li><code>json</code> → O módulo oficial especializado em ler e gravar arquivos no padrão JSON.</li>
  </ul>
</div>

<p>Esta é a aula de abertura do nosso módulo final — sem atividades para resolver. Na próxima aula, vamos aprender como o Python abre e fecha arquivos no disco usando a instrução with open!</p>`,
            "# Testando a importação do módulo de persistência\nimport json\n\nprint(\"Módulo JSON pronto para salvar tarefas no disco!\")",
            null,
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 5: Persistência de Dados em Disco\n\nimport json\n\nARQUIVO_BANCO = \"tarefas.json\"\nprint(\"Módulo de persistência carregado com sucesso.\")"),

          L('py-5-2', "Gravando e Lendo Arquivos de Texto: A Instrução with open()",
            `<h3>📖 A pasta de gaveta com fechamento automático</h3>
<p>Imagine abrir uma pasta com documentos confidenciais: você abre, coloca o relatório novo lá dentro e DEVE fechar a pasta com a chave. Se você esquecer a pasta aberta, alguém pode esbarrar e perder tudo.</p>

<p>Em programação, esquecer um arquivo aberto no disco pode travar o arquivo no sistema operacional. Por isso, a comunidade Python criou a instrução <strong>with open(...)</strong>: ela abre o arquivo, executa o que você mandar e <strong>garante que o arquivo será fechado com segurança</strong>, mesmo que aconteça algum erro no meio do caminho!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Abrindo um Arquivo com Segurança</div>
  <div class="command-spotlight-code">with open("dados.txt", "w", encoding="utf-8") as f:<br>&nbsp;&nbsp;&nbsp;&nbsp;f.write("Minha anotação")</div>
  <ul class="command-spotlight-breakdown">
    <li><code>"w"</code> → Modo de escrita (write), cria o arquivo se não existir.</li>
    <li><code>encoding="utf-8"</code> → Garante acentos em português funcionando perfeitamente.</li>
    <li><code>as f</code> → Dá um apelido para o arquivo aberto dentro daquele bloco.</li>
  </ul>
</div>

<pre><code># Escrevendo uma mensagem simples em arquivo de texto
with open("aviso.txt", "w", encoding="utf-8") as arquivo:
    arquivo.write("Primeiro arquivo gravado em Python!")

print("Arquivo salvo no disco com sucesso!")
</code></pre>

<p>Na próxima aula, vamos usar o formato JSON para salvar nossa lista de tarefas inteira com um único comando!</p>`,
            "# Gravando e lendo no disco\nwith open(\"registro.txt\", \"w\", encoding=\"utf-8\") as arq:\n    arq.write(\"Gerenciador Edev v1.0 ativo.\")\n\nwith open(\"registro.txt\", \"r\", encoding=\"utf-8\") as arq:\n    conteudo = arq.read()\n    print(\"Conteúdo lido do arquivo:\", conteudo)",
            c("Escreva a instrução inicial para abrir o arquivo \"tarefas.json\" em modo de escrita (\"w\") com o apelido as arquivo (coloque dois pontos no final).", "# Abra o arquivo com with open aqui", "with open(\"tarefas.json\", \"w\", encoding=\"utf-8\") as arquivo:", "Escreva with open(\"tarefas.json\", \"w\", encoding=\"utf-8\") as arquivo: com dois pontos.", "with open(\"tarefas.json\", \"w\", encoding=\"utf-8\") as arquivo:"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 5: Manipulação Segura de Arquivos\n\nimport json\n\nARQUIVO_BANCO = \"tarefas.json\"\n\ndef testar_gravacao():\n    with open(\"teste.txt\", \"w\", encoding=\"utf-8\") as f:\n        f.write(\"Teste de gravação no disco realizado.\")\n    print(\"✅ Comunicação com o disco operacional!\")\n\ntestar_gravacao()"),

          L('py-5-3', "O Formato JSON e a Função json.dump(): Salvando a Lista de Tarefas",
            `<h3>📦 O pacote para viagem selado a vácuo</h3>
<p>Quando você vai viajar de avião e quer levar roupas na mala, você pode usar sacos selados a vácuo: eles comprimem tudo num formato padrão que qualquer aeroporto do mundo aceita sem desmanchar o conteúdo.</p>

<p>O <strong>JSON</strong> (JavaScript Object Notation) é esse pacote universal da internet. É o formato de dados mais usado por Google, Netflix, bancos e sistemas web em todo o planeta para enviar e salvar informações.</p>

<p>Com a função <code>json.dump()</code>, o Python pega a sua lista cheia de dicionários de tarefas e a traduz diretamente em um arquivo <code>.json</code> formatado e legível!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Salvando a Coleção de Tarefas em JSON</div>
  <div class="command-spotlight-code">with open("tarefas.json", "w", encoding="utf-8") as f:<br>&nbsp;&nbsp;&nbsp;&nbsp;json.dump(tarefas, f, indent=4, ensure_ascii=False)</div>
  <ul class="command-spotlight-breakdown">
    <li><code>json.dump</code> → Pega a variável e escreve no arquivo.</li>
    <li><code>indent=4</code> → Deixa o arquivo visualmente alinhado e fácil de ler no VS Code.</li>
    <li><code>ensure_ascii=False</code> → Mantém acentos como 'ã', 'é' e 'ç' intactos.</li>
  </ul>
</div>

<pre><code># Salvando tarefas no arquivo físico tarefas.json
import json

tarefas = [
    {"titulo": "Estudar Python", "concluida": True},
    {"titulo": "Criar projeto no portfólio", "concluida": False}
]

with open("tarefas.json", "w", encoding="utf-8") as f:
    json.dump(tarefas, f, indent=4, ensure_ascii=False)

print("Tarefas gravadas em tarefas.json com sucesso!")
</code></pre>

<p>Na próxima aula, vamos aprender a ler esse arquivo automaticamente toda vez que o aplicativo for iniciado!</p>`,
            "# Exemplo de serialização JSON\nimport json\n\ndados = {\"usuario\": \"Lucas\", \"xp\": 450}\nwith open(\"perfil.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump(dados, f, indent=4)\nprint(\"Perfil salvo em JSON!\")",
            c("Escreva a chamada da função json.dump passando a variável tarefas e o arquivo f (use json.dump(tarefas, f)).", "# Chame a função json.dump aqui", "json.dump(tarefas, f)", "Escreva json.dump(tarefas, f) passando a lista de tarefas e a referência do arquivo.", "json.dump(tarefas, f)"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 5: Salvamento Permanente com json.dump\n\nimport json\n\nARQUIVO_BANCO = \"tarefas.json\"\n\ntarefas = [\n    {\"titulo\": \"Instalar ferramentas\", \"prioridade\": \"Alta\", \"concluida\": True},\n    {\"titulo\": \"Publicar código no GitHub\", \"prioridade\": \"Alta\", \"concluida\": False}\n]\n\ndef salvar_tarefas():\n    with open(ARQUIVO_BANCO, \"w\", encoding=\"utf-8\") as f:\n        json.dump(tarefas, f, indent=4, ensure_ascii=False)\n    print(\"💾 Todas as tarefas foram salvas com segurança no disco!\")\n\nsalvar_tarefas()"),

          L('py-5-4', "Carregando Dados com json.load(): Recuperando Tarefas ao Iniciar",
            `<h3>🔌 O cofre de segurança que avisa se a chave faltar</h3>
<p>Imagine um segurança abrindo a loja pela manhã: ele vai até a gaveta de documentos para pegar a pasta de clientes. Se a pasta estiver lá, ele abre e começa a trabalhar; se a loja foi inaugurada hoje e a pasta ainda não existe, ele não entra em pânico — ele simplesmente pega uma pasta nova em branco.</p>

<p>Para carregar os dados salvos em disco, usamos <code>json.load(f)</code>. Mas e se o usuário estiver abrindo o Gerenciador pela primeira vez e o arquivo <code>tarefas.json</code> ainda não existir? O Python dispararia um erro chamado <code>FileNotFoundError</code>!</p>

<p>Para lidar com isso de forma profissional, usamos o bloco <strong>try / except</strong> (tente / caso falhe): ele tenta carregar o arquivo; se não encontrar, cria uma lista vazia sem quebrar o programa!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Carregamento Seguro com try / except</div>
  <div class="command-spotlight-code">try:<br>&nbsp;&nbsp;&nbsp;&nbsp;with open("tarefas.json", "r", encoding="utf-8") as f:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tarefas = json.load(f)<br>except FileNotFoundError:<br>&nbsp;&nbsp;&nbsp;&nbsp;tarefas = []</div>
  <ul class="command-spotlight-breakdown">
    <li><code>try</code> → Tenta executar o bloco de leitura.</li>
    <li><code>json.load(f)</code> → Reconstrói a lista e os dicionários Python a partir do JSON.</li>
    <li><code>except FileNotFoundError</code> → Captura graciosamente a ausência do arquivo.</li>
  </ul>
</div>

<pre><code># Carregando com proteção total contra falhas
import json

def carregar_dados():
    try:
        with open("tarefas.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

tarefas_carregadas = carregar_dados()
print(f"Tarefas restauradas da sessão anterior: {len(tarefas_carregadas)}")
</code></pre>

<p>Na próxima aula, vamos juntar tudo na versão final do seu Gerenciador de Tarefas!</p>`,
            "# Leitura simples com json.load\nimport json\n\ntry:\n    with open(\"tarefas.json\", \"r\", encoding=\"utf-8\") as f:\n        dados = json.load(f)\n        print(\"Lido:\", dados)\nexcept FileNotFoundError:\n    print(\"Arquivo ainda não existe. Criando nova sessão.\")",
            c("Escreva a instrução que lê os dados do arquivo f usando json.load e guarda na variável tarefas (use tarefas = json.load(f)).", "# Carregue os dados do arquivo aqui", "tarefas = json.load(f)", "Escreva tarefas = json.load(f) atribuindo o resultado da leitura.", "tarefas = json.load(f)"),
            "# app.py - Projeto Gerenciador de Tarefas Edev\n# Módulo 5: Carregamento Automático com json.load\n\nimport json\n\nARQUIVO_BANCO = \"tarefas.json\"\n\ndef carregar_tarefas():\n    try:\n        with open(ARQUIVO_BANCO, \"r\", encoding=\"utf-8\") as f:\n            return json.load(f)\n    except FileNotFoundError:\n        return []\n\ntarefas = carregar_tarefas()\nprint(f\"✅ {len(tarefas)} tarefas recuperadas do disco com sucesso!\")"),

          L('py-5-5', "O Gerenciador de Tarefas Completo: Seu Primeiro Grande Portfólio",
            `<h3>🏆 Olhe para trás e veja o caminho que você construiu</h3>
<p>Lembra da primeira aula, quando conversamos sobre como aprender programação parecia difícil e confuso na internet? Olhe onde você chegou hoje.</p>

<p>Você não apenas decorou comandos. Você aprendeu a pensar como um desenvolvedor de software: construiu variáveis, entendeu tipos de dados, dominou condições lógicas, laços de repetição, estruturas com listas e dicionários, dividiu seu código em funções modulares elegantes e implementou persistência permanente em disco com arquivos JSON.</p>

<p>O seu <strong>Gerenciador de Tarefas no Terminal</strong> é uma aplicação real, completa, útil e que você pode subir para o seu GitHub para mostrar com orgulho em qualquer entrevista de emprego.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Executando seu Portfólio Final</div>
  <div class="command-spotlight-code">python app.py</div>
  <ul class="command-spotlight-breakdown">
    <li><code>python app.py</code> → Roda seu sistema completo com salvamento automático!</li>
  </ul>
</div>

<p>Veja no rodapé da aula o <strong>Estado do Projeto</strong>: o código fonte completo do seu projeto, comentado linha por linha, pronto para ser o seu troféu de conclusão!</p>`,
            "# Parabéns por concluir o curso de Python da Edev!\n# Seu Gerenciador de Tarefas está completo, persistente e modularizado.\nprint(\"====================================\")\nprint(\"  CERTIFICADO DE CONCLUSÃO — PYTHON \")\nprint(\"====================================\")",
            c("Digite o comando de terminal para rodar com orgulho o seu aplicativo finalizado: python app.py", "# Digite o comando de execução final aqui", "python app.py", "Escreva python seguido de espaço e app.py.", "python app.py"),
            "# ============================================================\n# PROJETO FINAL: Gerenciador de Tarefas (To-Do List) no Terminal\n# Plataforma Edev — Curso: Python — Lógica de Programação\n# Arquivo: app.py\n# ============================================================\n\nimport json\nimport os\n\nARQUIVO_BANCO = \"tarefas.json\"\n\ndef carregar_tarefas():\n    \"\"\"Carrega as tarefas salvas do arquivo JSON ou retorna lista vazia.\"\"\"\n    if os.path.exists(ARQUIVO_BANCO):\n        try:\n            with open(ARQUIVO_BANCO, \"r\", encoding=\"utf-8\") as f:\n                return json.load(f)\n        except Exception:\n            return []\n    return []\n\ndef salvar_tarefas(tarefas):\n    \"\"\"Grava a lista de tarefas no disco em formato JSON identado.\"\"\"\n    with open(ARQUIVO_BANCO, \"w\", encoding=\"utf-8\") as f:\n        json.dump(tarefas, f, indent=4, ensure_ascii=False)\n\ndef exibir_cabecalho():\n    \"\"\"Desenha o banner de abertura da aplicação.\"\"\"\n    print(\"\n====================================\")\n    print(\"=== GERENCIADOR DE TAREFAS EDEV ===\")\n    print(\"Organize seu dia com foco e clareza\")\n    print(\"====================================\")\n\ndef exibir_menu():\n    \"\"\"Apresenta as opções interativas para o usuário.\"\"\"\n    print(\"\n[1] Cadastrar Nova Tarefa\")\n    print(\"[2] Listar Todas as Tarefas\")\n    print(\"[3] Listar Apenas Tarefas Pendentes\")\n    print(\"[4] Concluir uma Tarefa\")\n    print(\"[5] Excluir uma Tarefa\")\n    print(\"[0] Salvar e Sair do Sistema\")\n    print(\"------------------------------------\")\n\ndef cadastrar_tarefa(tarefas):\n    \"\"\"Coleta os dados do teclado e adiciona uma nova tarefa na coleção.\"\"\"\n    titulo = input(\"Digite o título da tarefa: \").strip()\n    if not titulo:\n        print(\"❌ O título não pode ser vazio!\")\n        return\n    \n    prioridade = input(\"Prioridade (Alta, Normal, Baixa) [Normal]: \").strip().capitalize()\n    if prioridade not in [\"Alta\", \"Normal\", \"Baixa\"]:\n        prioridade = \"Normal\"\n        \n    nova = {\n        \"titulo\": titulo,\n        \"prioridade\": prioridade,\n        \"concluida\": False\n    }\n    tarefas.append(nova)\n    salvar_tarefas(tarefas)\n    print(f\"✅ Tarefa '{titulo}' cadastrada com sucesso!\")\n\ndef listar_tarefas(tarefas, apenas_pendentes=False):\n    \"\"\"Exibe a listagem numerada de tarefas com seus respectivos status.\"\"\"\n    print(\"\n--- SUAS TAREFAS ---\")\n    exibidas = 0\n    for i, t in enumerate(tarefas, start=1):\n        if apenas_pendentes and t[\"concluida\"]:\n            continue\n        status = \"✔ Feita\" if t[\"concluida\"] else \"⏳ Pendente\"\n        print(f\"[{i}] {t['titulo']} [{t['prioridade']}] — {status}\")\n        exibidas += 1\n        \n    if exibidas == 0:\n        print(\"Nenhuma tarefa para exibir nesta visualização.\")\n\ndef concluir_tarefa(tarefas):\n    \"\"\"Marca uma tarefa pendente como concluída.\"\"\"\n    listar_tarefas(tarefas, apenas_pendentes=True)\n    try:\n        pos = int(input(\"Digite o número da tarefa a concluir: \"))\n        if 1 <= pos <= len(tarefas):\n            tarefas[pos - 1][\"concluida\"] = True\n            salvar_tarefas(tarefas)\n            print(f\"🎉 Parabéns! Tarefa '{tarefas[pos - 1]['titulo']}' concluída!\")\n        else:\n            print(\"❌ Número de tarefa inválido.\")\n    except ValueError:\n        print(\"❌ Digite um número válido.\")\n\ndef excluir_tarefa(tarefas):\n    \"\"\"Remove uma tarefa da lista.\"\"\"\n    listar_tarefas(tarefas)\n    try:\n        pos = int(input(\"Digite o número da tarefa para remover: \"))\n        if 1 <= pos <= len(tarefas):\n            removida = tarefas.pop(pos - 1)\n            salvar_tarefas(tarefas)\n            print(f\"🗑️ Tarefa '{removida['titulo']}' excluída com sucesso.\")\n        else:\n            print(\"❌ Número de tarefa inválido.\")\n    except ValueError:\n        print(\"❌ Digite um número válido.\")\n\ndef main():\n    \"\"\"Função principal que orquestra o ciclo de vida da aplicação.\"\"\"\n    tarefas = carregar_tarefas()\n    exibir_cabecalho()\n    print(f\"📌 {len(tarefas)} tarefas carregadas do arquivo {ARQUIVO_BANCO}.\")\n    \n    while True:\n        exibir_menu()\n        opcao = input(\"Escolha uma opção: \").strip()\n        \n        if opcao == \"1\":\n            cadastrar_tarefa(tarefas)\n        elif opcao == \"2\":\n            listar_tarefas(tarefas, apenas_pendentes=False)\n        elif opcao == \"3\":\n            listar_tarefas(tarefas, apenas_pendentes=True)\n        elif opcao == \"4\":\n            concluir_tarefa(tarefas)\n        elif opcao == \"5\":\n            excluir_tarefa(tarefas)\n        elif opcao == \"0\":\n            salvar_tarefas(tarefas)\n            print(\"\n💾 Dados salvos com segurança. Até a próxima!\")\n            break\n        else:\n            print(\"⚠️ Opção inválida! Escolha uma opção do menu.\")\n\nif __name__ == \"__main__\":\n    main()")
        ]
      }
    ]
  },

  java: {
    id: "java",
    name: "Java Completo: Do Zero ao Profissional",
    tag: "Java + POO + Arquivos",
    hours: "45 horas",
    desc: "Construa uma aplicação corporativa robusta do zero. Domine tipos primitivos, controle de fluxo, métodos, Orientação a Objetos, Collections e persistência.",
    modules: [
      // ── Módulo 0 — Configuração do Ambiente e Fundamentos ──
      {
        title: "Módulo 0 — Configuração do Ambiente e Fundamentos",
        lessons: [
          L('java-0-0', "Como este curso funciona — Sua jornada e o projeto do Sistema Escolar",
            `<h3>☕ Bem-vindo ao universo corporativo do Java!</h3>
<p>Puxa uma cadeira e respira fundo. Se você já ouviu falar que Java é uma linguagem difícil, pesada ou cheia de regras chatas, deixa eu te contar um segredo de quem vive no mercado há anos.</p>

<p>O Java não é rígido à toa. Ele é como a engenharia de um avião comercial: cada parafuso, cada trava de segurança e cada sensor existem para garantir que nada caia lá de cima, mesmo enfrentando tempestades violentas.</p>

<h3>🏫 O Projeto do Curso: Sistema de Gestão de Alunos</h3>
<p>Aqui você não vai ficar decorando regras de sintaxe sem contexto. Tudo o que aprendermos servirá para construir um <strong>Sistema de Gestão Escolar</strong> completo para rodar no terminal, com cadastro de matrículas, cálculo de médias, boletins e persistência de dados em arquivo.</p>

<p>Esta aula foi só de apresentação — sem tarefa para você resolver. Na próxima, vamos entender o segredo por trás do sucesso global do Java!</p>`,
            "// === PROJETO DO CURSO: Sistema de Gestão de Alunos ===\n// Ao longo das aulas, você construirá uma aplicação corporativa robusta em Java.",
            null,
            "// === PROJETO DO CURSO: Sistema de Gestão de Alunos ===\n// Este bloco vai mostrar seu código evoluindo aula a aula.\n// Na próxima aula, começamos a escrever juntos!"),

          L('java-0-1', "Por que Java move o mercado? — A Máquina Virtual (JVM)",
            `<h3>🌍 O passaporte diplomático universal</h3>
<p>Imagine que você precisa viajar por 50 países diferentes. Em cada país comum, você precisaria tirar um visto novo, traduzir sua identidade e aprender as leis locais do zero para conseguir alugar um carro.</p>

<p>O Java criou algo revolucionário nos anos 90 chamado <strong>JVM (Java Virtual Machine)</strong>. O lema histórico é: <em>"Write Once, Run Anywhere"</em> (Escreva uma vez, rode em qualquer lugar).</p>

<h3>⚙️ Como a mágica funciona: Código &rarr; Bytecode &rarr; Máquina</h3>
<p>Quando você programa em C ou C++, o código compila diretamente para o processador específico daquele computador. Já no Java:</p>
<ol>
  <li>Você escreve o arquivo <code>.java</code> em texto puro.</li>
  <li>O compilador <code>javac</code> transforma seu código em <strong>Bytecode</strong> (um arquivo intermediário <code>.class</code>).</li>
  <li>A <strong>JVM</strong> instalada no Windows, Linux, Mac ou servidor na nuvem lê esse Bytecode e executa a toda velocidade.</li>
</ol>

<p>Esta aula foi para construir a sua base conceitual. Na próxima, vamos colocar as mãos na massa e instalar as ferramentas necessárias!</p>`,
            "// Fluxo de compilação e execução do Java:\n// 1. Você escreve:    SistemaAlunos.java (código-fonte legível)\n// 2. javac compila:   SistemaAlunos.class (bytecode universal)\n// 3. JVM executa:     java SistemaAlunos (roda no Windows, Linux, Mac...)",
            null,
            "// === PROJETO DO CURSO: Sistema de Gestão de Alunos ===\n// Entendendo o ecossistema JDK e JVM antes de codificar."),

          L('java-0-2', "Configurando o Ambiente — JDK 21 LTS e VS Code Passo a Passo",
            `<h3>🛠️ A caixa de ferramentas do profissional</h3>
<p>Para construir prédios, você precisa de capacete, betoneira e trena. Para programar em Java profissionalmente, você só precisa de duas ferramentas gratuitas no seu computador:</p>

<p><strong>1. JDK (Java Development Kit)</strong>: O kit oficial que contém o compilador (<code>javac</code>) e a máquina virtual (<code>java</code>). Usamos a versão <strong>Java 21 LTS</strong> (Long Term Support), que é o padrão atual da indústria.</p>

<p><strong>2. VS Code + Pacote Java Extension Pack</strong>: O editor leve e moderno com destaque de cores, atalhos inteligentes e terminal integrado.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Como testar se o Java está pronto no seu terminal</div>
  <code>javac -version</code>
</div>

<p>Se o terminal responder algo como <code>javac 21.0.x</code>, seu ambiente está perfeito! Na próxima aula, começaremos a dissecar a estrutura fundamental de um arquivo Java.</p>`,
            "// Testando suas ferramentas no terminal:\n// $ javac -version\n// javac 21.0.2\n// $ java -version\n// openjdk version \"21.0.2\"",
            null,
            "// === PROJETO DO CURSO: Sistema de Gestão de Alunos ===\n// Ambiente homologado com JDK 21 e VS Code."),

          L('java-0-3', "O que é uma Classe? — Entendendo public class e a Regra do Arquivo",
            `<h3>🧱 O molde de gesso: por que tudo em Java é uma classe?</h3>
<p>Imagine uma fábrica de tijolos. Antes de produzir qualquer tijolo, você precisa de uma fôrma com as dimensões exatas. Em Java, <strong>nada existe solto no ar</strong>; todo código precisa morar dentro de uma fôrma chamada <code>class</code>.</p>

<h3>📖 Explicando cada palavra antes de usar:</h3>
<ul>
  <li><code>public</code>: É um modificador de visibilidade. Significa "público" — qualquer parte do sistema tem permissão para enxergar e usar essa classe.</li>
  <li><code>class</code>: É a palavra sagrada do Java que define: "aqui começa o molde de um objeto ou programa".</li>
  <li><code>SistemaAlunos</code>: É o nome de batismo que nós escolhemos para essa classe.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Regra de Ouro do Java</div>
  <code>public class SistemaAlunos { ... } // DEVE estar no arquivo SistemaAlunos.java</code>
</div>

<p>Se a classe pública se chama <code>SistemaAlunos</code>, o arquivo no disco TEM que se chamar <strong>exatamente</strong> <code>SistemaAlunos.java</code>, respeitando maiúsculas e minúsculas!</p>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Abra o VS Code, crie uma pasta chamada <code>projeto-edev-java</code> e crie um arquivo chamado <code>SistemaAlunos.java</code>.</li>
  <li><strong>Como colocar o código:</strong> Digite a casca da classe abaixo dentro do arquivo e salve (Ctrl+S):</li>
</ol>`,
            "public class SistemaAlunos {\n    // Aqui dentro vai morar todo o nosso código escolar!\n}",
            c("Declare a casca de uma classe pública chamada Aluno.", "public class ... { }", "public class Aluno { }", "Escreva public class Aluno { } com abertura e fechamento de chaves.", "public class Aluno { }"),
            "// SistemaAlunos.java - O molde mestre do nosso projeto escolar\npublic class SistemaAlunos {\n    // Dentro deste bloco desenvolveremos nosso sistema de gestao\n}"),

          L('java-0-4', "A Chave da Ignição: Desvendando public static void main e String[] args",
            `<h3>🔑 A chave na ignição: de onde o Java começa?</h3>
<p>Um carro moderno tem ar-condicionado, som bluetooth, vidros elétricos e freios ABS. Mas quando você gira a chave na ignição, a bateria aciona diretamente o <em>motor de arranque</em>.</p>

<p>No Java, quando a JVM abre uma classe com centenas de linhas, como ela sabe por onde começar a ler? Ela procura obrigatoriamente um método com a assinatura sagrada:</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Assinatura de Ignição Universal</div>
  <code>public static void main(String[] args)</code>
</div>

<h3>📖 Dissecando cada palavra do main:</h3>
<ul>
  <li><code>public</code>: Acesso aberto para que a máquina virtual externa possa acionar o ponto de partida.</li>
  <li><code>static</code>: Significa que a JVM pode chamar este método diretamente, sem precisar gastar memória criando um objeto antes.</li>
  <li><code>void</code>: Significa "vazio" — indica que quando o programa terminar, ele não precisa devolver nenhum cálculo numérico para quem o chamou.</li>
  <li><code>main</code>: O nome obrigatório do ponto de entrada ("principal").</li>
  <li><code>String[] args</code>: Um vetor de textos que permite receber opções extras passadas pelo terminal na hora de rodar o programa.</li>
</ul>

<p>Se faltar qualquer uma dessas palavras, a JVM não consegue dar a partida no seu programa!</p>`,
            "public class SistemaAlunos {\n    public static void main(String[] args) {\n        // A JVM aciona exatamente este ponto aqui!\n    }\n}",
            c("Escreva o cabecalho completo do metodo main recebendo String[] args.", "public static void main(...)", "public static void main(String[] args)", "Escreva public static void main(String[] args)", "public static void main(String[] args)"),
            "public class SistemaAlunos {\n    // Ponto oficial de entrada da aplicacao escolar\n    public static void main(String[] args) {\n        // As instrucoes serao executadas sequencialmente a partir daqui\n    }\n}"),

          L('java-0-5', "Falando com o Console: Entendendo System.out.println Parte por Parte",
            `<h3>📢 A corneta do arauto: exibindo mensagens no terminal</h3>
<p>Imagine que você precisa enviar uma carta oficial da escola para os pais. Você precisa da agência dos Correios, do envelope de envio e do carteiro que faz a entrega.</p>

<p>Em Java, para imprimir uma frase na tela preta do terminal, usamos a instrução <code>System.out.println("Texto")</code>. Mas você sabe o que cada pedaço desse comando realmente faz?</p>

<h3>📖 Explicando o comando pedaço a pedaço:</h3>
<ul>
  <li><code>System</code>: É uma classe embutida no próprio Java que dá acesso aos recursos do sistema operacional do computador.</li>
  <li><code>.out</code>: É o canal padrão de saída (Output) do sistema — ou seja, a tela do terminal.</li>
  <li><code>.println(...)</code>: É a abreviação de <em>Print Line</em> (imprimir linha). Ele escreve a mensagem e pula automaticamente para a linha de baixo.</li>
  <li><code>;</code> (ponto e vírgula): Avisa ao compilador: "esta ordem acabou aqui, pode ler a próxima".</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Diferença entre print e println</div>
  <code>System.out.print("A"); System.out.println("B"); // Imprime AB e pula linha</code>
</div>`,
            "public class TesteConsole {\n    public static void main(String[] args) {\n        // Imprime texto e pula para a proxima linha\n        System.out.println(\"Mensagem enviada com sucesso ao terminal!\");\n    }\n}",
            c("Imprima o texto \"Boas-vindas ao Java!\" usando System.out.println.", "System.out....", "System.out.println(\"Boas-vindas ao Java!\");", "Digite System.out.println(\"Boas-vindas ao Java!\"); com ponto e vírgula no final.", "System.out.println(\"Boas-vindas ao Java!\");"),
            "public class SistemaAlunos {\n    public static void main(String[] args) {\n        System.out.println(\"=== SISTEMA DE GESTAO DE ALUNOS ===\");\n    }\n}"),

          L('java-0-6', "Juntando Tudo — Seu Primeiro Programa Java: Compilando e Rodando",
            `<h3>🚀 A decolagem: compilando e rodando seu primeiro código real</h3>
<p>Agora que você entendeu o que é a classe, o que significa o <code>main</code> e como o <code>System.out.println</code> opera, chegou a hora de ver o código ganhar vida no seu computador!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Os dois passos sagrados do terminal</div>
  <code>javac SistemaAlunos.java  // Passo 1: Compilar para bytecode (.class)<br>java SistemaAlunos         // Passo 2: Executar na JVM</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No seu arquivo <code>SistemaAlunos.java</code> dentro da pasta do projeto.</li>
  <li><strong>O código:</strong> Digite exatamente o código abaixo no arquivo e salve com <code>Ctrl+S</code>:
    <pre><code>public class SistemaAlunos {
    public static void main(String[] args) {
        System.out.println("==========================================");
        System.out.println("   SISTEMA DE GESTAO DE ALUNOS — EDEV     ");
        System.out.println("==========================================");
        System.out.println("Status: Sistema iniciado com sucesso!");
    }
}</code></pre>
  </li>
  <li><strong>O que fazer depois:</strong> Abra o terminal integrado do VS Code (atalho <code>Ctrl + '</code> ou menu Terminal &gt; Novo Terminal) na pasta do arquivo e digite:
    <br><code>javac SistemaAlunos.java</code> (pressione Enter — se nada for exibido, compilou com sucesso e gerou o arquivo <code>SistemaAlunos.class</code>)
    <br><code>java SistemaAlunos</code> (pressione Enter para rodar)
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>==========================================
   SISTEMA DE GESTAO DE ALUNOS — EDEV     
==========================================
Status: Sistema iniciado com sucesso!</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Se a mensagem acima apareceu no seu terminal, parabéns! Você acabou de compilar e rodar seu primeiro programa Java. Se apareceu erro de <em>Class not found</em>, confira se digitou exatamente <code>java SistemaAlunos</code> sem a extensão <code>.java</code> na hora de rodar!</li>
</ol>`,
            "public class SistemaAlunos {\n    public static void main(String[] args) {\n        System.out.println(\"==========================================\");\n        System.out.println(\"   SISTEMA DE GESTAO DE ALUNOS — EDEV     \");\n        System.out.println(\"==========================================\");\n        System.out.println(\"Status: Sistema iniciado com sucesso!\");\n    }\n}",
            c("Imprima o texto \"Status: Ativo\" usando System.out.println.", "System.out.println(...);", "System.out.println(\"Status: Ativo\");", "Use System.out.println(\"Status: Ativo\");", "System.out.println(\"Status: Ativo\");"),
            "// SistemaAlunos.java - Projeto Escolar Edev\npublic class SistemaAlunos {\n    public static void main(String[] args) {\n        System.out.println(\"==========================================\");\n        System.out.println(\"   SISTEMA DE GESTAO DE ALUNOS — EDEV     \");\n        System.out.println(\"==========================================\");\n        System.out.println(\"Status: Sistema iniciado com sucesso!\");\n    }\n}")
        ]
      },

      // ── Módulo 1 — Variáveis, Tipos e Operadores ──
      {
        title: "Módulo 1 — Variáveis, Tipos e Operadores",
        lessons: [
          L('java-1-1', "Tipagem Estática: Declarando Matrícula, Nome e Notas",
            `<h3>🛡️ O cofre com gavetas moldadas sob medida</h3>
<p>Imagine um cofre com gavetas sob medida: uma gaveta redonda feita exclusivamente para moedas de ouro, outra retangular para notas de papel e outra longa para escrituras. Você não consegue forçar uma moeda dentro do espaço retangular sem travar o mecanismo.</p>

<p>O Java é uma linguagem de <strong>tipagem estática forte</strong>. Isso significa que você precisa declarar exatamente qual tipo de informação vai guardar em cada variável antes de usá-la:</p>
<ul>
  <li><code>int</code>: Números inteiros (matrícula, idade, faltas). Ocupa 4 bytes na memória.</li>
  <li><code>double</code>: Números decimais com alta precisão (notas, médias). Ocupa 8 bytes.</li>
  <li><code>String</code>: Sequências de texto entre aspas duplas (nome completo do aluno).</li>
  <li><code>boolean</code>: Estados lógicos (<code>true</code> para matriculado, <code>false</code> para trancado).</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Declarando Variáveis Fortemente Tipadas</div>
  <code>int matricula = 1001;<br>String nomeAluno = "Carlos Silva";<br>double nota1 = 8.5;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No seu arquivo <code>SistemaAlunos.java</code>, dentro do bloco do método <code>main</code>.</li>
  <li><strong>O que fazer depois:</strong> Salve o arquivo, compile com <code>javac SistemaAlunos.java</code> e execute com <code>java SistemaAlunos</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Aluno: Mariana Costa | Matricula: 1001 | Nota 1: 9.0</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Altere a nota para <code>9.5</code>, recompile e rode. Se tentar colocar letras em uma variável <code>double</code>, o compilador apontará erro imediatamente!</li>
</ol>`,
            "public class SistemaAlunos {\n    public static void main(String[] args) {\n        int matricula = 1001;\n        String nome = \"Mariana Costa\";\n        double nota1 = 9.0;\n        boolean matriculado = true;\n        \n        System.out.println(\"Aluno: \" + nome + \" | Matricula: \" + matricula + \" | Nota 1: \" + nota1);\n    }\n}",
            c("Declare uma variável double chamada media com o valor inicial 8.5.", "double media = ...;", "double media = 8.5;", "Defina o tipo como double, o nome como media e atribua 8.5 com ponto e vírgula.", "double media = 8.5;"),
            "public class SistemaAlunos {\n    public static void main(String[] args) {\n        System.out.println(\"==========================================\");\n        System.out.println(\"   SISTEMA DE GESTAO DE ALUNOS — EDEV     \");\n        System.out.println(\"==========================================\");\n\n        int matricula = 1001;\n        String nomeAluno = \"Ana Beatriz Souza\";\n        double nota1 = 8.5;\n        double nota2 = 7.0;\n        boolean ativo = true;\n\n        System.out.println(\"Matricula: \" + matricula);\n        System.out.println(\"Aluno: \" + nomeAluno);\n        System.out.println(\"Notas Iniciais: \" + nota1 + \" e \" + nota2);\n        System.out.println(\"Matricula Ativa: \" + ativo);\n    }\n}"),

          L('java-1-2', "Entrada de Dados com Scanner: Lendo Dados do Teclado",
            `<h3>📥 O microfone da sala: ouvindo o que o usuário digita</h3>
<p>Até aqui, nós escrevemos os dados direto no código-fonte. Mas um sistema escolar real não pode ter nomes fixos: a secretária precisa digitar a matrícula e o nome do aluno pelo teclado.</p>

<p>Para isso, usamos o <strong>Scanner</strong>. Ele faz parte da biblioteca utilitária do Java (<code>java.util.Scanner</code>) e atua como uma antena apontada para a entrada padrão do sistema (<code>System.in</code>).</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Como importar e instanciar o Scanner</div>
  <code>import java.util.Scanner; // No topo do arquivo!<br>Scanner leitor = new Scanner(System.in);<br>String nome = leitor.nextLine();</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No topo de <code>SistemaAlunos.java</code> adicione o <code>import java.util.Scanner;</code> e dentro do <code>main</code> crie o leitor.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>javac SistemaAlunos.java</code> e execute com <code>java SistemaAlunos</code>. O programa pausará esperando você digitar!</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Digite o nome do aluno: Lucas Mendes
Nome digitado com sucesso: Lucas Mendes</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Digite seu próprio nome quando o terminal pedir e dê Enter. Feche sempre o leitor com <code>leitor.close();</code> ao final.</li>
</ol>`,
            "import java.util.Scanner;\n\npublic class EntradaAluno {\n    public static void main(String[] args) {\n        Scanner leitor = new Scanner(System.in);\n\n        System.out.print(\"Digite o nome do aluno: \");\n        String nome = leitor.nextLine();\n\n        System.out.println(\"Nome cadastrado: \" + nome);\n        leitor.close();\n    }\n}",
            c("Crie a linha que lê um texto do console usando o método nextLine() da variável leitor.", "String texto = leitor....;", "String texto = leitor.nextLine();", "Chame o método nextLine() a partir do objeto leitor.", "String texto = leitor.nextLine();"),
            "import java.util.Scanner;\n\npublic class SistemaAlunos {\n    public static void main(String[] args) {\n        Scanner leitor = new Scanner(System.in);\n\n        System.out.println(\"==========================================\");\n        System.out.println(\"   CADASTRO DE NOVO ALUNO — EDEV          \");\n        System.out.println(\"==========================================\");\n\n        System.out.print(\"Informe a matricula: \");\n        int matricula = leitor.nextInt();\n        leitor.nextLine(); // Limpa a quebra de linha pendente no buffer\n\n        System.out.print(\"Informe o nome completo do aluno: \");\n        String nomeAluno = leitor.nextLine();\n\n        System.out.println(\"\nRegistro capturado com sucesso:\");\n        System.out.println(\"Matricula: \" + matricula + \" | Aluno: \" + nomeAluno);\n\n        leitor.close();\n    }\n}"),

          L('java-1-3', "Cálculo de Média Semestral com Operadores e Precedência",
            `<h3>⚖️ A balança das notas: operadores aritméticos e parênteses</h3>
<p>Na escola, a nota não é apenas exibida: ela é processada. Precisamos somar as notas bimestrais e dividir pelo total de avaliações para encontrar a média semestral.</p>

<p>Cuidado com a armadilha matemática clássica! Se você escrever <code>nota1 + nota2 / 2.0</code>, a máquina dividirá apenas a <code>nota2</code> por dois antes de somar. Os <strong>parênteses</strong> são obrigatórios para forçar a soma primeiro!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Fórmula Correta da Média</div>
  <code>double media = (nota1 + nota2) / 2.0;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code>, após ler a <code>nota1</code> e a <code>nota2</code> com <code>leitor.nextDouble()</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>javac SistemaAlunos.java</code> e execute com <code>java SistemaAlunos</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Nota 1: 8.0 | Nota 2: 6.0
Media Semestral Calculada: 7.0</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Teste com notas decimais (ex: 7.5 e 8.5) e verifique se a média resulta em 8.0 exato.</li>
</ol>`,
            "public class CalculoMedia {\n    public static void main(String[] args) {\n        double nota1 = 7.5;\n        double nota2 = 8.5;\n\n        // Parenteses garantem que a soma ocorra antes da divisao\n        double media = (nota1 + nota2) / 2.0;\n\n        System.out.println(\"Media final: \" + media);\n    }\n}",
            c("Escreva a expressão correta que soma n1 e n2 entre parênteses e divide por 2.0.", "double media = ...;", "double media = (n1 + n2) / 2.0;", "Use parênteses: (n1 + n2) / 2.0;", "double media = (n1 + n2) / 2.0;"),
            "import java.util.Scanner;\n\npublic class SistemaAlunos {\n    public static void main(String[] args) {\n        Scanner leitor = new Scanner(System.in);\n\n        System.out.print(\"Matricula: \");\n        int matricula = leitor.nextInt();\n        leitor.nextLine();\n\n        System.out.print(\"Nome do Aluno: \");\n        String nomeAluno = leitor.nextLine();\n\n        System.out.print(\"Nota 1: \");\n        double nota1 = leitor.nextDouble();\n\n        System.out.print(\"Nota 2: \");\n        double nota2 = leitor.nextDouble();\n\n        double media = (nota1 + nota2) / 2.0;\n\n        System.out.println(\"\n--- Resumo de Desempenho ---\");\n        System.out.println(\"Aluno: \" + nomeAluno + \" (Matricula \" + matricula + \")\");\n        System.out.println(\"Media Calculada: \" + media);\n\n        leitor.close();\n    }\n}"),

          L('java-1-4', "Formatação de Saída com printf: Tabelas e Duas Casas Decimais",
            `<h3>📏 A régua do tipógrafo: formatando decimais com printf</h3>
<p>Se a média calculada der <code>7.333333333333333</code>, mostrar essa dízima periódica feia no boletim escolar passa uma impressão amadora. O boletim precisa de precisão cirúrgica: exatamente duas casas decimais (<code>7.33</code>).</p>

<p>Com o método <code>System.out.printf</code>, usamos máscaras de formatação com o símbolo de porcentagem (<code>%</code>):</p>
<ul>
  <li><code>%.2f</code>: Formata um número decimal (float/double) com 2 casas decimais arredondadas.</li>
  <li><code>%s</code>: Substitui por um texto (String).</li>
  <li><code>%d</code>: Substitui por um número inteiro (decimal integer).</li>
  <li><code>%n</code>: Quebra de linha universal compatível com qualquer sistema operacional.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Sintaxe do printf</div>
  <code>System.out.printf("Aluno: %s | Média: %.2f%n", nome, media);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code>, substituindo o <code>println</code> final pelo <code>printf</code> formatado.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>javac SistemaAlunos.java</code> e execute com <code>java SistemaAlunos</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Aluno: Carlos Silva | Media: 7.33</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Experimente mudar para <code>%.1f</code> para exibir com apenas 1 casa decimal.</li>
</ol>`,
            "public class FormatacaoBoletim {\n    public static void main(String[] args) {\n        String aluno = \"Juliana Mendes\";\n        double media = 8.66666;\n\n        // Exibindo com apenas duas casas decimais\n        System.out.printf(\"Aluno: %s | Media Semestral: %.2f%n\", aluno, media);\n    }\n}",
            c("Complete o printf para formatar a variavel media com duas casas decimais usando %.2f.", "System.out.printf(\"Media: ...%n\", media);", "System.out.printf(\"Media: %.2f%n\", media);", "Coloque %.2f no local da máscara.", "System.out.printf(\"Media: %.2f%n\", media);"),
            "import java.util.Scanner;\n\npublic class SistemaAlunos {\n    public static void main(String[] args) {\n        Scanner leitor = new Scanner(System.in);\n\n        System.out.print(\"Matricula: \");\n        int matricula = leitor.nextInt();\n        leitor.nextLine();\n\n        System.out.print(\"Nome do Aluno: \");\n        String nomeAluno = leitor.nextLine();\n\n        System.out.print(\"Nota do 1º Bimestre: \");\n        double nota1 = leitor.nextDouble();\n\n        System.out.print(\"Nota do 2º Bimestre: \");\n        double nota2 = leitor.nextDouble();\n\n        double media = (nota1 + nota2) / 2.0;\n\n        System.out.println(\"\n==========================================\");\n        System.out.println(\"          BOLETIM ESCOLAR OFICIAL         \");\n        System.out.println(\"==========================================\");\n        System.out.printf(\"Matricula: %d | Aluno: %s%n\", matricula, nomeAluno);\n        System.out.printf(\"Nota 1: %.1f | Nota 2: %.1f%n\", nota1, nota2);\n        System.out.printf(\"Media Semestral: %.2f%n\", media);\n        System.out.println(\"==========================================\");\n\n        leitor.close();\n    }\n}"),

          L('java-1-5', "Consolidação de Entrada e Saída do Aluno",
            `<h3>📦 O fechamento do primeiro ciclo: cadastro e boletim integrados</h3>
<p>Chegamos ao fechamento do Módulo 1! Você já domina a criação de classes, o método <code>main</code>, tipos primitivos estáticos, leitura interativa com <code>Scanner</code>, cálculos aritméticos e formatação elegante com <code>printf</code>.</p>

<p>Agora consolidamos nosso programa para gerar uma ficha escolar completa e profissional.</p>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No seu arquivo <code>SistemaAlunos.java</code> na pasta do projeto.</li>
  <li><strong>O que fazer depois:</strong> Compile e rode no terminal:
    <br><code>javac SistemaAlunos.java</code>
    <br><code>java SistemaAlunos</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Matricula: 20261
Nome do Aluno: Roberto Carlos
Nota 1: 9.0
Nota 2: 8.5
==========================================
          BOLETIM ESCOLAR OFICIAL         
==========================================
Matricula: 20261 | Aluno: Roberto Carlos
Nota 1: 9.0 | Nota 2: 8.5
Media Semestral Calculada: 8.75
==========================================</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Digite dados de um aluno real e veja o cálculo e alinhamento impecáveis na tela.</li>
</ol>`,
            "// Ficha completa com entrada e relatorio formatado\nimport java.util.Scanner;\n\npublic class SistemaAlunos {\n    public static void main(String[] args) {\n        Scanner leitor = new Scanner(System.in);\n\n        System.out.print(\"Matricula: \");\n        int matricula = leitor.nextInt();\n        leitor.nextLine();\n\n        System.out.print(\"Nome: \");\n        String nomeAluno = leitor.nextLine();\n\n        System.out.print(\"Nota 1: \");\n        double nota1 = leitor.nextDouble();\n\n        System.out.print(\"Nota 2: \");\n        double nota2 = leitor.nextDouble();\n\n        double media = (nota1 + nota2) / 2.0;\n\n        System.out.printf(\"Boletim -> Aluno: %s | Media: %.2f%n\", nomeAluno, media);\n        leitor.close();\n    }\n}",
            c("Feche o objeto Scanner chamado leitor invocando o método close().", "leitor....;", "leitor.close();", "Escreva leitor.close(); com ponto e vírgula.", "leitor.close();"),
            "import java.util.Scanner;\n\npublic class SistemaAlunos {\n    public static void main(String[] args) {\n        Scanner leitor = new Scanner(System.in);\n\n        System.out.print(\"Matricula: \");\n        int matricula = leitor.nextInt();\n        leitor.nextLine();\n\n        System.out.print(\"Nome do Aluno: \");\n        String nomeAluno = leitor.nextLine();\n\n        System.out.print(\"Nota do 1º Bimestre: \");\n        double nota1 = leitor.nextDouble();\n\n        System.out.print(\"Nota do 2º Bimestre: \");\n        double nota2 = leitor.nextDouble();\n\n        double media = (nota1 + nota2) / 2.0;\n\n        System.out.println(\"\n==========================================\");\n        System.out.println(\"          BOLETIM ESCOLAR OFICIAL         \");\n        System.out.println(\"==========================================\");\n        System.out.printf(\"Matricula: %d | Aluno: %s%n\", matricula, nomeAluno);\n        System.out.printf(\"Nota 1: %.1f | Nota 2: %.1f%n\", nota1, nota2);\n        System.out.printf(\"Media Semestral Calculada: %.2f%n\", media);\n        System.out.println(\"==========================================\");\n\n        leitor.close();\n    }\n}")
        ]
      },

      // ── Módulo 2 — Controle de Fluxo e Loops ──
      {
        title: "Módulo 2 — Controle de Fluxo e Loops",
        lessons: [
          L('java-2-1', "Verificando Aprovação com if, else if e else",
            `<h3>🚦 O semáforo pedagógico: tomando decisões no sistema</h3>
<p>Imagine o portão de embarque de um aeroporto: se o passageiro tem passagem de primeira classe, entra na fila prioritária; se tem classe econômica, vai para a fila geral; se a passagem for inválida, é barrado na catraca.</p>

<p>No nosso sistema escolar, a média semestral define o destino do aluno:</p>
<ul>
  <li>Média &gt;= 7.0 &rarr; <strong>APROVADO</strong></li>
  <li>Média entre 5.0 e 6.9 &rarr; <strong>RECUPERAÇÃO</strong></li>
  <li>Média abaixo de 5.0 &rarr; <strong>REPROVADO</strong></li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Estrutura de Decisão Encadeada</div>
  <code>if (media &gt;= 7.0) { ... } else if (media &gt;= 5.0) { ... } else { ... }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No seu arquivo <code>SistemaAlunos.java</code>, logo após o cálculo da média.</li>
  <li><strong>O que fazer depois:</strong> Salve o arquivo, abra o terminal e digite:
    <br><code>javac SistemaAlunos.java</code>
    <br><code>java SistemaAlunos</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Situacao: APROVADO COM LOUVOR!</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Altere a variável de média para 5.5 e rode novamente para ver a mensagem mudar para RECUPERAÇÃO.</li>
</ol>`,
            "public class DecisaoAluno {\n    public static void main(String[] args) {\n        double media = 8.0;\n\n        if (media >= 7.0) {\n            System.out.println(\"Situacao: APROVADO COM LOUVOR!\");\n        } else if (media >= 5.0) {\n            System.out.println(\"Situacao: EM RECUPERACAO!\");\n        } else {\n            System.out.println(\"Situacao: REPROVADO!\");\n        }\n    }\n}",
            c("Escreva a condicional if para testar se media >= 7.0 e exibir \"APROVADO\".", "if (...) { System.out.println(\"APROVADO\"); }", "if (media >= 7.0) { System.out.println(\"APROVADO\"); }", "Use if (media >= 7.0) com chaves.", "if (media >= 7.0) { System.out.println(\"APROVADO\"); }"),
            "public class SistemaAlunos {\n    public static void main(String[] args) {\n        double media = 7.5;\n        String status;\n\n        if (media >= 7.0) {\n            status = \"APROVADO\";\n        } else if (media >= 5.0) {\n            status = \"RECUPERACAO\";\n        } else {\n            status = \"REPROVADO\";\n        }\n\n        System.out.println(\"Media: \" + media + \" -> Status: \" + status);\n    }\n}"),

          L('java-2-2', "Operadores Lógicos: Avaliando Notas E Presença (&&)",
            `<h3>🔒 O cofre de duas chaves: condições compostas</h3>
<p>Em um banco, para abrir o cofre principal, não basta apenas o gerente girar a chave dele; o tesoureiro também precisa girar a segunda chave ao mesmo tempo. Se apenas um deles estiver presente, o cofre permanece trancado.</p>

<p>Na escola acontece o mesmo: um aluno pode tirar nota 10, mas se tiver 50% de faltas, estará reprovado por frequência! Usamos o operador <code>&&</code> (E lógico) para exigir que <strong>ambas</strong> as condições sejam verdadeiras.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Avaliando Nota E Presença</div>
  <code>if (media &gt;= 7.0 &amp;&amp; presenca &gt;= 75) { ... }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code> no VS Code.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>javac SistemaAlunos.java</code> e rode com <code>java SistemaAlunos</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Aprovado por nota e presenca!</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Mude <code>presenca</code> para 60 e observe que o aluno não será aprovado direto.</li>
</ol>`,
            "public class ValidacaoComposta {\n    public static void main(String[] args) {\n        double media = 8.5;\n        int presencaPercentual = 80;\n\n        if (media >= 7.0 && presencaPercentual >= 75) {\n            System.out.println(\"Aprovado por nota e presenca!\");\n        } else {\n            System.out.println(\"Nao atingiu os criterios minimos.\");\n        }\n    }\n}",
            c("Escreva a condicao composta exigindo nota >= 7.0 E presenca >= 75 com &&.", "if (nota >= 7.0 ... presenca >= 75)", "if (nota >= 7.0 && presenca >= 75)", "Use && entre as duas condicoes.", "if (nota >= 7.0 && presenca >= 75)"),
            "public class SistemaAlunos {\n    public static void main(String[] args) {\n        double media = 7.8;\n        int presenca = 82;\n\n        boolean aprovadoDireto = (media >= 7.0 && presenca >= 75);\n        System.out.println(\"Resultado da Avaliacao Oficial: \" + (aprovadoDireto ? \"APROVADO\" : \"PENDENTE\"));\n    }\n}"),

          L('java-2-3', "O Menu de Opções com switch case",
            `<h3>🧭 A central telefônica: escolha direta com switch</h3>
<p>Imagine ligar para o atendimento do banco: "Disque 1 para Saldo, 2 para Extrato, 3 para Falar com Atendente". O sistema não faz 15 perguntas para descobrir o que você quer; ele salta direto para a opção discada.</p>

<p>O <code>switch</code> é a ferramenta ideal para construir o menu principal da nossa aplicação de gestão escolar no terminal.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Estrutura do switch em Java</div>
  <code>switch(opcao) { case 1: ...; break; default: ...; }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code> dentro do método <code>main</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>javac SistemaAlunos.java</code> e execute com <code>java SistemaAlunos</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>[ACAO]: Cadastrando novo aluno no sistema...</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Altere a variável <code>opcao</code> para 2 e 3 e teste a reação do menu.</li>
</ol>`,
            "public class MenuEscolar {\n    public static void main(String[] args) {\n        int opcao = 1;\n\n        switch (opcao) {\n            case 1:\n                System.out.println(\"[ACAO]: Cadastrando novo aluno no sistema...\");\n                break;\n            case 2:\n                System.out.println(\"[ACAO]: Listando boletins da turma...\");\n                break;\n            case 0:\n                System.out.println(\"Saindo do sistema.\");\n                break;\n            default:\n                System.out.println(\"Opcao invalida!\");\n                break;\n        }\n    }\n}",
            c("Complete o case 1 exibindo \"Cadastrar\" e o comando break correspondente.", "case 1: System.out.println(\"Cadastrar\"); ...", "case 1: System.out.println(\"Cadastrar\"); break;", "Lembre-se do break; ao final do case.", "case 1: System.out.println(\"Cadastrar\"); break;"),
            "public class SistemaAlunos {\n    public static void main(String[] args) {\n        System.out.println(\"=== MENU DO SISTEMA ESCOLAR ===\");\n        System.out.println(\"1 - Cadastrar Aluno\");\n        System.out.println(\"2 - Emitir Boletim\");\n        System.out.println(\"0 - Sair\");\n\n        int comando = 1;\n        switch (comando) {\n            case 1:\n                System.out.println(\"Modulo de Cadastro Iniciado.\");\n                break;\n            case 2:\n                System.out.println(\"Modulo de Relatorios Iniciado.\");\n                break;\n            case 0:\n                System.out.println(\"Encerrando aplicacao.\");\n                break;\n            default:\n                System.out.println(\"Opcao desconhecida.\");\n                break;\n        }\n    }\n}"),

          L('java-2-4', "Mantendo o Sistema Rodando com do-while",
            `<h3>🔄 A esteira da fábrica: rodando até o botão de parada</h3>
<p>Se você abrir um programa no computador e ele fechar na hora após cadastrar um único aluno, o usuário ficaria furioso tendo que reabrir o programa o tempo todo. Uma aplicação profissional precisa continuar rodando até que o usuário digite <code>0</code> (Sair).</p>

<p>O laço <code>do-while</code> executa o menu pelo menos uma vez antes de testar a condição de parada no final.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Loop do Menu Principal</div>
  <code>do { ...exibir menu e processar... } while (opcao != 0);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code>, envolvendo a leitura da opção no loop <code>do-while</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e rode:
    <br><code>javac SistemaAlunos.java</code>
    <br><code>java SistemaAlunos</code>
  </li>
  <li><strong>O que esperar na tela:</strong> O menu aparecerá repetidamente a cada ação concluída, até você digitar <code>0</code>.</li>
  <li><strong>Agora é sua vez:</strong> Digite 1, veja a confirmação, e depois digite 0 para encerrar de forma limpa.</li>
</ol>`,
            "public class LoopMenu {\n    public static void main(String[] args) {\n        int opcao = 0;\n        do {\n            System.out.println(\"Sistema ativo. Processando operacao...\");\n        } while (opcao != 0);\n        System.out.println(\"Sistema finalizado com sucesso.\");\n    }\n}",
            c("Escreva a clausula final do do-while verificando se opcao != 0 com ponto e virgula.", "while (...);", "while (opcao != 0);", "Use while (opcao != 0);", "while (opcao != 0);"),
            "public class SistemaAlunos {\n    public static void main(String[] args) {\n        int opcao = 0; // Simulando escolha de saida\n        do {\n            System.out.println(\"\n--- GESTAO DE ALUNOS ---\");\n            System.out.println(\"Menu em execucao continua.\");\n        } while (opcao != 0);\n        System.out.println(\"Programa encerrado com sucesso.\");\n    }\n}"),

          L('java-2-5', "Validação de Notas Válidas (0 a 10) com while",
            `<h3>🛡️ O guarda da catraca: impedindo notas absurdas</h3>
<p>O que acontece se a secretária digitar sem querer a nota <code>-5</code> ou <code>90</code> em vez de 9? Se o sistema aceitar, a média semestral do aluno será corrompida para sempre.</p>

<p>Usamos um loop <code>while (nota &lt; 0 || nota &gt; 10)</code> para trancar o fluxo: enquanto o valor for inválido, o programa avisa o erro e exige uma nova digitação na hora!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Validação com Operador OU (||)</div>
  <code>while (nota &lt; 0.0 || nota &gt; 10.0) { System.out.println("Nota invalida! Redigite:"); ... }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code> após a leitura de cada nota bimestral.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>javac SistemaAlunos.java</code> e execute com <code>java SistemaAlunos</code>.</li>
  <li><strong>O que esperar na tela:</strong> Se digitar uma nota inválida, o terminal insistirá até você digitar um valor entre 0 e 10.</li>
  <li><strong>Agora é sua vez:</strong> Teste digitar 12 e veja o aviso de bloqueio em ação.</li>
</ol>`,
            "import java.util.Scanner;\n\npublic class ValidarNota {\n    public static void main(String[] args) {\n        double nota = 11.5; // Exemplo de nota fora da faixa permitida\n\n        while (nota < 0.0 || nota > 10.0) {\n            System.out.println(\"Nota invalida detectada! Deve estar entre 0 e 10.\");\n            nota = 8.5; // Corrigindo para sair do loop\n        }\n\n        System.out.println(\"Nota homologada: \" + nota);\n    }\n}",
            c("Escreva a condicao do while que detecta se nota < 0 ou nota > 10 usando ||.", "while (...)", "while (nota < 0 || nota > 10)", "Use while (nota < 0 || nota > 10)", "while (nota < 0 || nota > 10)"),
            "public class SistemaAlunos {\n    public static void main(String[] args) {\n        double nota = 8.5;\n        while (nota < 0.0 || nota > 10.0) {\n            System.out.println(\"Erro: A nota precisa estar entre 0 e 10.\");\n        }\n        System.out.println(\"Nota validada com sucesso: \" + nota);\n    }\n}"),

          L('java-2-6', "Contador com loop for no Sistema Escolar",
            `<h3>🔢 O metrônomo: repetindo contagens com for</h3>
<p>Imagine que a escola precisa emitir os boletins de uma turma inteira de 30 alunos. Você não vai copiar e colar o mesmo código 30 vezes.</p>

<p>O laço <code>for</code> é a ferramenta perfeita quando você já sabe de antemão quantas vezes deseja repetir um bloco de instruções.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 As Três Partes do for</div>
  <code>for (int i = 1; i &lt;= total; i++) { ... }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>javac SistemaAlunos.java</code> e rode com <code>java SistemaAlunos</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Processando Aluno 1 de 3
Processando Aluno 2 de 3
Processando Aluno 3 de 3</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Altere o limite para 5 e veja o relatório crescer automaticamente.</li>
</ol>`,
            "public class ContadorTurma {\n    public static void main(String[] args) {\n        for (int aluno = 1; aluno <= 3; aluno++) {\n            System.out.println(\"Processando ficha do Aluno #\" + aluno);\n        }\n    }\n}",
            c("Crie um loop for de int i = 1 ate i <= 5 incrementando i++.", "for (int i = 1; ...; ...)", "for (int i = 1; i <= 5; i++)", "Complete com i <= 5; i++", "for (int i = 1; i <= 5; i++)"),
            "public class SistemaAlunos {\n    public static void main(String[] args) {\n        System.out.println(\"=== RELATORIO DE PROCESSAMENTO EM LOTE ===\");\n        for (int i = 1; i <= 3; i++) {\n            System.out.println(\"Aluno \" + i + \" processado com sucesso no sistema.\");\n        }\n        System.out.println(\"Lote finalizado.\");\n    }\n}")
        ]
      },

      // ── Módulo 3 — Métodos e Sobrecarga ──
      {
        title: "Módulo 3 — Métodos e Sobrecarga",
        lessons: [
          L('java-3-1', "O que são Métodos? — Criando o exibirCabecalho()",
            `<h3>✂️ A tesoura e a fita: nunca repita o mesmo código</h3>
<p>Se você precisa imprimir o cabeçalho oficial do colégio em 10 lugares diferentes do sistema, copiar e colar 6 linhas de <code>println</code> em cada lugar cria uma dor de cabeça terrível: se o telefone da escola mudar, você terá que alterar 10 lugares na mão!</p>

<p>Um <strong>método</strong> é um bloco nomeado de instruções que você escreve uma única vez e chama sempre que precisar.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Criando um método estático sem retorno (void)</div>
  <code>public static void exibirCabecalho() { ... }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Dentro da classe <code>SistemaAlunos</code>, fora do método <code>main</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>javac SistemaAlunos.java</code> e execute com <code>java SistemaAlunos</code>.</li>
  <li><strong>O que esperar na tela:</strong> O cabeçalho completo formatado aparecerá na tela.</li>
  <li><strong>Agora é sua vez:</strong> Chame <code>exibirCabecalho();</code> duas vezes no <code>main</code> e veja o reaproveitamento instantâneo.</li>
</ol>`,
            "public class ExemploMetodo {\n    public static void exibirCabecalho() {\n        System.out.println(\"==========================================\");\n        System.out.println(\"   COLEGIO EDEV — SISTEMA CORPORATIVO     \");\n        System.out.println(\"==========================================\");\n    }\n\n    public static void main(String[] args) {\n        exibirCabecalho(); // Reutilizacao limpa\n    }\n}",
            c("Declare um metodo public static void chamado saudar.", "public static void ...() { }", "public static void saudar() { }", "Escreva public static void saudar() { }", "public static void saudar() { }"),
            "public class SistemaAlunos {\n    public static void exibirCabecalho() {\n        System.out.println(\"==========================================\");\n        System.out.println(\"   COLEGIO EDEV — SISTEMA CORPORATIVO     \");\n        System.out.println(\"==========================================\");\n    }\n\n    public static void main(String[] args) {\n        exibirCabecalho();\n        System.out.println(\"Sistema operacional ativo.\");\n    }\n}"),

          L('java-3-2', "Método com Parâmetros e Retorno: calcularMedia()",
            `<h3>⚙️ A máquina de suco de laranja: métodos com entrada e retorno</h3>
<p>Pense em uma máquina de suco industrial: você coloca duas laranjas pelo topo (os <strong>parâmetros</strong>), a máquina espreme internamente e devolve um copo de suco fresco (o <strong>retorno</strong>).</p>

<p>O método <code>calcularMedia</code> recebe duas notas (<code>double n1, double n2</code>) e devolve a média aritmética exata usando a palavra <code>return</code>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Método com Retorno double</div>
  <code>public static double calcularMedia(double n1, double n2) { return (n1 + n2) / 2.0; }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Adicione o método <code>calcularMedia</code> dentro da classe <code>SistemaAlunos</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>javac SistemaAlunos.java</code>
    <br><code>java SistemaAlunos</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Media calculada: 8.5</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Teste chamar <code>calcularMedia(10.0, 7.0)</code> e verifique se o retorno é 8.5.</li>
</ol>`,
            "public class CalculadoraEscolar {\n    public static double calcularMedia(double n1, double n2) {\n        return (n1 + n2) / 2.0;\n    }\n\n    public static void main(String[] args) {\n        double m = calcularMedia(7.0, 10.0);\n        System.out.println(\"Media calculada via metodo: \" + m);\n    }\n}",
            c("Implemente o retorno da média somando n1 e n2 entre parênteses e dividindo por 2.0 com return.", "return ...;", "return (n1 + n2) / 2.0;", "Use return (n1 + n2) / 2.0;", "return (n1 + n2) / 2.0;"),
            "public class SistemaAlunos {\n    public static double calcularMedia(double n1, double n2) {\n        return (n1 + n2) / 2.0;\n    }\n\n    public static void main(String[] args) {\n        double mediaFinal = calcularMedia(7.5, 9.5);\n        System.out.println(\"Media calculada via metodo: \" + mediaFinal);\n    }\n}"),

          L('java-3-3', "Método verificarSituacao() com Retorno String",
            `<h3>🏷️ A esteira etiquetadora de encomendas</h3>
<p>Em um centro de triagem dos Correios, pacotes passam por uma balança automática: um sensor lê o peso e imprime uma etiqueta com o parecer: "LEVE", "MÉDIO" ou "PESADO".</p>

<p>No sistema escolar, o método <code>verificarSituacao</code> recebe a média e devolve uma palavra (<code>String</code>) com o parecer oficial do conselho de classe.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Retornando uma String</div>
  <code>public static String verificarSituacao(double media) { ... return "APROVADO"; }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e rode:
    <br><code>javac SistemaAlunos.java</code>
    <br><code>java SistemaAlunos</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Parecer Oficial: APROVADO</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Teste passar média 4.0 e confira se retorna "REPROVADO".</li>
</ol>`,
            "public class ParecerEscolar {\n    public static String verificarSituacao(double media) {\n        if (media >= 7.0) return \"APROVADO\";\n        if (media >= 5.0) return \"RECUPERACAO\";\n        return \"REPROVADO\";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Parecer: \" + verificarSituacao(8.2));\n    }\n}",
            c("Retorne a String \"APROVADO\" caso media >= 7.0.", "if (media >= 7.0) return ...;", "if (media >= 7.0) return \"APROVADO\";", "Use return \"APROVADO\"; com ponto e virgula.", "if (media >= 7.0) return \"APROVADO\";"),
            "public class SistemaAlunos {\n    public static String verificarSituacao(double media) {\n        if (media >= 7.0) return \"APROVADO\";\n        if (media >= 5.0) return \"RECUPERACAO\";\n        return \"REPROVADO\";\n    }\n\n    public static void main(String[] args) {\n        double m = 6.4;\n        System.out.println(\"Resultado da Avaliacao: \" + verificarSituacao(m));\n    }\n}"),

          L('java-3-4', "Passando o Scanner como Parâmetro para Evitar Vazamento de Memória",
            `<h3>🚿 A torneira pingando: fechando recursos do sistema operacional</h3>
<p>Se você criar um <code>new Scanner(System.in)</code> dentro de cada método chamado, seu programa abrirá dezenas de conexões com o teclado sem fechar nenhuma delas. Isso é o temido <em>Resource Leak</em> (vazamento de memória).</p>

<p>A boa prática corporativa é criar <strong>um único Scanner</strong> no método <code>main</code> e passá-lo como parâmetro para os métodos que precisam ler dados!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Recebendo o Scanner por parâmetro</div>
  <code>public static double lerNota(Scanner sc, String mensagem)</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e rode:
    <br><code>javac SistemaAlunos.java</code>
    <br><code>java SistemaAlunos</code>
  </li>
  <li><strong>O que esperar na tela:</strong> O programa pedirá a nota com validação e usará o mesmo leitor do início ao fim.</li>
  <li><strong>Agora é sua vez:</strong> Digite uma nota válida e veja a captura limpa sem alertas do compilador.</li>
</ol>`,
            "import java.util.Scanner;\n\npublic class LeituraLimpa {\n    public static double lerNotaSegura(Scanner sc, String label) {\n        System.out.print(label + \": \");\n        return sc.nextDouble();\n    }\n\n    public static void main(String[] args) {\n        Scanner leitor = new Scanner(System.in);\n        double n = lerNotaSegura(leitor, \"Informe a nota\");\n        System.out.println(\"Nota lida: \" + n);\n        leitor.close();\n    }\n}",
            c("Declare o parâmetro Scanner sc no método lerDado.", "public static void lerDado(Scanner ...)", "public static void lerDado(Scanner sc)", "Escreva Scanner sc entre os parênteses.", "public static void lerDado(Scanner sc)"),
            "import java.util.Scanner;\n\npublic class SistemaAlunos {\n    public static double lerNotaValida(Scanner sc, String rotulo) {\n        double nota;\n        do {\n            System.out.print(rotulo + \" (0 a 10): \");\n            nota = sc.nextDouble();\n        } while (nota < 0.0 || nota > 10.0);\n        return nota;\n    }\n\n    public static void main(String[] args) {\n        Scanner leitor = new Scanner(System.in);\n        double n1 = lerNotaValida(leitor, \"1º Bimestre\");\n        System.out.println(\"Nota validada: \" + n1);\n        leitor.close();\n    }\n}"),

          L('java-3-5', "Sobrecarga de Métodos (Overload) no Sistema",
            `<h3>🔌 O adaptador universal: métodos com mesmo nome e assinaturas diferentes</h3>
<p>Imagine uma tomada inteligente que aceita plugue de dois pinos ou de três pinos: o nome do aparelho é o mesmo (tomada), mas ela se adapta à quantidade de pinos inseridos.</p>

<p>No Java, <strong>Sobrecarga (Overload)</strong> permite criar dois métodos com o <em>mesmo nome</em>, contanto que recebam parâmetros diferentes: um <code>calcularMedia</code> para 2 notas semestrais e outro <code>calcularMedia</code> para 3 notas trimestrais!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Dois métodos com o mesmo nome</div>
  <code>calcularMedia(double n1, double n2)<br>calcularMedia(double n1, double n2, double n3)</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>javac SistemaAlunos.java</code>
    <br><code>java SistemaAlunos</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Media Semestral: 8.50 [APROVADO]</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Chame a versão de 3 notas com <code>calcularMedia(7.0, 8.0, 9.0)</code> e comprove que o Java escolhe o método correto automaticamente!</li>
</ol>`,
            "public class SobrecargaExemplo {\n    public static double media(double n1, double n2) {\n        return (n1 + n2) / 2.0;\n    }\n\n    public static double media(double n1, double n2, double n3) {\n        return (n1 + n2 + n3) / 3.0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"2 notas: \" + media(8.0, 9.0));\n        System.out.println(\"3 notas: \" + media(7.0, 8.0, 9.0));\n    }\n}",
            c("Declare a assinatura de calcularMedia recebendo tres doubles: n1, n2 e n3.", "public static double calcularMedia(...)", "public static double calcularMedia(double n1, double n2, double n3)", "Escreva public static double calcularMedia(double n1, double n2, double n3)", "public static double calcularMedia(double n1, double n2, double n3)"),
            "public class SistemaAlunos {\n    public static void exibirCabecalho() {\n        System.out.println(\"==========================================\");\n        System.out.println(\"   COLEGIO EDEV — SISTEMA CORPORATIVO     \");\n        System.out.println(\"==========================================\");\n    }\n\n    public static double calcularMedia(double n1, double n2) {\n        return (n1 + n2) / 2.0;\n    }\n\n    public static double calcularMedia(double n1, double n2, double n3) {\n        return (n1 + n2 + n3) / 3.0;\n    }\n\n    public static String verificarSituacao(double media) {\n        if (media >= 7.0) return \"APROVADO\";\n        if (media >= 5.0) return \"RECUPERACAO\";\n        return \"REPROVADO\";\n    }\n\n    public static void main(String[] args) {\n        exibirCabecalho();\n        double mSemestre = calcularMedia(8.0, 9.0);\n        System.out.printf(\"Media Semestral: %.2f [%s]%n\", mSemestre, verificarSituacao(mSemestre));\n    }\n}")
        ]
      },

      // ── Módulo 4 — Orientação a Objetos ──
      {
        title: "Módulo 4 — Orientação a Objetos",
        lessons: [
          L('java-4-1', "O que é uma Classe? — Criando a Classe Aluno",
            `<h3>🏛️ O formulário impresso de matrícula: a classe Aluno</h3>
<p>Imagine a secretaria de uma escola tradicional. Toda vez que um novo aluno chega, a secretária puxa da gaveta uma folha impressa em branco com os campos: Matrícula, Nome, Nota 1 e Nota 2.</p>

<p>Essa folha de papel em branco é a <strong>Classe</strong>. Ela define quais dados todo aluno terá. Quando o aluno preenche a folha com seus dados reais, aquela folha preenchida torna-se um <strong>Objeto</strong>!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Classe Aluno como Entidade de Negócio</div>
  <code>public class Aluno { int matricula; String nome; double nota1; double nota2; }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Crie um novo arquivo na pasta do projeto chamado <code>Aluno.java</code>.</li>
  <li><strong>O código:</strong> Digite os atributos da classe Aluno e salve.</li>
  <li><strong>O que fazer depois:</strong> No terminal, compile ambos os arquivos:
    <br><code>javac Aluno.java SistemaAlunos.java</code>
  </li>
  <li><strong>O que esperar:</strong> O compilador gerará <code>Aluno.class</code> no disco sem erros.</li>
  <li><strong>Agora é sua vez:</strong> Verifique se os nomes dos atributos coincidem exatamente.</li>
</ol>`,
            "public class Aluno {\n    int matricula;\n    String nome;\n    double nota1;\n    double nota2;\n}",
            c("Declare o atributo String nome dentro de uma classe Aluno.", "public class Aluno { String ...; }", "public class Aluno { String nome; }", "Escreva String nome; dentro das chaves.", "public class Aluno { String nome; }"),
            "// Aluno.java - Molde de dados do estudante\npublic class Aluno {\n    int matricula;\n    String nome;\n    double nota1;\n    double nota2;\n}"),

          L('java-4-2', "Instanciando Objetos com o Operador new",
            `<h3>🏗️ A construção na memória RAM: o operador new</h3>
<p>Ter a planta de uma casa no papel não abriga ninguém da chuva. Você precisa contratar pedreiros e comprar tijolos para erguer a casa real no terreno.</p>

<p>No Java, a palavra-chave <code>new</code> é o mestre de obras. Ela vai até a memória RAM do computador, reserva um espaço novinho e ergue um objeto <code>Aluno</code> real com seus próprios dados.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Instanciando e Acessando Campos com o Ponto (.)</div>
  <code>Aluno a1 = new Aluno();<br>a1.nome = "Carlos";</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code>, dentro do <code>main</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>javac Aluno.java SistemaAlunos.java</code>
    <br><code>java SistemaAlunos</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Aluno instanciado: Beatriz Lima (Matrícula: 101)</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Crie um segundo aluno <code>Aluno a2 = new Aluno();</code> com seus dados e imprima ambos.</li>
</ol>`,
            "public class TesteInstancia {\n    public static void main(String[] args) {\n        Aluno a1 = new Aluno();\n        a1.matricula = 101;\n        a1.nome = \"Beatriz Lima\";\n\n        System.out.println(\"Aluno instanciado: \" + a1.nome + \" (Matrícula: \" + a1.matricula + \")\");\n    }\n}",
            c("Instancie um novo objeto Aluno atribuindo a variavel a1.", "Aluno a1 = ...;", "Aluno a1 = new Aluno();", "Use new Aluno();", "Aluno a1 = new Aluno();"),
            "public class SistemaAlunos {\n    public static void main(String[] args) {\n        Aluno aluno1 = new Aluno();\n        aluno1.matricula = 2001;\n        aluno1.nome = \"Mariana Alves\";\n        aluno1.nota1 = 8.0;\n        aluno1.nota2 = 9.0;\n\n        System.out.println(\"Cadastro de Objeto Concluido: \" + aluno1.nome);\n    }\n}"),

          L('java-4-3', "Encapsulamento: Protegendo Dados com private",
            `<h3>🛡️ O painel blindado: por que nunca deixar atributos públicos?</h3>
<p>Imagine o painel de um banco onde qualquer pessoa que passa na calçada pode abrir a gaveta de dinheiro e trocar os valores. Seria um desastre de segurança.</p>

<p>Se os atributos da classe <code>Aluno</code> ficarem abertos, qualquer código externo poderia alterar a nota de um aluno para <code>-50.0</code> ou apagar o nome. O modificador <code>private</code> tranca a gaveta com chave!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Atributos Privados e Protegidos</div>
  <code>private int matricula;<br>private String nome;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No arquivo <code>Aluno.java</code>.</li>
  <li><strong>O que fazer depois:</strong> Altere a declaração de cada atributo para <code>private</code>.</li>
  <li><strong>O que esperar:</strong> Se tentar acessar <code>aluno.nota1 = 10</code> direto de outra classe, o compilador barrará com erro de segurança.</li>
  <li><strong>Agora é sua vez:</strong> Na próxima aula, criaremos as portas seguras de acesso: os getters e setters!</li>
</ol>`,
            "public class Aluno {\n    // Atributos privados: apenas metodos internos podem manipular\n    private int matricula;\n    private String nome;\n    private double nota1;\n    private double nota2;\n}",
            c("Declare o atributo matricula como private int dentro de Aluno.", "private ... matricula;", "private int matricula;", "Escreva private int matricula;", "private int matricula;"),
            "public class Aluno {\n    private int matricula;\n    private String nome;\n    private double nota1;\n    private double nota2;\n}"),

          L('java-4-4', "Getters e Setters com Validação de Notas",
            `<h3>🚪 A porta com crachá: Getters e Setters</h3>
<p>Como ler ou alterar uma variável <code>private</code> sem quebrar a segurança? Usamos métodos especiais com crachá de identificação:</p>
<ul>
  <li><code>get...()</code>: Método público que lê e devolve o valor de forma segura.</li>
  <li><code>set...()</code>: Método público que recebe o novo valor e o valida rigorosamente antes de salvar!</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Setter com Validação de Negócio</div>
  <code>public void setNota1(double nota) { if (nota &gt;= 0 &amp;&amp; nota &lt;= 10) this.nota1 = nota; }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No arquivo <code>Aluno.java</code>.</li>
  <li><strong>O que fazer depois:</strong> Adicione os métodos <code>getNome</code>, <code>setNome</code>, <code>getNota1</code>, <code>setNota1</code>.</li>
  <li><strong>O que esperar:</strong> Se alguém tentar passar nota -5 para o setter, ela será ignorada!</li>
  <li><strong>Agora é sua vez:</strong> Teste passar nota 9.0 e veja a atribuição funcionar via <code>setNota1</code>.</li>
</ol>`,
            "public class Aluno {\n    private String nome;\n    private double nota1;\n\n    public String getNome() { return nome; }\n    public void setNome(String nome) { this.nome = nome; }\n\n    public double getNota1() { return nota1; }\n    public void setNota1(double nota) {\n        if (nota >= 0.0 && nota <= 10.0) {\n            this.nota1 = nota;\n        }\n    }\n}",
            c("Implemente o getter getMatricula retornando o atributo matricula.", "public int getMatricula() { return ...; }", "public int getMatricula() { return matricula; }", "Use return matricula; com ponto e virgula.", "public int getMatricula() { return matricula; }"),
            "public class Aluno {\n    private int matricula;\n    private String nome;\n    private double nota1;\n    private double nota2;\n\n    public int getMatricula() { return matricula; }\n    public void setMatricula(int matricula) { this.matricula = matricula; }\n\n    public String getNome() { return nome; }\n    public void setNome(String nome) { this.nome = nome; }\n\n    public double getNota1() { return nota1; }\n    public void setNota1(double nota1) {\n        if (nota1 >= 0 && nota1 <= 10) this.nota1 = nota1;\n    }\n\n    public double getNota2() { return nota2; }\n    public void setNota2(double nota2) {\n        if (nota2 >= 0 && nota2 <= 10) this.nota2 = nota2;\n    }\n\n    public double calcularMedia() {\n        return (nota1 + nota2) / 2.0;\n    }\n}"),

          L('java-4-5', "Construtores: Inicializando o Aluno com Dados Prontos",
            `<h3>👶 A certidão de nascimento do objeto: o Construtor</h3>
<p>Quando um bebê nasce, ele já sai da maternidade com data, peso e nome registrados na certidão. Ninguém cria um bebê "vazio" para depois preencher os órgãos dele aos poucos.</p>

<p>O <strong>Construtor</strong> é o método especial que tem exatamente o mesmo nome da classe e roda automaticamente na hora em que o <code>new</code> é executado!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Construtor Completo com this</div>
  <code>public Aluno(int mat, String n, double n1, double n2) { this.matricula = mat; ... }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>Aluno.java</code>.</li>
  <li><strong>O que fazer depois:</strong> No <code>SistemaAlunos.java</code>, crie o aluno em uma única linha elegante: <code>new Aluno(101, "Fernanda", 9.0, 8.5);</code>.</li>
  <li><strong>O que esperar na tela:</strong> Objeto totalmente pronto e consistente desde o primeiro milissegundo.</li>
  <li><strong>Agora é sua vez:</strong> Compile e rode no terminal para comprovar a robustez.</li>
</ol>`,
            "public class Aluno {\n    private int matricula;\n    private String nome;\n\n    // Construtor obrigatorio\n    public Aluno(int matricula, String nome) {\n        this.matricula = matricula;\n        this.nome = nome;\n    }\n}",
            c("Declare o cabecalho de um construtor Aluno recebendo int mat e String nome.", "public Aluno(...)", "public Aluno(int mat, String nome)", "Escreva public Aluno(int mat, String nome)", "public Aluno(int mat, String nome)"),
            "public class Aluno {\n    private int matricula;\n    private String nome;\n    private double nota1;\n    private double nota2;\n\n    public Aluno(int matricula, String nome, double nota1, double nota2) {\n        this.matricula = matricula;\n        this.nome = nome;\n        this.nota1 = nota1;\n        this.nota2 = nota2;\n    }\n\n    public int getMatricula() { return matricula; }\n    public String getNome() { return nome; }\n    public double getNota1() { return nota1; }\n    public double getNota2() { return nota2; }\n    public double calcularMedia() { return (nota1 + nota2) / 2.0; }\n}"),

          L('java-4-6', "Coleções Dinâmicas com ArrayList<Aluno>",
            `<h3>🗂️ O fichário expansível: muito além de arrays com tamanho travado</h3>
<p>Arrays comuns em Java têm um limite rígido: se você criar <code>new Aluno[10]</code>, quando o 11º aluno for matriculado a aplicação travará com erro de estouro de tamanho.</p>

<p>O <code>ArrayList&lt;Aluno&gt;</code> é uma lista dinâmica e elástica que cresce automaticamente conforme novos alunos entram na turma, através do método <code>add()</code>!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Criando e Adicionando na Lista</div>
  <code>ArrayList&lt;Aluno&gt; turma = new ArrayList&lt;&gt;();<br>turma.add(novoAluno);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Importe <code>java.util.ArrayList;</code> no topo de <code>SistemaAlunos.java</code>.</li>
  <li><strong>O que fazer depois:</strong> Crie a lista <code>ArrayList&lt;Aluno&gt; turma</code> e use <code>turma.add(...)</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Total de alunos matriculados na turma: 2</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Use <code>turma.size()</code> para imprimir o total de cadastros.</li>
</ol>`,
            "import java.util.ArrayList;\n\npublic class TesteTurma {\n    public static void main(String[] args) {\n        ArrayList<Aluno> turma = new ArrayList<>();\n        turma.add(new Aluno(101, \"Lucas\", 8.0, 7.5));\n        turma.add(new Aluno(102, \"Camila\", 9.5, 9.0));\n\n        System.out.println(\"Total de alunos matriculados: \" + turma.size());\n    }\n}",
            c("Adicione o objeto novoAluno na colecao turma usando o metodo add().", "turma....;", "turma.add(novoAluno);", "Use turma.add(novoAluno); com ponto e virgula.", "turma.add(novoAluno);"),
            "import java.util.ArrayList;\n\npublic class SistemaAlunos {\n    public static void main(String[] args) {\n        ArrayList<Aluno> turma = new ArrayList<>();\n        turma.add(new Aluno(1001, \"Pedro Henrique\", 7.0, 8.0));\n        turma.add(new Aluno(1002, \"Leticia Castro\", 9.0, 9.5));\n\n        System.out.println(\"Turma carregada com \" + turma.size() + \" alunos ativos.\");\n    }\n}"),

          L('java-4-7', "Buscando Aluno por Matrícula no ArrayList",
            `<h3>🔍 A lupa da secretaria: localizando o estudante por matrícula</h3>
<p>Quando um pai chega à secretaria e informa o número da matrícula, a atendente não quer ver todos os 500 alunos da escola. Ela quer que o sistema localize exatamente aquele registro específico.</p>

<p>Percorremos o <code>ArrayList</code> comparando o <code>aluno.getMatricula()</code> com o número procurado. Ao encontrar, exibimos a ficha e encerramos a busca.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Algoritmo de Busca Linear</div>
  <code>for (Aluno a : turma) { if (a.getMatricula() == busca) return a; }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code> crie o método <code>buscarPorMatricula</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>javac SistemaAlunos.java</code> e rode com <code>java SistemaAlunos</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Aluno Encontrado: Camila (Media: 9.25)</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Teste buscar uma matrícula que não existe e veja o retorno <code>null</code> tratado com segurança.</li>
</ol>`,
            "import java.util.ArrayList;\n\npublic class BuscaMatricula {\n    public static Aluno buscar(ArrayList<Aluno> lista, int mat) {\n        for (Aluno a : lista) {\n            if (a.getMatricula() == mat) return a;\n        }\n        return null;\n    }\n}",
            c("Compare se a.getMatricula() e igual a variavel mat no if.", "if (a.getMatricula() ... mat)", "if (a.getMatricula() == mat)", "Use operador de comparacao ==.", "if (a.getMatricula() == mat)"),
            "import java.util.ArrayList;\n\npublic class SistemaAlunos {\n    public static Aluno buscar(ArrayList<Aluno> turma, int matricula) {\n        for (Aluno a : turma) {\n            if (a.getMatricula() == matricula) return a;\n        }\n        return null;\n    }\n\n    public static void main(String[] args) {\n        ArrayList<Aluno> turma = new ArrayList<>();\n        turma.add(new Aluno(1001, \"Guilherme\", 8.5, 9.0));\n\n        Aluno encontrado = buscar(turma, 1001);\n        if (encontrado != null) {\n            System.out.println(\"Localizado com sucesso: \" + encontrado.getNome());\n        }\n    }\n}"),

          L('java-4-8', "Removendo Aluno da Turma com ArrayList.remove()",
            `<h3>🗑️ O cancelamento de matrícula: removendo com segurança</h3>
<p>Se um aluno pediu transferência para outra escola, o nome dele não pode mais constar nas chamadas nem receber notas no final do ano.</p>

<p>Com o método <code>turma.remove(indice)</code> ou <code>removeIf</code>, removemos o estudante e o <code>ArrayList</code> reorganiza todas as posições automaticamente.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Removendo da Coleção</div>
  <code>turma.remove(posicao);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>javac SistemaAlunos.java</code>
    <br><code>java SistemaAlunos</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Aluno removido com sucesso! Restam 1 alunos na turma.</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Remova um aluno e confira com <code>turma.size()</code> a redução do total.</li>
</ol>`,
            "import java.util.ArrayList;\n\npublic class ExclusaoAluno {\n    public static void main(String[] args) {\n        ArrayList<Aluno> turma = new ArrayList<>();\n        turma.add(new Aluno(101, \"Joao\", 6.0, 7.0));\n        turma.add(new Aluno(102, \"Maria\", 8.0, 9.0));\n\n        turma.remove(0); // Remove o primeiro\n        System.out.println(\"Restam na turma: \" + turma.size());\n    }\n}",
            c("Remova o elemento no indice i da lista turma usando remove.", "turma.remove(...);", "turma.remove(i);", "Chame turma.remove(i);", "turma.remove(i);"),
            "import java.util.ArrayList;\n\npublic class SistemaAlunos {\n    public static void main(String[] args) {\n        ArrayList<Aluno> turma = new ArrayList<>();\n        turma.add(new Aluno(1001, \"Guilherme\", 8.5, 9.0));\n        turma.add(new Aluno(1002, \"Carla\", 9.0, 9.5));\n\n        turma.remove(0);\n        System.out.println(\"Total apos cancelamento de matricula: \" + turma.size());\n    }\n}")
        ]
      },

      // ── Módulo 5 — Collections, Arquivos e Conclusão ──
      {
        title: "Módulo 5 — Collections, Arquivos e Conclusão",
        lessons: [
          L('java-5-1', "Listagem Geral Formatada com For-Each e Boletins",
            `<h3>📊 O conselho de classe: imprimindo o relatório de todos os alunos</h3>
<p>Ao final do semestre, os professores se reúnem para analisar a turma completa. Precisamos imprimir uma tabela organizada com o nome de cada aluno, suas notas, média final e situação (Aprovado / Reprovado).</p>

<p>O laço <strong>for-each</strong> (<code>for (Aluno a : turma)</code>) percorre cada elemento da lista sem exigir controle manual de índices, com código limpo e moderno.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 O laço for-each para coleções</div>
  <code>for (Aluno a : turma) { System.out.printf("%s - %.2f%n", a.getNome(), a.calcularMedia()); }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code>, dentro do método <code>listarBoletins()</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e rode:
    <br><code>javac SistemaAlunos.java</code>
    <br><code>java SistemaAlunos</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Matricula: 1001 | Nome: Ana | Media: 8.50 [APROVADO]</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Adicione 3 alunos e veja o relatório geral alinhar todos perfeitamente.</li>
</ol>`,
            "import java.util.ArrayList;\n\npublic class RelatorioTurma {\n    public static void main(String[] args) {\n        ArrayList<Aluno> turma = new ArrayList<>();\n        turma.add(new Aluno(101, \"Lucas Mendes\", 8.0, 9.0));\n        turma.add(new Aluno(102, \"Camila Silva\", 5.0, 6.0));\n\n        for (Aluno a : turma) {\n            double m = a.calcularMedia();\n            System.out.printf(\"Aluno: %s | Media: %.2f | Situacao: %s%n\", \n                a.getNome(), m, (m >= 7.0 ? \"APROVADO\" : \"RECUPERACAO\"));\n        }\n    }\n}",
            c("Escreva o cabecalho de um loop for-each para percorrer a lista turma do tipo Aluno.", "for (Aluno a : ...)", "for (Aluno a : turma)", "Use for (Aluno a : turma)", "for (Aluno a : turma)"),
            "import java.util.ArrayList;\n\npublic class SistemaAlunos {\n    public static void listarTurma(ArrayList<Aluno> turma) {\n        System.out.println(\"==========================================\");\n        System.out.println(\"         BOLETIM GERAL DA TURMA           \");\n        System.out.println(\"==========================================\");\n        for (Aluno a : turma) {\n            double m = a.calcularMedia();\n            System.out.printf(\"%d - %s | Media: %.2f [%s]%n\", \n                a.getMatricula(), a.getNome(), m, (m >= 7.0 ? \"APROVADO\" : \"RECUPERACAO\"));\n        }\n        System.out.println(\"==========================================\");\n    }\n}"),

          L('java-5-2', "Estatísticas da Turma: Média Geral, Maior e Menor Nota",
            `<h3>📈 O diagnóstico pedagógico: estatísticas consolidadas</h3>
<p>O diretor da escola quer saber: a turma foi bem neste semestre? Qual foi a média geral de todos os alunos somados? Quem tirou a maior nota da turma?</p>

<p>Usamos variáveis acumuladoras de soma e algoritmos de mínimo e máximo para condensar os dados em indicadores executivos de desempenho.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Acumulando a Média Geral</div>
  <code>somaMedias += a.calcularMedia(); double mediaGeral = somaMedias / turma.size();</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code>, crie o método <code>exibirEstatisticas()</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e rode:
    <br><code>javac SistemaAlunos.java</code>
    <br><code>java SistemaAlunos</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>--- Indicadores da Turma ---
Media Geral da Turma: 7.75
Maior Media: 9.00</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Teste com uma turma vazia e evite divisão por zero verificando se <code>turma.isEmpty()</code>.</li>
</ol>`,
            "import java.util.ArrayList;\n\npublic class EstatisticasTurma {\n    public static void main(String[] args) {\n        ArrayList<Aluno> turma = new ArrayList<>();\n        turma.add(new Aluno(101, \"Aluno A\", 7.0, 7.0));\n        turma.add(new Aluno(102, \"Aluno B\", 9.0, 9.0));\n\n        double soma = 0;\n        double maior = Double.MIN_VALUE;\n\n        for (Aluno a : turma) {\n            double m = a.calcularMedia();\n            soma += m;\n            if (m > maior) maior = m;\n        }\n\n        System.out.printf(\"Media Geral: %.2f | Maior Media: %.2f%n\", (soma / turma.size()), maior);\n    }\n}",
            c("Verifique se a lista turma esta vazia usando o metodo isEmpty().", "if (turma....())", "if (turma.isEmpty())", "Chame turma.isEmpty()", "if (turma.isEmpty())"),
            "import java.util.ArrayList;\n\npublic class SistemaAlunos {\n    public static void exibirEstatisticas(ArrayList<Aluno> turma) {\n        if (turma.isEmpty()) {\n            System.out.println(\"Nao ha alunos cadastrados para calcular estatisticas.\");\n            return;\n        }\n        double soma = 0;\n        for (Aluno a : turma) soma += a.calcularMedia();\n        System.out.printf(\"Media Geral da Turma: %.2f%n\", (soma / turma.size()));\n    }\n}"),

          L('java-5-3', "Tratamento de Exceções com try-catch no Scanner",
            `<h3>🦺 O cinto de segurança e o airbag: blindando o sistema contra quedas</h3>
<p>O que acontece se o sistema pedir para a secretária digitar a matrícula numérica e ela digitar "dez" por extenso? Em programas amadores, a tela explode com um erro vermelho feio chamado <code>InputMismatchException</code> e a aplicação fecha na hora.</p>

<p>Com o bloco <code>try-catch</code>, colocamos um airbag no programa: o Java <em>tenta</em> ler o número; se o usuário digitar errado, o bloco <code>catch</code> absorve o impacto e avisa amigavelmente para tentar de novo!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Capturando falhas de digitação</div>
  <code>try { int mat = sc.nextInt(); } catch (InputMismatchException e) { ... }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Em volta das leituras numéricas do <code>Scanner</code> no <code>SistemaAlunos.java</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute.</li>
  <li><strong>O que esperar:</strong> Se você digitar letras no campo de nota, o programa não vai quebrar!</li>
  <li><strong>Agora é sua vez:</strong> Digite propositalmente "abc" no campo numérico e veja o tratamento elegante.</li>
</ol>`,
            "import java.util.Scanner;\nimport java.util.InputMismatchException;\n\npublic class LeituraSegura {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        try {\n            System.out.print(\"Digite uma nota numerica: \");\n            double nota = sc.nextDouble();\n            System.out.println(\"Nota aceita: \" + nota);\n        } catch (InputMismatchException e) {\n            System.out.println(\"Erro: Entrada invalida! Voce deve digitar numeros.\");\n        }\n        sc.close();\n    }\n}",
            c("Capture a excecao InputMismatchException na clausula catch.", "catch (... e) { }", "catch (InputMismatchException e) { }", "Escreva InputMismatchException e entre os parenteses.", "catch (InputMismatchException e) { }"),
            "import java.util.Scanner;\nimport java.util.InputMismatchException;\n\npublic class SistemaAlunos {\n    public static int lerInteiroSeguro(Scanner sc, String rotulo) {\n        while (true) {\n            try {\n                System.out.print(rotulo + \": \");\n                int valor = sc.nextInt();\n                sc.nextLine();\n                return valor;\n            } catch (InputMismatchException e) {\n                System.out.println(\"Valor invalido! Digite apenas numeros inteiros.\");\n                sc.nextLine();\n            }\n        }\n    }\n}"),

          L('java-5-4', "Salvando Alunos em Arquivo Texto (CSV) com PrintWriter",
            `<h3>💾 O disco rígido permanente: persistência em arquivo</h3>
<p>Até aqui, quando você desliga o programa, todos os alunos cadastrados na memória RAM desaparecem no ar. Para que a escola funcione no dia a dia, os dados precisam ser gravados no disco em um arquivo <code>alunos.csv</code>.</p>

<p>O <code>PrintWriter</code> combinado com <code>FileWriter</code> escreve linhas de texto formatadas com separador ponto e vírgula (<code>;</code>), compatíveis com qualquer planilha do Excel!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Gravando com try-with-resources</div>
  <code>try (PrintWriter writer = new PrintWriter(new FileWriter("alunos.csv"))) { ... }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code>, crie o método <code>salvarEmArquivo()</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>javac SistemaAlunos.java</code> e execute.</li>
  <li><strong>O que esperar:</strong> Um arquivo <code>alunos.csv</code> surgirá na pasta do seu projeto!</li>
  <li><strong>Agora é sua vez:</strong> Abra o <code>alunos.csv</code> no VS Code ou Bloco de Notas para ver os registros gravados permanentemente.</li>
</ol>`,
            "import java.io.FileWriter;\nimport java.io.PrintWriter;\nimport java.io.IOException;\n\npublic class GravarArquivo {\n    public static void main(String[] args) {\n        try (PrintWriter writer = new PrintWriter(new FileWriter(\"alunos.csv\"))) {\n            writer.println(\"1001;Guilherme;8.5;9.0\");\n            System.out.println(\"Arquivo gravado no disco com sucesso!\");\n        } catch (IOException e) {\n            System.out.println(\"Falha de gravacao: \" + e.getMessage());\n        }\n    }\n}",
            c("Instancie um FileWriter para o arquivo \"alunos.csv\" com new FileWriter(\"alunos.csv\").", "new ...(\"alunos.csv\")", "new FileWriter(\"alunos.csv\")", "Use new FileWriter(\"alunos.csv\")", "new FileWriter(\"alunos.csv\")"),
            "import java.io.FileWriter;\nimport java.io.PrintWriter;\nimport java.io.IOException;\nimport java.util.ArrayList;\n\npublic class SistemaAlunos {\n    public static void salvarDados(ArrayList<Aluno> turma, String nomeArquivo) {\n        try (PrintWriter writer = new PrintWriter(new FileWriter(nomeArquivo))) {\n            for (Aluno a : turma) {\n                writer.println(a.getMatricula() + \";\" + a.getNome() + \";\" + a.getNota1() + \";\" + a.getNota2());\n            }\n            System.out.println(\"Dados sincronizados no disco com sucesso!\");\n        } catch (IOException e) {\n            System.out.println(\"Erro ao salvar arquivo: \" + e.getMessage());\n        }\n    }\n}"),

          L('java-5-5', "Carregando Alunos do Arquivo na Inicialização",
            `<h3>📖 A reabertura da secretaria: lendo o arquivo ao ligar o sistema</h3>
<p>Quando a secretária liga o computador pela manhã e abre o sistema, a lista de alunos não pode começar zerada. O programa precisa ler automaticamente o <code>alunos.csv</code> e reconstruir cada objeto <code>Aluno</code> na memória!</p>

<p>Usamos o <code>Scanner</code> apontado para um objeto <code>File</code>. Com o método <code>linha.split(";")</code>, fatiamos o texto e restauramos matrícula, nome e notas com precisão milimétrica.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Fatiando o CSV com split</div>
  <code>String[] campos = linha.split(";");<br>int mat = Integer.parseInt(campos[0]);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>SistemaAlunos.java</code>, crie o método <code>carregarDeArquivo()</code> e chame-o logo na primeira linha do <code>main</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>javac SistemaAlunos.java</code>
    <br><code>java SistemaAlunos</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Base de dados carregada: 2 alunos restaurados do disco.</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Feche o programa, abra de novo e comprove que seus alunos continuam salvos!</li>
</ol>`,
            "import java.io.File;\nimport java.util.Scanner;\nimport java.util.ArrayList;\n\npublic class CarregarArquivo {\n    public static void carregar(ArrayList<Aluno> turma) {\n        File arq = new File(\"alunos.csv\");\n        if (!arq.exists()) return;\n\n        try (Scanner sc = new Scanner(arq)) {\n            while (sc.hasNextLine()) {\n                String[] p = sc.nextLine().split(\";\");\n                turma.add(new Aluno(Integer.parseInt(p[0]), p[1], Double.parseDouble(p[2]), Double.parseDouble(p[3])));\n            }\n            System.out.println(\"Turma carregada do arquivo!\");\n        } catch (Exception e) {\n            System.out.println(\"Erro na leitura: \" + e.getMessage());\n        }\n    }\n}",
            c("Converta a String campos[0] para int usando Integer.parseInt.", "int mat = ...;", "int mat = Integer.parseInt(campos[0]);", "Use Integer.parseInt(campos[0]);", "int mat = Integer.parseInt(campos[0]);"),
            "import java.io.File;\nimport java.util.Scanner;\nimport java.util.ArrayList;\n\npublic class SistemaAlunos {\n    public static void carregarDados(ArrayList<Aluno> turma, String caminho) {\n        File arquivo = new File(caminho);\n        if (!arquivo.exists()) return;\n\n        try (Scanner sc = new Scanner(arquivo)) {\n            while (sc.hasNextLine()) {\n                String linha = sc.nextLine().trim();\n                if (!linha.isEmpty()) {\n                    String[] partes = linha.split(\";\");\n                    turma.add(new Aluno(\n                        Integer.parseInt(partes[0]),\n                        partes[1],\n                        Double.parseDouble(partes[2]),\n                        Double.parseDouble(partes[3])\n                    ));\n                }\n            }\n        } catch (Exception ignored) {}\n    }\n}"),

          L('java-5-6', "Conclusão do Sistema de Alunos e Emissão de Certificado",
            `<h3>🎓 O marco profissional: você domina Java Corporativo!</h3>
<p>Parabéns, desenvolvedor! Você percorreu uma jornada profissional completa: do zero, entendendo o que é Bytecode e JVM, até arquitetar um sistema corporativo completo com Orientação a Objetos, Coleções dinâmicas com <code>ArrayList</code>, validações com <code>try-catch</code> e persistência permanente em disco.</p>

<p>Com essa base sólida, você está preparado para encarar frameworks corporativos como Spring Boot, Quarkus e criar aplicações de alto calibre.</p>

<p>Seu certificado oficial de conclusão do curso de Java da plataforma Edev já está emitido na sua aba de Certificados!</p>`,
            "// === PROJETO COMPLETO CONCLUÍDO: SISTEMA DE GESTÃO ESCOLAR ===\n// Todas as classes, métodos, coleções e persistência em perfeita harmonia!",
            c("Imprima a mensagem \"Certificado Java Edev Conquistado!\" usando System.out.println.", "System.out.println(...);", "System.out.println(\"Certificado Java Edev Conquistado!\");", "Use System.out.println(\"Certificado Java Edev Conquistado!\");", "System.out.println(\"Certificado Java Edev Conquistado!\");"),
            "import java.io.*;\nimport java.util.*;\n\n// === CLASSE DE DOMÍNIO ===\nclass Aluno {\n    private int matricula;\n    private String nome;\n    private double nota1;\n    private double nota2;\n\n    public Aluno(int matricula, String nome, double nota1, double nota2) {\n        this.matricula = matricula;\n        this.nome = nome;\n        this.nota1 = nota1;\n        this.nota2 = nota2;\n    }\n\n    public int getMatricula() { return matricula; }\n    public String getNome() { return nome; }\n    public double getNota1() { return nota1; }\n    public double getNota2() { return nota2; }\n    public double calcularMedia() { return (nota1 + nota2) / 2.0; }\n    public String getSituacao() { return calcularMedia() >= 7.0 ? \"APROVADO\" : (calcularMedia() >= 5.0 ? \"RECUPERACAO\" : \"REPROVADO\"); }\n}\n\n// === APLICAÇÃO PRINCIPAL ===\npublic class SistemaAlunos {\n    private static final String ARQUIVO = \"alunos.csv\";\n\n    public static void main(String[] args) {\n        ArrayList<Aluno> turma = new ArrayList<>();\n        carregar(turma);\n\n        System.out.println(\"==========================================\");\n        System.out.println(\"  SISTEMA DE GESTAO DE ALUNOS — FINALIZADO \");\n        System.out.println(\"==========================================\");\n        System.out.println(\"Total de alunos homologados: \" + turma.size());\n    }\n\n    private static void carregar(ArrayList<Aluno> turma) {\n        File f = new File(ARQUIVO);\n        if (!f.exists()) return;\n        try (Scanner sc = new Scanner(f)) {\n            while (sc.hasNextLine()) {\n                String[] p = sc.nextLine().trim().split(\";\");\n                if (p.length == 4) {\n                    turma.add(new Aluno(Integer.parseInt(p[0]), p[1], Double.parseDouble(p[2]), Double.parseDouble(p[3])));\n                }\n            }\n        } catch (Exception ignored) {}\n    }\n}")
        ]
      }
    ]
  },

  cpp: {
    id: "cpp",
    name: "C++ Moderno: Do Zero à Alta Performance",
    tag: "C++ + POO + Games",
    hours: "45 horas",
    desc: "Construa um motor de combate em turnos completo para terminal. Domine ponteiros, referências, vetores dinâmicos, classes, herança e algoritmos de combate em alta velocidade.",
    modules: [
      // ── Módulo 0 — Por que C++? e Configuração do Compilador g++ ──
      {
        title: "Módulo 0 — Por que C++? e Configuração do Compilador g++",
        lessons: [
          L('cpp-0-0', "Como este curso funciona — Sua jornada e o projeto do Jogo de Batalha",
            `<h3>⚔️ Bem-vindo ao universo de alta performance do C++!</h3>
<p>Se você sonha em entender como motores de jogos como Unreal Engine, simuladores aeroespaciais e sistemas operacionais de alta fidelidade funcionam por dentro, você chegou ao lugar certo.</p>

<p>Aprender C++ é como aprender a pilotar um carro de Fórmula 1: não há direção hidráulica escondendo o atrito da pista. Você tem controle total sobre cada byte da memória e cada ciclo do processador.</p>

<h3>🎮 O Projeto do Curso: Jogo de Batalha por Turnos</h3>
<p>Durante as aulas, nós não vamos apenas estudar sintaxe solta. Nós vamos projetar e codificar um <strong>Jogo de RPG de Batalha por Turnos</strong> completo para rodar no terminal.</p>

<p>Seu herói terá pontos de vida, mana, inventário dinâmico com armas e poções, cálculo de dano e armadura, inteligência artificial para monstros e menus interativos.</p>

<p>Esta primeira aula é o nosso acolhimento — sem tarefas ou testes para resolver agora. Na próxima aula, vamos entender por que C++ é o rei indiscutível da velocidade!</p>`,
            "// === PROJETO DO CURSO: Jogo de Batalha por Turnos (RPG) ===\n// Ao longo deste curso, você construirá um motor de combate completo em C++.",
            null,
            "// === PROJETO DO CURSO: Jogo de Batalha por Turnos ===\n// Este bloco vai exibir seu código evoluindo a cada aula.\n// Na próxima aula, vamos dar o pontapé inicial no compilador!"),

          L('cpp-0-1', "Por que C++ domina jogos e sistemas? — Perto do Metal",
            `<h3>🏎️ O motor direto no chassi: o que significa "perto do metal"?</h3>
<p>Imagine que em linguagens como JavaScript ou Python você tem um motorista particular: você diz "vire à direita", ele pensa, aciona a direção e cuida de tudo. É confortável, mas existe um intermediário.</p>

<p>No C++, não existe intermediário. Você está com as mãos diretamente no volante, nas marchas e nas engrenagens da máquina. Isso é o que chamamos de <em>programação de sistemas</em> ou estar "perto do metal" (o hardware).</p>

<h3>⚡ Por que grandes jogos usam C++?</h3>
<p>Quando um jogo renderiza 120 quadros por segundo, o processador tem apenas 8 milissegundos para calcular a física de milhares de projéteis, inteligência dos inimigos e áudio 3D. Qualquer pausa para coletar lixo de memória congelaria o jogo.</p>

<p>O C++ compila direto para código de máquina puro (binário de zeros e uns do seu processador), oferecendo previsibilidade absoluta de desempenho.</p>

<p>Esta aula foi para construir a sua mentalidade de desenvolvedor de alto nível. Na próxima aula, deixaremos o compilador g++ pronto na sua máquina!</p>`,
            "// Exemplo conceitual: C++ compila direto para instruções do processador\n// Código C++ -> Compilador (g++) -> Binário (.exe) -> Processador executa a toda velocidade!",
            null,
            "// === PROJETO DO CURSO: Jogo de Batalha por Turnos ===\n// Preparando o ambiente para receber nosso código de combate."),

          L('cpp-0-2', "Configurando o Compilador — g++, MinGW-w64 e VS Code",
            `<h3>🛠️ A oficina mecânica: instalando o g++</h3>
<p>Assim como um marceneiro precisa de plaina e serra, um programador C++ precisa de um compilador. No mundo Windows e Linux, o <strong>g++</strong> (do projeto GCC) é o padrão de ouro open-source.</p>

<p>No Windows, nós usamos o pacote <strong>MinGW-w64</strong> (via MSYS2 ou instalador direto), que traz o executável <code>g++.exe</code> para o seu terminal.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Como verificar seu compilador no terminal</div>
  <code>g++ --version</code>
</div>

<p>No VS Code, recomendamos instalar a extensão oficial <strong>C/C++ da Microsoft</strong> para ter autocomplete inteligente (IntelliSense) e depuração com breakpoints.</p>

<p>Ambiente devidamente compreendido! No próximo módulo, abriremos o editor e começaremos a desvendar cada termo da linguagem passo a passo.</p>`,
            "// Verificando a versão do g++ no terminal:\n// $ g++ --version\n// g++ (Rev2, Built by MSYS2 project) 13.2.0",
            null,
            "// === PROJETO DO CURSO: Jogo de Batalha por Turnos ===\n// Ambiente preparado com g++ e VS Code. Prontos para codificar!")
        ]
      },

      // ── Módulo 1 — Fundamentos, Variáveis e Entrada de Dados ──
      {
        title: "Módulo 1 — Fundamentos, Variáveis e Entrada de Dados",
        lessons: [
          L('cpp-1-1', "O que é #include e iostream? — A Biblioteca Padrão do C++",
            `<h3>📦 O armário de ferramentas prontas: #include e iostream</h3>
<p>Imagine que você vai construir uma espada medieval na ferraria. Você não precisa inventar o minério de ferro nem forjar o martelo do zero; você vai até o armário de ferramentas da oficina e pega as ferramentas já prontas.</p>

<h3>📖 Dissecando os termos antes de usar:</h3>
<ul>
  <li><code>#include</code>: É uma <em>diretiva de pré-processador</em>. O símbolo de cerquilha (<code>#</code>) avisa ao compilador: "antes de compilar meu código, copie e cole aqui dentro todas as ferramentas deste cabeçalho".</li>
  <li><code>&lt;iostream&gt;</code>: Significa <strong>Input/Output Stream</strong> (Fluxo de Entrada e Saída). É a biblioteca oficial do C++ que ensina o computador a ler do teclado e escrever textos no terminal.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Como importar ferramentas no topo do arquivo</div>
  <code>#include &lt;iostream&gt;</code>
</div>

<p>Sem essa linha no topo, o C++ não reconhece comandos de exibição como <code>cout</code> ou de entrada como <code>cin</code>.</p>`,
            "// Incluindo a biblioteca de entrada e saída no topo\n#include <iostream>\n\n// Agora o compilador tem acesso a todos os canais de fluxo de texto!",
            c("Escreva a diretiva de pré-processador para incluir a biblioteca iostream.", "#include ...", "#include <iostream>", "Escreva #include <iostream>", "#include <iostream>"),
            "// === JOGO DE BATALHA: ARENA MEDIEVAL ===\n#include <iostream>\n// Biblioteca iostream carregada com sucesso para nosso motor de combate."),

          L('cpp-1-2', "A Função int main() e o return 0; — O Ponto de Partida",
            `<h3>🚪 O portão principal da arena: int main() e return 0;</h3>
<p>Todo estádio olímpico tem dezenas de portões de emergência, catracas e túneis. Mas quando os atletas entram para o torneio, existe apenas uma entrada oficial onde a cerimônia tem início.</p>

<h3>📖 Explicando o main e o return:</h3>
<ul>
  <li><code>int</code>: Significa número inteiro (<em>integer</em>). Avisa ao computador: "quando este programa terminar, ele devolverá um código numérico de encerramento para o Sistema Operacional".</li>
  <li><code>main()</code>: É a função mestre obrigatória de todo programa executável em C++. O processador sempre inicia a execução pela primeira linha dentro da <code>main()</code>.</li>
  <li><code>return 0;</code>: O número zero é o código universal de sucesso dos sistemas operacionais (Windows, Linux, macOS). Significa: "o jogo rodou sem falhas e encerrou com perfeição". Qualquer número diferente de 0 indicaria um código de erro.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 A Casca Mínima de um Programa em C++</div>
  <code>int main() { ... return 0; }</code>
</div>`,
            "#include <iostream>\n\nint main() {\n    // O jogo inteiro acontece dentro deste bloco!\n    return 0; // Código 0: Sucesso absoluto!\n}",
            c("Escreva o comando de retorno de sucesso return 0; com ponto e virgula.", "return ...;", "return 0;", "Use return 0;", "return 0;"),
            "#include <iostream>\n\nint main() {\n    // Estrutura mestre do jogo de RPG pronta\n    return 0;\n}"),

          L('cpp-1-3', "Exibindo Mensagens com std::cout, o Operador << e std::endl",
            `<h3>📢 A corneta de anúncio: dissecando cout, << e endl</h3>
<p>Chegou a hora de fazer o jogo falar com o jogador no terminal. O C++ faz isso com uma instrução muito característica: <code>std::cout &lt;&lt; "Texto" &lt;&lt; std::endl;</code>.</p>

<h3>📖 Entendendo cada termo:</h3>
<ul>
  <li><code>std::</code>: Significa <strong>Standard</strong> (Padrão). É o <em>namespace</em> (sobrenome de família) onde moram todas as ferramentas da biblioteca padrão do C++.</li>
  <li><code>cout</code>: Abreviação de <strong>Character Output</strong> (Saída de Caracteres). É o canal de comunicação direto com a tela do terminal.</li>
  <li><code>&lt;&lt;</code>: É o <strong>operador de inserção de fluxo</strong>. Pense nele como uma seta apontando para a esquerda: ele empurra o texto para dentro do <code>std::cout</code>!</li>
  <li><code>std::endl</code>: Abreviação de <strong>End Line</strong> (Fim de Linha). Ele pula para a linha seguinte e força o descarregamento imediato do buffer na tela.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Imprimindo no terminal em C++</div>
  <code>std::cout &lt;&lt; "Texto aqui" &lt;&lt; std::endl;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Crie uma pasta chamada <code>jogo-rpg-cpp</code> e dentro crie um arquivo chamado <code>jogo.cpp</code> no VS Code.</li>
  <li><strong>O código:</strong> Digite o programa completo abaixo e salve com <code>Ctrl+S</code>.</li>
  <li><strong>O que fazer depois:</strong> Abra o terminal na pasta do arquivo e digite:
    <br><code>g++ jogo.cpp -o jogo</code> (compila o código gerando o executável <code>jogo.exe</code>)
    <br><code>./jogo</code> (no Windows digite <code>.\\jogo.exe</code> ou apenas <code>jogo</code>)
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>=== ARENA MEDIEVAL: HEROES OF EDEV ===</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Se a mensagem aparecer, seu compilador C++ está funcionando perfeitamente! Se der erro de <em>g++ não reconhecido</em>, verifique se instalou o MinGW e marcou a opção de adicionar ao PATH do sistema.</li>
</ol>`,
            "#include <iostream>\n\nint main() {\n    std::cout << \"=== ARENA MEDIEVAL: HEROES OF EDEV ===\" << std::endl;\n    return 0;\n}",
            c("Mostre a mensagem \"Batalha Iniciada!\" no terminal usando std::cout e std::endl.", "std::cout << ...", "std::cout << \"Batalha Iniciada!\" << std::endl;", "Use std::cout << \"Batalha Iniciada!\" << std::endl;", "std::cout << \"Batalha Iniciada!\" << std::endl;"),
            "#include <iostream>\n\nint main() {\n    std::cout << \"==========================================\" << std::endl;\n    std::cout << \"       BATALHA MEDIEVAL: HEROES OF EDEV    \" << std::endl;\n    std::cout << \"==========================================\" << std::endl;\n    return 0;\n}"),

          L('cpp-1-4', "Variáveis do Guerreiro: vida, ataque, defesa e poções",
            `<h3>📊 A ficha de RPG: declarando status do herói</h3>
<p>Quando você abre o inventário do personagem em jogos como Dark Souls, você enxerga números precisos: Pontos de Vida (HP), Ataque e Poções no cinto.</p>

<p>Na memória RAM, cada atributo precisa de um tipo definido: <code>int</code> para números inteiros (como 100 de vida) e <code>double</code> para decimais.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Ficha de Status do Guerreiro</div>
  <code>int vidaHeroi = 100;<br>int ataqueHeroi = 25;<br>int armaduraHeroi = 10;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No seu arquivo <code>jogo.cpp</code>, dentro da função <code>main()</code>.</li>
  <li><strong>O que fazer depois:</strong> Salve o arquivo e compile no terminal:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Vida: 100 | Ataque: 25 | Pocoes: 3</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Mude <code>vidaHeroi</code> para 120 e recompile para ver a ficha atualizada.</li>
</ol>`,
            "#include <iostream>\n\nint main() {\n    int vida = 100;\n    int ataque = 25;\n    int pocoes = 3;\n\n    std::cout << \"Vida: \" << vida << \" | Ataque: \" << ataque << \" | Pocoes: \" << pocoes << std::endl;\n    return 0;\n}",
            c("Declare uma variável inteira chamada armadura com valor inicial 15.", "int armadura = ...;", "int armadura = 15;", "Defina int armadura = 15;", "int armadura = 15;"),
            "#include <iostream>\n\nint main() {\n    std::cout << \"==========================================\" << std::endl;\n    std::cout << \"       BATALHA MEDIEVAL: HEROES OF EDEV    \" << std::endl;\n    std::cout << \"==========================================\" << std::endl;\n\n    // Status do Heroi\n    int vidaHeroi = 100;\n    int ataqueHeroi = 20;\n    int armaduraHeroi = 10;\n    int pocoesCura = 3;\n\n    std::cout << \"Heroi pronto para a batalha! HP: \" << vidaHeroi << std::endl;\n    return 0;\n}"),

          L('cpp-1-5', "Lendo Ações do Jogador com std::cin e o Operador >>",
            `<h3>📥 Ouvindo o comando do teclado com std::cin</h3>
<p>Se o <code>cout</code> fala com o jogador na tela, o <code>std::cin</code> (<em>Character Input</em>) é o ouvido do jogo: ele pausa a execução e espera o jogador digitar um número ou letra e apertar Enter.</p>

<p>O operador agora se inverte: <code>&gt;&gt;</code> extrai os dados do teclado e os empurra diretamente para dentro da variável.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Capturando entrada com cin</div>
  <code>int escolha;<br>std::cin &gt;&gt; escolha;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Escolha sua acao: 1-Atacar | 2-Curar: 1
Comando registrado: 1</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Digite <code>2</code> no terminal e dê Enter para ver o comando registrado.</li>
</ol>`,
            "#include <iostream>\n\nint main() {\n    int escolha;\n    std::cout << \"Escolha sua acao: 1-Atacar | 2-Curar: \";\n    std::cin >> escolha;\n\n    std::cout << \"Comando registrado: \" << escolha << std::endl;\n    return 0;\n}",
            c("Leia a entrada do teclado para a variável inteira acao usando std::cin.", "std::cin >> ...", "std::cin >> acao;", "Use o operador >> apontando para acao.", "std::cin >> acao;"),
            "#include <iostream>\n\nint main() {\n    std::cout << \"==========================================\" << std::endl;\n    std::cout << \"       BATALHA MEDIEVAL: HEROES OF EDEV    \" << std::endl;\n    std::cout << \"==========================================\" << std::endl;\n\n    int vidaHeroi = 100;\n    int ataqueHeroi = 20;\n    int armaduraHeroi = 10;\n    int pocoesCura = 3;\n\n    int escolhaMenu = 0;\n    std::cout << \"\nMenu de Batalha:\n\";\n    std::cout << \"1 - Desferir Golpe de Espada\n\";\n    std::cout << \"2 - Beber Pocao de Cura\n\";\n    std::cout << \"Digite sua escolha: \";\n    std::cin >> escolhaMenu;\n\n    std::cout << \"Comando registrado: \" << escolhaMenu << std::endl;\n    return 0;\n}"),

          L('cpp-1-6', "Cálculos de Combate: Dano Líquido e Armadura",
            `<h3>🛡️ O escudo que amortece o impacto: dano líquido</h3>
<p>Quando uma lâmina atinge uma armadura de placas de ferro, ela não causa o dano integral. O metal absorve parte do impacto e apenas o restante penetra no corpo.</p>

<p>Nas regras do nosso RPG, o dano real sofrido é calculado subtraindo a armadura do ataque do oponente:</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Cálculo de Dano Líquido</div>
  <code>int danoReal = ataqueHeroi - armaduraMonstro;<br>vidaMonstro -= danoReal;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>O Heroi golpeia o Goblin causando 17 de dano!
Vida restante do Goblin: 43 HP</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Experimente aumentar a armadura do monstro para ver o dano reduzir proporcionalmente.</li>
</ol>`,
            "#include <iostream>\n\nint main() {\n    int ataqueHeroi = 25;\n    int armaduraMonstro = 8;\n    int danoCausado = ataqueHeroi - armaduraMonstro;\n\n    std::cout << \"Dano penetrante calculado: \" << danoCausado << std::endl;\n    return 0;\n}",
            c("Calcule a vida restante subtraindo danoSofrido da variavel vidaMonstro.", "int vidaMonstro = ...;", "vidaMonstro = vidaMonstro - danoSofrido;", "Você pode fazer vidaMonstro = vidaMonstro - danoSofrido;", "vidaMonstro = vidaMonstro - danoSofrido;"),
            "#include <iostream>\n\nint main() {\n    std::cout << \"==========================================\" << std::endl;\n    std::cout << \"       BATALHA MEDIEVAL: HEROES OF EDEV    \" << std::endl;\n    std::cout << \"==========================================\" << std::endl;\n\n    int vidaHeroi = 100;\n    int ataqueHeroi = 22;\n    int armaduraHeroi = 8;\n\n    int vidaMonstro = 60;\n    int ataqueMonstro = 15;\n    int armaduraMonstro = 5;\n\n    int danoHeroi = ataqueHeroi - armaduraMonstro;\n    vidaMonstro -= danoHeroi;\n\n    std::cout << \"O Heroi golpeia o Goblin causando \" << danoHeroi << \" de dano!\" << std::endl;\n    std::cout << \"Vida restante do Goblin: \" << vidaMonstro << \" HP\" << std::endl;\n\n    return 0;\n}"),

          L('cpp-1-7', "Constantes do Jogo com const e constexpr",
            `<h3>🔒 Regras gravadas em pedra mármore</h3>
<p>Em qualquer jogo de RPG balanceado, certas regras sagradas nunca podem ser violadas: a vida máxima do guerreiro é 100 e a taxa de cura da poção é fixa em 30 pontos.</p>

<p>Com <code>const</code> e <code>constexpr</code>, você protege variáveis contra alterações acidentais. Se alguma linha de código tentar mudar uma constante, o compilador barra o erro na hora!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Constante Imutável em C++</div>
  <code>const int VIDA_MAXIMA = 100;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No topo da <code>main()</code> do <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Configuracao de combate carregada com sucesso!</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Tente adicionar <code>VIDA_MAXIMA_HEROI = 200;</code> e veja o g++ se recusar a compilar, protegendo seu código!</li>
</ol>`,
            "#include <iostream>\n\nint main() {\n    const int VIDA_MAXIMA = 100;\n    const int CURA_POCAO = 30;\n\n    std::cout << \"Capacidade Maxima: \" << VIDA_MAXIMA << \" HP\" << std::endl;\n    return 0;\n}",
            c("Declare uma constante inteira chamada DANO_CRITICO com valor 50.", "const int ...", "const int DANO_CRITICO = 50;", "Use const int DANO_CRITICO = 50;", "const int DANO_CRITICO = 50;"),
            "#include <iostream>\n\nint main() {\n    const int VIDA_MAXIMA_HEROI = 100;\n    const int CURA_POCAO = 30;\n\n    std::cout << \"==========================================\" << std::endl;\n    std::cout << \"       BATALHA MEDIEVAL: HEROES OF EDEV    \" << std::endl;\n    std::cout << \"==========================================\" << std::endl;\n\n    int vidaHeroi = VIDA_MAXIMA_HEROI;\n    int ataqueHeroi = 22;\n    int armaduraHeroi = 8;\n    int pocoes = 2;\n\n    int vidaMonstro = 60;\n    int ataqueMonstro = 15;\n    int armaduraMonstro = 5;\n\n    std::cout << \"Configuracao de combate carregada com sucesso!\" << std::endl;\n    return 0;\n}")
        ]
      },

      // ── Módulo 2 — Controle de Fluxo e Loop de Combate ──
      {
        title: "Módulo 2 — Controle de Fluxo e Loop de Combate",
        lessons: [
          L('cpp-2-1', "Condição de Vitória e Derrota com if e else",
            `<h3>⚖️ O juiz da arena: vivo ou derrotado?</h3>
<p>Imagine o árbitro da arena olhando para o chão: se a contagem de fôlego do monstro chegou a zero, ele ergue a mão do herói em sinal de glória. Caso contrário, o duelo continua.</p>

<p>Com <code>if</code> e <code>else</code>, ensinamos o jogo a tomar decisões com base no HP dos combatentes.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Testando se o inimigo caiu</div>
  <code>if (vidaMonstro &lt;= 0) { std::cout &lt;&lt; "VITORIA!"; } else { ... }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>>>> VITORIA EPICA! O Monstro caiu derrotado! <<<</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Aumente o HP do monstro para 100 e veja o fluxo entrar no bloco <code>else</code> informando o HP restante.</li>
</ol>`,
            "#include <iostream>\n\nint main() {\n    int vidaMonstro = 0;\n\n    if (vidaMonstro <= 0) {\n        std::cout << \"VITORIA! O monstro foi aniquilado!\" << std::endl;\n    } else {\n        std::cout << \"O monstro ainda esta de pe com \" << vidaMonstro << \" HP!\" << std::endl;\n    }\n    return 0;\n}",
            c("Escreva uma condicional if para verificar se vidaHeroi <= 0 e exibir \"Game Over!\".", "if (vidaHeroi <= 0) { ... }", "if (vidaHeroi <= 0) { std::cout << \"Game Over!\" << std::endl; }", "Use if (vidaHeroi <= 0) { std::cout << \"Game Over!\" << std::endl; }", "if (vidaHeroi <= 0) { std::cout << \"Game Over!\" << std::endl; }"),
            "#include <iostream>\n\nint main() {\n    const int VIDA_MAXIMA_HEROI = 100;\n    int vidaHeroi = VIDA_MAXIMA_HEROI;\n    int ataqueHeroi = 25;\n    int vidaMonstro = 20;\n\n    std::cout << \"Heroi desfere golpe devastador de \" << ataqueHeroi << \" dano!\" << std::endl;\n    vidaMonstro -= ataqueHeroi;\n\n    if (vidaMonstro <= 0) {\n        std::cout << \">>> VITORIA EPICA! O Monstro caiu derrotado! <<<\" << std::endl;\n    } else {\n        std::cout << \"O Monstro sobreviveu com \" << vidaMonstro << \" HP!\" << std::endl;\n    }\n\n    return 0;\n}"),

          L('cpp-2-2', "Golpe Crítico com Operador Ternário (?:)",
            `<h3>⚡ A faca de dois gumes: o golpe crítico instantâneo</h3>
<p>Em jogos de ação, quando um golpe atinge um ponto fraco do inimigo, o dano dobra na mesma fração de segundo. Não precisamos de um bloco de 6 linhas para uma decisão tão direta.</p>

<p>O operador ternário <code>condicao ? seVerdadeiro : seFalso</code> resolve isso em uma única linha elegante.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Operador Ternário em Ação</div>
  <code>int danoFinal = eCritico ? (ataque * 2) : ataque;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>g++ jogo.cpp -o jogo</code> e rode com <code>./jogo</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>[GOLPE CRITICO! 2x Dano] Dano causado: 40</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Altere a variável <code>golpeCritico</code> para <code>false</code> e observe o dano normal de 20.</li>
</ol>`,
            "#include <iostream>\n\nint main() {\n    bool acertouPontoFraco = true;\n    int danoBase = 20;\n\n    int dano = acertouPontoFraco ? (danoBase * 2) : danoBase;\n    std::cout << \"Dano desferido: \" << dano << std::endl;\n    return 0;\n}",
            c("Use o operador ternário para atribuir a status \"VIVO\" se vida > 0, ou \"MORTO\" caso contrário.", "std::string status = ...", "std::string status = (vida > 0) ? \"VIVO\" : \"MORTO\";", "Siga o formato (vida > 0) ? \"VIVO\" : \"MORTO\";", "std::string status = (vida > 0) ? \"VIVO\" : \"MORTO\";"),
            "#include <iostream>\n\nint main() {\n    const int VIDA_MAXIMA_HEROI = 100;\n    int vidaHeroi = 80;\n    int ataqueHeroi = 20;\n\n    bool golpeCritico = true;\n    int danoAplicado = golpeCritico ? (ataqueHeroi * 2) : ataqueHeroi;\n\n    std::cout << (golpeCritico ? \"[GOLPE CRITICO! 2x Dano] \" : \"[GOLPE NORMAL] \");\n    std::cout << \"Dano causado: \" << danoAplicado << std::endl;\n\n    return 0;\n}"),

          L('cpp-2-3', "Menu de Batalha com switch case",
            `<h3>🧭 A rosa dos ventos: escolhendo ações com switch</h3>
<p>Imagine o painel de um caça: botão 1 atira canhões, botão 2 solta contramedidas e botão 3 aciona o pós-combustor. O <code>switch</code> salta diretamente para o <code>case</code> escolhido sem hesitação.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 switch com break obrigatório</div>
  <code>switch(comando) { case 1: ...; break; default: ...; break; }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>O Heroi avança com sua espada afiada!</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Altere a variável de escolha para 2 e veja o herói beber a poção revigorante.</li>
</ol>`,
            "#include <iostream>\n\nint main() {\n    int comando = 1;\n    switch (comando) {\n        case 1:\n            std::cout << \"Ataque com Espada!\" << std::endl;\n            break;\n        case 2:\n            std::cout << \"Uso de Pocao de Cura!\" << std::endl;\n            break;\n        default:\n            std::cout << \"Comando desconhecido!\" << std::endl;\n            break;\n    }\n    return 0;\n}",
            c("Complete o switch tratando o case 1 exibindo \"Ataque\" e o break correspondente.", "case 1: std::cout << \"Ataque\" << std::endl; ...", "case 1: std::cout << \"Ataque\" << std::endl; break;", "Lembre-se de colocar break; apos o comando.", "case 1: std::cout << \"Ataque\" << std::endl; break;"),
            "#include <iostream>\n\nint main() {\n    int escolha = 1;\n    std::cout << \"=== TURNO DO HEROI ===\n\";\n    std::cout << \"1 - Atacar | 2 - Curar | 3 - Defender\n\";\n\n    switch (escolha) {\n        case 1:\n            std::cout << \"O Heroi avança com sua espada afiada!\n\";\n            break;\n        case 2:\n            std::cout << \"O Heroi bebe uma pocao revigorante!\n\";\n            break;\n        case 3:\n            std::cout << \"O Heroi levanta seu escudo de ferro!\n\";\n            break;\n        default:\n            std::cout << \"Acao invalida! O Heroi hesitou no combate.\n\";\n            break;\n    }\n    return 0;\n}"),

          L('cpp-2-4', "O Loop Principal de Combate com while",
            `<h3>🔄 O coração que pulsa: o Game Loop</h3>
<p>Todos os jogos do mundo rodam dentro de um grande loop contínuo: enquanto ambos os lutadores estiverem de pé, processe a próxima rodada!</p>

<p>Com <code>while (vidaHeroi &gt; 0 &amp;&amp; vidaMonstro &gt; 0)</code>, os turnos se sucedem até o combate ter um vencedor definitivo.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Condição do Loop de Batalha</div>
  <code>while (vidaHeroi &gt; 0 &amp;&amp; vidaMonstro &gt; 0) { ... }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>--- Rodada 1 ---
Heroi causa 20 de dano! Goblin HP: 30
Goblin contra-ataca com 12 de dano! Heroi HP: 88
...
Combate finalizado com sucesso!</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Observe as rodadas se sucedendo automaticamente até o goblin ser derrotado!</li>
</ol>`,
            "#include <iostream>\n\nint main() {\n    int hpInimigo = 30;\n    while (hpInimigo > 0) {\n        std::cout << \"Golpe! Monstro perde 10 HP.\" << std::endl;\n        hpInimigo -= 10;\n    }\n    std::cout << \"Batalha encerrada!\" << std::endl;\n    return 0;\n}",
            c("Escreva o cabecalho de um loop while que continua enquanto vidaHeroi > 0 e vidaMonstro > 0.", "while (...)", "while (vidaHeroi > 0 && vidaMonstro > 0)", "Use while (vidaHeroi > 0 && vidaMonstro > 0)", "while (vidaHeroi > 0 && vidaMonstro > 0)"),
            "#include <iostream>\n\nint main() {\n    int vidaHeroi = 100;\n    int vidaMonstro = 50;\n    int rodada = 1;\n\n    std::cout << \">>> INICIANDO O DUELO FINAL <<<\n\";\n\n    while (vidaHeroi > 0 && vidaMonstro > 0) {\n        std::cout << \"\n--- Rodada \" << rodada << \" ---\n\";\n        vidaMonstro -= 20;\n        std::cout << \"Heroi causa 20 de dano! Goblin HP: \" << vidaMonstro << \"\n\";\n\n        if (vidaMonstro > 0) {\n            vidaHeroi -= 12;\n            std::cout << \"Goblin contra-ataca com 12 de dano! Heroi HP: \" << vidaHeroi << \"\n\";\n        }\n        rodada++;\n    }\n\n    std::cout << \"\nCombate finalizado com sucesso!\n\";\n    return 0;\n}"),

          L('cpp-2-5', "Contando Rodadas de Combate com for",
            `<h3>⏱️ O cronômetro dos turnos com for</h3>
<p>Imagine que o herói bebe uma poção mágica que concede um escudo protetor temporário que dura exatamente 3 rodadas. Como saber exatamente quando o efeito expira?</p>

<p>O laço <code>for (int r = 1; r &lt;= 3; r++)</code> conta as rodadas com precisão milimétrica.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Loop for de 3 rodadas</div>
  <code>for (int rodada = 1; rodada &lt;= 3; rodada++) { ... }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>g++ jogo.cpp -o jogo</code> e rode com <code>./jogo</code>.</li>
  <li><strong>O que esperar na tela:</strong> As 3 rodadas serão processadas e o efeito encerrado.</li>
  <li><strong>Agora é sua vez:</strong> Altere o limite para 5 e veja a duração estendida.</li>
</ol>`,
            "#include <iostream>\n\nint main() {\n    for (int rodada = 1; rodada <= 3; rodada++) {\n        std::cout << \"Efeito de veneno ativo na rodada: \" << rodada << std::endl;\n    }\n    return 0;\n}",
            c("Crie um for que vai de int i = 1 ate i <= 5 incrementando com i++.", "for (int i = 1; ...; ...)", "for (int i = 1; i <= 5; i++)", "Complete com i <= 5; i++", "for (int i = 1; i <= 5; i++)"),
            "#include <iostream>\n\nint main() {\n    std::cout << \"=== SIMULACAO DE 3 RODADAS DE TESTE ===\n\";\n\n    for (int rodada = 1; rodada <= 3; rodada++) {\n        std::cout << \"Rodada \" << rodada << \": Verificando status e efeitos dos personagens.\n\";\n    }\n\n    std::cout << \"Simulacao concluida!\n\";\n    return 0;\n}"),

          L('cpp-2-6', "Validação de Entrada do Jogador contra Comandos Inválidos",
            `<h3>🛡️ O porteiro implacável: blindando contra erros de digitação</h3>
<p>O que acontece se o menu pede para o jogador digitar 1 (Atacar) ou 2 (Curar) e ele digita 9 ou -1? Um jogo profissional não aceita entradas malucas.</p>

<p>Com o loop <code>do-while</code>, repetimos a pergunta até que o jogador digite uma opção estritamente válida.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Repetição até entrada válida</div>
  <code>do { std::cin &gt;&gt; comando; } while (comando != 1 &amp;&amp; comando != 2);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code> dentro do loop do combate.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Escolha: 1-Golpear com Espada | 2-Usar Pocao: 8
Opcao invalida! Tente novamente.
Escolha: 1-Golpear com Espada | 2-Usar Pocao: 1
Voce desferiu um corte de espada certeiro!</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Digite 5 e comprove que o jogo não avança enquanto a opção correta não for escolhida.</li>
</ol>`,
            "#include <iostream>\n\nint main() {\n    int escolha;\n    do {\n        std::cout << \"Digite 1 (Atacar) ou 2 (Defender): \";\n        std::cin >> escolha;\n    } while (escolha != 1 && escolha != 2);\n\n    std::cout << \"Opcao valida selecionada: \" << escolha << std::endl;\n    return 0;\n}",
            c("Escreva a condicao de repeticao while para opcao != 1 && opcao != 2.", "while (...)", "while (opcao != 1 && opcao != 2);", "Use while (opcao != 1 && opcao != 2); com ponto e virgula no final.", "while (opcao != 1 && opcao != 2);"),
            "#include <iostream>\n\nint main() {\n    std::cout << \"==========================================\" << std::endl;\n    std::cout << \"       BATALHA MEDIEVAL: HEROES OF EDEV    \" << std::endl;\n    std::cout << \"==========================================\" << std::endl;\n\n    int vidaHeroi = 100;\n    int vidaMonstro = 50;\n\n    while (vidaHeroi > 0 && vidaMonstro > 0) {\n        int comando;\n        do {\n            std::cout << \"\nEscolha: 1-Golpear com Espada | 2-Usar Pocao: \";\n            std::cin >> comando;\n            if (comando != 1 && comando != 2) {\n                std::cout << \"Opcao invalida! Tente novamente.\n\";\n            }\n        } while (comando != 1 && comando != 2);\n\n        if (comando == 1) {\n            std::cout << \"Voce desferiu um corte de espada certeiro!\n\";\n            vidaMonstro -= 25;\n        } else {\n            std::cout << \"Voce bebeu uma pocao revigorante!\n\";\n            vidaHeroi += 20;\n        }\n    }\n\n    std::cout << \"\nO confronto chegou ao fim!\n\";\n    return 0;\n}")
        ]
      },

      // ── Módulo 3 — Funções, Referências (&) e Dano Aleatório ──
      {
        title: "Módulo 3 — Funções, Referências (&) e Dano Aleatório",
        lessons: [
          L('cpp-3-1', "Modularizando o Jogo com Funções em C++",
            `<h3>🧩 A caixa de ferramentas: dividindo para conquistar</h3>
<p>Se você colocar todo o código do jogo dentro de uma única função <code>main()</code>, ela rapidamente terá centenas de linhas confusas e difíceis de corrigir.</p>

<p>Funções são blocos isolados e reutilizáveis com um objetivo claro: uma função para exibir o cabeçalho, outra para calcular dano e outra para mostrar o status.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Função sem retorno (void)</div>
  <code>void exibirCabecalho() { ... }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No seu arquivo <code>jogo.cpp</code>, fora e antes da função <code>main()</code>.</li>
  <li><strong>O que fazer depois:</strong> Abra o terminal e digite:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>[STATUS HEROI] Vida: 100 HP | Pocoes Restantes: 2</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Chame <code>exibirStatusHeroi</code> duas vezes com valores diferentes e veja a modularização funcionando.</li>
</ol>`,
            "#include <iostream>\n\nvoid exibirCabecalho() {\n    std::cout << \"==========================================\" << std::endl;\n    std::cout << \"       BATALHA MEDIEVAL: HEROES OF EDEV    \" << std::endl;\n    std::cout << \"==========================================\" << std::endl;\n}\n\nint main() {\n    exibirCabecalho();\n    return 0;\n}",
            c("Declare uma funcao void chamada saudarJogador que exibe \"Bem-vindo guerreiro!\" com cout.", "void saudarJogador() { ... }", "void saudarJogador() { std::cout << \"Bem-vindo guerreiro!\" << std::endl; }", "Use void saudarJogador() { std::cout << \"Bem-vindo guerreiro!\" << std::endl; }", "void saudarJogador() { std::cout << \"Bem-vindo guerreiro!\" << std::endl; }"),
            "#include <iostream>\n\nvoid exibirStatusHeroi(int hp, int pocoes) {\n    std::cout << \"[STATUS HEROI] Vida: \" << hp << \" HP | Pocoes Restantes: \" << pocoes << \"\n\";\n}\n\nint main() {\n    int vidaHeroi = 100;\n    int pocoes = 2;\n\n    exibirStatusHeroi(vidaHeroi, pocoes);\n    return 0;\n}"),

          L('cpp-3-2', "Passagem por Valor vs Referência (&): Alterando a Vida Real",
            `<h3>🪞 Tirar uma fotocópia vs Dar a chave original</h3>
<p>Esta é uma das lições mais importantes de toda a sua vida como programador C++.</p>

<p>Por padrão, quando você passa uma variável para uma função, o C++ tira uma <strong>cópia</strong> dela. Se você alterar a cópia dentro da função, a variável original lá fora continua intacta.</p>

<p>Mas quando colocamos o símbolo <code>&amp;</code> (referência) ao lado do tipo no parâmetro, a função recebe um <em>apelido direto para a variável original</em> na memória!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Parâmetro por referência (&)</div>
  <code>void aplicarDano(int &amp;vidaAlvo, int dano) { vidaAlvo -= dano; }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Goblin HP antes do golpe: 40
Goblin HP apos sofrer dano por referencia: 25</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Remova o <code>&amp;</code> do parâmetro por curiosidade, recompile e comprove que o HP voltaria a ficar em 40 sem a referência!</li>
</ol>`,
            "#include <iostream>\n\nvoid aplicarDano(int &vida, int dano) {\n    vida -= dano;\n}\n\nint main() {\n    int vidaHeroi = 100;\n    aplicarDano(vidaHeroi, 25);\n    std::cout << \"Vida real alterada: \" << vidaHeroi << std::endl;\n    return 0;\n}",
            c("Declare o parametro de vida como referencia int &vida na funcao sofrerGolpe.", "void sofrerGolpe(int ... vida, int dano)", "void sofrerGolpe(int &vida, int dano)", "Coloque o & colado no int ou antes de vida: int &vida", "void sofrerGolpe(int &vida, int dano)"),
            "#include <iostream>\n\nvoid aplicarDano(int &vidaAlvo, int dano) {\n    vidaAlvo -= dano;\n    if (vidaAlvo < 0) vidaAlvo = 0;\n}\n\nint main() {\n    int vidaGoblin = 40;\n    std::cout << \"Goblin HP antes do golpe: \" << vidaGoblin << \"\n\";\n\n    aplicarDano(vidaGoblin, 15);\n    std::cout << \"Goblin HP apos sofrer dano por referencia: \" << vidaGoblin << \"\n\";\n\n    return 0;\n}"),

          L('cpp-3-3', "Otimizando Textos com Referência Constante (const std::string &)",
            `<h3>👀 Olhar sem tocar: economia máxima de memória</h3>
<p>Imagine que você tem uma enciclopédia grossa de 800 páginas com a história do monstro. Se você pedir a alguém para ler o nome do monstro, não faz sentido mandar fotocopiar o livro inteiro só para ler a capa!</p>

<p>Passar textos pesados por valor duplica a string na memória RAM. Passar por <code>const std::string &amp;</code> entrega apenas um ponteiro de leitura rápida: zero cópias de memória e garantia de que o texto não será corrompido.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Referência Constante de Alto Rendimento</div>
  <code>void anunciar(const std::string &amp;nome) { ... }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>, incluindo <code>#include &lt;string&gt;</code> no topo.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>g++ jogo.cpp -o jogo</code> e rode com <code>./jogo</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>>>> [LOG DO COMBATE]: O Monstro canalizou energia sombria! <<<</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Passe textos longos e note que o processamento é instantâneo.</li>
</ol>`,
            "#include <iostream>\n#include <string>\n\nvoid anunciarInimigo(const std::string &nome, int nivel) {\n    std::cout << \"Um temivel \" << nome << \" de nivel \" << nivel << \" surgiu na arena!\" << std::endl;\n}\n\nint main() {\n    std::string monstro = \"Dragao de Lava Ancestral\";\n    anunciarInimigo(monstro, 50);\n    return 0;\n}",
            c("Declare uma funcao void logarAcao que recebe const std::string &msg como parametro.", "void logarAcao(...)", "void logarAcao(const std::string &msg)", "Use const std::string &msg entre os parenteses.", "void logarAcao(const std::string &msg)"),
            "#include <iostream>\n#include <string>\n\nvoid exibirAviso(const std::string &mensagem) {\n    std::cout << \">>> [LOG DO COMBATE]: \" << mensagem << \" <<<\n\";\n}\n\nint main() {\n    std::string alerta = \"O Monstro canalizou energia sombria!\";\n    exibirAviso(alerta);\n    return 0;\n}"),

          L('cpp-3-4', "Gerando Dano Aleatório com rand(), srand() e time()",
            `<h3>🎲 O rolar dos dados de RPG na mesa</h3>
<p>Em um bom RPG de mesa, nenhum golpe causa rigorosamente o mesmo dano o tempo todo. O jogador rola um dado para saber a intensidade do golpe: pode sair uma raspagem fraca ou uma estocada fatal!</p>

<p>Com <code>rand()</code> e <code>srand(time(0))</code> (das bibliotecas <code>&lt;cstdlib&gt;</code> e <code>&lt;ctime&gt;</code>), alimentamos a semente dos números pseudoaleatórios com o relógio do computador.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Semente e Dano Aleatório</div>
  <code>srand(time(0));<br>int dano = min + (rand() % (max - min + 1));</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>, incluindo <code>#include &lt;cstdlib&gt;</code> e <code>#include &lt;ctime&gt;</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute duas vezes seguidas:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong> Um dano diferente a cada execução (ex: 22, depois 19, depois 27).</li>
  <li><strong>Agora é sua vez:</strong> Teste rodar repetidamente e confirme a variação dinâmica.</li>
</ol>`,
            "#include <iostream>\n#include <cstdlib>\n#include <ctime>\n\nint rolarDano(int minimo, int maximo) {\n    int variacao = (maximo - minimo) + 1;\n    return minimo + (rand() % variacao);\n}\n\nint main() {\n    srand(time(0));\n    std::cout << \"Dano aleatorio gerado: \" << rolarDano(10, 20) << std::endl;\n    return 0;\n}",
            c("Inicie a semente aleatoria chamando srand com time(0).", "srand(...);", "srand(time(0));", "Passe time(0) para a funcao srand.", "srand(time(0));"),
            "#include <iostream>\n#include <cstdlib>\n#include <ctime>\n\nint calcularDanoAleatorio(int danoMin, int danoMax) {\n    return danoMin + (rand() % (danoMax - danoMin + 1));\n}\n\nint main() {\n    srand(time(0));\n    int dano = calcularDanoAleatorio(18, 28);\n    std::cout << \"Golpe crítico calculado nos dados: \" << dano << \" de dano!\n\";\n    return 0;\n}"),

          L('cpp-3-5', "Função usarPocao(): Cura e Consumo de Estoque",
            `<h3>🧪 A garrafa vermelha: curando sem transbordar o frasco</h3>
<p>Quando o guerreiro bebe um elixir de cura, duas coisas acontecem ao mesmo tempo: a vida sobe (sem passar do teto de 100 HP) e a quantidade de poções diminui em 1.</p>

<p>Como a função precisa modificar <em>ambos</em> os status, passamos tanto a vida quanto o estoque por referência (<code>&amp;</code>)!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Dois Parâmetros por Referência</div>
  <code>void usarPocao(int &amp;vida, int &amp;pocoes, int cura, int maximo)</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>g++ jogo.cpp -o jogo</code> e rode com <code>./jogo</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Cura aplicada com sucesso! HP: 85 | Pocoes restantes: 0</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Chame a função novamente com poções em 0 e veja o aviso de "Mochila vazia".</li>
</ol>`,
            "#include <iostream>\n\nvoid usarPocao(int &vida, int &pocoes) {\n    if (pocoes <= 0) {\n        std::cout << \"Nao restam pocoes no cinto!\" << std::endl;\n        return;\n    }\n    pocoes--;\n    vida += 30;\n    if (vida > 100) vida = 100;\n    std::cout << \"Pocao ingerida! HP atual: \" << vida << \" | Restam: \" << pocoes << std::endl;\n}\n\nint main() {\n    int hp = 60;\n    int estoque = 2;\n    usarPocao(hp, estoque);\n    return 0;\n}",
            c("Verifique se poucoes <= 0 e encerre a funcao com return imediato.", "if (pocoes <= 0) { ... }", "if (pocoes <= 0) { return; }", "Use if (pocoes <= 0) { return; }", "if (pocoes <= 0) { return; }"),
            "#include <iostream>\n\nvoid curarHeroi(int &vida, int &pocoes, int curaMax, int tetoVida) {\n    if (pocoes <= 0) {\n        std::cout << \"Mochila vazia! Nao ha pocoes disponiveis.\n\";\n        return;\n    }\n    pocoes--;\n    vida += curaMax;\n    if (vida > tetoVida) vida = tetoVida;\n    std::cout << \"Cura aplicada com sucesso! HP: \" << vida << \" | Pocoes restantes: \" << pocoes << \"\n\";\n}\n\nint main() {\n    int vidaHeroi = 50;\n    int pocoes = 1;\n    curarHeroi(vidaHeroi, pocoes, 35, 100);\n    return 0;\n}"),

          L('cpp-3-6', "Protótipos de Funções no Topo do Arquivo",
            `<h3>📑 O índice do livro: avisando o compilador com antecedência</h3>
<p>O compilador do C++ lê o arquivo de cima para baixo. Se a <code>main()</code> chamar uma função que só foi escrita lá no final do arquivo, o g++ reclamará que a função é desconhecida.</p>

<p>Para resolver isso com perfeição, colocamos os <strong>protótipos</strong> (as assinaturas terminadas com ponto e vírgula) no topo do arquivo antes da <code>main()</code>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Protótipo no topo do código</div>
  <code>void exibirBoletimTurno(int hp1, int hp2); // No topo!</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>, organize os protótipos antes da <code>main()</code> e a implementação das funções abaixo dela.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Heroi: 100 HP | Monstro: 70 HP
Golpe desferido! -25 HP
Heroi: 100 HP | Monstro: 45 HP</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Observe como o código da <code>main()</code> fica limpo e legível logo no início do arquivo.</li>
</ol>`,
            "#include <iostream>\n\n// Prototipos das funcoes antes da main()\nvoid exibirAbertura();\nint calcularDano(int ataque, int armadura);\n\nint main() {\n    exibirAbertura();\n    std::cout << \"Dano calculado: \" << calcularDano(30, 10) << std::endl;\n    return 0;\n}\n\n// Implementacao real das funcoes apos a main()\nvoid exibirAbertura() {\n    std::cout << \"=== ARENA DE GLADIADORES ===\" << std::endl;\n}\n\nint calcularDano(int ataque, int armadura) {\n    return ataque - armadura;\n}",
            c("Declare o prototipo de uma funcao chamada curar que recebe int &vida e int valor e nao retorna nada.", "void curar(...);", "void curar(int &vida, int valor);", "Escreva void curar(int &vida, int valor); com ponto e virgula no fim.", "void curar(int &vida, int valor);"),
            "#include <iostream>\n\nvoid exibirBoletimTurno(int hp1, int hp2);\nvoid aplicarGolpe(int &alvoHp, int poderAtaque);\n\nint main() {\n    int heroiHp = 100;\n    int monstroHp = 70;\n\n    exibirBoletimTurno(heroiHp, monstroHp);\n    aplicarGolpe(monstroHp, 25);\n    exibirBoletimTurno(heroiHp, monstroHp);\n\n    return 0;\n}\n\nvoid exibirBoletimTurno(int hp1, int hp2) {\n    std::cout << \"Heroi: \" << hp1 << \" HP | Monstro: \" << hp2 << \" HP\n\";\n}\n\nvoid aplicarGolpe(int &alvoHp, int poderAtaque) {\n    alvoHp -= poderAtaque;\n    std::cout << \"Golpe desferido! -\" << poderAtaque << \" HP\n\";\n}")
        ]
      },

      // ── Módulo 4 — Mochila do Guerreiro com std::vector e Strings ──
      {
        title: "Módulo 4 — Mochila do Guerreiro com std::vector e Strings",
        lessons: [
          L('cpp-4-1', "Manipulando Textos Dinâmicos com std::string",
            `<h3>📜 O pergaminho elástico: muito além de caracteres fixos</h3>
<p>No C antigo, lidar com texto era um pesadelo de ponteiros de caracteres (<code>char*</code>) e buffers perigosos.</p>

<p>No C++ moderno, usamos <code>std::string</code> da biblioteca <code>&lt;string&gt;</code>. Ela gerencia o tamanho dinamicamente, permitindo juntar textos com o operador <code>+</code> e descobrir o tamanho com <code>.length()</code>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Concatenando strings facilmente</div>
  <code>std::string titulo = nomeHeroi + " o Destemido";</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>g++ jogo.cpp -o jogo</code> e execute com <code>./jogo</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Alvo avistado: Goblin, o Chefe dos Salteadores</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Altere o nome e a patente do monstro e veja a fusão de textos.</li>
</ol>`,
            "#include <iostream>\n#include <string>\n\nint main() {\n    std::string nome = \"Aragorn\";\n    std::string classe = \"Guerreiro\";\n    std::string perfil = nome + \" [\" + classe + \"]\";\n\n    std::cout << \"Combatente: \" << perfil << \" (\" << perfil.length() << \" caracteres)\" << std::endl;\n    return 0;\n}",
            c("Concatene a string prefixo com \" - \" e sufixo atribuindo a resultado.", "std::string resultado = ...;", "std::string resultado = prefixo + \" - \" + sufixo;", "Use o operador + para juntar as partes: prefixo + \" - \" + sufixo;", "std::string resultado = prefixo + \" - \" + sufixo;"),
            "#include <iostream>\n#include <string>\n\nint main() {\n    std::string tituloMonstro = \"Goblin\";\n    std::string patente = \"Chefe dos Salteadores\";\n    std::string inimigoCompleto = tituloMonstro + \", o \" + patente;\n\n    std::cout << \"Alvo avistado: \" << inimigoCompleto << std::endl;\n    return 0;\n}"),

          L('cpp-4-2', "A Mochila do Guerreiro com std::vector",
            `<h3>🎒 A mochila sem fundo: vetores dinâmicos</h3>
<p>Imagine uma mochila mágica de RPG: ela começa vazia, mas sempre que você acha um rubi ou uma espada nova, o fundo da bolsa se expande automaticamente para caber o novo item.</p>

<p>Isso é o <code>std::vector</code> em C++! Ele cresce conforme novos itens são adicionados com <code>push_back()</code>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Adicionando item à mochila</div>
  <code>std::vector&lt;std::string&gt; mochila;<br>mochila.push_back("Pocao Maior");</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>, incluindo <code>#include &lt;vector&gt;</code> no topo.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Inventario carregado com 3 itens.</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Adicione um 4º item com <code>push_back("Escudo")</code> e veja o tamanho atualizar.</li>
</ol>`,
            "#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n    std::vector<std::string> mochila;\n    mochila.push_back(\"Espada de Ferro\");\n    mochila.push_back(\"Pocao de Cura\");\n    mochila.push_back(\"Escudo de Madeira\");\n\n    std::cout << \"Itens na mochila: \" << mochila.size() << std::endl;\n    std::cout << \"Primeiro item guardado: \" << mochila[0] << std::endl;\n    return 0;\n}",
            c("Adicione \"Pocao de Mana\" no final do vetor itens com push_back.", "itens.push_back(...);", "itens.push_back(\"Pocao de Mana\");", "Chame itens.push_back(\"Pocao de Mana\");", "itens.push_back(\"Pocao de Mana\");"),
            "#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n    std::vector<std::string> inventarioHeroi;\n    inventarioHeroi.push_back(\"Espada Longa de Aço\");\n    inventarioHeroi.push_back(\"Pocao de Vida\");\n    inventarioHeroi.push_back(\"Pergaminho de Teleporte\");\n\n    std::cout << \"Inventario carregado com \" << inventarioHeroi.size() << \" itens.\n\";\n    return 0;\n}"),

          L('cpp-4-3', "Percorrendo a Mochila com Range-Based for e auto",
            `<h3>🔍 Abrindo a mochila e listando cada tesouro</h3>
<p>Como inspecionar tudo o que o guerreiro carrega sem precisar ficar lidando com índices manuais?</p>

<p>O C++ moderno nos dá o <em>range-based for</em> com a palavra-chave <code>auto</code>: o compilador deduz automaticamente o tipo do item e percorre a lista de ponta a ponta sem cópias desnecessárias.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Percorrendo o vetor com auto</div>
  <code>for (const auto &amp;item : mochila) { std::cout &lt;&lt; item &lt;&lt; std::endl; }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>=== ITENS EQUIPADOS NO INVENTARIO ===
[Item]: Adaga Envenenada
[Item]: Pocao Vermelha
[Item]: Amuleto de Protecao</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Adicione mais um item à lista e veja ele aparecer automaticamente no relatório.</li>
</ol>`,
            "#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n    std::vector<std::string> itens = {\"Espada\", \"Escudo\", \"Elixir\", \"Tocha\"};\n\n    std::cout << \"=== CONTEUDO DA MOCHILA ===\" << std::endl;\n    for (const auto &item : itens) {\n        std::cout << \" -> \" << item << std::endl;\n    }\n    return 0;\n}",
            c("Escreva o cabecalho de um range-based for percorrendo o vetor mochila com const auto &item.", "for (const auto &item : ...)", "for (const auto &item : mochila)", "Use for (const auto &item : mochila)", "for (const auto &item : mochila)"),
            "#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n    std::vector<std::string> mochila = {\n        \"Adaga Envenenada\",\n        \"Pocao Vermelha\",\n        \"Amuleto de Protecao\"\n    };\n\n    std::cout << \"=== ITENS EQUIPADOS NO INVENTARIO ===\n\";\n    for (const auto &item : mochila) {\n        std::cout << \"[Item]: \" << item << \"\n\";\n    }\n    return 0;\n}"),

          L('cpp-4-4', "Removendo Itens Usados com vector::erase()",
            `<h3>🗑️ Descartando o frasco vazio da poção</h3>
<p>Quando o guerreiro bebe a última gota de um elixir no meio do combate, a garrafa vazia é descartada para não ocupar espaço no inventário.</p>

<p>Com o método <code>erase()</code>, o vetor remove o elemento na posição exata indicada pelo iterador e reorganiza todos os itens seguintes.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Removendo o primeiro item com erase</div>
  <code>mochila.erase(mochila.begin());</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile com <code>g++ jogo.cpp -o jogo</code> e rode com <code>./jogo</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Consumindo: Pocao de Cura
Restante no cinto: Bomba de Fumaca</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Verifique com <code>slots.size()</code> que o vetor agora tem apenas 1 item.</li>
</ol>`,
            "#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n    std::vector<std::string> cinto = {\"Pocao 1\", \"Pocao 2\"};\n    std::cout << \"Bebendo a primeira pocao...\" << std::endl;\n    cinto.erase(cinto.begin());\n\n    std::cout << \"Itens restantes no cinto: \" << cinto.size() << std::endl;\n    return 0;\n}",
            c("Remova o primeiro elemento do vetor itens usando erase e itens.begin().", "itens.erase(...);", "itens.erase(itens.begin());", "Chame itens.erase(itens.begin());", "itens.erase(itens.begin());"),
            "#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n    std::vector<std::string> slots = {\"Pocao de Cura\", \"Bomba de Fumaca\"};\n    std::cout << \"Consumindo: \" << slots[0] << \"\n\";\n    slots.erase(slots.begin());\n\n    std::cout << \"Restante no cinto: \" << slots[0] << \"\n\";\n    return 0;\n}"),

          L('cpp-4-5', "Recompensas Pós-Combate: Adicionando Loot à Mochila",
            `<h3>💎 O baú do tesouro: coletando o espólio da vitória</h3>
<p>Após derrubar o chefe na arena, uma arca dourada cai no chão. O guerreiro se aproxima e encontra uma nova armadura reforçada e itens lendários.</p>

<p>Ao vencer a luta, o motor de combate gera novos itens e os insere dinamicamente no inventário permanente do jogador usando <code>push_back()</code>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Entregando o espólio da vitória</div>
  <code>inventario.push_back("Espada Rúnica Lendária");</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Vitoria na masmorra confirmada!
Espólio adquirido: Elmo de Mitril guardado no inventário!
Inventario final:
 - Espada Enferrujada
 - Elmo de Mitril</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Altere a recompensa para um amuleto e veja a lista finalizada.</li>
</ol>`,
            "#include <iostream>\n#include <vector>\n#include <string>\n\nvoid entregarLoot(std::vector<std::string> &mochila, const std::string &recompensa) {\n    mochila.push_back(recompensa);\n    std::cout << \">>> NOVO LOOT COLETADO: \" << recompensa << \" <<<\" << std::endl;\n}\n\nint main() {\n    std::vector<std::string> mochilaHeroi;\n    entregarLoot(mochilaHeroi, \"Adaga das Sombras +3\");\n    return 0;\n}",
            c("Chame a funcao entregarLoot passando inventario e a string \"Gema Rara\".", "entregarLoot(..., ...);", "entregarLoot(inventario, \"Gema Rara\");", "Use entregarLoot(inventario, \"Gema Rara\");", "entregarLoot(inventario, \"Gema Rara\");"),
            "#include <iostream>\n#include <vector>\n#include <string>\n\nvoid adicionarRecompensa(std::vector<std::string> &mochila, const std::string &item) {\n    mochila.push_back(item);\n    std::cout << \"Espólio adquirido: \" << item << \" guardado no inventário!\n\";\n}\n\nint main() {\n    std::vector<std::string> mochila = {\"Espada Enferrujada\"};\n    std::cout << \"Vitoria na masmorra confirmada!\n\";\n    adicionarRecompensa(mochila, \"Elmo de Mitril\");\n\n    std::cout << \"\nInventario final:\n\";\n    for (const auto &item : mochila) {\n        std::cout << \" - \" << item << \"\n\";\n    }\n    return 0;\n}")
        ]
      },

      // ── Módulo 5 — Classes, Construtores e Herança dos Personagens ──
      {
        title: "Módulo 5 — Classes, Construtores e Herança dos Personagens",
        lessons: [
          L('cpp-5-1', "A Classe Personagem com public e private em C++",
            `<h3>🏰 A planta baixa do castelo: modelando seres vivos</h3>
<p>Até aqui, trabalhamos com variáveis soltas: vida aqui, ataque acolá. Mas um guerreiro não é apenas um punhado de números isolados; ele é uma entidade viva com atributos e comportamentos próprios.</p>

<p>Uma <code>class</code> é o molde do guerreiro. Separamos o que é privado (<code>private</code>) — como órgãos internos que ninguém de fora pode alterar — do que é público (<code>public</code>), como botões de ação e status visíveis.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Sintaxe de classe com ponto e vírgula obrigatório</div>
  <code>class Personagem { private: int vida; public: void atacar(); };</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No seu arquivo <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Combatente: Cavaleiro do Sol | HP: 120 | ATQ: 25</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Verifique que a classe termina com <code>};</code> (chave e ponto e vírgula).</li>
</ol>`,
            "#include <iostream>\n#include <string>\n\nclass Personagem {\nprivate:\n    std::string nome;\n    int vida;\n\npublic:\n    void definirDados(const std::string &n, int v) {\n        nome = n;\n        vida = v;\n    }\n\n    void exibir() {\n        std::cout << nome << \" [HP: \" << vida << \"]\" << std::endl;\n    }\n};\n\nint main() {\n    Personagem heroi;\n    heroi.definirDados(\"Conan\", 100);\n    heroi.exibir();\n    return 0;\n}",
            c("Declare uma classe vazia chamada Monstro com encerramento de chave e ponto e virgula.", "class Monstro { ...", "class Monstro {};", "Lembre-se do ponto e virgula no final: class Monstro {};", "class Monstro {};"),
            "#include <iostream>\n#include <string>\n\nclass Personagem {\nprivate:\n    std::string nome;\n    int vida;\n    int ataque;\n\npublic:\n    void inicializar(const std::string &n, int v, int a) {\n        nome = n;\n        vida = v;\n        ataque = a;\n    }\n\n    void mostrarFicha() {\n        std::cout << \"Combatente: \" << nome << \" | HP: \" << vida << \" | ATQ: \" << ataque << \"\n\";\n    }\n};\n\nint main() {\n    Personagem p;\n    p.inicializar(\"Cavaleiro do Sol\", 120, 25);\n    p.mostrarFicha();\n    return 0;\n}"),

          L('cpp-5-2', "Construtores com Lista de Inicialização de Membros",
            `<h3>👶 A certidão de nascimento: construtores em C++</h3>
<p>Quando um personagem surge no mundo, ele não pode nascer com memória lixo ou sem nome. O <strong>construtor</strong> é o método especial que roda automaticamente no exato instante em que o objeto é criado.</p>

<p>No C++, a melhor prática de performance é a <em>lista de inicialização de membros</em> com dois pontos (<code>:</code>). Ela coloca os valores direto nos campos da memória antes mesmo do corpo do construtor começar!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Construtor com inicializador rápido</div>
  <code>Personagem(std::string n, int v) : nome(n), vida(v) {}</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na classe <code>Personagem</code> em <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Arthur [HP: 100 | ATQ: 22]</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Crie um segundo combatente <code>Personagem m("Orc", 80, 15);</code> e exiba o status de ambos.</li>
</ol>`,
            "#include <iostream>\n#include <string>\n\nclass Personagem {\npublic:\n    std::string nome;\n    int vida;\n\n    Personagem(std::string n, int v) : nome(n), vida(v) {\n        std::cout << \"Guerreiro \" << nome << \" nasceu na arena!\" << std::endl;\n    }\n};\n\nint main() {\n    Personagem heroi(\"Valquiria\", 110);\n    return 0;\n}",
            c("Escreva o cabecalho de um construtor Guerreiro que recebe std::string n e int v.", "Guerreiro(...)", "Guerreiro(std::string n, int v)", "Use Guerreiro(std::string n, int v)", "Guerreiro(std::string n, int v)"),
            "#include <iostream>\n#include <string>\n\nclass Personagem {\nprivate:\n    std::string nome;\n    int vida;\n    int ataque;\n\npublic:\n    Personagem(std::string n, int v, int a) : nome(n), vida(v), ataque(a) {\n        std::cout << \"Personagem \" << nome << \" pronto para o combate!\n\";\n    }\n\n    void status() {\n        std::cout << nome << \" [HP: \" << vida << \" | ATQ: \" << ataque << \"]\n\";\n    }\n};\n\nint main() {\n    Personagem heroi(\"Arthur\", 100, 22);\n    heroi.status();\n    return 0;\n}"),

          L('cpp-5-3', "Métodos atacar() e receberDano() Encapsulados",
            `<h3>🛡️ Ação e reação: métodos que protegem os dados</h3>
<p>No paradigma orientado a objetos, você não altera a vida do herói diretamente de fora. Você envia uma mensagem: "Herói, você acabou de levar um golpe de 20 de dano!".</p>

<p>O próprio herói calcula o impacto em seu método <code>receberDano()</code>, garante que o HP não fique negativo e decide se continua de pé. Isso se chama <strong>encapsulamento</strong>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Encapsulando o impacto do golpe</div>
  <code>void receberDano(int dano) { vida -= dano; if (vida &lt; 0) vida = 0; }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na classe <code>Combatente</code> em <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>>>> Goblin tomou 25 de dano! HP: 25
Goblin continua vivo? SIM</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Chame <code>receberDano(30)</code> para levar o HP a 0 e confira que <code>estaVivo()</code> retornará falso.</li>
</ol>`,
            "#include <iostream>\n#include <string>\n\nclass Combatente {\nprivate:\n    std::string nome;\n    int vida;\n    int ataque;\n\npublic:\n    Combatente(std::string n, int v, int a) : nome(n), vida(v), ataque(a) {}\n\n    int getAtaque() const { return ataque; }\n    int getVida() const { return vida; }\n    std::string getNome() const { return nome; }\n\n    void receberDano(int dano) {\n        vida -= dano;\n        if (vida < 0) vida = 0;\n        std::cout << nome << \" sofreu \" << dano << \" de dano! HP restante: \" << vida << std::endl;\n    }\n};\n\nint main() {\n    Combatente heroi(\"Lancelot\", 100, 25);\n    Combatente orc(\"Orc Brutal\", 70, 15);\n\n    orc.receberDano(heroi.getAtaque());\n    return 0;\n}",
            c("Implemente o metodo getVida const que retorna a variavel vida.", "int getVida() const { ... }", "int getVida() const { return vida; }", "Use int getVida() const { return vida; }", "int getVida() const { return vida; }"),
            "#include <iostream>\n#include <string>\n\nclass Combatente {\nprivate:\n    std::string nome;\n    int vida;\n    int ataque;\n\npublic:\n    Combatente(std::string n, int v, int a) : nome(n), vida(v), ataque(a) {}\n\n    int getAtaque() const { return ataque; }\n    int getVida() const { return vida; }\n    std::string getNome() const { return nome; }\n\n    void receberDano(int dano) {\n        vida -= dano;\n        if (vida < 0) vida = 0;\n        std::cout << \">>> \" << nome << \" tomou \" << dano << \" de dano! HP: \" << vida << \"\n\";\n    }\n\n    bool estaVivo() const { return vida > 0; }\n};\n\nint main() {\n    Combatente heroi(\"Guerreiro\", 100, 25);\n    Combatente monstro(\"Goblin\", 50, 12);\n\n    monstro.receberDano(heroi.getAtaque());\n    std::cout << \"Goblin continua vivo? \" << (monstro.estaVivo() ? \"SIM\" : \"NAO\") << \"\n\";\n    return 0;\n}"),

          L('cpp-5-4', "Herança em C++: Criando a Classe Heroi com Mana",
            `<h3>🧬 O sangue da linhagem: herdando traços em C++</h3>
<p>Imagine que todo lutador na arena tem vida, nome e ataque. Porém, o Herói principal tem algo exclusivo que monstros comuns não dominam: <strong>Mana mágica</strong> para desferir golpes épicos!</p>

<p>Em vez de copiar e colar todo o código, usamos a <strong>herança</strong> com <code>class Heroi : public Combatente</code>. O herói herda tudo o que o combatente tem e ganha novos poderes!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Sintaxe de herança pública em C++</div>
  <code>class Heroi : public Combatente { int mana; };</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Paladino gasta 20 Mana e lanca GOLPE DEVASTADOR DE 40 DANO!</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Tente dar outro golpe especial sem mana e comprove a mensagem de bloqueio.</li>
</ol>`,
            "#include <iostream>\n#include <string>\n\nclass Combatente {\nprotected:\n    std::string nome;\n    int vida;\npublic:\n    Combatente(std::string n, int v) : nome(n), vida(v) {}\n    void status() { std::cout << nome << \" [HP: \" << vida << \"]\" << std::endl; }\n};\n\nclass Heroi : public Combatente {\nprivate:\n    int mana;\npublic:\n    Heroi(std::string n, int v, int m) : Combatente(n, v), mana(m) {}\n\n    void lancarMagia() {\n        if (mana >= 10) {\n            mana -= 10;\n            std::cout << nome << \" conjurou Bola de Fogo! Mana restante: \" << mana << std::endl;\n        }\n    }\n};\n\nint main() {\n    Heroi mago(\"Gandalf\", 80, 50);\n    mago.status();\n    mago.lancarMagia();\n    return 0;\n}",
            c("Declare a classe Heroi herdando publicamente de Combatente.", "class Heroi : ...", "class Heroi : public Combatente {};", "Use class Heroi : public Combatente {};", "class Heroi : public Combatente {};"),
            "#include <iostream>\n#include <string>\n\nclass Combatente {\nprotected:\n    std::string nome;\n    int vida;\n    int ataque;\n\npublic:\n    Combatente(std::string n, int v, int a) : nome(n), vida(v), ataque(a) {}\n    bool estaVivo() const { return vida > 0; }\n    std::string getNome() const { return nome; }\n    int getAtaque() const { return ataque; }\n    void sofrerDano(int d) { vida = (vida - d < 0) ? 0 : vida - d; }\n};\n\nclass Heroi : public Combatente {\nprivate:\n    int mana;\n\npublic:\n    Heroi(std::string n, int v, int a, int m) : Combatente(n, v, a), mana(m) {}\n\n    void golpeEspecial(Combatente &inimigo) {\n        if (mana >= 20) {\n            mana -= 20;\n            int danoFogo = ataque * 2;\n            std::cout << nome << \" gasta 20 Mana e lanca GOLPE DEVASTADOR DE \" << danoFogo << \" DANO!\n\";\n            inimigo.sofrerDano(danoFogo);\n        } else {\n            std::cout << \"Mana insuficiente para golpe especial!\n\";\n        }\n    }\n};\n\nint main() {\n    Heroi h(\"Paladino\", 120, 20, 40);\n    Combatente monstro(\"Troll de Pedra\", 80, 15);\n    h.golpeEspecial(monstro);\n    return 0;\n}"),

          L('cpp-5-5', "A Classe Monstro com Ataque de Fúria Brutal",
            `<h3>👹 A fera encurralada: habilidades especiais do monstro</h3>
<p>Um monstro comum não deve apenas trocar golpes passivamente. Quando um chefe tem sua vida reduzida pela metade, seus olhos brilham em vermelho e ele entra em estado de fúria cega!</p>

<p>Criamos a classe <code>Monstro</code> com lógica de ataque sob pressão: se o HP estiver abaixo de 30, seu dano recebe um bônus devastador de +12!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Comportamento de Fúria</div>
  <code>int dano = (vida &lt; 30) ? (ataqueBase + 12) : ataqueBase;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>>>> Gorgona ENTRA EM FURIA TOTAL! Dano ampliado!
Poder de golpe gerado: 26</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Inicialize o monstro com 50 HP e comprove que o golpe inicial será de 14 normal.</li>
</ol>`,
            "#include <iostream>\n#include <string>\n\nclass Monstro {\nprivate:\n    std::string nome;\n    int vida;\n    int ataque;\n\npublic:\n    Monstro(std::string n, int v, int a) : nome(n), vida(v), ataque(a) {}\n\n    int calcularAtaqueMonstro() {\n        if (vida <= 25) {\n            std::cout << \"[FÚRIA ATIVA] \" << nome << \" desfere um bote furioso!\n\";\n            return ataque + 15;\n        }\n        return ataque;\n    }\n};\n\nint main() {\n    Monstro goblin(\"Goblin Furioso\", 20, 10);\n    std::cout << \"Dano calculado: \" << goblin.calcularAtaqueMonstro() << std::endl;\n    return 0;\n}",
            c("Retorne o ataque somado a 10 quando em modo furia dentro da condicional if.", "if (emFuria) { return ...; }", "if (emFuria) { return ataque + 10; }", "Use if (emFuria) { return ataque + 10; }", "if (emFuria) { return ataque + 10; }"),
            "#include <iostream>\n#include <string>\n\nclass Monstro {\nprivate:\n    std::string especie;\n    int vida;\n    int ataqueBase;\n\npublic:\n    Monstro(std::string esp, int v, int a) : especie(esp), vida(v), ataqueBase(a) {}\n\n    int atacar() {\n        if (vida < 30) {\n            std::cout << \">>> \" << especie << \" ENTRA EM FURIA TOTAL! Dano ampliado!\n\";\n            return ataqueBase + 12;\n        }\n        return ataqueBase;\n    }\n\n    void tomarDano(int d) {\n        vida -= d;\n        if (vida < 0) vida = 0;\n    }\n\n    int getVida() const { return vida; }\n    std::string getNome() const { return especie; }\n};\n\nint main() {\n    Monstro m(\"Gorgona\", 25, 14);\n    int dano = m.atacar();\n    std::cout << \"Poder de golpe gerado: \" << dano << \"\n\";\n    return 0;\n}")
        ]
      },

      // ── Módulo 6 — Batalha Final, Logs e Conclusão do Jogo ──
      {
        title: "Módulo 6 — Batalha Final, Logs e Conclusão do Jogo",
        lessons: [
          L('cpp-6-1', "Inteligência de Combate do Monstro e Turnos Balanceados",
            `<h3>🧠 O cérebro do inimigo: decidindo a melhor jogada</h3>
<p>Uma batalha previsível é monótona. Um oponente inteligente avalia o cenário: se o herói estiver muito ferido, o monstro ataca com tudo; se o próprio monstro estiver à beira da morte, ele arrisca uma investida suicida!</p>

<p>Usamos lógica probabilística e árvores de decisão para simular a Inteligência Artificial (IA) da máquina durante o seu turno.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Decisão de turno do adversário</div>
  <code>int acaoIA = (vidaInimigo &lt; 20) ? 2 : 1;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>[IA]: O Chefe desfere um bote suicida de alto dano!
Vida restante do Heroi: 68 HP</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Mude a vida do monstro para 50 e veja a IA optar pelo ataque padrão.</li>
</ol>`,
            "#include <iostream>\n#include <cstdlib>\n\nint decidirAcaoMonstro(int vidaMonstro, int vidaHeroi) {\n    if (vidaMonstro < 20) {\n        return 2;\n    }\n    return 1;\n}\n\nint main() {\n    int acao = decidirAcaoMonstro(15, 80);\n    std::cout << \"Acao da IA decidida: Tipo \" << acao << std::endl;\n    return 0;\n}",
            c("Crie uma funcao int decidirAcaoIA que recebe int vida e retorna 2 se vida < 25 ou 1 caso contrario.", "int decidirAcaoIA(int vida) { ... }", "int decidirAcaoIA(int vida) { return (vida < 25) ? 2 : 1; }", "Use o operador ternario: return (vida < 25) ? 2 : 1;", "int decidirAcaoIA(int vida) { return (vida < 25) ? 2 : 1; }"),
            "#include <iostream>\n\nint executarTurnoMonstro(int vidaMonstro, int &vidaHeroi) {\n    int danoInimigo = 0;\n    if (vidaMonstro < 25) {\n        danoInimigo = 22;\n        std::cout << \"[IA]: O Chefe desfere um bote suicida de alto dano!\n\";\n    } else {\n        danoInimigo = 14;\n        std::cout << \"[IA]: O Chefe ataca com sua clava pontiaguda!\n\";\n    }\n    vidaHeroi -= danoInimigo;\n    return danoInimigo;\n}\n\nint main() {\n    int vidaHeroi = 90;\n    executarTurnoMonstro(20, vidaHeroi);\n    std::cout << \"Vida restante do Heroi: \" << vidaHeroi << \" HP\n\";\n    return 0;\n}"),

          L('cpp-6-2', "Histórico de Combate com Cores e Log Formatado",
            `<h3>📜 A crônica da batalha: logs claros e bem diagramados</h3>
<p>Em jogos de terminal, o design visual depende inteiramente de linhas divisórias, espaçamentos consistentes e formatação impecável dos textos.</p>

<p>Usamos funções de borda e painéis de status para que o jogador compreenda com facilidade o que aconteceu em cada rodada do combate.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Moldura de rodada</div>
  <code>std::cout &lt;&lt; "----------------------------------------
";</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>--------------------------------------------------
  HERÓI: Conan [85 HP]   VS   INIMIGO: Senhor dos Orcs [40 HP]
--------------------------------------------------</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Integre o painel de status no topo de cada rodada do combate.</li>
</ol>`,
            "#include <iostream>\n#include <string>\n\nvoid imprimirLinhaDivisoria() {\n    std::cout << \"==================================================\" << std::endl;\n}\n\nvoid logarTurno(int turno, const std::string &ator, const std::string &efeito) {\n    imprimirLinhaDivisoria();\n    std::cout << \"[TURNO \" << turno << \"] \" << ator << \": \" << efeito << std::endl;\n}\n\nint main() {\n    logarTurno(1, \"Heroi\", \"Causou 24 de dano com Espada Rúnica!\");\n    return 0;\n}",
            c("Crie uma funcao void logAcao que recebe const std::string &texto e imprime na tela com cout.", "void logAcao(...)", "void logAcao(const std::string &texto) { std::cout << texto << std::endl; }", "Use void logAcao(const std::string &texto) { std::cout << texto << std::endl; }", "void logAcao(const std::string &texto) { std::cout << texto << std::endl; }"),
            "#include <iostream>\n#include <string>\n\nvoid desenharPainelStatus(const std::string &hNome, int hHp, const std::string &mNome, int mHp) {\n    std::cout << \"--------------------------------------------------\n\";\n    std::cout << \"  HERÓI: \" << hNome << \" [\" << hHp << \" HP]   VS   \"\n              << \"INIMIGO: \" << mNome << \" [\" << mHp << \" HP]\n\";\n    std::cout << \"--------------------------------------------------\n\";\n}\n\nint main() {\n    desenharPainelStatus(\"Conan\", 85, \"Senhor dos Orcs\", 40);\n    return 0;\n}"),

          L('cpp-6-3', "Telas Épicas de Vitória e Game Over",
            `<h3>🏆 A consagração do campeão ou o descanso do guerreiro</h3>
<p>Quando a poeira assenta e um dos combatentes cai no chão de pedra, o jogo precisa encerrar a jornada com dignidade dramática.</p>

<p>Criamos telas dedicadas para cada desfecho com arte ASCII, informando as estatísticas finais: quantas rodadas foram travadas e o saldo da vitória.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Verificando o desfecho final</div>
  <code>if (heroiVivo) exibirVitoria(); else exibirGameOver();</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile e execute:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>===============================================
   PARABÉNS! VOCÊ LIBERTOU AS TERRAS DE EDEV!   
   Vencedor da arena em 4 rodadas táticas!
===============================================</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Teste passar <code>false</code> para a função e veja a tela dramática de Game Over.</li>
</ol>`,
            "#include <iostream>\n\nvoid exibirTelaVitoria(int rodadas) {\n    std::cout << \"\n**************************************************\n\";\n    std::cout << \"              VITORIA GLORIOSA!                  \n\";\n    std::cout << \"      O Inimigo sucumbiu apos \" << rodadas << \" turnos sangrentos! \n\";\n    std::cout << \"**************************************************\n\";\n}\n\nvoid exibirTelaDerrota() {\n    std::cout << \"\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n\";\n    std::cout << \"                  GAME OVER                       \n\";\n    std::cout << \"           O Heroi caiu em batalha...             \n\";\n    std::cout << \"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n\";\n}\n\nint main() {\n    exibirTelaVitoria(5);\n    return 0;\n}",
            c("Chame a funcao exibirTelaVitoria passando 7 como argumento de rodadas.", "exibirTelaVitoria(...);", "exibirTelaVitoria(7);", "Chame exibirTelaVitoria(7);", "exibirTelaVitoria(7);"),
            "#include <iostream>\n\nvoid exibirDesfecho(bool venceu, int rodadas) {\n    if (venceu) {\n        std::cout << \"\n===============================================\n\";\n        std::cout << \"   PARABÉNS! VOCÊ LIBERTOU AS TERRAS DE EDEV!   \n\";\n        std::cout << \"   Vencedor da arena em \" << rodadas << \" rodadas táticas!\n\";\n        std::cout << \"===============================================\n\";\n    } else {\n        std::cout << \"\n===============================================\n\";\n        std::cout << \"       SUA JORNADA CHEGOU AO FIM... DERROTA!   \n\";\n        std::cout << \"===============================================\n\";\n    }\n}\n\nint main() {\n    exibirDesfecho(true, 4);\n    return 0;\n}"),

          L('cpp-6-4', "Conclusão do Jogo de Batalha e Emissão de Certificado",
            `<h3>🎓 O topo da montanha: você dominou o C++ Moderno!</h3>
<p>Parabéns, desenvolvedor! Você começou entendendo como o código compila direto perto do hardware e terminou construindo uma aplicação completa de RPG com classes, herança, métodos encapsulados, inventário dinâmico com <code>std::vector</code> e lógica de combate em turnos.</p>

<p>Com esse conhecimento, você compreende a base real que sustenta a indústria de games em C++, motores gráficos, finanças de alta frequência e sistemas de infraestrutura em todo o planeta.</p>

<p>Seu certificado de conclusão do curso de C++ da plataforma Edev já está disponível na sua aba de Certificados!</p>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No seu arquivo completo <code>jogo.cpp</code>.</li>
  <li><strong>O que fazer depois:</strong> Compile o projeto mestre final:
    <br><code>g++ jogo.cpp -o jogo</code>
    <br><code>./jogo</code>
  </li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>===============================================
      RPG DE BATALHA FINAL: HEROES OF EDEV     
===============================================
... rodadas de combate ...
PARABÉNS! VITORIA GLORIOSA DO HEROI ARTHUR!</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Jogue uma partida completa e comemore sua conquista!</li>
</ol>`,
            "// === PROJETO COMPLETO CONCLUÍDO: HEROES OF EDEV RPG ===\n// Todas as classes, herança, turnos e inventário funcionando em harmonia!",
            c("Imprima a mensagem \"Certificado C++ Edev Conquistado!\" usando std::cout e std::endl.", "std::cout << ...", "std::cout << \"Certificado C++ Edev Conquistado!\" << std::endl;", "Use std::cout << \"Certificado C++ Edev Conquistado!\" << std::endl;", "std::cout << \"Certificado C++ Edev Conquistado!\" << std::endl;"),
            "#include <iostream>\n#include <string>\n#include <vector>\n#include <cstdlib>\n#include <ctime>\n\n// === CLASSE BASE: COMBATENTE ===\nclass Combatente {\nprotected:\n    std::string nome;\n    int vida;\n    int ataque;\n\npublic:\n    Combatente(std::string n, int v, int a) : nome(n), vida(v), ataque(a) {}\n\n    bool estaVivo() const { return vida > 0; }\n    std::string getNome() const { return nome; }\n    int getVida() const { return vida; }\n    int getAtaque() const { return ataque; }\n\n    virtual void receberDano(int dano) {\n        vida -= dano;\n        if (vida < 0) vida = 0;\n        std::cout << nome << \" tomou \" << dano << \" de dano! HP: \" << vida << \"\n\";\n    }\n};\n\n// === CLASSE HERÓI (HERANÇA) ===\nclass Heroi : public Combatente {\nprivate:\n    int mana;\n    std::vector<std::string> inventario;\n\npublic:\n    Heroi(std::string n, int v, int a, int m) : Combatente(n, v, a), mana(m) {\n        inventario.push_back(\"Pocao Maior de Vida\");\n        inventario.push_back(\"Pergaminho de Fogo\");\n    }\n\n    void usarPocao() {\n        if (!inventario.empty()) {\n            vida += 35;\n            std::cout << \">>> \" << nome << \" bebeu \" << inventario[0] << \"! HP agora: \" << vida << \"\n\";\n            inventario.erase(inventario.begin());\n        } else {\n            std::cout << \"Mochila vazia! Nao ha pocoes.\n\";\n        }\n    }\n};\n\n// === CLASSE MONSTRO (HERANÇA) ===\nclass Monstro : public Combatente {\npublic:\n    Monstro(std::string n, int v, int a) : Combatente(n, v, a) {}\n\n    int calcularAtaque() {\n        if (vida < 30) {\n            std::cout << \"[FÚRIA MONSTRUOSA ATIVADA!]\n\";\n            return ataque + 10;\n        }\n        return ataque;\n    }\n};\n\nint main() {\n    srand(time(0));\n    std::cout << \"===============================================\n\";\n    std::cout << \"      RPG DE BATALHA FINAL: HEROES OF EDEV     \n\";\n    std::cout << \"===============================================\n\";\n\n    Heroi heroi(\"Arthur Pendragon\", 100, 24, 30);\n    Monstro chefe(\"Dragao Negro\", 80, 16);\n\n    int turno = 1;\n    while (heroi.estaVivo() && chefe.estaVivo()) {\n        std::cout << \"\n--- RODADA \" << turno << \" ---\n\";\n        chefe.receberDano(heroi.getAtaque());\n\n        if (chefe.estaVivo()) {\n            heroi.receberDano(chefe.calcularAtaque());\n        }\n        turno++;\n    }\n\n    std::cout << \"\n===============================================\n\";\n    if (heroi.estaVivo()) {\n        std::cout << \"PARABÉNS! VITORIA GLORIOSA DO HEROI ARTHUR!\n\";\n    } else {\n        std::cout << \"GAME OVER! O DRAGÃO DOMINOU O REINO.\n\";\n    }\n    std::cout << \"===============================================\n\";\n\n    return 0;\n}")
        ]
      }
    ]
  },

  php: {
    id: "php",
    name: "PHP Moderno: Da Web Dinâmica ao Banco de Dados",
    tag: "PHP + MySQL + PDO + Segurança",
    hours: "40 horas",
    desc: "Crie uma aplicação web dinâmica completa do zero. Aprenda arquitetura cliente-servidor, formulários seguros contra XSS, sessões de autenticação, banco MySQL via PDO e boas práticas de produção.",
    modules: [
      // ── Módulo 0 — A Web Dinâmica e o Servidor Local PHP ──
      {
        title: "Módulo 0 — A Web Dinâmica e o Servidor Local PHP",
        lessons: [
          L('php-0-0', "Como este curso funciona — Sua jornada e o projeto do Blog Dinâmico",
            `<h3>🐘 Bem-vindo ao motor que move mais de 75% da Web!</h3>
<p>Seja muito bem-vindo ao curso de PHP do Edev. Se você já acessou portais como WordPress, Wikipedia, ou grandes plataformas de e-commerce, você já utilizou aplicações impulsionadas por PHP nos bastidores.</p>

<p>O PHP não é apenas uma linguagem clássica; ele é o canivete suíço da web dinâmica moderna: direto ao ponto, incrivelmente rápido para entregar páginas HTML geradas no servidor e fácil de colocar em produção.</p>

<h3>📰 O Projeto do Curso: Blog Dinâmico com Painel Administrativo</h3>
<p>Nós não vamos nos perder em conceitos abstratos descolados da realidade. Cada linha de código servirá para construir um <strong>Blog Dinâmico Completo</strong>: com artigos, estimativa de leitura, categorias filtráveis, formulários sanitizados contra invasões, login seguro e banco de dados MySQL via PDO.</p>

<p>Esta primeira aula é de acolhimento — sem testes para você resolver. Na próxima aula, vamos entender exatamente a mágica que acontece entre o clique do usuário e a resposta do servidor!</p>`,
            "// === PROJETO DO CURSO: Blog Dinâmico em PHP ===\n// Ao longo das aulas, você construirá um sistema web completo do zero.",
            null,
            "// === PROJETO DO CURSO: Blog Dinâmico em PHP ===\n// Este arquivo registrará a evolução do seu código aula a aula.\n// Na próxima aula, conheceremos a arquitetura cliente-servidor!"),

          L('php-0-1', "Como a Web Dinâmica Funciona — Por que o PHP domina a Internet",
            `<h3>🍽️ A cozinha do restaurante: o modelo Cliente-Servidor</h3>
<p>Imagine que você vai a um restaurante sofisticado. Você senta à mesa (o navegador), olha o cardápio e faz o pedido ao garçom (a requisição HTTP).</p>

<p>O garçom não cozinha a comida na sua frente: ele leva o pedido até a cozinha fechada (o servidor). Lá dentro, o chef de cozinha (o interpretador PHP) mistura os ingredientes, busca temperos na despensa (o banco de dados MySQL) e monta o prato quentinho.</p>

<h3>📄 O que o navegador realmente enxerga?</h3>
<p>O garçom traz o prato pronto para a sua mesa: você só consome o resultado final montado (HTML puro, CSS e JavaScript). O cliente NUNCA vê o código PHP ou as senhas do banco de dados.</p>

<p>Essa privacidade e segurança tornam o PHP ideal para autenticação de usuários, processamento de pagamentos e publicação de conteúdo.</p>

<p>Conceito absorvido! Na próxima aula, ligaremos o servidor de desenvolvimento embutido na sua máquina.</p>`,
            "<?php\n// O servidor processa este código no backend:\n$titulo = \"Artigo Especial de Tecnologia\";\n// E envia apenas HTML puro para o navegador:\necho \"<h1>\" . $titulo . \"</h1>\";\n?>",
            null,
            "// === PROJETO DO CURSO: Blog Dinâmico em PHP ===\n// Arquitetura Cliente-Servidor compreendida. Preparando ambiente!"),

          L('php-0-2', "Ambiente de Desenvolvimento — Servidor Local Embutido e XAMPP",
            `<h3>⚡ A bancada de testes: o servidor local embutido</h3>
<p>Antigamente, para testar uma única linha de PHP você precisava configurar servidores Apache gigantescos como XAMPP ou WampServer. Hoje, o PHP moderno vem com seu próprio servidor de desenvolvimento ultra leve de fábrica!</p>

<p>Basta abrir o terminal na pasta do seu projeto e digitar um único comando:</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Rodando o servidor embutido do PHP</div>
  <code>php -S localhost:8000</code>
</div>

<p>Abra seu navegador em <code>http://localhost:8000</code> e qualquer arquivo <code>index.php</code> será renderizado instantaneamente.</p>

<p>Tudo pronto na sua máquina! No próximo módulo, começaremos a dissecar a tag PHP e criar nossa primeira postagem.</p>`,
            "// No terminal:\n// $ php -S localhost:8000\n// [PHP Development Server started at http://localhost:8000]",
            null,
            "// === PROJETO DO CURSO: Blog Dinâmico em PHP ===\n// Servidor local pronto para receber nosso primeiro arquivo index.php!")
        ]
      },

      // ── Módulo 1 — Fundamentos, Sintaxe e Modelagem de Notícias ──
      {
        title: "Módulo 1 — Fundamentos, Sintaxe e Modelagem de Notícias",
        lessons: [
          L('php-1-1', "A Tag <?php ?> e o Ponto e Vírgula (;) — A Fronteira do Servidor",
            `<h3>🚪 A porta de entrada do servidor: por que existe &lt;?php ?&gt;</h3>
<p>Imagine que você está escrevendo uma carta em português, mas no meio dela precisa citar uma frase em latim ou grego antigo. Você coloca a frase entre aspas ou parênteses para avisar ao leitor que a língua mudou.</p>

<h3>📖 Dissecando os termos fundamentais:</h3>
<ul>
  <li><code>&lt;?php</code>: É a <strong>tag de abertura oficial</strong>. Quando o servidor web lê um arquivo, ele trata tudo como texto HTML comum até encontrar <code>&lt;?php</code>. A partir daí, o motor do PHP assume o comando e processa as ordens no servidor!</li>
  <li><code>?&gt;</code>: É a tag de fechamento. Em arquivos que contêm apenas código PHP puro, a boa prática profissional moderna recomenda <strong>omitir a tag de fechamento</strong> no final para evitar espaços em branco invisíveis.</li>
  <li><code>;</code> (ponto e vírgula): É o sinal obrigatório de término de instrução. Ele avisa: "esta ordem acabou, processe a próxima". Sem ele, o PHP trava com erro fatal de sintaxe.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 O Bloco Mínimo em PHP</div>
  <code>&lt;?php<br>// Instruções do servidor aqui terminadas com ponto e vírgula;<br>?&gt;</code>
</div>`,
            "<?php\n// Bloco oficial de execucao do PHP\n// Todo comando deve terminar com ponto e virgula!\n?>",
            c("Escreva a tag de abertura oficial do PHP.", "<?...", "<?php", "Digite <?php", "<?php"),
            "<?php\n// === BLOG DINÂMICO: MOTOR INICIALIZADO ===\n// Arquivo index.php preparado para receber as noticias\n"),

          L('php-1-2', "O Comando echo e Variáveis com Cifrão ($) — A Primeira Postagem",
            `<h3>🏷️ O crachá do cifrão e o megafone do echo</h3>
<p>Imagine uma sala de reuniões onde todo mundo usa um crachá verde com o símbolo <code>$</code>. Quando o diretor quer chamar qualquer funcionário, ele aponta para o crachá.</p>

<h3>📖 Dissecando os conceitos:</h3>
<ul>
  <li><code>$</code> (cifrão): No PHP, toda variável <strong>obrigatoriamente</strong> começa com <code>$</code> (ex: <code>$titulo</code>, <code>$autor</code>). É assim que o interpretador distingue variáveis de palavras reservadas da linguagem.</li>
  <li><code>echo</code>: Não é uma função comum, mas sim um <em>construtor de linguagem</em>. Ele funciona como um megafone: pega qualquer texto ou variável e o cospe diretamente no fluxo de HTML que será enviado para o navegador do cliente.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Declarando e Exibindo com echo</div>
  <code>$titulo = "Meu Primeiro Artigo";<br>echo $titulo;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Abra o VS Code, crie uma pasta chamada <code>meu-blog-php</code> e crie um arquivo chamado <code>index.php</code>.</li>
  <li><strong>O código:</strong> Digite o código abaixo dentro do <code>index.php</code> e salve com <code>Ctrl+S</code>:
    <pre><code>&lt;?php
$titulo = "Bem-vindo ao Meu Blog Dinâmico";
$autor = "Redação Edev";

echo "&lt;h1&gt;" . $titulo . "&lt;/h1&gt;";
echo "&lt;p&gt;Publicado por: " . $autor . "&lt;/p&gt;";
</code></pre>
  </li>
  <li><strong>O que fazer depois:</strong> Abra o terminal na pasta do projeto e inicie o servidor:
    <br><code>php -S localhost:8000</code>
    <br>Depois abra seu navegador de internet no endereço: <code>http://localhost:8000/index.php</code>
  </li>
  <li><strong>O que esperar na tela:</strong> Você verá um título grande em HTML e a linha de autor renderizada perfeitamente no navegador!</li>
  <li><strong>Agora é sua vez:</strong> Altere o nome do autor para o seu próprio nome no <code>index.php</code>, atualize a página no navegador com <code>F5</code> e veja a mágica dinâmica acontecer na hora!</li>
</ol>`,
            "<?php\n$titulo = \"O Futuro da Inteligencia Artificial na Web\";\n$autor = \"Guilherme Santos\";\n\necho \"<h1>\" . $titulo . \"</h1>\";\necho \"<p>Autor: \" . $autor . \"</p>\";\n",
            c("Exiba a variavel $titulo na tela utilizando o comando echo.", "echo ...;", "echo $titulo;", "Use echo $titulo; com ponto e virgula no fim.", "echo $titulo;"),
            "<?php\n$titulo = \"Bem-vindo ao Meu Blog Dinâmico em PHP\";\n$autor = \"Redação Edev\";\n$categoria = \"Tecnologia\";\n$visualizacoes = 1;\n\necho \"<h1>\" . $titulo . \"</h1>\";\necho \"<p>Publicado por: \" . $autor . \" | Categoria: \" . $categoria . \"</p>\";\n"),

          L('php-1-3', "Concatenação com o Ponto (.) e Interpolação em Aspas Duplas",
            `<h3>🔗 A cola de papel: unindo palavras com o ponto</h3>
<p>Em linguagens como JavaScript ou Python usa-se o sinal de <code>+</code> para juntar textos. No PHP, o sinal de mais é exclusivo para contas matemáticas! Para colar dois textos, usamos o operador de ponto (<code>.</code>).</p>

<p>Além disso, o PHP tem um recurso fantástico chamado <em>interpolação</em>: dentro de aspas duplas <code>"..."</code>, você pode colocar a variável direto dentro do texto que ela é substituída na hora!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Interpolação com aspas duplas</div>
  <code>echo "Artigo escrito por: $autor";</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>index.php</code>.</li>
  <li><strong>O que fazer depois:</strong> Salve o arquivo e recarregue a página no navegador (<code>http://localhost:8000</code>).</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Autor: Carlos Silva - Tema: Arquitetura MVC</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Experimente trocar as aspas duplas por aspas simples <code>'Autor: $autor'</code> e veja que com aspas simples o PHP não substitui a variável.</li>
</ol>`,
            "<?php\n$autor = \"Carlos Silva\";\n$artigo = \"Arquitetura MVC\";\n\n// Usando o ponto de concatenacao:\necho \"Autor: \" . $autor . \" - Tema: \" . $artigo . \"<br>\";\n\n// Usando interpolacao direta com aspas duplas:\necho \"Autor: $autor - Tema: $artigo\";\n?>",
            c("Junte a string \"Post: \" com a variavel $titulo usando o operador de ponto.", "echo \"Post: \" ... $titulo;", "echo \"Post: \" . $titulo;", "Coloque um ponto (.) entre a string e a variavel.", "echo \"Post: \" . $titulo;"),
            "<?php\n$titulo = \"Por que o PHP continua liderando a Web\";\n$autor = \"Lucas Fernandes\";\n$ano = 2026;\n\n$subtitulo = \"Artigo oficial escrito por $autor em $ano.\";\n\necho \"<h1>$titulo</h1>\";\necho \"<h4>$subtitulo</h4>\";\n?>"),

          L('php-1-4', "Cálculo de Estimativa de Tempo de Leitura do Post",
            `<h3>⏱️ O velocímetro do leitor: minutos de leitura</h3>
<p>Você já deve ter visto no topo de artigos do Medium ou Dev.to: "Leitura de 3 minutos". Esse detalhe melhora a experiência e o engajamento dos leitores.</p>

<p>Uma pessoa lê em média 200 palavras por minuto. Usamos a função <code>str_word_count()</code> para contar palavras e <code>ceil()</code> para arredondar para cima.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Calculando minutos com ceil e str_word_count</div>
  <code>$minutos = ceil(str_word_count($texto) / 200);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>index.php</code>.</li>
  <li><strong>O que fazer depois:</strong> Salve e recarregue no navegador.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Total de palavras: 18 | Tempo estimado: 1 min de leitura.</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Cole um parágrafo longo no conteúdo e veja a contagem de minutos subir proporcionalmente.</li>
</ol>`,
            "<?php\n$corpoArtigo = \"O PHP 8 trouxe grandes melhorias de performance, compilador JIT e tipagem estrita para o mercado...\";\n$totalPalavras = str_word_count($corpoArtigo);\n$minutosLeitura = ceil($totalPalavras / 200);\n\necho \"Total de palavras: $totalPalavras | Tempo estimado: $minutosLeitura min de leitura.\";\n?>",
            c("Calcule as palavras da string $artigo chamando a funcao str_word_count($artigo).", "$palavras = ...;", "$palavras = str_word_count($artigo);", "Atribua str_word_count($artigo) a variavel $palavras.", "$palavras = str_word_count($artigo);"),
            "<?php\n$titulo = \"Dominando Arrays e Funcoes Nativas no PHP\";\n$autor = \"Juliana Mendes\";\n$conteudo = \"Neste capitulo vamos explorar como colecoes de dados facilitam a construcao de sistemas web robustos...\";\n\n$palavras = str_word_count($conteudo);\n$tempoEstimado = ceil($palavras / 200);\n\necho \"<h1>$titulo</h1>\";\necho \"<p><small>Por: $autor | Leitura estimada: $tempoEstimado min ($palavras palavras)</small></p>\";\necho \"<div>$conteudo</div>\";\n?>"),

          L('php-1-5', "Formatando Datas de Publicação com date() e strtotime()",
            `<h3>📅 O calendário brasileiro: convertendo datas no blog</h3>
<p>No banco de dados, datas são salvas no formato internacional americano (<code>2026-05-18 14:30:00</code>). Exibir isso diretamente para o leitor brasileiro é deselegante.</p>

<p>A dobradinha clássica do PHP é <code>strtotime()</code> (que converte o texto para carimbo de tempo UNIX em segundos) combinada com <code>date()</code> para desenhar a máscara visual amigável.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Formatando para dia/mês/ano</div>
  <code>$dataBr = date("d/m/Y", strtotime($dataBanco));</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>index.php</code>.</li>
  <li><strong>O que fazer depois:</strong> Salve o arquivo e recarregue no navegador.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Publicado em: 23/09/2026 às 10:15</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Altere o formato para <code>date("d/m/Y")</code> e veja a data limpa sem horas.</li>
</ol>`,
            "<?php\n$dataCriacao = \"2026-09-23 10:15:00\";\n$timestamp = strtotime($dataCriacao);\n\n$dataFormatada = date(\"d/m/Y \\à\\s H:i\", $timestamp);\necho \"Publicado em: $dataFormatada\";\n?>",
            c("Converta a variavel $dataBanco para carimbo com a funcao strtotime($dataBanco).", "$segundos = ...;", "$segundos = strtotime($dataBanco);", "Chame strtotime($dataBanco);", "$segundos = strtotime($dataBanco);"),
            "<?php\n$titulo = \"Lançamento da Versao Beta do Nosso Portal\";\n$dataOriginal = \"2026-04-12 09:00:00\";\n\n$dataExibicao = date(\"d/m/Y\", strtotime($dataOriginal));\n$horaExibicao = date(\"H:i\", strtotime($dataOriginal));\n\necho \"<h1>$titulo</h1>\";\necho \"<p>Data de Publicação: $dataExibicao às $horaExibicao</p>\";\n?>"),

          L('php-1-6', "Limitando Resumos de Notícias com mb_substr()",
            `<h3>✂️ A tesoura editorial: criando chamadas nos cards do blog</h3>
<p>Na página inicial do blog não podemos despejar o texto inteiro de um artigo de 20 parágrafos. Precisamos cortar o texto nos primeiros 100 caracteres e adicionar reticências ("...").</p>

<p>No PHP moderno, sempre usamos <code>mb_substr()</code> (Multi-Byte Substring) em vez de <code>substr()</code> comum. Isso impede que caracteres com acento (como "ç", "ã", "é") sejam cortados pela metade e corrompam o texto.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Cortando texto com segurança UTF-8</div>
  <code>$resumo = mb_substr($texto, 0, 100) . "...";</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>index.php</code>.</li>
  <li><strong>O que fazer depois:</strong> Salve e atualize o navegador com F5.</li>
  <li><strong>O que esperar na tela:</strong> O card com título e a chamada resumida elegante.</li>
  <li><strong>Agora é sua vez:</strong> Ajuste o limite de caracteres de 50 para 80 e veja o resumo se adaptar.</li>
</ol>`,
            "<?php\n$artigoCompleto = \"Aprender programação orientada a objetos transforma a clareza e a manutenibilidade do seu código em qualquer projeto corporativo.\";\n\n$resumo = mb_substr($artigoCompleto, 0, 50) . \"...\";\necho \"Chamada: $resumo\";\n?>",
            c("Corte a string $conteudo do caractere 0 ate 80 usando mb_substr($conteudo, 0, 80).", "$resumo = ...;", "$resumo = mb_substr($conteudo, 0, 80);", "Use mb_substr($conteudo, 0, 80);", "$resumo = mb_substr($conteudo, 0, 80);"),
            "<?php\n$artigo = [\n    \"titulo\" => \"Construindo Sistemas Escalaveis com PHP 8\",\n    \"conteudo\" => \"Muitos desenvolvedores subestimam o poder das novas versoes do PHP com suporte nativo a atributos, tipos de uniao e compilacao JIT que entregam ganhos impressionantes de velocidade.\",\n    \"autor\" => \"Redação Edev\"\n];\n\n$resumoCard = mb_substr($artigo[\"conteudo\"], 0, 80) . \"...\";\n\necho \"<h2>\" . $artigo[\"titulo\"] . \"</h2>\";\necho \"<p>\" . $resumoCard . \"</p>\";\necho \"<a href='#'>Ler artigo completo &rarr;</a>\";\n?>"),

          L('php-1-7', "Consolidação da Estrutura de Notícia em Array Associativo",
            `<h3>📦 O pacote completo da notícia: juntando os blocos</h3>
<p>Chegou o momento de juntar tudo o que aprendemos no Módulo 1 em uma estrutura coesa. Um artigo profissional possui título, autor, data formatada, estimativa de tempo e resumo.</p>

<p>Representamos o artigo em um <strong>array associativo</strong> — que funciona como uma ficha catalográfica com chaves nomeadas (<code>"titulo"</code>, <code>"autor"</code>, etc.).</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Array Associativo de Artigo</div>
  <code>$post = ["titulo" =&gt; "...", "autor" =&gt; "...", "categoria" =&gt; "..."];</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No seu <code>index.php</code> na pasta <code>meu-blog-php</code>.</li>
  <li><strong>O que fazer depois:</strong> Salve o arquivo e recarregue no navegador em <code>http://localhost:8000</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>[Carreira] Guia Definitivo do Desenvolvedor Backend
Por Guilherme Santos • 15/06/2026 • 1 min</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Adicione uma chave <code>"likes" =&gt; 42</code> ao array e exiba-a no card.</li>
</ol>`,
            "<?php\n$post = [\n    \"titulo\" => \"Primeiro Post do Nosso Blog Oficial\",\n    \"autor\" => \"Admin Edev\",\n    \"data\" => \"2026-03-01 14:00:00\",\n    \"conteudo\" => \"Este e o marco inaugural da nossa jornada pelo ecossistema web com PHP puro moderno.\",\n    \"categoria\" => \"Geral\"\n];\n\n$dataFormatada = date(\"d/m/Y\", strtotime($post[\"data\"]));\n$tempo = ceil(str_word_count($post[\"conteudo\"]) / 200);\n\necho \"<h1>{$post['titulo']}</h1>\";\necho \"<p>Por {$post['autor']} em $dataFormatada ($tempo min)</p>\";\n?>",
            c("Acesse o titulo do array $post utilizando a chave [\"titulo\"].", "echo $post[...];", "echo $post[\"titulo\"];", "Passe \"titulo\" entre colchetes: $post[\"titulo\"]", "echo $post[\"titulo\"];"),
            "<?php\n$artigoPrincipal = [\n    \"id\" => 1,\n    \"titulo\" => \"Guia Definitivo do Desenvolvedor Backend\",\n    \"autor\" => \"Guilherme Santos\",\n    \"data_publicacao\" => \"2026-06-15 11:30:00\",\n    \"conteudo\" => \"Aprender a estruturar APIs e paginas server-side e o primeiro grande passo para conquistar vagas solidas no mercado internacional de tecnologia.\",\n    \"categoria\" => \"Carreira\"\n];\n\n$dataAmigavel = date(\"d/m/Y\", strtotime($artigoPrincipal[\"data_publicacao\"]));\n$tempoLeitura = ceil(str_word_count($artigoPrincipal[\"conteudo\"]) / 200);\n$resumoArtigo = mb_substr($artigoPrincipal[\"conteudo\"], 0, 70) . \"...\";\n\necho \"<article class='card-post'>\";\necho \"  <span class='badge'>{$artigoPrincipal['categoria']}</span>\";\necho \"  <h2>{$artigoPrincipal['titulo']}</h2>\";\necho \"  <p class='meta'>Por {$artigoPrincipal['autor']} • $dataAmigavel • $tempoLeitura min</p>\";\necho \"  <p class='resumo'>$resumoArtigo</p>\";\necho \"</article>\";\n?>")
        ]
      },

      // ── Módulo 2 — Decisões e Listagem de Posts com foreach ──
      {
        title: "Módulo 2 — Decisões e Listagem de Posts com foreach",
        lessons: [
          L('php-2-1', "Exibindo Badges de \"Destaque\" ou \"Rascunho\" com if/else",
            `<h3>🏷️ A etiqueta fluorescente na capa da revista</h3>
<p>Em bancas de jornal, revistas com matérias imperdíveis ganham um selo dourado de "Destaque da Semana", enquanto artigos ainda em revisão pelos editores recebem um carimbo de "Rascunho".</p>

<p>Com as estruturas condicionais <code>if</code> e <code>else</code>, nosso blog decide dinamicamente se exibe uma tarja colorida em cima do card do artigo ou se oculta a postagem do público geral.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Verificando status do artigo</div>
  <code>if ($post['destaque'] === true) { echo "&lt;span class='badge'&gt;DESTAQUE&lt;/span&gt;"; }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No seu arquivo <code>index.php</code> na pasta <code>meu-blog-php</code>.</li>
  <li><strong>O que fazer depois:</strong> Salve o arquivo e atualize o navegador em <code>http://localhost:8000</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>★ DESTAQUE
Como Proteger sua Aplicação Web em Produção</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Altere a chave <code>"destaque" =&gt; false</code> e comprove que o badge dourado desaparece imediatamente do card.</li>
</ol>`,
            "<?php\n$artigo = [\n    \"titulo\" => \"Novidades do PHP 8.4\",\n    \"destaque\" => true,\n    \"publicado\" => true\n];\n\nif ($artigo[\"destaque\"]) {\n    echo \"<span class='badge-destaque'>⭐ Artigo em Destaque</span><br>\";\n}\n\nif (!$artigo[\"publicado\"]) {\n    echo \"<span class='badge-rascunho'>⚠️ Rascunho Não Publicado</span>\";\n} else {\n    echo \"<h1>\" . $artigo[\"titulo\"] . \"</h1>\";\n}\n?>",
            c("Escreva uma condicional if para verificar se $destaque === true e exibir \"Destaque\".", "if (...) { ... }", "if ($destaque === true) { echo \"Destaque\"; }", "Use if ($destaque === true) { echo \"Destaque\"; }", "if ($destaque === true) { echo \"Destaque\"; }"),
            "<?php\n$post = [\n    \"titulo\" => \"Como Proteger sua Aplicação Web em Produção\",\n    \"destaque\" => true,\n    \"categoria\" => \"Segurança\"\n];\n\necho \"<article>\";\nif ($post[\"destaque\"]) {\n    echo \"<span style='background: gold; padding: 4px 8px; border-radius: 4px;'>★ DESTAQUE</span>\";\n}\necho \"<h2>\" . $post[\"titulo\"] . \"</h2>\";\necho \"</article>\";\n?>"),

          L('php-2-2', "Operador de Coalescência Nula (??) para Imagens Padrão",
            `<h3>🖼️ O porta-retrato sem foto: garantindo uma imagem padrão</h3>
<p>O que acontece se o autor cadastrou o artigo mas esqueceu de enviar a foto de capa? Se o sistema tentar exibir uma variável que é <code>null</code> ou inexistente, a página quebrará com aviso de erro feio.</p>

<p>O operador de coalescência nula <code>??</code> verifica se o valor existe e não é nulo. Se existir, usa o valor; caso contrário, recorre ao valor padrão reserva!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Imagem reserva com coalescência nula</div>
  <code>$fotoCapa = $post['imagem'] ?? 'img/padrao.jpg';</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>index.php</code>.</li>
  <li><strong>O que fazer depois:</strong> Salve e recarregue a página no navegador.</li>
  <li><strong>O que esperar na tela:</strong> O card exibirá a imagem de fallback padrão sem disparar nenhum <em>Warning</em> de variável nula.</li>
  <li><strong>Agora é sua vez:</strong> Forneça uma URL real de foto e veja o operador usar a imagem oficial em vez do fallback.</li>
</ol>`,
            "<?php\n$post = [\n    \"titulo\" => \"Guia de PHP\",\n    \"imagem\" => null\n];\n\n$imagemExibicao = $post[\"imagem\"] ?? \"assets/banner-padrao.png\";\necho \"<img src='$imagemExibicao' alt='Capa do Post'>\";\n?>",
            c("Atribua a $capa o valor de $post[\"foto\"] ou \"sem-foto.jpg\" usando o operador ??.", "$capa = ...;", "$capa = $post[\"foto\"] ?? \"sem-foto.jpg\";", "Use $post[\"foto\"] ?? \"sem-foto.jpg\";", "$capa = $post[\"foto\"] ?? \"sem-foto.jpg\";"),
            "<?php\n$postagem = [\n    \"id\" => 10,\n    \"titulo\" => \"Estruturas de Dados Essenciais\",\n    \"imagem\" => null,\n    \"resumo\" => \"Uma introducao completa a pilhas, filas e tabelas hash.\"\n];\n\n$banner = $postagem[\"imagem\"] ?? \"https://via.placeholder.com/800x400?text=Edev+Blog\";\n\necho \"<div class='card'>\";\necho \"  <img src='$banner' style='width:100%; max-width:600px;'>\";\necho \"  <h3>{$postagem['titulo']}</h3>\";\necho \"</div>\";\n?>"),

          L('php-2-3', "O Laço Supremo do PHP: Percorrendo Posts com foreach",
            `<h3>📰 A esteira de distribuição: imprimindo o feed de notícias</h3>
<p>Na página inicial do nosso blog temos uma coleção de dezenas de artigos vindos dos redatores. Não faz o menor sentido escrever código para exibir o post 1, depois o post 2, depois o post 3 na mão.</p>

<p>O <code>foreach</code> é a estrutura mais amada do ecossistema PHP. Ele pega uma lista inteira e executa o bloco de renderização para cada notícia individual de forma 100% automática.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Sintaxe elegante do foreach</div>
  <code>foreach ($posts as $p) { echo "&lt;h2&gt;{$p['titulo']}&lt;/h2&gt;"; }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>index.php</code>.</li>
  <li><strong>O que fazer depois:</strong> Salve o arquivo e abra no navegador.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Feed do Blog:
- Iniciando com PHP Moderno (por Guilherme)
- Segurança em Formulários Web (por Beatriz)
- Como Funciona o Servidor Web (por Lucas)</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Adicione um 4º post no array <code>$feed</code> e veja ele surgir no topo sem precisar alterar o <code>foreach</code>!</li>
</ol>`,
            "<?php\n$posts = [\n    [\"titulo\" => \"PHP 8 e o Futuro\", \"autor\" => \"Ana\"],\n    [\"titulo\" => \"Boas Praticas de Banco\", \"autor\" => \"Marcos\"],\n    [\"titulo\" => \"Arquitetura Hexagonal\", \"autor\" => \"Juliana\"]\n];\n\nforeach ($posts as $post) {\n    echo \"<h3>\" . $post[\"titulo\"] . \" (por \" . $post[\"autor\"] . \")</h3>\";\n}\n?>",
            c("Percorra o array $artigos com foreach atribuindo cada elemento a variavel $artigo.", "foreach (... as ...) { ... }", "foreach ($artigos as $artigo) { echo $artigo[\"titulo\"]; }", "Use foreach ($artigos as $artigo) { echo $artigo[\"titulo\"]; }", "foreach ($artigos as $artigo) { echo $artigo[\"titulo\"]; }"),
            "<?php\n$feed = [\n    [\"id\" => 1, \"titulo\" => \"Iniciando com PHP Moderno\", \"autor\" => \"Guilherme\", \"tempo\" => 3],\n    [\"id\" => 2, \"titulo\" => \"Segurança em Formulários Web\", \"autor\" => \"Beatriz\", \"tempo\" => 5],\n    [\"id\" => 3, \"titulo\" => \"Como Funciona o Servidor Web\", \"autor\" => \"Lucas\", \"tempo\" => 2]\n];\n\necho \"<main class='feed-posts'>\";\nforeach ($feed as $item) {\n    echo \"<article class='post-item'>\";\n    echo \"  <h2>{$item['titulo']}</h2>\";\n    echo \"  <p>Escrito por {$item['autor']} • {$item['tempo']} min de leitura</p>\";\n    echo \"</article><hr>\";\n}\necho \"</main>\";\n?>"),

          L('php-2-4', "Paginação do Blog: Laço for e Parâmetros de Página (?p=1)",
            `<h3>📖 As páginas do livro: dividindo conteúdo em fatias</h3>
<p>Imagine carregar um blog com 5.000 artigos em uma única página: o navegador travaria e o plano de dados do usuário evaporaria. É por isso que todo portal divide o conteúdo em páginas numéricas.</p>

<p>Com o loop <code>for</code> tradicional, nós desenhamos a régua de botões de navegação no rodapé do blog, gerando links com parâmetros GET na URL (ex: <code>index.php?pagina=2</code>).</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Gerando links de paginação</div>
  <code>for ($i = 1; $i &lt;= $totalPaginas; $i++) { echo "&lt;a href='?p=$i'&gt;$i&lt;/a&gt;"; }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>index.php</code>, logo abaixo da listagem de posts.</li>
  <li><strong>O que fazer depois:</strong> Salve e recarregue no navegador.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>[Página 1] [Página 2] [Página 3] [Página 4] [Página 5]</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Clique no link da Página 2 e observe o parâmetro <code>?pagina=2</code> surgir na barra de endereços do seu navegador!</li>
</ol>`,
            "<?php\n$totalPosts = 45;\n$porPagina = 10;\n$totalPaginas = ceil($totalPosts / $porPagina);\n\necho \"<div class='paginacao'>\";\nfor ($p = 1; $p <= $totalPaginas; $p++) {\n    echo \"<a href='?pagina=$p' style='margin: 4px; padding: 6px;'>[$p]</a>\";\n}\necho \"</div>\";\n?>",
            c("Crie um loop for para $p de 1 ate $totalPaginas incrementando $p++.", "for ($p = 1; ...; ...)", "for ($p = 1; $p <= $totalPaginas; $p++)", "Complete com $p <= $totalPaginas; $p++", "for ($p = 1; $p <= $totalPaginas; $p++)"),
            "<?php\n$totalArtigos = 28;\n$artigosPorPagina = 6;\n$numPaginas = ceil($totalArtigos / $artigosPorPagina);\n\necho \"<nav aria-label='Navegacao de Paginas'>\";\necho \"  <ul style='display: flex; list-style: none; gap: 8px;'>\";\nfor ($i = 1; $i <= $numPaginas; $i++) {\n    echo \"    <li><a href='index.php?pagina=$i' class='btn-page'>Página $i</a></li>\";\n}\necho \"  </ul>\";\necho \"</nav>\";\n?>"),

          L('php-2-5', "Filtrando Posts por Categoria na URL ($_GET)",
            `<h3>🏷️ As etiquetas da estante: lendo a URL com $_GET</h3>
<p>Quando você clica em uma categoria como "Tecnologia" ou "Carreira", a barra de endereços exibe: <code>meublog.com/?categoria=tecnologia</code>.</p>

<p>O PHP cria automaticamente a superglobal <code>$_GET</code>, que é um array com todos os parâmetros passados após o ponto de interrogação da URL.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Lendo categoria da URL com segurança</div>
  <code>$cat = $_GET['categoria'] ?? 'todas';</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>index.php</code>.</li>
  <li><strong>O que fazer depois:</strong> No navegador, digite manualmente no final da URL: <code>http://localhost:8000/index.php?cat=backend</code> e dê Enter.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Feed do Blog — Filtro: BACKEND
- PHP para Iniciantes [backend]
- Otimizando Queries MySQL [backend]</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Troque na URL para <code>?cat=frontend</code> e veja o feed filtrar os posts de CSS automaticamente!</li>
</ol>`,
            "<?php\n$categoriaSelecionada = $_GET[\"categoria\"] ?? \"todas\";\n\necho \"Exibindo artigos da categoria: \" . htmlspecialchars($categoriaSelecionada);\n?>",
            c("Obtenha o valor de $_GET[\"categoria\"] com fallback para \"todas\" usando ??.", "$filtro = ...;", "$filtro = $_GET[\"categoria\"] ?? \"todas\";", "Use $_GET[\"categoria\"] ?? \"todas\";", "$filtro = $_GET[\"categoria\"] ?? \"todas\";"),
            "<?php\n$categoriaAtual = $_GET[\"cat\"] ?? \"todas\";\n\n$artigos = [\n    [\"titulo\" => \"PHP para Iniciantes\", \"categoria\" => \"backend\"],\n    [\"titulo\" => \"CSS Flexbox na Pratica\", \"categoria\" => \"frontend\"],\n    [\"titulo\" => \"Otimizando Queries MySQL\", \"categoria\" => \"backend\"]\n];\n\necho \"<h2>Feed do Blog — Filtro: \" . strtoupper($categoriaAtual) . \"</h2>\";\n\nforeach ($artigos as $post) {\n    if ($categoriaAtual === \"todas\" || $post[\"categoria\"] === $categoriaAtual) {\n        echo \"<div class='card-post'>\";\n        echo \"  <h4>{$post['titulo']} <small>[{$post['categoria']}]</small></h4>\";\n        echo \"</div>\";\n    }\n}\n?>")
        ]
      },

      // ── Módulo 3 — Formulários Seguros e Autenticação de Autor ──
      {
        title: "Módulo 3 — Formulários Seguros e Autenticação de Autor",
        lessons: [
          L('php-3-1', "Criando o Formulário de Novo Artigo (admin/novo-post.php)",
            `<h3>📝 A máquina de escrever do redator: o formulário HTML</h3>
<p>Um blog profissional precisa de uma interface agradável para que os redatores cadastrem artigos sem precisar abrir o banco de dados na mão.</p>

<p>No HTML do formulário, usamos a tag <code>&lt;form method="POST" action="salvar-post.php"&gt;</code>. O método <code>POST</code> envia os dados no corpo invisível da requisição HTTP, ideal para textos longos e senhas.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Tag de formulário POST</div>
  <code>&lt;form method="POST" action="salvar-post.php"&gt;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Crie a pasta <code>admin</code> e dentro dela o arquivo <code>novo-post.php</code>.</li>
  <li><strong>O que fazer depois:</strong> Abra no navegador em: <code>http://localhost:8000/admin/novo-post.php</code>.</li>
  <li><strong>O que esperar na tela:</strong> Um formulário limpo com campos de Título, Categoria, Caixa de Texto e o botão Publicar.</li>
  <li><strong>Agora é sua vez:</strong> Preencha os campos para testar a experiência visual.</li>
</ol>`,
            "<!-- admin/novo-post.php -->\n<form method=\"POST\" action=\"salvar.php\">\n    <label for=\"titulo\">Título do Artigo:</label>\n    <input type=\"text\" id=\"titulo\" name=\"titulo\" required>\n\n    <label for=\"conteudo\">Conteúdo:</label>\n    <textarea id=\"conteudo\" name=\"conteudo\" rows=\"6\" required></textarea>\n\n    <button type=\"submit\">Publicar Artigo</button>\n</form>",
            c("Crie a tag de abertura form com method=\"POST\" e action=\"cadastrar.php\".", "<form ...>", "<form method=\"POST\" action=\"cadastrar.php\">", "Use method=\"POST\" e action=\"cadastrar.php\"", "<form method=\"POST\" action=\"cadastrar.php\">"),
            "<!-- Formulario de Criacao de Artigo do Painel -->\n<div class=\"painel-admin\">\n  <h2>Novo Artigo no Blog</h2>\n  <form method=\"POST\" action=\"salvar.php\">\n    <div>\n      <label>Título:</label>\n      <input type=\"text\" name=\"titulo\" placeholder=\"Digite o titulo do post\" required>\n    </div>\n    <div>\n      <label>Categoria:</label>\n      <input type=\"text\" name=\"categoria\" placeholder=\"Ex: backend, carreira\" required>\n    </div>\n    <div>\n      <label>Conteúdo Completo:</label>\n      <textarea name=\"conteudo\" rows=\"5\" placeholder=\"Escreva o artigo aqui...\" required></textarea>\n    </div>\n    <button type=\"submit\">Gravar Postagem</button>\n  </form>\n</div>"),

          L('php-3-2', "Recebendo Dados com $_POST e Validando Campos Obrigatórios",
            `<h3>📬 A caixa postal: abrindo o pacote com $_POST</h3>
<p>Quando o autor clica em "Publicar Artigo", o navegador empacota os campos e dispara a requisição. No servidor, o PHP preenche a superglobal <code>$_POST</code>.</p>

<p>Antes de gravar qualquer dado, usamos a função <code>trim()</code> para remover espaços vazios das pontas e verificamos se o título não está em branco com <code>empty()</code>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Capturando e limpando campo</div>
  <code>$titulo = trim($_POST['titulo'] ?? '');</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Crie o arquivo <code>salvar.php</code> na pasta <code>admin</code>.</li>
  <li><strong>O que fazer depois:</strong> Submeta o formulário de <code>novo-post.php</code> clicando no botão.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Dados validados com sucesso! Pronto para gravar.</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Tente submeter o formulário em branco e veja a mensagem vermelha de erro disparada pelo PHP.</li>
</ol>`,
            "<?php\nif ($_SERVER[\"REQUEST_METHOD\"] === \"POST\") {\n    $titulo = trim($_POST[\"titulo\"] ?? \"\");\n    $conteudo = trim($_POST[\"conteudo\"] ?? \"\");\n\n    if (empty($titulo) || empty($conteudo)) {\n        die(\"Erro: Todos os campos obrigatorios devem ser preenchidos!\");\n    }\n\n    echo \"Artigo pronto para ser gravado: \" . $titulo;\n}\n?>",
            c("Remova os espacos em branco da variavel $_POST[\"titulo\"] usando a funcao trim().", "$titulo = trim(...);", "$titulo = trim($_POST[\"titulo\"] ?? \"\");", "Use trim($_POST[\"titulo\"] ?? \"\");", "$titulo = trim($_POST[\"titulo\"] ?? \"\");"),
            "<?php\n$erros = [];\n\nif ($_SERVER[\"REQUEST_METHOD\"] === \"POST\") {\n    $titulo = trim($_POST[\"titulo\"] ?? \"\");\n    $categoria = trim($_POST[\"categoria\"] ?? \"\");\n\n    if (empty($titulo)) {\n        $erros[] = \"O campo Título é obrigatório!\";\n    }\n    if (empty($categoria)) {\n        $erros[] = \"A Categoria deve ser informada!\";\n    }\n\n    if (count($erros) > 0) {\n        foreach ($erros as $e) echo \"<p style='color:red;'>$e</p>\";\n    } else {\n        echo \"<p style='color:green;'>Dados validados com sucesso!</p>\";\n    }\n}\n?>"),

          L('php-3-3', "Segurança Total: Sanitizando Textos com filter_input contra XSS",
            `<h3>🛡️ O detector de metais: blindando o blog contra ataques XSS</h3>
<p>Imagine que um invasor mal-intencionado digite no título da notícia: <code>&lt;script&gt;roubarSenhas()&lt;/script&gt;</code>.</p>

<p>Se você imprimir esse texto com <code>echo</code> puro, o navegador do leitor executará o script espião! A proteção definitiva em PHP é <code>htmlspecialchars()</code>, que converte tags HTML em texto inofensivo na tela.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Sanitizando para exibição segura</div>
  <code>echo htmlspecialchars($texto, ENT_QUOTES, 'UTF-8');</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Crie uma função <code>sanitizar($texto)</code> no seu arquivo de funções ou <code>index.php</code>.</li>
  <li><strong>O que fazer depois:</strong> Salve e recarregue no navegador.</li>
  <li><strong>O que esperar na tela:</strong> As tags <code>&lt;b&gt;</code> ou <code>&lt;script&gt;</code> aparecerão como texto legível inofensivo, sem serem executadas!</li>
  <li><strong>Agora é sua vez:</strong> Digite um código de alerta JavaScript e comprove a imunidade total do seu blog.</li>
</ol>`,
            "<?php\n$comentarioPerigoso = \"<script>alert('Ataque XSS!');</script> Otimo post!\";\n\n// Com protecao blindada:\necho htmlspecialchars($comentarioPerigoso, ENT_QUOTES, 'UTF-8');\n?>",
            c("Proteja a variavel $titulo contra XSS chamando htmlspecialchars($titulo, ENT_QUOTES, \"UTF-8\").", "echo htmlspecialchars(...);", "echo htmlspecialchars($titulo, ENT_QUOTES, \"UTF-8\");", "Passe $titulo, ENT_QUOTES, \"UTF-8\" como argumentos.", "echo htmlspecialchars($titulo, ENT_QUOTES, \"UTF-8\");"),
            "<?php\nfunction sanitizar($texto) {\n    return htmlspecialchars(trim($texto), ENT_QUOTES, \"UTF-8\");\n}\n\n$tituloDigitado = \"<b style='color:red;'>Artigo Especial</b> & Destaques\";\n$tituloLimpo = sanitizar($tituloDigitado);\n\necho \"<h1>$tituloLimpo</h1>\";\n?>"),

          L('php-3-4', "Sessões em PHP: session_start() e $_SESSION",
            `<h3>🎟️ A pulseira VIP da balada: sessões em PHP</h3>
<p>O protocolo HTTP é desmemoriado: cada clique é uma conversa isolada. Como o servidor sabe que a pessoa que clicou em "Salvar Post" é o administrador que acabou de digitar a senha?</p>

<p>Ao chamar <code>session_start()</code> no topo do arquivo, o PHP envia um cookie secreto de sessão para o navegador e guarda os dados do usuário com segurança na memória do servidor!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Iniciando e gravando a sessão</div>
  <code>session_start();<br>$_SESSION['usuario_logado'] = true;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Crie um arquivo chamado <code>teste-sessao.php</code>.</li>
  <li><strong>O que fazer depois:</strong> Abra no navegador em <code>http://localhost:8000/teste-sessao.php</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Sessao iniciada com sucesso para Guilherme</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Crie uma segunda página que lê <code>$_SESSION['usuario_nome']</code> sem precisar digitar a senha novamente!</li>
</ol>`,
            "<?php\nsession_start();\n\n$_SESSION[\"usuario_id\"] = 42;\n$_SESSION[\"usuario_nome\"] = \"Guilherme\";\n$_SESSION[\"logado\"] = true;\n\necho \"Sessao iniciada com sucesso para \" . $_SESSION[\"usuario_nome\"];\n?>",
            c("Inicie a sessao do PHP chamando a funcao nativa session_start().", "session_start...;", "session_start();", "Chame session_start(); com parenteses e ponto e virgula.", "session_start();"),
            "<?php\nsession_start();\n\n$_SESSION[\"autor_id\"] = 1;\n$_SESSION[\"autor_email\"] = \"admin@edev.com.br\";\n$_SESSION[\"perfil\"] = \"Administrador\";\n\necho \"Bem-vindo ao painel, \" . $_SESSION[\"autor_email\"] . \" (\" . $_SESSION[\"perfil\"] . \")!\";\n?>"),

          L('php-3-5', "Protegendo a Área Administrativa contra Não-Logados",
            `<h3>🚪 A catraca com segurança: bloqueando invasores</h3>
<p>Qualquer visitante da internet pode tentar digitar: <code>meublog.com/admin/novo-post.php</code>. Se não houver proteção, qualquer um poderia postar ou deletar notícias da escola!</p>

<p>No início de todas as páginas administrativas restritas, checamos se a sessão existe. Se não estiver logado, redirecionamos imediatamente com <code>header("Location: login.php")</code> e encerramos com <code>exit;</code>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Redirecionando não-autorizados</div>
  <code>if (empty($_SESSION['logado'])) { header('Location: login.php'); exit; }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No topo absoluto de <code>admin/novo-post.php</code>.</li>
  <li><strong>O que fazer depois:</strong> Abra uma janela anônima no navegador e tente acessar a página do admin diretamente.</li>
  <li><strong>O que esperar:</strong> O navegador redirecionará você instantaneamente para a tela de login!</li>
  <li><strong>Agora é sua vez:</strong> Lembre-se: nunca esqueça o <code>exit;</code> após o <code>header()</code>.</li>
</ol>`,
            "<?php\nsession_start();\n\nif (empty($_SESSION[\"logado\"])) {\n    header(\"Location: login.php\");\n    exit;\n}\n\necho \"<h1>Painel Administrativo Secreto do Blog</h1>\";\n?>",
            c("Escreva o redirecionamento de login header(\"Location: login.php\") acompanhado de exit;.", "header(...); exit;", "header(\"Location: login.php\"); exit;", "Use header(\"Location: login.php\"); exit;", "header(\"Location: login.php\"); exit;"),
            "<?php\nsession_start();\n\nfunction verificarAutenticacao() {\n    if (empty($_SESSION[\"logado\"]) || $_SESSION[\"logado\"] !== true) {\n        header(\"Location: /login.php?erro=restrito\");\n        exit;\n    }\n}\n\nverificarAutenticacao();\necho \"Acesso concedido a area restrita de publicacao!\";\n?>"),

          L('php-3-6', "Criptografando Senhas com password_hash() e password_verify()",
            `<h3>🔐 O cofre criptográfico: nunca guarde senhas em texto puro</h3>
<p>Guardar senhas em texto comum no banco de dados é um crime gravíssimo. Se o banco for invadido, todas as senhas dos redatores caem nas mãos de criminosos.</p>

<p>O PHP possui o algoritmo nativo mais seguro da web: <strong>Bcrypt</strong> com sal automático via <code>password_hash()</code>. Para validar a senha no login, usamos <code>password_verify()</code>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Hashing de senha seguro</div>
  <code>$hash = password_hash($senhaPura, PASSWORD_DEFAULT);<br>if (password_verify($senhaDigitada, $hash)) { ... }</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Crie o arquivo <code>login.php</code>.</li>
  <li><strong>O que fazer depois:</strong> Execute o script no navegador em <code>http://localhost:8000/login.php</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Hash criptografado gerado: $2y$10$e8vK...
Resultado da verificacao de senha: SUCESSO</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Digite uma senha errada na verificação e comprove a rejeição imediata.</li>
</ol>`,
            "<?php\n$senhaDigitada = \"minhaSenhaSuperSecreta@2026\";\n\n// 1. Ao cadastrar o usuario:\n$hashParaSalvarNoBanco = password_hash($senhaDigitada, PASSWORD_DEFAULT);\n\n// 2. Ao fazer login no blog:\n$senhaTentativa = \"minhaSenhaSuperSecreta@2026\";\nif (password_verify($senhaTentativa, $hashParaSalvarNoBanco)) {\n    echo \"Login autorizado com sucesso!\";\n} else {\n    echo \"Senha incorreta!\";\n}\n?>",
            c("Gere o hash seguro da variavel $senha usando password_hash($senha, PASSWORD_DEFAULT).", "$hash = ...;", "$hash = password_hash($senha, PASSWORD_DEFAULT);", "Chame password_hash($senha, PASSWORD_DEFAULT);", "$hash = password_hash($senha, PASSWORD_DEFAULT);"),
            "<?php\n$senhaCadastro = \"adminEdev2026\";\n$hashBanco = password_hash($senhaCadastro, PASSWORD_DEFAULT);\n\n$senhaLogin = \"adminEdev2026\";\n$autenticado = password_verify($senhaLogin, $hashBanco);\n\necho \"Resultado da verificacao de senha: \" . ($autenticado ? \"SUCESSO\" : \"RECUSADO\");\n?>")
        ]
      },

      // ── Módulo 4 — Banco de Dados MySQL com PDO e Prepared Statements ──
      {
        title: "Módulo 4 — Banco de Dados MySQL com PDO e Prepared Statements",
        lessons: [
          L('php-4-1', "Conectando ao MySQL com PDO e Tratamento de Erros (config.php)",
            `<h3>🔌 O cabo de força blindado: conectando com PDO</h3>
<p>O padrão corporativo moderno e seguro para conversar com bancos de dados é o <strong>PDO (PHP Data Objects)</strong>.</p>

<p>O PDO funciona com qualquer banco relacional (MySQL, PostgreSQL, SQLite) e possui uma fortaleza de segurança: ele lança exceções imediatas caso o banco caia, permitindo capturar a falha com <code>try/catch</code>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Conexão Segura com PDO</div>
  <code>$pdo = new PDO("mysql:host=localhost;dbname=edev_blog;charset=utf8mb4", $user, $pass);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Crie um arquivo chamado <code>config.php</code> na raiz do projeto.</li>
  <li><strong>O que fazer depois:</strong> Abra no navegador em <code>http://localhost:8000/config.php</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Conexão com o banco estabelecida com sucesso!</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Se aparecer erro de conexão, verifique se o serviço MySQL (ou XAMPP) está ligado e se o nome do banco existe.</li>
</ol>`,
            "<?php\n$host = \"localhost\";\n$db   = \"edev_blog\";\n$user = \"root\";\n$pass = \"\";\n\ntry {\n    $pdo = new PDO(\"mysql:host=$host;dbname=$db;charset=utf8mb4\", $user, $pass, [\n        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\n        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC\n    ]);\n    echo \"Conexão com o banco estabelecida com sucesso!\";\n} catch (PDOException $e) {\n    die(\"Falha crítica ao conectar ao banco: \" . $e->getMessage());\n}\n?>",
            c("Configure o modo de erro de $pdo para PDO::ERRMODE_EXCEPTION usando setAttribute.", "$pdo->setAttribute(..., ...);", "$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);", "Use $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);", "$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);"),
            "<?php\n$dsn = \"mysql:host=localhost;dbname=edev_blog;charset=utf8mb4\";\n$dbUser = \"root\";\n$dbPass = \"\";\n\ntry {\n    $pdo = new PDO($dsn, $dbUser, $dbPass, [\n        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\n        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC\n    ]);\n} catch (PDOException $e) {\n    error_log($e->getMessage());\n    die(\"Sistema temporariamente indisponivel para manutencao.\");\n}\n?>"),

          L('php-4-2', "Inserindo Artigos no Banco com Prepared Statements",
            `<h3>🛡️ A câmara de desinfecção: Prepared Statements contra SQL Injection</h3>
<p>Nunca monte comandos SQL colando strings de variáveis de usuário (ex: <code>INSERT INTO posts VALUES ('$titulo')</code>). Isso permite o ataque de <em>SQL Injection</em>, onde o invasor pode apagar todo o banco de dados.</p>

<p>Com <strong>Prepared Statements</strong>, o comando SQL é enviado primeiro com marcadores de interrogação (<code>?</code>). Os dados entram como valores puros, sem nenhum risco de virarem comandos!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Query Preparada Segura</div>
  <code>$stmt = $pdo-&gt;prepare("INSERT INTO posts (titulo) VALUES (?)");<br>$stmt-&gt;execute([$titulo]);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>admin/salvar-post.php</code>, incluindo <code>require_once "../config.php";</code>.</li>
  <li><strong>O que fazer depois:</strong> Submeta o formulário de cadastro no painel do blog.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Artigo inserido com sucesso! ID gerado: 1</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Tente cadastrar um título contendo aspas simples <code>'</code> e veja que ele grava perfeitamente sem quebrar a query!</li>
</ol>`,
            "<?php\n$sql = \"INSERT INTO posts (titulo, conteudo, categoria, criado_em) VALUES (?, ?, ?, NOW())\";\n$stmt = $pdo->prepare($sql);\n$stmt->execute([$titulo, $conteudo, $categoria]);\n\necho \"Artigo inserido com sucesso! ID: \" . $pdo->lastInsertId();\n?>",
            c("Prepare o comando SQL na variavel $pdo chamando $pdo->prepare($sql).", "$stmt = ...;", "$stmt = $pdo->prepare($sql);", "Chame $pdo->prepare($sql);", "$stmt = $pdo->prepare($sql);"),
            "<?php\nrequire_once \"config.php\";\n\nif ($_SERVER[\"REQUEST_METHOD\"] === \"POST\") {\n    $titulo = trim($_POST[\"titulo\"] ?? \"\");\n    $conteudo = trim($_POST[\"conteudo\"] ?? \"\");\n    $categoria = trim($_POST[\"categoria\"] ?? \"Geral\");\n\n    if (!empty($titulo) && !empty($conteudo)) {\n        $sql = \"INSERT INTO posts (titulo, conteudo, categoria, criado_em) VALUES (?, ?, ?, NOW())\";\n        $stmt = $pdo->prepare($sql);\n        $stmt->execute([$titulo, $conteudo, $categoria]);\n\n        header(\"Location: index.php?status=publicado\");\n        exit;\n    }\n}\n?>"),

          L('php-4-3', "Buscando e Listando Posts do Banco com query() e fetchAll()",
            `<h3>🎣 Puxando a rede de peixes: fetchAll() no banco</h3>
<p>Com os artigos gravados no MySQL, como puxamos essa coleção inteira para alimentar a página inicial?</p>

<p>Executamos um <code>SELECT</code> ordenado pelos mais recentes (<code>ORDER BY id DESC</code>) e chamamos <code>$stmt-&gt;fetchAll()</code>. Esse método devolve um array limpo pronto para ser percorrido com <code>foreach</code>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Buscando todos os registros</div>
  <code>$posts = $pdo-&gt;query("SELECT * FROM posts ORDER BY id DESC")-&gt;fetchAll();</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No topo de <code>index.php</code>, conectando ao banco e buscando as postagens.</li>
  <li><strong>O que fazer depois:</strong> Abra <code>http://localhost:8000/index.php</code> no navegador.</li>
  <li><strong>O que esperar na tela:</strong> Todos os artigos gravados no banco surgirão renderizados em cards no feed!</li>
  <li><strong>Agora é sua vez:</strong> Cadastre um novo post no painel e recarregue a home para vê-lo no topo.</li>
</ol>`,
            "<?php\n$sql = \"SELECT id, titulo, categoria, criado_em FROM posts ORDER BY id DESC LIMIT 10\";\n$stmt = $pdo->query($sql);\n$posts = $stmt->fetchAll();\n\nforeach ($posts as $p) {\n    echo \"<h3>\" . htmlspecialchars($p[\"titulo\"]) . \"</h3>\";\n}\n?>",
            c("Recupere todas as linhas resultantes chamando $stmt->fetchAll().", "$artigos = ...;", "$artigos = $stmt->fetchAll();", "Chame $stmt->fetchAll();", "$artigos = $stmt->fetchAll();"),
            "<?php\nrequire_once \"config.php\";\n\n$stmt = $pdo->query(\"SELECT id, titulo, conteudo, categoria, criado_em FROM posts ORDER BY id DESC\");\n$feedPosts = $stmt->fetchAll();\n\necho \"<div class='container-feed'>\";\nforeach ($feedPosts as $post) {\n    $resumo = mb_substr($post[\"conteudo\"], 0, 90) . \"...\";\n    $data = date(\"d/m/Y\", strtotime($post[\"criado_em\"]));\n\n    echo \"<div class='card'>\";\n    echo \"  <span class='badge'>{$post['categoria']}</span>\";\n    echo \"  <h3><a href='post.php?id={$post['id']}'>\" . htmlspecialchars($post['titulo']) . \"</a></h3>\";\n    echo \"  <p>$resumo</p>\";\n    echo \"  <small>Publicado em: $data</small>\";\n    echo \"</div>\";\n}\necho \"</div>\";\n?>"),

          L('php-4-4', "Página Individual do Post: post.php?id=... com WHERE id = ?",
            `<h3>🔍 A lupa de leitura: exibindo o artigo completo</h3>
<p>Quando o leitor clica no título de uma notícia na página inicial, ele é levado para: <code>post.php?id=5</code>. O arquivo lê esse ID com <code>$_GET['id']</code>, busca o post com <code>WHERE id = ?</code> e exibe o artigo completo.</p>

<p>Diferente de <code>fetchAll()</code> que devolve uma lista, usamos <code>$stmt-&gt;fetch()</code> para trazer uma única linha.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Buscando registro único</div>
  <code>$stmt = $pdo-&gt;prepare("SELECT * FROM posts WHERE id = ?");<br>$stmt-&gt;execute([$id]);<br>$post = $stmt-&gt;fetch();</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Crie um arquivo chamado <code>post.php</code> na raiz do projeto.</li>
  <li><strong>O que fazer depois:</strong> Clique em qualquer link de post da página inicial.</li>
  <li><strong>O que esperar na tela:</strong> O artigo completo formatado com quebras de linha via <code>nl2br()</code>.</li>
  <li><strong>Agora é sua vez:</strong> Tente acessar <code>post.php?id=9999</code> e veja o tratamento 404 funcionando perfeitamente.</li>
</ol>`,
            "<?php\n$id = filter_input(INPUT_GET, \"id\", FILTER_VALIDATE_INT);\n$stmt = $pdo->prepare(\"SELECT * FROM posts WHERE id = ?\");\n$stmt->execute([$id]);\n$post = $stmt->fetch();\n\nif (!$post) {\n    die(\"Artigo não encontrado!\");\n}\n\necho \"<h1>\" . htmlspecialchars($post[\"titulo\"]) . \"</h1>\";\necho \"<div>\" . nl2br(htmlspecialchars($post[\"conteudo\"])) . \"</div>\";\n?>",
            c("Recupere uma unica linha do resultado chamando $stmt->fetch().", "$post = ...;", "$post = $stmt->fetch();", "Chame $stmt->fetch();", "$post = $stmt->fetch();"),
            "<?php\nrequire_once \"config.php\";\n\n$id = filter_input(INPUT_GET, \"id\", FILTER_VALIDATE_INT);\nif (!$id) {\n    header(\"Location: index.php\");\n    exit;\n}\n\n$stmt = $pdo->prepare(\"SELECT * FROM posts WHERE id = ?\");\n$stmt->execute([$id]);\n$post = $stmt->fetch();\n\nif (!$post) {\n    http_response_code(404);\n    echo \"<h1>404 - Artigo Não Encontrado</h1>\";\n    exit;\n}\n?>\n<!DOCTYPE html>\n<html>\n<head><title><?= htmlspecialchars($post['titulo']) ?></title></head>\n<body>\n  <h1><?= htmlspecialchars($post['titulo']) ?></h1>\n  <p>Categoria: <?= htmlspecialchars($post['categoria']) ?></p>\n  <hr>\n  <div class=\"conteudo\"><?= nl2br(htmlspecialchars($post['conteudo'])) ?></div>\n  <p><a href=\"index.php\">&larr; Voltar para a página inicial</a></p>\n</body>\n</html>"),

          L('php-4-5', "Editando Postagens Existentes com UPDATE no Banco",
            `<h3>✏️ A caneta do editor: corrigindo erros com UPDATE</h3>
<p>Erros de digitação acontecem. O administrador precisa entrar no painel, abrir o artigo existente, corrigir o texto e salvar a nova versão.</p>

<p>O comando SQL <code>UPDATE posts SET titulo = ?, conteudo = ? WHERE id = ?</code> atualiza exatamente aquela notícia. O <code>WHERE id = ?</code> é obrigatório para não sobrescrever o banco todo!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Atualizando post com trava por ID</div>
  <code>$stmt = $pdo-&gt;prepare("UPDATE posts SET titulo = ? WHERE id = ?");</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Crie <code>admin/editar-post.php</code>.</li>
  <li><strong>O que fazer depois:</strong> Altere o título de um artigo e clique em Salvar Alterações.</li>
  <li><strong>O que esperar:</strong> O banco atualizará a linha e redirecionará com o novo título já em vigor!</li>
  <li><strong>Agora é sua vez:</strong> Confira no <code>post.php</code> que as alterações foram salvas.</li>
</ol>`,
            "<?php\n$id = 4;\n$novoTitulo = \"PHP Moderno Atualizado para 2026\";\n$sql = \"UPDATE posts SET titulo = ? WHERE id = ?\";\n$stmt = $pdo->prepare($sql);\n$stmt->execute([$novoTitulo, $id]);\n\necho \"Post atualizado com sucesso!\";\n?>",
            c("Prepare o UPDATE especificando a clausula WHERE id = ? no final.", "$sql = \"UPDATE posts SET titulo = ? ...\";", "$sql = \"UPDATE posts SET titulo = ? WHERE id = ?\";", "Acrescente WHERE id = ? no final do comando.", "$sql = \"UPDATE posts SET titulo = ? WHERE id = ?\";"),
            "<?php\nrequire_once \"config.php\";\n\n$id = filter_input(INPUT_POST, \"id\", FILTER_VALIDATE_INT);\n$titulo = trim($_POST[\"titulo\"] ?? \"\");\n$conteudo = trim($_POST[\"conteudo\"] ?? \"\");\n\nif ($id && !empty($titulo) && !empty($conteudo)) {\n    $stmt = $pdo->prepare(\"UPDATE posts SET titulo = ?, conteudo = ? WHERE id = ?\");\n    $stmt->execute([$titulo, $conteudo, $id]);\n    header(\"Location: post.php?id=$id&status=atualizado\");\n    exit;\n}\n?>"),

          L('php-4-6', "Excluindo Posts com Segurança: DELETE com WHERE",
            `<h3>🗑️ A lixeira com triturador: removendo posts com DELETE</h3>
<p>Quando uma notícia fica obsoleta ou foi postada por engano, o administrador precisa excluí-la definitivamente.</p>

<p>Executamos <code>DELETE FROM posts WHERE id = ?</code>. NUNCA execute um DELETE sem a cláusula <code>WHERE</code>, senão todos os posts seriam apagados em milissegundos!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Excluindo com trava por ID</div>
  <code>$stmt = $pdo-&gt;prepare("DELETE FROM posts WHERE id = ?");</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Crie <code>admin/excluir-post.php</code>.</li>
  <li><strong>O que fazer depois:</strong> No painel, clique no botão Excluir de uma notícia de teste.</li>
  <li><strong>O que esperar:</strong> O post desaparecerá da listagem e você voltará para o feed com mensagem de confirmação.</li>
  <li><strong>Agora é sua vez:</strong> Verifique no banco que o registro foi removido com sucesso.</li>
</ol>`,
            "<?php\n$idParaExcluir = 7;\n$stmt = $pdo->prepare(\"DELETE FROM posts WHERE id = ?\");\n$stmt->execute([$idParaExcluir]);\n\necho \"Artigo excluído com sucesso!\";\n?>",
            c("Escreva o comando SQL DELETE FROM posts com a clausula WHERE id = ?.", "$sql = \"...\";", "$sql = \"DELETE FROM posts WHERE id = ?\";", "Use \"DELETE FROM posts WHERE id = ?\";", "$sql = \"DELETE FROM posts WHERE id = ?\";"),
            "<?php\nrequire_once \"config.php\";\n\nif ($_SERVER[\"REQUEST_METHOD\"] === \"POST\") {\n    $id = filter_input(INPUT_POST, \"id\", FILTER_VALIDATE_INT);\n    if ($id) {\n        $stmt = $pdo->prepare(\"DELETE FROM posts WHERE id = ?\");\n        $stmt->execute([$id]);\n        header(\"Location: index.php?status=excluido\");\n        exit;\n    }\n}\n?>")
        ]
      },

      // ── Módulo 5 — Comentários dos Leitores e Deploy do Blog ──
      {
        title: "Módulo 5 — Comentários dos Leitores e Deploy do Blog",
        lessons: [
          L('php-5-1', "Modelando e Inserindo Comentários Vinculados ao Post",
            `<h3>💬 A caixa de diálogo: abrindo espaço para a comunidade</h3>
<p>Um blog estático é um monólogo. O que transforma um blog em uma comunidade vibrante são os comentários deixados pelos leitores abaixo de cada artigo.</p>

<p>Na tabela <code>comentarios</code>, guardamos o <code>post_id</code>, que atua como chave estrangeira conectando o comentário exatamente ao artigo correspondente.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Gravando comentário vinculado</div>
  <code>INSERT INTO comentarios (post_id, autor, texto) VALUES (?, ?, ?);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No final de <code>post.php</code>, adicione o formulário de envio de comentários.</li>
  <li><strong>O que fazer depois:</strong> Digite seu nome e um comentário e clique em Enviar.</li>
  <li><strong>O que esperar:</strong> O comentário será gravado e exibido na mesma página!</li>
  <li><strong>Agora é sua vez:</strong> Adicione dois comentários diferentes no mesmo post.</li>
</ol>`,
            "<?php\n$sql = \"INSERT INTO comentarios (post_id, autor, texto, criado_em) VALUES (?, ?, ?, NOW())\";\n$stmt = $pdo->prepare($sql);\n$stmt->execute([$postId, $autor, $texto]);\n\necho \"Comentario gravado!\";\n?>",
            c("Prepare o INSERT de comentarios incluindo post_id, autor e texto com marcadores ?.", "$sql = \"INSERT INTO comentarios (post_id, autor, texto) VALUES (?, ?, ?)\";", "$sql = \"INSERT INTO comentarios (post_id, autor, texto) VALUES (?, ?, ?)\";", "Use \"INSERT INTO comentarios (post_id, autor, texto) VALUES (?, ?, ?)\";", "$sql = \"INSERT INTO comentarios (post_id, autor, texto) VALUES (?, ?, ?)\";"),
            "<?php\nrequire_once \"config.php\";\n\nif ($_SERVER[\"REQUEST_METHOD\"] === \"POST\") {\n    $postId = filter_input(INPUT_POST, \"post_id\", FILTER_VALIDATE_INT);\n    $nome = trim($_POST[\"nome\"] ?? \"\");\n    $comentario = trim($_POST[\"comentario\"] ?? \"\");\n\n    if ($postId && !empty($nome) && !empty($comentario)) {\n        $stmt = $pdo->prepare(\"INSERT INTO comentarios (post_id, autor, texto, criado_em) VALUES (?, ?, ?, NOW())\");\n        $stmt->execute([$postId, $nome, $comentario]);\n        header(\"Location: post.php?id=$postId#comentarios\");\n        exit;\n    }\n}\n?>"),

          L('php-5-2', "Listando Comentários Abaixo do Artigo no post.php",
            `<h3>🧵 O mural de recados: renderizando os comentários</h3>
<p>Fazemos um <code>SELECT * FROM comentarios WHERE post_id = ? ORDER BY criado_em ASC</code> e percorremos cada linha com um <code>foreach</code>, sanitizando com <code>htmlspecialchars()</code>.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Buscando comentários do post</div>
  <code>SELECT autor, texto FROM comentarios WHERE post_id = ? ORDER BY id ASC;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na seção de comentários do <code>post.php</code>.</li>
  <li><strong>O que fazer depois:</strong> Abra o artigo no navegador.</li>
  <li><strong>O que esperar na tela:</strong> A lista cronológica de todos os comentários dos leitores.</li>
  <li><strong>Agora é sua vez:</strong> Se não houver comentários, exiba: "Seja o primeiro a opinar!".</li>
</ol>`,
            "<?php\n$stmt = $pdo->prepare(\"SELECT autor, texto FROM comentarios WHERE post_id = ? ORDER BY id ASC\");\n$stmt->execute([$postId]);\n$comentarios = $stmt->fetchAll();\n\nforeach ($comentarios as $c) {\n    echo \"<p><strong>\" . htmlspecialchars($c[\"autor\"]) . \":</strong> \" . htmlspecialchars($c[\"texto\"]) . \"</p>\";\n}\n?>",
            c("Prepare a busca dos comentarios filtrando com WHERE post_id = ?.", "$stmt = $pdo->prepare(\"SELECT * FROM comentarios WHERE ... = ?\");", "$stmt = $pdo->prepare(\"SELECT * FROM comentarios WHERE post_id = ?\");", "Use post_id = ? no filtro WHERE.", "$stmt = $pdo->prepare(\"SELECT * FROM comentarios WHERE post_id = ?\");"),
            "<?php\n$stmtComentarios = $pdo->prepare(\"SELECT autor, texto, criado_em FROM comentarios WHERE post_id = ? ORDER BY id ASC\");\n$stmtComentarios->execute([$post['id']]);\n$listaComentarios = $stmtComentarios->fetchAll();\n?>\n\n<section id=\"comentarios\" style=\"margin-top: 40px; border-top: 1px solid #ccc; padding-top: 20px;\">\n  <h3>Comentários dos Leitores (<?= count($listaComentarios) ?>)</h3>\n\n  <?php if (empty($listaComentarios)): ?>\n    <p>Nenhum comentário ainda. Seja o primeiro a opinar!</p>\n  <?php else: ?>\n    <?php foreach ($listaComentarios as $c): ?>\n      <div style=\"background: #f9f9f9; padding: 10px; margin-bottom: 10px; border-radius: 4px;\">\n        <strong><?= htmlspecialchars($c['autor']) ?></strong>\n        <p><?= nl2br(htmlspecialchars($c['texto'])) ?></p>\n      </div>\n    <?php endforeach; ?>\n  <?php endif; ?>\n</section>"),

          L('php-5-3', "Modularizando o Layout com require_once: header.php e footer.php",
            `<h3>🧩 As peças de Lego: nunca repita o mesmo cabeçalho</h3>
<p>Se seu blog tiver 30 páginas e você decidir mudar o logotipo no menu, copiar e colar o <code>&lt;head&gt;</code> em cada arquivo seria exaustivo.</p>

<p>Com <code>require_once "header.php"</code> e <code>require_once "footer.php"</code>, nós isolamos o topo e o rodapé em arquivos únicos. Qualquer alteração reflete instantaneamente em todas as páginas!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Reutilizando componentes</div>
  <code>require_once __DIR__ . '/includes/header.php';</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Crie a pasta <code>includes</code> com <code>header.php</code> e <code>footer.php</code>.</li>
  <li><strong>O que fazer depois:</strong> No <code>index.php</code> e <code>post.php</code>, substitua o HTML de topo por <code>require_once "includes/header.php";</code>.</li>
  <li><strong>O que esperar na tela:</strong> Todas as páginas compartilharão o mesmo design sem duplicar código.</li>
  <li><strong>Agora é sua vez:</strong> Mude a cor do menu no <code>header.php</code> e veja todas as páginas atualizarem de uma vez.</li>
</ol>`,
            "<?php\nrequire_once \"includes/header.php\";\necho \"<h1>Página Principal</h1>\";\nrequire_once \"includes/footer.php\";\n?>",
            c("Inclua o arquivo header.php uma unica vez usando a diretiva require_once.", "require_once ...;", "require_once \"header.php\";", "Use require_once \"header.php\";", "require_once \"header.php\";"),
            "<?php\nrequire_once __DIR__ . \"/includes/header.php\";\n?>\n\n<div class=\"container\">\n  <h1><?= htmlspecialchars($post['titulo']) ?></h1>\n  <div class=\"conteudo\"><?= nl2br(htmlspecialchars($post['conteudo'])) ?></div>\n</div>\n\n<?php\nrequire_once __DIR__ . \"/includes/footer.php\";\n?>"),

          L('php-5-4', "Mensagens de Feedback na URL (?status=sucesso)",
            `<h3>🔔 O aviso na tela: informando o usuário com elegância</h3>
<p>Após cadastrar uma notícia e ser redirecionado para a home, como o redator sabe com certeza que a gravação deu certo? Uma barra verde de aviso dá essa paz de espírito.</p>

<p>Passamos o parâmetro de status no redirecionamento: <code>header("Location: index.php?status=sucesso")</code>. Na página de destino, lemos <code>$_GET['status']</code> e desenhamos o alerta correspondente.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Exibindo alerta conforme status</div>
  <code>if (($status ?? '') === 'sucesso') echo "&lt;div class='alert-success'&gt;Gravado com sucesso!&lt;/div&gt;";</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No <code>index.php</code> logo abaixo do cabeçalho.</li>
  <li><strong>O que fazer depois:</strong> Acesse no navegador: <code>http://localhost:8000/index.php?status=publicado</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>✓ Artigo publicado com sucesso!</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Teste também com <code>?status=excluido</code> e veja o aviso mudar de cor.</li>
</ol>`,
            "<?php\n$status = $_GET[\"status\"] ?? \"\";\n\nif ($status === \"sucesso\") {\n    echo \"<div style='background: #d4edda; color: #155724; padding: 10px;'>✓ Operação concluída com sucesso!</div>\";\n}\n?>",
            c("Verifique se $status === \"sucesso\" e exiba a mensagem \"Artigo Salvo!\" dentro de uma div.", "if ($status === \"sucesso\") { ... }", "if ($status === \"sucesso\") { echo \"<div>Artigo Salvo!</div>\"; }", "Use if ($status === \"sucesso\") { echo \"<div>Artigo Salvo!</div>\"; }", "if ($status === \"sucesso\") { echo \"<div>Artigo Salvo!</div>\"; }"),
            "<?php\n$statusMsg = $_GET[\"status\"] ?? null;\n\n$avisos = [\n    \"publicado\" => \"Artigo publicado com sucesso!\",\n    \"atualizado\" => \"Artigo atualizado com sucesso!\",\n    \"excluido\" => \"Artigo excluído do sistema!\"\n];\n\nif (isset($avisos[$statusMsg])) {\n    echo \"<div class='alerta-sucesso'>\" . $avisos[$statusMsg] . \"</div>\";\n}\n?>"),

          L('php-5-5', "Checklist de Segurança e Deploy do Blog Dinâmico",
            `<h3>🚀 A rampa de lançamento: checklist antes da produção</h3>
<p>Antes de subir seu blog PHP para um servidor na nuvem, duas configurações do <code>php.ini</code> são vitais:</p>
<ul>
  <li><code>display_errors = Off</code>: Erros nunca devem aparecer para o visitante final (eles revelam senhas do banco e caminhos internos).</li>
  <li><code>log_errors = On</code>: Erros são guardados silenciosamente em um arquivo de log seguro acessível apenas pelo administrador.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Escondendo erros em produção</div>
  <code>ini_set('display_errors', '0');<br>ini_set('log_errors', '1');</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No seu arquivo de inicialização <code>config.php</code>.</li>
  <li><strong>O que fazer depois:</strong> Ative a trava de produção.</li>
  <li><strong>O que esperar:</strong> O visitante recebe páginas limpas e estáveis, e o log interno registra qualquer anormalidade.</li>
  <li><strong>Agora é sua vez:</strong> Seu blog dinâmico está blindado para ir para a nuvem!</li>
</ol>`,
            "<?php\nini_set('display_errors', '0');\nini_set('log_errors', '1');\nerror_reporting(E_ALL);\n?>",
            c("Desative a exibicao publica de erros chamando ini_set(\"display_errors\", \"0\").", "ini_set(...);", "ini_set(\"display_errors\", \"0\");", "Chame ini_set(\"display_errors\", \"0\");", "ini_set(\"display_errors\", \"0\");"),
            "<?php\ndefine(\"AMB_PRODUCAO\", true);\n\nif (AMB_PRODUCAO) {\n    ini_set(\"display_errors\", \"0\");\n    ini_set(\"log_errors\", \"1\");\n} else {\n    ini_set(\"display_errors\", \"1\");\n}\n?>"),

          L('php-5-6', "Conclusão do Blog Dinâmico e Emissão de Certificado",
            `<h3>🎓 O selo de desenvolvedor backend: você dominou o PHP Moderno!</h3>
<p>Parabéns, desenvolvedor! Você começou entendendo a arquitetura cliente-servidor e construiu um blog dinâmico completo do zero, com painel administrativo seguro, criptografia de senhas com <code>password_hash()</code>, banco MySQL conectado via PDO com Prepared Statements e sistema de comentários da comunidade.</p>

<p>Com essa base, você domina as engrenagens reais que movem a web mundial e está preparado para criar sistemas web, APIs REST e se aprofundar em frameworks de peso como Laravel ou Symfony.</p>

<p>Seu certificado de conclusão do curso de PHP da plataforma Edev já está disponível na aba Certificados!</p>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No seu projeto completo na pasta <code>meu-blog-php</code>.</li>
  <li><strong>O que fazer depois:</strong> Navegue pelo feed, cadastre um artigo no admin, faça login seguro e deixe um comentário.</li>
  <li><strong>O que esperar:</strong> O ecossistema web funcionando 100% integrado no seu servidor local!</li>
  <li><strong>Agora é sua vez:</strong> Comemore sua conquista de backend developer!</li>
</ol>`,
            "// === PROJETO COMPLETO CONCLUÍDO: BLOG DINÂMICO EM PHP ===\n// Sistema seguro com PDO, Prepared Statements, Autenticação e Comentários!",
            c("Exiba a mensagem \"Certificado PHP Edev Conquistado!\" usando o comando echo.", "echo ...;", "echo \"Certificado PHP Edev Conquistado!\";", "Use echo \"Certificado PHP Edev Conquistado!\";", "echo \"Certificado PHP Edev Conquistado!\";"),
            "<?php\nrequire_once \"config.php\";\nrequire_once \"includes/header.php\";\n\n$status = $_GET[\"status\"] ?? null;\nif ($status === \"sucesso\") {\n    echo \"<div class='alerta'>Ação concluída com sucesso!</div>\";\n}\n\n$stmt = $pdo->query(\"SELECT * FROM posts ORDER BY id DESC\");\n$artigos = $stmt->fetchAll();\n?>\n\n<div class=\"feed-principal\">\n  <h1>Blog Dinâmico — Edev</h1>\n  <?php foreach ($artigos as $post): ?>\n    <article class=\"post-card\">\n      <h2><a href=\"post.php?id=<?= $post['id'] ?>\"><?= htmlspecialchars($post['titulo']) ?></a></h2>\n      <p><?= mb_substr(htmlspecialchars($post['conteudo']), 0, 100) ?>...</p>\n    </article>\n  <?php endforeach; ?>\n</div>\n\n<?php\nrequire_once \"includes/footer.php\";\n?>")
        ]
      }
    ]
  },

  sql: {
    id: "sql",
    name: "Banco de Dados do Zero: SQL na Prática",
    tag: "SQL + Relacionamentos + Consultas",
    hours: "40 horas",
    desc: "Construa e consulte o banco de dados relacional de uma livraria virtual completa. Domine CREATE TABLE, integridade referencial, JOINs, agregações e otimização com índices.",
    modules: [
      // ── Módulo 0 — O que é Banco de Dados? e Ferramentas Práticas ──
      {
        title: "Módulo 0 — O que é Banco de Dados? e Ferramentas Práticas",
        lessons: [
          L('sql-0-0', "Como este curso funciona — Sua jornada e o banco da Livraria Online",
            `<h3>🗄️ Bem-vindo ao cofre de dados do mundo moderno!</h3>
<p>Se você parar para pensar, praticamente toda grande invenção digital — redes sociais, bancos, serviços de streaming, e-commerces — é essencialmente uma interface bonita construída em volta de um banco de dados confiável.</p>

<p>Aprender SQL (<em>Structured Query Language</em>) é ganhar uma das habilidades mais valorizadas e atemporais de toda a história da tecnologia. Os frameworks mudam a cada estação, mas o SQL continua firme há mais de 40 anos.</p>

<h3>📚 O Projeto do Curso: Banco de Dados da Livraria Online</h3>
<p>Nós vamos projetar do zero o banco relacional completo de uma <strong>Grande Livraria Online</strong>. Você aprenderá a modelar autores, categorias, o acervo de livros com estoque e preços, clientes, pedidos com itens de venda, relatórios de faturamento e visões automatizadas.</p>

<p>Esta aula inaugural é um acolhimento acolhedor — sem desafios nem cobranças. Na próxima aula, vamos entender por que bancos de dados deixam as planilhas comuns no chinelo!</p>`,
            "-- === PROJETO DO CURSO: Banco de Dados da Livraria Online ===\n-- Ao longo das aulas, você criará a estrutura completa de tabelas e consultas.",
            null,
            "-- === PROJETO DO CURSO: Banco de Dados da Livraria Online ===\n-- Este arquivo demonstrará a evolução de suas tabelas e consultas.\n-- Na próxima aula, conheceremos os bancos relacionais!"),

          L('sql-0-1', "O que é um Banco Relacional? — Muito Além das Planilhas",
            `<h3>🏢 O arquivo deslizante de aço: por que planilhas não bastam</h3>
<p>Imagine gerenciar uma livraria com 100.000 livros vendidos por dia usando o Excel. Em poucos minutos, o arquivo travaria, dois funcionários sobrescreveriam a mesma célula ao mesmo tempo e os dados estariam corrompidos para sempre.</p>

<p>Um <strong>Banco de Dados Relacional</strong> organiza as informações em tabelas conectadas entre si por chaves, como gavetas de um arquivo de aço etiquetado.</p>

<h3>🛡️ As garantias sagradas: Integridade e Concorrência</h3>
<p>Bancos relacionais garantem que milhares de pessoas comprem simultaneamente sem vender o mesmo exemplar duas vezes, impedem que um livro seja cadastrado com preço negativo e nunca esquecem uma transação confirmada, mesmo se faltar luz no servidor.</p>

<p>Aula teórica concluída! Na próxima aula, você conhecerá o SQLite e o DB Browser para praticar visualmente.</p>`,
            "-- Exemplo conceitual de relação entre tabelas:\n-- TABELA autores (id, nome)\n-- TABELA livros (id, titulo, autor_id) -> autor_id aponta para o autor!",
            null,
            "-- === PROJETO DO CURSO: Livraria Online ===\n-- Conceito de modelo relacional absorvido. Próximo passo: ambiente de desenvolvimento!"),

          L('sql-0-2', "Ambiente Prático — Instalando o SQLite e DB Browser for SQLite",
            `<h3>🧰 A bancada do artesão: SQLite e DB Browser</h3>
<p>Para aprender SQL na prática sem precisar instalar servidores pesados e complexos, nós usamos o <strong>SQLite</strong> — o mecanismo de banco de dados mais instalado do planeta (ele roda dentro de todo celular Android, iPhone e no seu navegador!).</p>

<p>O <strong>DB Browser for SQLite</strong> é uma ferramenta visual gratuita e leve que permite ver as tabelas como se fossem planilhas limpas e rodar comandos SQL em tempo real com uma aba de execução dedicada.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Criando um novo arquivo de banco</div>
  <code>livraria.db</code>
</div>

<p>Todo o seu banco de dados fica guardado em um único arquivo portátil no seu computador!</p>

<p>Ambiente pronto! No Módulo 1, criaremos a primeira tabela oficial do nosso acervo de livros.</p>`,
            "-- No DB Browser for SQLite:\n-- Clique em \"Novo Banco de Dados\" e salve como \"livraria.db\"\n-- A aba \"Executar SQL\" sera nossa arena de comandos!",
            null,
            "-- === PROJETO DO CURSO: Livraria Online ===\n-- Banco \"livraria.db\" preparado. Prontos para criar as primeiras tabelas!")
        ]
      },

      // ── Módulo 1 — Criando Tabelas e Inserindo Dados do Acervo ──
      {
        title: "Módulo 1 — Criando Tabelas e Inserindo Dados do Acervo",
        lessons: [
          L('sql-1-1', "O que é CREATE TABLE e Tipos de Dados — A Tabela de Autores",
            `<h3>📋 A certidão de nascimento da gaveta: dissecando CREATE TABLE</h3>
<p>Imagine encomendar um armário sob medida para a livraria: você diz ao marceneiro exatamente quantas gavetas ele terá e o que caberá em cada uma delas (uma para fichas de papel, outra para moedas).</p>

<h3>📖 Entendendo cada termo antes de usar:</h3>
<ul>
  <li><code>CREATE</code>: É a instrução que cria um novo objeto físico dentro do banco de dados (tabelas, índices, visões).</li>
  <li><code>TABLE</code>: Especifica que o tipo de objeto que estamos criando é uma <strong>tabela</strong> com colunas e linhas.</li>
  <li><code>autores</code>: É o nome de batismo que escolhemos para esta tabela.</li>
  <li><code>INTEGER</code>: Tipo de dado para números inteiros (como identificadores e idades).</li>
  <li><code>TEXT</code>: Tipo de dado para textos de qualquer tamanho (nomes, biografias, títulos).</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Sintaxe do CREATE TABLE</div>
  <code>CREATE TABLE autores (id INTEGER, nome TEXT);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Abra o <strong>DB Browser for SQLite</strong>, clique em "Abrir Banco de Dados" e selecione o arquivo <code>livraria.db</code>. Depois clique na aba <strong>Executar SQL</strong>.</li>
  <li><strong>O código:</strong> Digite o comando abaixo no editor de texto da aba:
    <pre><code>CREATE TABLE autores (
    id INTEGER,
    nome TEXT,
    nacionalidade TEXT
);</code></pre>
  </li>
  <li><strong>O que fazer depois:</strong> Clique no botão azul de <strong>Play (Executar SQL)</strong> na barra de ferramentas ou pressione a tecla <code>F5</code>.</li>
  <li><strong>O que esperar:</strong> No painel inferior de resposta você verá a mensagem: <em>"A consulta foi executada com sucesso"</em>.</li>
  <li><strong>Agora é sua vez:</strong> Clique na aba "Estrutura do Banco de Dados" e veja a tabela <code>autores</code> listada oficialmente com suas 3 colunas!</li>
</ol>`,
            "CREATE TABLE autores (\n    id INTEGER,\n    nome TEXT,\n    nacionalidade TEXT\n);",
            c("Crie uma tabela chamada autores com a coluna nome do tipo TEXT.", "CREATE TABLE autores (...);", "CREATE TABLE autores (nome TEXT);", "Use CREATE TABLE autores (nome TEXT);", "CREATE TABLE autores (nome TEXT);"),
            "-- === LIVRARIA ONLINE: CRIANDO TABELA DE AUTORES ===\nCREATE TABLE autores (\n    id INTEGER,\n    nome TEXT,\n    nacionalidade TEXT\n);"),

          L('sql-1-2', "O que é PRIMARY KEY e AUTOINCREMENT — A Tabela de Categorias",
            `<h3>🔑 A impressão digital única: PRIMARY KEY e AUTOINCREMENT</h3>
<p>Como garantir que duas categorias não se misturem no sistema? No banco de dados, cada linha precisa de uma identificação exclusiva universal chamada <strong>Chave Primária</strong>.</p>

<h3>📖 Dissecando os termos fundamentais:</h3>
<ul>
  <li><code>PRIMARY KEY</code>: É a chave primária. Garante duas coisas sagradas: o valor nunca pode se repetir em nenhuma outra linha e nunca pode ficar vazio (nulo). É como o CPF de cada registro.</li>
  <li><code>AUTOINCREMENT</code>: Diz ao motor do SQLite: "gerencie a numeração para mim!". A primeira categoria cadastrada ganha id 1, a segunda 2, a terceira 3, de forma automática e sem conflito.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Chave Primária Auto-Incremental</div>
  <code>id INTEGER PRIMARY KEY AUTOINCREMENT</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba <strong>Executar SQL</strong> do DB Browser.</li>
  <li><strong>O código:</strong> Digite a criação da tabela de categorias e clique no botão Play (ou <code>F5</code>).</li>
  <li><strong>O que esperar:</strong> Consulta executada com sucesso em poucos milissegundos.</li>
  <li><strong>Agora é sua vez:</strong> Verifique na aba "Estrutura" que a coluna <code>id</code> possui um ícone amarelo de chavezinha ao lado!</li>
</ol>`,
            "CREATE TABLE categorias (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL\n);",
            c("Defina a coluna id como INTEGER PRIMARY KEY AUTOINCREMENT.", "id INTEGER ...", "id INTEGER PRIMARY KEY AUTOINCREMENT", "Escreva INTEGER PRIMARY KEY AUTOINCREMENT", "id INTEGER PRIMARY KEY AUTOINCREMENT"),
            "CREATE TABLE autores (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL,\n    nacionalidade TEXT\n);\n\nCREATE TABLE categorias (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL\n);"),

          L('sql-1-3', "O que é FOREIGN KEY — Conectando a Tabela Livros",
            `<h3>🔗 A ponte invisível: dissecando FOREIGN KEY</h3>
<p>Se você colocar o nome do autor por extenso dentro de cada livro, quando o autor mudar de pseudônimo você precisará alterar milhares de linhas. Isso gera duplicidade e inconsistência.</p>

<h3>📖 Entendendo a Chave Estrangeira:</h3>
<ul>
  <li><code>FOREIGN KEY</code>: Significa <strong>Chave Estrangeira</strong>. É uma coluna que aponta diretamente para a chave primária de outra tabela (como <code>autor_id</code> apontando para <code>autores(id)</code>).</li>
  <li><code>REFERENCES</code>: Palavra que especifica qual tabela e qual coluna estão sendo conectadas.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Conectando tabelas com chave estrangeira</div>
  <code>FOREIGN KEY (autor_id) REFERENCES autores(id)</code>
</div>

<p>Com essa amarração, o banco se recusa a aceitar um livro associado a um autor que não existe no sistema!</p>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba <strong>Executar SQL</strong> do DB Browser.</li>
  <li><strong>O código:</strong> Execute a criação da tabela <code>livros</code> com as duas chaves estrangeiras.</li>
  <li><strong>O que esperar:</strong> A tabela mestre <code>livros</code> será criada com conexões garantidas para <code>autores</code> e <code>categorias</code>.</li>
  <li><strong>Agora é sua vez:</strong> Confira as relações criadas na estrutura do banco.</li>
</ol>`,
            "CREATE TABLE livros (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    titulo TEXT NOT NULL,\n    preco REAL NOT NULL,\n    estoque INTEGER DEFAULT 0,\n    autor_id INTEGER,\n    categoria_id INTEGER,\n    FOREIGN KEY (autor_id) REFERENCES autores(id),\n    FOREIGN KEY (categoria_id) REFERENCES categorias(id)\n);",
            c("Declare a chave estrangeira autor_id referenciando autores(id).", "FOREIGN KEY (autor_id) REFERENCES ...", "FOREIGN KEY (autor_id) REFERENCES autores(id)", "Use FOREIGN KEY (autor_id) REFERENCES autores(id)", "FOREIGN KEY (autor_id) REFERENCES autores(id)"),
            "CREATE TABLE autores (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL,\n    nacionalidade TEXT\n);\n\nCREATE TABLE categorias (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL\n);\n\nCREATE TABLE livros (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    titulo TEXT NOT NULL,\n    preco REAL NOT NULL,\n    estoque INTEGER DEFAULT 0,\n    autor_id INTEGER,\n    categoria_id INTEGER,\n    FOREIGN KEY (autor_id) REFERENCES autores(id),\n    FOREIGN KEY (categoria_id) REFERENCES categorias(id)\n);"),

          L('sql-1-4', "Restrições de Integridade: NOT NULL, UNIQUE e DEFAULT",
            `<h3>🚦 As regras de trânsito: blindando as colunas contra dados ruins</h3>
<p>O que impede um usuário de salvar um livro sem título, com preço vazio ou com e-mail duplicado? As <strong>Restrições de Integridade</strong> (<em>Constraints</em>) atuam como guardas no portão do banco.</p>

<h3>📖 Entendendo cada restrição:</h3>
<ul>
  <li><code>NOT NULL</code>: Proíbe que a coluna fique vazia ou nula. O preenchimento é 100% obrigatório.</li>
  <li><code>UNIQUE</code>: Proíbe valores duplicados em toda a tabela (perfeito para ISBN de livros e CNPJ de editoras).</li>
  <li><code>DEFAULT</code>: Define um valor padrão automático caso ninguém informe nada (ex: <code>DEFAULT 0</code> para estoque).</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Restrições na Declaração</div>
  <code>titulo TEXT NOT NULL, codigo TEXT UNIQUE, estoque INTEGER DEFAULT 0</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba <strong>Executar SQL</strong> do DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Crie a tabela <code>editoras</code> contendo <code>NOT NULL</code> e <code>UNIQUE</code>.</li>
  <li><strong>O que esperar:</strong> Se tentar inserir uma editora com o mesmo código de registro de outra, o banco rejeitará na hora!</li>
  <li><strong>Agora é sua vez:</strong> Teste inserir duas vezes o mesmo código e veja o erro de <em>UNIQUE constraint failed</em>.</li>
</ol>`,
            "CREATE TABLE editoras (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL,\n    cnpj TEXT UNIQUE NOT NULL,\n    ativo INTEGER DEFAULT 1\n);",
            c("Adicione a restricao NOT NULL na coluna titulo TEXT NOT NULL.", "titulo TEXT ...", "titulo TEXT NOT NULL", "Escreva NOT NULL apos o tipo TEXT.", "titulo TEXT NOT NULL"),
            "CREATE TABLE editoras (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL,\n    codigo_registro TEXT UNIQUE NOT NULL,\n    status INTEGER DEFAULT 1\n);\n\nINSERT INTO editoras (nome, codigo_registro) VALUES ('Companhia das Letras', 'ED-001');\nINSERT INTO editoras (nome, codigo_registro) VALUES ('Editora Aleph', 'ED-002');"),

          L('sql-1-5', "Inserindo Dados com INSERT INTO: Cadastrando Autores e Categorias",
            `<h3>📥 Guardando as primeiras fichas na gaveta: INSERT INTO</h3>
<p>Com as gavetas construídas e identificadas, chegou a hora de colocar o primeiro conteúdo dentro delas. O comando <code>INSERT INTO</code> insere uma nova linha de dados na tabela.</p>

<p>Informamos os nomes das colunas de destino entre parênteses e passamos os valores correspondentes em <code>VALUES (...)</code>. Textos sempre vão entre aspas simples (<code>'...'</code>).</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Sintaxe do INSERT INTO</div>
  <code>INSERT INTO autores (nome, nacionalidade) VALUES ('Machado de Assis', 'Brasileira');</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba <strong>Executar SQL</strong> do DB Browser.</li>
  <li><strong>O código:</strong> Digite os comandos de inserção de autores e categorias e clique em Executar (<code>F5</code>).</li>
  <li><strong>O que fazer depois:</strong> Clique no menu superior em <strong>Escrever Alterações (Ctrl+S)</strong> para salvar permanentemente no arquivo <code>livraria.db</code>!</li>
  <li><strong>O que esperar:</strong> Na aba <strong>Navegar Dados</strong>, selecione a tabela <code>autores</code> para ver os nomes listados em linhas reais.</li>
  <li><strong>Agora é sua vez:</strong> Insira seu autor favorito na tabela.</li>
</ol>`,
            "-- Inserindo categorias iniciais\nINSERT INTO categorias (nome) VALUES ('Ficção Científica');\nINSERT INTO categorias (nome) VALUES ('Tecnologia');\n\n-- Inserindo autores consagrados\nINSERT INTO autores (nome, nacionalidade) VALUES ('George Orwell', 'Britânica');\nINSERT INTO autores (nome, nacionalidade) VALUES ('J.R.R. Tolkien', 'Britânica');",
            c("Insira na tabela categorias na coluna nome o valor \"Fantasia\".", "INSERT INTO categorias (nome) VALUES (...);", "INSERT INTO categorias (nome) VALUES ('Fantasia');", "Use INSERT INTO categorias (nome) VALUES ('Fantasia');", "INSERT INTO categorias (nome) VALUES ('Fantasia');"),
            "-- Populando Autores e Categorias\nINSERT INTO autores (nome, nacionalidade) VALUES ('Machado de Assis', 'Brasileira');\nINSERT INTO autores (nome, nacionalidade) VALUES ('Isaac Asimov', 'Russa');\nINSERT INTO autores (nome, nacionalidade) VALUES ('J.K. Rowling', 'Britânica');\n\nINSERT INTO categorias (nome) VALUES ('Literatura Clássica');\nINSERT INTO categorias (nome) VALUES ('Ficção Científica');\nINSERT INTO categorias (nome) VALUES ('Fantasia');"),

          L('sql-1-6', "Inserção em Lote: Cadastrando o Acervo de Livros",
            `<h3>📦 A entrega do caminhão: inserindo múltiplos livros de uma só vez</h3>
<p>Quando uma distribuidora descarrega livros novos na livraria, você não cadastra um livro, salva, fecha e abre de novo. Você registra a remessa inteira em um único comando.</p>

<p>Em SQL, encadeamos múltiplos blocos de <code>(valores), (valores)</code> separados por vírgula em um único <code>INSERT INTO</code>. Isso é até 100 vezes mais rápido do que dezenas de comandos soltos!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Inserindo em lote</div>
  <code>INSERT INTO livros (titulo, preco) VALUES ('Livro A', 49.90), ('Livro B', 59.90);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba <strong>Executar SQL</strong> do DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Execute o comando de inserção em lote com <code>F5</code> e clique em <em>Escrever Alterações</em>.</li>
  <li><strong>O que esperar:</strong> 4 novos livros cadastrados instantaneamente no banco com seus respectivos preços e estoques.</li>
  <li><strong>Agora é sua vez:</strong> Abra a aba <em>Navegar Dados</em> e veja seu catálogo de livros preenchido!</li>
</ol>`,
            "INSERT INTO livros (titulo, preco, estoque, autor_id, categoria_id) VALUES\n('Dom Casmurro', 39.90, 15, 1, 1),\n('Fundação', 64.90, 8, 2, 2),\n('Eu, Robô', 48.00, 12, 2, 2),\n('Harry Potter e a Pedra Filosofal', 55.00, 20, 3, 3);",
            c("Insira em livros titulo e preco os valores (\"Duna\", 72.50).", "INSERT INTO livros (titulo, preco) VALUES (...);", "INSERT INTO livros (titulo, preco) VALUES ('Duna', 72.50);", "Use INSERT INTO livros (titulo, preco) VALUES ('Duna', 72.50);", "INSERT INTO livros (titulo, preco) VALUES ('Duna', 72.50);"),
            "INSERT INTO livros (titulo, preco, estoque, autor_id, categoria_id) VALUES\n('Memórias Póstumas de Brás Cubas', 42.00, 10, 1, 1),\n('O Fim da Eternidade', 52.90, 6, 2, 2),\n('Animais Fantásticos', 45.50, 14, 3, 3);")
        ]
      },

      // ── Módulo 2 — Consultas, Filtros e Ordenação no Acervo ──
      {
        title: "Módulo 2 — Consultas, Filtros e Ordenação no Acervo",
        lessons: [
          L('sql-2-1', "Buscando Dados com SELECT e Apelidos com AS",
            `<h3>🔦 A lanterna no arquivo: buscando dados com SELECT</h3>
<p>Depois de ter guardado milhares de livros no banco, como nós os lemos? O comando <code>SELECT</code> é a ferramenta mestra que você usará na maior parte do tempo.</p>

<p>Podemos buscar colunas específicas (<code>SELECT titulo, preco FROM livros</code>) ou usar o curinga asterisco (<code>SELECT * FROM livros</code>) para trazer todas as colunas.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Renomeando coluna no relatório com AS</div>
  <code>SELECT titulo AS NomeDoLivro, preco AS ValorReais FROM livros;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba <strong>Executar SQL</strong> do DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Digite o <code>SELECT</code> e tecle <code>F5</code>.</li>
  <li><strong>O que esperar na tela:</strong> Uma grade limpa com as colunas renomeadas como "Obra", "Preço de Tabela" e "Unidades Disponíveis".</li>
  <li><strong>Agora é sua vez:</strong> Consulte apenas os títulos com <code>SELECT titulo FROM livros;</code>.</li>
</ol>`,
            "SELECT \n    titulo AS Obra,\n    preco AS 'Preço de Tabela',\n    estoque AS 'Unidades Disponíveis'\nFROM livros;",
            c("Escreva uma consulta SELECT que busca a coluna titulo da tabela livros.", "SELECT ... FROM livros;", "SELECT titulo FROM livros;", "Use SELECT titulo FROM livros;", "SELECT titulo FROM livros;"),
            "SELECT \n    id AS Codigo,\n    titulo AS NomeLivro,\n    preco AS ValorUnitario,\n    estoque AS Quantidade\nFROM livros;"),

          L('sql-2-2', "Filtrando Obras com a Cláusula WHERE e Operadores",
            `<h3>🎯 O filtro da busca: encontrando a agulha no palheiro</h3>
<p>Ninguém entra na livraria e pede para ver todos os 50.000 livros da loja. O cliente diz: "Quero livros que custem menos de 50 reais" ou "Livros que ainda tenham estoque".</p>

<p>A cláusula <code>WHERE</code> funciona como um funil inteligente: ela avalia cada linha e só deixa passar os registros que satisfazem a regra booleana.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Filtrando por preço com operador menor (&lt;)</div>
  <code>SELECT * FROM livros WHERE preco &lt; 50.00;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba <strong>Executar SQL</strong> do DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Execute a consulta com <code>F5</code>.</li>
  <li><strong>O que esperar na tela:</strong> Apenas os livros baratos com estoque imediato aparecerão na grade de resultados.</li>
  <li><strong>Agora é sua vez:</strong> Altere a regra para <code>WHERE preco &gt; 60.00</code> e veja os livros mais caros do acervo.</li>
</ol>`,
            "SELECT titulo, preco, estoque \nFROM livros \nWHERE preco <= 45.00 AND estoque > 0;",
            c("Filtre os livros onde preco > 50.00 usando WHERE preco > 50.00.", "SELECT * FROM livros WHERE ...;", "SELECT * FROM livros WHERE preco > 50.00;", "Complete com WHERE preco > 50.00;", "SELECT * FROM livros WHERE preco > 50.00;"),
            "SELECT titulo, preco, estoque \nFROM livros \nWHERE preco < 50.00 AND estoque >= 5;"),

          L('sql-2-3', "Buscas Textuais com LIKE e o Curinga de Porcentagem (%)",
            `<h3>🔍 A barra de pesquisa do site: buscando trechos com LIKE</h3>
<p>Quando o leitor digita "Robô" no campo de busca da loja, ele não sabe o título completo. Ele pode querer "Eu, Robô" ou "O Sonho de um Robô".</p>

<p>O operador <code>LIKE</code> com o caractere curinga <code>%</code> permite buscas parciais. O <code>%</code> significa: "qualquer sequência de caracteres antes ou depois".</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Buscando qualquer livro contendo 'Robô'</div>
  <code>SELECT * FROM livros WHERE titulo LIKE '%Robô%';</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba <strong>Executar SQL</strong> do DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Execute a consulta com <code>F5</code>.</li>
  <li><strong>O que esperar na tela:</strong> Todas as obras que contenham o termo pesquisado em qualquer parte do título.</li>
  <li><strong>Agora é sua vez:</strong> Busque por <code>LIKE 'Dom%'</code> e veja títulos que começam especificamente com Dom.</li>
</ol>`,
            "SELECT id, titulo, preco \nFROM livros \nWHERE titulo LIKE '%Harry%';",
            c("Busque todos os livros cujo titulo comece com \"Dom\" usando LIKE \"Dom%\".", "SELECT * FROM livros WHERE titulo LIKE ...;", "SELECT * FROM livros WHERE titulo LIKE 'Dom%';", "Use LIKE 'Dom%'", "SELECT * FROM livros WHERE titulo LIKE 'Dom%';"),
            "SELECT titulo, preco \nFROM livros \nWHERE titulo LIKE '%Memórias%' OR titulo LIKE '%Robô%';"),

          L('sql-2-4', "Filtros de Intervalo com BETWEEN e Listas com IN",
            `<h3>📊 Entre a faixa de preço e a lista de categorias</h3>
<p>Em vez de escrever expressões cansativas como <code>preco &gt;= 30 AND preco &lt;= 60</code>, usamos o elegante operador <code>BETWEEN 30 AND 60</code>.</p>

<p>E para buscar livros pertencentes a um grupo de categorias conhecidas (1, 2 ou 3), usamos o operador <code>IN (1, 2, 3)</code>!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Filtrando por intervalo de valores</div>
  <code>SELECT * FROM livros WHERE preco BETWEEN 30.00 AND 60.00;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Execute com <code>F5</code>.</li>
  <li><strong>O que esperar na tela:</strong> Os livros filtrados estritamente dentro da faixa de valores definida.</li>
  <li><strong>Agora é sua vez:</strong> Teste <code>WHERE categoria_id IN (1, 3)</code> para ver os livros dessas duas categorias juntas.</li>
</ol>`,
            "SELECT titulo, preco FROM livros WHERE preco BETWEEN 40.00 AND 55.00;",
            c("Escreva a clausula WHERE preco BETWEEN 20.00 AND 50.00.", "WHERE preco ...", "WHERE preco BETWEEN 20.00 AND 50.00", "Use WHERE preco BETWEEN 20.00 AND 50.00", "WHERE preco BETWEEN 20.00 AND 50.00"),
            "SELECT titulo, preco, categoria_id \nFROM livros \nWHERE preco BETWEEN 35.00 AND 60.00 \n  AND categoria_id IN (1, 2);"),

          L('sql-2-5', "Ordenando Resultados com ORDER BY ASC e DESC",
            `<h3>📶 O ranking da vitrine: organizando por preço ou ordem alfabética</h3>
<p>Na loja virtual, o cliente quer poder clicar em: "Mais Baratos Primeiro" ou "Ordem Alfabética de A a Z".</p>

<p>A cláusula <code>ORDER BY</code> organiza o resultado final:</p>
<ul>
  <li><code>ASC</code> (Ascendente): Do menor para o maior (padrão).</li>
  <li><code>DESC</code> (Descendente): Do maior para o menor (preços mais altos no topo).</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Ordenando do mais caro para o mais barato</div>
  <code>SELECT * FROM livros ORDER BY preco DESC;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba Executar SQL.</li>
  <li><strong>O que fazer depois:</strong> Execute com <code>F5</code>.</li>
  <li><strong>O que esperar na tela:</strong> O livro mais valioso no topo e os demais descendo em ordem decrescente.</li>
  <li><strong>Agora é sua vez:</strong> Troque para <code>ORDER BY titulo ASC</code> e veja o alinhamento de A a Z.</li>
</ol>`,
            "SELECT titulo, preco FROM livros ORDER BY preco DESC;",
            c("Ordene a consulta da tabela livros por preco de forma decrescente usando ORDER BY preco DESC.", "SELECT * FROM livros ORDER BY ...;", "SELECT * FROM livros ORDER BY preco DESC;", "Use ORDER BY preco DESC;", "SELECT * FROM livros ORDER BY preco DESC;"),
            "SELECT titulo, preco, estoque \nFROM livros \nORDER BY preco DESC, titulo ASC;"),

          L('sql-2-6', "Paginação de Catálogo com LIMIT e OFFSET",
            `<h3>📄 As páginas do catálogo: LIMIT e OFFSET</h3>
<p>Como um site de livraria exibe apenas 5 livros por vez e avança para a página seguinte quando o leitor clica em "Próxima"?</p>

<ul>
  <li><code>LIMIT 3</code>: Quantidade máxima de registros retornados.</li>
  <li><code>OFFSET 3</code>: Quantidade de registros a pular antes de começar a entregar.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Paginação da Página 2</div>
  <code>SELECT * FROM livros ORDER BY id LIMIT 3 OFFSET 3;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Execute com <code>F5</code>.</li>
  <li><strong>O que esperar na tela:</strong> A fatia exata correspondente à página 2 do catálogo.</li>
  <li><strong>Agora é sua vez:</strong> Troque para <code>OFFSET 0</code> e comprove que ele devolve a página 1 inicial.</li>
</ol>`,
            "-- Página 1\nSELECT id, titulo FROM livros ORDER BY id LIMIT 3 OFFSET 0;\n\n-- Página 2\nSELECT id, titulo FROM livros ORDER BY id LIMIT 3 OFFSET 3;",
            c("Limite a consulta para retornar apenas os 10 primeiros registros com LIMIT 10.", "SELECT * FROM livros LIMIT ...;", "SELECT * FROM livros LIMIT 10;", "Adicione LIMIT 10 no final.", "SELECT * FROM livros LIMIT 10;"),
            "SELECT id, titulo, preco, estoque \nFROM livros \nORDER BY id ASC \nLIMIT 3 OFFSET 0;")
        ]
      },

      // ── Módulo 3 — Atualizações, Exclusões e Clientes ──
      {
        title: "Módulo 3 — Atualizações, Exclusões e Clientes",
        lessons: [
          L('sql-3-1', "Atualizando Preços e Estoque com UPDATE e WHERE",
            `<h3>🏷️ A etiquetadora de novos preços: UPDATE</h3>
<p>A inflação subiu ou a editora autorizou um desconto de 15% em determinado livro. Como alteramos dados já cadastrados em uma linha?</p>

<p>O comando <code>UPDATE tabela SET coluna = novo_valor WHERE condicao</code> atualiza os dados. NUNCA execute um UPDATE sem <code>WHERE</code>, senão todos os livros do banco receberiam o mesmo preço instantaneamente!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Atualizando preço com trava por ID</div>
  <code>UPDATE livros SET preco = 34.90 WHERE id = 1;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba <strong>Executar SQL</strong> do DB Browser for SQLite.</li>
  <li><strong>O código:</strong> Digite o <code>UPDATE</code> com a cláusula <code>WHERE id = 1</code>.</li>
  <li><strong>O que fazer depois:</strong> Pressione <code>F5</code> e clique no menu em <strong>Escrever Alterações (Ctrl+S)</strong>.</li>
  <li><strong>O que esperar:</strong> O livro #1 terá seu preço atualizado para 37.90 na hora.</li>
  <li><strong>Agora é sua vez:</strong> Consulte a tabela com <code>SELECT * FROM livros WHERE id = 1;</code> para confirmar o novo valor.</li>
</ol>`,
            "UPDATE livros \nSET preco = 45.00, estoque = estoque - 1 \nWHERE id = 1;",
            c("Escreva o comando UPDATE para alterar o preco para 29.90 na tabela livros onde id = 2.", "UPDATE livros SET ... WHERE ...;", "UPDATE livros SET preco = 29.90 WHERE id = 2;", "Use UPDATE livros SET preco = 29.90 WHERE id = 2;", "UPDATE livros SET preco = 29.90 WHERE id = 2;"),
            "UPDATE livros SET preco = 37.90 WHERE id = 1;\nUPDATE livros SET estoque = 25 WHERE id = 2;\nSELECT titulo, preco, estoque FROM livros WHERE id IN (1, 2);"),

          L('sql-3-2', "Excluindo Livros Descontinuados com DELETE e WHERE",
            `<h3>🗑️ A trituradora de papel: apagando registros com DELETE</h3>
<p>Um livro com direitos autorais expirados foi descontinuado e não será mais comercializado. Precisamos retirá-lo da nossa tabela.</p>

<p>O comando <code>DELETE FROM tabela WHERE condicao</code> remove a linha inteira. NUNCA rode <code>DELETE FROM livros</code> sem o <code>WHERE</code>, a menos que você queira apagar todo o acervo da loja!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Excluindo com segurança por ID</div>
  <code>DELETE FROM livros WHERE id = 4;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba Executar SQL do DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Digite o comando de exclusão com <code>WHERE id = 3</code>, execute com <code>F5</code> e salve com <em>Escrever Alterações</em>.</li>
  <li><strong>O que esperar:</strong> O livro #3 desaparecerá da tabela sem afetar nenhuma outra obra.</li>
  <li><strong>Agora é sua vez:</strong> Execute <code>SELECT * FROM livros;</code> e confira que o registro foi removido com sucesso.</li>
</ol>`,
            "DELETE FROM livros WHERE id = 99;",
            c("Escreva o comando DELETE FROM livros para excluir o registro com id = 5.", "DELETE FROM ... WHERE ...;", "DELETE FROM livros WHERE id = 5;", "Use DELETE FROM livros WHERE id = 5;", "DELETE FROM livros WHERE id = 5;"),
            "DELETE FROM livros WHERE id = 3;\nSELECT id, titulo FROM livros;"),

          L('sql-3-3', "A Tabela de Clientes da Livraria: clientes",
            `<h3>👥 O cadastro de leitores: modelando clientes</h3>
<p>Uma livraria vive de leitores fiéis que compram com frequência. Para registrar vendas, precisamos de uma tabela para guardar os dados dos compradores.</p>

<p>Criamos a tabela <code>clientes</code> contendo nome, e-mail (que deve ser único para login), telefone e a data em que a conta foi criada.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Criando a tabela de clientes</div>
  <code>CREATE TABLE clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba Executar SQL do DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Digite o <code>CREATE TABLE clientes</code> e pressione <code>F5</code>.</li>
  <li><strong>O que esperar:</strong> A tabela de clientes será criada e listada na aba "Estrutura do Banco".</li>
  <li><strong>Agora é sua vez:</strong> Verifique que a coluna <code>email</code> possui a trava <code>UNIQUE</code>.</li>
</ol>`,
            "CREATE TABLE clientes (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL,\n    email TEXT UNIQUE NOT NULL,\n    telefone TEXT,\n    data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP\n);",
            c("Crie a tabela clientes com as colunas id INTEGER PRIMARY KEY e nome TEXT NOT NULL.", "CREATE TABLE clientes (...);", "CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT NOT NULL);", "Use CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT NOT NULL);", "CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT NOT NULL);"),
            "CREATE TABLE clientes (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL,\n    email TEXT UNIQUE NOT NULL,\n    telefone TEXT,\n    criado_em TEXT DEFAULT CURRENT_TIMESTAMP\n);"),

          L('sql-3-4', "Cadastrando Clientes e Validando E-mails Únicos",
            `<h3>📬 A ficha de inscrição do leitor: inserindo clientes</h3>
<p>Quando um novo leitor se registra na loja virtual, o formulário dispara o comando de inserção. O banco confere na hora se o e-mail já existe na base.</p>

<p>Se você tentar inserir um e-mail repetido, o banco dispara uma exceção imediata de <em>UNIQUE constraint failed</em>, protegendo os dados.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Inserindo leitor na livraria</div>
  <code>INSERT INTO clientes (nome, email) VALUES ('Ana Clara', 'ana@email.com');</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba Executar SQL do DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Digite o <code>INSERT INTO clientes</code> e execute com <code>F5</code>. Salve com <code>Ctrl+S</code>.</li>
  <li><strong>O que esperar:</strong> Os 3 clientes cadastrados na base com sucesso.</li>
  <li><strong>Agora é sua vez:</strong> Tente inserir outro cliente com o mesmo e-mail <code>mariana@email.com</code> e comprove o bloqueio do SQLite.</li>
</ol>`,
            "INSERT INTO clientes (nome, email, telefone) VALUES\n('Carlos Drummond', 'drummond@letras.com.br', '11 98888-7777'),\n('Clarice Lispector', 'clarice@literatura.com', '21 97777-6666');",
            c("Insira na tabela clientes nome e email os valores (\"Lucas\", \"lucas@email.com\").", "INSERT INTO clientes (nome, email) VALUES (...);", "INSERT INTO clientes (nome, email) VALUES ('Lucas', 'lucas@email.com');", "Use INSERT INTO clientes (nome, email) VALUES ('Lucas', 'lucas@email.com');", "INSERT INTO clientes (nome, email) VALUES ('Lucas', 'lucas@email.com');"),
            "INSERT INTO clientes (nome, email, telefone) VALUES\n('Mariana Souza', 'mariana@email.com', '11 91234-5678'),\n('Roberto Almeida', 'roberto@email.com', '21 98765-4321'),\n('Fernanda Lima', 'fernanda@email.com', '31 99887-1122');\n\nSELECT id, nome, email FROM clientes;"),

          L('sql-3-5', "Transações: Tudo ou Nada com BEGIN, COMMIT e ROLLBACK",
            `<h3>⚖️ O contrato sagrado: Tudo ou Nada (Transações ACID)</h3>
<p>Imagine o seguinte pesadelo: o sistema dá baixa no estoque de um livro (-1), mas bem na hora de salvar o pagamento a energia do servidor cai! O livro sumiu do estoque, mas a venda não foi gravada.</p>

<p>Com <strong>Transações</strong>, abrimos com <code>BEGIN TRANSACTION</code>. Todas as operações seguintes só se tornam permanentes quando chegamos ao <code>COMMIT</code>. Se houver falha no caminho, executamos <code>ROLLBACK</code> e tudo volta a ser como era antes!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 O bloco transacional</div>
  <code>BEGIN TRANSACTION; ...operações... COMMIT;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba Executar SQL do DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Execute o bloco transacional com <code>F5</code>.</li>
  <li><strong>O que esperar:</strong> A baixa no estoque confirmada com consistência atômica total.</li>
  <li><strong>Agora é sua vez:</strong> Entenda por que bancos de dados são o padrão da indústria financeira.</li>
</ol>`,
            "BEGIN TRANSACTION;\nUPDATE livros SET estoque = estoque - 1 WHERE id = 1;\nCOMMIT;",
            c("Escreva o comando para iniciar uma transacao no banco.", "BEGIN ...;", "BEGIN TRANSACTION;", "Use BEGIN TRANSACTION;", "BEGIN TRANSACTION;"),
            "BEGIN TRANSACTION;\nUPDATE livros SET estoque = estoque - 1 WHERE id = 1 AND estoque > 0;\nCOMMIT;\nSELECT id, titulo, estoque FROM livros WHERE id = 1;")
        ]
      },

      // ── Módulo 4 — Relacionamentos e Consultas Complexas (JOINs) ──
      {
        title: "Módulo 4 — Relacionamentos e Consultas Complexas (JOINs)",
        lessons: [
          L('sql-4-1', "A Tabela de Pedidos e Itens do Pedido (N para N)",
            `<h3>🧾 A nota fiscal e os itens da cesta: relacionamento N para N</h3>
<p>Um cliente pode fazer vários pedidos ao longo do ano. E em um único pedido, ele pode comprar 3 livros diferentes. Como modelamos isso?</p>

<ul>
  <li><code>pedidos</code>: Guarda o cabeçalho da compra (id, cliente_id, data, status).</li>
  <li><code>itens_pedido</code>: Guarda cada livro colocado no carrinho (pedido_id, livro_id, quantidade, preco_unitario).</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Tabela associativa de itens</div>
  <code>CREATE TABLE itens_pedido (pedido_id INTEGER, livro_id INTEGER, quantidade INTEGER);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba Executar SQL do DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Execute a criação das duas tabelas com <code>F5</code> e salve com <code>Ctrl+S</code>.</li>
  <li><strong>O que esperar:</strong> O modelo completo de e-commerce da livraria estruturado com integridade referencial.</li>
  <li><strong>Agora é sua vez:</strong> Confira a amarração das chaves estrangeiras na estrutura.</li>
</ol>`,
            "CREATE TABLE pedidos (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    cliente_id INTEGER NOT NULL,\n    data_pedido TEXT DEFAULT CURRENT_TIMESTAMP,\n    status TEXT DEFAULT 'PENDENTE',\n    FOREIGN KEY (cliente_id) REFERENCES clientes(id)\n);\n\nCREATE TABLE itens_pedido (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    pedido_id INTEGER NOT NULL,\n    livro_id INTEGER NOT NULL,\n    quantidade INTEGER NOT NULL,\n    preco_unitario REAL NOT NULL,\n    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),\n    FOREIGN KEY (livro_id) REFERENCES livros(id)\n);",
            c("Crie a chave estrangeira pedido_id referenciando pedidos(id).", "FOREIGN KEY (pedido_id) REFERENCES ...", "FOREIGN KEY (pedido_id) REFERENCES pedidos(id)", "Use FOREIGN KEY (pedido_id) REFERENCES pedidos(id)", "FOREIGN KEY (pedido_id) REFERENCES pedidos(id)"),
            "CREATE TABLE pedidos (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    cliente_id INTEGER NOT NULL,\n    data_pedido TEXT DEFAULT CURRENT_TIMESTAMP,\n    status TEXT DEFAULT 'PAGO',\n    FOREIGN KEY (cliente_id) REFERENCES clientes(id)\n);\n\nCREATE TABLE itens_pedido (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    pedido_id INTEGER NOT NULL,\n    livro_id INTEGER NOT NULL,\n    quantidade INTEGER NOT NULL,\n    preco_unitario REAL NOT NULL,\n    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),\n    FOREIGN KEY (livro_id) REFERENCES livros(id)\n);"),

          L('sql-4-2', "Juntando Livros e Autores com INNER JOIN",
            `<h3>🧩 O encaixe do quebra-cabeça: INNER JOIN</h3>
<p>Se você fizer um <code>SELECT * FROM livros</code>, verá apenas <code>autor_id = 2</code>. Para o leitor na loja virtual, esse número não significa nada. Ele quer ver o nome real: "Isaac Asimov".</p>

<p>O <code>INNER JOIN</code> cruza as duas tabelas na memória através da chave comum com a cláusula <code>ON</code>, buscando apenas as linhas onde as chaves coincidem perfeitamente.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Cruzando livros e autores</div>
  <code>SELECT livros.titulo, autores.nome FROM livros INNER JOIN autores ON livros.autor_id = autores.id;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba Executar SQL.</li>
  <li><strong>O que fazer depois:</strong> Digite o <code>INNER JOIN</code> e tecle <code>F5</code>.</li>
  <li><strong>O que esperar na tela:</strong> Uma tabela combinada mostrando o título da obra ao lado do nome do autor por extenso!</li>
  <li><strong>Agora é sua vez:</strong> Adicione <code>ORDER BY l.titulo ASC</code> para listar em ordem alfabética.</li>
</ol>`,
            "SELECT \n    livros.titulo AS Livro,\n    autores.nome AS Autor,\n    livros.preco AS Preço\nFROM livros\nINNER JOIN autores ON livros.autor_id = autores.id;",
            c("Complete o JOIN ligando livros.autor_id com autores.id usando a clausula ON.", "INNER JOIN autores ON ...", "INNER JOIN autores ON livros.autor_id = autores.id", "Use INNER JOIN autores ON livros.autor_id = autores.id", "INNER JOIN autores ON livros.autor_id = autores.id"),
            "SELECT \n    l.id AS Codigo,\n    l.titulo AS Obra,\n    a.nome AS Escritor,\n    l.preco AS Valor\nFROM livros l\nINNER JOIN autores a ON l.autor_id = a.id\nORDER BY l.titulo ASC;"),

          L('sql-4-3', "Juntando Três Tabelas em uma Única Consulta (Livro + Autor + Categoria)",
            `<h3>🎪 O malabarismo triplo: conectando 3 tabelas de uma só vez</h3>
<p>Um catálogo completo precisa exibir de relance: o Título da obra, quem Escreveu e qual a Categoria do livro (ex: "Fundação" | "Isaac Asimov" | "Ficção Científica").</p>

<p>Para isso, encadeamos múltiplos <code>INNER JOIN</code> no mesmo comando, usando apelidos curtos (<code>l</code>, <code>a</code>, <code>c</code>) para deixar o código elegante.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Dois JOINs encadeados</div>
  <code>FROM livros l INNER JOIN autores a ON ... INNER JOIN categorias c ON ...</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Execute a consulta com <code>F5</code>.</li>
  <li><strong>O que esperar na tela:</strong> A ficha técnica completa de cada livro com autor e categoria.</li>
  <li><strong>Agora é sua vez:</strong> Filtre com <code>WHERE c.nome = 'Ficção Científica'</code> para ver apenas livros desse gênero.</li>
</ol>`,
            "SELECT \n    l.titulo AS Obra,\n    a.nome AS Autor,\n    c.nome AS Categoria,\n    l.preco AS Preco\nFROM livros l\nINNER JOIN autores a ON l.autor_id = a.id\nINNER JOIN categorias c ON l.categoria_id = c.id;",
            c("Junte a tabela categorias c com a chave l.categoria_id = c.id usando INNER JOIN.", "INNER JOIN categorias c ON ...", "INNER JOIN categorias c ON l.categoria_id = c.id", "Use INNER JOIN categorias c ON l.categoria_id = c.id", "INNER JOIN categorias c ON l.categoria_id = c.id"),
            "SELECT \n    l.titulo AS Titulo,\n    a.nome AS Autor,\n    c.nome AS Genero,\n    l.preco AS PrecoUnitario,\n    l.estoque AS Disponivel\nFROM livros l\nINNER JOIN autores a ON l.autor_id = a.id\nINNER JOIN categorias c ON l.categoria_id = c.id;"),

          L('sql-4-4', "Entendendo LEFT JOIN: Encontrando Autores sem Livros",
            `<h3>👈 A mão esquerda que não larga ninguém: LEFT JOIN</h3>
<p>O que acontece se a livraria cadastrou um autor novo que ainda não teve nenhum livro publicado? O <code>INNER JOIN</code> simplesmente ignoraria esse autor e ele sumiria da lista.</p>

<p>O <code>LEFT JOIN</code> preserva TODOS os registros da tabela da esquerda (a primeira). Se não houver nenhum livro na direita, o banco preenche com <code>NULL</code>!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Encontrando dados órfãos</div>
  <code>SELECT * FROM autores a LEFT JOIN livros l ON a.id = l.autor_id WHERE l.id IS NULL;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba Executar SQL.</li>
  <li><strong>O que fazer depois:</strong> Execute com <code>F5</code>.</li>
  <li><strong>O que esperar na tela:</strong> A lista completa de autores, incluindo aqueles com <code>NULL</code> na coluna de livro.</li>
  <li><strong>Agora é sua vez:</strong> Adicione a cláusula <code>WHERE l.id IS NULL</code> para auditar quais autores estão sem livros cadastrados.</li>
</ol>`,
            "SELECT \n    a.nome AS Autor,\n    l.titulo AS LivroPublicado\nFROM autores a\nLEFT JOIN livros l ON a.id = l.autor_id;",
            c("Escreva um LEFT JOIN da tabela livros l com autores a pela chave a.id = l.autor_id.", "FROM autores a LEFT JOIN ...", "FROM autores a LEFT JOIN livros l ON a.id = l.autor_id", "Use FROM autores a LEFT JOIN livros l ON a.id = l.autor_id", "FROM autores a LEFT JOIN livros l ON a.id = l.autor_id"),
            "SELECT \n    a.id,\n    a.nome AS AutorSemLivro\nFROM autores a\nLEFT JOIN livros l ON a.id = l.autor_id\nWHERE l.id IS NULL;"),

          L('sql-4-5', "Registrando Vendas Reais com Pedidos e Itens",
            `<h3>💰 O som da caixa registradora: fechando uma venda</h3>
<p>Chegou a hora de simular uma venda real na livraria. O cliente comprou livros e gerou um novo número de pedido.</p>

<p>Primeiro inserimos a linha mestre em <code>pedidos</code>. Em seguida, inserimos os produtos na tabela <code>itens_pedido</code> com a quantidade e o preço unitário congelado daquela data.</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Gravando a cesta de compras</div>
  <code>INSERT INTO itens_pedido (pedido_id, livro_id, quantidade, preco_unitario) VALUES (1, 1, 2, 39.90);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba Executar SQL do DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Execute as inserções de pedidos e itens e salve com <code>Ctrl+S</code>.</li>
  <li><strong>O que esperar:</strong> Vendas gravadas com histórico permanente.</li>
  <li><strong>Agora é sua vez:</strong> Consulte <code>SELECT * FROM pedidos;</code> para ver a lista de vendas ativas.</li>
</ol>`,
            "INSERT INTO pedidos (cliente_id, status) VALUES (1, 'CONCLUIDO');\nINSERT INTO itens_pedido (pedido_id, livro_id, quantidade, preco_unitario) VALUES\n(1, 1, 2, 39.90),\n(1, 2, 1, 64.90);",
            c("Insira na tabela pedidos na coluna cliente_id o valor 2.", "INSERT INTO pedidos (cliente_id) VALUES (...);", "INSERT INTO pedidos (cliente_id) VALUES (2);", "Use INSERT INTO pedidos (cliente_id) VALUES (2);", "INSERT INTO pedidos (cliente_id) VALUES (2);"),
            "INSERT INTO pedidos (cliente_id, status) VALUES (1, 'CONCLUIDO');\nINSERT INTO itens_pedido (pedido_id, livro_id, quantidade, preco_unitario) VALUES (1, 1, 1, 37.90);\n\nINSERT INTO pedidos (cliente_id, status) VALUES (2, 'CONCLUIDO');\nINSERT INTO itens_pedido (pedido_id, livro_id, quantidade, preco_unitario) VALUES (2, 2, 2, 52.90);\n\nSELECT * FROM pedidos;"),

          L('sql-4-6', "A Grande Consulta: Pedidos, Clientes e Livros Comprados",
            `<h3>🏆 O mapa completo da mina: o relatório executivo de vendas</h3>
<p>O diretor da livraria quer ver: o Número do Pedido, o Nome do Cliente, o Título de cada Livro comprado, a Quantidade e o Subtotal financeiro daquela linha.</p>

<p>Aqui você conecta 4 tabelas em um único comando sincronizado (<code>pedidos</code> &rarr; <code>clientes</code> &rarr; <code>itens_pedido</code> &rarr; <code>livros</code>), multiplicando quantidade por preço unitário!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Calculando o subtotal no SELECT</div>
  <code>(ip.quantidade * ip.preco_unitario) AS Subtotal</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba Executar SQL do DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Digite a grande consulta de 4 tabelas e pressione <code>F5</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>NumPedido | NomeCliente   | TituloComprado                | Qtd | SubtotalLinha
1         | Mariana Souza | Memórias Póstumas de Brás Cubas| 1   | 37.90
2         | Roberto Almeida| O Fim da Eternidade          | 2   | 105.80</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Veja a precisão de um relatório comercial de alta classe gerado em puro SQL!</li>
</ol>`,
            "SELECT \n    p.id AS 'Pedido Nº',\n    c.nome AS Cliente,\n    l.titulo AS Livro,\n    ip.quantidade AS Qtd,\n    ip.preco_unitario AS Unitario,\n    (ip.quantidade * ip.preco_unitario) AS Subtotal\nFROM pedidos p\nINNER JOIN clientes c ON p.cliente_id = c.id\nINNER JOIN itens_pedido ip ON p.id = ip.pedido_id\nINNER JOIN livros l ON ip.livro_id = l.id;",
            c("Calcule o total multiplicando (ip.quantidade * ip.preco_unitario) AS Total.", "(ip.quantidade * ip.preco_unitario) AS ...", "(ip.quantidade * ip.preco_unitario) AS Total", "Use (ip.quantidade * ip.preco_unitario) AS Total", "(ip.quantidade * ip.preco_unitario) AS Total"),
            "SELECT \n    p.id AS NumPedido,\n    c.nome AS NomeCliente,\n    l.titulo AS TituloComprado,\n    ip.quantidade AS Qtd,\n    (ip.quantidade * ip.preco_unitario) AS SubtotalLinha\nFROM pedidos p\nINNER JOIN clientes c ON p.cliente_id = c.id\nINNER JOIN itens_pedido ip ON p.id = ip.pedido_id\nINNER JOIN livros l ON ip.livro_id = l.id\nORDER BY p.id ASC;")
        ]
      },

      // ── Módulo 5 — Agregações, Faturamento e Estatísticas Financeiras ──
      {
        title: "Módulo 5 — Agregações, Faturamento e Estatísticas Financeiras",
        lessons: [
          L('sql-5-1', "Funções de Agregação: COUNT, SUM, AVG, MIN e MAX",
            `<h3>🧮 A calculadora executiva: agregando milhares de linhas</h3>
<p>Nenhum diretor quer ler 10.000 linhas uma por uma para saber o faturamento da livraria. Ele quer saber: qual é o Total de Livros? Qual o Preço Médio? Qual o exemplar mais caro e o mais barato?</p>

<p>As <strong>Funções de Agregação</strong> condensam milhares de linhas em uma resposta estatística instantânea:</p>
<ul>
  <li><code>COUNT(*)</code>: Conta a quantidade total de registros.</li>
  <li><code>SUM(coluna)</code>: Soma todos os valores numéricos da coluna.</li>
  <li><code>AVG(coluna)</code>: Calcula a média aritmética exata.</li>
  <li><code>MIN()</code> / <code>MAX()</code>: Devolve o menor e o maior valor encontrado.</li>
</ul>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Agregações no SELECT</div>
  <code>SELECT COUNT(*), AVG(preco), MAX(preco) FROM livros;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba <strong>Executar SQL</strong> do DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Digite a consulta e tecle <code>F5</code>.</li>
  <li><strong>O que esperar na tela:</strong> Uma única linha com os 5 indicadores matemáticos calculados pelo banco!</li>
  <li><strong>Agora é sua vez:</strong> Experimente usar <code>ROUND(AVG(preco), 2)</code> para arredondar a média para 2 casas decimais.</li>
</ol>`,
            "SELECT \n    COUNT(*) AS TotalObras,\n    ROUND(AVG(preco), 2) AS PrecoMedio,\n    MIN(preco) AS LivroMaisBarato,\n    MAX(preco) AS LivroMaisCaro\nFROM livros;",
            c("Escreva uma consulta que conte todos os registros da tabela livros usando COUNT(*).", "SELECT COUNT(...) FROM livros;", "SELECT COUNT(*) FROM livros;", "Use SELECT COUNT(*) FROM livros;", "SELECT COUNT(*) FROM livros;"),
            "SELECT \n    COUNT(*) AS TotalDeTitulos,\n    SUM(estoque) AS TotalExemplaresFisicos,\n    ROUND(AVG(preco), 2) AS PrecoMedioUnitario,\n    MIN(preco) AS MenorValor,\n    MAX(preco) AS MaiorValor\nFROM livros;"),

          L('sql-5-2', "Faturamento por Categoria com GROUP BY e SUM",
            `<h3>📂 O separador de moedas: agrupando com GROUP BY</h3>
<p>Saber o faturamento total é ótimo, mas como o gerente sabe qual setor está dando mais lucro: Ficção Científica ou Literatura Clássica?</p>

<p>A cláusula <code>GROUP BY</code> pega todas as linhas e as separa em grupos de acordo com a coluna escolhida. Em seguida, a função de soma <code>SUM()</code> é calculada para cada grupo individualmente!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Agrupando faturamento por categoria</div>
  <code>SELECT c.nome, SUM(l.estoque * l.preco) FROM categorias c INNER JOIN livros l ON ... GROUP BY c.id;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> No DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Execute a consulta com <code>F5</code>.</li>
  <li><strong>O que esperar na tela:</strong> Cada categoria em uma linha separada acompanhada de seu total de livros e valor financeiro.</li>
  <li><strong>Agora é sua vez:</strong> Adicione <code>ORDER BY TotalLivros DESC</code> para ver as categorias líderes no topo.</li>
</ol>`,
            "SELECT \n    c.nome AS Categoria,\n    COUNT(l.id) AS QuantidadeTitulos,\n    SUM(l.estoque * l.preco) AS ValorTotalEstoque\nFROM categorias c\nINNER JOIN livros l ON c.id = l.categoria_id\nGROUP BY c.id;",
            c("Escreva a clausula GROUP BY categoria_id no final da consulta.", "SELECT categoria_id, COUNT(*) FROM livros ...", "SELECT categoria_id, COUNT(*) FROM livros GROUP BY categoria_id;", "Use GROUP BY categoria_id;", "SELECT categoria_id, COUNT(*) FROM livros GROUP BY categoria_id;"),
            "SELECT \n    c.nome AS Genero,\n    COUNT(l.id) AS TotalLivros,\n    SUM(l.estoque) AS EstoqueDisponivel,\n    ROUND(AVG(l.preco), 2) AS MediaPreco\nFROM categorias c\nINNER JOIN livros l ON c.id = l.categoria_id\nGROUP BY c.id\nORDER BY TotalLivros DESC;"),

          L('sql-5-3', "Filtrando Grupos Agregados com HAVING",
            `<h3>🎯 O filtro do filtro: por que não usamos WHERE para totais</h3>
<p>Se você quiser listar apenas as categorias que possuem mais de 10 livros cadastrados, escrever <code>WHERE COUNT(*) &gt; 10</code> dispara um erro de sintaxe.</p>

<p>Por que isso acontece? O <code>WHERE</code> filtra linhas soltas <em>antes</em> do agrupamento. Para filtrar grupos calculados <em>depois</em> do agrupamento, nós usamos a cláusula <strong>HAVING</strong>!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Filtrando grupos com HAVING</div>
  <code>GROUP BY c.id HAVING COUNT(l.id) &gt;= 2;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba Executar SQL.</li>
  <li><strong>O que fazer depois:</strong> Execute com <code>F5</code>.</li>
  <li><strong>O que esperar na tela:</strong> Apenas os grupos que atendem ao critério numérico do <code>HAVING</code>.</li>
  <li><strong>Agora é sua vez:</strong> Mude o filtro para <code>HAVING SUM(l.estoque) &gt;= 15</code> e veja as categorias com grande estoque.</li>
</ol>`,
            "SELECT \n    c.nome AS Categoria,\n    COUNT(l.id) AS TotalObras\nFROM categorias c\nINNER JOIN livros l ON c.id = l.categoria_id\nGROUP BY c.id\nHAVING COUNT(l.id) >= 2;",
            c("Adicione a clausula HAVING COUNT(*) > 5 apos o GROUP BY.", "GROUP BY categoria_id ...", "GROUP BY categoria_id HAVING COUNT(*) > 5;", "Use HAVING COUNT(*) > 5;", "GROUP BY categoria_id HAVING COUNT(*) > 5;"),
            "SELECT \n    c.nome AS Genero,\n    SUM(l.estoque) AS TotalExemplares\nFROM categorias c\nINNER JOIN livros l ON c.id = l.categoria_id\nGROUP BY c.id\nHAVING SUM(l.estoque) >= 15;")
        ]
      },

      // ── Módulo 6 — Visões (VIEWS), Índices e Conclusão ──
      {
        title: "Módulo 6 — Visões (VIEWS), Índices e Conclusão",
        lessons: [
          L('sql-6-1', "Criando Consultas Reutilizáveis com VIEWS (Visões)",
            `<h3>🔭 A janela panorâmica: consultas salvas com CREATE VIEW</h3>
<p>Imagine ter que digitar uma consulta gigante com 4 <code>INNER JOIN</code> toda vez que a diretoria pedir um relatório. Seria cansativo e sujeito a erros de digitação.</p>

<p>Uma <strong>VIEW</strong> é como um atalho permanente salvo no banco. Ela guarda a consulta com um nome limpo. Sempre que você fizer <code>SELECT * FROM vw_relatorio_vendas</code>, o banco roda a consulta complexa na velocidade da luz!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Criando uma visão permanente</div>
  <code>CREATE VIEW vw_catalogo_completo AS SELECT ...;</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba Executar SQL do DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Crie a view com <code>F5</code> e depois rode: <code>SELECT * FROM vw_vendas_consolidadas;</code>.</li>
  <li><strong>O que esperar na tela:</strong> O relatório consolidado imediato, como se fosse uma tabela física pronta!</li>
  <li><strong>Agora é sua vez:</strong> Veja a nova View listada na aba "Estrutura do Banco de Dados".</li>
</ol>`,
            "CREATE VIEW vw_catalogo_completo AS\nSELECT \n    l.id AS livro_id,\n    l.titulo,\n    a.nome AS autor,\n    c.nome AS categoria,\n    l.preco,\n    l.estoque\nFROM livros l\nINNER JOIN autores a ON l.autor_id = a.id\nINNER JOIN categorias c ON l.categoria_id = c.id;",
            c("Crie uma view chamada vw_livros_baratos para livros com preco < 40.", "CREATE VIEW vw_livros_baratos AS SELECT * FROM livros WHERE ...;", "CREATE VIEW vw_livros_baratos AS SELECT * FROM livros WHERE preco < 40;", "Use preco < 40 no final.", "CREATE VIEW vw_livros_baratos AS SELECT * FROM livros WHERE preco < 40;"),
            "CREATE VIEW vw_vendas_consolidadas AS\nSELECT \n    p.id AS pedido_id,\n    c.nome AS cliente,\n    l.titulo AS livro,\n    ip.quantidade,\n    ip.preco_unitario,\n    (ip.quantidade * ip.preco_unitario) AS subtotal\nFROM pedidos p\nINNER JOIN clientes c ON p.cliente_id = c.id\nINNER JOIN itens_pedido ip ON p.id = ip.pedido_id\nINNER JOIN livros l ON ip.livro_id = l.id;\n\nSELECT * FROM vw_vendas_consolidadas;"),

          L('sql-6-2', "Acelerando Consultas em Milhões de Linhas com CREATE INDEX",
            `<h3>📚 O índice remissivo no final do livro: CREATE INDEX</h3>
<p>Se você abrir um dicionário de 2.000 páginas procurando uma palavra sem abas alfabéticas, terá que folhear as 2.000 páginas uma a uma (isso se chama <em>Full Table Scan</em>).</p>

<p>Um <strong>INDEX</strong> cria uma árvore binária de busca rápida na memória. Uma busca por título que demoraria 4 segundos passa a responder em 0,001 segundo!</p>

<div class="command-spotlight">
  <div class="command-spotlight-title">🔑 Criando índice na coluna título</div>
  <code>CREATE INDEX idx_livros_titulo ON livros(titulo);</code>
</div>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba Executar SQL.</li>
  <li><strong>O que fazer depois:</strong> Crie os índices com <code>F5</code> e salve com <code>Ctrl+S</code>.</li>
  <li><strong>O que esperar:</strong> Os índices serão construídos e listados na aba "Estrutura do Banco".</li>
  <li><strong>Agora é sua vez:</strong> Suas consultas com <code>WHERE titulo LIKE ...</code> agora respondem em tempo recorde!</li>
</ol>`,
            "CREATE INDEX idx_livros_titulo ON livros(titulo);\nCREATE INDEX idx_clientes_email ON clientes(email);\nCREATE INDEX idx_pedidos_cliente ON pedidos(cliente_id);",
            c("Crie um indice chamado idx_preco na tabela livros na coluna preco.", "CREATE INDEX idx_preco ON ...;", "CREATE INDEX idx_preco ON livros(preco);", "Use CREATE INDEX idx_preco ON livros(preco);", "CREATE INDEX idx_preco ON livros(preco);"),
            "CREATE INDEX idx_livros_preco ON livros(preco);\nCREATE INDEX idx_autores_nome ON autores(nome);\nSELECT * FROM livros WHERE preco > 40.00;"),

          L('sql-6-3', "Conclusão da Livraria Online e Emissão de Certificado",
            `<h3>🎓 O selo de mestre em dados: você dominou o SQL Relacional!</h3>
<p>Parabéns, desenvolvedor! Você projetou e implementou um banco de dados relacional completo do zero para uma grande Livraria Online. Você dominou a criação de esquemas com chaves primárias e estrangeiras, inserções em lote, filtros refinados, junções complexas com <code>INNER JOIN</code> e <code>LEFT JOIN</code>, relatórios com <code>GROUP BY</code> e <code>HAVING</code>, transações seguras e visões virtuais.</p>

<p>O SQL é a linguagem universal dos dados. Com essa bagagem prática, você está apto a trabalhar com PostgreSQL, MySQL, SQLite, Oracle ou SQL Server em qualquer empresa de tecnologia do mundo.</p>

<p>Seu certificado de conclusão do curso de SQL da plataforma Edev já está emitido na sua aba de Certificados!</p>

<h3>🛠️ Mão na massa</h3>
<ol>
  <li><strong>Onde escrever:</strong> Na aba Executar SQL do DB Browser.</li>
  <li><strong>O que fazer depois:</strong> Execute a grande consulta de encerramento consolidando todo o acervo da livraria com <code>F5</code>.</li>
  <li><strong>O que esperar na tela:</strong>
    <pre><code>Sistema             | TotalLivros | TotalAutores | TotalClientes | TotalVendasRealizadas
Livraria Edev Online| 7           | 3            | 3             | 2</code></pre>
  </li>
  <li><strong>Agora é sua vez:</strong> Comemore o domínio completo do banco de dados relacional!</li>
</ol>`,
            "-- === BANCO DE DADOS DA LIVRARIA ONLINE COMPLETO E HOMOLOGADO ===\n-- Esquema relacional, integridade referencial, consultas, visões e índices prontos!",
            c("Realize a consulta final de celebracao selecionando \"Certificado SQL Edev Conquistado!\" com AS status.", "SELECT \"Certificado SQL Edev Conquistado!\" AS ...;", "SELECT 'Certificado SQL Edev Conquistado!' AS status;", "Use SELECT 'Certificado SQL Edev Conquistado!' AS status;", "SELECT 'Certificado SQL Edev Conquistado!' AS status;"),
            "SELECT \n    'Livraria Edev Online' AS Sistema,\n    COUNT(DISTINCT l.id) AS TotalLivros,\n    COUNT(DISTINCT a.id) AS TotalAutores,\n    COUNT(DISTINCT c.id) AS TotalClientes,\n    COUNT(DISTINCT p.id) AS TotalVendasRealizadas\nFROM livros l, autores a, clientes c, pedidos p;")
        ]
      }
    ]
  }
};
