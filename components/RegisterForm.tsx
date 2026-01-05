"use client";

import React, { useState } from 'react';
import { Mail, Lock, User, Github, Chrome, Apple, Eye, EyeOff, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface RegisterFormProps {
  onInputFocus: () => void;
}

export default function RegisterForm({ onInputFocus }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("")

  const navigate = useRouter();

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("")

    try {
      await axios.post("/api/auth/register", {
        name,
        email,
        password,
        redirect:false
      });
      
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (res?.ok) {
        setError("Invalid email or password"); // Explain why they can't login
        navigate.push('/');
      } else {
        console.log("login failed", res?.error);
      }
    } catch (error) {
      console.log("Register error:", error);
      setError("Something went wrong. Try again.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg p-8 relative mt-10 ml-6 md:ml-12 ">
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
          <span className="absolute bg-black px-4 text-xs text-zinc-600 uppercase tracking-widest">or</span>
        </div>

        {/* Input Form Section */}
        <form className="space-y-4" onSubmit={handleRequest} >
                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
            <input 
              onFocus={onInputFocus} 
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          {/* Action Button - Always clickable unless loading */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-white text-black font-semibold rounded-2xl transition-all 
                       active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200"
          >
            {loading ? "Creating..." : "Create an account"}
          </button>
        </form>

        {/* Bottom Link - Properly structured Link as a Button */}
        <Link 
          href="/login"
          className="w-full flex items-center justify-center gap-2 py-4 bg-black border border-zinc-900 text-zinc-500 hover:text-white transition-all rounded-2xl group text-sm"
        >
          Already have an account? 
          <span className="flex items-center gap-1 font-medium text-zinc-300 group-hover:text-white">
            Log in <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  );
}