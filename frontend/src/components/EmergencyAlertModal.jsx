import React, { useState } from 'react';
import { useMission } from '../context/MissionContext';
import { 
  AlertOctagon, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ShieldAlert, 
  Bot, 
  Sparkles,
  Zap
} from 'lucide-react';

export default function EmergencyAlertModal({ scenario, onResolved, onDismiss }) {
  const { submitEmergencyDecision, missionState } = useMission();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [decisionResult, setDecisionResult] = useState(null);

  if (!scenario) return null;

  const handleOptionSelect = async (optionId) => {
    setSelectedOption(optionId);
    setIsSubmitting(true);
    const result = await submitEmergencyDecision(scenario.id, optionId);
    setDecisionResult(result);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="max-w-2xl w-full rounded-2xl glass-panel-danger border-2 border-red-500/70 p-6 shadow-2xl relative overflow-hidden">
        
        {/* Animated warning scanline */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />

        {/* Header Alert Strip */}
        <div className="flex items-center justify-between pb-4 border-b border-red-500/30 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-600/30 border border-red-500 flex items-center justify-center text-red-400 animate-bounce">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-red-400 tracking-wider font-bold uppercase">⚠ IN-FLIGHT EMERGENCY</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-700/50 uppercase">
                  {scenario.severity} PRIORITY
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-white tracking-wide">{scenario.title}</h3>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-[11px] font-mono text-slate-400">CATEGORY:</span>
            <div className="text-xs font-mono font-bold text-cyan-300">{scenario.category || 'Flight Systems'}</div>
          </div>
        </div>

        {/* Problem Description */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm leading-relaxed mb-6">
          <p>{scenario.description}</p>
        </div>

        {/* If decision result is available: show explanation & consequences */}
        {decisionResult ? (
          <div className="space-y-4 animate-fadeIn">
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              decisionResult.isCorrect 
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-100' 
                : 'bg-red-950/80 border-red-500/60 text-red-100'
            }`}>
              {decisionResult.isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="font-bold text-sm">
                  {decisionResult.isCorrect ? "CORRECT PROTOCOL EXECUTED (+150 XP)" : "PROCEDURAL ERROR (MISSION RISK ESCALATED)"}
                </div>
                <div className="text-xs text-slate-300 leading-relaxed font-mono">
                  {decisionResult.statusMessage}
                </div>
              </div>
            </div>

            {/* Scientific Explanation */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-cyan-400 flex items-center gap-1.5 font-mono">
                <Bot className="w-4 h-4" />
                <span>ASTRA FLIGHT DIRECTOR DEBRIEF:</span>
              </div>
              <p className="leading-relaxed">{decisionResult.explanation}</p>
            </div>

            {/* Effects Applied Delta */}
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-300">
                Score: {decisionResult.effectsApplied.score > 0 ? `+${decisionResult.effectsApplied.score}` : decisionResult.effectsApplied.score}
              </span>
              <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-emerald-400">
                XP: +{decisionResult.effectsApplied.xp}
              </span>
              <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-amber-300">
                Risk Delta: {decisionResult.effectsApplied.missionRisk > 0 ? `+${decisionResult.effectsApplied.missionRisk}%` : `${decisionResult.effectsApplied.missionRisk}%`}
              </span>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => onResolved(decisionResult)}
                className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-lg shadow-cyan-600/30"
              >
                <span>Acknowledge & Resume Flight</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Decision Option Buttons */
          <div className="space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Select Immediate Contingency Procedure:
            </div>
            {scenario.options.map((option, idx) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={isSubmitting}
                className="w-full text-left p-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-red-400 text-slate-200 text-xs sm:text-sm font-medium transition flex items-start gap-3 group"
              >
                <span className="w-6 h-6 rounded-md bg-slate-800 group-hover:bg-red-500/20 text-slate-400 group-hover:text-red-300 border border-slate-700 font-mono text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="leading-snug">{option.label}</span>
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
