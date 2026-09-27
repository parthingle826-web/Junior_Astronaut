import React from 'react';
import { Rocket, ShieldAlert, Globe, Cpu, HeartHandshake, ExternalLink } from 'lucide-react';
import { useMission } from '../context/MissionContext';

export default function Footer() {
  const { navigateTo } = useMission();

  return (
    <footer className="no-print mt-20 bg-space-950/90 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
        
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Rocket className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-slate-200 tracking-wide uppercase">Junior Astronaut Mission Trainer</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
              An interactive spaceflight simulation platform built for students and aspiring engineers as a NASA Space Apps Challenge project. 
              Designed to teach real orbital mechanics, spacecraft telemetry, human spaceflight physiology, and cislunar decision-making.
            </p>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider block mb-0.5">Educational Simulation Notice:</span>
                This web application is an educational simulation created for the NASA Space Apps Challenge. All telemetry, emergency events, and certificates are project-generated and do not represent official NASA training, astronaut certification, or live government flight operations.
              </div>
            </div>
          </div>

         
          <div>
            <h4 className="font-mono text-slate-300 font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 text-xs">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Active NASA Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>APOD (Astronomy Picture of the Day)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>DSCOVR EPIC (Earth Polychromatic)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>DONKI (Space Weather Database)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>NeoWS (Near Earth Objects Feed)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>NASA Image & Video Library (LRO)</span>
              </li>
            </ul>
          </div>

        
          <div>
            <h4 className="font-mono text-slate-300 font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 text-xs">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Global Goals Alignment
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-bold text-emerald-400 block">SDG 4: Quality Education</span>
                <span className="text-[11px] text-slate-400">Contributes to hands-on STEM accessibility and experiential science learning.</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-bold text-blue-400 block">SDG 9: Industry & Innovation</span>
                <span className="text-[11px] text-slate-400">Contributes to aerospace literacy and student engineering skill development.</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-bold text-cyan-400 block">SDG 13: Climate Action</span>
                <span className="text-[11px] text-slate-400">Contributes through DSCOVR EPIC Earth observation and space weather awareness.</span>
              </div>
            </div>
          </div>

        </div>

        
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © 2026 Junior Astronaut Mission Trainer • NASA Space Apps Challenge Entry
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('about')} className="hover:text-cyan-400 transition">About the Project</button>
            <span>•</span>
            <button onClick={() => navigateTo('training')} className="hover:text-cyan-400 transition">Astronaut Academy</button>
            <span>•</span>
            <button onClick={() => navigateTo('nasa_data')} className="hover:text-cyan-400 transition">NASA Data Explorer</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
