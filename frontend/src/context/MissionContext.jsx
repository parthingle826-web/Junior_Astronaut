import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_SCENARIOS, DEFAULT_LUNAR_CHALLENGES } from '../data/missionsData';
import { 
  resolveInitialSession, 
  isProtectedRoute, 
  normalizeView, 
  getPathForView, 
  getViewFromLocation 
} from '../utils/routes';

const MissionContext = createContext();

const INITIAL_TELEMETRY = {
  oxygen: 100,
  power: 100,
  fuel: 100,
  temperature: 21.0,
  pressure: 101.3,
  communication: 100,
  navigation: 100,
  missionHealth: 100,
  score: 0,
  xp: 0,
  missionRisk: "LOW",
  currentPhase: "pre_launch",
  completedObjectives: [],
  badges: [],
  history: [],
  emergenciesResolved: 0,
  emergenciesFailed: 0
};

export function MissionProvider({ children }) {
  // Synchronous session rehydration and route protection
  const initialSession = resolveInitialSession();

  // Navigation State
  const [currentView, setCurrentView] = useState(initialSession.initialView);

  // Astronaut Profile
  const [astronaut, setAstronaut] = useState(initialSession.astronaut);

  // Route guard notice message (e.g. when unauthenticated user is blocked/redirected)
  const [routeNotice, setRouteNotice] = useState(() => {
    return initialSession.blockedFrom 
      ? "Cadet enrollment required: Please register your profile to access mission sectors."
      : null;
  });

  // Telemetry & Mission State
  const [missionState, setMissionState] = useState(() => {
    try {
      const saved = localStorage.getItem('jamt_mission_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_TELEMETRY, ...parsed };
      }
    } catch (e) {
      console.warn("Failed to parse saved missionState", e);
    }
    return INITIAL_TELEMETRY;
  });

  // Training Center Progress
  const [trainingScores, setTrainingScores] = useState(() => {
    try {
      const saved = localStorage.getItem('jamt_training');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Pre-Launch Checklist State
  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem('jamt_checklist');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      eclssNominal: true,
      fuelPressurized: true,
      avionicsLocked: true,
      sensorDiscrepancyResolved: false, // The deliberate warning
      hatchSealed: true
    };
  });

  // Lunar Exploration Challenges Solved
  const [lunarSolved, setLunarSolved] = useState(() => {
    try {
      const saved = localStorage.getItem('jamt_lunar_solved');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Emergency scenario states
  const [activeEmergency, setActiveEmergency] = useState(() => {
    try {
      const saved = localStorage.getItem('jamt_active_emergency');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [lastFeedback, setLastFeedback] = useState(null);

  // Logout modal state
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Auto-dismiss route notice after 5 seconds
  useEffect(() => {
    if (!routeNotice) return;
    const timer = setTimeout(() => {
      setRouteNotice(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [routeNotice]);

  // Handle browser Back / Forward buttons and URL synchronization
  useEffect(() => {
    // If initial boot requested URL redirection (e.g. redirected or resumed to lastRoute)
    if (initialSession.shouldRedirectUrl) {
      window.history.replaceState({ view: initialSession.initialView }, '', initialSession.redirectPath);
    }

    const handlePopState = () => {
      const urlView = getViewFromLocation();
      const rawAstronaut = localStorage.getItem('jamt_astronaut');
      const hasAstronaut = !!rawAstronaut;

      if (isProtectedRoute(urlView) && !hasAstronaut) {
        // Route protection on browser history navigation
        setCurrentView('landing');
        window.history.replaceState({ view: 'landing' }, '', '/');
        setRouteNotice("Access Restricted: Cadet enrollment required to enter mission operations.");
      } else {
        setCurrentView(urlView);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Sync with LocalStorage
  useEffect(() => {
    if (astronaut) {
      const astronautWithRoute = {
        ...astronaut,
        lastRoute: currentView,
        currentPhase: missionState.currentPhase || currentView
      };
      localStorage.setItem('jamt_astronaut', JSON.stringify(astronautWithRoute));
      localStorage.setItem('jamt_last_route', currentView);
    } else {
      localStorage.removeItem('jamt_astronaut');
      localStorage.removeItem('jamt_last_route');
    }
    localStorage.setItem('jamt_mission_state', JSON.stringify(missionState));
    localStorage.setItem('jamt_training', JSON.stringify(trainingScores));
    localStorage.setItem('jamt_checklist', JSON.stringify(checklist));
    localStorage.setItem('jamt_lunar_solved', JSON.stringify(lunarSolved));
    localStorage.setItem('jamt_view', currentView);

    if (activeEmergency) {
      localStorage.setItem('jamt_active_emergency', JSON.stringify(activeEmergency));
    } else {
      localStorage.removeItem('jamt_active_emergency');
    }
  }, [astronaut, missionState, trainingScores, checklist, lunarSolved, currentView, activeEmergency]);

  // Navigate to view with route protection and URL bar synchronization
  const navigateTo = (view, options = {}) => {
    const targetView = normalizeView(view) || 'landing';

    // Route guard check: If view is protected and no astronaut profile exists
    if (isProtectedRoute(targetView) && !astronaut && !options.force) {
      const fallbackView = options.targetOnBlocked || 'landing';
      setCurrentView(fallbackView);
      const targetPath = getPathForView(fallbackView);
      window.history.replaceState({ view: fallbackView }, '', targetPath);
      setRouteNotice("Cadet Profile Required: Please enroll an astronaut cadet before entering mission operations.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView(targetView);
    const targetPath = getPathForView(targetView);

    // Update browser URL bar
    if (options.replace) {
      window.history.replaceState({ view: targetView }, '', targetPath);
    } else if (window.location.pathname !== targetPath) {
      window.history.pushState({ view: targetView }, '', targetPath);
    }

    // Persist last route immediately
    if (astronaut) {
      localStorage.setItem('jamt_last_route', targetView);
      localStorage.setItem('jamt_view', targetView);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Register Astronaut
  const registerAstronaut = (profile) => {
    const idNum = Math.floor(1000 + Math.random() * 9000);
    const newAstronaut = {
      ...profile,
      id: `AST-${idNum}`,
      lastRoute: 'dashboard',
      currentPhase: 'pre_launch',
      registeredAt: new Date().toISOString()
    };

    // Save to localStorage immediately
    localStorage.setItem('jamt_astronaut', JSON.stringify(newAstronaut));
    localStorage.setItem('jamt_last_route', 'dashboard');
    localStorage.setItem('jamt_view', 'dashboard');

    setAstronaut(newAstronaut);
    setRouteNotice(null);

    // Award Welcome XP
    setMissionState(prev => ({
      ...prev,
      xp: prev.xp + 50,
      badges: prev.badges.includes("Mission Ready") ? prev.badges : [...prev.badges, "Mission Ready"]
    }));

    navigateTo('dashboard', { force: true });
  };

  // Complete a training module
  const completeTrainingModule = (moduleId, score) => {
    setTrainingScores(prev => {
      const updated = { ...prev, [moduleId]: score };
      // Award XP
      setMissionState(ms => ({
        ...ms,
        xp: ms.xp + 100,
        score: ms.score + 50,
        badges: Object.keys(updated).length === 4 && !ms.badges.includes("Systems Expert") 
          ? [...ms.badges, "Systems Expert"] 
          : ms.badges
      }));
      return updated;
    });
  };

  // Resolve pre-launch warning
  const resolvePreLaunchWarning = () => {
    setChecklist(prev => ({ ...prev, sensorDiscrepancyResolved: true }));
    setMissionState(prev => ({ ...prev, xp: prev.xp + 50, score: prev.score + 25 }));
  };

  // Submit emergency decision
  const submitEmergencyDecision = async (scenarioId, chosenOptionId) => {
    try {
      const response = await fetch('/api/missions/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentState: missionState,
          scenarioId,
          chosenOptionId
        })
      });
      if (response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const result = await response.json();
          setMissionState(result.updatedState);
          setLastFeedback({
            isCorrect: result.isCorrect,
            chosenOption: result.chosenOption,
            explanation: result.explanation,
            message: result.statusMessage
          });
          return result;
        }
      }
    } catch (err) {
      console.warn("Backend evaluation offline. Using client evaluation fallback.", err);
    }

    // Client-side evaluation fallback
    const sc = DEFAULT_SCENARIOS.find(s => s.id === scenarioId);
    if (!sc) return null;
    const isCorrect = sc.correctAnswer === chosenOptionId;
    const effects = isCorrect ? sc.effectsOnSuccess : sc.effectsOnFailure;
    
    const updatedState = {
      ...missionState,
      oxygen: Math.max(0, Math.min(100, missionState.oxygen + (effects.oxygen || 0))),
      power: Math.max(0, Math.min(100, missionState.power + (effects.power || 0))),
      score: Math.max(0, missionState.score + (effects.score || 0)),
      xp: missionState.xp + (effects.xp || 0),
      emergenciesResolved: missionState.emergenciesResolved + (isCorrect ? 1 : 0),
      emergenciesFailed: missionState.emergenciesFailed + (isCorrect ? 0 : 1),
      badges: isCorrect && !missionState.badges.includes("Emergency Responder") 
        ? [...missionState.badges, "Emergency Responder"] 
        : missionState.badges
    };
    
    setMissionState(updatedState);
    const fallbackResult = {
      isCorrect,
      chosenOption: chosenOptionId,
      explanation: sc.explanation,
      statusMessage: effects.statusMessage,
      effectsApplied: effects,
      updatedState
    };
    setLastFeedback({
      isCorrect,
      chosenOption: chosenOptionId,
      explanation: sc.explanation,
      message: effects.statusMessage
    });
    return fallbackResult;
  };

  // Solve a Lunar Science Challenge
  const solveLunarChallenge = async (challengeId, selectedAnswer) => {
    try {
      const response = await fetch('/api/missions/evaluate-lunar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId, selectedAnswer })
      });
      if (response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const res = await response.json();
          setLunarSolved(prev => ({
            ...prev,
            [challengeId]: {
              isCorrect: res.isCorrect,
              explanation: res.explanation
            }
          }));
          if (res.isCorrect) {
            setMissionState(prev => ({
              ...prev,
              xp: prev.xp + res.xpAwarded,
              score: prev.score + 50,
              badges: Object.keys(lunarSolved).length >= 3 && !prev.badges.includes("Lunar Explorer")
                ? [...prev.badges, "Lunar Explorer"]
                : prev.badges
            }));
          }
          return res;
        }
      }
    } catch (err) {
      console.warn("Backend lunar evaluation offline. Using client evaluation fallback.", err);
    }

    // Client-side fallback
    const ch = DEFAULT_LUNAR_CHALLENGES.find(c => c.id === challengeId);
    if (!ch) return null;
    const isCorrect = ch.correctAnswer === selectedAnswer;
    const fallbackRes = {
      challengeId,
      isCorrect,
      explanation: ch.explanation,
      xpAwarded: isCorrect ? ch.xpReward : 10
    };
    setLunarSolved(prev => ({
      ...prev,
      [challengeId]: {
        isCorrect,
        explanation: ch.explanation
      }
    }));
    if (isCorrect) {
      setMissionState(prev => ({
        ...prev,
        xp: prev.xp + 50,
        score: prev.score + 50,
        badges: Object.keys(lunarSolved).length >= 3 && !prev.badges.includes("Lunar Explorer")
          ? [...prev.badges, "Lunar Explorer"]
          : prev.badges
      }));
    }
    return fallbackRes;
  };

  // Demo mode quick setup for hackathon judges
  const activateDemoMode = (targetView = 'mission_control') => {
    const demoProfile = {
      id: "AST-7709",
      name: "Commander Morgan",
      callsign: "Apollo",
      ageGroup: "13-16",
      missionId: "lunar_research",
      avatar: "👨‍🚀",
      lastRoute: targetView,
      currentPhase: targetView,
      registeredAt: new Date().toISOString()
    };
    
    // Save demo immediately to localStorage
    localStorage.setItem('jamt_astronaut', JSON.stringify(demoProfile));
    localStorage.setItem('jamt_last_route', targetView);
    localStorage.setItem('jamt_view', targetView);

    setAstronaut(demoProfile);
    setRouteNotice(null);
    setTrainingScores({
      "module-science": 100,
      "module-survival": 100,
      "module-systems": 100,
      "module-decisions": 100
    });
    setChecklist({
      eclssNominal: true,
      fuelPressurized: true,
      avionicsLocked: true,
      sensorDiscrepancyResolved: true,
      hatchSealed: true
    });
    setMissionState(prev => ({
      ...prev,
      xp: 450,
      score: 350,
      badges: ["Mission Ready", "Systems Expert"],
      currentPhase: targetView
    }));
    navigateTo(targetView, { force: true });
  };

  // Request, Cancel & Confirm Astronaut Logout (Switch Candidate Flow)
  const requestLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const confirmLogout = (targetRedirect = 'landing') => {
    // 1. Clear all localStorage items scoped to this astronaut & mission
    localStorage.removeItem('jamt_astronaut');
    localStorage.removeItem('jamt_last_route');
    localStorage.removeItem('jamt_view');
    localStorage.removeItem('jamt_mission_state');
    localStorage.removeItem('jamt_training');
    localStorage.removeItem('jamt_checklist');
    localStorage.removeItem('jamt_lunar_solved');
    localStorage.removeItem('jamt_active_emergency');

    // 2. Reset all in-memory React states back to defaults
    setAstronaut(null);
    setMissionState(INITIAL_TELEMETRY);
    setTrainingScores({});
    setLunarSolved({});
    setChecklist({
      eclssNominal: true,
      fuelPressurized: true,
      avionicsLocked: true,
      sensorDiscrepancyResolved: false,
      hatchSealed: true
    });
    setActiveEmergency(null);
    setLastFeedback(null);
    setIsLogoutModalOpen(false);
    setRouteNotice(null);

    // 3. Cleanly redirect next candidate & update URL to /
    navigateTo(targetRedirect, { replace: true, force: true });
  };

  // Reset entire mission simulation (clears active candidate and restarts)
  const resetMission = () => {
    confirmLogout('landing');
  };

  // Rank computation
  const getAstronautRank = () => {
    const totalXP = missionState.xp;
    if (totalXP >= 800) return "Mission Specialist";
    if (totalXP >= 500) return "Junior Astronaut";
    if (totalXP >= 250) return "Mission Cadet";
    return "Space Trainee";
  };

  return (
    <MissionContext.Provider value={{
      currentView,
      navigateTo,
      astronaut,
      setAstronaut,
      registerAstronaut,
      missionState,
      setMissionState,
      trainingScores,
      completeTrainingModule,
      checklist,
      resolvePreLaunchWarning,
      activeEmergency,
      setActiveEmergency,
      submitEmergencyDecision,
      lastFeedback,
      setLastFeedback,
      lunarSolved,
      solveLunarChallenge,
      activateDemoMode,
      resetMission,
      isLogoutModalOpen,
      requestLogout,
      cancelLogout,
      confirmLogout,
      getAstronautRank,
      routeNotice,
      clearRouteNotice: () => setRouteNotice(null)
    }}>
      {children}
    </MissionContext.Provider>
  );
}

export const useMission = () => useContext(MissionContext);
