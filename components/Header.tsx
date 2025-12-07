
import React from 'react';
import { UserProfile, BizuType } from '../types';
import { Shield, Medal, Zap, Star, Award, BookOpen, ShieldCheck, Users, Home, LogOut, Settings } from 'lucide-react';
import { BIZUS } from '../constants';

interface HeaderProps {
  user: UserProfile;
  activeBizus: BizuType[];
  onReturnHome: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, activeBizus, onReturnHome, onOpenSettings }) => {
  const xpPercentage = Math.min((user.xp / user.nextLevelXp) * 100, 100);

  const getBizuIcon = (type: BizuType) => {
    switch(type) {
        case 'MULTIPLIER': return <Award size={12} />;
        case 'HINT': return <BookOpen size={12} />;
        case 'SHIELD': return <ShieldCheck size={12} />;
        case 'FIFTY_FIFTY': return <Users size={12} />;
        default: return <Zap size={12} />;
    }
  };

  return (
    <header className="bg-gray-900 border-b-2 border-red-900 p-2 sm:p-4 sticky top-0 z-50 shadow-lg shadow-red-900/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-red-700 to-red-900 p-2 rounded-lg shadow-lg shadow-red-500/20 relative border border-red-600/30">
                     <Shield className="text-white w-6 h-6" />
                     <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded border border-yellow-600 shadow-sm">
                        {user.level}
                     </div>
                </div>
                <div>
                    <h1 className="text-lg font-bold text-gray-100 leading-none tracking-tight">CBM-RR</h1>
                    <p className="text-[10px] sm:text-xs text-red-500 font-mono tracking-widest uppercase font-semibold">Vidas Alheias a Salvar</p>
                </div>
            </div>

            <div className="flex gap-2 sm:hidden">
                <button onClick={onOpenSettings} className="bg-gray-800 text-gray-400 p-2 rounded border border-gray-700">
                    <Settings size={18} />
                </button>
                <button onClick={onReturnHome} className="bg-gray-800 text-gray-400 p-2 rounded border border-gray-700">
                    <Home size={18} />
                </button>
            </div>
        </div>

        <div className="flex flex-col items-end gap-1 w-full sm:w-auto">
            <div className="flex gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end items-center">
                <div className="flex gap-4 sm:gap-6 bg-gray-800 p-1.5 px-4 rounded-full border border-gray-700 shadow-inner flex-grow sm:flex-grow-0 justify-between sm:justify-end items-center" id="hud-stats">
                    <div className="flex items-center gap-2">
                        <Star size={14} className="text-yellow-500" fill="currentColor" />
                        <span className="text-xs sm:text-sm font-bold text-gray-200 uppercase font-mono tracking-tight">
                            {user.rankTitle}
                        </span>
                    </div>
                    <div className="h-4 w-px bg-gray-600 hidden sm:block"></div>
                    <div className="flex items-center gap-1.5 text-yellow-400">
                        <Medal size={16} />
                        <span className="font-mono font-bold text-sm">{user.pd} PD</span>
                    </div>
                    <div className="h-4 w-px bg-gray-600 hidden sm:block"></div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-blue-400">
                            <Zap size={16} fill="currentColor" />
                            <span className="font-mono font-bold text-sm">{user.oxygen}/{user.maxOxygen}</span>
                        </div>
                        {activeBizus.length > 0 && (
                            <div className="flex items-center gap-1 pl-2 border-l border-gray-600">
                                {activeBizus.map((bizuId, idx) => {
                                    const bizuDef = BIZUS.find(b => b.id === bizuId);
                                    return (
                                        <div 
                                            key={`${bizuId}-${idx}`} 
                                            className="w-6 h-6 rounded-full bg-emerald-900/80 border border-emerald-500 flex items-center justify-center text-emerald-400 relative group cursor-help transition-transform hover:scale-110"
                                            title={bizuDef?.name}
                                        >
                                            {getBizuIcon(bizuId)}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                <button onClick={onOpenSettings} className="hidden sm:block bg-gray-800 hover:bg-gray-700 text-gray-400 p-2 rounded-lg border border-gray-700 transition-colors">
                    <Settings size={18} />
                </button>

                <button 
                    onClick={onReturnHome}
                    className="hidden sm:flex items-center gap-2 bg-gray-800 hover:bg-red-900 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg border border-gray-700 hover:border-red-700 transition-all font-mono text-xs font-bold uppercase tracking-wider group"
                >
                    <LogOut size={14} className="group-hover:-translate-x-0.5 transition-transform"/>
                    Abandonar
                </button>
            </div>
            
            <div className="w-full sm:w-[calc(100%-100px)] lg:w-48 h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden relative group self-end">
                <div 
                    className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${xpPercentage}%` }}
                />
            </div>
        </div>
      </div>
    </header>
  );
};
