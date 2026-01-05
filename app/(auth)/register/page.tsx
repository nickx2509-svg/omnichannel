"use client";
import React, { useState } from 'react';
import FeatureSlider from '@/components/FeatureSlider';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#050505] overflow-hidden selection:bg-red-500/30">
      
      {/* Wrapper with Margin Left to push the content towards center-right */}
      <div className="flex w-full max-w-[1400px] mx-auto px-10 md:ml-20 transition-all duration-700">
        
        {/* 1. Feature Slider (Visible when not typing) */}
        <FeatureSlider isVisible={!isFocused} />

        {/* 2. The Form Area - Stays centered and responds to focus */}
        <div 
          className={`flex-1 flex items-center justify-center transition-all duration-700 ${
            isFocused ? 'md:pr-20' : ''
          }`}
          onClick={() => setIsFocused(false)} 
        >
          <div 
            className="w-full max-w-[450px] transition-transform duration-700"
            onClick={(e) => e.stopPropagation()}
          > 
             <RegisterForm onInputFocus={() => setIsFocused(true)} />
          </div>
        </div>
      </div>
      
    </div>
  );
}