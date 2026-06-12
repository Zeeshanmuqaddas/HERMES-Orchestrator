import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, AlertTriangle, CheckCircle2, Clock, Terminal, Zap, PauseCircle, PlayCircle } from "lucide-react";
import { useState } from "react";
import { SystemTelemetry } from "./SystemTelemetry";

const performanceData = [
  { time: "00:00", requests: 120, automated: 110 },
  { time: "04:00", requests: 80, automated: 75 },
  { time: "08:00", requests: 450, automated: 380 },
  { time: "12:00", requests: 560, automated: 490 },
  { time: "16:00", requests: 390, automated: 340 },
  { time: "20:00", requests: 190, automated: 175 },
  { time: "24:00", requests: 90, automated: 85 },
];

const topAgents = [
  { id: "AGT-001", name: "CEO Orchestrator", task: "Monitoring Global KPIs" },
  { id: "AGT-002", name: "Customer Support Intel", task: "Processing CAS-8992" },
  { id: "AGT-007", name: "Fraud & Security", task: "Scanning transaction logs" },
];

export function Dashboard() {
  const [agentsPaused, setAgentsPaused] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">AI Control Plane</h1>
        <p className="text-surface-400 mt-1 text-sm">System overview and enterprise automation metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Agents", value: agentsPaused ? "0/40" : "34/40", icon: Terminal, color: "text-brand-400" },
          { label: "Global Automation Rate", value: "84.2%", icon: Zap, color: "text-yellow-400", trend: "+2.4% today" },
          { label: "BPMN Workflows (Live)", value: agentsPaused ? "0" : "1,204", icon: Activity, color: "text-green-400" },
          { label: "Pending Approvals", value: "12", icon: Clock, color: "text-orange-400", alert: true },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-surface-900 border border-surface-800 rounded-xl p-5 flex flex-col relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-surface-800 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {stat.alert && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                )}
              </div>
              <div className="text-2xl font-semibold text-surface-50">{stat.value}</div>
              <div className="flex justify-between items-end mt-1">
                <div className="text-sm font-medium text-surface-400">{stat.label}</div>
                {stat.trend && <div className="text-xs text-green-400">{stat.trend}</div>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <div className="bg-surface-900 border border-surface-800 rounded-xl p-5 border-t-2 border-t-brand-500 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-lg font-medium text-surface-100">Automation Volume vs Fallback</h2>
               <div className="flex gap-4 text-xs font-mono">
                 <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-brand-500 rounded-sm"></div>Automated</div>
                 <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-surface-700 rounded-sm"></div>Total Requests</div>
               </div>
            </div>
            <div className="h-[280px] w-full mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="automatedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '8px' }}
                    itemStyle={{ color: '#e0e7ff' }}
                  />
                  <Area type="monotone" dataKey="requests" stroke="#334155" fill="none" strokeWidth={2} />
                  <Area type="monotone" dataKey="automated" stroke="#6366f1" fillOpacity={1} fill="url(#automatedGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <SystemTelemetry />
        </div>

        <div className="flex flex-col gap-6">
          {/* Quick Actions Widget */}
          <div className="bg-surface-900 border border-surface-800 rounded-xl p-5 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-medium text-surface-100 uppercase tracking-wider font-mono">Quick Actions</h2>
              <button 
                onClick={() => setAgentsPaused(!agentsPaused)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  agentsPaused 
                  ? "bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20" 
                  : "bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
                }`}
              >
                {agentsPaused ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
                {agentsPaused ? "RESUME ALL FLOWS" : "EMERGENCY PAUSE ALL"}
              </button>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xs font-mono text-surface-500 mb-2">TOP ACTIVE AGENTS</h3>
              {topAgents.map((agent) => (
                <div key={agent.id} className="flex flex-col p-2.5 bg-surface-800/30 rounded border border-surface-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-surface-200">{agent.name}</span>
                    <span className="flex items-center gap-1.5 text-xs">
                      {agentsPaused ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-surface-500"></span>
                          <span className="text-surface-500 font-mono">PAUSED</span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                          <span className="text-green-400 font-mono">ACTIVE</span>
                        </>
                      )}
                    </span>
                  </div>
                  <span className="text-xs text-surface-400 truncate">{agentsPaused ? "Standing by..." : agent.task}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-900 border border-surface-800 rounded-xl p-5 flex flex-col flex-1">
            <h2 className="text-sm font-medium text-surface-100 uppercase tracking-wider font-mono mb-4">Urgent Operations</h2>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {[
                { id: "CAS-8921", title: "Compliance Review Required", type: "GDP Validation", level: "critical" },
                { id: "DEP-449", title: "Production Deployment", type: "Human Approval", level: "warning" },
                { id: "SEC-102", title: "Anomalous Login Attempt", type: "Fraud Agent Alert", level: "critical" },
                { id: "RPA-77", title: "ERP Connector Offline", type: "UiPath Bot Failed", level: "warning" },
              ].map((op, i) => (
                <div key={i} className="p-3 bg-surface-800/50 rounded-lg border border-surface-700 hover:border-surface-600 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-mono text-surface-400 group-hover:text-surface-300">{op.id}</span>
                    {op.level === 'critical' ? (
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-orange-400" />
                    )}
                  </div>
                  <div className="text-sm font-medium text-surface-200">{op.title}</div>
                  <div className="text-xs text-surface-500 mt-2">{op.type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
