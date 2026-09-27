import React, { useState } from 'react';
import { useMission } from '../context/MissionContext';
import { Rocket, User, Shield, Sparkles, ArrowRight, Moon, Globe2, AlertCircle } from 'lucide-react';

export default function AstronautRegistration() {
  const { registerAstronaut, navigateTo } = useMission();

  const [name, setName] = useState('');
  const [callsign, setCallsign] = useState('');
  const [ageGroup, setAgeGroup] = useState('13-16');
  const [avatar, setAvatar] = useState('👨‍🚀');
  const [selectedMission, setSelectedMission] = useState('lunar_research');
  const [error, setError] = useState('');

  const avatarOptions = ['👨‍🚀', '👩‍🚀', '🚀', '🛸', '🛰️', '🪐'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your astronaut cadet name.');
      return;
    }
    setError('');

    registerAstronaut({
      name: name.trim(),
      callsign: callsign.trim() || 'Starlight',
      ageGroup,
      avatar,
      missionId: selectedMission,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      
   
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>NASA SPACE APPS • CADET RECRUITMENT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-wide uppercase">
          Astronaut Registration
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
          Enroll your profile into the Artemis Cislunar Simulation database to receive an official Cadet Flight ID and begin your training curriculum.
        </p>
      </div>

      <div className="glass-panel rounded-2xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {error && (
            <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Cadet Full Name <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maya Patel"
                className="w-full bg-space-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Flight Callsign (Optional)
              </label>
              <input
                type="text"
                value={callsign}
                onChange={(e) => setCallsign(e.target.value)}
                placeholder="e.g. Phoenix, Orion, Valkyrie"
                className="w-full bg-space-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Age Division
              </label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full bg-space-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="8-12">Junior Explorer (Ages 8-12)</option>
                <option value="13-16">Cadet Flight Officer (Ages 13-16)</option>
                <option value="17+">Senior Specialist (Ages 17+)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Mission Crest / Avatar
              </label>
              <div className="flex gap-2">
                {avatarOptions.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`w-10 h-10 rounded-lg text-lg flex items-center justify-center transition border ${
                      avatar === av
                        ? 'bg-cyan-500/20 border-cyan-400 shadow-md shadow-cyan-500/20'
                        : 'bg-space-950 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
              Select Initial Flight Program
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setSelectedMission('lunar_research')}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  selectedMission === 'lunar_research'
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/10'
                    : 'bg-space-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-sm text-white">Lunar Research</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ACTIVE MVP
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Full Artemis lunar flight: pre-launch checklist, cislunar emergencies, soft lunar landing, and 6 South Pole surface science tasks.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-space-950/50 opacity-60 cursor-not-allowed">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-orange-400" />
                    <span className="font-bold text-sm text-slate-300">Mars Exploration</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    COMING SOON
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Interplanetary trajectory to Jezero Crater. Locked for Phase 2 expansion.
                </p>
              </div>

            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <span>Enroll Cadet & Enter Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
