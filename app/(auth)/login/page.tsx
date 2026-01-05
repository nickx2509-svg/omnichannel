"use client";

import { Apple, ArrowRight, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Added error state
  const navigate = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password"); // Explain why they can't login
        setLoading(false);
      } else if (res?.ok) {
        navigate.push("/");
        // We don't setLoading(false) here because we are navigating away
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#07080a] px-6">
      <div className="w-full max-w-[420px] space-y-10">
        
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-white tracking-tighter italic">Hooper</h1>
          <p className="text-zinc-500 text-sm">Sign in to your command center</p>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-row gap-4 justify-center px-8">
          <button type="button" className="flex-1 flex items-center justify-center py-3 bg-white/[0.04] border border-white/10 rounded-xl hover:bg-white/[0.08] transition-all">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </button>
          <button type="button" className="flex-1 flex items-center justify-center py-3 bg-white/[0.04] border border-white/10 rounded-xl hover:bg-white/[0.08] transition-all">
            <Apple className="w-5 h-5 text-white" fill="currentColor" />
          </button>
          <button type="button" className="flex-1 flex items-center justify-center py-3 bg-white/[0.04] border border-white/10 rounded-xl hover:bg-white/[0.08] transition-all">
             <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </button>
        </div>

        <div className="relative flex items-center justify-center py-2">
          <div className="w-full border-t border-white/5"></div>
          <span className="absolute bg-[#050505] px-4 text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-medium">Authentication</span>
        </div>

        <form className="space-y-4 px-4" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          
          <div className="relative group">
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl outline-none focus:border-white/20 focus:bg-white/[0.04] text-white transition-all placeholder:text-zinc-700"
            />
          </div>

          <div className="relative group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl outline-none focus:border-white/20 focus:bg-white/[0.04] text-white transition-all placeholder:text-zinc-700"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-4 mt-6 bg-white text-black font-extrabold rounded-2xl hover:bg-zinc-200 active:scale-[0.97] transition-all disabled:opacity-70"
          >
            {loading ? <Loader2 className='h-5 w-5 animate-spin' /> : "Login"}
          </button>
        </form>

        <div className="text-center pt-4">
          <Link href="/register" className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-sm">
            Don't have an account? 
            <span className="text-zinc-300 font-semibold group-hover:text-white flex items-center gap-1 underline underline-offset-4 decoration-white/10">
              Register <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}