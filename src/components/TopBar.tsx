import { Bell, Search, ShieldAlert, Cpu, LogOut } from "lucide-react";

interface TopBarProps {
  userEmail: string;
  onLogout: () => void;
}

export function TopBar({ userEmail, onLogout }: TopBarProps) {
  return (
    <header className="h-16 border-b border-surface-800 bg-surface-900/50 backdrop-blur-sm flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
          <input 
            type="text" 
            placeholder="Search agents, workflows, cases..." 
            className="w-full bg-surface-950 border border-surface-800 rounded-md pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-brand-500 transition-colors placeholder:text-surface-600 text-surface-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-sm font-mono text-surface-400 border-r border-surface-800 pr-6 hidden md:flex">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4" />
            <span>24% CPU</span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-400">
            <ShieldAlert className="w-4 h-4" />
            <span>1 SECURITY_EVENT</span>
          </div>
        </div>
        
        <button className="text-surface-400 hover:text-surface-50 relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-500 rounded-full border-2 border-surface-900"></span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-medium text-surface-200">{userEmail.split('@')[0]}</span>
            <span className="text-xs text-brand-500 font-mono">CEO_AUTHORITY</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center font-medium text-sm text-white border border-surface-700">
            {userEmail.substring(0, 2).toUpperCase()}
          </div>
          
          <div className="h-6 border-l border-surface-800 mx-1 hidden sm:block"></div>
          
          <button 
            onClick={onLogout}
            className="text-surface-500 hover:text-red-400 transition-colors p-1"
            title="Disconnect Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
