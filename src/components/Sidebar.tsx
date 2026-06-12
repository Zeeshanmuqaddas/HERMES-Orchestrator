import { LayoutDashboard, Users, Workflow, Route, Settings, Box } from "lucide-react";
import { View } from "../types";
import { cn } from "../utils";

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const navItems: { id: View; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Control Plane", icon: LayoutDashboard },
    { id: "agents", label: "Agent Fleet", icon: Users },
    { id: "workflows", label: "BPMN Workflows", icon: Workflow },
    { id: "routing", label: "LLM Orchestration", icon: Route },
    { id: "settings", label: "System Config", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-surface-800 bg-surface-900 flex flex-col h-full shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-surface-800">
        <div className="flex items-center gap-2 text-brand-500">
          <Box className="w-6 h-6" />
          <span className="font-bold tracking-wider text-sm uppercase text-surface-50">Hermes OS</span>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <div className="px-3 mb-2 text-xs font-mono text-surface-500 tracking-wider">MODULES</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors duration-200",
                isActive 
                  ? "bg-brand-500/10 text-brand-500 font-medium" 
                  : "text-surface-400 hover:text-surface-50 hover:bg-surface-800/50"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-surface-800">
        <div className="bg-surface-800 rounded-md p-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-surface-400 font-mono">CORE_STATUS</span>
            <span className="text-sm font-medium text-green-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              ONLINE
            </span>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono text-surface-500">v1.0.4</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
