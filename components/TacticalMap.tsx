
import React, { useState, useEffect } from 'react';
import { ModuleInfo, TutorialStep } from '../types';
import { MODULES } from '../constants';
import { Lock, Play, Star, MapPin, Shield, HelpCircle, X } from 'lucide-react';

interface TacticalMapProps {
  onSelectModule: (module: ModuleInfo) => void;
  userLevel: number;
}

export const TacticalMap: React.FC<TacticalMapProps> = ({ onSelectModule, userLevel }) => {
  const [showMapTutorial, setShowMapTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  // Simple tutorial state check (can be expanded to localStorage)
  useEffect(() => {
      const hasSeen = localStorage.getItem('cbmrr_map_tutorial');
      if (!hasSeen) {
          setShowMapTutorial(true);
      }
  }, []);

  const closeTutorial = () => {
      setShowMapTutorial(false);
      localStorage.setItem('cbmrr_map_tutorial', 'true');
  };

  const steps: TutorialStep[] = [
      { title: "Mapa de Operações", content: "Bem-vindo ao centro tático. Aqui você escolhe suas missões de estudo." },
      { title: "Módulos Bloqueados", content: "Alguns setores exigem patente superior. Suba de nível para desbloquear!" },
      { title: "Arsenal de Guerra", content: "Acesse o módulo de ELITE para bizus, vídeos e macetes rápidos." },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 relative">
      <div className="text-center mb-10 flex justify-center items-center relative">
        <div>
            <h2 className="text-3xl font-extrabold text-white uppercase tracking-tighter mb-2">
            Mapa de <span className="text-red-500">Operações</span>
            </h2>
            <p className="text-gray-400 text-sm font-mono">
            Selecione o setor para iniciar a missão.
            </p>
        </div>
        <button onClick={() => { setTutorialStep(0); setShowMapTutorial(true); }} className="absolute right-0 top-0 text-gray-500 hover:text-white p-2">
            <HelpCircle size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {/* Visual Connector Line (Desktop Only) */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-10 rounded-full"></div>

        {MODULES.map((module) => {
          // Corrected Locking Logic
          const isLocked = !module.unlocked || (module.minLevel !== undefined && userLevel < module.minLevel);
          const isElite = module.code === 'ELITE';
          
          return (
            <div 
              key={module.id}
              onClick={() => !isLocked && onSelectModule(module)}
              className={`
                relative p-6 rounded-2xl border-2 flex flex-col justify-between h-48 transition-all duration-300 transform
                ${isLocked 
                  ? 'bg-gray-900 border-gray-800 opacity-70 grayscale cursor-not-allowed' 
                  : `cursor-pointer hover:-translate-y-2 hover:shadow-2xl 
                     ${isElite ? 'bg-gray-800 border-yellow-600 shadow-yellow-900/20' : 'bg-gray-800 border-gray-600 hover:border-red-500 shadow-red-900/10'}`
                }
              `}
            >
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${isElite ? 'bg-yellow-900/30 text-yellow-500' : 'bg-gray-700 text-gray-300'}`}>
                   {isElite ? <Star size={24} fill="currentColor" /> : <Shield size={24} />}
                </div>
                {isLocked ? <Lock className="text-gray-600" /> : <Play className={`${isElite ? 'text-yellow-500' : 'text-red-500'}`} fill="currentColor" />}
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 mb-1 block">
                    {module.code}
                </span>
                <h3 className={`text-lg font-bold leading-tight ${isElite ? 'text-yellow-400' : 'text-white'}`}>
                    {module.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{module.description}</p>
              </div>

              {/* Status Indicator */}
              <div className={`h-1 w-full mt-4 rounded-full ${isLocked ? 'bg-gray-700' : (isElite ? 'bg-yellow-600' : 'bg-red-600')}`}></div>
              
              {/* Level Requirement Badge */}
              {module.minLevel && module.minLevel > 1 && isLocked && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black border border-gray-700 text-gray-400 text-[10px] px-2 py-1 rounded-full font-bold uppercase whitespace-nowrap z-10 flex items-center gap-1">
                      <Lock size={10}/> Req. Nível {module.minLevel}
                  </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Map Tutorial Overlay */}
      {showMapTutorial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={closeTutorial}>
              <div className="bg-gray-800 border-2 border-yellow-500 rounded-xl p-6 max-w-md w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
                  <button onClick={closeTutorial} className="absolute top-2 right-2 text-gray-400 hover:text-white"><X size={20}/></button>
                  <div className="flex flex-col items-center text-center">
                      <MapPin size={48} className="text-yellow-500 mb-4 animate-bounce"/>
                      <h3 className="text-xl font-bold text-white mb-2">{steps[tutorialStep].title}</h3>
                      <p className="text-gray-300 mb-6">{steps[tutorialStep].content}</p>
                      
                      <div className="flex gap-2 w-full">
                          {tutorialStep > 0 && (
                              <button onClick={() => setTutorialStep(prev => prev - 1)} className="flex-1 py-2 bg-gray-700 rounded text-white font-bold">Anterior</button>
                          )}
                          {tutorialStep < steps.length - 1 ? (
                              <button onClick={() => setTutorialStep(prev => prev + 1)} className="flex-1 py-2 bg-yellow-600 hover:bg-yellow-500 rounded text-black font-bold">Próximo</button>
                          ) : (
                              <button onClick={closeTutorial} className="flex-1 py-2 bg-green-600 hover:bg-green-500 rounded text-white font-bold">Entendido</button>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
