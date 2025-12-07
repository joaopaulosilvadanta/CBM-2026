
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TacticalMap } from './components/TacticalMap';
import { GameScreen } from './components/GameScreen';
import { BizuResourcesScreen } from './components/BizuResourcesScreen'; 
import { AIAssistant } from './components/AIAssistant'; 
import { SettingsModal } from './components/SettingsModal';
import { ProfessorAvatar } from './components/ProfessorAvatar';
import { TutorialOverlay } from './components/TutorialOverlay';
import { UserProfile, GameState, ModuleInfo, BizuType, GameSettings, ArsenalAction } from './types';
import { INITIAL_USER, CAREER_PATH } from './constants';
import { RefreshCw, Medal, Star, GraduationCap } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [activeModule, setActiveModule] = useState<ModuleInfo | null>(null);
  const [activeBizus, setActiveBizus] = useState<BizuType[]>([]); 
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{ newRank: string; courseName: string; rewards: string }>({ newRank: '', courseName: '', rewards: '' });
  
  // Settings State
  const [settings, setSettings] = useState<GameSettings>({ questionTime: 10, soundEnabled: true });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Tutorial State
  const [showTutorial, setShowTutorial] = useState(false);

  // AI Assistant State Control
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [aiAssistantTab, setAiAssistantTab] = useState<'CHAT' | 'RADIO' | 'ESSAY'>('CHAT');
  const [aiPersona, setAiPersona] = useState<'DEFAULT' | 'PROFESSOR'>('DEFAULT');

  useEffect(() => {
    // Check first time visit for Tutorial
    const hasSeenTutorial = localStorage.getItem('cbmrr_main_tutorial');
    if (!hasSeenTutorial) {
        setShowTutorial(true);
    }

    const interval = setInterval(() => {
      setUser(u => {
        if (u.oxygen < u.maxOxygen) return { ...u, oxygen: u.oxygen + 1 };
        return u;
      });
    }, 1800000); 
    return () => clearInterval(interval);
  }, []);

  const handleCloseTutorial = () => {
      setShowTutorial(false);
      localStorage.setItem('cbmrr_main_tutorial', 'true');
  };

  const handleStartModule = (module: ModuleInfo) => {
    if (user.oxygen <= 0) { alert("Oxigênio insuficiente!"); return; }
    if (module.minLevel && user.level < module.minLevel) { alert(`Requer nível ${module.minLevel}.`); return; }

    setUser(prev => ({ ...prev, oxygen: prev.oxygen - 1 }));
    setActiveModule(module);
    setActiveBizus([]); 
    
    if (module.code === 'ELITE') {
        setGameState(GameState.RESOURCES_VIEW);
    } else {
        setGameState(GameState.PLAYING);
    }
  };

  const handleArsenalAction = (action: ArsenalAction) => {
      if (action === 'ESSAY_CORRECTION') {
          setAiAssistantTab('ESSAY');
          setAiPersona('DEFAULT');
          setAiAssistantOpen(true);
      }
  };

  const openProfessorChat = () => {
      setAiAssistantTab('CHAT');
      setAiPersona('PROFESSOR');
      setAiAssistantOpen(true);
  };

  const handleEndGame = (sessionPd: number) => {
    const difficultyMultiplier = activeModule?.difficulty || 1;
    const xpGained = Math.max(0, sessionPd * difficultyMultiplier * 10);
    
    let newUser = { ...user, pd: user.pd + sessionPd, xp: user.xp + xpGained };
    const currentRankIndex = CAREER_PATH.findIndex(r => r.id === newUser.level);
    
    if (currentRankIndex !== -1 && currentRankIndex < CAREER_PATH.length - 1) {
        const nextRank = CAREER_PATH[currentRankIndex + 1];
        if (newUser.xp >= nextRank.minXp) {
            newUser.level = nextRank.id;
            newUser.rankTitle = nextRank.title;
            if (newUser.level === 2) newUser.unlockedSkins = true;
            if (newUser.level === 6) newUser.unlockedAdvancedBizus = true;
            if (newUser.level === 7) newUser.unlockedExtraModule = true;
            if (newUser.level === 9) { newUser.maxOxygen += 2; newUser.oxygen += 2; }

            setLevelUpData({ newRank: nextRank.title, courseName: nextRank.courseName, rewards: nextRank.rewardDescription });
            setShowLevelUp(true);
        }
    }
    setUser(newUser);
    setGameState(GameState.GAME_OVER);
    setActiveBizus([]);
  };

  const returnToMenu = () => {
    setShowLevelUp(false);
    setGameState(GameState.MENU);
    setActiveModule(null);
    setActiveBizus([]);
  };

  const currentRankInfo = CAREER_PATH.find(r => r.id === user.level);
  const nextRankInfo = CAREER_PATH.find(r => r.id === user.level + 1);
  const nextLevelXpDisplay = nextRankInfo ? nextRankInfo.minXp : user.xp;
  const userForHeader = { ...user, nextLevelXp: nextLevelXpDisplay };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col font-sans">
      <Header user={userForHeader} activeBizus={activeBizus} onReturnHome={returnToMenu} onOpenSettings={() => setIsSettingsOpen(true)} />

      <main className="flex-grow container mx-auto px-4 py-8 relative">
        {gameState === GameState.MENU && (
          <>
            <TacticalMap onSelectModule={handleStartModule} userLevel={user.level} />
            <ProfessorAvatar onOpenChat={openProfessorChat} />
          </>
        )}

        {gameState === GameState.RESOURCES_VIEW && (
            <BizuResourcesScreen onStartQuiz={() => setGameState(GameState.PLAYING)} onAction={handleArsenalAction} />
        )}

        {gameState === GameState.PLAYING && (
          <GameScreen 
            onEndGame={handleEndGame} 
            onOxygenDepleted={() => setGameState(GameState.MENU)}
            user={user}
            onSpendPd={amount => setUser(prev => ({ ...prev, pd: prev.pd - amount }))}
            onLoseOxygen={amount => setUser(prev => ({ ...prev, oxygen: Math.max(0, prev.oxygen - amount) }))}
            activeModuleId={activeModule?.id || ''}
            activeBizus={activeBizus}
            setActiveBizus={setActiveBizus}
            settings={settings}
          />
        )}

        {gameState === GameState.GAME_OVER && (
          <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center shadow-2xl mt-12 animate-in zoom-in duration-300">
            {showLevelUp ? (
                <div className="mb-6 bg-gradient-to-br from-yellow-600 to-yellow-800 p-6 rounded-xl border-2 border-yellow-400 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex justify-center mb-2"><GraduationCap className="w-16 h-16 text-white animate-bounce" /></div>
                      <h2 className="text-xl font-bold text-yellow-100 uppercase tracking-wider mb-1">Curso Concluído!</h2>
                      <p className="text-yellow-200 font-bold text-sm mb-4 bg-black/30 inline-block px-3 py-1 rounded shadow-inner">{levelUpData.courseName}</p>
                      <div className="bg-black/40 p-4 rounded-lg mb-2 border border-yellow-500/30">
                          <p className="text-gray-300 text-[10px] uppercase mb-1 tracking-widest">Você foi promovido a</p>
                          <p className="text-white font-mono text-xl font-extrabold uppercase text-shadow-sm">{levelUpData.newRank}</p>
                      </div>
                      <div className="mt-3 bg-yellow-900/40 p-2 rounded border border-yellow-500/20">
                        <p className="text-yellow-200 text-xs font-bold flex items-center justify-center gap-2"><Star size={14} fill="currentColor" /> {levelUpData.rewards}</p>
                      </div>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-gray-700"><Medal className="text-yellow-400 w-10 h-10" /></div>
            )}
            <h2 className="text-3xl font-bold text-white mb-2">MISSÃO CUMPRIDA</h2>
            <div className="bg-gray-900 p-4 rounded-lg mb-8">
                <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Pontos de Distinção</p>
                <p className="text-3xl font-mono text-yellow-400 font-bold flex justify-center items-center gap-2">{user.pd} PD</p>
            </div>
            <button onClick={returnToMenu} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors uppercase tracking-wider"><RefreshCw size={20} /> Retornar à Base</button>
          </div>
        )}
      </main>

      <AIAssistant 
        isOpen={aiAssistantOpen} 
        onClose={() => setAiAssistantOpen(false)} 
        onOpen={() => setAiAssistantOpen(true)}
        initialTab={aiAssistantTab} 
        persona={aiPersona}
      />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} settings={settings} onUpdateSettings={setSettings} />
      {showTutorial && <TutorialOverlay onClose={handleCloseTutorial} />}

      <footer className="bg-gray-900 border-t border-gray-800 py-6 text-center">
        <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">Desenvolvido por Prof. João Paulo Silva Dantas</p>
      </footer>
    </div>
  );
}
