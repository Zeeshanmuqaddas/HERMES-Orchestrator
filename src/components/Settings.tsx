import { useEffect, useState } from "react";
import { Server, Settings as SettingsIcon, ShieldCheck, Database, RefreshCw, Scale, User, Save } from "lucide-react";

type SettingsTab = "persona" | "directives" | "memory" | "security" | "governance";

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("persona");
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
           <div 
             onClick={() => setActiveTab("persona")}
             className={`bg-surface-900 border border-surface-800 rounded-xl p-4 cursor-pointer transition-all ${
               activeTab === "persona" 
                 ? "border-l-2 border-l-brand-500 hover:border-brand-500/50" 
                 : "opacity-60 hover:opacity-100"
             }`}
           >
              <div className="flex items-center gap-3 mb-2">
                <User className={`w-5 h-5 ${activeTab === "persona" ? "text-brand-400" : "text-surface-400"}`} />
                <h3 className="font-medium text-surface-200">System Persona</h3>
              </div>
              <p className="text-xs text-surface-500">Inject and edit the orchestrator system prompt.</p>
           </div>

           <div 
             onClick={() => setActiveTab("directives")}
             className={`bg-surface-900 border border-surface-800 rounded-xl p-4 cursor-pointer transition-all ${
               activeTab === "directives" 
                 ? "border-l-2 border-l-brand-500 hover:border-brand-500/50" 
                 : "opacity-60 hover:opacity-100"
             }`}
           >
              <div className="flex items-center gap-3 mb-2">
                <Server className={`w-5 h-5 ${activeTab === "directives" ? "text-brand-400" : "text-surface-400"}`} />
                <h3 className="font-medium text-surface-200">Core Directives</h3>
              </div>
              <p className="text-xs text-surface-500">Master behavior logic loaded from the orchestrator backend node.</p>
           </div>
           
           <div 
             onClick={() => setActiveTab("governance")}
             className={`bg-surface-900 border border-surface-800 rounded-xl p-4 cursor-pointer transition-all ${
               activeTab === "governance" 
                 ? "border-l-2 border-l-brand-500 hover:border-brand-500/50" 
                 : "opacity-60 hover:opacity-100"
             }`}
           >
              <div className="flex items-center gap-3 mb-2">
                <Scale className={`w-5 h-5 ${activeTab === "governance" ? "text-brand-400" : "text-surface-400"}`} />
                <h3 className="font-medium text-surface-200">Governance Settings</h3>
              </div>
              <p className="text-xs text-surface-500">Compliance policies, HITL triggers, and escalation thresholds.</p>
           </div>
           
           <div 
             onClick={() => setActiveTab("memory")}
             className={`bg-surface-900 border border-surface-800 rounded-xl p-4 cursor-pointer transition-all ${
               activeTab === "memory" 
                 ? "border-l-2 border-l-brand-500 hover:border-brand-500/50" 
                 : "opacity-60 hover:opacity-100"
             }`}
           >
              <div className="flex items-center gap-3 mb-2">
                <Database className={`w-5 h-5 ${activeTab === "memory" ? "text-brand-400" : "text-surface-400"}`} />
                <h3 className="font-medium text-surface-200">Memory & Storage</h3>
              </div>
              <p className="text-xs text-surface-500">Vector database connections and Long-Term Memory thresholds.</p>
           </div>
           
           <div 
             onClick={() => setActiveTab("security")}
             className={`bg-surface-900 border border-surface-800 rounded-xl p-4 cursor-pointer transition-all ${
               activeTab === "security" 
                 ? "border-l-2 border-l-brand-500 hover:border-brand-500/50" 
                 : "opacity-60 hover:opacity-100"
             }`}
           >
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className={`w-5 h-5 ${activeTab === "security" ? "text-brand-400" : "text-surface-400"}`} />
                <h3 className="font-medium text-surface-200">Security & RBAC</h3>
              </div>
              <p className="text-xs text-surface-500">Zero Trust governance, secrets injection, and human approval parameters.</p>
           </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === "persona" && (
            <SystemPersonaSettings defaultPrompt={directive} loading={loading} />
          )}

          {activeTab === "directives" && (
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
          )}

          {activeTab === "governance" && (
            <GovernanceSettings />
          )}

          {(activeTab === "memory" || activeTab === "security") && (
            <div className="bg-surface-900 border border-surface-800 rounded-xl p-8 flex items-center justify-center h-[70vh]">
              <p className="text-surface-500 font-mono text-sm">Module configuration locked by administrator.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SystemPersonaSettings({ defaultPrompt, loading }: { defaultPrompt: string, loading: boolean }) {
  const [prompt, setPrompt] = useState<string>("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!loading && defaultPrompt) {
      const saved = localStorage.getItem("system_persona");
      if (saved) {
        setPrompt(saved);
      } else {
        setPrompt(defaultPrompt);
      }
    }
  }, [defaultPrompt, loading]);

  const handleSave = () => {
    localStorage.setItem("system_persona", prompt);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    localStorage.removeItem("system_persona");
    setPrompt(defaultPrompt);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="bg-surface-900 border border-surface-800 rounded-xl flex flex-col h-[70vh] overflow-hidden">
      <div className="p-4 border-b border-surface-800 flex justify-between items-center bg-surface-950/50">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-brand-400" />
          <h2 className="text-sm font-medium text-surface-200">System Persona Configuration</h2>
        </div>
        <div className="flex items-center gap-2">
           <button 
             onClick={handleReset}
             className="px-3 py-1.5 text-xs font-medium text-surface-400 hover:text-white transition-colors border border-surface-700 bg-surface-800 rounded"
             disabled={loading}
           >
             Reset Default
           </button>
           <button 
             onClick={handleSave}
             disabled={loading}
             className="flex items-center gap-2 px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-medium rounded transition-colors disabled:opacity-50"
           >
             <Save className="w-3 h-3" />
             {isSaved ? "Saved!" : "Save Changes"}
           </button>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col min-h-0 bg-surface-950/20">
         <p className="text-xs text-surface-500 mb-4 font-mono">
           This prompt dictates the core behavior, formatting rules, and orchestration logic for the primary LLM control plane. Changes here will alter how workflows are generated and managed. Persisted locally.
         </p>
         <textarea
           value={prompt}
           onChange={(e) => setPrompt(e.target.value)}
           disabled={loading && !prompt}
           className="flex-1 w-full bg-black/40 border border-surface-800 rounded-lg p-4 text-surface-300 font-mono text-xs focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-colors resize-none disabled:opacity-50"
           spellCheck={false}
           placeholder={loading ? "Loading directives..." : "Enter system prompt here..."}
         />
      </div>
    </div>
  );
}

