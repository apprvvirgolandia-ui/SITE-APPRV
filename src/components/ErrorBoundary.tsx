import React, { ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-red-100">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-stone-900 mb-2">Ops! Algo deu errado</h2>
            <p className="text-stone-600 mb-6 text-sm leading-relaxed">
              Ocorreu um erro inesperado na aplicação. Isso pode ser devido a dados corrompidos no navegador ou um erro de renderização.
            </p>
            
            {this.state.error && (
              <div className="mb-6 p-3 bg-red-50 rounded-xl text-left">
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Detalhes do Erro</p>
                <p className="text-xs text-red-700 font-mono break-all">{this.state.error.message}</p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <button 
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                Limpar Cache e Recarregar
              </button>
              <Link 
                to="/" 
                onClick={() => this.setState({ hasError: false, error: null })}
                className="text-stone-500 hover:text-stone-700 text-sm font-medium flex items-center justify-center gap-2 py-2"
              >
                <Home size={16} />
                Voltar para o Início
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
