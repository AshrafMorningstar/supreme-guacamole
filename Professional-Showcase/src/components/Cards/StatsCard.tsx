/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import { useEffect, useState } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { UserStats } from '../../config';
import { AnimatedCounter } from '../Effects/AnimatedCounter';
import { fadeInAndSlideUp } from '../../functions/animations';
import { formatBytes } from '../../functions/utils';
import { StatCard } from '../Effects/StatCard';
import { GlassCard } from '../Effects/GlassCard';

/* --- Components --- */

const LanguageItem = ({ language, bytes, color, totalBytes }) => {
  const percentage = Math.round((bytes / totalBytes) * 100);
  
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1 font-medium text-gray-300">
        <span>{language}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <div 
            className="h-full rounded-full shadow-[0_0_10px_currentColor]" 
            style={{ width: `${percentage}%`, backgroundColor: color, color: color }} 
        />
      </div>
    </div>
  );
};

const StreakRing = ({ streak }) => {
    // Simple glowing ring
    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="absolute w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                <circle 
                    cx="50" cy="50" r="45" fill="none" stroke="#fbbf24" strokeWidth="6" 
                    strokeDasharray="283"
                    strokeDashoffset="60" // Static offset for demo, or animate
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                />
            </svg>
            <div className="text-center z-10">
                <div className="text-4xl font-black text-white drop-shadow-md">
                    <AnimatedCounter value={streak} duration={3} />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#fbbf24] font-bold">Day Streak</div>
            </div>
        </div>
    );
}

/* --- Main Layout --- */

export function StatsContent({userStats}: {userStats: UserStats}) {
  const [isLoading, setIsLoading] = useState(true);
  const frame = useCurrentFrame();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="animate-pulse text-2xl font-light tracking-[0.5em]">INITIALIZING...</div>
      </div>
    );
  }

  // Calculate total bytes for languages
  const totalBytes = userStats.topLanguages.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white p-12 overflow-hidden">
      
        {/* Header */}
        <div 
            className="w-full text-center mb-10"
            style={fadeInAndSlideUp(frame)}
        >
          <h1 className="text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-sm pb-2">
            GITHUB PROFILE STATS
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto rounded-full mt-2" />
        </div>

        <div className="w-full max-w-6xl grid gap-8 grid-cols-12">
            {/* Top Row Stats */}
            <div className="col-span-12 grid grid-cols-3 md:grid-cols-6 gap-6">
                 <StatCard title="Stars" value={userStats.starCount} gradient="bg-amber-500/10" delay={5} />
                 <StatCard title="Forks" value={userStats.forkCount} gradient="bg-blue-500/10" delay={10} />
                 <StatCard title="Views" value={userStats.repoViews} gradient="bg-pink-500/10" delay={15} />
                 <StatCard title="Commits" value={userStats.totalCommits} gradient="bg-red-500/10" delay={20} />
                 <StatCard title="PRs" value={userStats.totalPullRequests} gradient="bg-indigo-500/10" delay={25} />
                 <StatCard title="Contribs" value={userStats.totalContributions} gradient="bg-emerald-500/10" delay={30} />
            </div>

            {/* Middle Section */}
            <div className="col-span-4 space-y-6">
                <GlassCard className="p-6 h-full" style={fadeInAndSlideUp(frame, 35)}>
                    <h2 className="text-lg font-bold mb-6 text-gray-200 border-b border-white/10 pb-2">ISSUE TRACKING</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-1 text-gray-400">
                                <span>Issues Closed</span>
                                <span className="text-white font-mono"><AnimatedCounter value={userStats.closedIssues} /></span>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5">
                                <div className="bg-emerald-400 h-1.5 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]" style={{width: '80%'}} />
                            </div>
                        </div>
                         <div>
                            <div className="flex justify-between text-sm mb-1 text-gray-400">
                                <span>Issues Open</span>
                                <span className="text-white font-mono"><AnimatedCounter value={userStats.openIssues} /></span>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5">
                                <div className="bg-rose-400 h-1.5 rounded-full shadow-[0_0_8px_rgba(251,113,133,0.5)]" style={{width: '20%'}} />
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>

            <div className="col-span-4 space-y-6">
                 <GlassCard className="p-6 h-full flex flex-col justify-center items-center" style={fadeInAndSlideUp(frame, 40)}>
                    <h2 className="text-lg font-bold mb-4 text-gray-200 w-full text-center border-b border-white/10 pb-2">COMMIT STREAK</h2>
                    <StreakRing streak={100} /> {/* Hardcoded streak for demo visual */}
                 </GlassCard>
            </div>

            <div className="col-span-4 space-y-6">
                <GlassCard className="p-6 h-full" style={fadeInAndSlideUp(frame, 45)}>
                    <h2 className="text-lg font-bold mb-4 text-gray-200 border-b border-white/10 pb-2">CODE METRICS</h2>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Lines Changed</span>
                            <span className="text-xl font-bold font-mono text-cyan-300 drop-shadow-sm">
                                <AnimatedCounter value={userStats.linesOfCodeChanged} />
                            </span>
                        </div>
                         <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Avg. Commits / PR</span>
                            <span className="text-xl font-bold font-mono text-purple-300 drop-shadow-sm">
                                <AnimatedCounter value={Math.round(userStats.totalCommits / (userStats.totalPullRequests || 1))} />
                            </span>
                        </div>
                    </div>
                </GlassCard>
            </div>
            
            {/* Bottom Row - Languages */}
             <div className="col-span-12">
                <GlassCard className="p-6" style={fadeInAndSlideUp(frame, 50)}>
                    <h2 className="text-lg font-bold mb-6 text-gray-200 border-b border-white/10 pb-2">TOP LANGUAGES</h2>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                        {userStats.topLanguages.slice(0, 6).map((lang, index) => (
                            <LanguageItem 
                                key={index} 
                                language={lang.languageName} 
                                bytes={lang.value} 
                                totalBytes={totalBytes}
                                color={`hsl(${index * 50 + 200}, 80%, 60%)`} 
                            />
                        ))}
                    </div>
                </GlassCard>
             </div>
        </div>
    </div>
  );
}