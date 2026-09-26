import React, { useState, useEffect } from 'react';
import { useMission } from '../context/MissionContext';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Bot, 
  Sparkles, 
  Compass, 
  Activity, 
  FileText,
  RotateCcw
} from 'lucide-react';

export default function MissionReport() {
  const { 
    astronaut, 
    missionState, 
    trainingScores, 
    lunarSolved, 
    navigateTo, 
    resetMission 
  } = useMission();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const trainingAvg = Object.values(trainingScores).length > 0 
      ? Math.round(Object.values(trainingScores).reduce((a, b) => a + b, 0) / Object.values(trainingScores).length)
      : 80;

    const payload = {
      astronaut: astronaut || { name: 'Cadet Starlight', id: 'AST-2048' },
      missionState: missionState,
      lunarChallengesSolved: Object.keys(lunarSolved).length,
      trainingScore: trainingAvg
    };

    fetch('/api/missions/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(async res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) throw new Error('Non-JSON response');
        return await res.json();
      })
      .then(data => {
        if (!isMounted) return;
        setReport(data);
        setLoading(false);
      })
      .catch(err => {
        console.warn("Generating client report fallback:", err);
        if (!isMounted) return;
        // Compute client fallback report
        const lunarCount = Object.keys(lunarSolved).length;
        const science = Math.min(100, Math.round((lunarCount / 6) * 60 + (trainingAvg / 100) * 40));
        const safety = Math.min(100, Math.round(missionState.missionHealth * 0.5 + missionState.oxygen * 0.3 + 20));
        const resolved = missionState.emergenciesResolved || 1;
        const decision = Math.min(100, Math.round((resolved / Math.max(1, resolved + (missionState.emergenciesFailed || 0))) * 100));
        const exploration = Math.min(100, Math.round((lunarCount / 6) * 100));
        const overall = Math.round(science * 0.3 + safety * 0.3 + decision * 0.25 + exploration * 0.15);

        setReport({
          astronautName: astronaut?.name || "Cadet",
          astronautId: astronaut?.id || "AST-2048",
          missionName: "Artemis Lunar Research Simulation",
          scores: { science, safety, decision, exploration, overall },
          achievementLevel: overall >= 85 ? "Senior Flight Astronaut" : "Certified Mission Aviator",
          assignedRank: overall >= 85 ? "Junior Astronaut" : "Mission Cadet",
          summary: `Cadet ${astronaut?.name || 'Cadet'} has successfully completed the Artemis Lunar Research Simulation with an overall rating of ${overall}%. Flight systems sustained nominal operations.`,
          disclaimer: "This is a project-generated achievement certificate for an educational simulation — not an official NASA certification."
        });
        setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <Sparkles className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
        <h2 className="text-lg font-mono text-cyan-300">ASTRA Flight Director compiling mission dossier...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase">
          <Award className="w-3.5 h-3.5" />
          <span>OFFICIAL MISSION DEBRIEFING</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
          Artemis Flight Evaluation Report
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Comprehensive performance evaluation across science, safety, decision-making, and cislunar navigation.
        </p>
      </div>

      {/* Main Dossier Card */}
      <div className="glass-panel rounded-2xl border border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-8 relative">
        
        {/* Cadet Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-3xl">
              {astronaut?.avatar || '👨‍🚀'}
            </div>
            <div>
              <div className="text-xl font-bold text-white">{report?.astronautName}</div>
              <div className="text-xs font-mono text-cyan-400">
                {report?.astronautId} • {report?.assignedRank}
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">OVERALL RATING</span>
            <div className="text-3xl font-extrabold font-mono text-cyan-300">
              {report?.scores.overall}%
            </div>
            <span className="text-xs text-emerald-400 font-mono font-bold">
              {report?.achievementLevel}
            </span>
          </div>
        </div>

        {/* 4 Performance Sub-Scores */}
        <div>
          <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4">
            FLIGHT COMPETENCY BREAKDOWN
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Science */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">SCIENCE SCORE</span>
              <div className="text-2xl font-bold font-mono text-cyan-300">{report?.scores.science}%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-cyan-400 h-full" style={{ width: `${report?.scores.science}%` }} />
              </div>
            </div>

            {/* Safety */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">SAFETY & ECLSS</span>
              <div className="text-2xl font-bold font-mono text-emerald-400">{report?.scores.safety}%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-400 h-full" style={{ width: `${report?.scores.safety}%` }} />
              </div>
            </div>

            {/* Decisions */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">DECISION TRIAGE</span>
              <div className="text-2xl font-bold font-mono text-purple-400">{report?.scores.decision}%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-purple-400 h-full" style={{ width: `${report?.scores.decision}%` }} />
              </div>
            </div>

            {/* Exploration */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">SURFACE TASKS</span>
              <div className="text-2xl font-bold font-mono text-amber-400">{report?.scores.exploration}%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-amber-400 h-full" style={{ width: `${report?.scores.exploration}%` }} />
              </div>
            </div>

          </div>
        </div>

        {/* ASTRA Flight Director Assessment Paragraph */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
            <Bot className="w-4 h-4" />
            <span>ASTRA FLIGHT DIRECTOR SUMMARY</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            {report?.summary}
          </p>
        </div>

        {/* Disclaimer strip */}
        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 text-center">
          {report?.disclaimer}
        </div>

        {/* Certificate CTA */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono uppercase transition"
          >
            Back to Dashboard
          </button>

          <button
            onClick={() => navigateTo('certificate')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>View & Print Official Certificate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
