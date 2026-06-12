import { GitMerge, Cpu, Search, Activity, Zap } from "lucide-react";

export function LLMRouter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">Multi-LLM Orchestration</h1>
        <p className="text-surface-400 mt-1 text-sm">Dynamic request routing across Gemini, Claude, and OpenAI clusters.</p>
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
            
            <div className="flex-1 p-5 overflow-auto space-y-2 bg-black/20">
               {/* Simulated terminal logic */}
               <LogLine time="14:02:11" source="CEO_AGT" req="Complex reasoning task" route="GPT-5" reason="Highest contextual confidence required" cost="$0.04" />
               <LogLine time="14:02:12" source="SUP_AGT" req="Ticket #991 classification" route="Gemini Flash" reason="Fast sequence alignment, low complexity" cost="$0.001" />
               <LogLine time="14:02:14" source="RPA_BOT" req="OCR extraction fallback" route="Gemini 2.5 Pro" reason="Multimodal ingestion required" cost="$0.012" />
               <LogLine time="14:02:15" source="COD_AGT" req="Refactor util/auth.ts" route="Claude 3.5 Sonnet" reason="Coding baseline policy match" cost="$0.02" />
               <LogLine time="14:02:18" source="CEO_AGT" req="Workflow Consensus Evaluation" route="MULTI-MODEL [GPT-5, Sonnet, Opus]" reason="High-risk action approval" cost="$0.14" />
               <div className="h-4 pl-2 border-l border-surface-800 ml-[88px] relative">
                  <div className="absolute top-1/2 left-0 w-2 border-t border-surface-800"></div>
                  <span className="text-xs font-mono text-brand-400 text-opacity-80 absolute top-1/2 -translate-y-1/2 left-4">Consensus engine active... resolved in 1240ms</span>
               </div>
               <LogLine time="14:02:22" source="DOC_AGT" req="Semantic search query" route="Mistral Large" reason="Local privacy override" cost="$0.00" />
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
