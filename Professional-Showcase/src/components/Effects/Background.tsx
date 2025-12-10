import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {useMemo} from 'react';

// Created by AshrafMorningstar - https://github.com/AshrafMorningstar

export const Background = () => {
    const frame = useCurrentFrame();
    const {width, height} = useVideoConfig();

    // Generate random stars/particles
    const particles = useMemo(() => {
        return new Array(120).fill(0).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.8 + 0.2,
            opacity: Math.random() * 0.7 + 0.3,
        }));
    }, [width, height]);

    // Slow movement for background blobs
    const t = frame * 0.03;

    return (
        <AbsoluteFill className="bg-[#020617] overflow-hidden">
             {/* Deep Space Gradient Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b]" />

            {/* Moving Gradient Orbs - Enhanced Neon Colors */}
            <div
                className="absolute rounded-full opacity-40 blur-[130px]"
                style={{
                    background: 'radial-gradient(circle, #00d2ff 0%, transparent 70%)', // Cyan
                    width: width * 0.9,
                    height: width * 0.9,
                    top: -width * 0.2 + Math.sin(t * 0.4) * 60,
                    left: -width * 0.2 + Math.cos(t * 0.4) * 60,
                }}
            />

            <div
                className="absolute rounded-full opacity-30 blur-[110px]"
                style={{
                    background: 'radial-gradient(circle, #9d00ff 0%, transparent 70%)', // Violet
                    width: width * 0.8,
                    height: width * 0.8,
                    bottom: -width * 0.2 - Math.cos(t * 0.3) * 70,
                    right: -width * 0.2 - Math.sin(t * 0.3) * 70,
                }}
            />
            
            <div
                className="absolute rounded-full opacity-20 blur-[100px]"
                style={{
                    background: 'radial-gradient(circle, #db2777 0%, transparent 70%)', // Pink accent
                    width: width * 0.6,
                    height: width * 0.6,
                    top: height * 0.4 + Math.sin(t * 0.6) * 40,
                    left: width * 0.4 + Math.cos(t * 0.6) * 40,
                }}
            />

             {/* Particles with enhanced glow */}
             {particles.map((p, i) => {
                 const yPos = (p.y - frame * p.speed) % height;
                 const finalY = yPos < 0 ? yPos + height : yPos;
                 return (
                     <div
                        key={i}
                        className="absolute rounded-full bg-cyan-100"
                        style={{
                            left: p.x,
                            top: finalY,
                            width: p.size,
                            height: p.size,
                            opacity: p.opacity,
                            boxShadow: `0 0 ${p.size * 3}px rgba(165, 243, 252, ${p.opacity})`,
                        }}
                     />
                 )
             })}
            
            {/* Enhanced Grid overlay */}
            <AbsoluteFill 
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0, 210, 255, 0.08) 1px, transparent 1px), 
                        linear-gradient(90deg, rgba(0, 210, 255, 0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    opacity: 0.3,
                    maskImage: 'radial-gradient(circle at center, black 30%, transparent 85%)',
                    transform: `perspective(1000px) rotateX(10deg) translateY(${frame % 40}px) scale(1.2)`
                }} 
            />
        </AbsoluteFill>
    );
};
