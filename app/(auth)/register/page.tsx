"use client";
import React, { useState } from 'react';
import FeatureSlider from '@/components/FeatureSlider';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  // This state controls the whole layout
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-black overflow-hidden">
      
      {/* 1. The Wrapper (External Component) */}
      <FeatureSlider isVisible={!isFocused} />

      {/* 2. The Form Area */}
      <div 
        className="flex-1 flex items-center justify-center transition-all duration-700"
        onClick={() => setIsFocused(false)} // Reset when clicking background
      >
        {/* Pass the focus function to the form */}
        <div onClick={(e) => e.stopPropagation()}> 
           <RegisterForm onInputFocus={() => setIsFocused(true)} />
        </div>
      </div>
      
    </div>
  );
}