function GovernanceSettings() {
  const [confidenceThreshold, setConfidenceThreshold] = useState(80);
  const [policies, setPolicies] = useState({
    iso27001: true,
    soc2: true,
    gdpr: true,
    hipaa: false,
    nist: true
  });
  const [escalation, setEscalation] = useState({
    highSecurity: true,
    complianceImpact: true,
    financialImpact: true,
    destructiveActions: true,
    regulatoryConcerns: true
  });

  return (
    <div className="bg-surface-900 border border-surface-800 rounded-xl flex flex-col h-[70vh] overflow-hidden">
      <div className="p-4 border-b border-surface-800 flex justify-between items-center bg-surface-950/50">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-surface-400" />
          <h2 className="text-sm font-medium text-surface-200">Governance & Ethics Configuration</h2>
        </div>
      </div>
      
      <div className="p-6 flex-1 overflow-auto space-y-8">
        {/* Compliance Policies */}
        <section>
          <div className="mb-4">
            <h3 className="text-surface-100 font-medium tracking-tight">Compliance Policies</h3>
            <p className="text-surface-500 text-xs mt-1">Enforce regulatory frameworks across all agent workflows.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(policies).map(([key, value]) => (
              <label key={key} className="flex items-center justify-between p-3 border border-surface-800 rounded-lg bg-surface-950/50 cursor-pointer hover:border-surface-700 transition-colors">
                <span className="text-sm font-medium text-surface-300 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input 
                    type="checkbox" 
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-surface-100 border-4 border-surface-800 appearance-none cursor-pointer" 
                    checked={value}
                    onChange={() => setPolicies(p => ({ ...p, [key]: !p[key as keyof typeof policies] }))}
                    style={{ right: value ? 0 : '1.25rem', borderColor: value ? '#6366f1' : '#1e293b', backgroundColor: '#f8fafc' }}
                  />
                  <div className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors ${value ? 'bg-brand-500' : 'bg-surface-800'}`}></div>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Human in the Loop Triggers */}
        <section>
          <div className="mb-4">
            <h3 className="text-surface-100 font-medium tracking-tight">Human-in-the-Loop Triggers</h3>
            <p className="text-surface-500 text-xs mt-1">Specify when autonomous execution must pause for human review.</p>
          </div>
          
          <div className="p-5 border border-surface-800 rounded-lg bg-surface-950/50">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium text-surface-300">Minimum Confidence Score</label>
              <span className="text-brand-400 font-mono font-bold">{confidenceThreshold}%</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="99" 
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
              className="w-full h-2 bg-surface-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex justify-between text-xs text-surface-500 mt-2 font-mono">
              <span>50% (High Autonomy)</span>
              <span>Agents will escalate tasks with &lt; {confidenceThreshold}% confidence</span>
              <span>99% (Strict Review)</span>
            </div>
          </div>
        </section>

        {/* Escalation Thresholds */}
        <section>
          <div className="mb-4">
            <h3 className="text-surface-100 font-medium tracking-tight">Automatic Escalation Thresholds</h3>
            <p className="text-surface-500 text-xs mt-1">Activities that mandate immediate orchestration halt and human authorization.</p>
          </div>
          <div className="space-y-3">
            {[
              { id: 'highSecurity', label: 'High Security Risk', desc: 'Any action affecting IAM, network boundaries, or encryption keys' },
              { id: 'complianceImpact', label: 'Compliance Impact', desc: 'Actions potentially violating active compliance policies' },
              { id: 'financialImpact', label: 'Financial Impact', desc: 'Workflows involving financial transactions or high-cost cloud resources' },
              { id: 'destructiveActions', label: 'Destructive Actions', desc: 'Data deletion, resource termination, or service shutdown' },
              { id: 'regulatoryConcerns', label: 'Regulatory Concerns', desc: 'Actions subject to regulatory reporting or external audit' }
            ].map((item) => (
              <label key={item.id} className="flex items-start gap-3 p-3 border border-surface-800 rounded-lg bg-surface-950/50 cursor-pointer hover:border-surface-700 transition-colors">
                 <div className="relative inline-block w-10 mt-0.5 shrink-0 select-none transition duration-200 ease-in">
                  <input 
                    type="checkbox" 
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-surface-100 border-4 border-surface-800 appearance-none cursor-pointer" 
                    checked={escalation[item.id as keyof typeof escalation]}
                    onChange={() => setEscalation(e => ({ ...e, [item.id]: !e[item.id as keyof typeof escalation] }))}
                    style={{ right: escalation[item.id as keyof typeof escalation] ? 0 : '1.25rem', borderColor: escalation[item.id as keyof typeof escalation] ? '#ef4444' : '#1e293b', backgroundColor: '#f8fafc' }}
                  />
                  <div className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors ${escalation[item.id as keyof typeof escalation] ? 'bg-red-500' : 'bg-surface-800'}`}></div>
                </div>
                <div>
                  <div className="text-sm font-medium text-surface-200">{item.label}</div>
                  <div className="text-xs text-surface-500 mt-0.5">{item.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

