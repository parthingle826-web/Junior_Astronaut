import React, { useEffect } from 'react';
import { useMission } from '../context/MissionContext';
import { AlertTriangle, LogOut, X, UserX } from 'lucide-react';

export default function LogoutModal() {
  const { isLogoutModalOpen, cancelLogout, confirmLogout, astronaut } = useMission();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isLogoutModalOpen) {
        cancelLogout();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLogoutModalOpen, cancelLogout]);

  if (!isLogoutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Modal Dialog Card */}
      <div 
        className="w-full max-w-md rounded-2xl glass-panel border border-red-500/40 p-6 sm:p-8 shadow-2xl relative space-y-6 animate-scaleUp text-left"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={cancelLogout}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Warning Icon */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
              CADET PROFILE DEAUTHORIZATION
            </div>
            <h2 id="logout-modal-title" className="text-xl font-bold text-white mt-0.5">
              Confirm Astronaut Logout?
            </h2>
          </div>
        </div>

        {/* Current Astronaut Badge Preview */}
        {astronaut && (
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{astronaut.avatar || '👨‍🚀'}</span>
              <div>
                <div className="text-sm font-bold text-white">{astronaut.name}</div>
                <div className="text-xs font-mono text-cyan-400">ID: {astronaut.id} • Callsign: "{astronaut.callsign}"</div>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              ACTIVE
            </span>
          </div>
        )}

        {/* The Exact Required Confirmation Message */}
        <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2">
          <p>
            Logging out will clear this astronaut's saved profile and mission progress on this device. This cannot be undone. Continue?
          </p>
          <p className="text-[11px] text-slate-400 font-mono">
            • Profile credentials, flight XP, checklist state, and badges will be purged from this device so the next candidate can register with a clean slate.
          </p>
        </div>

        {/* Action Buttons: Cancel and Confirm */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={cancelLogout}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider transition border border-slate-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => confirmLogout('landing')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Confirm Logout</span>
          </button>
        </div>

      </div>
    </div>
  );
}
