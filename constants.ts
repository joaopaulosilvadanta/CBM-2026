
import { ModuleInfo, Question, Bizu, UserProfile, CareerRank } from './types';

// Based on LC 194/2012 CBM-RR Career Path
export const CAREER_PATH: CareerRank[] = [
  // FASE 1: CARREIRA DAS PRAÇAS (A BASE)
  { 
    id: 1, 
    title: 'Soldado de 2ª Classe', 
    category: 'PRAÇA', 
    minXp: 0, 
    courseName: 'Matrícula no Curso de Formação', 
    rewardDescription: 'Manual do Aluno (Acesso aos Módulos Básicos)' 
  },
  { 
    id: 2, 
    title: 'Soldado de 1ª Classe', 
    category: 'PRAÇA', 
    minXp: 1000, 
    courseName: 'Conclusão do CFSd', 
    rewardDescription: 'Insígnia do Fogo + Farda Operacional (Skins)' 
  },
  { 
    id: 3, 
    title: 'Cabo', 
    category: 'PRAÇA', 
    minXp: 2500, 
    courseName: 'Conclusão do CFC', 
    rewardDescription: 'Módulo Liderança + Escala Extra (Bônus Pontuação)' 
  },
  { 
    id: 4, 
    title: '3º Sargento', 
    category: 'PRAÇA', 
    minXp: 4500, 
    courseName: 'Conclusão do CFS', 
    rewardDescription: 'Modo Comando de Guarnição + Fardamento Exclusivo (Visual)' 
  },
  { 
    id: 5, 
    title: '2º Sargento', 
    category: 'PRAÇA', 
    minXp: 7000, 
    courseName: 'Promoção por Antiguidade', 
    rewardDescription: 'Acesso a Missões de Nível Intermediário' 
  },
  { 
    id: 6, 
    title: '1º Sargento', 
    category: 'PRAÇA', 
    minXp: 10000, 
    courseName: 'Conclusão do CAS', 
    rewardDescription: 'Gerenciamento de Crises + Bizu do Antigão (Comentários)' 
  },
  { 
    id: 7, 
    title: 'Subtenente', 
    category: 'PRAÇA', 
    minXp: 14000, 
    courseName: 'Distinção Máxima (XP)', 
    rewardDescription: 'Título "Adjunto de Comando" + Módulo Serviço na Amazônia' 
  },

  // FASE 2: CARREIRA DOS OFICIAIS (O COMANDO) - Via Concurso Interno (CFO)
  { 
    id: 8, 
    title: 'Cadete', 
    category: 'OFICIAL', 
    minXp: 19000, 
    courseName: 'Aprovação no CFO Virtual', 
    rewardDescription: 'Reinício da Árvore de Habilidades (Gestão e Comando)' 
  },
  { 
    id: 9, 
    title: 'Aspirante-a-Oficial', 
    category: 'OFICIAL', 
    minXp: 25000, 
    courseName: 'Conclusão do CFO', 
    rewardDescription: 'Missões de Supervisão + Folga de Fim de Semana (+2 O₂)' 
  },
  { 
    id: 10, 
    title: '2º Tenente', 
    category: 'OFICIAL', 
    minXp: 32000, 
    courseName: 'Estágio Probatório Concluído', 
    rewardDescription: 'Comando de Pelotão Virtual' 
  },
  { 
    id: 11, 
    title: '1º Tenente', 
    category: 'OFICIAL', 
    minXp: 40000, 
    courseName: 'Promoção por Antiguidade', 
    rewardDescription: 'Equipamentos de Oficial Intermediário' 
  },
  { 
    id: 12, 
    title: 'Capitão', 
    category: 'OFICIAL', 
    minXp: 50000, 
    courseName: 'Conclusão do CAO', 
    rewardDescription: 'Gestão de Companhia e Planejamento' 
  },
  { 
    id: 13, 
    title: 'Major', 
    category: 'OFICIAL', 
    minXp: 62000, 
    courseName: 'Promoção por Merecimento', 
    rewardDescription: 'Gestão de Batalhão' 
  },
  { 
    id: 14, 
    title: 'Tenente-Coronel', 
    category: 'OFICIAL', 
    minXp: 76000, 
    courseName: 'Promoção por Merecimento', 
    rewardDescription: 'Subcomando Geral Virtual' 
  },
  { 
    id: 15, 
    title: 'Coronel', 
    category: 'OFICIAL', 
    minXp: 100000, 
    courseName: 'Conclusão do CSP', 
    rewardDescription: 'Título Comandante Geral + Espada de Comando (Zerou o Jogo)' 
  },
];

export const INITIAL_USER: UserProfile = {
  name: 'Aluno',
  pd: 100, // Pontos de Distinção
  oxygen: 5,
  maxOxygen: 5,
  level: 1, // Soldado 2ª Classe
  xp: 0,
  rankTitle: 'Soldado 2ª Classe',
  modulesCompleted: [],
  unlockedSkins: false, // Liberado no Sd 1ª Classe ou 3º Sgt conforme regra
  unlockedExtraModule: false, // Liberado no Subtenente
  unlockedAdvancedBizus: false, // Liberado no 1º Sgt
};

export const BIZUS: Bizu[] = [
  { 
    id: 'MULTIPLIER', 
    name: 'Fator de Multiplicação', 
    cost: 50, 
    description: 'Ordem do Dia: Duplica os PDs ganhos nesta sessão.',
    icon: 'Award' 
  },
  { 
    id: 'HINT', 
    name: 'Consulta ao Manual', 
    cost: 30, 
    description: 'Permissão para consultar a fonte legal (Lei/Artigo).',
    icon: 'BookOpen' 
  },
  { 
    id: 'SHIELD', 
    name: 'Passe Livre', 
    cost: 40, 
    description: 'Ignora penalidade de erro na próxima questão.',
    icon: 'ShieldCheck' 
  },
  { 
    id: 'FIFTY_FIFTY', 
    name: 'Ajuda do Antigo', 
    cost: 60, 
    description: 'O "bizu" elimina duas alternativas incorretas.',
    icon: 'Users' 
  },
];

