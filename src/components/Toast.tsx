import { useEffect } from "react";
import { ShieldAlert, X, AlertTriangle } from "lucide-react";

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: "warning" | "error" | "info";
}

export function ToastContainer({ toasts, removeToast }: { toasts: ToastMessage[], removeToast: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="bg-surface-900 border border-surface-700 shadow-2xl rounded-xl p-4 w-96 flex items-start gap-3 pointer-events-auto shadow-black/50 overflow-hidden relative group">
          <div className={`absolute top-0 left-0 w-1 h-full ${toast.type === "warning" ? "bg-yellow-500" : toast.type === "error" ? "bg-red-500" : "bg-brand-500"}`}></div>
          {toast.type === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />}
          {toast.type === "error" && <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
          {toast.type === "info" && <ShieldAlert className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />}
          <div className="flex-1 min-w-0 pr-6">
            <p className="text-sm font-medium text-surface-100">{toast.title}</p>
            <p className="text-xs text-surface-400 mt-1 leading-relaxed">{toast.message}</p>
            <div className="mt-3 flex gap-2">
              <button className="text-xs font-medium text-white bg-surface-800 hover:bg-surface-700 px-3 py-1.5 rounded transition-colors" onClick={() => removeToast(toast.id)}>Review</button>
              <button className="text-xs font-medium text-surface-400 hover:text-white px-3 py-1.5 rounded transition-colors" onClick={() => removeToast(toast.id)}>Dismiss</button>
            </div>
          </div>
          <button 
            onClick={() => removeToast(toast.id)} 
            className="absolute top-2 right-2 p-1 text-surface-500 hover:text-white rounded-md transition-colors opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
