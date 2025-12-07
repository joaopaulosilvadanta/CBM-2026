
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Question, GameMechanic, EssayAnalysis } from '../types';

const questionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    desenvolvedor: { type: Type.STRING },
    id_questao: { type: Type.STRING },
    disciplina: { type: Type.STRING },
    topico: { type: Type.STRING },
    pergunta_base: { type: Type.STRING },
    alternativas: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          letra: { type: Type.STRING },
          texto: { type: Type.STRING }
        },
        required: ['letra', 'texto']
      }
    },
    resposta_correta: { type: Type.STRING },
    justificativa_edital: { type: Type.STRING },
    recompensa_pd: { type: Type.INTEGER },
    mechanic: { type: Type.STRING, enum: ['DEFAULT', 'SPEED_RUN', 'SUDDEN_DEATH', 'DECODE', 'TRUE_FALSE'] }
  },
  required: [
    'desenvolvedor',
    'id_questao',
    'disciplina',
    'topico',
    'pergunta_base',
    'alternativas',
    'resposta_correta',
    'justificativa_edital',
    'recompensa_pd'
  ]
};

const essaySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.NUMBER, description: "Nota total de 0 a 20" },
    grammarComments: { type: Type.STRING, description: "Análise gramatical e ortografia" },
    cohesionComments: { type: Type.STRING, description: "Análise de coesão e coerência" },
    argumentationComments: { type: Type.STRING, description: "Análise da argumentação e tema" },
    finalVerdict: { type: Type.STRING, description: "Veredito final curto e militar (APTO/INAPTO)" },
  },
  required: ['score', 'grammarComments', 'cohesionComments', 'argumentationComments', 'finalVerdict']
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface SyllabusItem {
  topic: string;
  discipline: string;
  context: string;
  mechanic: GameMechanic;
}

