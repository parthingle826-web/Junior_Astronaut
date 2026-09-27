import React, { useEffect } from 'react';
import { useMission } from '../context/MissionContext';
import confetti from 'canvas-confetti';
import { 
  Printer, 
  Award, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles,
  Rocket,
  CheckCircle2,
  Share2
} from 'lucide-react';

export default function CertificateView() {
  const { astronaut, missionState, getAstronautRank, navigateTo } = useMission();

  const rank = getAstronautRank();
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Launch confetti upon rendering
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect unavailable');
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      
      {/* Top Toolbar (Hidden on print) */}
      <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <button
          onClick={() => navigateTo('report')}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Mission Report</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition flex items-center gap-2 shadow-md shadow-cyan-600/30"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Card (Print Optimized) */}
      <div className="certificate-print-area rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-space-950 border-4 border-amber-500/60 p-8 sm:p-12 shadow-2xl relative text-center space-y-6 overflow-hidden">
        
        {/* Ornate corner borders */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400 pointer-events-none" />

        {/* Certificate Header Banner */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-widest">
            <Award className="w-4 h-4" />
            <span>NASA SPACE APPS CHALLENGE PROJECT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-wider pt-2">
            Certificate of Achievement
          </h1>
          <p className="text-xs sm:text-sm text-cyan-400 font-mono uppercase tracking-widest">
            JUNIOR ASTRONAUT MISSION SIMULATOR
          </p>
        </div>

        {/* Presentation Text */}
        <p className="text-xs text-slate-300 font-serif italic max-w-lg mx-auto">
          This educational certificate certifies that the candidate has successfully completed comprehensive cislunar flight simulation training, emergency protocol triage, and lunar surface exploration.
        </p>

        {/* Candidate Name & Callsign */}
        <div className="py-2">
          <div className="text-2xl sm:text-4xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
            {astronaut?.name || 'Astronaut Cadet'}
          </div>
          <div className="text-xs font-mono text-slate-400 mt-1">
            Flight Callsign: "{astronaut?.callsign || 'Starlight'}" • Registration ID: {astronaut?.id || 'AST-2048'}
          </div>
        </div>

        {/* Assigned Rank & Mission */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 max-w-xl mx-auto grid grid-cols-3 gap-2 text-center font-mono">
          <div>
            <span className="text-[10px] text-slate-400 block">AWARDED RANK</span>
            <span className="font-bold text-xs sm:text-sm text-amber-300">{rank}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">EXPEDITION</span>
            <span className="font-bold text-xs sm:text-sm text-cyan-300">Artemis Lunar-1</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">EXPERIENCE</span>
            <span className="font-bold text-xs sm:text-sm text-emerald-400">{missionState.xp} XP</span>
          </div>
        </div>

        {/* Signatures & Verification Seal */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto">
          
          {/* Flight Director Signature */}
          <div className="text-center sm:text-left space-y-1">
            <div className="font-mono text-cyan-400 text-sm font-bold italic tracking-wide">
              ASTRA Flight Director AI
            </div>
            <div className="w-40 h-[1px] bg-slate-700 mx-auto sm:mx-0" />
            <div className="text-[10px] font-mono text-slate-400">Automated Mission Control</div>
          </div>

          {/* Golden Seal */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-xl flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-full flex flex-col items-center justify-center border border-amber-400">
              <Rocket className="w-5 h-5 text-amber-400" />
              <span className="text-[8px] font-mono text-amber-300 font-bold uppercase">VERIFIED</span>
            </div>
          </div>

          {/* Date & Registry */}
          <div className="text-center sm:text-right space-y-1">
            <div className="font-mono text-slate-200 text-xs font-bold">
              {dateStr}
            </div>
            <div className="w-40 h-[1px] bg-slate-700 mx-auto sm:ml-auto sm:mr-0" />
            <div className="text-[10px] font-mono text-slate-400">Date of Mission Completion</div>
          </div>

        </div>

        <div className="pt-4 border-t border-slate-800 text-[10px] font-mono text-slate-400 max-w-xl mx-auto leading-relaxed">
          <strong className="text-amber-400 uppercase">Educational Certification Notice:</strong> This is a project-generated achievement certificate for an educational simulation created for the NASA Space Apps Challenge — not an official NASA certification.
        </div>

      </div>

    </div>
  );
}
