export default function PercentCircle({
  radix,
  strokeWidth,
  percent = 0.2,
  bgColor = '#C9C9CB',
  strokeColor = '#38AD3D',
}) {
  const renderPercent = percent > 0 ? Math.max(percent, 0.1) : 0
  return (
    <svg width={radix * 2} height={radix * 2}>
      <circle
        cx={radix}
        cy={radix}
        r={radix - strokeWidth}
        strokeWidth={strokeWidth}
        stroke={bgColor}
        fill="none"
        // strokeDasharray="0 1069"
      ></circle>
      <circle
        cx={radix}
        cy={radix}
        r={radix - strokeWidth}
        strokeWidth={strokeWidth}
        stroke={strokeColor}
        fill="none"
        transform={`matrix(0,-1,1,0,0,${radix * 2})`}
        strokeDasharray={2 * Math.PI * radix * renderPercent + ` ${2 * Math.PI * radix}`}
      ></circle>
    </svg>
  )
}
