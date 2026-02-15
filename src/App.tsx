
import React, { useState, useEffect } from 'react';
import { Orb } from './components/Orb';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { VoiceInterface } from './components/VoiceInterface';

type AppState = 'IDLE' | 'CHOOSING' | 'CHAT' | 'VOICE';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('IDLE');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOrbClick = () => {
    if (appState === 'IDLE') {
      setAppState('CHOOSING');
    }
  };

  const closeInterface = () => {
    setAppState('IDLE');
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-center transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 dotted-bg opacity-[0.15] pointer-events-none" />
      
      <Header />

      <main className="z-10 flex flex-col items-center justify-center max-w-[1440px] w-full px-8">
        {appState === 'IDLE' && (
          <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-700">
            <h1 className="text-4xl md:text-5xl font-serif text-[#2D2926] mb-12 tracking-tight">
              Your AI Waiter
            </h1>
            <Orb onClick={handleOrbClick} />
            <p className="mt-12 text-[#8C837A] font-medium tracking-wide uppercase text-xs">
              Tap to start a conversation
            </p>
          </div>
        )}

        {appState === 'CHOOSING' && (
          <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-2xl font-serif text-[#2D2926]">How would you like to order?</h2>
             <div className="flex flex-col md:flex-row gap-6">
                <button 
                  onClick={() => setAppState('VOICE')}
                  className="group flex flex-col items-center p-8 w-64 bg-white/40 backdrop-blur-md border border-white/60 rounded-[32px] hover:bg-white/80 transition-all shadow-sm hover:shadow-xl"
                >
                  <div className="w-16 h-16 rounded-full bg-[#2D2926] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 00-3 3v8a3 3 0 006 0V5a3 3 0 00-3-3z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-[#2D2926]">Talk to AI Waiter</span>
                  <span className="text-xs text-[#8C837A] mt-2 uppercase tracking-widest">Voice Mode</span>
                </button>

                <button 
                  onClick={() => setAppState('CHAT')}
                  className="group flex flex-col items-center p-8 w-64 bg-white/40 backdrop-blur-md border border-white/60 rounded-[32px] hover:bg-white/80 transition-all shadow-sm hover:shadow-xl"
                >
                  <div className="w-16 h-16 rounded-full bg-[#8C837A] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-[#2D2926]">Chat with AI Waiter</span>
                  <span className="text-xs text-[#8C837A] mt-2 uppercase tracking-widest">Text Mode</span>
                </button>
             </div>
             <button onClick={closeInterface} className="text-[#8C837A] hover:text-[#2D2926] text-sm uppercase tracking-widest transition-colors">Go Back</button>
          </div>
        )}

        {appState === 'CHAT' && <ChatInterface onClose={closeInterface} />}
        {appState === 'VOICE' && <VoiceInterface onClose={closeInterface} />}
      </main>

      <footer className="absolute bottom-12 left-0 w-full flex justify-center pointer-events-none">
        <p className="text-[10px] text-[#A69D94] uppercase tracking-[0.2em]">
          Peace. Cafe • Dual Mode Interface • V3.0
        </p>
      </footer>
    </div>
  );
};

export default App;
