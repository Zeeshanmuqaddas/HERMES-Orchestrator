import { ArrowLeft, Clock, CheckCircle2, AlertTriangle, GitCommit, Download, Workflow as WorkflowIcon, FileJson, FileText } from "lucide-react";

interface WorkflowDetailViewProps {
  workflow: any;
  onBack: () => void;
}

export function WorkflowDetailView({ workflow, onBack }: WorkflowDetailViewProps) {
  const handleDownload = (format: "json" | "pdf") => {
    if (format === "json") {
      const data = {
        workflowId: workflow.id,
        name: workflow.name,
        type: workflow.type,
        status: workflow.status,
        progress: workflow.progress,
        generatedAt: new Date().toISOString(),
        compliance: ["SOC2", "GDPR"],
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `workflow-report-${workflow.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // For PDF simulation in this demo, download a summary txt file
      const text = `WORKFLOW EXECUTION REPORT\n\nID: ${workflow.id}\nName: ${workflow.name}\nStatus: ${workflow.status}\nProgress: ${workflow.progress}%\n\nCOMPLIANCE: SOC2, GDPR\n`;
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `workflow-report-${workflow.id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 bg-surface-900 border border-surface-800 rounded-lg text-surface-400 hover:text-white hover:border-surface-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3">
              {workflow.name}
              <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-surface-900/50 border-surface-800 text-surface-400 uppercase font-mono">
                {workflow.id}
              </span>
            </h1>
            <p className="text-surface-400 mt-1 text-sm flex items-center gap-2">
              <WorkflowIcon className="w-4 h-4 text-brand-400" />
              {workflow.type} Workflow — Started 2 hours ago
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 relative group">
          <button className="flex items-center gap-2 px-4 py-2 border border-brand-500/30 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 rounded-lg transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Download Report
          </button>
          <div className="absolute top-12 right-0 w-48 bg-surface-900 border border-surface-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col p-1 z-10">
             <button className="flex items-center gap-2 px-3 py-2 text-sm text-surface-300 hover:text-white hover:bg-surface-800 rounded-md transition-colors text-left" onClick={() => handleDownload('json')}>
               <FileJson className="w-4 h-4 text-blue-400" /> JSON (Machine-readable)
             </button>
             <button className="flex items-center gap-2 px-3 py-2 text-sm text-surface-300 hover:text-white hover:bg-surface-800 rounded-md transition-colors text-left" onClick={() => handleDownload('pdf')}>
               <FileText className="w-4 h-4 text-red-400" /> PDF (Audit Summary)
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-900 border border-surface-800 rounded-xl p-5 md:col-span-2">
          <h2 className="text-sm font-medium text-surface-100 uppercase tracking-wider font-mono mb-4">Execution Status Details</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-3xl font-semibold text-white">{workflow.progress}%</div>
            <div className="flex-1 h-2 bg-surface-800 rounded-full overflow-hidden">
               <div className="h-full bg-brand-500" style={{ width: `${workflow.progress}%` }}></div>
            </div>
            <div className="text-sm font-medium text-surface-400 capitalize">{workflow.status.replace('_', ' ')}</div>
          </div>
          
          <div className="space-y-4">
            {[...Array({
              running: 3, human_approval: 4, failed: 5
            }[workflow.status as string] || 3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                 <div className="flex flex-col items-center">
                   <div className="w-6 h-6 rounded-full bg-surface-800 border border-surface-700 flex items-center justify-center shrink-0">
                     {i === 0 || i === 1 ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Clock className="w-3.5 h-3.5 text-surface-400" />}
                   </div>
                   {i !== 2 && <div className="w-px h-full bg-surface-800 my-1"></div>}
                 </div>
                 <div className="pb-4">
                   <p className="text-sm font-medium text-surface-200">
                     {i === 0 ? "Workflow Initialized" : i === 1 ? "Pre-flight checks passed" : workflow.step}
                   </p>
                   <p className="text-xs text-surface-500 mt-1">
                     {i === 0 ? "Orchestrator provisioned context" : i === 1 ? "Validating input parameters" : "Currently executing step"}
                   </p>
                 </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-surface-900 border border-surface-800 rounded-xl p-5">
           <h2 className="text-sm font-medium text-surface-100 uppercase tracking-wider font-mono mb-4">Context & Metadata</h2>
           <div className="space-y-4">
             <div>
               <div className="text-xs text-surface-500 mb-1">Initiator</div>
               <div className="text-sm font-medium text-surface-300">System Orchestrator</div>
             </div>
             <div>
               <div className="text-xs text-surface-500 mb-1">Execution Node</div>
               <div className="text-sm font-mono text-purple-400">node-us-east-4a</div>
             </div>
             <div>
               <div className="text-xs text-surface-500 mb-1">Compliance Policy</div>
               <div className="flex gap-2 mt-1">
                 <span className="px-2 py-0.5 rounded text-[10px] bg-surface-800 text-surface-300 border border-surface-700">SOC2</span>
                 <span className="px-2 py-0.5 rounded text-[10px] bg-surface-800 text-surface-300 border border-surface-700">GDPR</span>
               </div>
             </div>
             <div>
               <div className="text-xs text-surface-500 mb-1">Primary Agents</div>
               <div className="text-sm font-medium text-brand-400">CEO Orchestrator, Claude Coder</div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
