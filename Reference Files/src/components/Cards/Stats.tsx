/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { UserStats } from '../../config';
import { interpolateFactory } from '../../functions/utils';
import Close from '../SVGs/close';
import Commit from '../SVGs/commit';
import Contribution from '../SVGs/contribution';
import Fork from '../SVGs/fork';
import Open from '../SVGs/open';
import PlusMinus from '../SVGs/plusminus';
import PullRequest from '../SVGs/pull-request';
import Star from '../SVGs/star';
import View from '../SVGs/view';
import { AnimatedCounter } from '../Effects/AnimatedCounter';
import { GlassCard } from '../Effects/GlassCard';

export function Stats({ userStats }: { userStats: UserStats }) {
	const frame = useCurrentFrame();

	const firstFields: {
		icon?;
		label: string;
		value: number;
		color?: string;
	}[] = [
			{
				icon: Star,
				label: 'Stars',
				value: userStats.starCount,
                color: 'text-amber-400'
			},
			{ icon: Fork, label: 'Forks', value: userStats.forkCount, color: 'text-blue-400' },
			{ icon: Commit, label: 'Commits', value: userStats.totalCommits, color: 'text-red-400' },
			{
				icon: PullRequest,
				label: 'Pull Requests',
				value: userStats.totalPullRequests,
                color: 'text-indigo-400'
			},
			{ icon: Open, label: 'Issues Opened', value: userStats.openIssues, color: 'text-green-400' },
			{ icon: Close, label: 'Issues Closed', value: userStats.closedIssues, color: 'text-emerald-400' },
			{ icon: View, label: 'Repo Views', value: userStats.repoViews, color: 'text-pink-400' },
			{
				icon: PlusMinus,
				label: 'Lines Changed',
				value: userStats.linesOfCodeChanged,
                color: 'text-gray-400'
			},
			{
				icon: Contribution,
				label: 'Total Contributions',
				value: userStats.totalContributions,
                color: 'text-teal-400'
			},
		];

	return (
		<AbsoluteFill className="bg-transparent p-4">
			<GlassCard className="p-6 h-full flex flex-col justify-center">
                <div className="space-y-3">
					{firstFields.map((field, i) => (
						<div
							key={`${field.label}`}
							className="flex flex-row justify-between items-center p-2 rounded-lg hover:bg-white/5 transition-colors"
							style={{ 
                                opacity: interpolateFactory(frame, i * 2, 10),
                                transform: `translateX(${interpolateFactory(frame, i * 2, 10) === 1 ? 0 : -20}px)`
                            }}
						>
							<div className="flex gap-3 items-center">
								{field.icon && <div className={`${field.color} drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]`}><field.icon className="w-5 h-5" /></div>}
								<p className="text-sm font-medium text-gray-200">
									{field.label}
								</p>
							</div>
							<p className="text-right text-lg font-bold text-white font-mono drop-shadow-md">
								<AnimatedCounter value={field.value} duration={3} startFrame={(i + 1) * 3} />
							</p>
						</div>
					))}
                </div>
			</GlassCard>
		</AbsoluteFill>
	);
}
