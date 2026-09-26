import React, { useState, useEffect } from 'react';
import { useMission } from '../context/MissionContext';
import { 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Database,
  Moon
} from 'lucide-react';

import { DEFAULT_LUNAR_CHALLENGES } from '../data/missionsData';
import { safeFetchJson } from '../utils/api';

export default function LunarExploration() {
  const { lunarSolved, solveLunarChallenge, navigateTo } = useMission();

  const [challenges, setChallenges] = useState(DEFAULT_LUNAR_CHALLENGES);
  const [activeChallengeId, setActiveChallengeId] = useState('crater-id');
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    let isMounted = true;
    safeFetchJson('/api/missions/lunar-challenges', {}, DEFAULT_LUNAR_CHALLENGES).then(data => {
      if (!isMounted) return;
      if (Array.isArray(data) && data.length > 0) {
        setChallenges(data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const activeChallenge = challenges.find(c => c.id === activeChallengeId) || challenges[0];
  const completedCount = Object.keys(lunarSolved).length;

  const handleSelectOption = (challengeId, optionId) => {
    if (lunarSolved[challengeId]) return;
    setSelectedAnswers(prev => ({ ...prev, [challengeId]: optionId }));
  };

  const handleSubmitChallenge = async (challengeId) => {
    const selected = selectedAnswers[challengeId];
    if (!selected) return;
    await solveLunarChallenge(challengeId, selected);
  };

  // Map coordinates representing 6 exploration sites near Lunar South Pole
  const siteCoordinates = [
    { id: 'crater-id', name: 'Shackleton Rim Alpha', coords: '89.9°S, 0.0°E', x: '50%', y: '48%', challengeIndex: 0 },
    { id: 'site-safety', name: 'Malapert Mountain Plateau', coords: '84.9°S, 12.9°E', x: '35%', y: '30%', challengeIndex: 1 },
    { id: 'terrain-analysis', name: 'Connecting Ridge Regolith', coords: '89.4°S, 140°W', x: '68%', y: '38%', challengeIndex: 2 },
    { id: 'temperature-graph', name: 'De Gerlache Thermal Trench', coords: '88.5°S, 87.1°W', x: '25%', y: '65%', challengeIndex: 3 },
    { id: 'ice-evidence', name: 'Cabeus Crater Deep Shadow', coords: '84.9°S, 35.5°W', x: '55%', y: '75%', challengeIndex: 4 },
    { id: 'instrument-choice', name: 'Amundsen Ridge Subsurface', coords: '84.5°S, 82.8°E', x: '78%', y: '60%', challengeIndex: 5 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase mb-2">
            <Moon className="w-3.5 h-3.5" />
            <span>LUNAR SOUTH POLE • ARTEMIS BASE CAMP</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
            Lunar Surface Science Exploration
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Conduct 6 field research challenges across the South Pole to verify volatile deposits and landing geology.
          </p>
        </div>

        {/* Score & Progress Badge */}
        <div className="text-right">
          <div className="text-xs font-mono text-slate-400 mb-1">SCIENCE TASKS COMPLETED</div>
          <div className="text-2xl font-bold font-mono text-cyan-400">
            {completedCount} / 6 <span className="text-xs text-slate-400">TASKS</span>
          </div>
          <div className="w-44 bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500" 
              style={{ width: `${(completedCount / 6) * 100}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Active Science Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Lunar South Pole Map (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl border border-cyan-500/30 p-5 shadow-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                LRO Surface Radar Topography
              </span>
              <span className="text-slate-500">89.9°S Lat Datum</span>
            </div>

            {/* Simulated Lunar Crater Radar Map */}
            <div className="relative h-72 w-full my-4 rounded-xl bg-space-950 border border-slate-800 overflow-hidden flex items-center justify-center">
              
              {/* Radar Grid Circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-60 h-60 rounded-full border border-cyan-500/10" />
                <div className="w-40 h-40 rounded-full border border-cyan-500/20" />
                <div className="w-20 h-20 rounded-full border border-cyan-500/30 bg-cyan-950/20" />
                <div className="absolute inset-x-0 h-[1px] bg-cyan-500/10" />
                <div className="absolute inset-y-0 w-[1px] bg-cyan-500/10" />
              </div>

              {/* Site Pins */}
              {siteCoordinates.map((site, i) => {
                const isSolved = !!lunarSolved[site.id];
                const isCurrent = activeChallengeId === site.id;
                return (
                  <button
                    key={site.id}
                    onClick={() => setActiveChallengeId(site.id)}
                    style={{ left: site.x, top: site.y }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition group z-20 ${
                      isCurrent
                        ? 'bg-cyan-500 text-slate-950 scale-125 shadow-lg shadow-cyan-500/50'
                        : isSolved
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                        : 'bg-slate-800 text-slate-300 border border-slate-600 hover:scale-110'
                    }`}
                    title={site.name}
                  >
                    <span className="text-[10px] font-mono font-bold w-4 h-4 flex items-center justify-center">
                      {i + 1}
                    </span>
                  </button>
                );
              })}

              <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-500">
                SCALE: 1:50,000 CISLUNAR GRID
              </div>
            </div>
          </div>

          {/* List of 6 Sites */}
          <div className="space-y-1.5 text-xs font-mono">
            {siteCoordinates.map((site, idx) => {
              const isSolved = !!lunarSolved[site.id];
              const isCurrent = activeChallengeId === site.id;
              return (
                <button
                  key={site.id}
                  onClick={() => setActiveChallengeId(site.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg border transition flex items-center justify-between ${
                    isCurrent
                      ? 'bg-cyan-950/70 border-cyan-400 text-cyan-200'
                      : isSolved
                      ? 'bg-slate-900/60 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate">{site.name}</span>
                  </div>
                  {isSolved ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="text-[10px] text-cyan-400 shrink-0">+50 XP</span>
                  )}
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Column: Active Science Challenge (7 cols) */}
        {activeChallenge && (
          <div className="lg:col-span-7 glass-panel rounded-2xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              
              {/* Challenge Header */}
              <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase">Science Challenge</span>
                  <h2 className="text-xl font-bold text-white mt-0.5">{activeChallenge.title}</h2>
                </div>
                {lunarSolved[activeChallenge.id] && (
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                    SOLVED (+50 XP)
                  </span>
                )}
              </div>

              {/* Challenge Scientific Briefing */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm leading-relaxed">
                <p>{activeChallenge.description}</p>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Select Scientific Assessment:
                </div>

                {activeChallenge.options.map((opt) => {
                  const isSelected = selectedAnswers[activeChallenge.id] === opt.id;
                  const isSolved = !!lunarSolved[activeChallenge.id];
                  const isCorrect = opt.id === activeChallenge.correctAnswer;

                  let style = 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200';
                  if (isSolved) {
                    if (isCorrect) style = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 font-medium';
                    else if (isSelected && !isCorrect) style = 'bg-red-950/80 border-red-500 text-red-200';
                  } else if (isSelected) {
                    style = 'bg-cyan-950 border-cyan-400 text-white';
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={isSolved}
                      onClick={() => handleSelectOption(activeChallenge.id, opt.id)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${style}`}
                    >
                      <span>{opt.label}</span>
                      {isSolved && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Submit Button */}
              {!lunarSolved[activeChallenge.id] && (
                <div className="pt-2">
                  <button
                    disabled={!selectedAnswers[activeChallenge.id]}
                    onClick={() => handleSubmitChallenge(activeChallenge.id)}
                    className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
                  >
                    Confirm Science Observation (+50 XP)
                  </button>
                </div>
              )}

              {/* Explanation Debrief */}
              {lunarSolved[activeChallenge.id] && (
                <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs text-slate-200 space-y-1.5 animate-fadeIn">
                  <div className="font-bold text-cyan-400 font-mono uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>NASA PLANETARY SCIENCE DEBRIEF:</span>
                  </div>
                  <p className="leading-relaxed">
                    {activeChallenge.explanation}
                  </p>
                </div>
              )}

            </div>

            {/* Bottom Controls & Navigation to NASA Data Explorer */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-400">
                {completedCount >= 3 
                  ? "LUNAR EXPLORER BADGE UNLOCKED!" 
                  : `Solve ${3 - completedCount} more tasks for the Lunar Explorer badge.`}
              </span>

              <button
                onClick={() => navigateTo('nasa_data')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <Database className="w-4 h-4" />
                <span>Explore Live NASA Data</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
