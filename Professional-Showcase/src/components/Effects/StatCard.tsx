/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import { useCurrentFrame } from 'remotion';
import { fadeInAndSlideUp } from '../../functions/animations';
import { AnimatedCounter } from './AnimatedCounter';
import { GlassCard } from './GlassCard';

export const StatCard = ({ title, value, duration = 3, gradient, delay }) => {
  const frame = useCurrentFrame();

  return (
    <GlassCard
      className={`flex flex-col h-[140px] justify-between relative group ${gradient}`}
      style={{
        ...fadeInAndSlideUp(frame, delay),
        borderTop: '1px solid rgba(255,255,255,0.2)',
        borderLeft: '1px solid rgba(255,255,255,0.2)',
      }}
    >
      {/* Decorative gradient blob inside card */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl ${gradient.replace('/10', '/30')}`} />

      <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-300 relative z-10">{title}</h3>
      <div className="flex-grow flex items-end relative z-10">
        <p className="text-5xl font-black tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <AnimatedCounter value={value} duration={duration + delay} />
        </p>
      </div>
    </GlassCard>
  );
};