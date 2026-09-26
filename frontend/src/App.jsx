import React, { useState } from 'react';
import { MissionProvider, useMission } from './context/MissionContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AstraChat from './components/AstraChat';
import LogoutModal from './components/LogoutModal';

// Pages
import LandingPage from './pages/LandingPage';
import AstronautRegistration from './pages/AstronautRegistration';
import AstronautDashboard from './pages/AstronautDashboard';
import TrainingCenter from './pages/TrainingCenter';
import MissionBriefing from './pages/MissionBriefing';
import LaunchSequence from './pages/LaunchSequence';
import MissionControl from './pages/MissionControl';
import MoonLanding from './pages/MoonLanding';
import LunarExploration from './pages/LunarExploration';
import NasaDataExplorer from './pages/NasaDataExplorer';
import MissionReport from './pages/MissionReport';
import CertificateView from './pages/CertificateView';
import LeaderboardPage from './pages/LeaderboardPage';
import AboutPage from './pages/AboutPage';

import { Bot, ShieldAlert, X } from 'lucide-react';

/**
 * Route Guard Component
 * Ensures only enrolled astronauts can access protected views.
 * If no astronaut profile is active in state/localStorage, it immediately blocks rendering
 * and redirects to registration or landing.
 */
function ProtectedRoute({ children }) {
  const { astronaut, navigateTo } = useMission();

  React.useEffect(() => {
    if (!astronaut) {
      navigateTo('landing', { replace: true, targetOnBlocked: 'landing' });
    }
  }, [astronaut, navigateTo]);

  if (!astronaut) {
    return null;
  }

  return children;
}

function AppContent() {
  const { currentView, routeNotice, clearRouteNotice } = useMission();
  const [isAstraOpen, setIsAstraOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'register':
        return <AstronautRegistration />;
      case 'dashboard':
        return <ProtectedRoute><AstronautDashboard /></ProtectedRoute>;
      case 'training':
        return <ProtectedRoute><TrainingCenter /></ProtectedRoute>;
      case 'briefing':
        return <ProtectedRoute><MissionBriefing /></ProtectedRoute>;
      case 'launch':
        return <ProtectedRoute><LaunchSequence /></ProtectedRoute>;
      case 'mission_control':
        return <ProtectedRoute><MissionControl /></ProtectedRoute>;
      case 'moon_landing':
        return <ProtectedRoute><MoonLanding /></ProtectedRoute>;
      case 'lunar_exploration':
        return <ProtectedRoute><LunarExploration /></ProtectedRoute>;
      case 'nasa_data':
        return <ProtectedRoute><NasaDataExplorer /></ProtectedRoute>;
      case 'report':
        return <ProtectedRoute><MissionReport /></ProtectedRoute>;
      case 'certificate':
        return <ProtectedRoute><CertificateView /></ProtectedRoute>;
      case 'leaderboard':
        return <ProtectedRoute><LeaderboardPage /></ProtectedRoute>;
      case 'about':
        return <ProtectedRoute><AboutPage /></ProtectedRoute>;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-space-950 stars-bg text-slate-100 font-sans">
      <Navbar />

      {/* Route Guard Notice Toast */}
      {routeNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 pointer-events-auto animate-fadeIn">
          <div className="p-3.5 rounded-xl bg-amber-950/95 border border-amber-500/60 shadow-2xl flex items-center justify-between text-amber-200 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
              <span>{routeNotice}</span>
            </div>
            <button 
              onClick={clearRouteNotice}
              className="p-1 hover:bg-amber-900/60 rounded text-amber-400 hover:text-white"
              aria-label="Dismiss notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <main className="flex-1">
        {renderView()}
      </main>

      <Footer />

      {/* Floating ASTRA AI Communicator Button (Visible across all screens) */}
      <div className="fixed bottom-6 right-6 z-40 no-print">
        <button
          onClick={() => setIsAstraOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-600 via-cyan-500 to-blue-500 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-500/30 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-cyan-300 group"
          title="Open ASTRA AI Flight Director"
        >
          <Bot className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-space-950 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-space-950 rounded-full" />
        </button>
      </div>

      {/* Global ASTRA AI Chat Drawer */}
      <AstraChat isOpen={isAstraOpen} onClose={() => setIsAstraOpen(false)} />

      {/* Global Logout / Switch Astronaut Confirmation Modal */}
      <LogoutModal />
    </div>
  );
}

export default function App() {
  return (
    <MissionProvider>
      <AppContent />
    </MissionProvider>
  );
}
