"use client";
import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Instagram } from 'lucide-react';

const features = [
  {
    title: "WhatsApp AI",
    desc: "24/7 Agent Automation",
    icon: <MessageSquare className="w-6 h-6 text-white" />,
  },
  {
    title: "Insta Growth",
    desc: "Auto-DM & Engagement",
    icon: <Instagram className="w-6 h-6 text-white" />,
  },
  {
    title: "Email Outreach",
    desc: "Smart AI Sequencing",
    icon: <Mail className="w-6 h-6 text-white" />,
  }
];

export default function FeatureSlider({ isVisible }: { isVisible: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <div className={`hidden md:flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
      !isVisible ? 'w-0 opacity-0 overflow-hidden' : 'w-[45%] opacity-100'
    }`}>
      <h1 className='text-2xl text-gray-200 ' >
        Start building and collaborating

      </h1>
      {/* Box is now bigger: h-[320px] and max-w-[400px] */}
      <div className="relative w-full mt-10 h-[400px] max-w-[450px] bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-2xl">
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black opacity-70" />
        
        {/* Tapered Line: Thin at ends, thick in middle */}
        <div 
          className="absolute left-0 top-1/4 w-[3px] h-1/2 opacity-80"
          style={{
            background: 'radial-gradient(circle, rgba(119, 116, 116, 0.8) 0%, rgba(98, 94, 94, 0) 80%)',
            filter: 'blur(0.5px)'
          }}
        />

        <div className="relative h-full flex flex-col justify-center p-10">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`absolute inset-x-10 transition-all duration-700 ease-in-out transform ${
                i === index 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex flex-col gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-lg mt-2 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sharp Red Progress Bar */}
        <div className="absolute bottom-8 left-10 flex gap-2 ">
          {features.map((_, i) => (
            <div 
              key={i} 
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === index ? 'w-10 bg-gray-200 shadow-[0_0_10px_rgba(221, 217, 217, 0.5)]' : 'w-3 bg-white/10'
              }`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}