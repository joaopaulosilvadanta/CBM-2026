
import React from 'react';
import { ARSENAL_RESOURCES } from '../constants';
import { BookA, Binary, LifeBuoy, Scale, Atom, Map, Laptop, Youtube, FileText, Image, ArrowRight, Play, Edit3, Upload } from 'lucide-react';
import { ArsenalAction } from '../types';

interface BizuResourcesScreenProps {
  onStartQuiz: () => void;
  onAction: (action: ArsenalAction) => void;
}

export const BizuResourcesScreen: React.FC<BizuResourcesScreenProps> = ({ onStartQuiz, onAction }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookA': return <BookA className="w-8 h-8" />;
      case 'Binary': return <Binary className="w-8 h-8" />;
      case 'LifeBuoy': return <LifeBuoy className="w-8 h-8" />;
      case 'Scale': return <Scale className="w-8 h-8" />;
      case 'Atom': return <Atom className="w-8 h-8" />;
      case 'Map': return <Map className="w-8 h-8" />;
      case 'Laptop': return <Laptop className="w-8 h-8" />;
      default: return <BookA className="w-8 h-8" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col h-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tighter mb-2">
          <span className="text-yellow-500">Arsenal</span> de Guerra
        </h2>
        <p className="text-gray-400 font-mono text-sm md:text-base">
          Módulos de Elite: Vídeos Táticos, Infográficos e Apostilas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Special Essay Card */}
        <div className="bg-gray-800 border-2 border-blue-500/50 rounded-xl p-4 flex flex-col hover:border-blue-400 transition-colors group relative overflow-hidden shadow-lg shadow-blue-900/20">
            <div className="flex items-center gap-4 mb-4 z-10">
              <div className="p-3 rounded-lg bg-blue-900/30 text-blue-400 group-hover:scale-110 transition-transform">
                <Edit3 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">Redação IA</h3>
                <p className="text-xs text-blue-400 font-mono uppercase">Corretor Automático</p>
              </div>
            </div>
            <button 
                onClick={() => onAction('ESSAY_CORRECTION')}
                className="mt-auto w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded flex items-center justify-center gap-2 uppercase text-xs tracking-wider"
            >
                <Upload size={16} /> Enviar Texto
            </button>
        </div>

        {ARSENAL_RESOURCES.map((res) => (
          <div key={res.id} className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col hover:border-yellow-600 transition-colors group relative overflow-hidden">
            <div className="flex items-center gap-4 mb-4 z-10">
              <div className={`p-3 rounded-lg bg-gray-900/50 ${res.color} group-hover:scale-110 transition-transform duration-300`}>
                {getIcon(res.icon)}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">{res.title}</h3>
                <p className="text-xs text-gray-500 font-mono uppercase">{res.desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-auto z-10">
              <button onClick={() => window.open(`https://www.youtube.com/results?search_query=${res.title} concurso`, '_blank')} className="flex flex-col items-center justify-center bg-gray-700 hover:bg-red-900/80 p-2 rounded text-gray-300 hover:text-white transition-colors gap-1 border border-gray-600 hover:border-red-500">
                <Youtube size={18} /> <span className="text-[9px] font-bold uppercase">Vídeo</span>
              </button>
              <button onClick={() => alert('Infográfico simulado aberto.')} className="flex flex-col items-center justify-center bg-gray-700 hover:bg-blue-900/80 p-2 rounded text-gray-300 hover:text-white transition-colors gap-1 border border-gray-600 hover:border-blue-500">
                <Image size={18} /> <span className="text-[9px] font-bold uppercase">Gráfico</span>
              </button>
              <button onClick={() => alert('PDF simulado baixado.')} className="flex flex-col items-center justify-center bg-gray-700 hover:bg-green-900/80 p-2 rounded text-gray-300 hover:text-white transition-colors gap-1 border border-gray-600 hover:border-green-500">
                <FileText size={18} /> <span className="text-[9px] font-bold uppercase">PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto sticky bottom-4">
        <button onClick={onStartQuiz} className="w-full bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg shadow-red-900/30 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] border border-red-500">
            <Play fill="currentColor" /> INICIAR COMBATE (QUIZ DOS BIZUS) <ArrowRight />
        </button>
      </div>
    </div>
  );
};
