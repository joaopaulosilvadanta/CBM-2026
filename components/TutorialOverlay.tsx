
import React, { useState } from 'react';
import { TutorialStep } from '../types';
import { X, ChevronRight, ChevronLeft, Flag } from 'lucide-react';

interface TutorialOverlayProps {
  onClose: () => void;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const steps: TutorialStep[] = [
    { 
        title: "Bem-vindo ao Treinamento", 
        content: "Esta é a plataforma oficial de preparação para o CBM-RR. Sua jornada começa agora, Recruta!",
        position: 'center'
    },
    { 
        title: "Seu HUD (Painel)", 
        content: "No topo, você acompanha seu Nível, PD (Pontos de Distinção) e O₂ (Energia).",
        targetId: 'hud-stats',
        position: 'bottom'
    },
    { 
        title: "Mapa Tático", 
        content: "Escolha os módulos para estudar. Alguns exigem patente superior para desbloquear.",
        position: 'center'
    },
    { 
        title: "Sargento Virtual", 
        content: "Use o botão do robô (ou o Professor) para tirar dúvidas, corrigir redações e treinar via rádio.",
        position: 'center'
    }
  ];

  const current = steps[step];

  const handleNext = () => {
      if (step < steps.length - 1) setStep(prev => prev + 1);
      else onClose();
  };

  const handlePrev = () => {
      if (step > 0) setStep(prev => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800 border-2 border-red-500 rounded-2xl max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors">
            <X size={24} />
        </button>

        <div className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-500/30">
                <Flag className="text-white w-8 h-8" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">{current.title}</h2>
            <p className="text-gray-300 mb-8 leading-relaxed font-mono text-sm">{current.content}</p>

            <div className="flex gap-4 w-full">
                <button 
                    onClick={handlePrev} 
                    disabled={step === 0}
                    className={`flex-1 py-3 rounded-lg font-bold border border-gray-600 ${step === 0 ? 'opacity-30 cursor-not-allowed text-gray-500' : 'text-white hover:bg-gray-700'}`}
                >
                    <ChevronLeft className="inline mb-0.5" size={18} /> Anterior
                </button>
                <button 
                    onClick={handleNext}
                    className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white rounded-lg font-bold shadow-lg transition-all"
                >
                    {step === steps.length - 1 ? "Iniciar Missão" : "Próximo"} <ChevronRight className="inline mb-0.5" size={18} />
                </button>
            </div>
            
            <div className="mt-4 flex gap-2">
                {steps.map((_, idx) => (
                    <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === step ? 'bg-red-500 w-4' : 'bg-gray-600'}`} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