export const MODULES: ModuleInfo[] = [
  { id: 'm1', code: 'M-1', name: 'Língua Portuguesa', description: 'Ataque Gramatical (12 Tópicos)', questionsCount: 120, unlocked: true, difficulty: 1.0 },
  { id: 'm2', code: 'M-2', name: 'Raciocínio Lógico', description: 'O Código Lógico-Matemático', questionsCount: 60, unlocked: true, difficulty: 1.2 },
  { id: 'm3', code: 'M-3', name: 'Defesa Civil e Ambiental', description: 'O Resgate da Amazônia (6 Setores)', questionsCount: 60, unlocked: true, difficulty: 1.0 },
  { id: 'm4', code: 'M-4', name: 'Legislação Específica', description: 'Bunker de Regras (LC 194/2012)', questionsCount: 40, unlocked: true, difficulty: 1.5 }, 
  { id: 'm5', code: 'M-5', name: 'Física e Química', description: 'Laboratório de Combate', questionsCount: 30, unlocked: true, difficulty: 1.8 },
  { id: 'm6', code: 'M-6', name: 'História e Geografia', description: 'Arquivo de Inteligência', questionsCount: 30, unlocked: true, difficulty: 1.0 },
  { id: 'm7', code: 'M-7', name: 'Informática', description: 'Ataque Hacker (3 Firewalls)', questionsCount: 30, unlocked: true, difficulty: 1.1 },
  // NOVO MÓDULO: ARSENAL DE GUERRA (OS BIZURADOS)
  { id: 'm_bizu', code: 'ELITE', name: 'Arsenal de Guerra', description: 'O Módulo dos Bizurados (Mnemônicos)', questionsCount: 20, unlocked: true, difficulty: 2.0 },
  // New Module - Subtenente Reward (Level 7)
  { id: 'm_amb', code: 'M-EXTRA', name: 'Serviço na Amazônia', description: 'Conscientização Ambiental', questionsCount: 10, unlocked: false, minLevel: 7, difficulty: 1.5 },
];

export const ARSENAL_RESOURCES = [
    { id: 'res_port', title: 'Língua Portuguesa', icon: 'BookA', color: 'text-yellow-400', desc: 'Gramática Tática' },
    { id: 'res_rlm', title: 'Raciocínio Lógico', icon: 'Binary', color: 'text-blue-400', desc: 'Lógica de Combate' },
    { id: 'res_defesa', title: 'Defesa Civil e Amb.', icon: 'LifeBuoy', color: 'text-green-400', desc: 'Protocolos de Resgate' },
    { id: 'res_legis', title: 'Legislação Específica', icon: 'Scale', color: 'text-red-400', desc: 'Leis do Batalhão' },
    { id: 'res_fq', title: 'Física e Química', icon: 'Atom', color: 'text-purple-400', desc: 'Ciência do Fogo' },
    { id: 'res_hist', title: 'História e Geografia', icon: 'Map', color: 'text-orange-400', desc: 'Reconhecimento de Área' },
    { id: 'res_info', title: 'Noções de Informática', icon: 'Laptop', color: 'text-cyan-400', desc: 'Defesa Cibernética' },
];

