import React, { useState } from 'react';
import { useMission } from '../context/MissionContext';
import { 
  Rocket, 
  Compass, 
  BookOpen, 
  Radio, 
  Database, 
  Award, 
  Info, 
  User, 
  Zap, 
  Menu, 
  X, 
  RotateCcw,
  Sparkles,
  LogOut
} from 'lucide-react';

export default function Navbar() {
  const { 
    currentView, 
    navigateTo, 
    astronaut, 
    missionState, 
    getAstronautRank, 
    activateDemoMode, 
    resetMission,
    requestLogout 
  } = useMission();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  const rank = getAstronautRank();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: User, show: !!astronaut },
    { id: 'training', label: 'Training', icon: BookOpen },
    { id: 'mission_control', label: 'Mission Control', icon: Radio },
    { id: 'lunar_exploration', label: 'Lunar Base', icon: Compass },
    { id: 'nasa_data', label: 'NASA Data', icon: Database },
    { id: 'leaderboard', label: 'Leaderboard', icon: Award },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (viewId) => {
    navigateTo(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-space-950/85 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition">
              <div className="w-full h-full bg-space-950 rounded-[7px] flex items-center justify-center">
                <Rocket className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm tracking-wider text-slate-100 uppercase">Junior Astronaut</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">Artemis Trainer</span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">NASA Space Apps Challenge</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.filter(item => item.show !== false).map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                    isActive 
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm shadow-cyan-500/20' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center gap-3">
           
            <div className="relative">
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-mono font-medium transition"
                title="Fast 3-minute walk for hackathon judges"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Demo Jump</span>
              </button>

              {demoDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-lg bg-space-900 border border-amber-500/30 shadow-2xl p-2 z-50 text-xs"
                  onClick={() => setDemoDropdownOpen(false)}
                >
                  <div className="px-2 py-1 text-[11px] font-mono text-amber-400 border-b border-slate-800 mb-1 flex items-center justify-between">
                    <span>HACKATHON QUICK JUMP</span>
                    <span className="text-[9px] bg-amber-500/20 px-1 rounded">3-MIN</span>
                  </div>
                  <button 
                    onClick={() => activateDemoMode('training')}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                  >
                    <span>1. Training Center (4 Modules)</span>
                  </button>
                  <button 
                    onClick={() => activateDemoMode('launch')}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                  >
                    <span>2. Launch & Checklist</span>
                  </button>
                  <button 
                    onClick={() => activateDemoMode('mission_control')}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                  >
                    <span>3. In-Flight Emergencies</span>
                  </button>
                  <button 
                    onClick={() => activateDemoMode('moon_landing')}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                  >
                    <span>4. Moon Landing Descent</span>
                  </button>
                  <button 
                    onClick={() => activateDemoMode('lunar_exploration')}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                  >
                    <span>5. Lunar Science (6 Tasks)</span>
                  </button>
                  <button 
                    onClick={() => activateDemoMode('nasa_data')}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                  >
                    <span>6. Live NASA Data Explorer</span>
                  </button>
                  <button 
                    onClick={() => activateDemoMode('report')}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                  >
                    <span>7. Mission Report & Certificate</span>
                  </button>
                </div>
              )}
            </div>

            {astronaut ? (
              <div className="flex items-center gap-2">
                <div 
                  onClick={() => handleNavClick('dashboard')}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 cursor-pointer hover:border-cyan-400 transition"
                  title="View Cadet Dashboard"
                >
                  <span className="text-base">{astronaut.avatar || '👨‍🚀'}</span>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-slate-200 leading-tight">{astronaut.name}</div>
                    <div className="text-[10px] font-mono text-cyan-400 leading-none">{rank} • {missionState.xp} XP</div>
                  </div>
                </div>

                
                <button
                  onClick={requestLogout}
                  title="Logout / Switch Astronaut (Clears saved session for next candidate)"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 hover:border-red-400 text-red-300 hover:text-white text-xs font-mono transition shadow-sm"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  <span className="hidden xl:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('register')}
                className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs tracking-wider uppercase transition shadow-md shadow-cyan-600/30"
              >
                Enroll Cadet
              </button>
            )}

            
            <button
              onClick={resetMission}
              title="Reset simulation to fresh start"
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => activateDemoMode('mission_control')}
              className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-[11px] font-mono"
            >
              Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

    
      {mobileMenuOpen && (
        <div className="md:hidden bg-space-950 border-b border-cyan-500/30 px-4 pt-2 pb-4 space-y-2">
          {astronaut && (
            <div className="p-3 bg-slate-900 rounded-lg border border-cyan-500/30 mb-2 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{astronaut.avatar}</span>
                  <div>
                    <div className="text-sm font-bold text-white">{astronaut.name}</div>
                    <div className="text-xs font-mono text-cyan-400">{astronaut.id} • {rank}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Total XP</div>
                  <div className="font-mono font-bold text-cyan-300">{missionState.xp}</div>
                </div>
              </div>
              <button
                onClick={() => { setMobileMenuOpen(false); requestLogout(); }}
                className="w-full py-1.5 px-3 rounded bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono flex items-center justify-center gap-2 hover:bg-red-900/80 transition"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span>Switch Cadet / Logout</span>
              </button>
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === item.id ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-800 flex justify-between gap-2">
            <button
              onClick={() => activateDemoMode('mission_control')}
              className="flex-1 py-2 text-center text-xs bg-amber-500/20 text-amber-400 rounded font-mono"
            >
              🚀 3-Min Judge Demo
            </button>
            <button
              onClick={resetMission}
              className="py-2 px-3 text-center text-xs bg-red-500/20 text-red-400 rounded font-mono"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
