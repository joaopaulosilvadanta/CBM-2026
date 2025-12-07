
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Mic, Image as ImageIcon, Send, X, Bot, FileText, ChevronDown, Radio, Upload, Activity, Printer, PlusCircle, HelpCircle } from 'lucide-react';
import { ChatMessage, EssayAnalysis } from '../types';
import { getChatResponse, analyzeEssay, generatePracticeQuestion, geminiClient } from '../services/geminiService';
import { LiveServerMessage, Modality } from '@google/genai';

interface AIAssistantProps {
  initialTab?: 'CHAT' | 'RADIO' | 'ESSAY';
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void; // Trigger parent open
  persona?: 'DEFAULT' | 'PROFESSOR';
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ initialTab, isOpen: propIsOpen, onClose, onOpen, persona = 'DEFAULT' }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'CHAT' | 'RADIO' | 'ESSAY'>('CHAT');
  
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
        id: '1', 
        role: 'model', 
        text: persona === 'PROFESSOR' 
            ? 'Olá, Guerreiro! Professor João Paulo aqui. Em que posso ajudar na sua preparação hoje?' 
            : 'Sargento Virtual na escuta. Pronto para instrução. QAP?', 
        timestamp: Date.now() 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [essayImage, setEssayImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<EssayAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0); // Visual feedback
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Tutorial State
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  useEffect(() => {
      if (isOpen && messages.length <= 1) {
          setMessages([{ 
            id: '1', 
            role: 'model', 
            text: persona === 'PROFESSOR' 
                ? 'Olá, Guerreiro! Professor João Paulo aqui. Em que posso ajudar na sua preparação hoje?' 
                : 'Sargento Virtual na escuta. Pronto para instrução. QAP?', 
            timestamp: Date.now() 
        }]);
      }
  }, [isOpen, persona]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => { disconnectLive(); };
  }, []);

  const handleClose = () => {
      if (onClose) onClose();
      else setInternalIsOpen(false);
  };

  const handleOpen = () => {
      if (onOpen) onOpen();
      else setInternalIsOpen(true);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: inputText, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    try {
        const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
        const responseText = await getChatResponse(userMsg.text, history);
        setMessages(prev => [...prev, { id: (Date.now()+1).toString(), role: 'model', text: responseText, timestamp: Date.now() }]);
    } catch (error) {
        setMessages(prev => [...prev, { id: (Date.now()+1).toString(), role: 'model', text: "Erro na rede. Tente novamente.", timestamp: Date.now() }]);
    } finally {
        setIsTyping(false);
    }
  };

  const handleGenerateQuestion = async () => {
      setIsTyping(true);
      const qText = await generatePracticeQuestion();
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: qText, timestamp: Date.now(), isPracticeQuestion: true }]);
      setIsTyping(false);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) { alert("Use Google Chrome para voz."); return; }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.start();
    recognition.onresult = (event: any) => {
        setInputText(prev => prev + " " + event.results[0][0].transcript);
    };
  };

  const handlePrint = () => {
      window.print();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEssayImage(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeEssay = async () => {
    if (!essayImage) return;
    setAnalyzing(true);
    const base64Data = essayImage.split(',')[1];
    const result = await analyzeEssay(base64Data);
    if (result) setAnalysisResult(result);
    else alert("Erro na análise.");
    setAnalyzing(false);
  };

  // -----------------------------------------------------------------------
  // AUDIO PROCESSING HELPERS (Fix for Radio Interference)
  // -----------------------------------------------------------------------
  
  // Downsample to 16kHz which is required by Gemini Live API
  const downsampleBuffer = (buffer: Float32Array, inputSampleRate: number, outputSampleRate: number) => {
      if (outputSampleRate === inputSampleRate) {
          return buffer;
      }
      const sampleRateRatio = inputSampleRate / outputSampleRate;
      const newLength = Math.round(buffer.length / sampleRateRatio);
      const result = new Float32Array(newLength);
      let offsetResult = 0;
      let offsetBuffer = 0;
      while (offsetResult < result.length) {
          const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
          let accum = 0, count = 0;
          for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
              accum += buffer[i];
              count++;
          }
          result[offsetResult] = count > 0 ? accum / count : 0;
          offsetResult++;
          offsetBuffer = nextOffsetBuffer;
      }
      return result;
  };

  const connectLive = async () => {
    try {
        if (isLiveConnected) return;
        
        // 1. Setup Audio Context
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
        
        // 2. Setup Microphone Stream
        const stream = await navigator.mediaDevices.getUserMedia({ audio: {
            channelCount: 1,
            sampleRate: 16000 // Try to request 16k, but browser might ignore
        }});
        streamRef.current = stream;
        
        const inputSource = audioContextRef.current.createMediaStreamSource(stream);
        const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        inputSource.connect(processor);
        processor.connect(audioContextRef.current.destination);

        // 3. Connect to Gemini Live
        // Select voice based on Persona
        const voiceName = persona === 'PROFESSOR' ? 'Fenrir' : 'Kore';
        
        const sessionPromise = geminiClient.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceName } } },
                systemInstruction: persona === 'PROFESSOR' 
                    ? "Você é o Professor João Paulo Silva Dantas, instrutor militar experiente. Fale com autoridade, use termos militares, seja direto e ajude o aluno a passar no concurso CBM-RR. Voz masculina e firme."
                    : "Você é um operador de rádio tático do CBM-RR. Fale breve e militar. Use código Q.",
            },
            callbacks: {
                onopen: () => {
                    setIsLiveConnected(true);
                    console.log("Radio Connected");
                },
                onmessage: (msg: LiveServerMessage) => {
                    const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                    if (audioData && audioContextRef.current) {
                        try {
                            // Decode base64 to array buffer
                            const binaryString = atob(audioData);
                            const len = binaryString.length;
                            const bytes = new Uint8Array(len);
                            for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
                            
                            // Convert PCM16 to Float32
                            const dataInt16 = new Int16Array(bytes.buffer);
                            const float32Data = new Float32Array(dataInt16.length);
                            for(let i=0; i<dataInt16.length; i++) {
                                float32Data[i] = dataInt16[i] / 32768.0;
                            }

                            // Create Audio Buffer (Gemini returns 24kHz usually)
                            const buffer = audioContextRef.current.createBuffer(1, float32Data.length, 24000);
                            buffer.getChannelData(0).set(float32Data);
                            
                            // Play audio
                            const source = audioContextRef.current.createBufferSource();
                            source.buffer = buffer;
                            source.connect(audioContextRef.current.destination);
                            source.start();
                        } catch (e) {
                            console.error("Audio playback error", e);
                        }
                    }
                },
                onclose: () => {
                    console.log("Radio Closed");
                    setIsLiveConnected(false);
                },
                onerror: (e) => {
                    console.error("Radio Error", e);
                    setIsLiveConnected(false);
                }
            }
        });

        // 4. Process Microphone Data
        processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            
            // Calculate Volume for UI
            let sum = 0;
            for (let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
            setAudioVolume(Math.sqrt(sum / inputData.length));

            // Resample to 16kHz
            const downsampledData = downsampleBuffer(inputData, audioContextRef.current!.sampleRate, 16000);
            
            // Convert to Int16 PCM
            const pcm16 = new Int16Array(downsampledData.length);
            for (let i = 0; i < downsampledData.length; i++) {
                // Clamp and scale
                let s = Math.max(-1, Math.min(1, downsampledData[i]));
                pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
            }

            // Convert to Base64
            let binary = '';
            const bytes = new Uint8Array(pcm16.buffer);
            const len = bytes.byteLength;
            for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
            const base64 = btoa(binary);

            // Send to Gemini
            sessionPromise.then(session => {
                session.sendRealtimeInput({ 
                    media: { 
                        mimeType: 'audio/pcm;rate=16000', 
                        data: base64 
                    } 
                });
            });
        };

    } catch (e) {
        console.error("Connection failed", e);
        setIsLiveConnected(false);
        alert("Erro ao conectar microfone.");
    }
  };

  const disconnectLive = () => {
    if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current = null;
    }
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
    }
    if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
    }
    setIsLiveConnected(false);
    setAudioVolume(0);
  };

  const startTutorial = () => {
      setTutorialStep(0);
      setShowTutorial(true);
  };

  const tutorialSteps = [
      { title: "Chat Tático", desc: "Tire dúvidas de texto e peça novas questões aqui." },
      { title: "Rádio (Voz)", desc: "Converse em tempo real com a IA para treinar oralidade. Clique em LIGAR RÁDIO." },
      { title: "Corretor", desc: "Envie a foto da sua redação para correção automática." }
  ];

  if (!isOpen) {
    return (
      <button onClick={handleOpen} className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 hover:bg-red-500 rounded-full shadow-2xl flex items-center justify-center z-50 border-2 border-red-400 animate-bounce hover:animate-none transition-all">
        <Bot size={28} className="text-white" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] md:w-96 h-[500px] bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-700 z-50 flex flex-col overflow-hidden font-sans print:fixed print:inset-0 print:w-full print:h-full print:bg-white print:text-black print:z-[1000]">
      {/* Header */}
      <div className="bg-gray-800 p-3 flex justify-between items-center border-b border-gray-700 print:hidden">
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className="font-bold text-white text-sm uppercase tracking-wider">{persona === 'PROFESSOR' ? 'Prof. João Paulo' : 'Sargento Virtual (IA)'}</span>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={startTutorial} className="text-gray-400 hover:text-white" title="Ajuda"><HelpCircle size={18}/></button>
            <button onClick={handleClose} className="text-gray-400 hover:text-white bg-gray-700 p-1 rounded-full hover:bg-red-600 transition-colors" title="Fechar">
                <X size={18} />
            </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 bg-gray-800/50 print:hidden relative">
        <button onClick={() => setActiveTab('CHAT')} className={`flex-1 py-2 text-xs font-bold uppercase flex items-center justify-center gap-1 ${activeTab === 'CHAT' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-500 hover:text-gray-300'}`}><MessageSquare size={14} /> Texto</button>
        <button onClick={() => setActiveTab('RADIO')} className={`flex-1 py-2 text-xs font-bold uppercase flex items-center justify-center gap-1 ${activeTab === 'RADIO' ? 'text-red-400 border-b-2 border-red-400' : 'text-gray-500 hover:text-gray-300'}`}><Radio size={14} /> Rádio</button>
        <button onClick={() => setActiveTab('ESSAY')} className={`flex-1 py-2 text-xs font-bold uppercase flex items-center justify-center gap-1 ${activeTab === 'ESSAY' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-500 hover:text-gray-300'}`}><FileText size={14} /> Redação</button>
      </div>

      {/* Tutorial Overlay */}
      {showTutorial && (
          <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center text-center p-6">
              <div className="bg-gray-800 border border-yellow-500 p-4 rounded-xl shadow-2xl">
                  <h4 className="text-yellow-400 font-bold mb-2">{tutorialSteps[tutorialStep].title}</h4>
                  <p className="text-sm text-gray-300 mb-4">{tutorialSteps[tutorialStep].desc}</p>
                  <div className="flex justify-center gap-4">
                    {tutorialStep > 0 && <button onClick={() => setTutorialStep(p => p-1)} className="text-gray-400 text-xs hover:text-white">Voltar</button>}
                    <button 
                        onClick={() => tutorialStep < 2 ? setTutorialStep(p => p+1) : setShowTutorial(false)}
                        className="bg-yellow-600 hover:bg-yellow-500 text-black px-4 py-2 rounded font-bold text-xs"
                    >
                        {tutorialStep < 2 ? 'Próximo' : 'Entendido'}
                    </button>
                  </div>
              </div>
          </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-900/90 relative print:bg-white">
        
        {/* CHAT TAB */}
        {activeTab === 'CHAT' && (
            <div className="flex flex-col h-full">
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-blue-900/60 text-blue-100 rounded-tr-none' : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'} ${msg.isPracticeQuestion ? 'border-yellow-500/50 bg-yellow-900/20' : ''}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && <div className="flex justify-start"><div className="bg-gray-800 p-2 rounded-lg text-xs text-gray-400 animate-pulse">Digitando...</div></div>}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-2 bg-gray-800 border-t border-gray-700 flex gap-2 flex-wrap justify-center print:hidden">
                    <button onClick={handleGenerateQuestion} className="bg-gray-700 text-yellow-400 text-xs px-3 py-1 rounded-full flex items-center gap-1 hover:bg-gray-600 transition-colors"><PlusCircle size={12}/> Gerar Questão</button>
                </div>
                <div className="p-3 bg-gray-800 border-t border-gray-700 flex gap-2 print:hidden">
                    <button onClick={handleVoiceInput} className="p-2 bg-gray-700 rounded-full text-gray-300 hover:text-white transition-colors" title="Digitar por voz"><Mic size={18} /></button>
                    <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Digite sua dúvida..." className="flex-1 bg-gray-900 border border-gray-600 rounded px-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors" />
                    <button onClick={handleSendMessage} className="p-2 bg-yellow-600 hover:bg-yellow-500 rounded text-black transition-colors"><Send size={18} /></button>
                </div>
            </div>
        )}

        {/* RADIO TAB */}
        {activeTab === 'RADIO' && (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center relative">
                <div className="absolute top-4 left-4 right-4 text-xs text-gray-500 font-mono">
                    CANAL: {persona === 'PROFESSOR' ? 'COMANDO GERAL' : 'FREQ. OPERACIONAL'}
                </div>
                
                <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center mb-6 transition-all duration-300 relative ${isLiveConnected ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-gray-700'}`}>
                    {/* Audio visualizer ring */}
                    {isLiveConnected && (
                        <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 transition-transform duration-75" style={{ transform: `scale(${1 + audioVolume * 5})` }}></div>
                    )}
                    <Radio size={48} className={isLiveConnected ? 'text-red-500' : 'text-gray-600'} />
                </div>
                
                <div className="h-8 mb-6">
                    {isLiveConnected ? (
                        <span className="text-red-400 font-mono text-sm animate-pulse flex items-center gap-2">
                            <Activity size={16}/> TRANSMITINDO (16kHz)
                        </span>
                    ) : (
                        <span className="text-gray-500 font-mono text-sm">DESCONECTADO</span>
                    )}
                </div>

                <button onClick={isLiveConnected ? disconnectLive : connectLive} className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest shadow-lg transition-all transform hover:scale-105 active:scale-95 ${isLiveConnected ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                    {isLiveConnected ? "DESLIGAR RÁDIO" : "LIGAR RÁDIO"}
                </button>
                
                <p className="mt-6 text-xs text-gray-500 max-w-[200px]">
                    Utilize fones de ouvido para melhor experiência e evitar eco.
                </p>
            </div>
        )}

        {/* ESSAY TAB */}
        {activeTab === 'ESSAY' && (
            <div className="p-4 h-full overflow-y-auto">
                {!essayImage ? (
                    <div className="border-2 border-dashed border-gray-600 rounded-xl h-48 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-blue-500 hover:text-blue-400 transition-colors" onClick={() => fileInputRef.current?.click()}>
                        <Upload size={32} className="mb-2" />
                        <span className="text-sm font-bold">Carregar Redação (Foto)</span>
                        <p className="text-xs text-gray-600 mt-1">Formatos: JPG, PNG</p>
                        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 print:hidden">
                        <div className="relative h-40 rounded-lg overflow-hidden border border-gray-600 group">
                            <img src={essayImage} alt="Essay" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                            <button onClick={() => { setEssayImage(null); setAnalysisResult(null); }} className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 p-1 rounded-full text-white transition-colors"><X size={16} /></button>
                        </div>
                        {!analysisResult && (
                            <button onClick={handleAnalyzeEssay} disabled={analyzing} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                                {analyzing ? <Activity className="animate-spin" /> : <ImageIcon />} {analyzing ? "Analisando com Visão Computacional..." : "Analisar Texto"}
                            </button>
                        )}
                    </div>
                )}

                {analysisResult && (
                    <div className="mt-4 bg-gray-800 p-4 rounded-lg border border-blue-500/30 print:bg-white print:text-black print:border-black shadow-lg">
                        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                            <span className="text-sm text-gray-400 print:text-black uppercase font-bold tracking-wider">Relatório de Correção</span>
                            <div className="flex items-center gap-3">
                                <span className={`text-2xl font-bold ${analysisResult.score >= 14 ? 'text-green-400 print:text-black' : 'text-red-400 print:text-black'}`}>{analysisResult.score}/20</span>
                                <button onClick={handlePrint} className="print:hidden text-gray-400 hover:text-white bg-gray-700 p-1.5 rounded transition-colors" title="Imprimir"><Printer size={18}/></button>
                            </div>
                        </div>
                        <div className="space-y-4 text-sm leading-relaxed">
                            <div>
                                <span className="text-blue-400 font-bold uppercase text-xs block mb-1 print:text-black">Gramática & Ortografia</span>
                                <p className="text-gray-300 print:text-black bg-gray-900/50 print:bg-transparent p-2 rounded">{analysisResult.grammarComments}</p>
                            </div>
                            <div>
                                <span className="text-blue-400 font-bold uppercase text-xs block mb-1 print:text-black">Coesão & Coerência</span>
                                <p className="text-gray-300 print:text-black bg-gray-900/50 print:bg-transparent p-2 rounded">{analysisResult.cohesionComments}</p>
                            </div>
                            <div>
                                <span className="text-blue-400 font-bold uppercase text-xs block mb-1 print:text-black">Argumentação</span>
                                <p className="text-gray-300 print:text-black bg-gray-900/50 print:bg-transparent p-2 rounded">{analysisResult.argumentationComments}</p>
                            </div>
                            <div className="mt-3 p-3 bg-black/30 rounded border-l-4 border-yellow-500 print:bg-gray-100 print:border-black flex items-center gap-2">
                                <span className="text-yellow-500 font-bold text-xs uppercase print:text-black">Veredito Final: </span>
                                <span className="text-gray-200 italic print:text-black font-bold">{analysisResult.finalVerdict}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};
