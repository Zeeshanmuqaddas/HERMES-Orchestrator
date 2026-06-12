import { useState } from "react";
import { Box, Lock, Mail, ArrowRight } from "lucide-react";

interface AuthPageProps {
  onLogin: (email: string) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setIsAuthenticating(true);
      // Simulate network request
      setTimeout(() => {
        onLogin(email);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col justify-center items-center p-4 relative overflow-hidden text-surface-50 font-sans">
      {/* Decorative background grid */}
      <div className="absolute inset-0 pattern-dots text-surface-800 opacity-20 pointer-events-none"></div>
      
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-surface-900 border border-surface-700 rounded-2xl flex items-center justify-center mb-6 shadow-2xl relative">
            <div className="absolute inset-0 bg-brand-500/20 blur-xl rounded-2xl"></div>
            <Box className="w-8 h-8 text-brand-400 relative z-10" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">HERMES OS</h1>
          <p className="text-sm text-surface-400 font-mono tracking-wider">ENTERPRISE AI CONTROL PLANE</p>
        </div>

        <div className="bg-surface-900/80 backdrop-blur-xl border border-surface-800 rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-medium text-surface-100 mb-6">Operator Authentication</h2>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-mono text-surface-400 tracking-wider">
                OPERATOR ID (EMAIL)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@enterprise.local"
                  className="w-full bg-surface-950 border border-surface-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-surface-200 focus:outline-none focus:border-brand-500 transition-colors placeholder:text-surface-600"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-mono text-surface-400 tracking-wider">
                ACCESS KEY
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-surface-950 border border-surface-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-surface-200 focus:outline-none focus:border-brand-500 transition-colors placeholder:text-surface-600"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm py-2.5 rounded-lg transition-colors mt-2 flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isAuthenticating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Initialize Session</span>
                  <ArrowRight className="w-4 h-4 text-brand-300 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-xs text-surface-500 font-mono">
          <p>RESTRICTED ACCESS • ZERO TRUST VERIFICATION</p>
        </div>
      </div>
    </div>
  );
}
