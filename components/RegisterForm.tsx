"use client";

import React, { useState } from 'react';
import { Mail, Lock, User, Github, Chrome, Apple, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface RegisterFormProps {
  onInputFocus: () => void;
}

export default function RegisterForm({ onInputFocus }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Logic: Button is unclickable if fields are empty
  const isFormEmpty = !name || !email || !password;

  return (
    /* Increased max-width to 'lg' and added ml-12 to shift it right */
    <div className="w-full max-w-lg p-8 relative mt-10 ml-6 md:ml-12">
      {/* Subtle Inner Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-black blur-3xl rounded-full" />
      
      <div className="relative z-10 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-medium text-white tracking-tight">Create your account</h1>
          <p className="text-zinc-500 text-sm">Join the next generation of automation</p>
        </div>

        {/* Social Auth Section */}
        <div className="grid grid-cols-3 gap-3">
          <button type="button" className="flex items-center justify-center py-4 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-all group">
            <Chrome className="w-5 h-5 text-zinc-400 group-hover:text-white" />
          </button>
          <button type="button" className="flex items-center justify-center py-4 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-all group">
            <Apple className="w-5 h-5 text-zinc-400 group-hover:text-white" />
          </button>
          <button type="button" className="flex items-center justify-center py-4 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-all group">
            <Github className="w-5 h-5 text-zinc-400 group-hover:text-white" />
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-white/10"></div>
          <span className="absolute bg-[#030303] px-4 text-xs text-zinc-600 uppercase tracking-widest">or</span>
        </div>

        {/* Input Form Section */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
            <input 
              onFocus={onInputFocus} 
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              /* Changed py-4 to py-3 for a shorter look, w-full ensures it stays wide */
              className="w-full pl-12 pr-4 py-3 bg-white/[0.02] border border-white/5 rounded-2xl outline-none focus:border-white/20 focus:bg-white/[0.04] text-white transition-all"
            />
          </div>

          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
            <input 
              onFocus={onInputFocus} 
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/[0.02] border border-white/5 rounded-2xl outline-none focus:border-white/20 focus:bg-white/[0.04] text-white transition-all"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
            <input 
              onFocus={onInputFocus} 
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-white/[0.02] border border-white/5 rounded-2xl outline-none focus:border-white/20 focus:bg-white/[0.04] text-white transition-all"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Action Button */}
          <button 
            type="submit"
            disabled={isFormEmpty || loading}
            className="w-full py-4 bg-white text-black font-semibold rounded-2xl transition-all 
                       active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-200"
          >
            {loading ? "Creating..." : "Create an account"}
          </button>
        </form>

        {/* Bottom Link */}
        <button 
          type="button"
          className="w-full flex items-center justify-center gap-2 py-4 bg-black border border-zinc-900 text-zinc-500 hover:text-white transition-all rounded-2xl group"
        >
           Already have an account? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}