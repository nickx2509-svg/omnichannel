"use client";
import React from 'react';
import { MessageSquare, Mail, Instagram } from 'lucide-react';

export default function FeatureSlider({ isVisible }: { isVisible: boolean }) {
  return (
    <div className={`hidden md:flex flex-col justify-center bg-black border-r border-white/5 transition-all duration-700 ease-in-out ${
      !isVisible ? 'w-0 opacity-0 overflow-hidden' : 'w-[40%] p-12 opacity-100'
    }`}>
      <div className="space-y-12 min-w-[300px]">
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <MessageSquare className="text-blue-500" />
          </div>
          <h3 className="text-xl font-medium text-white">WhatsApp Automation</h3>
          <p className="text-zinc-500 leading-relaxed">Broadcast messages and handle customer queries 24/7 with AI agents.</p>
        </div>

        <div className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <Instagram className="text-purple-500" />
          </div>
          <h3 className="text-xl font-medium text-white">Instagram Growth</h3>
          <p className="text-zinc-500 leading-relaxed">Auto-reply to DMs and comments to keep your engagement high.</p>
        </div>

        <div className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <Mail className="text-emerald-500" />
          </div>
          <h3 className="text-xl font-medium text-white">Email Outreach</h3>
          <p className="text-zinc-500 leading-relaxed">Smart sequencing and AI personalization for every recipient.</p>
        </div>
      </div>
    </div>
  );
}