import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { Dashboard } from "./components/Dashboard";
import { AgentFleet } from "./components/AgentFleet";
import { Workflows } from "./components/Workflows";
import { LLMRouter } from "./components/LLMRouter";
import { View } from "./types";

import { Settings } from "./components/Settings";
import { AuthPage } from "./components/AuthPage";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  if (!userEmail) {
    return <AuthPage onLogin={setUserEmail} />;
  }

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "agents":
        return <AgentFleet />;
      case "workflows":
        return <Workflows />;
      case "routing":
        return <LLMRouter />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-surface-950 overflow-hidden text-surface-50 font-sans selection:bg-brand-500 selection:text-white">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar userEmail={userEmail} onLogout={() => setUserEmail(null)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-[1600px] mx-auto">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}