export const MOCK_QUESTIONS: Question[] = [
  // =========================================================================
  // MÓDULO ELITE: ARSENAL DE GUERRA (BIZUS)
  // =========================================================================
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "BIZU_01_RLM",
    "disciplina": "Raciocínio Lógico (Bizurado)",
    "topico": "Tabela Verdade",
    "pergunta_base": "MNEMÔNICO TÁTICO: Na tabela verdade da Condicional (Se... então), qual é o único caso que dá FALSO? Lembre-se da atriz famosa.",
    "alternativas": [
      {"letra": "A", "texto": "V com V (Vai Vencer)"},
      {"letra": "B", "texto": "V com F (Vera Fischer)"},
      {"letra": "C", "texto": "F com V (Fugiu Venceu)"},
      {"letra": "D", "texto": "F com F (Fez Feio)"}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: Bizu da Vera Fischer: Na condicional (->), só é Falso quando a primeira é V e a segunda é F (V -> F = F). O resto é Verdade.",
    "recompensa_pd": 25,
    "mechanic": "SPEED_RUN"
  },
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "BIZU_02_PORT",
    "disciplina": "Língua Portuguesa (Bizurado)",
    "topico": "Crase Proibida",
    "pergunta_base": "REGRA DE COMBATE: Diante de qual classe gramatical a Crase é ESTRITAMENTE PROIBIDA e considerada 'Fogo Amigo' (Erro Grave)?",
    "alternativas": [
      {"letra": "A", "texto": "Substantivos Femininos"},
      {"letra": "B", "texto": "Verbos"},
      {"letra": "C", "texto": "Pronomes Possessivos Femininos"},
      {"letra": "D", "texto": "Nomes de Cidades com especificador"}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: Bizu: 'Diante de verbo, crase não há!'. Ex: 'Estou disposto a ajudar'. Crase exige artigo 'a', verbo não aceita artigo.",
    "recompensa_pd": 25,
    "mechanic": "SUDDEN_DEATH"
  },
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "BIZU_03_INFO",
    "disciplina": "Informática (Bizurado)",
    "topico": "Protocolos de Email",
    "pergunta_base": "ATALHO MENTAL: Para lembrar a função do protocolo SMTP, usamos o bizu 'Sua Mensagem...'",
    "alternativas": [
      {"letra": "A", "texto": "...Tá Parada (Recebimento)"},
      {"letra": "B", "texto": "...Tá Partindo (Envio)"},
      {"letra": "C", "texto": "...Tem Problema (Erro)"},
      {"letra": "D", "texto": "...Traz Mensagem (Download)"}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: SMTP = Sua Mensagem Tá Partindo. É o protocolo exclusivo para ENVIO de e-mails. Para receber, usa-se POP ou IMAP.",
    "recompensa_pd": 25,
    "mechanic": "DECODE"
  },

  // =========================================================================
  // MÓDULO 7: ATAQUE HACKER (INFORMÁTICA)
  // =========================================================================

  // Firewall 1: Sistemas e Operações (OS)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M7_F1_MOCK",
    "disciplina": "Informática",
    "topico": "Firewall 1: Terminal de Comando",
    "pergunta_base": "TERMINAL: O sistema operacional Linux é conhecido por seu código aberto e Kernel modular. Qual das opções abaixo NÃO é uma distribuição Linux?",
    "alternativas": [
      {"letra": "A", "texto": "Ubuntu"},
      {"letra": "B", "texto": "Debian"},
      {"letra": "C", "texto": "Windows Server"},
      {"letra": "D", "texto": "Fedora"}
    ],
    "resposta_correta": "C",
    "justificativa_edital": "RESUMO: Windows é um sistema proprietário da Microsoft. Ubuntu, Debian e Fedora são distribuições clássicas baseadas no Kernel Linux.",
    "recompensa_pd": 15,
    "mechanic": "SPEED_RUN"
  },

  // Firewall 2: Redes e Comunicação
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M7_F2_MOCK",
    "disciplina": "Informática",
    "topico": "Firewall 2: Link Seguro",
    "pergunta_base": "LINK SEGURO: Ao enviar um e-mail, para garantir que um destinatário receba a mensagem sem que os outros saibam (Cópia Oculta), utiliza-se o campo:",
    "alternativas": [
      {"letra": "A", "texto": "Cc"},
      {"letra": "B", "texto": "Cco / Bcc"},
      {"letra": "C", "texto": "Anexo"},
      {"letra": "D", "texto": "Assunto"}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: Cco (Com Cópia Oculta) ou Bcc (Blind Carbon Copy) oculta o endereço do destinatário para os demais receptores da mensagem.",
    "recompensa_pd": 15,
    "mechanic": "DEFAULT"
  },

  // Firewall 3: Segurança da Informação
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M7_F3_MOCK",
    "disciplina": "Informática",
    "topico": "Firewall 3: Defesa Cibernética",
    "pergunta_base": "DEFESA CIBERNÉTICA: Qual a principal diferença entre um VÍRUS e um WORM?",
    "alternativas": [
      {"letra": "A", "texto": "O Vírus precisa de um hospedeiro/execução; o Worm se autorreplica na rede."},
      {"letra": "B", "texto": "O Vírus é mais inofensivo que o Worm."},
      {"letra": "C", "texto": "O Worm só ataca hardware, o Vírus ataca software."},
      {"letra": "D", "texto": "Não há diferença, são sinônimos."}
    ],
    "resposta_correta": "A",
    "justificativa_edital": "RESUMO: Vírus infectam arquivos e dependem da execução humana. Worms são autônomos, exploram vulnerabilidades e se propagam sozinhos pela rede.",
    "recompensa_pd": 15,
    "mechanic": "SUDDEN_DEATH"
  },

  // =========================================================================
  // MÓDULO 6: ARQUIVO DE INTELIGÊNCIA (HISTÓRIA, GEOGRAFIA E ATUALIDADES)
  // =========================================================================

  // Setor 1: História de Roraima (Evolução Política)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M6_S1_MOCK",
    "disciplina": "História de Roraima",
    "topico": "Setor 1: Linha do Tempo Tática",
    "pergunta_base": "EVOLUÇÃO: Em que ano o Território Federal do Rio Branco passou a ser denominado Território Federal de Roraima?",
    "alternativas": [
      {"letra": "A", "texto": "1943"},
      {"letra": "B", "texto": "1962"},
      {"letra": "C", "texto": "1988"},
      {"letra": "D", "texto": "1990"}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: A mudança ocorreu em 1962. Em 1943 foi criado o Território do Rio Branco. Em 1988 foi elevado a Estado.",
    "recompensa_pd": 15,
    "mechanic": "SPEED_RUN"
  },

  // Setor 2: Geografia de Roraima (Terreno)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M6_S2_MOCK",
    "disciplina": "Geografia de Roraima",
    "topico": "Setor 2: Reconhecimento de Terreno",
    "pergunta_base": "TERRENO: O ecossistema predominante na porção nordeste de Roraima, caracterizado por vegetação aberta tipo Savana, é:",
    "alternativas": [
      {"letra": "A", "texto": "Caatinga"},
      {"letra": "B", "texto": "Lavrado"},
      {"letra": "C", "texto": "Pantanal"},
      {"letra": "D", "texto": "Mata de Cocais"}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: O Lavrado é a savana guianense típica de Roraima, cobrindo grande parte do nordeste do estado.",
    "recompensa_pd": 15,
    "mechanic": "DEFAULT"
  },

  // Setor 3: Atualidades Gerais (Cenário)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M6_S3_MOCK",
    "disciplina": "Atualidades",
    "topico": "Setor 3: Briefing Diário",
    "pergunta_base": "BRIEFING: Qual o nome da operação humanitária deflagrada pelo Governo Federal para lidar com o fluxo migratório venezuelano em Roraima?",
    "alternativas": [
      {"letra": "A", "texto": "Operação Fronteira Sul"},
      {"letra": "B", "texto": "Operação Acolhida"},
      {"letra": "C", "texto": "Operação Ágata"},
      {"letra": "D", "texto": "Operação Roraima Segura"}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: A Operação Acolhida foi criada em 2018 para ordenar a fronteira, abrigar e interiorizar os imigrantes venezuelanos.",
    "recompensa_pd": 15,
    "mechanic": "TRUE_FALSE"
  },

  // =========================================================================
  // MÓDULO 5: LABORATÓRIO DE COMBATE (FÍSICA E QUÍMICA)
  // =========================================================================

  // Física - Bancada 1: Mecânica e Balística
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M5_P1_MOCK",
    "disciplina": "Física",
    "topico": "Bancada 1: Cálculo de Trajetória",
    "pergunta_base": "BALÍSTICA: Ao lançar um jato de água com ângulo de 45º, desconsiderando a resistência do ar, o alcance horizontal é:",
    "alternativas": [
      {"letra": "A", "texto": "Mínimo."},
      {"letra": "B", "texto": "Máximo."},
      {"letra": "C", "texto": "Igual à altura máxima."},
      {"letra": "D", "texto": "Nulo."}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: No lançamento de projéteis, o ângulo de 45º proporciona o alcance horizontal MÁXIMO para uma mesma velocidade inicial.",
    "recompensa_pd": 15,
    "mechanic": "SPEED_RUN"
  },

  // Física - Bancada 2: Termodinâmica
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M5_P2_MOCK",
    "disciplina": "Física",
    "topico": "Bancada 2: Controle Térmico",
    "pergunta_base": "CONTROLE TÉRMICO: Em uma transformação isobárica de um gás ideal, se a temperatura (Kelvin) dobra, o volume:",
    "alternativas": [
      {"letra": "A", "texto": "Dobra."},
      {"letra": "B", "texto": "Cai pela metade."},
      {"letra": "C", "texto": "Permanece constante."},
      {"letra": "D", "texto": "Quadruplica."}
    ],
    "resposta_correta": "A",
    "justificativa_edital": "RESUMO: Lei de Charles/Gay-Lussac para pressão constante (Isobárica): Volume e Temperatura são diretamente proporcionais (V1/T1 = V2/T2).",
    "recompensa_pd": 15,
    "mechanic": "DEFAULT"
  },

  // Física - Bancada 3: Eletricidade
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M5_P3_MOCK",
    "disciplina": "Física",
    "topico": "Bancada 3: Curto-Circuito",
    "pergunta_base": "CIRCUITO: Dois resistores idênticos são ligados em SÉRIE. A resistência equivalente será:",
    "alternativas": [
      {"letra": "A", "texto": "A metade de um deles."},
      {"letra": "B", "texto": "Igual a um deles."},
      {"letra": "C", "texto": "O dobro de um deles."},
      {"letra": "D", "texto": "Nula."}
    ],
    "resposta_correta": "C",
    "justificativa_edital": "RESUMO: Em série, as resistências se somam (Req = R1 + R2). Se são iguais, Req = 2R.",
    "recompensa_pd": 15,
    "mechanic": "DECODE"
  },

  // Química - Estação 1: Estrutura e Tabela
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M5_Q1_MOCK",
    "disciplina": "Química",
    "topico": "Estação 1: Identificação de Isótopos",
    "pergunta_base": "HAZMAT: O elemento Sódio (Na), metal alcalino altamente reativo com água, tende a formar qual tipo de ligação com o Cloro (Cl)?",
    "alternativas": [
      {"letra": "A", "texto": "Covalente"},
      {"letra": "B", "texto": "Metálica"},
      {"letra": "C", "texto": "Iônica"},
      {"letra": "D", "texto": "De Hidrogênio"}
    ],
    "resposta_correta": "C",
    "justificativa_edital": "RESUMO: Metal (Na) + Ametal (Cl) = Ligação Iônica, com transferência de elétrons, formando cátions e ânions (NaCl).",
    "recompensa_pd": 15,
    "mechanic": "TRUE_FALSE"
  },

  // Química - Estação 2: Reações e Soluções
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M5_Q2_MOCK",
    "disciplina": "Química",
    "topico": "Estação 2: Mistura Estável",
    "pergunta_base": "NEUTRALIZAÇÃO: A reação entre um Ácido Forte e uma Base Forte produz sempre:",
    "alternativas": [
      {"letra": "A", "texto": "Sal e Água."},
      {"letra": "B", "texto": "Óxido e Hidrogênio."},
      {"letra": "C", "texto": "Metal e Oxigênio."},
      {"letra": "D", "texto": "Apenas Água."}
    ],
    "resposta_correta": "A",
    "justificativa_edital": "RESUMO: Reação de Neutralização clássica: HCl + NaOH -> NaCl (Sal) + H2O (Água).",
    "recompensa_pd": 15,
    "mechanic": "DECODE"
  },

  // Química - Estação 3: Orgânica e Energia
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M5_Q3_MOCK",
    "disciplina": "Química",
    "topico": "Estação 3: Combustível Fóssil",
    "pergunta_base": "COMBUSTÍVEL: A reação de combustão, que libera calor para o ambiente (fogo), é classificada termoquimicamente como:",
    "alternativas": [
      {"letra": "A", "texto": "Endotérmica (Delta H > 0)"},
      {"letra": "B", "texto": "Exotérmica (Delta H < 0)"},
      {"letra": "C", "texto": "Adiabática"},
      {"letra": "D", "texto": "Isotérmica"}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: Processos que LIBERAM calor são Exotérmicos. A entalpia final é menor que a inicial, logo a variação (Delta H) é negativa.",
    "recompensa_pd": 15,
    "mechanic": "SPEED_RUN"
  },

  // =========================================================================
  // MÓDULO 4: BUNKER DE REGRAS (LC 194/2012)
  // =========================================================================

  // Eixo 1: Ingresso e Situação (Arts. 1 a 18)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M4_E1_MOCK",
    "disciplina": "Legislação (LC 194/2012)",
    "topico": "Eixo 1: Protocolo de Incorporação",
    "pergunta_base": "INCORPORAÇÃO: Segundo o Art. 12 da LC 194/2012, qual das etapas abaixo NÃO faz parte das quatro fases do concurso público?",
    "alternativas": [
      {"letra": "A", "texto": "Exames médicos, odontológicos e toxicológicos."},
      {"letra": "B", "texto": "Avaliação Psicológica (Exame Psicotécnico)."},
      {"letra": "C", "texto": "Curso de Formação de Oficiais/Praças."},
      {"letra": "D", "texto": "Investigação Social."}
    ],
    "resposta_correta": "C",
    "justificativa_edital": "RESUMO: O Art. 12 define 4 etapas: I- Prova; II- Exames Médicos/Físicos; III- Psicológico; IV- Investigação Social. O Curso de Formação (Art. 15) é requisito para matrícula e posse, posterior às fases do concurso.",
    "recompensa_pd": 15,
    "mechanic": "SPEED_RUN"
  },

  // Eixo 2: Carreira e Hierarquia (Arts. 22 a 37)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M4_E2_MOCK",
    "disciplina": "Legislação (LC 194/2012)",
    "topico": "Eixo 2: Cadeia de Comando",
    "pergunta_base": "HIERARQUIA: De acordo com o Art. 25, Posto é o grau hierárquico do Oficial, conferido por ato do Governador. E a Graduação?",
    "alternativas": [
      {"letra": "A", "texto": "Grau da Praça, conferido pelo Governador."},
      {"letra": "B", "texto": "Grau da Praça, conferido pelo Comandante Geral."},
      {"letra": "C", "texto": "Grau do Oficial, conferido pelo Secretário de Segurança."},
      {"letra": "D", "texto": "Grau Especial, conferido por Lei."}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: Art. 25, § 2º: Graduação é o grau hierárquico da Praça, conferido pelo Comandante Geral da Instituição. Posto é do Oficial (Governador/Carta Patente).",
    "recompensa_pd": 15,
    "mechanic": "DECODE"
  },

  // Eixo 3: Deveres, Ética e Punições (Arts. 38 a 58)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M4_E3_MOCK",
    "disciplina": "Legislação (LC 194/2012)",
    "topico": "Eixo 3: Tribunal de Honra",
    "pergunta_base": "ÉTICA MILITAR: O Art. 52 proíbe expressamente aos servidores militares estaduais:",
    "alternativas": [
      {"letra": "A", "texto": "O uso de uniformes em cerimônias cívicas."},
      {"letra": "B", "texto": "Quaisquer manifestações coletivas, reivindicatórias ou políticas."},
      {"letra": "C", "texto": "O exercício do comércio como acionista."},
      {"letra": "D", "texto": "A residência fora do município de lotação."}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: Art. 52: São proibidas quaisquer manifestações coletivas, tanto sobre atos superiores, quanto às de caráter reivindicatórios ou políticos.",
    "recompensa_pd": 15,
    "mechanic": "TRUE_FALSE"
  },

  // Eixo 4: Direitos e Situações Especiais (Arts. 59 a 123)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M4_E4_MOCK",
    "disciplina": "Legislação (LC 194/2012)",
    "topico": "Eixo 4: Gestão de Pessoal",
    "pergunta_base": "SITUAÇÃO ESPECIAL: A 'Agregação' (Art. 100) é a situação na qual o militar da ativa:",
    "alternativas": [
      {"letra": "A", "texto": "Deixa de ocupar vaga na escala hierárquica, nela permanecendo sem número."},
      {"letra": "B", "texto": "É transferido para a inatividade definitivamente."},
      {"letra": "C", "texto": "Passa a ocupar duas vagas simultaneamente."},
      {"letra": "D", "texto": "Perde sua patente e posto."}
    ],
    "resposta_correta": "A",
    "justificativa_edital": "RESUMO: Art. 100: A agregação é a situação na qual o militar estadual da ativa deixa de ocupar a vaga na escala hierárquica do seu Quadro, nela permanecendo sem número.",
    "recompensa_pd": 15,
    "mechanic": "DEFAULT"
  },

  // =========================================================================
  // MÓDULO 3: DEFESA CIVIL E AMBIENTAL - O RESGATE DA AMAZÔNIA
  // =========================================================================

  // Setor 1: Protocolo PNPDEC (Lei 12.608/2012)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M3_S1_MOCK",
    "disciplina": "Defesa Civil",
    "topico": "Setor 1: Protocolo PNPDEC (Competências)",
    "pergunta_base": "DOUTRINA: Na PNPDEC, cabe a qual ente federado executar a garantia da integridade física da população em caso de desastre?",
    "alternativas": [
      {"letra": "A", "texto": "Município (Executor imediato)"},
      {"letra": "B", "texto": "União (Apoio financeiro)"},
      {"letra": "C", "texto": "Estado (Apoio técnico)"},
      {"letra": "D", "texto": "Forças Armadas (Exclusivamente)"}
    ],
    "resposta_correta": "A",
    "justificativa_edital": "RESUMO: Segundo a Lei 12.608/2012, compete ao Município executar a PNPDEC em âmbito local e coordenar as ações imediatas de resposta.",
    "recompensa_pd": 15,
    "mechanic": "DECODE"
  },

  // Setor 2: Gestão de Crises (IN 01/2012)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M3_S2_MOCK",
    "disciplina": "Defesa Civil",
    "topico": "Setor 2: Gestão de Crises (Status)",
    "pergunta_base": "STATUS DE ALERTA: Qual a diferença principal entre Situação de Emergência (SE) e Estado de Calamidade Pública (ECP)?",
    "alternativas": [
      {"letra": "A", "texto": "A SE compromete a capacidade de resposta local; o ECP a excede substancialmente."},
      {"letra": "B", "texto": "A SE exige ajuda federal; o ECP exige ajuda internacional."},
      {"letra": "C", "texto": "A SE é para zonas rurais; o ECP para zonas urbanas."},
      {"letra": "D", "texto": "Não há diferença legal, apenas semântica."}
    ],
    "resposta_correta": "A",
    "justificativa_edital": "RESUMO: IN 01/2012: Emergência é quando o desastre causa danos superáveis pela comunidade local. Calamidade é quando os danos superam a capacidade de resposta do ente atingido.",
    "recompensa_pd": 15,
    "mechanic": "DEFAULT"
  },

  // Setor 3: Codificação de Desastres (COBRADE)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M3_S3_MOCK",
    "disciplina": "Defesa Civil",
    "topico": "Setor 3: Codificação (COBRADE)",
    "pergunta_base": "DECIFRAR COBRADE: Um Incêndio Florestal em Parques Nacionais é classificado como desastre:",
    "alternativas": [
      {"letra": "A", "texto": "Natural - Climatológico"},
      {"letra": "B", "texto": "Natural - Biológico"},
      {"letra": "C", "texto": "Tecnológico - Químico"},
      {"letra": "D", "texto": "Misto - Antropogênico"}
    ],
    "resposta_correta": "A",
    "justificativa_edital": "RESUMO: Incêndios Florestais são subclassificados no COBRADE como Desastres Naturais (Grupo Climatológico), código 1.4.1.3.1 ou similares, dependendo da especificidade.",
    "recompensa_pd": 15,
    "mechanic": "SPEED_RUN"
  },

  // Setor 4: Estrutura Legal (SISNAMA)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M3_S4_MOCK",
    "disciplina": "Direito Ambiental",
    "topico": "Setor 4: Estrutura Legal (SISNAMA)",
    "pergunta_base": "CÍRCULO DE PROTEÇÃO: No SISNAMA, o CONAMA (Conselho Nacional do Meio Ambiente) atua como órgão:",
    "alternativas": [
      {"letra": "A", "texto": "Consultivo e Deliberativo"},
      {"letra": "B", "texto": "Executor Central"},
      {"letra": "C", "texto": "Executor Seccional"},
      {"letra": "D", "texto": "Superior (Formulador de Políticas)"}
    ],
    "resposta_correta": "A",
    "justificativa_edital": "RESUMO: O CONAMA é o órgão consultivo e deliberativo do SISNAMA, responsável por editar resoluções e normas gerais. O Órgão Superior é o Conselho de Governo.",
    "recompensa_pd": 15,
    "mechanic": "DECODE"
  },

  // Setor 5: Crimes e Punições
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M3_S5_MOCK",
    "disciplina": "Direito Ambiental",
    "topico": "Setor 5: Crimes e Punições",
    "pergunta_base": "JULGAMENTO DE RISCO: A responsabilidade por dano ambiental é objetiva. Isso significa que:",
    "alternativas": [
      {"letra": "A", "texto": "Independe da comprovação de dolo ou culpa."},
      {"letra": "B", "texto": "Exige a prova da intenção do agente."},
      {"letra": "C", "texto": "Só se aplica a empresas públicas."},
      {"letra": "D", "texto": "Depende de condenação penal prévia."}
    ],
    "resposta_correta": "A",
    "justificativa_edital": "RESUMO: Na esfera cível, a responsabilidade ambiental é OBJETIVA (Teoria do Risco Integral). Basta provar o dano e o nexo causal, sem necessidade de provar culpa do agente.",
    "recompensa_pd": 15,
    "mechanic": "DEFAULT"
  },

  // Setor 6: Gestão do Território
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M3_S6_MOCK",
    "disciplina": "Direito Ambiental",
    "topico": "Setor 6: Sustentabilidade Tática",
    "pergunta_base": "VERIFICAÇÃO: O Princípio da Precaução deve ser aplicado quando há certeza científica absoluta sobre o dano ambiental.",
    "alternativas": [
      {"letra": "A", "texto": "FALSO"},
      {"letra": "B", "texto": "VERDADEIRO"}
    ],
    "resposta_correta": "A",
    "justificativa_edital": "RESUMO: FALSO. O Princípio da Precaução é aplicado justamente na INCERTEZA científica. Na dúvida sobre o risco, abstém-se da prática. Quando há certeza do dano, usa-se a Prevenção.",
    "recompensa_pd": 15,
    "mechanic": "TRUE_FALSE"
  },

  // =========================================================================
  // MÓDULO 2: RACIOCÍNIO LÓGICO - CÓDIGO LÓGICO-MATEMÁTICO (6 PROTOCOLOS)
  // =========================================================================

  // Protocolo 1: Estruturas Lógicas (Cadeia de Comandos)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M2_P1_MOCK",
    "disciplina": "Raciocínio Lógico",
    "topico": "Protocolo 1: Estruturas Lógicas",
    "pergunta_base": "CADEIA DE COMANDOS: A negação da frase 'O soldado treina E não se cansa' é:",
    "alternativas": [
      {"letra": "A", "texto": "O soldado não treina E se cansa."},
      {"letra": "B", "texto": "O soldado não treina OU se cansa."},
      {"letra": "C", "texto": "Se o soldado treina, então se cansa."},
      {"letra": "D", "texto": "O soldado treina OU não se cansa."}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: Lei de Morgan para a conjunção (E): Nega-se a primeira, troca-se E por OU, e nega-se a segunda (~A v ~B). Negação de 'não se cansa' é 'se cansa'.",
    "recompensa_pd": 15,
    "mechanic": "SPEED_RUN"
  },

  // Protocolo 2: Lógica de Argumentação (Dedução Tática)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M2_P2_MOCK",
    "disciplina": "Raciocínio Lógico",
    "topico": "Protocolo 2: Dedução Tática",
    "pergunta_base": "DEDUÇÃO: Todo Bombeiro é corajoso. Alguns mergulhadores são Bombeiros. Logo:",
    "alternativas": [
      {"letra": "A", "texto": "Todo mergulhador é corajoso."},
      {"letra": "B", "texto": "Algum mergulhador é corajoso."},
      {"letra": "C", "texto": "Nenhum mergulhador é corajoso."},
      {"letra": "D", "texto": "Algum corajoso não é Bombeiro."}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: Se alguns mergulhadores pertencem ao grupo dos Bombeiros, e TODO Bombeiro está dentro do grupo dos Corajosos, então a intersecção (Mergulhador Bombeiro) é necessariamente corajosa.",
    "recompensa_pd": 15,
    "mechanic": "DEFAULT"
  },

  // Protocolo 3: Diagramas Lógicos (Mapeamento de Terreno)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M2_P3_MOCK",
    "disciplina": "Raciocínio Lógico",
    "topico": "Protocolo 3: Mapeamento de Terreno",
    "pergunta_base": "MAPEAMENTO: Se 'Nenhum A é B' e 'Todo C é A', qual a relação entre C e B?",
    "alternativas": [
      {"letra": "A", "texto": "Algum C é B."},
      {"letra": "B", "texto": "Todo C é B."},
      {"letra": "C", "texto": "Nenhum C é B."},
      {"letra": "D", "texto": "C contém B."}
    ],
    "resposta_correta": "C",
    "justificativa_edital": "RESUMO: Visualmente, o conjunto C está totalmente dentro de A. Como A e B são conjuntos disjuntos (separados), é impossível que C toque em B.",
    "recompensa_pd": 15,
    "mechanic": "DECODE"
  },

  // Protocolo 4: Contagem e Probabilidade (Análise de Risco)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M2_P4_MOCK",
    "disciplina": "Raciocínio Lógico",
    "topico": "Protocolo 4: Análise de Risco",
    "pergunta_base": "CÁLCULO DE RISCO: Quantos anagramas distintos podemos formar com a palavra 'S.O.S' (considerando o ponto irrelevante)?",
    "alternativas": [
      {"letra": "A", "texto": "6"},
      {"letra": "B", "texto": "3"},
      {"letra": "C", "texto": "9"},
      {"letra": "D", "texto": "5"}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: Permutação com repetição de 3 elementos (S, O, S), onde S repete 2 vezes. Fórmula: P = 3! / 2! = (3x2x1) / (2x1) = 3.",
    "recompensa_pd": 15,
    "mechanic": "DECODE"
  },

  // Protocolo 5: Associação Lógica (Identificação de Agentes)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M2_P5_MOCK",
    "disciplina": "Raciocínio Lógico",
    "topico": "Protocolo 5: Identificação de Agentes",
    "pergunta_base": "AGENTE: 3 Soldados (Alfa, Bravo, Charlie) têm funções diferentes: Motorista, Socorrista, Combatente. Alfa não é Motorista. Bravo é o Socorrista. Quem é o Motorista?",
    "alternativas": [
      {"letra": "A", "texto": "Alfa"},
      {"letra": "B", "texto": "Bravo"},
      {"letra": "C", "texto": "Charlie"},
      {"letra": "D", "texto": "Nenhum"}
    ],
    "resposta_correta": "C",
    "justificativa_edital": "RESUMO: Se Bravo é Socorrista, sobram Motorista e Combatente. Alfa NÃO é Motorista, logo Alfa é Combatente. Resta Charlie para ser o Motorista.",
    "recompensa_pd": 15,
    "mechanic": "DEFAULT"
  },

  // Protocolo 6: Verdades e Mentiras (Interrogatório Tático)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "M2_P6_MOCK",
    "disciplina": "Raciocínio Lógico",
    "topico": "Protocolo 6: Interrogatório Tático",
    "pergunta_base": "INTERROGATÓRIO: Soldado A diz: 'Soldado B está mentindo'. Soldado B diz: 'Eu digo a verdade'. Se apenas um mente, quem fala a verdade?",
    "alternativas": [
      {"letra": "A", "texto": "Soldado A"},
      {"letra": "B", "texto": "Soldado B"},
      {"letra": "C", "texto": "Ambos"},
      {"letra": "D", "texto": "Nenhum"}
    ],
    "resposta_correta": "A",
    "justificativa_edital": "RESUMO: Se B diz a verdade, então A (que diz que B mente) estaria mentindo. Isso funciona (1 V, 1 M). Se B mente, então A diz a verdade. A questão pede quem fala a verdade assumindo contradição.",
    "recompensa_pd": 15,
    "mechanic": "TRUE_FALSE"
  },

  // =========================================================================
  // MÓDULO 1: LÍNGUA PORTUGUESA - ESTRUTURA COMPLETA (12 TÓPICOS)
  // =========================================================================

  // 1. P-1.1: Uso de Munição (C, S, Z) - Ortografia Oficial
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "P1_1_MOCK",
    "disciplina": "Língua Portuguesa",
    "topico": "P-1.1: Uso de Munição (Ortografia)",
    "pergunta_base": "TIRO RÁPIDO: Selecione a opção que preenche corretamente: 'A ______ plenária aprovou a ______ de verbas.'",
    "alternativas": [
      {"letra": "A", "texto": "Sessão / Cessão"},
      {"letra": "B", "texto": "Seção / Sessão"},
      {"letra": "C", "texto": "Cessão / Seção"},
      {"letra": "D", "texto": "Sessão / Seção"}
    ],
    "resposta_correta": "A",
    "justificativa_edital": "RESUMO: 'Sessão' = tempo/reunião. 'Cessão' = ato de ceder. 'Seção' = divisão/lugar. A reunião (Sessão) aprovou o ato de ceder (Cessão) verbas.",
    "recompensa_pd": 15,
    "mechanic": "SPEED_RUN"
  },

  // 2. P-1.2: A Sentinela Ortográfica - Acentuação
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "P1_2_MOCK",
    "disciplina": "Língua Portuguesa",
    "topico": "P-1.2: A Sentinela (Acentuação)",
    "pergunta_base": "SENTINELA: Identifique a palavra que PERDEU o acento no Novo Acordo Ortográfico.",
    "alternativas": [
      {"letra": "A", "texto": "Herói"},
      {"letra": "B", "texto": "Ideia"},
      {"letra": "C", "texto": "Pôde"},
      {"letra": "D", "texto": "Saúde"}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: Ditongos abertos (é, ói) em palavras PAROXÍTONAS (i-dei-a) perderam o acento. Oxítonas terminadas em ditongo aberto (Herói) mantêm.",
    "recompensa_pd": 15,
    "mechanic": "SUDDEN_DEATH"
  },

  // 3. P-2.1: Desvio de Pelotão - Flexão Nominal/Verbal
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "P2_1_MOCK",
    "disciplina": "Língua Portuguesa",
    "topico": "P-2.1: Desvio de Pelotão (Flexão)",
    "pergunta_base": "VERIFICAÇÃO: O plural de 'Guarda-civil' e 'Alto-falante' é, respectivamente:",
    "alternativas": [
      {"letra": "A", "texto": "Guardas-civis / Altos-falantes"},
      {"letra": "B", "texto": "Guarda-civis / Alto-falantes"},
      {"letra": "C", "texto": "Guardas-civis / Alto-falantes"},
      {"letra": "D", "texto": "Guardas-civil / Altos-falante"}
    ],
    "resposta_correta": "C",
    "justificativa_edital": "RESUMO: Guarda-civil (Subst + Adj) = Ambos variam. Alto-falante (Adv/Adj invariável + Subst/Adj) = Alto é invariável aqui, só o segundo varia.",
    "recompensa_pd": 15,
    "mechanic": "TRUE_FALSE" // Adapted mechanic for binary choice feel or simple verification
  },

  // 4. P-3.1: Tiro de Coesão - Pronomes (Emprego)
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "P3_1_MOCK",
    "disciplina": "Língua Portuguesa",
    "topico": "P-3.1: Tiro de Coesão (Pronomes)",
    "pergunta_base": "COESÃO: 'O bombeiro ______ coragem salvou a vítima foi condecorado.' Qual pronome relativo completa a frase?",
    "alternativas": [
      {"letra": "A", "texto": "Que a"},
      {"letra": "B", "texto": "Onde a"},
      {"letra": "C", "texto": "Cuja"},
      {"letra": "D", "texto": "A qual"}
    ],
    "resposta_correta": "C",
    "justificativa_edital": "RESUMO: O pronome 'Cujo' (e variações) indica POSSE e liga dois substantivos (Bombeiro e Coragem). Não admite artigo depois (Cuja a coragem = Errado).",
    "recompensa_pd": 15,
    "mechanic": "DEFAULT"
  },

  // 5. P-3.3: Batalha Temporal - Verbos
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "P3_3_MOCK",
    "disciplina": "Língua Portuguesa",
    "topico": "P-3.3: Batalha Temporal",
    "pergunta_base": "ASSOCIAÇÃO: 'Se eu ESTUDASSE, passaria.' O verbo destacado está no:",
    "alternativas": [
      {"letra": "A", "texto": "Pretérito Imperfeito do Subjuntivo"},
      {"letra": "B", "texto": "Futuro do Pretérito do Indicativo"},
      {"letra": "C", "texto": "Pretérito Perfeito do Indicativo"},
      {"letra": "D", "texto": "Futuro do Subjuntivo"}
    ],
    "resposta_correta": "A",
    "justificativa_edital": "RESUMO: A terminação -SSE (estudasse, fizesse) é a marca típica do Pretérito Imperfeito do Subjuntivo, indicando condição ou hipótese passada.",
    "recompensa_pd": 15,
    "mechanic": "DECODE"
  },

  // 6. P-3.4: Transição de Voz - Vozes Verbais
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "P3_4_MOCK",
    "disciplina": "Língua Portuguesa",
    "topico": "P-3.4: Transição de Voz",
    "pergunta_base": "TRANSFORMAÇÃO: 'A banca elaborou a prova.' Na Voz Passiva Sintética (com SE), fica:",
    "alternativas": [
      {"letra": "A", "texto": "A prova foi elaborada."},
      {"letra": "B", "texto": "Elaborou-se a prova."},
      {"letra": "C", "texto": "Elaboraram-se a prova."},
      {"letra": "D", "texto": "Elabora-se a prova."}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: Na Passiva Sintética, usa-se Verbo na 3ª pessoa + SE (Apassivador) + Sujeito Paciente (a prova). O verbo concorda com o sujeito: Elaborou-se a prova.",
    "recompensa_pd": 15,
    "mechanic": "DECODE"
  },

  // 7. P-4.1: Alinhamento de Tropa - Concordância
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "P4_1_MOCK",
    "disciplina": "Língua Portuguesa",
    "topico": "P-4.1: Alinhamento (Concordância)",
    "pergunta_base": "ALINHAMENTO: Identifique a frase com ERRO de concordância verbal.",
    "alternativas": [
      {"letra": "A", "texto": "Faz dez anos que não viajo."},
      {"letra": "B", "texto": "Havia muitos problemas na obra."},
      {"letra": "C", "texto": "Devem haver soluções imediatas."},
      {"letra": "D", "texto": "Existem soluções imediatas."}
    ],
    "resposta_correta": "C",
    "justificativa_edital": "RESUMO: O verbo Haver (sentido de existir) é impessoal e transmite isso ao auxiliar. O correto é 'Deve haver' (singular). 'Existem' é pessoal (plural).",
    "recompensa_pd": 15,
    "mechanic": "SUDDEN_DEATH"
  },

  // 8. P-4.2: Inspeção de Regras - Regência
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "P4_2_MOCK",
    "disciplina": "Língua Portuguesa",
    "topico": "P-4.2: Inspeção de Regras (Regência)",
    "pergunta_base": "INSPEÇÃO: 'O candidato visava ______ cargo público.' Qual a regência correta?",
    "alternativas": [
      {"letra": "A", "texto": "o"},
      {"letra": "B", "texto": "ao"},
      {"letra": "C", "texto": "pelo"},
      {"letra": "D", "texto": "no"}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: O verbo Visar, no sentido de 'almejar/desejar', é Transitivo Indireto e exige a preposição A. Quem visa, visa A alguma coisa (ao cargo).",
    "recompensa_pd": 15,
    "mechanic": "SPEED_RUN"
  },

  // 9. P-4.3: Desarme a Crase
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "P4_3_MOCK",
    "disciplina": "Língua Portuguesa",
    "topico": "P-4.3: Desarme a Crase",
    "pergunta_base": "CÓDIGO A+A: Em qual opção a Crase é OBRIGATÓRIA?",
    "alternativas": [
      {"letra": "A", "texto": "Entreguei o documento a ela."},
      {"letra": "B", "texto": "Fui a pé para casa."},
      {"letra": "C", "texto": "Estamos a espera de um milagre."},
      {"letra": "D", "texto": "Não vou a festa alguma."}
    ],
    "resposta_correta": "C",
    "justificativa_edital": "RESUMO: Em locuções prepositivas de base feminina (à espera de, à procura de), a crase é fixa e obrigatória. 'A ela' (pronome) e 'A pé' (masculino) rejeitam crase.",
    "recompensa_pd": 15,
    "mechanic": "SUDDEN_DEATH"
  },

  // 10. P-4.4: Protocolo de Comunicação - Pontuação
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "P4_4_MOCK",
    "disciplina": "Língua Portuguesa",
    "topico": "P-4.4: Protocolo (Pontuação)",
    "pergunta_base": "PAUSA TÁTICA: Identifique a frase onde a vírgula foi usada CORRETAMENTE para isolar um Aposto.",
    "alternativas": [
      {"letra": "A", "texto": "O soldado, correu muito."},
      {"letra": "B", "texto": "João, o instrutor, chegou cedo."},
      {"letra": "C", "texto": "Os livros, que comprei, sumiram."},
      {"letra": "D", "texto": "Estudei, mas, não passei."}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: 'O instrutor' é um Aposto Explicativo (explica quem é João) e deve vir isolado por vírgulas. A opção A separa sujeito e verbo (Erro Grave).",
    "recompensa_pd": 15,
    "mechanic": "DEFAULT"
  },

  // 11. P-4.5: Vistoria Gramatical - Redação
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "P4_5_MOCK",
    "disciplina": "Língua Portuguesa",
    "topico": "P-4.5: Vistoria Gramatical",
    "pergunta_base": "VISTORIA: Qual frase apresenta ERRO de Colocação Pronominal (Próclise/Ênclise)?",
    "alternativas": [
      {"letra": "A", "texto": "Não me diga isso."},
      {"letra": "B", "texto": "Me empresta o lápis?"},
      {"letra": "C", "texto": "Em se tratando de leis..."},
      {"letra": "D", "texto": "Aquilo me ofendeu."}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: Pela norma culta, não se inicia frase com pronome oblíquo átono. O correto seria 'Empreste-me'. As outras usam atrativos (Não, Em+Gerúndio, Aquilo).",
    "recompensa_pd": 15,
    "mechanic": "DEFAULT"
  },

  // 12. P-4.6: Decodificação de Mensagem - Texto/Semântica
  {
    "desenvolvedor": "Professor João Paulo Silva Dantas",
    "id_questao": "P4_6_MOCK",
    "disciplina": "Língua Portuguesa",
    "topico": "P-4.6: Decodificação (Semântica)",
    "pergunta_base": "INTERROGATÓRIO: 'Estudou muito, PORTANTO passou.' O conectivo destaca ideia de:",
    "alternativas": [
      {"letra": "A", "texto": "Adversidade"},
      {"letra": "B", "texto": "Conclusão"},
      {"letra": "C", "texto": "Explicação"},
      {"letra": "D", "texto": "Causa"}
    ],
    "resposta_correta": "B",
    "justificativa_edital": "RESUMO: 'Portanto' é a conjunção coordenativa conclusiva por excelência. Indica o resultado lógico da ação anterior (estudar muito).",
    "recompensa_pd": 15,
    "mechanic": "DECODE"
  },
];
