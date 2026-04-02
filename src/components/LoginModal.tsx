import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, ShieldCheck, AlertCircle, Chrome } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { setIsAdmin } = useSettings();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === 'apprvvirgolandia@gmail.com') {
        setIsAdmin(true);
        onClose();
      } else {
        setError('Este e-mail não tem permissão de administrador.');
        await auth.signOut();
      }
    } catch (err) {
      console.error('Google login error:', err);
      setError('Erro ao fazer login com Google.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAdmin(true);
        onClose();
        setPassword('');
      } else {
        setError(data.message || 'Senha incorreta.');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-stone-100"
          >
            <div className="p-8 text-center bg-stone-50 border-b border-stone-100 relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900">Acesso Restrito</h2>
              <p className="text-stone-500 text-sm mt-2">Área exclusiva para administradores da APPRV</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-center gap-3 border border-red-100"
                >
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-sm active:scale-[0.98]"
              >
                <Chrome size={20} className="text-blue-500" />
                Entrar com Google
              </button>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-100"></div>
                </div>
                <span className="relative px-4 bg-white text-xs text-stone-400 uppercase tracking-widest font-bold">ou use a senha</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-400 mb-2 uppercase tracking-widest">Senha de Acesso</label>
                <div className="relative">
                  <input 
                    type="password" 
                    required
                    autoFocus
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-stone-200 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all text-lg"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    Entrar no Modo Admin
                  </>
                )}
              </button>
              
              <div className="text-center">
                <button 
                  type="button"
                  onClick={async () => {
                    try {
                      const res = await fetch('/api/admin/password-hint');
                      const data = await res.json();
                      setError(`Dica da senha: ${data.hint} (${data.length} caracteres)`);
                    } catch (err) {
                      setError('Não foi possível obter a dica da senha.');
                    }
                  }}
                  className="text-stone-400 hover:text-stone-600 text-xs font-medium transition-colors"
                >
                  Esqueceu a senha? Ver dica
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
