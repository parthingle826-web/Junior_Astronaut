import React, { useState } from 'react';
import { useMission } from '../context/MissionContext';
import { TRAINING_MODULES } from '../data/trainingData';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  HelpCircle, 
  ChevronRight,
  Award,
  Rocket
} from 'lucide-react';

export default function TrainingCenter() {
  const { trainingScores, completeTrainingModule, navigateTo } = useMission();
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState({});

  const activeModule = TRAINING_MODULES[activeModuleIndex];
  const completedCount = Object.keys(trainingScores).length;
  const isAllComplete = completedCount === TRAINING_MODULES.length;

  const handleSelectOption = (moduleId, optionId) => {
    if (submittedQuiz[moduleId]) return; // locked after submit
    setSelectedAnswers(prev => ({ ...prev, [moduleId]: optionId }));
  };

  const handleSubmitQuiz = (moduleId) => {
    const selected = selectedAnswers[moduleId];
    if (!selected) return;

    const currentMod = TRAINING_MODULES.find(m => m.id === moduleId);
    const isCorrect = selected === currentMod.quiz.correctAnswer;
    const score = isCorrect ? 100 : 50;

    setSubmittedQuiz(prev => ({
      ...prev,
      [moduleId]: {
        isCorrect,
        selected,
        explanation: currentMod.quiz.explanation
      }
    }));

    completeTrainingModule(moduleId, score);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ASTRONAUT FLIGHT ACADEMY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Astronaut Training Curriculum
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete all 4 flight training modules before proceeding to the launch pad.
          </p>
        </div>

        {/* Completion Progress Gauge */}
        <div className="text-right">
          <div className="text-xs font-mono text-slate-400 mb-1">CURRICULUM MASTERY</div>
          <div className="text-2xl font-bold font-mono text-cyan-400">
            {completedCount} / 4 <span className="text-xs text-slate-400">MODULES</span>
          </div>
          <div className="w-44 bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500" 
              style={{ width: `${(completedCount / 4) * 100}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Module Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TRAINING_MODULES.map((module, idx) => {
          const isDone = !!trainingScores[module.id];
          const isActive = idx === activeModuleIndex;
          return (
            <button
              key={module.id}
              onClick={() => setActiveModuleIndex(idx)}
              className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${
                isActive
                  ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="text-[10px] font-mono text-cyan-400 font-semibold mb-0.5">MODULE {idx + 1}</div>
                <div className="text-xs font-bold text-white truncate max-w-[130px] sm:max-w-none">{module.badge}</div>
              </div>
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-slate-700 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Module Content */}
      <div className="glass-panel rounded-2xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-8">
        
        {/* Module Title & Overview */}
        <div className="pb-4 border-b border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono text-cyan-400 uppercase">Training Track • {activeModule.badge}</span>
            {trainingScores[activeModule.id] && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                COMPLETED (+100 XP)
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-white">{activeModule.title}</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">{activeModule.description}</p>
        </div>

        {/* Lesson Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeModule.lessons.map((lesson, lIdx) => (
            <div key={lIdx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-mono">
                  {lIdx + 1}
                </span>
                {lesson.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {lesson.content}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Knowledge Validation Quiz */}
        <div className="p-6 rounded-xl bg-space-950/90 border border-cyan-500/20 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Flight Verification Quiz</span>
          </div>

          <div className="text-sm font-medium text-white">
            {activeModule.quiz.question}
          </div>

          {/* Quiz Options */}
          <div className="space-y-2.5">
            {activeModule.quiz.options.map((option) => {
              const isSelected = selectedAnswers[activeModule.id] === option.id;
              const isSubmitted = !!submittedQuiz[activeModule.id];
              const isCorrectOption = option.id === activeModule.quiz.correctAnswer;
              
              let optionStyle = 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200';
              if (isSubmitted) {
                if (isCorrectOption) {
                  optionStyle = 'bg-emerald-950/80 border-emerald-500/60 text-emerald-100 font-medium';
                } else if (isSelected && !isCorrectOption) {
                  optionStyle = 'bg-red-950/80 border-red-500/60 text-red-100';
                }
              } else if (isSelected) {
                optionStyle = 'bg-cyan-950/70 border-cyan-400 text-white shadow-sm';
              }

              return (
                <button
                  key={option.id}
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(activeModule.id, option.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-slate-800 text-slate-400 font-mono text-xs flex items-center justify-center font-bold uppercase">
                      {option.id}
                    </span>
                    <span>{option.text}</span>
                  </div>
                  {isSubmitted && isCorrectOption && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !isCorrectOption && (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Submit Quiz Button */}
          {!submittedQuiz[activeModule.id] && !trainingScores[activeModule.id] && (
            <div className="pt-2">
              <button
                disabled={!selectedAnswers[activeModule.id]}
                onClick={() => handleSubmitQuiz(activeModule.id)}
                className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
              >
                Validate Flight Decision (+100 XP)
              </button>
            </div>
          )}

          {/* Explanation Banner (Shows WHY an answer is right or wrong!) */}
          {(submittedQuiz[activeModule.id] || trainingScores[activeModule.id]) && (
            <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs text-slate-200 space-y-1.5 animate-fadeIn">
              <div className="font-bold text-cyan-400 font-mono uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SCIENTIFIC EXPLANATION:</span>
              </div>
              <p className="leading-relaxed">
                {activeModule.quiz.explanation}
              </p>
            </div>
          )}

        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            disabled={activeModuleIndex === 0}
            onClick={() => setActiveModuleIndex(prev => prev - 1)}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 text-xs font-mono uppercase transition"
          >
            Previous Track
          </button>

          {activeModuleIndex < TRAINING_MODULES.length - 1 ? (
            <button
              onClick={() => setActiveModuleIndex(prev => prev + 1)}
              className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition flex items-center gap-1.5"
            >
              <span>Next Track</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => navigateTo('briefing')}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <span>Proceed to Mission Briefing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
