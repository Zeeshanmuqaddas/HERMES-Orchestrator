import { useState } from "react";
import { Terminal, Users, Database, ShieldCheck, Box, GripVertical, X } from "lucide-react";

interface WorkflowNode {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  icon: React.ElementType;
}

const AVAILABLE_AGENTS = [
  { type: "ceo", name: "CEO Orchestrator", icon: Users },
  { type: "support", name: "Support Intel", icon: Terminal },
  { type: "security", name: "Threat Det.", icon: ShieldCheck },
  { type: "db", name: "Knowledge", icon: Database },
  { type: "rpa", name: "RPA Maestro", icon: Box },
];

export function WorkflowBuilder() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: "node-init", type: "ceo", name: "CEO Orchestrator", x: 50, y: 150, icon: Users }
  ]);

  const handleDragStartPalette = (e: React.DragEvent, agent: typeof AVAILABLE_AGENTS[0]) => {
    e.dataTransfer.setData("agentType", agent.type);
  };

  const handleDragStartNode = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("nodeId", id);
    // Keep it slightly transparent while dragging
    setTimeout(() => {
      if (e.target instanceof HTMLElement) {
        e.target.style.opacity = '0.5';
      }
    }, 0);
  };

  const handleDragEndNode = (e: React.DragEvent) => {
     if (e.target instanceof HTMLElement) {
       e.target.style.opacity = '1';
     }
  };

  const handleDropCanvas = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("agentType");
    const nodeId = e.dataTransfer.getData("nodeId");
    
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    if (type) {
      const agent = AVAILABLE_AGENTS.find(a => a.type === type);
      if (agent) {
        setNodes(prev => [...prev, {
          id: `node-${Date.now()}`,
          type: agent.type,
          name: agent.name,
          icon: agent.icon,
          x: Math.max(0, x - 80), 
          y: Math.max(0, y - 24),
        }]);
      }
    } else if (nodeId) {
       setNodes(prev => prev.map(node => 
         node.id === nodeId ? { ...node, x: Math.max(0, x - 80), y: Math.max(0, y - 24) } : node
       ));
    }
  };

  const handleDragOverCanvas = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const bgPattern = {
    backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
    backgroundSize: '24px 24px'
  };

  const deleteNode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="flex flex-col border border-surface-800 rounded-xl bg-surface-900 overflow-hidden h-[500px]">
      <div className="border-b border-surface-800 bg-surface-950/50 p-4 flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="font-medium text-surface-100">Process Builder Canvas</h3>
          <p className="text-xs text-surface-500">Drag and drop agents to construct autonomous task sequences.</p>
        </div>
        <button 
          onClick={() => setNodes([])}
          className="text-xs border border-surface-700 bg-surface-800 px-3 py-1.5 rounded text-surface-300 hover:text-white hover:bg-surface-700 transition-colors"
        >
          Clear Canvas
        </button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Palette */}
        <div className="w-64 border-r border-surface-800 bg-surface-950/50 p-4 flex flex-col gap-3 overflow-y-auto">
          <div className="text-xs font-mono text-surface-500 mb-2 tracking-wider">AGENT PALETTE</div>
          {AVAILABLE_AGENTS.map(agent => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.type}
                draggable
                onDragStart={(e) => handleDragStartPalette(e, agent)}
                className="flex items-center gap-3 p-3 bg-surface-800/40 border border-surface-700 rounded-lg cursor-grab active:cursor-grabbing hover:border-brand-500 hover:bg-surface-800 transition-colors"
              >
                <Icon className="w-5 h-5 text-brand-400" />
                <span className="text-sm text-surface-200 font-medium">{agent.name}</span>
                <GripVertical className="w-4 h-4 text-surface-600 ml-auto" />
              </div>
            );
          })}
        </div>

        {/* Canvas */}
        <div 
          className="flex-1 relative overflow-hidden bg-surface-950/20"
          style={bgPattern}
          onDrop={handleDropCanvas}
          onDragOver={handleDragOverCanvas}
        >
          {/* SVG Connectors */}
          <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
            {nodes.map((node, index) => {
              if (index === nodes.length - 1) return null;
              const nextNode = nodes[index + 1];
              return (
                <line 
                  key={`line-${node.id}-${nextNode.id}`}
                  x1={node.x + 80} 
                  y1={node.y + 24} 
                  x2={nextNode.x + 80} 
                  y2={nextNode.y + 24} 
                  stroke="#6366f1" 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                  className="opacity-70 animate-pulse"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                draggable
                onDragStart={(e) => handleDragStartNode(e, node.id)}
                onDragEnd={handleDragEndNode}
                style={{ left: node.x, top: node.y }}
                className="absolute w-48 p-3 bg-surface-900 border-2 border-surface-700 rounded-lg shadow-xl shadow-black/50 cursor-grab active:cursor-grabbing hover:border-brand-500 transition-colors group z-10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-md bg-surface-800 flex flex-col items-center justify-center shrink-0 border border-surface-700 group-hover:border-brand-500/50 transition-colors">
                    <Icon className="w-4 h-4 text-brand-400" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-surface-100 truncate">{node.name}</span>
                    <span className="text-[10px] text-surface-400 font-mono">STEP {index + 1}</span>
                  </div>
                  <button 
                    onClick={(e) => deleteNode(node.id, e)}
                    className="ml-auto flex items-center justify-center w-6 h-6 rounded bg-surface-800 text-surface-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Node Status Indicator */}
                <div className="flex items-center gap-2 text-[10px] font-mono bg-surface-950 p-1.5 rounded border border-surface-800">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                   <span className="text-surface-400 truncate">READY</span>
                </div>
              </div>
            );
          })}
          
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-surface-500 text-sm font-mono border border-surface-800/80 border-dashed rounded-xl px-6 py-4 bg-surface-900/30">
                DRAG AGENTS HERE TO BUILD SEQUENCE
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
