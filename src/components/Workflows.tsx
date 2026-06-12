import { Workflow, PlayCircle, Clock, AlertTriangle, CheckCircle2, GitCommit } from "lucide-react";

const ACTIVE_WORKFLOWS = [
  { id: "P-HR-092", name: "Employee Onboarding Sequence", type: "BPMN", status: "running", progress: 65, step: "Waiting for IT Provisioning (RPA)" },
  { id: "P-FIN-441", name: "Q3 Earnings Report Generation", type: "Maestro Case", status: "human_approval", progress: 85, step: "CFO Final Review" },
  { id: "P-SEC-008", name: "Anomaly Investigation", type: "Agentic", status: "running", progress: 30, step: "Analyzing Network Logs (Claude)" },
  { id: "P-DEV-212", name: "PR-402 Validation Pipeline", type: "Test Auto", status: "failed", progress: 95, step: "E2E UI Tests (UiPath Test Cloud)" },
];

export function Workflows() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Enterprise Workflows</h1>
          <p className="text-surface-400 mt-1 text-sm">Active Maestro cases, BPMN processes, and automated pipelines.</p>
        </div>
        <div className="flex gap-3 text-sm">
          <button className="px-4 py-2 border border-surface-700 hover:bg-surface-800 text-surface-200 transition-colors rounded-md">View History</button>
          <button className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-medium rounded-md transition-colors">New Instance</button>
        </div>
      </div>

      <div className="bg-surface-900 border border-surface-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-800 bg-surface-900/50">
              <th className="px-6 py-4 text-xs font-mono text-surface-400 tracking-wider">PROCESS_ID</th>
              <th className="px-6 py-4 text-xs font-mono text-surface-400 tracking-wider">NAME</th>
              <th className="px-6 py-4 text-xs font-mono text-surface-400 tracking-wider">TYPE</th>
              <th className="px-6 py-4 text-xs font-mono text-surface-400 tracking-wider">STATUS</th>
              <th className="px-6 py-4 text-xs font-mono text-surface-400 tracking-wider w-1/3">CURRENT_STEP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-800/50">
            {ACTIVE_WORKFLOWS.map((wf) => (
              <tr key={wf.id} className="hover:bg-surface-800/20 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-surface-500 group-hover:text-brand-400 transition-colors" />
                    <span className="font-mono text-sm text-surface-300">{wf.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-surface-100">{wf.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 rounded text-xs bg-surface-800 text-surface-300 border border-surface-700">{wf.type}</span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={wf.status} progress={wf.progress} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-surface-400">
                    <GitCommit className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{wf.step}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          <div className="border border-surface-800 rounded-xl p-5 bg-surface-900/50 relative overflow-hidden flex flex-col justify-center items-center h-64 text-center">
             <div className="absolute inset-0 pattern-dots text-surface-800 opacity-20 pointer-events-none"></div>
             <Workflow className="w-12 h-12 text-surface-700 mb-4" />
             <h3 className="text-surface-300 font-medium mb-2">BPMN Editor</h3>
             <p className="text-sm text-surface-500 max-w-sm mb-4">Visual designer for workflow orchestration. Select a process from the table to load its graph representation.</p>
             <button className="px-4 py-2 border border-surface-700 text-surface-300 text-sm hover:text-white hover:bg-surface-800 rounded transition-colors">Open Canvas (Read-only)</button>
          </div>

          <div className="border border-surface-800 rounded-xl p-5 bg-surface-900/50 flex flex-col justify-center items-center h-64 text-center">
             <PlayCircle className="w-12 h-12 text-surface-700 mb-4" />
             <h3 className="text-surface-300 font-medium mb-2">UiPath Maestro</h3>
             <p className="text-sm text-surface-500 max-w-sm mb-4">Enterprise RPA connection active. 42 bots standing by across 3 tenant nodes.</p>
             <button className="px-4 py-2 border border-surface-700 text-surface-300 text-sm hover:text-white hover:bg-surface-800 rounded transition-colors">Manage Robots</button>
          </div>
      </div>
    </div>
  );
}

function StatusBadge({ status, progress }: { status: string, progress: number }) {
  if (status === 'running') {
    return (
      <div className="flex items-center gap-2 w-full max-w-[140px]">
        <div className="text-xs font-medium text-brand-400 flex items-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
          {progress}%
        </div>
        <div className="h-1.5 flex-1 bg-surface-800 rounded-full overflow-hidden">
          <div className="h-full bg-brand-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  }
  
  if (status === 'human_approval') {
    return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20"><Clock className="w-3 h-3" /> APPROVAL REQ</span>;
  }

  if (status === 'failed') {
    return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20"><AlertTriangle className="w-3 h-3" /> FAILED</span>;
  }
  
  if (status === 'completed') {
    return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20"><CheckCircle2 className="w-3 h-3" /> COMPLETED</span>;
  }

  return <span className="text-xs">{status}</span>;
}
