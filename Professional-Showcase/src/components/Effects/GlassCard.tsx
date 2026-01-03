/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React, {ReactNode} from 'react';

type GlassCardProps = {
	children: ReactNode;
	className?: string;
	style?: React.CSSProperties;
};

export const GlassCard = ({children, className = '', style}: GlassCardProps) => {
	return (
		<div
			className={`relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] overflow-hidden ${className}`}
			style={{
				boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
				...style,
			}}
		>
			<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
			<div className="relative z-10">{children}</div>
		</div>
	);
};
