import { Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const INITIAL_LOGS = [
  { time: "14:02:11", level: "INFO", source: "CEO_AGT", message: "Initiating workflow P-HR-092." },
  { time: "14:02:12", level: "WARN", source: "SEC_AGT", message: "Anomaly detected in standard login patterns." },
  { time: "14:02:14", level: "INFO", source: "RPA_BOT", message: "OCR extraction completed successfully." },
  { time: "14:02:15", level: "ERROR", source: "DB_SYNC", message: "Connection timeout to primary replica." },
  { time: "14:02:18", level: "INFO", source: "LLM_RTR", message: "Consensus evaluation completed in 1240ms." },
];

export function SystemTelemetry() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulate incoming logs
  useEffect(() => {
    const messages = [
      { level: "INFO", source: "ML_OP", message: "Model drift below threshold." },
      { level: "INFO", source: "RPA_BOT", message: "Invoice processed: INV-2023-441." },
      { level: "WARN", source: "API_GW", message: "Rate limit approach for tenant A." },
      { level: "INFO", source: "CEO_AGT", message: "Delegating task to Claude Code Agent." },
      { level: "ERROR", source: "SPLUNK", message: "Failed to ingest telemetry payload." },
      { level: "INFO", source: "SEC_AGT", message: "Threat intelligence correlation positive." },
      { level: "WARN", source: "SPLUNK", message: "High latency on search head 03." },
      { level: "INFO", source: "DEV_AST", message: "SPL query generated successfully." }
    ];

    const interval = setInterval(() => {
      const newLog = messages[Math.floor(Math.random() * messages.length)];
      const time = new Date().toLocaleTimeString('en-US', { hour12: false });
      
      setLogs(prev => {
        const newLogs = [...prev, { time, ...newLog }];
        // Keep last 50 logs
        if (newLogs.length > 50) return newLogs.slice(newLogs.length - 50);
        return newLogs;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-surface-900 border border-surface-800 rounded-xl flex flex-col h-64 overflow-hidden flex-1 shrink-0">
      <div className="flex justify-between items-center p-4 border-b border-surface-800 bg-surface-950/30">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-brand-400" />
          <h2 className="text-sm font-medium text-surface-100 uppercase tracking-wider font-mono">System Telemetry</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-surface-500">LIVE FEED</span>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
        </div>
      </div>
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-1.5 font-mono text-xs bg-[#0a0a0a]"
      >
        {logs.map((log, i) => (
          <div key={i} className="flex gap-3 hover:bg-surface-800/80 px-2 py-1 rounded-sm transition-colors group">
            <span className="text-surface-500 shrink-0 select-none">{log.time}</span>
            <span className={`shrink-0 w-12 font-semibold select-none ${
              log.level === 'INFO' ? 'text-brand-400' :
              log.level === 'WARN' ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              [{log.level}]
            </span>
            <span className="text-purple-400 shrink-0 w-20 truncate">{log.source}</span>
            <span className="text-surface-300 break-all group-hover:text-white transition-colors">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
