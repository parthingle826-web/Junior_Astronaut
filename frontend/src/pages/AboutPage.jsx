import React from 'react';
import { useMission } from '../context/MissionContext';
import { 
  Rocket, 
  Globe, 
  Cpu, 
  BookOpen, 
  ShieldCheck, 
  HeartHandshake, 
  ExternalLink,
  Target,
  Compass,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  const { navigateTo } = useMission();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-wider">
          <Rocket className="w-3.5 h-3.5" />
          <span>PROJECT ARCHITECTURE & MISSION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight">
          About Junior Astronaut Mission Trainer
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Developed for the NASA Space Apps Challenge to revolutionize experiential aerospace education through interactive cislunar simulation and real-world planetary datasets.
        </p>
      </div>

      {/* Problem & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* The Problem */}
        <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-red-500/30 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-lg">
            !
          </div>
          <h2 className="text-xl font-bold text-white">The Educational Gap</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Conventional science curricula often reduce space exploration to passive textbook memorization or trivial multiple-choice trivia. Students rarely experience the authentic reality of spaceflight: the tight coupling between spacecraft environmental systems, orbital physics, emergency fault isolation under pressure, and interpreting raw planetary telemetry.
          </p>
        </div>

        {/* The Solution */}
        <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-cyan-500/40 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
            ✓
          </div>
          <h2 className="text-xl font-bold text-white">The Mission Trainer Approach</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Junior Astronaut Mission Trainer immerses students in an active flight controller and astronaut role. Through an end-to-end Artemis lunar expedition, cadets learn the physics of orbital free-fall, resolve pre-launch valve anomalies, mitigate solar proton storms using real spacecraft mass-shielding protocols, land at Shackleton Crater, and analyze authentic NASA data.
          </p>
        </div>

      </div>

      {/* Alignment with UN Sustainable Development Goals (SDGs) */}
      <div className="glass-panel rounded-2xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
            GLOBAL IMPACT FRAMEWORK
          </span>
          <h2 className="text-2xl font-bold text-white">
            Contribution to UN Sustainable Development Goals
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            The project actively contributes to global educational and scientific literacy targets (framed as contributions rather than definitive solutions).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* SDG 4 */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded bg-red-500/20 border border-red-500/40 text-red-400 font-mono text-xs font-bold flex items-center justify-center">
                04
              </span>
              <h3 className="font-bold text-sm text-white">SDG 4: Quality Education</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Contributes to:</strong> Broadening free, accessible, and high-engagement STEM resources for students worldwide. Translates complex aerospace engineering into intuitive, gamified learning modules with detailed causal explanations.
            </p>
          </div>

          {/* SDG 9 */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded bg-orange-500/20 border border-orange-500/40 text-orange-400 font-mono text-xs font-bold flex items-center justify-center">
                09
              </span>
              <h3 className="font-bold text-sm text-white">SDG 9: Industry & Innovation</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Contributes to:</strong> Fostering scientific and technological literacy in aerospace systems, software engineering, and robotic exploration, inspiring the next generation of engineers and mission architects.
            </p>
          </div>

          {/* SDG 13 */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center">
                13
              </span>
              <h3 className="font-bold text-sm text-white">SDG 13: Climate Action</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Contributes to:</strong> Planetary perspective and Earth observation awareness by integrating NASA's DSCOVR EPIC full-disc imagery, teaching students how space-based assets monitor global cloud albedo, aerosol dynamics, and space weather.
            </p>
          </div>

        </div>
      </div>

      {/* NASA API Attribution & Architecture */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <span>NASA Open APIs & Open Source Architecture</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          This application connects exclusively to officially maintained NASA public web services via an asynchronous Python FastAPI backend proxy:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <strong className="text-cyan-400 block mb-1">• NASA APOD:</strong>
            Astronomy Picture of the Day educational astrophysics imagery.
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <strong className="text-cyan-400 block mb-1">• DSCOVR EPIC:</strong>
            Full-disc Earth spectral imagery from Sun-Earth L1 orbit.
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <strong className="text-cyan-400 block mb-1">• NASA DONKI:</strong>
            Space Weather Database of real-time solar flares and CME notifications.
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <strong className="text-cyan-400 block mb-1">• NASA Image & Video Library:</strong>
            Lunar Reconnaissance Orbiter (LRO) surface crater mapping archives.
          </div>
        </div>
      </div>

      {/* CTA: Start Mission */}
      <div className="text-center pt-4">
        <button
          onClick={() => navigateTo('training')}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-xl shadow-cyan-500/25 inline-flex items-center gap-2"
        >
          <span>Enroll as an Astronaut Cadet</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
