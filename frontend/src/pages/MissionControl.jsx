import React, { useState, useEffect } from 'react';
import { useMission } from '../context/MissionContext';
import TelemetryHUD from '../components/TelemetryHUD';
import EmergencyAlertModal from '../components/EmergencyAlertModal';
import AstraChat from '../components/AstraChat';
import { 
  AlertOctagon, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  Moon,
  Globe
} from 'lucide-react';

import { DEFAULT_SCENARIOS } from '../data/missionsData';
import { safeFetchJson } from '../utils/api';

export default function MissionControl() {
  const { 
    missionState, 
    activeEmergency, 
    setActiveEmergency, 
    navigateTo 
  } = useMission();

  const [scenarios, setScenarios] = useState(DEFAULT_SCENARIOS);
  const [selectedScenarioForModal, setSelectedScenarioForModal] = useState(activeEmergency);
  const [isAstraChatOpen, setIsAstraChatOpen] = useState(false);

  // Sync selectedScenarioForModal if activeEmergency changes or is restored
  useEffect(() => {
    if (activeEmergency) {
      setSelectedScenarioForModal(activeEmergency);
    }
  }, [activeEmergency]);


  useEffect(() => {
    let isMounted = true;
    safeFetchJson('/api/missions/scenarios', {}, DEFAULT_SCENARIOS).then(data => {
      if (!isMounted) return;
      const list = Array.isArray(data) && data.length > 0 ? data : DEFAULT_SCENARIOS;
      setScenarios(list);
      
      if (!activeEmergency && missionState.emergenciesResolved === 0 && list.length > 0) {
        setSelectedScenarioForModal(list[0]);
        setActiveEmergency(list[0]);
      } else if (activeEmergency) {
        setSelectedScenarioForModal(activeEmergency);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const handleTriggerEmergency = (sc) => {
    setSelectedScenarioForModal(sc);
    setActiveEmergency(sc);
  };

  const handleEmergencyResolved = (result) => {
    setSelectedScenarioForModal(null);
    setActiveEmergency(null);
  };

  const canLandOnMoon = missionState.emergenciesResolved >= 1 || missionState.score >= 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      
      <TelemetryHUD />

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        
        <div className="lg:col-span-2 space-y-6">
          
          
          <div className="glass-panel rounded-2xl border border-cyan-500/30 p-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>ORION CISLUNAR TRAJECTORY RADAR</span>
              </div>
              <span className="text-slate-400">PROPULSION: ESM CO-ORBIT</span>
            </div>

            
            <div className="relative h-44 my-4 rounded-xl bg-space-950/80 border border-slate-800/80 flex items-center justify-between px-8 overflow-hidden">
              <div className="absolute inset-0 stars-bg opacity-50" />
              
              
              <div className="relative flex flex-col items-center z-10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-teal-400 to-blue-300 shadow-lg shadow-blue-500/30 flex items-center justify-center border border-blue-400">
                  <Globe className="w-8 h-8 text-slate-950/70" />
                </div>
                <span className="text-[10px] font-mono text-cyan-400 mt-2 font-bold">EARTH (LEO)</span>
                <span className="text-[9px] font-mono text-slate-500">T+04:12</span>
              </div>

             
              <div className="flex-1 relative flex items-center justify-center px-4">
                <div className="w-full h-0.5 border-t-2 border-dashed border-cyan-500/40 relative">
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-500/30 animate-pulse">
                      <span className="text-sm">🚀</span>
                    </div>
                    <span className="text-[9px] font-mono text-amber-300 bg-slate-900/90 px-1.5 py-0.5 rounded border border-amber-500/30 mt-1 whitespace-nowrap">
                      Distance: 284,000 km
                    </span>
                  </div>
                </div>
              </div>

             
              <div className="relative flex flex-col items-center z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-400 to-slate-200 shadow-lg shadow-slate-300/20 flex items-center justify-center border border-slate-300">
                  <Moon className="w-7 h-7 text-slate-900/80" />
                </div>
                <span className="text-[10px] font-mono text-slate-200 mt-2 font-bold">MOON (SHACKLETON)</span>
                <span className="text-[9px] font-mono text-emerald-400">Descent Vector Locked</span>
              </div>
            </div>

            {/* Active Flight Objective Callout */}
            <div className="p-3 rounded-lg bg-slate-900/90 border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold uppercase">CURRENT FLIGHT OBJECTIVE:</span>
                <span className="text-slate-200">Mitigate cislunar environmental emergencies and maintain cabin life support.</span>
              </div>
              <span className="text-emerald-400 font-bold hidden sm:block">STATUS: IN TRANSIT</span>
            </div>
          </div>

        
          <div className="glass-panel rounded-2xl border border-cyan-500/30 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-red-400" />
                  <span>Cislunar Emergency Scenarios (Interactive Engine)</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Encounter high-stakes physics anomalies. Choose options to protect crew & spacecraft.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Resolved: <strong className="text-emerald-400 font-mono">{missionState.emergenciesResolved}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scenarios.map((sc) => {
                const isResolved = missionState.history.some(h => h.scenarioId === sc.id && h.isCorrect);
                return (
                  <div
                    key={sc.id}
                    className={`p-4 rounded-xl border text-left flex flex-col justify-between transition ${
                      isResolved
                        ? 'bg-slate-900/60 border-slate-800'
                        : 'bg-slate-900/90 border-slate-700 hover:border-red-400 shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                          {sc.category}
                        </span>
                        {isResolved ? (
                          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>CLEARED</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-red-400 font-bold uppercase">
                            {sc.severity} PRIORITY
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-sm text-white mb-1">{sc.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {sc.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-slate-800 flex justify-between items-center">
                      <span className="text-[11px] font-mono text-cyan-400">+150 XP</span>
                      <button
                        onClick={() => handleTriggerEmergency(sc)}
                        className={`px-3 py-1.5 rounded text-xs font-mono uppercase font-bold transition ${
                          isResolved
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                            : 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/30'
                        }`}
                      >
                        {isResolved ? 'Re-examine Event' : 'Respond to Emergency'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-400">
                {canLandOnMoon 
                  ? "ORBITAL DYNAMICS: LUNAR DESCENT WINDOW CONFIRMED." 
                  : "Resolve at least 1 in-flight emergency to calibrate landing telemetry."}
              </div>

              <button
                disabled={!canLandOnMoon}
                onClick={() => navigateTo('moon_landing')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <span>Initiate Powered Moon Landing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        <div className="space-y-6">
          
          <div className="glass-panel rounded-2xl border border-cyan-500/30 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">ASTRA AI Flight Link</h3>
                  <span className="text-[10px] font-mono text-emerald-400">TELEMETRY STREAM SYNCHRONIZED</span>
                </div>
              </div>
              <button
                onClick={() => setIsAstraChatOpen(true)}
                className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition"
              >
                Open Full Radio
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/20 text-xs text-slate-200 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400">
                <span>FLIGHT DIRECTOR ADVISORY</span>
                <span>JUST NOW</span>
              </div>
              <p className="leading-relaxed">
                "Orion trajectory is traversing the Van Allen proton boundaries. All secondary life support systems and radiator loops are monitored. Cadet, keep your eyes on oxygen pressure and power bus levels."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => setIsAstraChatOpen(true)}
                className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-center transition"
              >
                Check System Health
              </button>
              <button
                onClick={() => setIsAstraChatOpen(true)}
                className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-center transition"
              >
                Explain Physics
              </button>
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-3">
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              FLIGHT TELEMETRY LOG
            </h3>
            
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <span className="text-emerald-400 font-bold block mb-0.5">[T+00:10] LIFTOFF CONFIRMED</span>
                Kennedy Space Center pad cleared. Solid rocket boosters separated at 45 km.
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <span className="text-cyan-400 font-bold block mb-0.5">[T+01:45] TLI BURN COMPLETE</span>
                Trans-Lunar Injection velocity reached 10.8 km/s. Cislunar transit phase active.
              </div>

              {missionState.history.map((h, i) => (
                <div 
                  key={i} 
                  className={`p-2.5 rounded border ${
                    h.isCorrect 
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
                      : 'bg-red-950/40 border-red-500/40 text-red-200'
                  }`}
                >
                  <span className="font-bold block mb-0.5">
                    [{h.isCorrect ? 'RESOLVED' : 'WARNING'}] {h.scenarioTitle}
                  </span>
                  {h.message}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Emergency Modal Component */}
      {selectedScenarioForModal && (
        <EmergencyAlertModal
          scenario={selectedScenarioForModal}
          onResolved={handleEmergencyResolved}
          onDismiss={() => setSelectedScenarioForModal(null)}
        />
      )}

      <AstraChat
        isOpen={isAstraChatOpen}
        onClose={() => setIsAstraChatOpen(false)}
      />

    </div>
  );
}
