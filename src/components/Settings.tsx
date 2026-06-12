import { useEffect, useState } from "react";
import { Server, Settings as SettingsIcon, ShieldCheck, Database, RefreshCw } from "lucide-react";

export function Settings() {
  const [directive, setDirective] = useState<string>("Loading core directives from control plane...");
  const [loading, setLoading] = useState<boolean>(true);
  const [platformInfo, setPlatformInfo] = useState<{ version?: string, name?: string }>({});

  const fetchDirective = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/system/directive");
      const data = await res.json();
      if (data.status === "success") {
        setDirective(data.directive);
        setPlatformInfo({ version: data.version, name: data.platform });
      } else {
        setDirective("Failed to fetch system directive. Secondary node offline.");
      }
    } catch (err) {
      setDirective("System unreachable. Is the orchestrator node running?");
    } finally {
      setTimeout(() => setLoading(false), 600); // Simulate network latency for UI feel
    }
  };

  useEffect(() => {
    fetchDirective();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">System Configuration</h1>
          <p className="text-surface-400 mt-1 text-sm">Enterprise orchestrator parameters, active directives, and routing configuration.</p>
        </div>
        <button 
          onClick={fetchDirective}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 border border-surface-700 bg-surface-800 hover:bg-surface-700 text-surface-200 transition-colors rounded-md disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-400' : ''}`} />
          {loading ? 'Syncing...' : 'Sync Config'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
           {/* Setting sidebar panels */}
           <div className="bg-surface-900 border border-surface-800 rounded-xl p-4 cursor-pointer hover:border-brand-500/50 border-l-2 border-l-brand-500 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Server className="w-5 h-5 text-brand-400" />
                <h3 className="font-medium text-surface-200">Core Directives</h3>
              </div>
              <p className="text-xs text-surface-500">Master behavior logic loaded from the orchestrator backend node.</p>
           </div>
           
           <div className="bg-surface-900 border border-surface-800 rounded-xl p-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-5 h-5 text-surface-400" />
                <h3 className="font-medium text-surface-200">Memory & Storage</h3>
              </div>
              <p className="text-xs text-surface-500">Vector database connections and Long-Term Memory thresholds.</p>
           </div>
           
           <div className="bg-surface-900 border border-surface-800 rounded-xl p-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-5 h-5 text-surface-400" />
                <h3 className="font-medium text-surface-200">Security & RBAC</h3>
              </div>
              <p className="text-xs text-surface-500">Zero Trust governance, secrets injection, and human approval parameters.</p>
           </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-surface-900 border border-surface-800 rounded-xl flex flex-col h-[70vh]">
            <div className="p-4 border-b border-surface-800 flex justify-between items-center bg-surface-950/50 rounded-t-xl">
               <div className="flex items-center gap-2">
                 <SettingsIcon className="w-4 h-4 text-surface-400" />
                 <span className="text-sm font-medium text-surface-200">Active System Prompt</span>
               </div>
               
               <div className="flex gap-4">
                  <span className="text-xs font-mono text-surface-500 flex items-center gap-1">
                    TARGET: <span className="text-purple-400 uppercase">{platformInfo.name || 'CONNECTING...'}</span>
                  </span>
                  <span className="text-xs font-mono text-surface-500 flex items-center gap-1">
                    VERSION: <span className="text-brand-400">{platformInfo.version || 'v-.--'}</span>
                  </span>
               </div>
            </div>
            
            <div className={`p-6 flex-1 overflow-auto bg-black/30 font-mono text-xs whitespace-pre-wrap transition-opacity duration-300 ${loading ? 'opacity-50 text-surface-500' : 'opacity-100 text-surface-300'}`}>
              {directive}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
