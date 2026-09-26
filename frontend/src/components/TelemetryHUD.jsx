import React, { useState, useEffect } from 'react';
import { useMission } from '../context/MissionContext';
import { 
  Activity, 
  Wind, 
  BatteryCharging, 
  Fuel, 
  Gauge, 
  Thermometer, 
  Radio, 
  Compass, 
  AlertTriangle, 
  ShieldCheck, 
  ShieldAlert,
  Clock
} from 'lucide-react';

export default function TelemetryHUD({ compact = false }) {
  const { missionState } = useMission();
  const [elapsedSeconds, setElapsedSeconds] = useState(148);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatMET = (totalSec) => {
    const h = Math.floor(totalSec / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `T+${h}:${m}:${s}`;
  };

  const getRiskBadge = () => {
    switch (missionState.missionRisk) {
      case 'HIGH':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-500/20 border border-red-500 text-red-400 font-mono text-xs font-bold animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>CRITICAL RISK</span>
          </div>
        );
      case 'MODERATE':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500 text-amber-400 font-mono text-xs font-bold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>MODERATE RISK</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>NOMINAL RISK</span>
          </div>
        );
    }
  };

  const getMetricColor = (val, minDanger = 50, minWarning = 75) => {
    if (val < minDanger) return 'bg-red-500 text-red-400';
    if (val < minWarning) return 'bg-amber-400 text-amber-400';
    return 'bg-cyan-400 text-cyan-400';
  };

  return (
    <div className={`glass-panel rounded-xl border border-cyan-500/30 shadow-2xl p-4 ${compact ? 'py-3' : 'p-5'}`}>
      
      {/* Top Header Row: MET + Composite Health + Risk */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        
        {/* MET Clock */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <div className="font-mono text-xs text-slate-400">MISSION ELAPSED TIME:</div>
          <span className="font-mono font-bold text-sm text-cyan-300 tracking-wider bg-slate-900 px-2 py-0.5 rounded border border-cyan-500/30">
            {formatMET(elapsedSeconds)}
          </span>
        </div>

        {/* Center: Mission Health & Phase */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-400 font-mono">CRAFT HEALTH:</span>
            <span className={`font-mono font-bold text-sm ${missionState.missionHealth > 70 ? 'text-emerald-400' : missionState.missionHealth > 40 ? 'text-amber-400' : 'text-red-400'}`}>
              {missionState.missionHealth}%
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="text-slate-500">PHASE:</span>
            <span className="text-cyan-400 font-bold uppercase">{missionState.currentPhase.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Right: Risk Level */}
        <div>{getRiskBadge()}</div>
      </div>

      {/* Telemetry Gauge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-4">
        
        {/* Oxygen */}
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="flex items-center gap-1"><Wind className="w-3 h-3 text-cyan-400" /> OXYGEN</span>
            <span className="font-mono font-bold text-slate-200">{missionState.oxygen}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${getMetricColor(missionState.oxygen)}`} 
              style={{ width: `${missionState.oxygen}%` }} 
            />
          </div>
        </div>

        {/* Power */}
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="flex items-center gap-1"><BatteryCharging className="w-3 h-3 text-yellow-400" /> POWER</span>
            <span className="font-mono font-bold text-slate-200">{missionState.power}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${getMetricColor(missionState.power)}`} 
              style={{ width: `${missionState.power}%` }} 
            />
          </div>
        </div>

        {/* Fuel */}
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="flex items-center gap-1"><Fuel className="w-3 h-3 text-emerald-400" /> FUEL</span>
            <span className="font-mono font-bold text-slate-200">{missionState.fuel}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${getMetricColor(missionState.fuel, 30, 60)}`} 
              style={{ width: `${missionState.fuel}%` }} 
            />
          </div>
        </div>

        {/* Cabin Pressure */}
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="flex items-center gap-1"><Gauge className="w-3 h-3 text-blue-400" /> PRESSURE</span>
            <span className="font-mono font-bold text-slate-200">{missionState.pressure} kPa</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${missionState.pressure < 80 ? 'bg-red-500' : 'bg-cyan-400'}`} 
              style={{ width: `${Math.min(100, (missionState.pressure / 101.3) * 100)}%` }} 
            />
          </div>
        </div>

        {/* Temperature */}
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="flex items-center gap-1"><Thermometer className="w-3 h-3 text-rose-400" /> TEMP</span>
            <span className="font-mono font-bold text-slate-200">{missionState.temperature}°C</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${missionState.temperature > 30 ? 'bg-red-500' : 'bg-emerald-400'}`} 
              style={{ width: `${Math.min(100, (missionState.temperature / 40) * 100)}%` }} 
            />
          </div>
        </div>

        {/* Communications */}
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="flex items-center gap-1"><Radio className="w-3 h-3 text-purple-400" /> COMMS</span>
            <span className="font-mono font-bold text-slate-200">{missionState.communication}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${getMetricColor(missionState.communication, 40, 70)}`} 
              style={{ width: `${missionState.communication}%` }} 
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="flex items-center gap-1"><Compass className="w-3 h-3 text-teal-400" /> NAV LOCK</span>
            <span className="font-mono font-bold text-slate-200">{missionState.navigation}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${getMetricColor(missionState.navigation, 40, 70)}`} 
              style={{ width: `${missionState.navigation}%` }} 
            />
          </div>
        </div>

      </div>

    </div>
  );
}
