import React, { useState, useEffect } from 'react';
import { useMission } from '../context/MissionContext';
import { Award, Trophy, Medal, Sparkles, User, ArrowRight } from 'lucide-react';

import { safeFetchJson } from '../utils/api';

const DEFAULT_LEADERBOARD = [
  { rank: 1, name: "Commander Elena Vance", id: "AST-1082", score: 1420, xp: 1850, mission: "Artemis Lunar Research", status: "Mission Specialist" },
  { rank: 2, name: "Cadet Marcus Chen", id: "AST-3304", score: 1280, xp: 1600, mission: "Artemis Lunar Research", status: "Junior Astronaut" },
  { rank: 3, name: "Pilot Aisha Al-Mansoor", id: "AST-4412", score: 1190, xp: 1450, mission: "Artemis Lunar Research", status: "Junior Astronaut" },
  { rank: 4, name: "Flight Eng. Liam O'Connor", id: "AST-2891", score: 1050, xp: 1300, mission: "Artemis Lunar Research", status: "Mission Cadet" },
  { rank: 5, name: "Science Cadet Maya Lin", id: "AST-5190", score: 980, xp: 1150, mission: "Artemis Lunar Research", status: "Mission Cadet" }
];

export default function LeaderboardPage() {
  const { astronaut, missionState, getAstronautRank, navigateTo } = useMission();
  const [cadets, setCadets] = useState(DEFAULT_LEADERBOARD);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    safeFetchJson('/api/leaderboard', {}, DEFAULT_LEADERBOARD).then(data => {
      if (!isMounted) return;
      if (Array.isArray(data) && data.length > 0) {
        setCadets(data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const rank = getAstronautRank();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase">
          <Trophy className="w-3.5 h-3.5" />
          <span>GLOBAL CADET CORPS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
          Artemis Flight Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Rankings based on flight score, emergency decision triage, and lunar surface science completions.
        </p>
      </div>

      {/* Cadet's Own Rank Card if registered */}
      {astronaut && (
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-400/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-cyan-500/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-2xl flex items-center justify-center">
              {astronaut.avatar || '👨‍🚀'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                  YOUR PROFILE
                </span>
                <span className="text-sm font-bold text-white">{astronaut.name}</span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                {astronaut.id} • {rank}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-right">
            <div>
              <span className="text-[10px] text-slate-400 block">TOTAL SCORE</span>
              <span className="text-xl font-bold text-cyan-300">{missionState.score} PTS</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">TOTAL XP</span>
              <span className="text-xl font-bold text-emerald-400">{missionState.xp} XP</span>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table Card */}
      <div className="glass-panel rounded-2xl border border-cyan-500/30 p-6 shadow-2xl overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Cadet Name</th>
              <th className="py-3 px-4">Flight Program</th>
              <th className="py-3 px-4">Flight Rank</th>
              <th className="py-3 px-4 text-right">Score</th>
              <th className="py-3 px-4 text-right">Experience</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {cadets.map((c) => (
              <tr key={c.rank} className="hover:bg-slate-900/60 transition">
                <td className="py-3.5 px-4 font-bold">
                  {c.rank === 1 ? (
                    <span className="text-amber-400 flex items-center gap-1">🥇 #1</span>
                  ) : c.rank === 2 ? (
                    <span className="text-slate-300 flex items-center gap-1">🥈 #2</span>
                  ) : c.rank === 3 ? (
                    <span className="text-amber-600 flex items-center gap-1">🥉 #3</span>
                  ) : (
                    <span className="text-slate-500">#{c.rank}</span>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-white text-sm">{c.name}</div>
                  <div className="text-[10px] text-slate-500">{c.id}</div>
                </td>
                <td className="py-3.5 px-4 text-slate-300">{c.mission}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 text-[11px]">
                    {c.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-cyan-300">{c.score}</td>
                <td className="py-3.5 px-4 text-right font-bold text-emerald-400">{c.xp} XP</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
