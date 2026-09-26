import React from 'react';
import { useMission } from '../context/MissionContext';
import { 
  Rocket, 
  Compass, 
  ShieldCheck, 
  Radio, 
  Database, 
  Award, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  Bot,
  Zap,
  Globe2,
  Moon
} from 'lucide-react';

export default function LandingPage() {
  const { navigateTo, astronaut, activateDemoMode } = useMission();

  return (
    <div className="relative overflow-hidden">
      
      {/* Background ambient cosmic glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-3/4 right-10 w-[400px] h-[400px] bg-purple-600/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 shadow-sm shadow-cyan-500/10">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>NASA Space Apps Challenge • Junior Astronaut Mission Trainer</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white mb-6 uppercase">
          Train. Decide. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Explore.</span>
        </h1>

        {/* Tagline */}
        <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-8">
          Step into the flight deck of an Artemis-class lunar mission. Experience real physics, manage critical spaceflight emergencies, analyze authentic NASA telemetry, and earn your Junior Astronaut Achievement Certificate.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => navigateTo(astronaut ? 'dashboard' : 'register')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 group"
          >
            <Rocket className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>{astronaut ? 'Resume Your Mission' : 'Start Your Mission'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigateTo('nasa_data')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-cyan-500/30 font-bold text-sm uppercase tracking-wider transition flex items-center justify-center gap-2"
          >
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Explore NASA Data</span>
          </button>
        </div>

        {/* Hackathon Judge Quick Jump Bar */}
        <div className="max-w-2xl mx-auto p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/40 text-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-base">⏱️</span>
            <div className="text-left">
              <span className="font-bold uppercase tracking-wider block text-white">Judge Fast Track (3-5 Min Demo)</span>
              <span className="text-slate-400">Pre-populates cadet profile & jumps straight into in-flight emergencies:</span>
            </div>
          </div>
          <button
            onClick={() => activateDemoMode('mission_control')}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
          >
            Launch Judge Demo
          </button>
        </div>

        {/* HUD Mockup Showcase */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl glass-panel border border-cyan-500/30 p-2 sm:p-4 shadow-2xl relative">
          <div className="absolute -top-3 left-6 px-3 py-0.5 rounded bg-cyan-950 border border-cyan-500/50 text-cyan-400 font-mono text-[10px] uppercase">
            LIVE FLIGHT TELEMETRY SIMULATION
          </div>
          <div className="bg-space-950/90 rounded-xl p-4 sm:p-6 text-left border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>FLIGHT ORBIT: CISLUNAR INJECTION (TLI)</span>
              </div>
              <div className="text-slate-400">TRAJECTORY: ARTEMIS-II EXPEDITION</div>
              <div className="text-emerald-400 font-bold">ALL SYSTEMS NOMINAL</div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 font-mono">
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <div className="text-[10px] text-slate-400">OXYGEN PRESSURE</div>
                <div className="text-xl font-bold text-cyan-300">101.3 kPa</div>
                <div className="text-[10px] text-emerald-400">Normative 21% O2</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <div className="text-[10px] text-slate-400">CABIN POWER BUS</div>
                <div className="text-xl font-bold text-yellow-300">120.4 VDC</div>
                <div className="text-[10px] text-emerald-400">Solar arrays 100%</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <div className="text-[10px] text-slate-400">DISTANCE TO MOON</div>
                <div className="text-xl font-bold text-blue-300">42,890 km</div>
                <div className="text-[10px] text-slate-400">Descent window open</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <div className="text-[10px] text-slate-400">ASTRA AI FLIGHT LINK</div>
                <div className="text-xl font-bold text-purple-300">CONNECTED</div>
                <div className="text-[10px] text-purple-400">Gemini Powered</div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* How It Works Section (4 Steps: Train / Prepare / Decide / Explore) */}
      <section className="py-16 bg-slate-950/60 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">OPERATIONAL ARCHITECTURE</h2>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-white">How the Mission Trainer Works</h3>
            <p className="text-slate-400 text-sm mt-3">From cadet enrollment to lunar surface science in four scored phases.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Step 1: Train */}
            <div className="p-6 rounded-xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition group">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition">
                <span className="font-mono font-bold text-lg">01</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">1. Train</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complete 4 astronaut academy modules covering orbital dynamics, radiation physics, ECLSS life support, and fault isolation checklists.
              </p>
            </div>

            {/* Step 2: Prepare */}
            <div className="p-6 rounded-xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition group">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition">
                <span className="font-mono font-bold text-lg">02</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">2. Prepare</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive your official mission briefing, run pre-launch checklists, resolve an intentional cryogenic pressure anomaly, and execute liftoff.
              </p>
            </div>

            {/* Step 3: Decide */}
            <div className="p-6 rounded-xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition group">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition">
                <span className="font-mono font-bold text-lg">03</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">3. Decide</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Navigate high-stakes cislunar emergencies: Solar Storm CME, DSN Comm Loss, and O2 Leaks. Your decisions alter telemetry and risk levels.
              </p>
            </div>

            {/* Step 4: Explore */}
            <div className="p-6 rounded-xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition group">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition">
                <span className="font-mono font-bold text-lg">04</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">4. Explore</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Touch down at Shackleton Crater, solve 6 lunar science challenges, query live NASA telemetry, and earn your print-ready certificate.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Mission Choice Preview Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">EXPEDITION ASSIGNMENTS</h2>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">Selectable Flight Missions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Active Mission: Lunar Research */}
          <div className="p-6 rounded-2xl glass-panel border-2 border-cyan-500/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
              ACTIVE MVP MISSION
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Moon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Artemis Lunar Research</h4>
                  <p className="text-xs text-slate-400">Target: Lunar South Pole (Shackleton Crater)</p>
                </div>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                Pilot the Orion spacecraft to the lunar surface. Survive high-energy solar storms, isolate environmental system breaches, land near permanently shadowed regions, and search for subsurface water ice.
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono mb-6">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">DISTANCE</div>
                  <div className="text-slate-200 font-bold">384,400 km</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">DURATION</div>
                  <div className="text-slate-200 font-bold">12-15 Mins</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">XP REWARD</div>
                  <div className="text-cyan-400 font-bold">+1,200 XP</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigateTo(astronaut ? 'briefing' : 'register')}
              className="w-full py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
            >
              Select Artemis Lunar Expedition
            </button>
          </div>

          {/* Mars Exploration: Clearly Labeled Coming Soon Stub */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 relative opacity-75 flex flex-col justify-between">
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold">
              COMING SOON • PROTOTYPE
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Mars Ascent & Delta Base</h4>
                  <p className="text-xs text-slate-400">Target: Jezero Crater / Olympus Mons</p>
                </div>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                Future 500-day deep space interplanetary transit. Advanced nuclear thermal propulsion, atmospheric aerocapture, and automated sample extraction in coordination with Perseverance archive data.
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono mb-6">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">DISTANCE</div>
                  <div className="text-slate-200 font-bold">225M km</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">PROPULSION</div>
                  <div className="text-slate-200 font-bold">NTP Nuclear</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">STATUS</div>
                  <div className="text-amber-400 font-bold">In Research</div>
                </div>
              </div>
            </div>
            <button
              disabled
              className="w-full py-3 rounded-lg bg-slate-800 text-slate-500 font-bold text-xs uppercase tracking-wider cursor-not-allowed border border-slate-700"
            >
              Expedition Locked (Phase 2 Development)
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
