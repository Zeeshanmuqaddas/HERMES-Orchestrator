import { Agent } from "../types";
import { ArrowLeft, Clock, CheckCircle2, AlertTriangle, Activity, Cpu, HardDrive, ShieldCheck, Terminal, Server, Code2 } from "lucide-react";

interface AgentDetailViewProps {
  agent: Agent;
  onBack: () => void;
}

function getMockLogs(agentId: string) {
  return [
    { id: "LOG-891", time: "14:28:10", task: "Processed routine request payload", model: "Gemini Flash", status: "success", duration: "112ms" },
    { id: "LOG-890", time: "14:25:44", task: "Validation & verification gate", model: "Claude 3.5 Sonnet", status: "success", duration: "840ms" },
    { id: "LOG-889", time: "14:15:00", task: "Complex reasoning scenario analysis", model: "GPT-4.1 + Claude Opus", status: "success", duration: "2.1s" },
    { id: "LOG-888", time: "13:58:12", task: "Fallback to secondary model execution", model: "GPT-5", status: "warning", duration: "3.5s" },
    { id: "LOG-887", time: "13:40:05", task: "Standard workflow execution", model: "Mistral Large", status: "success", duration: "105ms" },
    { id: "LOG-886", time: "13:30:11", task: "Security audit trail generation", model: "Gemini 2.5 Pro", status: "success", duration: "190ms" },
    { id: "LOG-885", time: "13:10:00", task: "Database connection resolution", model: "Llama Enterprise", status: "error", duration: "5.0s" },
  ];
}

export function AgentDetailView({ agent, onBack }: AgentDetailViewProps) {
  const logs = getMockLogs(agent.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 bg-surface-900 border border-surface-800 rounded-lg text-surface-400 hover:text-white hover:border-surface-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3">
            {agent.name}
            <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-surface-900/50 border-surface-800 text-surface-400 uppercase font-mono">
              {agent.id}
            </span>
          </h1>
          <p className="text-surface-400 mt-1 text-sm">{agent.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface-900 border border-surface-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-surface-400 mb-2">
            <Cpu className="w-4 h-4" />
            <span className="text-xs font-medium uppercase font-mono tracking-wider">Compute</span>
          </div>
          <div className="text-2xl font-semibold text-surface-100">{agent.cpu}%</div>
          <div className="w-full bg-surface-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className={`h-full ${agent.cpu > 80 ? 'bg-orange-500' : 'bg-brand-500'}`} style={{ width: `${agent.cpu}%` }}></div>
          </div>
        </div>
        <div className="bg-surface-900 border border-surface-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-surface-400 mb-2">
            <HardDrive className="w-4 h-4" />
            <span className="text-xs font-medium uppercase font-mono tracking-wider">Memory</span>
          </div>
          <div className="text-2xl font-semibold text-surface-100">{agent.memory}%</div>
          <div className="w-full bg-surface-800 h-1.5 rounded-full mt-3 overflow-hidden">
             <div className={`h-full ${agent.memory > 80 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${agent.memory}%` }}></div>
          </div>
        </div>
        <div className="bg-surface-900 border border-surface-800 rounded-xl p-4">
           <div className="flex items-center gap-2 text-surface-400 mb-2">
            <Activity className="w-4 h-4" />
            <span className="text-xs font-medium uppercase font-mono tracking-wider">Latency</span>
          </div>
          <div className="text-2xl font-semibold text-surface-100">{agent.latency}ms</div>
        </div>
        <div className="bg-surface-900 border border-surface-800 rounded-xl p-4">
           <div className="flex items-center gap-2 text-surface-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-medium uppercase font-mono tracking-wider">Reliability</span>
          </div>
          <div className="text-2xl font-semibold text-surface-100">{agent.reliability}%</div>
        </div>
      </div>

      <div className="bg-surface-900 border border-surface-800 rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-surface-800 bg-surface-950/30 flex justify-between items-center">
          <h2 className="text-sm font-medium text-surface-100 uppercase tracking-wider font-mono">Execution History</h2>
          <div className="flex gap-2">
            <span className="px-2 py-1 text-[10px] font-mono text-brand-400 bg-brand-500/10 border border-brand-500/20 rounded">LIVE STREAM</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-800 bg-surface-950/20">
                <th className="p-4 text-xs font-medium text-surface-400 font-mono tracking-wider">TIME</th>
                <th className="p-4 text-xs font-medium text-surface-400 font-mono tracking-wider">TASK</th>
                <th className="p-4 text-xs font-medium text-surface-400 font-mono tracking-wider">LLM MODEL</th>
                <th className="p-4 text-xs font-medium text-surface-400 font-mono tracking-wider">DURATION</th>
                <th className="p-4 text-xs font-medium text-surface-400 font-mono tracking-wider">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-800/50">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-800/20 transition-colors group">
                  <td className="p-4 text-sm font-mono text-surface-500 whitespace-nowrap">{log.time}</td>
                  <td className="p-4 text-sm text-surface-200">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-surface-600 group-hover:text-surface-400 transition-colors" />
                      {log.task}
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-800 border border-surface-700 text-xs font-medium text-surface-300">
                      <Server className="w-3 h-3 text-brand-400" />
                      {log.model}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-mono text-surface-400">{log.duration}</td>
                  <td className="p-4">
                    {log.status === 'success' && <span className="flex items-center gap-1.5 text-xs font-medium text-green-400"><CheckCircle2 className="w-4 h-4" /> Success</span>}
                    {log.status === 'warning' && <span className="flex items-center gap-1.5 text-xs font-medium text-orange-400"><AlertTriangle className="w-4 h-4" /> Slower than usual</span>}
                    {log.status === 'error' && <span className="flex items-center gap-1.5 text-xs font-medium text-red-400"><AlertTriangle className="w-4 h-4" /> Failed</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
