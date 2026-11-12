/**
 * data/orientador.js
 * Perguntas, opções e motor de recomendação do Orientador de Estudos da Edev.
 * Baseado estritamente nos cursos reais da plataforma:
 * - logica: Lógica de Programação (Lógica + Python) [45h]
 * - frontend: Front-end Completo (HTML + CSS + JS) [40h]
 * - python: Python — Lógica de Programação [30h]
 * - java: Java Completo: Do Zero ao Profissional [45h]
 * - cpp: C++ Moderno: Do Zero à Alta Performance [45h]
 * - php: PHP Moderno: Da Web Dinâmica ao Banco de Dados [40h]
 * - sql: Banco de Dados do Zero: SQL na Prática [40h]
 */

import { COURSES } from './cursos.js';

export const ORIENTADOR_QUESTIONS = [
  {
    id: 'level',
    number: 1,
    title: 'Qual é o seu nível atual de conhecimento em programação?',
    subtitle: 'Isso nos ajuda a calibrar por onde começar para garantir um aprendizado sem frustrações.',
    options: [
      {
        id: 'nunca',
        label: 'Nunca programei.',
        desc: 'Vou começar do absoluto zero e quero uma introdução clara, visual e amigável.',
        icon: '🌱'
      },
      {
        id: 'iniciante',
        label: 'Sou iniciante.',
        desc: 'Já vi alguns vídeos ou li artigos, mas ainda não criei projetos próprios.',
        icon: '🐣'
      },
      {
        id: 'conceitos',
        label: 'Já conheço alguns conceitos.',
        desc: 'Entendo variáveis, condições e loops e quero aprofundar minha base técnica.',
        icon: '💡'
      },
      {
        id: 'experiente',
        label: 'Tenho experiência e quero aprender novas tecnologias.',
        desc: 'Já programo em alguma linguagem e busco expandir meu repertório técnico.',
        icon: '🚀'
      }
    ]
  },
  {
    id: 'goal',
    number: 2,
    title: 'Qual é o seu principal objetivo?',
    subtitle: 'Seu foco define a prioridade de quais projetos e competências você deve priorizar.',
    options: [
      {
        id: 'emprego',
        label: 'Conseguir meu primeiro emprego na área.',
        desc: 'Construir portfólio prático, dominar tecnologias requisitadas e conquistar minha vaga.',
        icon: '💼'
      },
      {
        id: 'hobby',
        label: 'Aprender programação por hobby.',
        desc: 'Explorar a tecnologia por curiosidade intelectual e diversão sem pressão.',
        icon: '🎮'
      },
      {
        id: 'projetos',
        label: 'Desenvolver meus próprios projetos.',
        desc: 'Criar meus próprios sites, automações, softwares ou protótipos de negócios.',
        icon: '🛠️'
      },
      {
        id: 'faculdade',
        label: 'Melhorar meus conhecimentos para a faculdade.',
        desc: 'Garantir boas notas e absorver de verdade a lógica e disciplinas do curso técnico/superior.',
        icon: '🎓'
      },
      {
        id: 'transicao',
        label: 'Mudar de carreira.',
        desc: 'Migrar de outra profissão para a área de tecnologia com foco e segurança.',
        icon: '🔄'
      }
    ]
  },
  {
    id: 'interest',
    number: 3,
    title: 'Qual área ou tecnologia mais desperta seu interesse?',
    subtitle: 'Escolha a tecnologia com a qual você mais se identifica ou solicite uma recomendação da Edev.',
    options: [
      {
        id: 'logica',
        label: 'Lógica de Programação',
        desc: 'Construa a base sólida de raciocínio, algoritmos e desenvolva o RPG Crônicas de Eldória do zero com Python.',
        icon: '⚔️'
      },
      {
        id: 'frontend',
        label: 'Desenvolvimento Front-end',
        desc: 'Criação de sites modernos, portfólios visuais com HTML, CSS e JavaScript.',
        icon: '🎨'
      },
      {
        id: 'python',
        label: 'Python',
        desc: 'Lógica amigável, automações, scripts e manipulação prática de dados.',
        icon: '🐍'
      },
      {
        id: 'java',
        label: 'Java',
        desc: 'Aplicações corporativas sólidas, Orientação a Objetos e estruturas robustas.',
        icon: '☕'
      },
      {
        id: 'cpp',
        label: 'C++',
        desc: 'Alta performance, ponteiros, gerenciamento de memória e motores de jogos.',
        icon: '⚡'
      },
      {
        id: 'php',
        label: 'PHP',
        desc: 'Desenvolvimento web back-end dinâmico, processamento seguro e conexão com banco.',
        icon: '🐘'
      },
      {
        id: 'sql',
        label: 'SQL',
        desc: 'Bancos de dados relacionais, modelagem, consultas SELECT complexas e integridade.',
        icon: '🗄️'
      },
      {
        id: 'recomendacao',
        label: 'Ainda não sei e gostaria de uma recomendação.',
        desc: 'Avaliamos seu nível e objetivo para traçar a rota mais recomendada para você.',
        icon: '🧭'
      }
    ]
  },
  {
    id: 'time',
    number: 4,
    title: 'Quanto tempo você pretende dedicar aos estudos?',
    subtitle: 'Constância é o segredo da programação. Adaptamos o ritmo à sua rotina real.',
    options: [
      {
        id: '30min',
        label: 'Até 30 minutos por dia.',
        desc: 'Foco em pequenas doses diárias de consistência sem sobrecarregar sua rotina.',
        icon: '⏱️'
      },
      {
        id: '1h',
        label: 'Entre 30 minutos e 1 hora.',
        desc: 'Ritmo equilibrado para absorver a teoria e praticar os exercícios interativos.',
        icon: '⏳'
      },
      {
        id: '2h',
        label: 'Entre 1 e 2 horas.',
        desc: 'Avanço dinâmico permitindo concluir módulos e projetos com agilidade.',
        icon: '⚡'
      },
      {
        id: 'mais2h',
        label: 'Mais de 2 horas.',
        desc: 'Imersão intensiva para aceleração rápida de carreira ou transição profissional.',
        icon: '🔥'
      }
    ]
  }
];

