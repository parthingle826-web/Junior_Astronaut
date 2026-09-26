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

import { Bot } from 'lucide-react';

function AppContent() {
  const { currentView } = useMission();
  const [isAstraOpen, setIsAstraOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'register':
        return <AstronautRegistration />;
      case 'dashboard':
        return <AstronautDashboard />;
      case 'training':
        return <TrainingCenter />;
      case 'briefing':
        return <MissionBriefing />;
      case 'launch':
        return <LaunchSequence />;
      case 'mission_control':
        return <MissionControl />;
      case 'moon_landing':
        return <MoonLanding />;
      case 'lunar_exploration':
        return <LunarExploration />;
      case 'nasa_data':
        return <NasaDataExplorer />;
      case 'report':
        return <MissionReport />;
      case 'certificate':
        return <CertificateView />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-space-950 stars-bg text-slate-100 font-sans">
      <Navbar />

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
