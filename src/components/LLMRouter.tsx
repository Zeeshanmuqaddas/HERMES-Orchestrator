import { useState } from "react";
import { GitMerge, Cpu, Search, Activity, Zap, ShieldAlert, Play, Send } from "lucide-react";

interface LogEntry {
  id: string;
  time: string;
  source: string;
  req: string;
  route: string;
  reason: string;
  cost: string;
}

const initialLogs: LogEntry[] = [
  { id: '1', time: "14:02:11", source: "CEO_AGT", req: "Complex reasoning task", route: "GPT-5", reason: "Highest contextual confidence required", cost: "$0.04" },
  { id: '2', time: "14:02:12", source: "SUP_AGT", req: "Ticket #991 classification", route: "Gemini Flash", reason: "Fast sequence alignment, low complexity", cost: "$0.001" },
  { id: '3', time: "14:02:14", source: "RPA_BOT", req: "OCR extraction fallback", route: "Gemini 2.5 Pro", reason: "Multimodal ingestion required", cost: "$0.012" },
  { id: '4', time: "14:02:15", source: "COD_AGT", req: "Refactor util/auth.ts", route: "Claude 3.5 Sonnet", reason: "Coding baseline policy match", cost: "$0.02" },
];

export function LLMRouter() {
  const [taskInput, setTaskInput] = useState("");
  const [complexity, setComplexity] = useState("auto");
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [isRouting, setIsRouting] = useState(false);

  const handleRouteTask = () => {
    if (!taskInput.trim()) return;
    setIsRouting(true);
    
    // Simulate routing delay
    setTimeout(() => {
      const now = new Date();
      const time = now.toTimeString().split(' ')[0];
      
      let route = "Gemini Flash";
      let reason = "Low complexity, fast response";
      let cost = "$0.001";
      
      let detectedComplexity = complexity;
      if (detectedComplexity === 'auto') {
         const lower = taskInput.toLowerCase();
         if (lower.includes('refactor') || lower.includes('code') || lower.includes('bug')) {
            detectedComplexity = 'medium';
         } else if (lower.includes('reason') || lower.includes('complex') || lower.includes('plan')) {
            detectedComplexity = 'high';
         } else if (lower.includes('image') || lower.includes('vision')) {
            detectedComplexity = 'multimodal';
         } else {
            detectedComplexity = 'low';
         }
      }

      if (detectedComplexity === 'high') {
         route = "GPT-5";
         reason = "High complexity reasoning required";
         cost = "$0.05";
      } else if (detectedComplexity === 'medium') {
         route = "Claude 3.5 Sonnet";
         reason = "Coding/moderate complexity policy match";
         cost = "$0.02";
      } else if (detectedComplexity === 'multimodal') {
         route = "Gemini 2.5 Pro";
         reason = "Multimodal capabilities needed";
         cost = "$0.015";
      } else if (detectedComplexity === 'low') {
         if (Math.random() > 0.5) {
           route = "Mistral Large";
           reason = "Low complexity, local privacy preferred";
           cost = "$0.00";
         }
      }

      const newLog: LogEntry = {
        id: Math.random().toString(36).substring(7),
        time,
        source: "USER_REQ",
        req: taskInput,
        route,
        reason,
        cost
      };

      setLogs(prev => [newLog, ...prev]);
      setTaskInput("");
      setIsRouting(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">Multi-LLM Orchestration</h1>
        <p className="text-surface-400 mt-1 text-sm">Dynamic request routing across Gemini, Claude, and OpenAI clusters.</p>
      </div>

      <div className="bg-surface-900 border border-surface-800 rounded-xl p-5">
        <h2 className="text-sm font-medium text-surface-200 mb-4 flex items-center gap-2">
          <Play className="w-4 h-4 text-brand-400" />
          Test LLM Router
        </h2>
        <div className="flex gap-4">
          <div className="flex-1 border border-surface-700 bg-surface-950 rounded-lg flex items-center px-3 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition-all">
            <Search className="w-4 h-4 text-surface-500 mr-2" />
            <input 
              type="text" 
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRouteTask()}
              placeholder="Enter task description (e.g. 'Refactor auth.ts' or 'Plan architecture')" 
              className="bg-transparent border-none text-sm text-surface-100 placeholder-surface-500 w-full focus:outline-none focus:ring-0 py-2.5"
            />
          </div>
          <select 
            value={complexity} 
            onChange={(e) => setComplexity(e.target.value)}
            className="bg-surface-800 border border-surface-700 text-surface-200 text-sm rounded-lg px-3 focus:outline-none focus:border-brand-500"
          >
            <option value="auto">Auto-detect Complexity</option>
            <option value="low">Low (Fast/Cheap)</option>
            <option value="medium">Medium (Coding/Logic)</option>
            <option value="high">High (Deep Reasoning)</option>
            <option value="multimodal">Multimodal (Vision/Audio)</option>
          </select>
          <button 
            onClick={handleRouteTask}
            disabled={isRouting || !taskInput.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {isRouting ? (
              <Activity className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Route Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <h2 className="text-sm font-mono text-surface-500 tracking-wider px-1">ACTIVE CLUSTERS</h2>
          
          <ClusterCard 
            name="Google Edge" 
            models={["Gemini 2.5 Pro", "Gemini Flash"]} 
            latency="140ms" 
            status="optimal" 
          />
          <ClusterCard 
            name="Anthropic Secure" 
            models={["Claude 3.5 Sonnet", "Claude 3.5 Opus"]} 
            latency="210ms" 
            status="optimal" 
          />
          <ClusterCard 
            name="OpenAI Provisioned" 
            models={["GPT-5", "GPT-4.1", "Codex"]} 
            latency="380ms" 
            status="degraded" 
          />
          <ClusterCard 
            name="Local Llama / Mistral" 
            models={["Llama 3 70B", "Mistral Large"]} 
            latency="45ms" 
            status="optimal" 
          />
        </div>

        <div className="md:col-span-2">
          <div className="bg-surface-900 border border-surface-800 rounded-xl h-full flex flex-col overflow-hidden relative">
            <div className="p-5 border-b border-surface-800 bg-surface-900/50 flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <GitMerge className="w-5 h-5 text-brand-400" />
                 <h2 className="font-medium text-surface-100">Live Traffic Routing</h2>
               </div>
               <div className="flex gap-2">
                 <span className="flex items-center gap-1.5 text-xs font-mono text-surface-400 px-2 py-1 rounded bg-surface-800"><Activity className="w-3.5 h-3.5 text-green-400"/> 12.4k TPS</span>
               </div>
            </div>
            
            <div className="flex-1 p-5 overflow-auto space-y-2 bg-black/20 max-h-[500px]">
               {logs.map(log => (
                 <LogLine 
                    key={log.id}
                    time={log.time} 
                    source={log.source} 
                    req={log.req} 
                    route={log.route} 
                    reason={log.reason} 
                    cost={log.cost} 
                 />
               ))}
               <div className="pt-4 flex items-center gap-2 text-surface-500 font-mono text-xs">
                 <span className="w-1.5 h-1.5 bg-surface-500 rounded-full animate-pulse"></span> waiting for trace data
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClusterCard({ name, models, latency, status }: { name: string, models: string[], latency: string, status: string }) {
  return (
    <div className="bg-surface-900 border border-surface-800 rounded-xl p-4 hover:border-surface-700 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-surface-200">{name}</h3>
        {status === 'optimal' ? (
          <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
        ) : (
          <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse"></span>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {models.map(m => <span key={m} className="px-2 py-0.5 text-[10px] uppercase font-mono bg-surface-800 text-surface-400 rounded-sm border border-surface-700">{m}</span>)}
      </div>
      <div className="flex justify-between items-center text-xs font-mono border-t border-surface-800 pt-3">
        <span className="text-surface-500">Latency P95</span>
        <span className={status === 'optimal' ? 'text-green-400' : 'text-orange-400'}>{latency}</span>
      </div>
    </div>
  );
}

function LogLine({ time, source, req, route, reason, cost }: { time: string, source: string, req: string, route: string, reason: string, cost: string }) {
  return (
    <div className="font-mono text-xs hover:bg-surface-800/40 p-2 rounded flex gap-4 transition-colors">
      <div className="text-surface-500 w-20 shrink-0">{time}</div>
      <div className="text-purple-400 w-20 shrink-0">{source}</div>
      <div className="flex-1 text-surface-300 truncate">{req}</div>
      <div className="w-40 text-brand-400 shrink-0 truncate flex items-center gap-1.5"><Zap className="w-3 h-3"/>{route}</div>
    </div>
  );
}
