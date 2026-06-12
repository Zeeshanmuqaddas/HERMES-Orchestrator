import { useState } from "react";
import { ShieldAlert, Terminal, AlertTriangle, Crosshair, Network, Cpu, Database, Play, CheckCircle2, Clock, Target, Download, FileJson, FileText } from "lucide-react";

interface Incident {
  id: string;
  name: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "ACTIVE" | "INVESTIGATING" | "RESOLVED" | "CLOSED";
  startedAt: string;
  evidenceSources: string[];
}

const ACTIVE_INCIDENTS: Incident[] = [
  {
    id: "INC-2026-0042",
    name: "Anomalous Admin Login Spike",
    severity: "HIGH",
    status: "INVESTIGATING",
    startedAt: "15 minutes ago",
    evidenceSources: ["Cloud Audit Logs", "SIEM Logs"]
  },
  {
    id: "INC-2026-0041",
    name: "Possible Data Exfiltration via DNS",
    severity: "CRITICAL",
    status: "ACTIVE",
    startedAt: "2 hours ago",
    evidenceSources: ["Network Packet Captures"]
  }
];

export function IncidentResponse() {
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>(null);

  if (activeIncidentId) {
    return <InvestigationDashboard incidentId={activeIncidentId} onBack={() => setActiveIncidentId(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3">
            Incident Response
            <span className="px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs font-mono font-medium border border-red-500/20">
              AIR-OS ACTIVE
            </span>
          </h1>
          <p className="text-surface-400 mt-1 text-sm">Autonomous forensic investigation and evidence correlation.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-brand-500/30 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 rounded-lg transition-colors font-medium text-sm">
          <Play className="w-4 h-4" />
          Trigger New Investigation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
         <div className="bg-surface-900 border border-surface-800 rounded-xl p-4">
           <div className="flex items-center justify-between mb-2">
             <div className="text-surface-400 text-sm font-medium">Active Incidents</div>
             <ShieldAlert className="w-4 h-4 text-red-500" />
           </div>
           <div className="text-2xl font-semibold text-white">2</div>
         </div>
         <div className="bg-surface-900 border border-surface-800 rounded-xl p-4">
           <div className="flex items-center justify-between mb-2">
             <div className="text-surface-400 text-sm font-medium">Auto-Triage Rate</div>
             <Crosshair className="w-4 h-4 text-brand-400" />
           </div>
           <div className="text-2xl font-semibold text-white">94.2%</div>
         </div>
         <div className="bg-surface-900 border border-surface-800 rounded-xl p-4">
           <div className="flex items-center justify-between mb-2">
             <div className="text-surface-400 text-sm font-medium">MTTR (AI-Assisted)</div>
             <Clock className="w-4 h-4 text-green-400" />
           </div>
           <div className="text-2xl font-semibold text-white">14m</div>
         </div>
      </div>

      <div className="bg-surface-900 border border-surface-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-surface-800 bg-surface-950/30 flex justify-between items-center">
          <h2 className="text-sm font-medium text-surface-100 uppercase tracking-wider font-mono">Active Investigations</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-800 bg-surface-950/20">
              <th className="px-6 py-4 text-xs font-medium text-surface-400 tracking-wider">INCIDENT</th>
              <th className="px-6 py-4 text-xs font-medium text-surface-400 tracking-wider">SEVERITY</th>
              <th className="px-6 py-4 text-xs font-medium text-surface-400 tracking-wider">STATUS</th>
              <th className="px-6 py-4 text-xs font-medium text-surface-400 tracking-wider">DURATION</th>
              <th className="px-6 py-4 text-xs font-medium text-surface-400 tracking-wider">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-800/50">
            {ACTIVE_INCIDENTS.map((inc) => (
              <tr key={inc.id} className="hover:bg-surface-800/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-surface-200">{inc.name}</div>
                  <div className="text-[10px] font-mono text-surface-500 mt-1">{inc.id} | {inc.evidenceSources.join(", ")}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-mono font-medium ${
                    inc.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                    inc.severity === 'HIGH' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                    'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                  }`}>
                    {inc.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-surface-300">
                    {inc.status === 'ACTIVE' ? <AlertTriangle className="w-4 h-4 text-red-400" /> : <Terminal className="w-4 h-4 text-brand-400" />}
                    {inc.status}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-surface-400">{inc.startedAt}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => setActiveIncidentId(inc.id)}
                    className="px-3 py-1.5 bg-surface-800 hover:bg-surface-700 text-surface-200 text-sm font-medium rounded transition-colors"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InvestigationDashboard({ incidentId, onBack }: { incidentId: string, onBack: () => void }) {
  const handleGenerateReport = (format: "json" | "pdf") => {
    if (format === "json") {
      const data = {
        incidentId,
        status: "INVESTIGATING",
        confidence: 92,
        models: ["GPT-4.x"],
        findings: [
          {
            agent: "Memory Agent",
            timestamp: "10:42:01",
            details: "Process lsass.exe dumped. Suspicious injected thread found."
          },
          {
            agent: "Network Correlator",
            timestamp: "10:41:15",
            details: "Identified beaconing behavior to 198.51.100.42 over TLS."
          }
        ],
        mitreTtp: ["T1055", "T1003", "T1071"],
        generatedAt: new Date().toISOString(),
        complianceValdiation: "SOC2, GDPR"
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `incident-report-${incidentId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      const text = `INCIDENT EXECUTIVE SUMMARY\n==========================\n\nIncident ID: ${incidentId}\nConfidence: 92%\n\nFORENSIC FINDINGS:\n- [Memory] Suspicious lsass.exe injection.\n- [Network] TLS beaconing to 198.51.100.42.\n\nMITRE ATT&CK TARGETS:\n- T1055: Process Injection\n- T1003: OS Credential Dumping\n- T1071: Application Layer Protocol\n\nREPORT GENERATED: ${new Date().toISOString()}\n`;
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `incident-report-${incidentId}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 bg-surface-900 border border-surface-800 rounded-lg text-surface-400 hover:text-white hover:border-surface-600 transition-colors"
        >
          <span className="sr-only">Back</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3">
            Investigation Timeline
            <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-surface-900/50 border-surface-800 text-surface-400 uppercase font-mono">
              {incidentId}
            </span>
          </h1>
          <p className="text-surface-400 mt-1 text-sm">Real-time evidence correlation across specialized DFIR agents.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
           {/* Timeline Feed */}
           <div className="bg-surface-900 border border-surface-800 rounded-xl p-5">
              <h3 className="text-sm font-medium text-surface-200 mb-6 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-brand-400" />
                Live Agent Execution
              </h3>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-800 before:to-transparent">
                
                {/* Event 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-500 bg-brand-500/10 text-brand-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    <Database className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-surface-700 bg-surface-800/80 shadow-sm ml-4 md:ml-0 md:group-even:mr-0 md:group-odd:ml-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs font-bold font-mono text-brand-400 uppercase tracking-wider">Memory Agent</div>
                      <time className="font-mono text-[10px] text-surface-500">10:42:01</time>
                    </div>
                    <div className="text-sm font-medium text-surface-100">Volatility extraction complete</div>
                      <div className="text-xs text-surface-400 mt-2 font-mono bg-surface-950 p-2 rounded border border-surface-800">
                      &gt; Process `lsass.exe` dumped.<br/>
                      &gt; Suspicious injected thread found.<br/>
                      &gt; Confidence: 92%
                    </div>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-surface-700 bg-surface-800 text-surface-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <Network className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-surface-800 bg-surface-900 shadow-sm ml-4 md:ml-0 md:group-even:mr-0 md:group-odd:ml-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs font-bold font-mono text-purple-400 uppercase tracking-wider">Network Correlator</div>
                      <time className="font-mono text-[10px] text-surface-500">10:41:15</time>
                    </div>
                    <div className="text-sm font-medium text-surface-200">PCAP Analysis Finished</div>
                    <div className="text-xs text-surface-500 mt-1">Identified beaconing behavior to 198.51.100.42 over TLS.</div>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-surface-700 bg-surface-800 text-surface-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-surface-800 bg-surface-900 shadow-sm ml-4 md:ml-0 md:group-even:mr-0 md:group-odd:ml-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs font-bold font-mono text-blue-400 uppercase tracking-wider">HERMES CEO</div>
                      <time className="font-mono text-[10px] text-surface-500">10:40:05</time>
                    </div>
                    <div className="text-sm font-medium text-surface-200">Triage complete. Dispatched concurrent agents.</div>
                    <div className="text-xs text-surface-500 mt-1">Routed to Memory, Network, and Disk DFIR agents.</div>
                  </div>
                </div>

              </div>
           </div>

           {/* Threat Intelligence: MITRE ATT&CK Overlay */}
           <div className="bg-surface-900 border border-surface-800 rounded-xl p-5">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-surface-200 flex items-center gap-2">
                  <Target className="w-4 h-4 text-brand-400" />
                  Threat Intelligence: MITRE ATT&CK Mapping
                </h3>
                <span className="text-[10px] font-mono text-surface-500 bg-surface-950 px-2 py-1 rounded border border-surface-800">Dynamic Correlation Active</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* TTP Card 1 */}
                <div className="border border-surface-800 bg-surface-950/50 rounded-lg p-4 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>
                  <div className="text-[10px] font-mono text-red-400 mb-1">TA0004 • Privilege Escalation</div>
                  <div className="text-sm font-medium text-surface-100 mb-2">Process Injection (T1055)</div>
                  <div className="text-xs text-surface-400">lsass.exe memory anomaly detected by Volatility.</div>
                  <div className="mt-4 flex gap-1.5 flex-wrap">
                    <span className="px-1.5 py-0.5 bg-surface-800 text-surface-300 text-[10px] font-mono rounded">lsass.exe</span>
                    <span className="px-1.5 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase font-mono rounded">Confirmed</span>
                  </div>
                </div>

                {/* TTP Card 2 */}
                <div className="border border-surface-800 bg-surface-950/50 rounded-lg p-4 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-orange-500/50"></div>
                  <div className="text-[10px] font-mono text-orange-400 mb-1">TA0006 • Credential Access</div>
                  <div className="text-sm font-medium text-surface-100 mb-2">OS Credential Dumping (T1003)</div>
                  <div className="text-xs text-surface-400">Dumping of SAM databases or LSA secrets suspected based on timeline correlation.</div>
                  <div className="mt-4 flex gap-1.5 flex-wrap">
                    <span className="px-1.5 py-0.5 bg-surface-800 text-surface-300 text-[10px] font-mono rounded">Ntds.dit</span>
                    <span className="px-1.5 py-0.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] uppercase font-mono rounded">High Prob</span>
                  </div>
                </div>

                {/* TTP Card 3 */}
                <div className="border border-surface-800 bg-surface-950/50 rounded-lg p-4 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500/50"></div>
                  <div className="text-[10px] font-mono text-yellow-500 mb-1">TA0011 • Command and Control</div>
                  <div className="text-sm font-medium text-surface-100 mb-2">Application Layer Prot (T1071)</div>
                  <div className="text-xs text-surface-400">Beaconing over TLS (Port 443) identified in PCAP analysis.</div>
                  <div className="mt-4 flex gap-1.5 flex-wrap">
                    <span className="px-1.5 py-0.5 bg-surface-800 text-surface-300 text-[10px] font-mono rounded">198.51.100.42</span>
                    <span className="px-1.5 py-0.5 bg-surface-800 text-surface-300 text-[10px] font-mono rounded">TLS</span>
                  </div>
                </div>

                {/* TTP Card 4 (Pending/Investigating) */}
                <div className="border border-surface-800 border-dashed bg-surface-900 rounded-lg p-4 relative overflow-hidden opacity-60">
                  <div className="text-[10px] font-mono text-surface-500 mb-1">TA0010 • Exfiltration</div>
                  <div className="text-sm font-medium text-surface-400 mb-2">Exfiltration Over C2 (T1041)</div>
                  <div className="text-xs text-surface-500">Cross-correlating network flow payload sizes to evaluate data transfer volume.</div>
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] text-surface-400 font-mono">
                    <Clock className="w-3 h-3 text-brand-400 animate-pulse" />
                    Pending Network Correlator
                  </div>
                </div>
             </div>
           </div>
        </div>

        <div className="space-y-4">
           <div className="bg-surface-900 border border-surface-800 rounded-xl p-4">
             <h3 className="text-xs font-medium text-surface-400 uppercase tracking-wider font-mono mb-3">Investigation Context</h3>
             <div className="space-y-3">
               <div>
                 <div className="text-xs text-surface-500 mb-0.5">Primary Model</div>
                 <div className="text-sm text-surface-200 font-medium flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> GPT-4.x</div>
               </div>
               <div>
                 <div className="text-xs text-surface-500 mb-0.5">Evidence Integrity</div>
                 <div className="text-sm text-surface-200 font-medium flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Verified (Read-only)</div>
               </div>
               <div>
                 <div className="text-xs text-surface-500 mb-0.5">Max Iterations</div>
                 <div className="text-sm text-surface-200 font-medium">1 / 5</div>
               </div>
               <div>
                 <div className="text-xs text-surface-500 mb-0.5">Confidence Score</div>
                 <div className="text-sm text-brand-400 font-bold">92%</div>
               </div>
             </div>
           </div>
           
           <div className="bg-surface-900 border border-surface-800 rounded-xl p-4">
             <div className="relative group">
                <button className="w-full flex justify-center items-center gap-2 py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  Generate Report
                </button>
                <div className="absolute top-10 right-0 w-full bg-surface-900 border border-surface-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col p-1 z-10">
                  <button className="flex items-center gap-2 px-3 py-2 text-sm text-surface-300 hover:text-white hover:bg-surface-800 rounded-md transition-colors text-left" onClick={() => handleGenerateReport('json')}>
                    <FileJson className="w-4 h-4 text-blue-400" /> JSON Format
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 text-sm text-surface-300 hover:text-white hover:bg-surface-800 rounded-md transition-colors text-left" onClick={() => handleGenerateReport('pdf')}>
                    <FileText className="w-4 h-4 text-red-400" /> PDF Summary
                  </button>
                </div>
             </div>
             <button className="w-full py-2 mt-2 bg-surface-800 hover:bg-surface-700 text-white font-medium rounded-lg transition-colors text-sm border border-surface-700">
               Halt Investigation
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
