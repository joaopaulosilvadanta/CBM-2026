
import React, { useState, useEffect, useRef } from 'react';
import { Question, Bizu, BizuType, UserProfile, GameMechanic, GameSettings } from '../types';
import { generateLegislationQuestion } from '../services/geminiService';
import { MOCK_QUESTIONS, BIZUS } from '../constants';
import { Timer, Zap, AlertTriangle, ArrowRight, Brain, Medal, BookOpen, ShieldCheck, Users, Bomb, Crosshair, Info, CheckCircle } from 'lucide-react';

interface GameScreenProps {
  onEndGame: (pdEarned: number) => void;
  onOxygenDepleted: () => void;
  user: UserProfile;
  onSpendPd: (amount: number) => void;
  onLoseOxygen: (amount: number) => void;
  activeModuleId: string;
  activeBizus: BizuType[];
  setActiveBizus: React.Dispatch<React.SetStateAction<BizuType[]>>;
  settings: GameSettings;
}

export const GameScreen: React.FC<GameScreenProps> = ({ 
  onEndGame, 
  user, 
  onSpendPd, 
  onLoseOxygen, 
  activeModuleId,
  activeBizus,
  setActiveBizus,
  settings
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(settings.questionTime);
  const [selectedAlt, setSelectedAlt] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [sessionPd, setSessionPd] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Audio
  useEffect(() => {
    if (settings.soundEnabled && !audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, [settings.soundEnabled]);

  const playSound = (type: 'TICK' | 'SUCCESS' | 'ERROR' | 'ALERT') => {
    if (!settings.soundEnabled || !audioCtxRef.current) return;
    
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    const now = audioCtxRef.current.currentTime;

    if (type === 'TICK') {
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.1, now);
        osc.start(now);
        osc.stop(now + 0.05);
    } else if (type === 'ALERT') {
        osc.frequency.setValueAtTime(600, now);
        osc.type = 'square';
        gain.gain.setValueAtTime(0.1, now);
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (type === 'SUCCESS') {
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        osc.start(now);
        osc.stop(now + 0.2);
    } else if (type === 'ERROR') {
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.2);
        osc.type = 'sawtooth';
        gain.gain.setValueAtTime(0.1, now);
        osc.start(now);
        osc.stop(now + 0.3);
    }
  };

  useEffect(() => {
    loadQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex]);

  useEffect(() => {
      if (activeBizus.includes('HINT')) setHintVisible(true);
  }, [activeBizus]);

  const loadQuestion = async () => {
    setLoading(true);
    setHintVisible(false);
    
    let q: Question | null = null;
    const moduleMocks = MOCK_QUESTIONS.filter(mq => {
        if (activeModuleId === 'm4') return mq.id_questao.startsWith('M4');
        if (activeModuleId === 'm1') return mq.id_questao.startsWith('P'); 
        if (activeModuleId === 'm2') return mq.id_questao.startsWith('M2');
        if (activeModuleId === 'm3') return mq.id_questao.startsWith('M3');
        if (activeModuleId === 'm5') return mq.id_questao.startsWith('M5');
        if (activeModuleId === 'm6') return mq.id_questao.startsWith('M6');
        if (activeModuleId === 'm7') return mq.id_questao.startsWith('M7');
        if (activeModuleId === 'm_bizu') return mq.id_questao.startsWith('BIZU');
        return true;
    });

    if (questionIndex < moduleMocks.length) {
      q = moduleMocks[questionIndex];
    } else {
      try {
        if (process.env.API_KEY) {
            q = await generateLegislationQuestion(activeModuleId);
        }
      } catch (e) {
        console.error("Gemini failed");
      }
      if (!q) q = moduleMocks[questionIndex % moduleMocks.length];
    }

    setCurrentQuestion(JSON.parse(JSON.stringify(q)));
    
    // Adjust time based on difficulty or settings
    let time = settings.questionTime;
    if (q?.mechanic === 'SPEED_RUN') time = Math.min(time, 10); // Force speed for Speed Run mechanic
    setTimeLeft(time);
    
    setSelectedAlt(null);
    setIsAnswered(false);
    setLoading(false);
    startTimeRef.current = Date.now();
  };

  useEffect(() => {
    if (!loading && !isAnswered && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 5 && prev > 0) playSound('ALERT');
          if (prev <= 1) {
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isAnswered, timeLeft]);

  const handleTimeOut = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsAnswered(true);
    handleAnswer(null);
  };

  const handleAnswer = (letra: string | null) => {
    if (isAnswered || !currentQuestion) return;
    if (timerRef.current) clearInterval(timerRef.current);
    
    setSelectedAlt(letra || 'TIMEOUT');
    setIsAnswered(true);

    const timeTaken = (Date.now() - startTimeRef.current) / 1000;
    const isCorrect = letra === currentQuestion.resposta_correta;
    const mechanic = currentQuestion.mechanic || 'DEFAULT';
    
    let pdEarned = 0;

    if (isCorrect) {
      playSound('SUCCESS');
      let basePoints = 15;
      if (timeTaken < 5) basePoints = mechanic === 'SPEED_RUN' ? 25 : 20;
      pdEarned = basePoints;
      if (activeBizus.includes('MULTIPLIER')) pdEarned *= 2;
    } else {
      playSound('ERROR');
      if (activeBizus.includes('SHIELD')) {
        pdEarned = 0;
        consumeBizu('SHIELD');
      } else {
        if (mechanic === 'SUDDEN_DEATH') {
            pdEarned = -10;
            onLoseOxygen(1);
        } else {
            pdEarned = -5;
        }
      }
    }
    setSessionPd((prev) => prev + pdEarned);
  };

  const handleBuyBizu = (bizu: Bizu) => {
    if (user.pd < bizu.cost || isAnswered || activeBizus.includes(bizu.id)) return;
    onSpendPd(bizu.cost);
    if (bizu.id === 'FIFTY_FIFTY') applyFiftyFifty();
    if (bizu.id === 'HINT') setHintVisible(true);
    setActiveBizus(prev => [...prev, bizu.id]);
  };

  const consumeBizu = (id: BizuType) => {
    setActiveBizus(prev => prev.filter(b => b !== id));
  };

  const applyFiftyFifty = () => {
    if (!currentQuestion) return;
    const incorrects = currentQuestion.alternativas.filter(a => a.letra !== currentQuestion.resposta_correta);
    const toEliminate = incorrects.sort(() => 0.5 - Math.random()).slice(0, 2);
    const newAlts = currentQuestion.alternativas.map(alt => {
      if (toEliminate.find(e => e.letra === alt.letra)) return { ...alt, isEliminated: true };
      return alt;
    });
    setCurrentQuestion({ ...currentQuestion, alternativas: newAlts });
  };

  const nextQuestion = () => {
    setHintVisible(false);
    setActiveBizus(prev => prev.filter(b => b === 'MULTIPLIER' || b === 'SHIELD'));
    if (questionIndex >= 14) onEndGame(sessionPd);
    else setQuestionIndex(prev => prev + 1);
  };

  const getBizuIcon = (iconName: string) => {
    switch(iconName) {
        case 'Award': return <Medal size={16} />;
        case 'BookOpen': return <BookOpen size={16} />;
        case 'ShieldCheck': return <ShieldCheck size={16} />;
        case 'Users': return <Users size={16} />;
        default: return <Zap size={16} />;
    }
  };

  const getMechanicBadge = (mechanic?: GameMechanic) => {
      if (mechanic === 'SPEED_RUN') return <div className="flex items-center gap-1 bg-yellow-600 text-white text-xs px-2 py-1 rounded font-bold animate-pulse"><Zap size={12} fill="currentColor" /> TIRO RÁPIDO</div>;
      if (mechanic === 'SUDDEN_DEATH') return <div className="flex items-center gap-1 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold"><Bomb size={12} fill="currentColor" /> MINA TERRESTRE (-O₂)</div>;
      if (mechanic === 'DECODE') return <div className="flex items-center gap-1 bg-blue-600 text-white text-xs px-2 py-1 rounded font-bold"><Crosshair size={12} /> DECODIFICAÇÃO</div>;
      if (mechanic === 'TRUE_FALSE') return <div className="flex items-center gap-1 bg-purple-600 text-white text-xs px-2 py-1 rounded font-bold"><CheckCircle size={12} /> JULGAMENTO (V/F)</div>;
      return null;
  };

  if (loading || !currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-white animate-pulse">
        <Brain className="w-12 h-12 mb-4 text-red-500" />
        <p className="font-mono">CARREGANDO DADOS TÁTICOS...</p>
      </div>
    );
  }

  const isTrueFalse = currentQuestion.mechanic === 'TRUE_FALSE';
  const summaryTitle = activeModuleId === 'm4' ? 'Norma em Foco' : 'Resumo Tático';

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col h-full relative">
      {hintVisible && (
        <div className="w-full bg-blue-900 text-white text-xs font-bold py-2 px-4 rounded-lg mb-4 flex items-center justify-center gap-2 border border-blue-500">
            <BookOpen size={16} /> BIZU ATIVO: CONSULTA AO MANUAL
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-mono">TEMPO</span>
            <div className="flex items-end gap-2">
                <Timer className={`${timeLeft <= 5 ? 'text-red-500 animate-bounce' : 'text-white'}`} />
                <span className={`text-4xl font-bold font-mono ${timeLeft <= 5 ? 'text-red-500' : 'text-white'}`}>{timeLeft}s</span>
            </div>
        </div>
        <div className="text-right">
             <span className="text-xs text-gray-400 font-mono">RECOMPENSA</span>
             <div className={`text-2xl font-bold flex items-center justify-end gap-1 ${sessionPd >= 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                {sessionPd} <Medal size={20} />
             </div>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-800 rounded-full mb-8 overflow-hidden">
        <div className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 3 ? 'bg-red-600' : 'bg-blue-500'}`} style={{ width: `${(timeLeft / settings.questionTime) * 100}%` }} />
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-700 relative overflow-hidden flex-grow flex flex-col justify-center">
        <div className="absolute top-0 left-0 bg-gray-700 px-4 py-1 rounded-br-xl border-b border-r border-gray-600 flex gap-2 items-center">
            <span className="text-xs text-gray-300 font-mono tracking-wider uppercase">{currentQuestion.topico}</span>
            {getMechanicBadge(currentQuestion.mechanic)}
        </div>

        {hintVisible && (
            <div className="mt-8 mb-2 p-3 bg-blue-950/50 border-l-4 border-blue-500 rounded-r text-blue-200 text-sm font-serif italic">
                "{currentQuestion.justificativa_edital.replace('RESUMO:', '').trim().substring(0, 150)}..."
            </div>
        )}

        <h3 className={`text-lg md:text-xl font-bold text-white mb-8 ${hintVisible ? 'mt-4' : 'mt-6'}`}>{currentQuestion.pergunta_base}</h3>

        <div className={`grid gap-3 ${isTrueFalse ? 'grid-cols-2 h-32' : 'grid-cols-1'}`}>
            {currentQuestion.alternativas.map((alt) => {
                let btnClass = "bg-gray-700 hover:bg-gray-600 border-gray-600";
                if (alt.isEliminated) btnClass = "bg-gray-900 border-gray-800 text-gray-600 opacity-50 cursor-not-allowed";
                else if (isAnswered) {
                    if (alt.letra === currentQuestion.resposta_correta) btnClass = "bg-emerald-900/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500";
                    else if (alt.letra === selectedAlt) btnClass = "bg-yellow-900/80 border-yellow-500 text-yellow-100 ring-2 ring-yellow-500";
                    else btnClass = "bg-gray-800 border-gray-700 text-gray-500 opacity-60";
                }
                return (
                    <button key={alt.letra} disabled={isAnswered || !!alt.isEliminated} onClick={() => handleAnswer(alt.letra)} className={`p-4 rounded-lg border-l-4 transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-4 ${btnClass} ${isTrueFalse ? 'flex-col text-center' : 'text-left w-full'}`}>
                        {!isTrueFalse && <span className="font-bold font-mono text-lg opacity-70">{alt.letra}</span>}
                        <span className="font-bold text-sm md:text-lg uppercase">{alt.texto}</span>
                    </button>
                )
            })}
        </div>

        {isAnswered && (
            <div className={`mt-6 p-4 rounded-lg border border-l-4 animate-in fade-in slide-in-from-bottom-4 duration-300 ${selectedAlt === currentQuestion.resposta_correta ? 'bg-emerald-950/40 border-emerald-500' : 'bg-red-950/40 border-red-500'}`}>
                <div className="flex items-center gap-3 mb-3">
                    {selectedAlt === currentQuestion.resposta_correta ? <Medal className="text-emerald-500" /> : <AlertTriangle className="text-red-500" />}
                    <p className={`font-bold text-sm uppercase tracking-wider ${selectedAlt === currentQuestion.resposta_correta ? 'text-emerald-400' : 'text-red-400'}`}>
                            {selectedAlt === currentQuestion.resposta_correta ? "ALVO NEUTRALIZADO (+PD)" : (currentQuestion.mechanic === 'SUDDEN_DEATH' ? "MINA DETONADA! (-O₂)" : "BAIXA TÁTICA (ERRO)")}
                    </p>
                </div>
                <div className="bg-gray-900/60 p-3 rounded border border-gray-700/50">
                    <div className="flex items-center gap-2 mb-2 pb-1 border-b border-gray-700/50">
                        <Info size={14} className="text-blue-400"/>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">{summaryTitle}</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed font-serif tracking-wide">{currentQuestion.justificativa_edital}</p>
                </div>
            </div>
        )}
      </div>

      <div className="mt-6">
        {!isAnswered ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BIZUS.map((bizu) => (
                    <button key={bizu.id} onClick={() => handleBuyBizu(bizu)} disabled={user.pd < bizu.cost || activeBizus.includes(bizu.id)} className={`flex flex-col items-center justify-center p-2 rounded border transition-all relative ${activeBizus.includes(bizu.id) ? 'bg-emerald-900/50 border-emerald-500 text-emerald-400' : (user.pd >= bizu.cost ? 'bg-gray-800 border-gray-700 hover:border-yellow-500 text-gray-300' : 'bg-gray-900 border-gray-800 text-gray-600 opacity-50 cursor-not-allowed')}`}>
                        <div className="mb-1">{getBizuIcon(bizu.icon)}</div>
                        <span className="text-[10px] uppercase font-bold text-center">{bizu.name}</span>
                        <span className="text-xs font-mono mt-1 text-yellow-500">{bizu.cost} PD</span>
                    </button>
                ))}
            </div>
        ) : (
             <button onClick={nextQuestion} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded bg-white text-gray-900 hover:bg-gray-200 font-bold shadow-lg transition-all uppercase tracking-widest">
                Próxima Missão <ArrowRight size={16} />
             </button>
        )}
      </div>
    </div>
  );
};
