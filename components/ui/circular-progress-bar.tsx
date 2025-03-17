import React from 'react';

interface Props {
  percentage: number;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

const CircularProgressFilled = ({ percentage = 25, size = 24, color = '#4338ca', backgroundColor = '#e5e7eb' }: Props) => {
  // Calculate the angle for the fill based on percentage
  const angle = (percentage / 100) * 360;

  // Generate SVG path for the colored fill - now clockwise
  const generatePath = () => {
    if (percentage >= 100) {
      return `M 0 0 L 0 -1 A 1 1 0 1 1 0 -1 Z`;
    }

    const [startX, startY] = [0, -1]; // Start at the top
    const largeArcFlag = percentage > 50 ? 1 : 0;
    const angleRad = (angle + 270) * (Math.PI / 180); // +270 to start from top and go clockwise
    const endX = Math.cos(angleRad);
    const endY = Math.sin(angleRad);

    return `M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Background circle */}
      <div
        className="absolute inset-0 rounded-full outline outline-1"
        style={{ backgroundColor, outlineColor: color }}
      />

      {/* Progress circle with clip path */}
      <svg
        width={size}
        height={size}
        viewBox="-1 -1 2 2"
        className="absolute inset-0"
      >
        <path
          d={generatePath()}
          fill={color}
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
    </div>
  );
};

export default CircularProgressFilled;