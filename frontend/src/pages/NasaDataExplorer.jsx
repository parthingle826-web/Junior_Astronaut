import React, { useState, useEffect } from 'react';
import { useMission } from '../context/MissionContext';
import { 
  Database, 
  Globe, 
  Moon, 
  Sun, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Info,
  Calendar,
  Layers,
  Flame,
  Award
} from 'lucide-react';

import { 
  CLIENT_FALLBACK_EARTH, 
  CLIENT_FALLBACK_MOON, 
  CLIENT_FALLBACK_MARS, 
  CLIENT_FALLBACK_SPACE_WEATHER 
} from '../data/nasaFallbackData';
import { safeFetchJson } from '../utils/api';

export default function NasaDataExplorer() {
  const { navigateTo, missionState, setMissionState } = useMission();

  const [activeCategory, setActiveCategory] = useState('earth'); // earth, moon, mars, space_weather
  const [dataPayload, setDataPayload] = useState(CLIENT_FALLBACK_EARTH);
  const [loading, setLoading] = useState(false);

  // Award Science Explorer Badge when user analyzes NASA data
  useEffect(() => {
    if (!missionState.badges.includes("Science Explorer")) {
      setMissionState(ms => ({
        ...ms,
        badges: [...ms.badges, "Science Explorer"],
        xp: ms.xp + 75
      }));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    let endpoint = '/api/nasa/earth';
    let fallback = CLIENT_FALLBACK_EARTH;
    if (activeCategory === 'moon') { endpoint = '/api/nasa/moon'; fallback = CLIENT_FALLBACK_MOON; }
    if (activeCategory === 'mars') { endpoint = '/api/nasa/mars'; fallback = CLIENT_FALLBACK_MARS; }
    if (activeCategory === 'space_weather') { endpoint = '/api/nasa/space-weather'; fallback = CLIENT_FALLBACK_SPACE_WEATHER; }

    safeFetchJson(endpoint, {}, fallback).then(data => {
      if (!isMounted) return;
      setDataPayload(data || fallback);
      setLoading(false);
    });

    return () => { isMounted = false; };
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>AUTHENTIC SCIENTIFIC ARCHIVES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
            NASA Scientific Data Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Analyze observational feeds and datasets directly from NASA planetary observatories.
          </p>
        </div>

        {/* Proceed to Mission Report Button */}
        <div>
          <button
            onClick={() => navigateTo('report')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <span>Proceed to Final Mission Report</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveCategory('earth')}
          className={`p-4 rounded-xl border transition flex items-center gap-3 ${
            activeCategory === 'earth'
              ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
          }`}
        >
          <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold">Earth (EPIC)</div>
            <div className="text-[10px] text-slate-400 font-mono">DSCOVR Lagrange 1</div>
          </div>
        </button>

        <button
          onClick={() => setActiveCategory('moon')}
          className={`p-4 rounded-xl border transition flex items-center gap-3 ${
            activeCategory === 'moon'
              ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
          }`}
        >
          <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <Moon className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold">Moon (LRO)</div>
            <div className="text-[10px] text-slate-400 font-mono">South Pole & Craters</div>
          </div>
        </button>

        <button
          onClick={() => setActiveCategory('mars')}
          className={`p-4 rounded-xl border transition flex items-center gap-3 ${
            activeCategory === 'mars'
              ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
          }`}
        >
          <div className="w-9 h-9 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold">Mars Science</div>
            <div className="text-[10px] text-slate-400 font-mono">Perseverance Archive</div>
          </div>
        </button>

        <button
          onClick={() => setActiveCategory('space_weather')}
          className={`p-4 rounded-xl border transition flex items-center gap-3 ${
            activeCategory === 'space_weather'
              ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
          }`}
        >
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Sun className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold">Space Weather</div>
            <div className="text-[10px] text-slate-400 font-mono">DONKI Solar Flares</div>
          </div>
        </button>
      </div>

      {/* Educational Fallback Transparency Notice */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200">NASA API Transparency Policy:</strong> All data is served directly through our FastAPI backend. If the official NASA endpoint is online, live data is streamed. If rate-limits or network interruptions occur, verified authentic fallback datasets from the NASA National Space Science Data Center are displayed with a clear <span className="text-amber-400 font-mono">VERIFIED ARCHIVE</span> badge. We never generate fictional NASA statistics.
        </div>
      </div>

      {/* Main Data Feed Content */}
      {loading ? (
        <div className="p-16 text-center text-cyan-400 font-mono text-sm">
          <Sparkles className="w-6 h-6 animate-spin mx-auto mb-2" />
          <span>Synchronizing telemetry with NASA science repositories...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.isArray(dataPayload) ? (
            dataPayload.map((item, idx) => (
              <div 
                key={idx}
                className="glass-panel rounded-2xl border border-cyan-500/20 p-5 shadow-xl flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Item Header & Live / Fallback Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <span className="text-xs font-mono text-cyan-400 font-bold truncate max-w-[200px]">
                      {item.source || 'NASA Planetary Science'}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      item.is_fallback 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {item.is_fallback ? 'VERIFIED ARCHIVE' : 'LIVE NASA STREAM'}
                    </span>
                  </div>

                  {/* Title / Header */}
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title || item.caption || item.flrID || item.name || 'NASA Observation'}
                  </h3>

                  {/* Image if available */}
                  {item.image_url && (
                    <div className="h-52 w-full rounded-xl overflow-hidden mb-3 border border-slate-800 bg-space-950">
                      <img 
                        src={item.image_url} 
                        alt={item.title || "NASA Imagery"} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Detailed Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {item.description || item.caption}
                  </p>

                  {/* Space weather specifics */}
                  {item.classType && (
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 rounded-lg bg-slate-900 border border-slate-800 mb-3">
                      <div><span className="text-slate-500">FLARE CLASS:</span> <span className="font-bold text-amber-400">{item.classType}</span></div>
                      <div><span className="text-slate-500">PEAK TIME:</span> <span className="text-slate-300">{item.peakTime}</span></div>
                      <div className="col-span-2"><span className="text-slate-500">LOCATION:</span> <span className="text-slate-300">{item.sourceLocation}</span></div>
                    </div>
                  )}

                  {/* Scientific Context Callout */}
                  {item.scientific_context && (
                    <div className="p-3 rounded-lg bg-slate-900/80 border border-cyan-500/20 text-[11px] text-slate-400">
                      <strong className="text-cyan-400 block mb-0.5 font-mono">SCIENTIFIC RELEVANCE:</strong>
                      {item.scientific_context}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>DATE: {item.date || item.beginTime || 'Archived'}</span>
                  <span>NASA GSFC / JPL</span>
                </div>
              </div>
            ))
          ) : (
            /* Single Object View (e.g. APOD) */
            <div className="col-span-2 glass-panel rounded-2xl border border-cyan-500/30 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-cyan-400 font-bold">{dataPayload?.source}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  dataPayload?.is_fallback 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}>
                  {dataPayload?.is_fallback ? 'VERIFIED ARCHIVE' : 'LIVE NASA STREAM'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">{dataPayload?.title}</h3>
              {dataPayload?.url && (
                <div className="max-h-96 w-full rounded-xl overflow-hidden border border-slate-800">
                  <img src={dataPayload.url} alt={dataPayload.title} className="w-full h-full object-cover" />
                </div>
              )}
              <p className="text-xs text-slate-300 leading-relaxed">{dataPayload?.explanation}</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