const SYLLABUS: Record<string, SyllabusItem[]> = {
  'm1': [
    { discipline: 'Língua Portuguesa', mechanic: 'SPEED_RUN', topic: 'P-1.1: Ortografia', context: 'Parônimos (Sessão/Seção/Cessão), Hífen, Mal/Mau.' },
    { discipline: 'Língua Portuguesa', mechanic: 'SUDDEN_DEATH', topic: 'P-1.2: Acentuação', context: 'Proparoxítonas, Hiato, Acentos Diferenciais, Novo Acordo.' },
    { discipline: 'Língua Portuguesa', mechanic: 'TRUE_FALSE', topic: 'P-2.1: Flexão Nominal/Verbal', context: 'Plural de compostos, Grau, Verbos Irregulares.' },
    { discipline: 'Língua Portuguesa', mechanic: 'DEFAULT', topic: 'P-3.1: Pronomes (Emprego)', context: 'Coesão referencial, Pronomes de Tratamento, Relativos.' },
    { discipline: 'Língua Portuguesa', mechanic: 'DEFAULT', topic: 'P-3.2: Pronomes (Colocação)', context: 'Próclise proibida no início, Ênclise, Mesóclise.' },
    { discipline: 'Língua Portuguesa', mechanic: 'DECODE', topic: 'P-3.3: Tempos Verbais', context: 'Valor semântico do Imperfeito vs Perfeito vs Futuro.' },
    { discipline: 'Língua Portuguesa', mechanic: 'DECODE', topic: 'P-3.4: Vozes Verbais', context: 'Transposição da Voz Ativa para Passiva.' },
    { discipline: 'Língua Portuguesa', mechanic: 'SUDDEN_DEATH', topic: 'P-4.1: Concordância', context: 'Verbo Haver/Fazer impessoal, Sujeito Composto.' },
    { discipline: 'Língua Portuguesa', mechanic: 'SPEED_RUN', topic: 'P-4.2: Regência', context: 'Verbos: Assistir, Aspirar, Visar, Chegar A.' },
    { discipline: 'Língua Portuguesa', mechanic: 'SUDDEN_DEATH', topic: 'P-4.3: Crase', context: 'Casos proibidos, fusão A+A, locuções femininas.' },
    { discipline: 'Língua Portuguesa', mechanic: 'DEFAULT', topic: 'P-4.4: Pontuação', context: 'Vírgula entre Sujeito/Verbo, Aposto, Vocativo.' },
    { discipline: 'Língua Portuguesa', mechanic: 'DEFAULT', topic: 'P-4.5: Vistoria Gramatical', context: 'Identificar a única frase correta/incorreta.' },
    { discipline: 'Língua Portuguesa', mechanic: 'DECODE', topic: 'P-4.6: Intelecção de Texto', context: 'Valor semântico de conectivos.' },
  ],
  'm2': [
    { discipline: 'Raciocínio Lógico', mechanic: 'SPEED_RUN', topic: 'Protocolo 1: Estruturas Lógicas', context: 'Equivalências e Negações.' },
    { discipline: 'Raciocínio Lógico', mechanic: 'DEFAULT', topic: 'Protocolo 2: Dedução Tática', context: 'Silogismos, Lógica de Argumentação.' },
    { discipline: 'Raciocínio Lógico', mechanic: 'DECODE', topic: 'Protocolo 3: Diagramas Lógicos', context: 'Interseção de conjuntos, diagramas de Venn.' },
    { discipline: 'Raciocínio Lógico', mechanic: 'DECODE', topic: 'Protocolo 4: Análise de Risco', context: 'Análise Combinatória e Probabilidade.' },
    { discipline: 'Raciocínio Lógico', mechanic: 'DEFAULT', topic: 'Protocolo 5: Associação Lógica', context: 'Problemas de associação.' },
    { discipline: 'Raciocínio Lógico', mechanic: 'TRUE_FALSE', topic: 'Protocolo 6: Verdades e Mentiras', context: 'Descobrir quem mente e quem diz a verdade.' },
  ],
  'm3': [
    { discipline: 'Defesa Civil', mechanic: 'DECODE', topic: 'Setor 1: Protocolo PNPDEC', context: 'Lei 12.608/2012: Competências.' },
    { discipline: 'Defesa Civil', mechanic: 'DEFAULT', topic: 'Setor 2: Gestão de Crises', context: 'IN 01/2012: Emergência vs Calamidade.' },
    { discipline: 'Defesa Civil', mechanic: 'SPEED_RUN', topic: 'Setor 3: Codificação', context: 'COBRADE: Identificar código/tipo de desastre.' },
    { discipline: 'Direito Ambiental', mechanic: 'DECODE', topic: 'Setor 4: Estrutura Legal', context: 'SISNAMA: Conselho Superior, Consultivo, Executor.' },
    { discipline: 'Direito Ambiental', mechanic: 'DEFAULT', topic: 'Setor 5: Crimes e Punições', context: 'Lei de Crimes Ambientais.' },
    { discipline: 'Direito Ambiental', mechanic: 'TRUE_FALSE', topic: 'Setor 6: Sustentabilidade', context: 'Gestão Ambiental, Resíduos Sólidos.' },
  ],
  'm4': [
    { discipline: 'Legislação', mechanic: 'SPEED_RUN', topic: 'Eixo 1: Ingresso', context: 'Arts 1-18 LC 194/2012: Requisitos, Etapas.' },
    { discipline: 'Legislação', mechanic: 'DECODE', topic: 'Eixo 2: Hierarquia', context: 'Arts 22-37 LC 194/2012: Posto, Graduação, Promoção.' },
    { discipline: 'Legislação', mechanic: 'TRUE_FALSE', topic: 'Eixo 3: Ética', context: 'Arts 38-58 LC 194/2012: Deveres, Proibições.' },
    { discipline: 'Legislação', mechanic: 'DEFAULT', topic: 'Eixo 4: Direitos', context: 'Arts 59-123 LC 194/2012: Licenças, Agregação, Reforma.' },
  ],
  'm5': [
    { discipline: 'Física', mechanic: 'SPEED_RUN', topic: 'Bancada 1: Mecânica', context: 'Balística, Hidrostática.' },
    { discipline: 'Física', mechanic: 'DEFAULT', topic: 'Bancada 2: Termodinâmica', context: 'Gases, Dilatação, Calorimetria.' },
    { discipline: 'Física', mechanic: 'DECODE', topic: 'Bancada 3: Eletricidade', context: 'Leis de Ohm, Circuitos.' },
    { discipline: 'Química', mechanic: 'TRUE_FALSE', topic: 'Estação 1: Estrutura', context: 'Tabela, Ligações.' },
    { discipline: 'Química', mechanic: 'DECODE', topic: 'Estação 2: Reações', context: 'Estequiometria, pH.' },
    { discipline: 'Química', mechanic: 'SPEED_RUN', topic: 'Estação 3: Orgânica', context: 'Funções orgânicas, Termoquímica.' },
  ],
  'm6': [
    { discipline: 'História RR', mechanic: 'SPEED_RUN', topic: 'Setor 1: Linha do Tempo', context: 'Forte São Joaquim, Território, Estado.' },
    { discipline: 'Geografia RR', mechanic: 'DECODE', topic: 'Setor 2: Terreno', context: 'Relevo, Hidrografia, Vegetação.' },
    { discipline: 'Atualidades', mechanic: 'TRUE_FALSE', topic: 'Setor 3: Cenário', context: 'Migração, Questão Ambiental.' }
  ],
  'm7': [
    { discipline: 'Informática', mechanic: 'DECODE', topic: 'Firewall 1: Sistemas', context: 'Linux/Windows, Office.' },
    { discipline: 'Informática', mechanic: 'DEFAULT', topic: 'Firewall 2: Redes', context: 'Internet, Navegadores, Email.' },
    { discipline: 'Informática', mechanic: 'SUDDEN_DEATH', topic: 'Firewall 3: Segurança', context: 'Malware, Antivírus, Backup.' }
  ],
  'm_bizu': [
    { discipline: 'Geral', mechanic: 'SPEED_RUN', topic: 'Mnemônicos', context: 'Macetes de todas as matérias.' }
  ]
};

