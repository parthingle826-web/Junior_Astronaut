import React, { useState, useEffect } from 'react';
import { useMission } from '../context/MissionContext';
import { 
  Compass, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  Activity, 
  Fuel, 
  Sparkles,
  Moon
} from 'lucide-react';

export default function MoonLanding() {
  const { navigateTo, setMissionState } = useMission();

  const [altitude, setAltitude] = useState(1800); // meters
  const [velocity, setVelocity] = useState(24.0); // m/s descent
  const [fuel, setFuel] = useState(85); // %
  const [thrustLevel, setThrustLevel] = useState(0); // 0 to 100%
  const [landingStatus, setLandingStatus] = useState('descent'); // descent, touched_down, crashed
  const [radarPing, setRadarPing] = useState(true);

  // Dynamic physics simulation loop
  useEffect(() => {
    if (landingStatus !== 'descent') return;

    const interval = setInterval(() => {
      // Lunar gravity ~ 1.62 m/s^2 downwards
      // Thrust pushes upwards
      setThrustLevel(t => {
        setVelocity(v => {
          const upwardAccel = (t / 100) * 4.8;
          const netAccel = 1.62 - upwardAccel;
          const newVel = Number(Math.max(0.2, v + netAccel * 0.2).toFixed(1));
          
          setAltitude(a => {
            const newAlt = Math.max(0, Math.round(a - newVel * 0.4));
            if (newAlt <= 0) {
              clearInterval(interval);
              if (newVel <= 3.5) {
                setLandingStatus('touched_down');
                setMissionState(ms => ({
                  ...ms,
                  currentPhase: 'lunar_exploration',
                  xp: ms.xp + 150,
                  score: ms.score + 100,
                  badges: ms.badges.includes("Lunar Explorer") ? ms.badges : [...ms.badges, "Lunar Explorer"]
                }));
              } else {
                setLandingStatus('crashed');
              }
              return 0;
            }
            return newAlt;
          });

          return newVel;
        });

        if (t > 0) {
          setFuel(f => Math.max(0, f - 0.25));
        }
        return t;
      });

      setRadarPing(p => !p);
    }, 200);

    return () => clearInterval(interval);
  }, [landingStatus]);

  const applyThrust = (level) => {
    if (fuel <= 0 || landingStatus !== 'descent') return;
    setThrustLevel(level);
  };

  const handleResetDescent = () => {
    setAltitude(1800);
    setVelocity(24.0);
    setFuel(85);
    setThrustLevel(0);
    setLandingStatus('descent');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-wider">
          <Moon className="w-3.5 h-3.5" />
          <span>TERMINAL DESCENT PHASE • SHACKLETON CRATER PLATEAU</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight">
          Powered Lunar Landing
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Throttle the descent retrorockets to achieve a touchdown velocity under 3.0 m/s without expending all propellant.
        </p>
      </div>

      {/* Main Lander HUD Simulator */}
      <div className="glass-panel rounded-2xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Radar & Visual Altimeter Box */}
        <div className="relative h-72 w-full rounded-xl bg-space-950 border border-slate-800 flex flex-col justify-between p-4 overflow-hidden">
          
          {/* Top radar telemetry line */}
          <div className="flex justify-between items-center text-xs font-mono text-cyan-400 z-10">
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${radarPing ? 'bg-cyan-400' : 'bg-cyan-900'} transition-colors`} />
              LIDAR TERRAIN MAPPING: ACTIVE
            </span>
            <span>TARGET SLOPE: 3.2° (NOMINAL)</span>
          </div>

          {/* Lander graphic position based on altitude */}
          <div className="relative flex-1 flex items-center justify-center">
            
            {/* Visual Lander */}
            <div 
              className="absolute transition-all duration-300 flex flex-col items-center z-10"
              style={{
                bottom: `${Math.min(200, (altitude / 1800) * 190)}px`,
              }}
            >
              {/* Lunar Module Capsule */}
              <div className="w-12 h-10 rounded-t-lg bg-slate-200 border-2 border-slate-400 flex items-center justify-center shadow-lg">
                <div className="w-3 h-3 rounded-full bg-cyan-500/80 border border-cyan-300" />
              </div>
              {/* Descent Stage (Gold Foil) */}
              <div className="w-16 h-8 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 rounded-b-md relative flex items-center justify-center border border-amber-300">
                {/* Landing legs */}
                <div className="absolute -bottom-2 -left-2 w-3 h-5 border-l-2 border-slate-300 -rotate-45" />
                <div className="absolute -bottom-2 -right-2 w-3 h-5 border-r-2 border-slate-300 rotate-45" />
              </div>

              {/* Rocket Thruster Flame */}
              {thrustLevel > 0 && landingStatus === 'descent' && (
                <div className="flex flex-col items-center animate-pulse">
                  <div 
                    className="w-4 bg-gradient-to-b from-cyan-300 via-blue-500 to-transparent rounded-b-full"
                    style={{ height: `${(thrustLevel / 100) * 45}px` }}
                  />
                </div>
              )}
            </div>

            {/* Moon Surface Line */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-slate-700 to-slate-600 border-t-2 border-slate-400 flex items-center justify-center">
              <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                LUNAR SOUTH POLE REGOLITH SURFACE
              </span>
            </div>

          </div>

          {/* Bottom Landing Status Result Overlay */}
          {landingStatus !== 'descent' && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fadeIn">
              {landingStatus === 'touched_down' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    TOUCHDOWN CONFIRMED!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md font-mono">
                    "Houston, Tranquility Base here. The Orion Lunar Module has touched down at Shackleton Crater rim." (Final touchdown velocity: {velocity} m/s)
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigateTo('lunar_exploration')}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-xl shadow-emerald-500/25 flex items-center gap-2"
                    >
                      <span>Deploy Lunar Surface Science</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-400 flex items-center justify-center text-red-400">
                    <AlertTriangle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">HARD IMPACT DETECTED</h3>
                  <p className="text-xs text-slate-300 max-w-md font-mono">
                    Touchdown velocity of {velocity} m/s exceeded safe landing gear limits (max 3.5 m/s). Resetting simulation for retry.
                  </p>
                  <button
                    onClick={handleResetDescent}
                    className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider transition"
                  >
                    Retry Lunar Descent
                  </button>
                </>
              )}
            </div>
          )}

        </div>

        {/* Telemetry Numbers Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
          
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-0.5">RADAR ALTITUDE</span>
            <span className="text-2xl font-bold text-cyan-300">{altitude} <span className="text-xs text-slate-400">m</span></span>
            <div className="text-[10px] text-slate-500 mt-1">Ground clearance</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-0.5">DESCENT RATE</span>
            <span className={`text-2xl font-bold ${velocity <= 3.5 ? 'text-emerald-400' : 'text-red-400'}`}>
              {velocity} <span className="text-xs text-slate-400">m/s</span>
            </span>
            <div className="text-[10px] text-slate-500 mt-1">Target: &lt; 3.0 m/s</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-0.5">DESCENT FUEL</span>
            <span className={`text-2xl font-bold ${fuel > 20 ? 'text-yellow-400' : 'text-red-400'}`}>
              {Math.round(fuel)}%
            </span>
            <div className="text-[10px] text-slate-500 mt-1">Monomethylhydrazine</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-0.5">THROTTLE LEVEL</span>
            <span className="text-2xl font-bold text-purple-400">{thrustLevel}%</span>
            <div className="text-[10px] text-slate-500 mt-1">Gimbaled Pintle Thruster</div>
          </div>

        </div>

        {/* Retrorocket Throttle Buttons */}
        {landingStatus === 'descent' && (
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span>MANUAL RETROROCKET THROTTLE CONTROLS:</span>
              <span className="text-cyan-400">Click and hold to brake descent</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => applyThrust(0)}
                className={`py-3 rounded-lg border text-xs font-mono font-bold uppercase transition ${
                  thrustLevel === 0 ? 'bg-slate-700 border-cyan-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                0% Freefall
              </button>
              <button
                onClick={() => applyThrust(35)}
                className={`py-3 rounded-lg border text-xs font-mono font-bold uppercase transition ${
                  thrustLevel === 35 ? 'bg-cyan-600 border-cyan-300 text-slate-950' : 'bg-slate-800 border-slate-700 text-cyan-300'
                }`}
              >
                35% Vernier Burn
              </button>
              <button
                onClick={() => applyThrust(70)}
                className={`py-3 rounded-lg border text-xs font-mono font-bold uppercase transition ${
                  thrustLevel === 70 ? 'bg-cyan-600 border-cyan-300 text-slate-950' : 'bg-slate-800 border-slate-700 text-cyan-300'
                }`}
              >
                70% Main Braking
              </button>
              <button
                onClick={() => applyThrust(100)}
                className={`py-3 rounded-lg border text-xs font-mono font-bold uppercase transition ${
                  thrustLevel === 100 ? 'bg-amber-500 border-amber-300 text-slate-950' : 'bg-slate-800 border-slate-700 text-amber-400'
                }`}
              >
                100% Full Abort Burn
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