/**
 * Mapeia tempo selecionado em estimativa semanal e conselho pedagógico
 */
export function getPacingDetails(timeId) {
  switch (timeId) {
    case '30min':
      return {
        daily: 'Até 30 minutos/dia',
        weekly: '~3,5 horas/semana',
        paceLabel: 'Ritmo Consistente & Sustentável',
        tip: 'A constância supera a intensidade! Foque em completar 1 lição ou desafio prático por dia. Em poucos meses você construirá uma base técnica sólida sem cansaço mental.'
      };
    case '1h':
      return {
        daily: '30 a 60 minutos/dia',
        weekly: '~4 a 7 horas/semana',
        paceLabel: 'Ritmo Equilibrado (Recomendado)',
        tip: 'Tempo ideal para fixação: você conseguirá ler o conteúdo teórico com calma e resolver os desafios de código e quizzes sem pressa, completando cerca de 1 a 2 aulas por sessão.'
      };
    case '2h':
      return {
        daily: '1 a 2 horas/dia',
        weekly: '~7 a 14 horas/semana',
        paceLabel: 'Ritmo Acelerado',
        tip: 'Excelente dedicação! Permite cobrir módulos completos e ainda praticar no Playground criando seus próprios testes e experimentos para consolidar cada conceito.'
      };
    case 'mais2h':
      return {
        daily: 'Mais de 2 horas/dia',
        weekly: '14+ horas/semana',
        paceLabel: 'Imersão Total',
        tip: 'Dedicação de alta intensidade! Ideal para quem busca recolocação ou transição rápida. Dica de ouro: faça pausas de 10 minutos a cada hora para descanso e melhor retenção da memória.'
      };
    default:
      return {
        daily: 'Flexível',
        weekly: 'Personalizado',
        paceLabel: 'Ritmo Flexível',
        tip: 'Adapte o estudo aos seus melhores horários. O segredo é nunca passar mais de dois dias sem abrir um editor de código!'
      };
  }
}