const usedTopicsHistory: Record<string, Set<string>> = {};

const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// ------------------------------------------------------------------
// QUESTION GENERATION SERVICE
// ------------------------------------------------------------------
export const generateLegislationQuestion = async (moduleId?: string): Promise<Question | null> => {
  try {
    const model = 'gemini-2.5-flash';
    const targetModuleId = moduleId || 'general';

    if (!usedTopicsHistory[targetModuleId]) {
        usedTopicsHistory[targetModuleId] = new Set();
    }

    let availableItems: SyllabusItem[] = [];
    if (moduleId && SYLLABUS[moduleId]) {
      availableItems = SYLLABUS[moduleId];
    } else {
      availableItems = Object.values(SYLLABUS).flat();
    }

    const candidates = availableItems.filter(item => !usedTopicsHistory[targetModuleId].has(item.topic));
    let selectedItem: SyllabusItem;

    if (candidates.length > 0) {
        selectedItem = getRandomItem(candidates);
    } else {
        usedTopicsHistory[targetModuleId].clear();
        selectedItem = getRandomItem(availableItems);
    }

    if (selectedItem) {
        usedTopicsHistory[targetModuleId].add(selectedItem.topic);
    } else {
        // Fallback if syllabus empty
        selectedItem = { topic: 'Geral', discipline: 'Geral', context: 'Concurso', mechanic: 'DEFAULT' };
    }

    const prompt = `
      Crie uma questão de múltipla escolha para concurso CBM-RR.
      Disciplina: ${selectedItem.discipline}
      Tópico: ${selectedItem.topic}
      Contexto: ${selectedItem.context}
      Mecânica: ${selectedItem.mechanic}
      
      JSON OUTPUT FORMAT:
      {
        "desenvolvedor": "Prof. João Paulo Silva Dantas",
        "id_questao": "GEN_${Date.now()}",
        "disciplina": "${selectedItem.discipline}",
        "topico": "${selectedItem.topic}",
        "pergunta_base": "Enunciado da questão",
        "alternativas": [{"letra": "A", "texto": "..."}, ...],
        "resposta_correta": "A",
        "justificativa_edital": "RESUMO: Explicação curta.",
        "recompensa_pd": 15,
        "mechanic": "${selectedItem.mechanic}"
      }
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: questionSchema,
        temperature: 0.9,
      },
    });

    if (response.text) {
      let cleanText = response.text.trim();
      // Remove markdown code blocks if present
      if (cleanText.startsWith('```json')) {
          cleanText = cleanText.replace(/^```json/, '').replace(/```$/, '');
      }
      return JSON.parse(cleanText) as Question;
    }
    return null;
  } catch (error) {
    console.error("Gemini Gen Error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// PRACTICE QUESTION SERVICE (FOR CHATBOT)
// ------------------------------------------------------------------
export const generatePracticeQuestion = async (): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Gere uma questão curta de múltipla escolha (A,B,C,D) sobre Legislação Militar de Roraima (LC 194/2012) ou Português.
      Formate como texto simples, legível para chat.
      No final, coloque "Resposta: X" e uma breve explicação.
    `;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt
    });
    return response.text || "Erro ao gerar questão.";
  } catch (error) {
    return "Não foi possível gerar a questão no momento.";
  }
};

// ------------------------------------------------------------------
// CHAT BOT SERVICE
// ------------------------------------------------------------------
export const getChatResponse = async (message: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const chat = ai.chats.create({
      model: model,
      history: history,
      config: {
        systemInstruction: "Você é o Sargento Virtual do CBM-RR. Responda dúvidas de concurso de forma militar e direta.",
      }
    });
    const result = await chat.sendMessage({ message: message });
    return result.text || "QSL?";
  } catch (error) {
    return "Falha na comunicação. Tente novamente.";
  }
};

// ------------------------------------------------------------------
// ESSAY CORRECTION SERVICE
// ------------------------------------------------------------------
export const analyzeEssay = async (base64Image: string): Promise<EssayAnalysis | null> => {
  try {
    const model = 'gemini-3-pro-preview';
    const prompt = `
      Corrija esta redação para concurso CBM-RR.
      JSON Obrigatório:
      {
        "score": number (0-20),
        "grammarComments": "string",
        "cohesionComments": "string",
        "argumentationComments": "string",
        "finalVerdict": "string"
      }
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: base64Image } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: essaySchema,
      }
    });

    if (response.text) {
      let cleanText = response.text.trim();
      if (cleanText.startsWith('```json')) {
          cleanText = cleanText.replace(/^```json/, '').replace(/```$/, '');
      }
      return JSON.parse(cleanText) as EssayAnalysis;
    }
    return null;
  } catch (error) {
    console.error("Essay Error:", error);
    return null;
  }
};

export const geminiClient = ai;
