/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React from 'react';
import {AbsoluteFill} from 'remotion';
import {MainProps} from '../../config';
import {Background} from './Background';

// Created by AshrafMorningstar - https://github.com/AshrafMorningstar

type CardProps = {
  children: React.ReactNode;
  userStats: MainProps['userStats'];
};

export function Card({children, userStats}: CardProps) {
  if (!userStats) {
    return null;
  }

  return (
    <AbsoluteFill className="bg-transparent font-sans text-white">
        <Background />
        
        {/* Main Content Container with Glassmorphism */}
        <AbsoluteFill className="p-4 flex items-center justify-center">
             <div className="relative w-full h-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                 
                 {/* Top shine effect */}
                 <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-50" />
                 
                 {/* Watermark */}
                 <div className="absolute top-3 right-4 z-50 flex items-center gap-2 opacity-60">
                     <span className="text-[10px] font-bold tracking-wider text-cyan-300 uppercase">AshrafMorningstar</span>
                 </div>

                 {/* Content */}
                 <div className="relative z-10 flex-1 w-full h-full">
                    {children}
                 </div>
             </div>
        </AbsoluteFill>
    </AbsoluteFill>
  );
}