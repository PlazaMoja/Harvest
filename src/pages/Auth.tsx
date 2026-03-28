
import { useState } from 'react';
import { motion } from 'framer-motion';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';

export function AuthPage({ onAuthSuccess }: { onAuthSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMsg, setResetMsg] = useState<string | null>(null);
  const [resetLoading, setResetLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onAuthSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gradient-hero relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className="backdrop-blur-xl bg-white/30 border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md mx-auto mt-12 glass-card"
        style={{ boxShadow: '0 8px 40px 0 rgba(145, 63, 32, 0.15)' }}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mb-2 shadow-lg">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M3 17c0-2.761 2.239-5 5-5h8c2.761 0 5 2.239 5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 3v14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 className="text-3xl font-bold text-white drop-shadow mb-1">Welcome to HarvesterAI</h2>
          <p className="text-white/80 text-center text-base mb-2">Sign in or create an account to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-600 text-sm text-center bg-white/60 rounded p-2 mb-2">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input bg-white/70 border-white/40 placeholder:text-gray-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input bg-white/70 border-white/40 placeholder:text-gray-400"
            required
          />
          <button
            type="submit"
            className="btn btn-primary w-full shadow-lg"
            disabled={loading}
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-white/40" />
          <span className="mx-3 text-white/70 text-xs">or</span>
          <div className="flex-grow h-px bg-white/40" />
        </div>
        <button
          type="button"
          className="btn btn-outline w-full flex items-center justify-center gap-2 shadow-lg bg-white/60 hover:bg-white"
          onClick={async () => {
            setLoading(true);
            setError(null);
            try {
              const provider = new GoogleAuthProvider();
              await signInWithPopup(auth, provider);
              onAuthSuccess();
            } catch (err: any) {
              setError(err.message || 'Google sign-in failed');
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none"><g clipPath="url(#clip0_17_40)"><path d="M47.5 24.552c0-1.624-.146-3.248-.438-4.824H24v9.128h13.24c-.57 2.96-2.27 5.456-4.84 7.128v5.92h7.82C45.98 37.36 47.5 31.456 47.5 24.552z" fill="#4285F4"/><path d="M24 48c6.48 0 11.92-2.144 15.9-5.824l-7.82-5.92c-2.18 1.48-4.96 2.36-8.08 2.36-6.22 0-11.48-4.2-13.36-9.824H2.66v6.16C6.62 43.36 14.56 48 24 48z" fill="#34A853"/><path d="M10.64 28.792A14.98 14.98 0 0 1 9.2 24c0-1.656.28-3.256.76-4.792v-6.16H2.66A23.98 23.98 0 0 0 0 24c0 3.92.94 7.64 2.66 10.952l7.98-6.16z" fill="#FBBC05"/><path d="M24 9.52c3.52 0 6.68 1.208 9.16 3.576l6.84-6.84C35.92 2.144 30.48 0 24 0 14.56 0 6.62 4.64 2.66 13.048l7.98 6.16C12.52 13.72 17.78 9.52 24 9.52z" fill="#EA4335"/></g><defs><clipPath id="clip0_17_40"><path fill="#fff" d="M0 0h48v48H0z"/></clipPath></defs></svg>
          Continue with Google
        </button>
        <div className="flex flex-col gap-2 mt-4 text-center">
          <button
            type="button"
            className="text-[hsl(var(--harvest-green))] underline text-sm font-medium"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
          {isLogin && (
            <button
              type="button"
              className="text-[hsl(var(--harvest-green))] underline text-xs font-medium mt-1"
              onClick={() => setShowReset(true)}
            >
              Forgot password?
            </button>
          )}
          <button
            type="button"
            className="btn btn-outline w-full mt-4 shadow-lg bg-white/70 hover:bg-white/90"
            onClick={() => {
              localStorage.setItem('demoMode', 'true');
              onAuthSuccess();
            }}
          >
            🚀 Try Demo Mode
          </button>
        </div>

        {/* Password Reset Modal */}
        {showReset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/90 backdrop-blur-xl rounded-xl p-6 shadow-2xl w-full max-w-xs relative"
            >
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => { setShowReset(false); setResetMsg(null); }}>&times;</button>
              <h3 className="text-lg font-bold mb-2 text-[hsl(var(--harvest-green))]">Reset Password</h3>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                className="input bg-white/80 border-gray-300 mb-2"
                required
              />
              <button
                className="btn btn-primary w-full mb-2"
                disabled={resetLoading}
                onClick={async () => {
                  setResetLoading(true);
                  setResetMsg(null);
                  try {
                    await sendPasswordResetEmail(auth, resetEmail);
                    setResetMsg('Password reset email sent!');
                  } catch (err: any) {
                    setResetMsg(err.message || 'Failed to send reset email');
                  } finally {
                    setResetLoading(false);
                  }
                }}
              >
                {resetLoading ? 'Sending...' : 'Send Reset Email'}
              </button>
              {resetMsg && <div className="text-center text-xs text-[hsl(var(--harvest-green))] mt-1">{resetMsg}</div>}
            </motion.div>
          </div>
        )}
      </motion.div>
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full">
          <circle cx="500" cy="100" r="120" fill="url(#paint0_radial)" fillOpacity="0.25" />
          <circle cx="100" cy="500" r="120" fill="url(#paint1_radial)" fillOpacity="0.18" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(500 100) scale(120)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#91C788" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientTransform="translate(100 500) scale(120)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFD580" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
