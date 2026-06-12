export type View = "dashboard" | "agents" | "workflows" | "routing" | "settings" | "audit" | "incident_response";

export type AgentStatus = "active" | "idle" | "error" | "provisioning";

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  currentTask: string | null;
  cpu: number;
  memory: number;
  latency: number;
  reliability: number;
}

export type LLMProvider = "GPT-5" | "GPT-4.1" | "Claude Opus" | "Claude Sonnet" | "Gemini 2.5 Pro" | "Gemini Flash" | "Mistral Large" | "DeepSeek" | "Llama Enterprise";

export interface WorkflowNode {
  id: string;
  label: string;
  status: "pending" | "running" | "completed" | "failed" | "human_approval";
  type: "ai_agent" | "rpa_bot" | "human" | "system";
}

export interface Workflow {
  id: string;
  name: string;
  progress: number;
  status: "running" | "blocked" | "completed";
  nodes: WorkflowNode[];
}
