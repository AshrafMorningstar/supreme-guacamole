import {AbsoluteFill} from 'remotion';
import {MainProps} from '../../config';
import {Background} from './Background';

type CardProps = {
  children: React.ReactNode;
  userStats: MainProps['userStats'];
};

export function Card({children, userStats}: CardProps) {
  if (!userStats) {
    return null;
  }

  return (
    <AbsoluteFill className="bg-transparent">
        <Background />
        <AbsoluteFill className="p-1">
            {children}
        </AbsoluteFill>
    </AbsoluteFill>
  );
}