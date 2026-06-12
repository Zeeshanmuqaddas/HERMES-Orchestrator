import { useState } from "react";
import { Search, Filter, Terminal, ShieldAlert, FileJson, Download, ShieldCheck, User, Zap, Lock, Eye } from "lucide-react";

interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  type: "AI_ACTION" | "HUMAN_INTERVENTION" | "GOVERNANCE_DECISION" | "SECURITY_ALERT";
  action: string;
  resource: string;
  status: "SUCCESS" | "FAILED" | "BLOCKED" | "PENDING_APPROVAL";
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  details: string;
}

const AUDIT_LOGS: AuditEvent[] = [
  {
    id: "AUD-8930",
    timestamp: "2026-06-12T00:41:22Z",
    actor: "Human: zmuqaddas45@gmail.com",
    type: "HUMAN_INTERVENTION",
    action: "Override Escalation Threshold",
    resource: "/config/governance/thresholds",
    status: "SUCCESS",
    riskLevel: "CRITICAL",
    details: "Administrator approved execution of destructive action (Resource Termination)."
  },
  {
    id: "AUD-8929",
    timestamp: "2026-06-12T00:39:15Z",
    actor: "Agent: Security Automation",
    type: "GOVERNANCE_DECISION",
    action: "Enforce Policy: SOC2",
    resource: "Workflow: P-HR-092",
    status: "SUCCESS",
    riskLevel: "LOW",
    details: "Workflow evaluated against SOC2 requirements. All checks passed."
  },
  {
    id: "AUD-8928",
    timestamp: "2026-06-12T00:38:05Z",
    actor: "Agent: Response Automation",
    type: "AI_ACTION",
    action: "Scale Infrastructure",
    resource: "Deployment: API Gateway",
    status: "SUCCESS",
    riskLevel: "MEDIUM",
    details: "Scaled replica count from 3 to 5 due to traffic anomaly."
  },
  {
    id: "AUD-8927",
    timestamp: "2026-06-12T00:35:10Z",
    actor: "Model: GPT-4",
    type: "GOVERNANCE_DECISION",
    action: "Confidence Evaluation (52%)",
    resource: "Task: Financial Reporting",
    status: "BLOCKED",
    riskLevel: "HIGH",
    details: "Confidence score below 80% threshold. Automated execution blocked. Route to Human Review."
  },
  {
    id: "AUD-8926",
    timestamp: "2026-06-12T00:32:44Z",
    actor: "Agent: Threat Detection",
    type: "SECURITY_ALERT",
    action: "Quarantine Suspicious IP",
    resource: "Firewall Rule: block-1092",
    status: "SUCCESS",
    riskLevel: "CRITICAL",
    details: "Detected anomalous login spikes from block 1092. IP quarantined."
  },
  {
    id: "AUD-8925",
    timestamp: "2026-06-12T00:30:12Z",
    actor: "Agent: Data Pipeline",
    type: "AI_ACTION",
    action: "Sync Daily Telemetry",
    resource: "Database: BigQuery Data Warehouse",
    status: "SUCCESS",
    riskLevel: "LOW",
    details: "Transferred 1.2M records successfully."
  },
  {
    id: "AUD-8924",
    timestamp: "2026-06-12T00:28:00Z",
    actor: "Model: Claude",
    type: "GOVERNANCE_DECISION",
    action: "Compliance Review",
    resource: "Codebase: src/auth",
    status: "FAILED",
    riskLevel: "HIGH",
    details: "HIPAA violation detected in data storage pattern. Rejected PR."
  }
];

export function AuditLog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");

  const filteredLogs = AUDIT_LOGS.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "ALL" || log.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'AI_ACTION': return <Zap className="w-4 h-4 text-brand-400" />;
      case 'HUMAN_INTERVENTION': return <User className="w-4 h-4 text-purple-400" />;
      case 'GOVERNANCE_DECISION': return <ShieldCheck className="w-4 h-4 text-green-400" />;
      case 'SECURITY_ALERT': return <ShieldAlert className="w-4 h-4 text-red-400" />;
      default: return <Terminal className="w-4 h-4 text-surface-400" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'CRITICAL': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'HIGH': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'MEDIUM': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'LOW': return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: return 'bg-surface-800 text-surface-300 border-surface-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Audit Log</h1>
          <p className="text-surface-400 mt-1 text-sm">Immutable record of AI operations, human decisions, and governance actions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border border-surface-700 bg-surface-800 hover:bg-surface-700 text-surface-200 rounded-lg transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-surface-900 border border-surface-800 rounded-xl overflow-hidden flex flex-col h-[calc(100vh-140px)]">
        <div className="p-4 border-b border-surface-800 bg-surface-950/30 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-surface-950 border border-surface-800 rounded-lg px-3 py-2 min-w-[300px]">
            <Search className="w-4 h-4 text-surface-500" />
            <input 
              type="text" 
              placeholder="Search actors, actions, or resources..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-surface-100 flex-1 placeholder:text-surface-600"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-surface-500" />
            <select 
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="bg-surface-950 border border-surface-800 rounded-lg text-sm text-surface-200 px-3 py-2 outline-none focus:border-brand-500"
            >
              <option value="ALL">All Event Types</option>
              <option value="AI_ACTION">AI Actions</option>
              <option value="HUMAN_INTERVENTION">Human Interventions</option>
              <option value="GOVERNANCE_DECISION">Governance Decisions</option>
              <option value="SECURITY_ALERT">Security Alerts</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-800 bg-surface-950/20">
                <th className="px-6 py-4 text-xs font-medium text-surface-400 tracking-wider">TIMESTAMP</th>
                <th className="px-6 py-4 text-xs font-medium text-surface-400 tracking-wider">EVENT</th>
                <th className="px-6 py-4 text-xs font-medium text-surface-400 tracking-wider">ACTOR</th>
                <th className="px-6 py-4 text-xs font-medium text-surface-400 tracking-wider">RESOURCE</th>
                <th className="px-6 py-4 text-xs font-medium text-surface-400 tracking-wider">RISK</th>
                <th className="px-6 py-4 text-xs font-medium text-surface-400 tracking-wider">DETAILS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-800/50">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-800/20 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-surface-400">{new Date(log.timestamp).toLocaleString()}</div>
                    <div className="text-[10px] font-mono text-surface-600 mt-0.5">{log.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(log.type)}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-surface-200">{log.action}</span>
                        <span className="text-[10px] font-mono text-surface-500">{log.type}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-surface-300">{log.actor}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-surface-300 font-mono text-xs block truncate max-w-[200px]" title={log.resource}>{log.resource}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded border text-xs font-mono ${getRiskColor(log.riskLevel)}`}>
                      {log.riskLevel}
                    </span>
                    {log.status === "BLOCKED" && (
                      <span className="ml-2 px-2 py-0.5 rounded border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-mono">
                        BLOCKED
                      </span>
                    )}
                    {log.status === "FAILED" && (
                      <span className="ml-2 px-2 py-0.5 rounded border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-mono">
                        FAILED
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-sm text-surface-400 line-clamp-2 max-w-xs">{log.details}</span>
                  </td>
                </tr>
              ))}
              
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-surface-500 text-sm">
                    No audit records match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-3 border-t border-surface-800 bg-surface-950/30 flex justify-between items-center text-xs text-surface-500 font-mono">
           <span>Showing {filteredLogs.length} of {AUDIT_LOGS.length} records</span>
           <span>Immutable storage verified. Compliance level: SOC2, GDPR, HIPAA.</span>
        </div>
      </div>
    </div>
  );
}
