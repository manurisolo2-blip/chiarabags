import { useEffect, useId, useRef, useState } from 'react';

interface ChLogoProps {
  monogramOnly?: boolean;
  tone?: 'dark' | 'light';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SIZE_MAP = {
  sm: { width: 72, height: 34, monoSize: 23, subSize: 6.4, monoY: 22, subY: 31 },
  md: { width: 92, height: 42, monoSize: 29, subSize: 7.5, monoY: 27, subY: 38 },
  lg: { width: 132, height: 58, monoSize: 42, subSize: 10.2, monoY: 38, subY: 53 },
  xl: { width: 170, height: 74, monoSize: 56, subSize: 13, monoY: 50, subY: 68 },
};

export function ChLogo({
  monogramOnly = false,
  tone = 'dark',
  className = '',
  size = 'md',
}: ChLogoProps) {
  const chRef = useRef<SVGTextElement>(null);
  const metrics = SIZE_MAP[size];
  const [measuredWidth, setMeasuredWidth] = useState<number>(metrics.width * 0.68);
  const titleId = useId();

  const ink = tone === 'light' ? '#F6F4EF' : '#121212';

  useEffect(() => {
    let mounted = true;
    const measure = () => {
      if (!mounted || !chRef.current) return;
      const len = chRef.current.getComputedTextLength();
      if (len > 10) {
        setMeasuredWidth(len);
      }
    };

    measure();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }

    return () => {
      mounted = false;
    };
  }, [size, monogramOnly]);

  if (monogramOnly) {
    const viewW = metrics.width * 0.85;
    const viewH = metrics.monoSize * 1.25;
    return (
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        width={viewW}
        height={viewH}
        role="img"
        aria-labelledby={titleId}
        className={`block select-none ${className}`}
      >
        <title id={titleId}>CH.</title>
        <text
          x={viewW / 2}
          y={viewH * 0.8}
          textAnchor="middle"
          fill={ink}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: `${metrics.monoSize}px`,
            letterSpacing: '-0.03em',
          }}
        >
          CH.
        </text>
      </svg>
    );
  }

  const centerX = metrics.width / 2;
  const startX = centerX - measuredWidth / 2;

  return (
    <svg
      viewBox={`0 0 ${metrics.width} ${metrics.height}`}
      width={metrics.width}
      height={metrics.height}
      role="img"
      aria-labelledby={titleId}
      className={`block select-none ${className}`}
    >
      <title id={titleId}>CH. Chiara Bags</title>
      <text
        ref={chRef}
        x={centerX}
        y={metrics.monoY}
        textAnchor="middle"
        fill={ink}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: `${metrics.monoSize}px`,
          letterSpacing: '-0.03em',
        }}
      >
        CH.
      </text>
      <text
        x={startX}
        y={metrics.subY}
        textAnchor="start"
        textLength={measuredWidth}
        lengthAdjust="spacing"
        fill={ink}
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 300,
          fontSize: `${metrics.subSize}px`,
        }}
      >
        CHIARA BAGS
      </text>
    </svg>
  );
}
