import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';

// Created by AshrafMorningstar - https://github.com/AshrafMorningstar

export const GradientBackground: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Smooth rotation based on frame
	const rotation = (frame / durationInFrames) * 360;
	
	// Oscillating gradient positions
    const t = frame / fps;
    const x = 50 + 20 * Math.sin(t);
    const y = 50 + 20 * Math.cos(t);

	return (
		<AbsoluteFill
			style={{
				background: `radial-gradient(circle at ${x}% ${y}%, #1a2a6c, #b21f1f, #fdbb2d)`,
				backgroundSize: '200% 200%',
                // A bit of noise texture overlay could be nice, but CSS radial gradient is performant.
                // Let's add a dark overlay for contrast
			}}
		>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)',
            }} />
        </AbsoluteFill>
	);
};
