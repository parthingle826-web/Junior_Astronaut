import React from 'react';
import { useMission } from '../context/MissionContext';
import { 
  Rocket, 
  Target, 
  Shield, 
  Compass, 
  Radio, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Moon
} from 'lucide-react';

export default function MissionBriefing() {
  const { astronaut, navigateTo, getAstronautRank } = useMission();
  const rank = getAstronautRank();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-wider">
          <Moon className="w-3.5 h-3.5" />
          <span>FLIGHT DIRECTIVE • EXPEDITION LUNAR-1</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight">
          Artemis Mission Briefing
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Attention Cadet <span className="text-cyan-400 font-bold">{astronaut?.name || 'Astronaut'}</span> ({rank}). 
          Review the mission flight plan, operational risks, and surface objectives before initiating pre-launch countdown.
        </p>
      </div>

      <div className="glass-panel rounded-2xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-8">
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px]">SPACECRAFT</span>
            <span className="font-bold text-slate-200">Orion Crew Vehicle (Artemis III)</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">LAUNCH VEHICLE</span>
            <span className="font-bold text-slate-200">SLS Block 1B Heavy</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">TARGET LANDING</span>
            <span className="font-bold text-cyan-400">Lunar South Pole (-89.9° S)</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">FLIGHT DIRECTIVITY</span>
            <span className="font-bold text-emerald-400">GO FOR LAUNCH PAD</span>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>PRIMARY EXPEDITION OBJECTIVES</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 text-xs font-mono flex items-center justify-center">1</span>
                <span>TLI & Systems Triage</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Execute Trans-Lunar Injection burn. Monitor environmental ECLSS pressures, solar array output, and resolve any in-flight CME storms or communication disruptions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
                <span className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 text-xs font-mono flex items-center justify-center">2</span>
                <span>Powered Descent & Landing</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Perform Lunar Orbit Insertion (LOI). Throttle descent propulsion engines to achieve a touchdown velocity of less than 2.0 m/s on the plateau of Shackleton Crater.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                <span className="w-6 h-6 rounded bg-purple-500/20 text-purple-400 text-xs font-mono flex items-center justify-center">3</span>
                <span>Surface Science Survey</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deploy lunar rover sensors across 6 key science challenges: confirm subsurface volatile water ice, assess slope safety, and analyze regolith compositions.
              </p>
            </div>

          </div>
        </div>

        
        <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-xs space-y-3">
          <div className="font-mono text-amber-400 font-bold flex items-center gap-2 text-xs uppercase">
            <AlertTriangle className="w-4 h-4" />
            <span>OPERATIONAL FLIGHT HAZARDS BRIEFING</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300 leading-relaxed">
            <div>
              <strong className="text-white block mb-0.5">• High-Energy Solar Storms (CME):</strong>
              During cislunar transit, the craft exits Earth's magnetosphere. Solar flares can spike proton radiation fluxes to over 100 MeV within 20 minutes, requiring immediate water-wall shielding shelter.
            </div>
            <div>
              <strong className="text-white block mb-0.5">• Extreme Lunar Thermal Gradients:</strong>
              With zero atmosphere to conduct heat, surfaces in sunlight reach +120°C while adjacent shadows plummet to -230°C. Passive Thermal Control (PTC 'barbecue roll') must be initiated if radiator loops overheat.
            </div>
          </div>
        </div>

       
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <div className="text-xs font-mono text-slate-400">
            STATUS: <span className="text-emerald-400 font-bold">READY FOR PRE-LAUNCH CHECKLIST</span>
          </div>

          <button
            onClick={() => navigateTo('launch')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2"
          >
            <span>Proceed to Launch Pad & Checklist</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
