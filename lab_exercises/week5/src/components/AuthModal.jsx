import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, Shield } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="sf-card w-full max-w-md p-6 relative bg-[#fffcf8] border-2 border-[#f0e7dd] shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#8a7564] hover:bg-[#fff0df] hover:text-[#15110d] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#fff0df] border border-[#f0d8b8] text-[#ff9f4a] flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-display text-2xl font-extrabold text-[#15110d]">
            {mode === 'login' ? 'Welcome back to LootYard' : 'Join the Creator Network'}
          </h3>
          <p className="text-xs text-[#8a7564]">
            {mode === 'login'
              ? 'Enter your details to access your saved loot & creator dashboard.'
              : 'Create a free account to upload assets or hire game creators.'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex bg-[#fff0df] p-1 rounded-xl border border-[#f0d8b8]/60">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'login' ? 'bg-[#ff9f4a] text-white shadow-sm' : 'text-[#5c4a3c]'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'signup' ? 'bg-[#ff9f4a] text-white shadow-sm' : 'text-[#5c4a3c]'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-[#15110d] mb-1">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7564]" />
                <input
                  type="text"
                  required
                  placeholder="e.g. leafwork3d"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#f0e7dd] rounded-xl text-xs focus:outline-none focus:border-[#ff9f4a]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#15110d] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7564]" />
              <input
                type="email"
                required
                placeholder="dev@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#f0e7dd] rounded-xl text-xs focus:outline-none focus:border-[#ff9f4a]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#15110d] mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7564]" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#f0e7dd] rounded-xl text-xs focus:outline-none focus:border-[#ff9f4a]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#ff9f4a] hover:bg-[#e88835] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {submitted ? (
              <span>Success! Logging in...</span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Log In to Account' : 'Create Free Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#f0e7dd]">
          <span className="text-[11px] text-[#8a7564] flex items-center justify-center gap-1">
            <Shield className="w-3.5 h-3.5 text-[#ff9f4a]" />
            Encrypted auth & zero data selling policy.
          </span>
        </div>
      </div>
    </div>
  );
}
