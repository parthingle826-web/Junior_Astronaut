import React from 'react';
import { useMission } from '../context/MissionContext';
import { 
  Rocket, 
  Award, 
  BookOpen, 
  Compass, 
  Radio, 
  Database, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Lock,
  UserCheck,
  LogOut
} from 'lucide-react';

export default function AstronautDashboard() {
  const { 
    astronaut, 
    missionState, 
    trainingScores, 
    lunarSolved, 
    getAstronautRank, 
    navigateTo,
    requestLogout
  } = useMission();

  if (!astronaut) {
    navigateTo('register');
    return null;
  }

  const rank = getAstronautRank();
  const completedTrainingCount = Object.keys(trainingScores).length;
  const completedLunarCount = Object.keys(lunarSolved).length;


  const trainingPct = (completedTrainingCount / 4) * 25;
  const checklistPct = missionState.currentPhase !== 'pre_launch' ? 15 : 0;
  const emergenciesPct = Math.min(30, (missionState.emergenciesResolved / 3) * 30);
  const lunarPct = (completedLunarCount / 6) * 30;
  const totalProgress = Math.min(100, Math.round(trainingPct + checklistPct + emergenciesPct + lunarPct));

  const allBadges = [
    { id: "Mission Ready", name: "Mission Ready", icon: "🚀", desc: "Enrolled in Artemis Training Program" },
    { id: "Systems Expert", name: "Systems Expert", icon: "⚡", desc: "Completed all 4 academy flight modules" },
    { id: "Emergency Responder", name: "Emergency Responder", icon: "🛡️", desc: "Successfully resolved an in-flight crisis" },
    { id: "Lunar Explorer", name: "Lunar Explorer", icon: "🌙", desc: "Solved 3+ surface science challenges" },
    { id: "Science Explorer", name: "Science Explorer", icon: "🔬", desc: "Analyzed live NASA observational data" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
    
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-cyan-500/30 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/20">
            {astronaut.avatar || '👨‍🚀'}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                {astronaut.id}
              </span>
              <span className="text-xs font-mono text-slate-400">CALLSIGN: "{astronaut.callsign}"</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Welcome Back, Cadet {astronaut.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Assigned Mission: <span className="text-cyan-300 font-semibold">Artemis Lunar Research</span> • Current Rank: <span className="text-amber-400 font-bold font-mono">{rank}</span>
            </p>
          </div>
        </div>

        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={requestLogout}
            title="Switch Candidate (Clears saved session so a new astronaut can register)"
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-red-950/40 border border-slate-700 hover:border-red-500/50 text-slate-300 hover:text-red-300 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Switch Astronaut</span>
          </button>

          <button
            onClick={() => {
              if (completedTrainingCount < 4) {
                navigateTo('training');
              } else if (missionState.currentPhase === 'pre_launch') {
                navigateTo('launch');
              } else if (completedLunarCount < 6) {
                navigateTo('lunar_exploration');
              } else {
                navigateTo('report');
              }
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            <span>
              {completedTrainingCount < 4 
                ? 'Continue Training' 
                : missionState.currentPhase === 'pre_launch' 
                ? 'Proceed to Launch Pad' 
                : 'Resume Lunar Mission'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 mb-1">TOTAL EXPERIENCE</div>
          <div className="text-2xl font-bold font-mono text-cyan-300">{missionState.xp} <span className="text-xs text-cyan-500">XP</span></div>
          <div className="text-[10px] text-slate-500 mt-1">Next rank at {missionState.xp < 250 ? '250' : missionState.xp < 500 ? '500' : '800'} XP</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 mb-1">FLIGHT SCORE</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{missionState.score} <span className="text-xs text-emerald-600">PTS</span></div>
          <div className="text-[10px] text-slate-500 mt-1">{missionState.emergenciesResolved} emergencies resolved</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 mb-1">MISSION PROGRESS</div>
          <div className="text-2xl font-bold font-mono text-sky-400">{totalProgress}%</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-sky-400 h-full transition-all duration-500" style={{ width: `${totalProgress}%` }} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 mb-1">BADGES UNLOCKED</div>
          <div className="text-2xl font-bold font-mono text-amber-400">{missionState.badges.length} <span className="text-xs text-amber-600">/ 5</span></div>
          <div className="text-[10px] text-slate-500 mt-1">Astronaut achievement awards</div>
        </div>
      </div>

     
      <div>
        <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4">MISSION ROADMAP & PHASES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div 
            onClick={() => navigateTo('training')}
            className="p-5 rounded-xl glass-panel border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                completedTrainingCount === 4 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
              }`}>
                {completedTrainingCount === 4 ? 'COMPLETE (4/4)' : `${completedTrainingCount}/4 MODULES`}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition">1. Astronaut Academy</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Master orbital free-fall, closed-loop ECLSS life support, power arrays, and procedural fault triage.
            </p>
            <div className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              <span>Enter Academy</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

         
          <div 
            onClick={() => navigateTo('launch')}
            className="p-5 rounded-xl glass-panel border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Rocket className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {missionState.currentPhase === 'pre_launch' ? 'READY FOR PAD' : 'LAUNCHED'}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition">2. Launch & Space Travel</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Complete pre-launch cryogenic checks, execute countdown ignition, and survive in-flight solar storms and leaks.
            </p>
            <div className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              <span>Go to Flight Operations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          <div 
            onClick={() => navigateTo('lunar_exploration')}
            className="p-5 rounded-xl glass-panel border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                completedLunarCount === 6 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
              }`}>
                {completedLunarCount}/6 SCIENCE TASKS
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition">3. Lunar Base Exploration</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Touch down at Shackleton Crater rim, evaluate radar profiles, and confirm water ice volatile deposits.
            </p>
            <div className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              <span>Access Lunar Surface</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

        </div>
      </div>

    
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">ACHIEVEMENT HONORS & BADGES</h2>
          <span className="text-xs text-slate-400 font-mono">{missionState.badges.length} of {allBadges.length} Unlocked</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {allBadges.map((badge) => {
            const isUnlocked = missionState.badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border text-center transition ${
                  isUnlocked
                    ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : 'bg-space-950/40 border-slate-800/80 opacity-50'
                }`}
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-slate-800 flex items-center justify-center text-2xl">
                  {isUnlocked ? badge.icon : <Lock className="w-4 h-4 text-slate-500" />}
                </div>
                <div className="font-bold text-xs text-white mb-1">{badge.name}</div>
                <div className="text-[10px] text-slate-400 leading-tight">{badge.desc}</div>
                {isUnlocked && (
                  <span className="inline-block mt-2 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    UNLOCKED
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
