import React, { useState, useEffect } from 'react';
import { useMission } from '../context/MissionContext';
import { 
  Rocket, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Flame, 
  Sparkles
} from 'lucide-react';

export default function LaunchSequence() {
  const { checklist, resolvePreLaunchWarning, navigateTo, setMissionState } = useMission();
  
  const [isLaunching, setIsLaunching] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [launchStage, setLaunchStage] = useState('pad'); // pad, ignition, liftoff, staging, orbit
  const [telemetryAltitude, setTelemetryAltitude] = useState(0); // km
  const [telemetryVelocity, setTelemetryVelocity] = useState(0); // km/s

  const allChecksReady = 
    checklist.eclssNominal && 
    checklist.fuelPressurized && 
    checklist.avionicsLocked && 
    checklist.sensorDiscrepancyResolved && 
    checklist.hatchSealed;

  // Handle countdown and launch trajectory animation
  useEffect(() => {
    let interval = null;
    if (isLaunching && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (isLaunching && countdown === 0) {
      // Trigger Launch Sequence Stages
      setLaunchStage('liftoff');
      
      const flightTimer = setInterval(() => {
        setTelemetryAltitude(alt => {
          if (alt >= 380) {
            clearInterval(flightTimer);
            setLaunchStage('orbit');
            setMissionState(ms => ({
              ...ms,
              currentPhase: 'space_travel',
              xp: ms.xp + 100,
              score: ms.score + 50
            }));
            setTimeout(() => {
              navigateTo('mission_control');
            }, 2500);
            return 380;
          }
          return alt + 18;
        });

        setTelemetryVelocity(vel => Math.min(10.8, Number((vel + 0.45).toFixed(2))));
      }, 150);

      return () => clearInterval(flightTimer);
    }
    return () => clearInterval(interval);
  }, [isLaunching, countdown]);

  const handleStartCountdown = () => {
    if (!allChecksReady) return;
    setIsLaunching(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-wider">
          <Rocket className="w-3.5 h-3.5" />
          <span>KENNEDY SPACE CENTER • LAUNCH COMPLEX 39B</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
          Pre-Launch Checklist & Ignition
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Verify all safety interlocks and resolve telemetry anomalies prior to booster ignition.
        </p>
      </div>

      {!isLaunching ? (
        /* Pre-Launch Verification Deck */
        <div className="glass-panel rounded-2xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">Flight Readiness Verification</h2>
              <p className="text-xs text-slate-400">5 Critical Pad Systems Mandatory Before T-10</p>
            </div>
            <span className={`text-xs font-mono px-2.5 py-1 rounded font-bold ${
              allChecksReady 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            }`}>
              {allChecksReady ? 'STATUS: GO FOR LAUNCH' : 'STATUS: HOLD — RESOLVE WARNING'}
            </span>
          </div>

          {/* Checklist Items */}
          <div className="space-y-3">
            
            {/* Check 1 */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">ECLSS Primary Atmosphere & Oxygen Reserves</div>
                  <div className="text-[11px] text-slate-400">Cabin pressurized to 101.3 kPa, 21% O2 / 78% N2 nominal.</div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                VERIFIED
              </span>
            </div>

            {/* Check 2 */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">Liquid Hydrogen & Liquid Oxygen Cryogenic Fueling</div>
                  <div className="text-[11px] text-slate-400">Core stage propellant loaded at -253°C. Ullage pressure nominal.</div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                VERIFIED
              </span>
            </div>

            {/* Check 3: The Deliberate Warning Anomaly */}
            <div className={`p-4 rounded-xl border transition ${
              checklist.sensorDiscrepancyResolved
                ? 'bg-slate-900/80 border-slate-800'
                : 'bg-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-500/10'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  {checklist.sensorDiscrepancyResolved ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-bounce" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white">
                        Cryogenic Tank 2 Pressure Transducer Telemetry
                      </span>
                      {!checklist.sensorDiscrepancyResolved && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold uppercase">
                          Action Required
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      {checklist.sensorDiscrepancyResolved
                        ? "Sensor discrepancy cleared: Cross-verified with ground acoustic monitors. True pressure confirmed at 310 kPa."
                        : "WARNING: Sensor A reports 310 kPa while Sensor B reports 342 kPa. Relief valve cycle and redundant transducer cross-calibration required before ignition."}
                    </p>
                  </div>
                </div>

                {!checklist.sensorDiscrepancyResolved ? (
                  <button
                    onClick={resolvePreLaunchWarning}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition shrink-0 shadow-md shadow-amber-500/20"
                  >
                    Cycle Valve & Clear Anomaly
                  </button>
                ) : (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
                    RESOLVED (+50 XP)
                  </span>
                )}
              </div>
            </div>

            {/* Check 4 */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">Star-Tracker Guidance & Flight Software</div>
                  <div className="text-[11px] text-slate-400">Triple-redundant flight computers locked onto cislunar navigation vectors.</div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                VERIFIED
              </span>
            </div>

            {/* Check 5 */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">Capsule Hatch Interlocks & Range Safety</div>
                  <div className="text-[11px] text-slate-400">Pad blast perimeter clear. Eastern Range radar telemetry active.</div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                VERIFIED
              </span>
            </div>

          </div>

          {/* Ignition Control Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <div className="text-xs font-mono text-slate-400">
              {allChecksReady 
                ? "LAUNCH CONTROLLER: ALL STATIONS GO." 
                : "LAUNCH CONTROLLER: HOLD T-10 UNTIL ANOMALY IS RESOLVED."}
            </div>

            <button
              disabled={!allChecksReady}
              onClick={handleStartCountdown}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              <span>Initiate T-10 Launch Countdown</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* Animated Launch Sequence View */
        <div className="glass-panel rounded-2xl border border-cyan-500/40 p-8 shadow-2xl text-center space-y-8 relative overflow-hidden">
          
          {/* Animated Rocket Launch Visual */}
          <div className="relative h-64 w-full bg-gradient-to-b from-space-950 via-slate-900 to-space-950 rounded-xl border border-cyan-500/20 flex flex-col items-center justify-center overflow-hidden">
            
            {/* Stars background animation */}
            <div className="absolute inset-0 stars-bg opacity-70 animate-pulse" />

            {/* Trajectory Rocket */}
            <div className={`relative transition-all duration-1000 ${
              countdown > 0 ? 'translate-y-8' : '-translate-y-12 scale-110'
            }`}>
              <div className="w-16 h-28 mx-auto flex flex-col items-center">
                {/* Rocket Capsule & Fairing */}
                <div className="w-8 h-12 bg-slate-200 rounded-t-full border border-slate-400 flex items-center justify-center shadow-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/80 border border-cyan-300" />
                </div>
                {/* Rocket Main Booster Core */}
                <div className="w-10 h-16 bg-gradient-to-b from-orange-500 via-orange-600 to-orange-700 rounded-b-md relative flex items-center justify-center border border-orange-400">
                  <span className="text-[9px] font-mono text-white font-bold rotate-90">NASA</span>
                  {/* Solid Rocket Boosters on side */}
                  <div className="absolute -left-2 top-2 w-2 h-14 bg-slate-100 rounded-full border border-slate-300" />
                  <div className="absolute -right-2 top-2 w-2 h-14 bg-slate-100 rounded-full border border-slate-300" />
                </div>

                {/* Ignition Plume */}
                {countdown <= 3 && (
                  <div className="flex flex-col items-center -mt-1 animate-pulse">
                    <div className="w-8 h-12 bg-gradient-to-b from-yellow-300 via-orange-500 to-transparent rounded-b-full blur-[1px]" />
                    <Flame className="w-6 h-6 text-orange-400 -mt-8 animate-bounce" />
                  </div>
                )}
              </div>
            </div>

            {/* Launch Callout Text Overlay */}
            <div className="absolute bottom-3 left-4 right-4 flex justify-between text-xs font-mono text-cyan-400">
              <span>TRAJECTORY: {launchStage.toUpperCase()}</span>
              <span>SLS BOOSTER STAGE: {countdown > 0 ? 'ARMED' : 'BURNING'}</span>
            </div>
          </div>

          {/* Countdown & Live Telemetry Readout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
            
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">COUNTDOWN CLOCK</div>
              <div className={`text-4xl font-extrabold mt-1 ${countdown > 0 ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`}>
                {countdown > 0 ? `T-${countdown}` : 'LIFTOFF!'}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                {countdown > 5 ? 'Awaiting Terminal Count' : countdown > 0 ? 'Main Engine Ignition' : 'Solid Boosters Engaged'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">CURRENT ALTITUDE</div>
              <div className="text-3xl font-bold text-cyan-300 mt-1">{telemetryAltitude} km</div>
              <div className="text-[10px] text-slate-500 mt-1">
                {telemetryAltitude > 300 ? 'Low Earth Orbit (LEO)' : telemetryAltitude > 80 ? 'Karman Line Cleared' : 'Atmospheric Ascent'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">ORBITAL VELOCITY</div>
              <div className="text-3xl font-bold text-emerald-400 mt-1">{telemetryVelocity} km/s</div>
              <div className="text-[10px] text-slate-500 mt-1">
                Target Escape: 11.2 km/s (Trans-Lunar Injection)
              </div>
            </div>

          </div>

          {/* Direct Transfer Button (or Auto) */}
          {launchStage === 'orbit' && (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs font-mono flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>ORBIT ACHIEVED! TLI BURN NOMINAL. TRANSFERRING TO MISSION CONTROL...</span>
              </div>
              <button
                onClick={() => navigateTo('mission_control')}
                className="px-4 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase text-xs"
              >
                Enter Mission Control
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
