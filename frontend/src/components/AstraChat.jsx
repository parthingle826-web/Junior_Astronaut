import React, { useState, useRef, useEffect } from 'react';
import { useMission } from '../context/MissionContext';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  Radio, 
  GraduationCap, 
  ShieldAlert
} from 'lucide-react';

export default function AstraChat({ isOpen, onClose }) {
  const { missionState, activeEmergency, astronaut } = useMission();
  const [messages, setMessages] = useState([
    {
      sender: 'astra',
      text: `Greetings Cadet ${astronaut?.name || 'Astronaut'}! I am ASTRA, your AI Flight Director and Space Science Mentor. Flight computers and telemetry links are online. How can I assist your mission?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('context'); 
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (activeEmergency) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'astra',
          isAlert: true,
          text: `🚨 URGENT FLIGHT ALERT: ${activeEmergency.title} triggered! Telemetry reports: ${activeEmergency.description} Standby for tactical analysis. What is your command?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [activeEmergency]);

  const handleSend = async (textToSend = input) => {
    const query = textToSend.trim();
    if (!query || loading) return;

    const userMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/astra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          mode: mode,
          missionState: missionState,
          activeEmergency: activeEmergency,
          astronaut: astronaut
        })
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          setMessages(prev => [
            ...prev,
            {
              sender: 'astra',
              text: data.reply || "Telemetry acknowledged. All systems nominal.",
              provider: data.provider,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        } else {
          throw new Error('Non-JSON response from ASTRA');
        }
      } else {
        throw new Error('ASTRA offline');
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'astra',
          text: "ASTRA Secondary Transponder: DSN telemetry link holding steady. Core avionics are nominal. (Offline backup knowledge base active).",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const presetQuestions = [
    { label: "Status Report", text: "ASTRA, give me a full spacecraft telemetry and mission risk status report." },
    { label: "Radiation Protection", text: "How does the spacecraft shield astronauts from deep space solar radiation storms?" },
    { label: "Lunar Water Ice", text: "Why is water ice found in permanently shadowed craters at the Moon's South Pole?" },
    { label: "Cabin Pressure", text: "What is the normal atmospheric pressure and gas composition inside the habitat?" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 z-50 flex flex-col bg-space-950/95 backdrop-blur-xl border-l border-cyan-500/30 shadow-2xl">
      
      {/* Header */}
      <div className="p-4 border-b border-cyan-500/20 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-sm text-white">ASTRA AI</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">ONLINE</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Flight Director & Science Tutor</p>
          </div>
        </div>

        <button 
          onClick={onClose} 
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      
      <div className="px-4 py-2 bg-slate-900/50 border-b border-slate-800 flex gap-2">
        <button
          onClick={() => setMode('context')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition ${
            mode === 'context'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio className="w-3 h-3" />
          <span>Mission Control</span>
        </button>
        <button
          onClick={() => setMode('assistant')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition ${
            mode === 'assistant'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <GraduationCap className="w-3 h-3" />
          <span>Science Tutor</span>
        </button>
      </div>

   
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs">
        {messages.map((m, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 font-mono">
              <span>{m.sender === 'user' ? (astronaut?.name || 'Cadet') : 'ASTRA'}</span>
              <span>•</span>
              <span>{m.timestamp}</span>
              {m.provider && (
                <span className="text-[9px] text-cyan-400/80">({m.provider})</span>
              )}
            </div>

            <div 
              className={`p-3 rounded-xl max-w-[88%] leading-relaxed ${
                m.isAlert
                  ? 'bg-red-950/80 border border-red-500/50 text-red-200 shadow-md shadow-red-500/20'
                  : m.sender === 'user'
                  ? 'bg-cyan-600 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-900/90 border border-cyan-500/20 text-slate-200 rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs p-2">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>ASTRA computing flight analysis...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

     
      <div className="p-2 border-t border-slate-800 bg-slate-900/40 overflow-x-auto flex gap-1.5 no-scrollbar">
        {presetQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q.text)}
            className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 text-[11px] font-mono transition"
          >
            {q.label}
          </button>
        ))}
      </div>

     
      <div className="p-3 border-t border-cyan-500/20 bg-slate-900/80">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'context' ? "Ask Mission Control about flight status..." : "Ask a space science question..."}
            className="flex-1 bg-space-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 transition font-bold"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
