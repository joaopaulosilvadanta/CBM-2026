import React from 'react';
import { ModuleInfo } from '../types';
import { MODULES } from '../constants';
import { Lock, Play, Flame, Leaf } from 'lucide-react';

interface ModuleSelectProps {
  onSelectModule: (module: ModuleInfo) => void;
  userCredits: number;
}

export const ModuleSelect: React.FC<ModuleSelectProps> = ({ onSelectModule, userCredits }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Painel de Missões</h2>
        <p className="text-gray-400 text-sm">Selecione um módulo para iniciar o treinamento tático.</p>
        <p className="text-xs text-gray-500 mt-1">Desenvolvido por Prof. João Paulo Silva Dantas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MODULES.map((module) => (
          <div 
            key={module.id}
            className={`
              relative p-6 rounded-xl border-l-4 transition-all duration-300 group
              ${module.unlocked || (module.minLevel && module.minLevel <= 20) // Logic handled in click, here visualization
                ? (module.minLevel && module.minLevel > 1) ? 'bg-gray-800 border-yellow-600' : 'bg-gray-800 border-red-600 hover:bg-gray-750 hover:shadow-lg hover:shadow-red-900/20 cursor-pointer' 
                : 'bg-gray-900 border-gray-700 opacity-60 cursor-not-allowed'}
            `}
            onClick={() => onSelectModule(module)}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className={`
                    text-xs font-mono font-bold px-2 py-1 rounded mb-2 inline-block
                    ${module.unlocked ? 'bg-red-900/50 text-red-400' : 'bg-gray-800 text-gray-500'}
                `}>
                  {module.code}
                </span>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                    {module.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4 font-mono">{module.description}</p>
                
                <div className="flex flex-col gap-1">
                    <div className="flex items-center text-xs text-gray-500 gap-2">
                        <span>{module.questionsCount} Questões</span>
                        <span>•</span>
                        <span>1 Carga O₂</span>
                    </div>
                    {module.minLevel && (
                        <span className="text-xs text-yellow-500 font-bold mt-1">
                            Requer Nível {module.minLevel}
                        </span>
                    )}
                </div>
              </div>

              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                ${module.unlocked ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-500'}
                ${module.id === 'm_amb' ? 'bg-green-700' : ''}
              `}>
                {module.unlocked 
                    ? (module.id === 'm_amb' ? <Leaf size={20} /> : <Play size={24} fill="currentColor" />)
                    : <Lock size={20} />}
              </div>
            </div>

            {module.id === 'm4' && (
                <div className="absolute -top-3 -right-3">
                    <span className="flex items-center gap-1 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full animate-pulse shadow-lg">
                        <Flame size={12} fill="currentColor"/> FOCO
                    </span>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};