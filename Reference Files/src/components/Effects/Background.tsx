import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {useMemo} from 'react';

export const Background = () => {
    const frame = useCurrentFrame();
    const {width, height} = useVideoConfig();

    // Generate random stars/particles
    const particles = useMemo(() => {
        return new Array(100).fill(0).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.5 + 0.1,
        }));
    }, [width, height]);

    // Slow movement for background blobs
    const t = frame * 0.05;

    return (
        <AbsoluteFill className="bg-[#0f172a] overflow-hidden">
             {/* Deep Space Gradient Base */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e1b4b]" />

            {/* Moving Gradient Orbs */}
            <div
                className="absolute rounded-full opacity-30 blur-[120px]"
                style={{
                    background: 'radial-gradient(circle, #4f46e5 0%, transparent 70%)',
                    width: width * 0.8,
                    height: width * 0.8,
                    top: -width * 0.2 + Math.sin(t * 0.5) * 50,
                    left: -width * 0.2 + Math.cos(t * 0.5) * 50,
                }}
            />

            <div
                className="absolute rounded-full opacity-25 blur-[100px]"
                style={{
                    background: 'radial-gradient(circle, #db2777 0%, transparent 70%)',
                    width: width * 0.7,
                    height: width * 0.7,
                    bottom: -width * 0.1 - Math.cos(t * 0.3) * 60,
                    right: -width * 0.1 - Math.sin(t * 0.3) * 60,
                }}
            />

             {/* Particles */}
             {particles.map((p, i) => {
                 const yPos = (p.y - frame * p.speed) % height;
                 const finalY = yPos < 0 ? yPos + height : yPos;
                 return (
                     <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: p.x,
                            top: finalY,
                            width: p.size,
                            height: p.size,
                            opacity: p.opacity,
                            boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,${p.opacity})`,
                        }}
                     />
                 )
             })}
            
            {/* Grid overlay */}
            <AbsoluteFill 
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    opacity: 0.2,
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
                }} 
            />
        </AbsoluteFill>
    );
};
