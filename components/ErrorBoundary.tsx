import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-neon-cyan flex flex-col items-center justify-center p-4 font-mono text-center">
          <div className="p-6 border border-red-500/50 bg-red-900/10 rounded-xl backdrop-blur-md max-w-lg w-full">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">SYSTEM CRITICAL FAILURE</h1>
            <p className="text-gray-400 mb-6">
              An unexpected anomaly has caused the interface to crash. 
              <br/>
              Error Code: <span className="text-red-400 text-xs">{this.state.error?.message || 'UNKNOWN_ERROR'}</span>
            </p>
            <button
              onClick={() => window.location.reload()}
              className="group flex items-center justify-center gap-2 w-full py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500 text-red-400 hover:text-white transition-all rounded-lg uppercase tracking-wider text-sm font-bold"
            >
              <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
              Initiate System Reboot
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;