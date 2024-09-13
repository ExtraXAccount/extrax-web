import { CSSProperties } from 'react';

export interface ProgressCircleProps {
  progress: number;
  animate?: boolean;
  animationDuration?: string;
  showPercentage?: boolean;
  showPercentageSymbol?: boolean;
  progressColor?: string;
  bgColor?: string;
  textColor?: string;
  size: number;
  lineWidth?: number;
  percentSpacing?: number;
  textStyle?: CSSProperties;
  roundedStroke?: boolean;
  responsive?: boolean;
  onAnimationEnd?(): void;
}

const radius = 175;
const diameter = Math.round(Math.PI * radius * 2);
const getOffset = (val = 0) => Math.round((100 - Math.min(val, 100)) / 100 * diameter);

export default function ProgressCircle({
  progress = 0,
  animate = true,
  animationDuration = '1s',
  showPercentage = false,
  showPercentageSymbol = true,
  progressColor = 'rgb(76, 154, 255)',
  bgColor = '#C9C9CB',
  textColor = '#6b778c',
  size = 100,
  lineWidth = 25,
  percentSpacing = 10,
  roundedStroke = false,
  responsive = false,
  textStyle = { font: 'bold 4rem' }
}: ProgressCircleProps) {

  const strokeDashoffset = getOffset(Math.max(progress, 0));
  const transition = animate ? `stroke-dashoffset ${animationDuration} ease-out` : undefined;
  const strokeLinecap = roundedStroke ? 'round' : 'butt';
  const svgSize = responsive ? '100%' : size;
  const strokeWidth = lineWidth * radius * 2 / Number(size)

  return (
    <svg width={svgSize} height={svgSize} viewBox="-25 -25 400 400">
      <circle stroke={bgColor} cx="175" cy="175" r="175" strokeWidth={strokeWidth} fill="none"/>
      <circle stroke={progressColor} transform="rotate(-90 175 175)" cx="175" cy="175" r="175" strokeDasharray="1100" strokeWidth={strokeWidth} strokeDashoffset="1100" strokeLinecap={strokeLinecap} fill="none" style={{ strokeDashoffset, transition }} />
      {
        showPercentage &&
        <text style={textStyle} fill={textColor} x={radius} y={radius} textAnchor="middle" dominantBaseline="central">
          {progress}{showPercentageSymbol && <tspan dx={percentSpacing}>%</tspan>}
        </text>
      }
    </svg>
  )
}