/**
 * Gera a trilha personalizada utilizando EXCLUSIVAMENTE os cursos existentes na Edev.
 * @param {object} answers { level, goal, interest, time }
 * @returns {object} Trilha detalhada com justificativas pedagógicas
 */
export function generateRecommendations(answers = {}) {
  const level = answers.level || 'nunca';
  const goal = answers.goal || 'emprego';
  const interest = answers.interest || 'recomendacao';
  const time = answers.time || '1h';

  const pacing = getPacingDetails(time);

  let trackName = 'Trilha Personalizada Edev';
  let overview = '';
  let sequence = []; // array of { id, role, why, learn }

  // 0. Caso de interesse específico: Lógica de Programação
  if (interest === 'logica') {
    trackName = 'Trilha Mestre em Lógica de Programação & Algoritmos';
    overview = 'Dominar a lógica de programação é o superpoder fundamental que destrava qualquer linguagem. Você aprenderá a pensar como desenvolvedor construindo o RPG Crônicas de Eldória do zero com Python.';

    sequence.push({
      id: 'logica',
      role: 'Passo 1 • Raciocínio Algorítmico & Projeto Eldória',
      why: 'O curso de Lógica de Programação da Edev constrói um RPG completo no terminal, cobrindo desde variáveis e decisões até laços de batalha, inventário e funções modulares.',
      learn: [
        'Pensamento computacional e estruturação de algoritmos',
        'Variáveis, tipos de dados e controle de fluxo com if/elif/else',
        'Estruturas de repetição (while/for), listas e inventário dinâmico',
        'Modularização com funções e desenvolvimento do jogo completo no terminal'
      ]
    });

    sequence.push({
      id: 'python',
      role: 'Passo 2 • Aprofundamento em Python & Automação',
      why: 'Com a base lógica consolidada, avance para criar automações, manipulação de arquivos permanentes em JSON e sistemas de dados.',
      learn: [
        'Estruturação avançada de software e persistência de dados',
        'Validação robusta e boas práticas de código limpo',
        'Projeto completo: Gerenciador de Tarefas profissional'
      ]
    });

    if (goal === 'emprego' || goal === 'transicao' || goal === 'projetos') {
      sequence.push({
        id: 'frontend',
        role: 'Passo 3 • Interfaces Visuais na Web & Portfólio',
        why: 'Leve suas criações para o navegador construindo páginas modernas e um Portfólio Pessoal completo para apresentar aos recrutadores.',
        learn: [
          'HTML semântico e CSS responsivo para qualquer tela',
          'Interatividade com JavaScript no navegador',
          'Deploy de portfólio profissional'
        ]
      });
    }
  }

  // 1. Caso de interesse específico: Front-end
  else if (interest === 'frontend') {
    trackName = 'Trilha Especialista Front-end & Web';
    overview = level === 'nunca'
      ? 'Como você está começando do zero, o Front-end é a porta de entrada mais amigável: você constrói elementos visuais desde o primeiro minuto e vê seu trabalho ganhar vida no navegador.'
      : 'Aperfeiçoe suas habilidades de criação de interfaces modernas, estruturação semântica e interatividade avançada com JavaScript.';

    sequence.push({
      id: 'frontend',
      role: 'Passo 1 • Fundamentos e Interface Visual',
      why: 'É o alicerce essencial da web. Você aprende HTML semântico, estilização com CSS moderno e programação dinâmica com JavaScript nativo.',
      learn: [
        'Construção de páginas responsivas para computador e celular',
        'Estilização moderna com Flexbox, Grid e animações',
        'Interatividade com JavaScript e manipulação do DOM',
        'Criação de um Portfólio Pessoal completo do zero ao deploy'
      ]
    });

    sequence.push({
      id: 'sql',
      role: 'Passo 2 • Persistência de Dados e Consultas',
      why: 'Todo desenvolvedor front-end de alto nível precisa entender como os dados chegam do servidor. SQL ensina a organizar e consultar tabelas relacionais.',
      learn: [
        'Modelagem de banco de dados relacional',
        'Consultas precisas com SELECT, WHERE, filtros e ordenações',
        'Relacionamentos entre tabelas e operações com JOINs'
      ]
    });

    if (goal === 'emprego' || goal === 'transicao' || goal === 'projetos') {
      sequence.push({
        id: 'php',
        role: 'Passo 3 • Conexão com o Back-end Dinâmico',
        why: 'Para se tornar um desenvolvedor web completo, entender como o servidor processa dados de formulários e autentica usuários eleva seu nível para Full Stack.',
        learn: [
          'Integração entre formulários HTML e o servidor PHP',
          'Sessões de usuário, login seguro e proteção contra vulnerabilidades',
          'Conexão do PHP com banco MySQL via PDO para criar um blog dinâmico'
        ]
      });
    }
  }

  // 2. Caso de interesse específico: Python
  else if (interest === 'python') {
    trackName = 'Trilha Especialista Python & Automação';
    overview = 'Python é amplamente reconhecida como a linguagem ideal para dominar lógica de programação: sua sintaxe limpa permite focar no raciocínio sem barreiras desnecessárias.';

    sequence.push({
      id: 'python',
      role: 'Passo 1 • Raciocínio Lógico e Algoritmos',
      why: 'Ensina os conceitos primordiais que acompanham você em qualquer carreira tecnológica: variáveis, condicionais, loops, listas e funções estruturadas.',
      learn: [
        'Lógica de programação com sintaxe simples e intuitiva',
        'Manipulação de listas, dicionários e laços de repetição',
        'Modularização com funções e tratamento de erros',
        'Projeto completo: Gerenciador de Tarefas no terminal'
      ]
    });

    sequence.push({
      id: 'sql',
      role: 'Passo 2 • Armazenamento e Consulta de Dados',
      why: 'Python e Bancos de Dados são parceiros inseparáveis em automações, relatórios e sistemas modernos. SQL ensina a guardar e extrair informações com segurança.',
      learn: [
        'Criação de tabelas e definição de tipos de dados',
        'Consultas analíticas, agregações e filtros inteligentes',
        'Integridade referencial para ligar registros com segurança'
      ]
    });

    if (goal === 'projetos' || goal === 'emprego' || goal === 'transicao') {
      sequence.push({
        id: 'frontend',
        role: 'Passo 3 • Interfaces Visuais para seus Projetos',
        why: 'Para apresentar seus scripts e ferramentas a usuários finais ou recrutadores, uma interface visual na web transforma código de terminal em produto real.',
        learn: [
          'Estruturação de telas acessíveis e atraentes com HTML e CSS',
          'Conceitos de consumo de dados no navegador com JavaScript',
          'Desenvolvimento de um portfólio para expor seus projetos Python'
        ]
      });
    }
  }

  // 3. Caso de interesse específico: Java
  else if (interest === 'java') {
    trackName = 'Trilha Desenvolvedor Corporativo Java';
    overview = level === 'nunca'
      ? 'Java é uma das tecnologias mais requisitadas por bancos, seguradoras e multinacionais. Como você está iniciando, recomendamos primeiro assimilar a lógica com Python antes de entrar na sintaxe tipada do Java.'
      : 'Mergulhe na arquitetura orientada a objetos de alta estabilidade, tipagem estática e engenharia de software corporativa.';

    if (level === 'nunca' || level === 'iniciante') {
      sequence.push({
        id: 'python',
        role: 'Passo 1 • Construção da Lógica Fundamental',
        why: 'Java possui regras de tipos e estruturas que exigem atenção. Aprender a pensar como programador primeiro em Python torna seu aprendizado de Java 10x mais rápido.',
        learn: [
          'Desenvolvimento do raciocínio lógico algorítmico',
          'Controle de fluxo (condicionais if/else, loops while/for)',
          'Estruturação de código modular sem complexidade sintática inicial'
        ]
      });
    }

    sequence.push({
      id: 'java',
      role: (level === 'nunca' || level === 'iniciante') ? 'Passo 2 • Orientação a Objetos e Java Profissional' : 'Passo 1 • Orientação a Objetos e Java Profissional',
      why: 'O curso de Java da Edev constrói uma aplicação completa de gestão escolar do zero, abordando desde tipos primitivos até herança, encapsulamento e Collections.',
      learn: [
        'Tipagem estática, métodos e boas práticas de código limpo',
        'Programação Orientada a Objetos: Classes, Objetos, Herança e Polimorfismo',
        'Coleções dinâmicas (Lists, Maps), tratamento robusto de exceções e persistência em arquivos',
        'Projeto completo: Sistema Escolar Corporativo'
      ]
    });

    sequence.push({
      id: 'sql',
      role: (sequence.length === 1) ? 'Passo 2 • Banco de Dados Relacional' : 'Passo 3 • Banco de Dados Relacional',
      why: 'Toda aplicação Java corporativa precisa se comunicar com bancos de dados relacionais. Dominar SQL é obrigatório em 100% das vagas de Java.',
      learn: [
        'Normalização e modelagem de tabelas relacionais',
        'Consultas eficientes com chaves primárias e estrangeiras',
        'Comandos essenciais para inserção, alteração e busca de dados'
      ]
    });
  }

  // 4. Caso de interesse específico: C++
  else if (interest === 'cpp') {
    trackName = 'Trilha Alta Performance & Motores de Jogos em C++';
    overview = level === 'nunca'
      ? 'C++ é a linguagem que move engines como Unreal, simuladores e softwares que não admitem atraso de milissegundos. Iniciamos com a lógica de programação para você dominar ponteiros e algoritmos sem travas.'
      : 'Domine gerenciamento de memória, ponteiros, classes e desenvolvimento de sistemas de altíssimo desempenho.';

    if (level === 'nunca' || level === 'iniciante') {
      sequence.push({
        id: 'python',
        role: 'Passo 1 • Base Sólida de Algoritmos',
        why: 'C++ manipula memória diretamente na máquina. Entender o fluxo de execução primeiro em Python garante que sua mente já saiba exatamente o que um programa faz.',
        learn: [
          'Estruturas de repetição e lógica booleana',
          'Resolução de problemas algorítmicos práticos',
          'Confiança para avançar até compiladores nativos'
        ]
      });
    }

    sequence.push({
      id: 'cpp',
      role: (level === 'nunca' || level === 'iniciante') ? 'Passo 2 • C++ Moderno e Alta Performance' : 'Passo 1 • C++ Moderno e Alta Performance',
      why: 'O curso de C++ da Edev foca na prática real construindo um Jogo de Batalha em turnos no terminal com compilador g++ e boas práticas modernas.',
      learn: [
        'Compilação de código nativo e fundamentos de performance',
        'Ponteiros, referências e alocação dinâmica de memória',
        'Classes, structs, herança e vetores dinâmicos (std::vector)',
        'Construção completa de um motor de combate em turnos para terminal'
      ]
    });

    sequence.push({
      id: 'sql',
      role: (sequence.length === 1) ? 'Passo 2 • Organização e Persistência de Dados' : 'Passo 3 • Organização e Persistência de Dados',
      why: 'Jogos e softwares de alta performance necessitam guardar status, inventários, estatísticas e históricos de forma consistente.',
      learn: [
        'Modelagem de dados relacionais para salvar estados e informações',
        'Consultas estruturadas de alta velocidade'
      ]
    });
  }

  // 5. Caso de interesse específico: PHP
  else if (interest === 'php') {
    trackName = 'Trilha Desenvolvedor Web PHP & Banco de Dados';
    overview = 'PHP impulsiona mais de 75% da web mundial. Esta trilha cobre desde a interface visual que o usuário vê até o servidor seguro e banco de dados que processam as requisições.';

    sequence.push({
      id: 'frontend',
      role: 'Passo 1 • Interfaces Web e Formulários',
      why: 'O PHP opera processando requisições geradas por páginas web. Aprender HTML e formulários é pré-requisito indispensável para saber o que enviar ao servidor.',
      learn: [
        'Criação da estrutura visual e formulários de envio (POST/GET)',
        'Estilização moderna e layout responsivo com CSS',
        'Validação inicial de dados no navegador'
      ]
    });

    sequence.push({
      id: 'php',
      role: 'Passo 2 • Programação no Servidor e Segurança',
      why: 'Aprenda a receber formulários, proteger contra ataques XSS, controlar sessões de login e criar páginas dinâmicas que reagem a cada usuário.',
      learn: [
        'Arquitetura cliente-servidor e ambiente dinâmico PHP',
        'Validação e higienização segura de dados de formulários',
        'Controle de sessões, autenticação de usuários e cookies',
        'Construção de um Blog Dinâmico completo'
      ]
    });

    sequence.push({
      id: 'sql',
      role: 'Passo 3 • Banco de Dados MySQL na Prática',
      why: 'Aplicações PHP modernas dependem de bancos relacionais via PDO. Domine SQL para criar tabelas, consultar posts, cadastrar usuários e relacionar dados.',
      learn: [
        'Modelagem do banco de dados relacional',
        'Consultas estruturadas com WHERE, ORDER BY e JOINs',
        'Boas práticas de segurança contra SQL Injection'
      ]
    });
  }

  // 6. Caso de interesse específico: SQL
  else if (interest === 'sql') {
    trackName = 'Trilha Especialista em Bancos de Dados & SQL';
    overview = 'Os dados são o patrimônio mais valioso do mundo digital. Esta trilha ensina a modelar, proteger e consultar informações de livrarias, lojas e sistemas reais.';

    sequence.push({
      id: 'sql',
      role: 'Passo 1 • Modelagem, Consultas e Integridade',
      why: 'O curso de SQL da Edev ensina passo a passo a montar o banco de dados completo de uma livraria virtual, desde o CREATE TABLE até consultas analíticas com JOIN.',
      learn: [
        'Conceito de bancos relacionais e ferramentas práticas',
        'Criação de tabelas, tipos de dados e chaves (PRIMARY e FOREIGN KEY)',
        'Comandos INSERT, UPDATE, DELETE e consultas SELECT avançadas',
        'Agrupamentos (GROUP BY), filtros e junções relacionais com INNER JOIN'
      ]
    });

    sequence.push({
      id: 'python',
      role: 'Passo 2 • Manipulação e Automação com Dados',
      why: 'Consultar dados no banco é metade do trabalho; a outra metade é automatizar relatórios e gerar rotinas inteligentes com uma linguagem amigável como Python.',
      learn: [
        'Lógica de programação para processar resultados de consultas',
        'Manipulação de listas, dicionários e estruturas de repetição',
        'Criação de scripts para automação de tarefas'
      ]
    });

    if (goal === 'emprego' || goal === 'transicao' || goal === 'projetos') {
      sequence.push({
        id: 'frontend',
        role: 'Passo 3 • Visualização e Apresentação de Informações',
        why: 'Permite transformar consultas e relatórios em dashboards visuais e interfaces acessíveis para qualquer usuário ou equipe na empresa.',
        learn: [
          'Montagem de telas e tabelas visuais com HTML e CSS',
          'Apresentação de métricas e construção de portfólio profissional'
        ]
      });
    }
  }

  // 7. Caso de recomendação guiada ("Ainda não sei e gostaria de uma recomendação")
  else {
    trackName = 'Trilha Recomendada Edev • Rumo ao Mercado';

    if (goal === 'faculdade') {
      overview = 'Para a faculdade, os maiores desafios costumam ser as disciplinas de Algoritmos, Estrutura de Dados e Programação Orientada a Objetos. Montamos uma sequência certeira para você tirar nota 10:';
      sequence.push({
        id: 'python',
        role: 'Passo 1 • Lógica de Programação e Algoritmos',
        why: 'Constrói com facilidade a base de raciocínio cobrada nas primeiras matérias de introdução à computação.',
        learn: ['Controle de fluxo', 'Loops e vetores', 'Resolução de listas de exercícios acadêmicos']
      });
      sequence.push({
        id: 'java',
        role: 'Passo 2 • Orientação a Objetos Acadêmica & Corporativa',
        why: 'Java é a principal linguagem adotada nas grades universitárias para ensinar Classes, Herança, Polimorfismo e Coleções.',
        learn: ['POO completa', 'Tratamento de exceções', 'Classes e Interfaces']
      });
      sequence.push({
        id: 'sql',
        role: 'Passo 3 • Disciplina de Banco de Dados',
        why: 'Cobre exatamente o conteúdo das cadeiras de Banco de Dados I e II das faculdades de tecnologia.',
        learn: ['Modelagem conceitual e lógica', 'SELECT, JOIN e integridade relacional']
      });
    } else if (goal === 'hobby') {
      overview = 'Para aprender por diversão e curiosidade sem pressão, o melhor caminho une a simplicidade do Python com a satisfação imediata de ver páginas na web:';
      sequence.push({
        id: 'python',
        role: 'Passo 1 • Lógica Divertida com Python',
        why: 'Permite criar programas no mesmo dia sem decoreba de sintaxe.',
        learn: ['Fundamentos de lógica', 'Criação de pequenos jogos e gerenciador no terminal']
      });
      sequence.push({
        id: 'frontend',
        role: 'Passo 2 • Criação Visual na Web',
        why: 'Divertido e altamente gratificante: crie sua própria página na internet para mostrar aos amigos e família.',
        learn: ['HTML & CSS estilosos', 'Interações de botões com JavaScript']
      });
    } else {
      // Emprego, Transição de Carreira ou Projetos Pessoais
      overview = level === 'nunca'
        ? 'Para quem nunca programou e busca ingressar no mercado de tecnologia, o caminho de maior sucesso começa pelo Front-end: você aprende construindo projetos visuais para portfólio e avança rumo aos dados e backend.'
        : 'Uma trilha completa e pragmática, desenhada para construir portfólio sólido e competências reais que os recrutadores avaliam em testes técnicos.';

      sequence.push({
        id: 'frontend',
        role: 'Passo 1 • Front-end & Portfólio Inicial',
        why: 'É a área com contratações mais acessíveis a iniciantes, permitindo demonstrar projetos visuais prontos no GitHub e na web.',
        learn: [
          'HTML semântico e CSS responsivo para qualquer dispositivo',
          'JavaScript moderno para lógica e eventos na tela',
          'Projeto do Portfólio Pessoal completo'
        ]
      });

      sequence.push({
        id: 'sql',
        role: 'Passo 2 • Banco de Dados e Consultas',
        why: 'Toda empresa armazena informações de usuários, produtos e pedidos. SQL é a competência número 1 mais requisitada em entrevistas.',
        learn: [
          'Modelagem relacional de um banco de livraria',
          'Comandos SQL essenciais e junções com JOINs'
        ]
      });

      sequence.push({
        id: 'python',
        role: 'Passo 3 • Automação, Back-end & Lógica Avançada',
        why: 'Aumenta significativamente sua versatilidade técnica para resolver problemas de processamento de dados e scripts inteligentes.',
        learn: [
          'Lógica avançada e manipulação de arquivos',
          'Construção de projetos estruturados em terminal'
        ]
      });
    }
  }

  // Enriquece a sequência com os dados reais do COURSES da Edev
  const enrichedCourses = sequence.map((item, idx) => {
    const realCourse = COURSES[item.id] || {};
    return {
      courseId: item.id,
      stepNumber: idx + 1,
      role: item.role,
      name: realCourse.name || item.id,
      tag: realCourse.tag || '',
      hours: realCourse.hours || '40 horas',
      desc: realCourse.desc || '',
      why: item.why,
      learn: item.learn || [],
      isFirstStep: idx === 0
    };
  });

  return {
    trackName,
    overview,
    pacing,
    answers,
    courses: enrichedCourses,
    generatedAt: new Date().toISOString()
  };
}
