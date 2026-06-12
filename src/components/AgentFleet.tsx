import { useState } from "react";
import { Agent } from "../types";
import { Activity, Cpu, HardDrive, Terminal, ShieldCheck } from "lucide-react";
import { AgentDetailView } from "./AgentDetailView";

const OAGENTS: Agent[] = [
  { id: "AGT-001", name: "CEO Orchestrator", role: "Global workflow & multi-agent coordination", status: "active", currentTask: "Monitoring Global KPIs", cpu: 45, memory: 62, latency: 124, reliability: 99.9 },
  { id: "AGT-002", name: "Customer Support Intel", role: "Ticket classification & resolution", status: "active", currentTask: "Processing CAS-8992", cpu: 82, memory: 40, latency: 412, reliability: 97.4 },
  { id: "AGT-003", name: "Compliance & Gov", role: "GDPR/ISO policy evaluation", status: "active", currentTask: "Running SOC2 assessment", cpu: 23, memory: 88, latency: 205, reliability: 99.5 },
  { id: "AGT-004", name: "Enterprise ML", role: "Predictive analytics & forecasting", status: "provisioning", currentTask: "Loading model weights...", cpu: 99, memory: 95, latency: 1300, reliability: 94.2 },
  { id: "AGT-005", name: "RPA Maestro", role: "UiPath bot execution", status: "idle", currentTask: null, cpu: 2, memory: 15, latency: 45, reliability: 100 },
  { id: "AGT-006", name: "Claude Coder", role: "Architecture design & backend", status: "active", currentTask: "Refactoring Auth module", cpu: 56, memory: 70, latency: 310, reliability: 99.1 },
  { id: "AGT-007", name: "Fraud & Security", role: "Threat detection & monitoring", status: "active", currentTask: "Scanning transaction logs", cpu: 67, memory: 50, latency: 85, reliability: 99.9 },
  { id: "AGT-008", name: "Knowledge Retrieval", role: "Vector DB & Graph access", status: "error", currentTask: "Connection timeout to SharePoint", cpu: 0, memory: 18, latency: 5000, reliability: 82.5 },
];

export function AgentFleet() {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const selectedAgent = selectedAgentId 
    ? OAGENTS.find(a => a.id === selectedAgentId) 
    : null;

  if (selectedAgent) {
    return <AgentDetailView agent={selectedAgent} onBack={() => setSelectedAgentId(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Agent Fleet</h1>
          <p className="text-surface-400 mt-1 text-sm">Real-time status of all autonomous system agents.</p>
        </div>
        <button className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-md transition-colors shadow-lg shadow-brand-500/20">
          Deploy New Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {OAGENTS.map(agent => (
          <div 
            key={agent.id} 
            onClick={() => setSelectedAgentId(agent.id)}
            className="bg-surface-900 border border-surface-800 rounded-xl p-5 hover:border-surface-600 transition-colors flex flex-col cursor-pointer hover:bg-surface-800/20 group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-800 flex items-center justify-center border border-surface-700 group-hover:border-brand-500/50 transition-colors">
                  <Terminal className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <div className="font-medium text-surface-100">{agent.name}</div>
                  <div className="text-xs text-surface-500 font-mono">{agent.id}</div>
                </div>
              </div>
              <AgentStatusBadge status={agent.status} />
            </div>
            
            <p className="text-sm text-surface-400 my-4 flex-1 line-clamp-2">
              {agent.role}
            </p>
            
            <div className="flex gap-2.5 mb-4">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-950 border border-surface-800 text-xs font-mono" title="Agent Network Latency">
                <Activity className="w-3.5 h-3.5 text-surface-500" />
                <span className={agent.latency > 1000 ? "text-red-400" : agent.latency > 400 ? "text-yellow-400" : "text-green-400"}>
                  {agent.latency}ms
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-950 border border-surface-800 text-xs font-mono" title="Agent Reliability Score">
                <ShieldCheck className="w-3.5 h-3.5 text-surface-500" />
                <span className={agent.reliability < 90 ? "text-red-400" : agent.reliability < 98 ? "text-yellow-400" : "text-green-400"}>
                  {agent.reliability}%
                </span>
              </div>
            </div>
            
            <div className="bg-surface-950 rounded-lg p-3 border border-surface-800/50 mb-4 h-16 flex flex-col justify-center">
              <div className="text-xs text-surface-500 mb-1 uppercase tracking-wider font-semibold">Current Task</div>
              <div className="text-sm font-medium text-surface-200 truncate">
                {agent.currentTask || "Standing by..."}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-surface-400 pt-4 border-t border-surface-800">
              <div className="flex items-center gap-1.5 flex-1">
                <Cpu className="w-3.5 h-3.5" />
                <div className="w-full bg-surface-800 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full ${agent.cpu > 80 ? 'bg-orange-500' : 'bg-brand-500'}`} style={{ width: `${agent.cpu}%` }}></div>
                </div>
                <span className="w-8 text-right">{agent.cpu}%</span>
              </div>
              <div className="flex items-center gap-1.5 flex-1">
                <HardDrive className="w-3.5 h-3.5" />
                <div className="w-full bg-surface-800 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full ${agent.memory > 80 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${agent.memory}%` }}></div>
                </div>
                <span className="w-8 text-right">{agent.memory}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentStatusBadge({ status }: { status: Agent["status"] }) {
  const styles = {
    active: "bg-green-500/10 text-green-400 border-green-500/20",
    idle: "bg-surface-500/10 text-surface-400 border-surface-500/20",
    error: "bg-red-500/10 text-red-400 border-red-500/20",
    provisioning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 animate-pulse",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]} flex items-center gap-1.5 uppercase font-mono`}>
      {status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
      {status}
    </span>
  );
}
