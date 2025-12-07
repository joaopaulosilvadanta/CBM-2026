
import React from 'react';
import { GameSettings } from '../types';
import { X, Volume2, VolumeX, Clock } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onUpdateSettings }) => {
  if (!isOpen) return null;

  const times = [10, 20, 30, 40, 60];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-gray-800 border-2 border-gray-600 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-white font-bold text-lg uppercase tracking-wider">Configurações de Combate</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Time Settings */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-yellow-500">
                <Clock size={20} />
                <span className="font-bold text-sm uppercase">Tempo por Questão</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
                {times.map(t => (
                    <button
                        key={t}
                        onClick={() => onUpdateSettings({ ...settings, questionTime: t })}
                        className={`py-2 rounded font-mono font-bold transition-all ${
                            settings.questionTime === t 
                            ? 'bg-yellow-600 text-black shadow-lg scale-105' 
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        }`}
                    >
                        {t}s
                    </button>
                ))}
            </div>
          </div>

          {/* Sound Settings */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-blue-400">
                {settings.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                <span className="font-bold text-sm uppercase">Efeitos Sonoros</span>
            </div>
            <div className="flex bg-gray-700 rounded-lg p-1">
                <button
                    onClick={() => onUpdateSettings({ ...settings, soundEnabled: true })}
                    className={`flex-1 py-2 rounded text-xs font-bold uppercase transition-all ${
                        settings.soundEnabled ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
                    }`}
                >
                    Ativado
                </button>
                <button
                    onClick={() => onUpdateSettings({ ...settings, soundEnabled: false })}
                    className={`flex-1 py-2 rounded text-xs font-bold uppercase transition-all ${
                        !settings.soundEnabled ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
                    }`}
                >
                    Desativado
                </button>
            </div>
          </div>

        </div>

        <div className="p-4 bg-gray-900 border-t border-gray-700 text-center">
            <button 
                onClick={onClose}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg uppercase tracking-widest transition-colors"
            >
                Confirmar
            </button>
        </div>
      </div>
    </div>
  );
};
