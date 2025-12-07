
import React from 'react';
import { Bot, MessageSquare } from 'lucide-react';

interface ProfessorAvatarProps {
  onOpenChat: () => void;
}

export const ProfessorAvatar: React.FC<ProfessorAvatarProps> = ({ onOpenChat }) => {
  return (
    <div 
      className="fixed bottom-24 left-4 z-40 flex flex-col items-center cursor-pointer group"
      onClick={onOpenChat}
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-500 shadow-xl shadow-yellow-500/20 bg-gray-800 transition-transform group-hover:scale-105">
          {/* Placeholder for Professor Image - using Icon as fallback */}
          <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">
             <Bot size={32} />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
      </div>
      
      <div className="mt-2 bg-gray-900/90 text-white text-[10px] px-3 py-1 rounded-full border border-gray-700 shadow-lg group-hover:bg-yellow-600 group-hover:text-black transition-colors font-bold uppercase tracking-wide flex items-center gap-1">
        <MessageSquare size={10} />
        Falar com Professor
      </div>
    </div>
  );
};
