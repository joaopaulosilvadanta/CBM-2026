
export interface Alternative {
  letra: string;
  texto: string;
  isEliminated?: boolean; // For 'Ajuda do Antigo'
}

export type GameMechanic = 'DEFAULT' | 'SPEED_RUN' | 'SUDDEN_DEATH' | 'DECODE' | 'TRUE_FALSE';

export interface Question {
  desenvolvedor: string;
  id_questao: string;
  disciplina: string;
  topico: string; // E.g., "P-1: Ortografia"
  pergunta_base: string;
  alternativas: Alternative[];
  resposta_correta: string;
  justificativa_edital: string;
  recompensa_pd: number;
  mechanic?: GameMechanic;
}

export enum GameState {
  MENU = 'MENU',
  RESOURCES_VIEW = 'RESOURCES_VIEW',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
  LEVEL_UP = 'LEVEL_UP'
}

export interface CareerRank {
  id: number;
  title: string;
  category: 'PRAÇA' | 'OFICIAL';
  courseName: string;
  minXp: number;
  rewardDescription: string;
}

export interface UserProfile {
  name: string;
  pd: number;
  oxygen: number;
  maxOxygen: number;
  level: number;
  xp: number;
  rankTitle: string;
  modulesCompleted: string[];
  unlockedSkins: boolean;
  unlockedExtraModule: boolean;
  unlockedAdvancedBizus: boolean;
}

export interface ModuleInfo {
  id: string;
  code: string;
  name: string;
  description: string;
  questionsCount: number;
  unlocked: boolean;
  minLevel?: number;
  difficulty: number;
}

export type BizuType = 'MULTIPLIER' | 'HINT' | 'SHIELD' | 'FIFTY_FIFTY';

export interface Bizu {
  id: BizuType;
  name: string;
  cost: number;
  description: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isPracticeQuestion?: boolean; // Marker for generated questions
}

export interface EssayAnalysis {
  score: number;
  grammarComments: string;
  cohesionComments: string;
  argumentationComments: string;
  finalVerdict: string;
}

export interface GameSettings {
  questionTime: number; // 10, 20, 30, 40, 60
  soundEnabled: boolean;
}

export type ArsenalAction = 'VIDEO' | 'PDF' | 'IMAGE' | 'ESSAY_CORRECTION';

export interface TutorialStep {
  targetId?: string; // ID of element to highlight (if any)
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}
