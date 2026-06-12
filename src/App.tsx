import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { Dashboard } from "./components/Dashboard";
import { AgentFleet } from "./components/AgentFleet";
import { Workflows } from "./components/Workflows";
import { LLMRouter } from "./components/LLMRouter";
import { AuditLog } from "./components/AuditLog";
import { IncidentResponse } from "./components/IncidentResponse";
import { ToastContainer, ToastMessage } from "./components/Toast";
import { View } from "./types";

import { Settings } from "./components/Settings";
import { AuthPage } from "./components/AuthPage";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 6000);
  };

  useEffect(() => {
    if (!userEmail) return;

    const timer = setTimeout(() => {
      addToast({
        title: "Governance Guardrail Triggered",
        message: "Agent 'Enterprise ML' confidence fell to 74% (Threshold: 80%). Task execution halted and routed to human review.",
        type: "warning"
      });
    }, 7000);

    return () => {
      clearTimeout(timer);
    };
  }, [userEmail]);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

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
      case "incident_response":
        return <IncidentResponse />;
      case "routing":
        return <LLMRouter />;
      case "audit":
        return <AuditLog />;
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
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="max-w-[1600px] mx-auto">
            {renderView()}
          </div>
        </main>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
