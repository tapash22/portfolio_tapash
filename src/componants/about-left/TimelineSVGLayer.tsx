// TimelineSVGLayer.tsx
import { RefObject } from "react";

interface TimelineSVGLayerProps {
  pathStrings: string[];
  pathRefs: RefObject<(SVGPathElement | null)[]>;
  dotRefs: RefObject<(SVGCircleElement | null)[]>;
}

export const TimelineSVGLayer = ({
  pathStrings,
  pathRefs,
  dotRefs,
}: TimelineSVGLayerProps) => {
  return (
    <>
      {/* LAYER 1: Background Vector Track Lines (z-10) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
        <defs>
          <linearGradient id="neon-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
            <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
          </linearGradient>
        </defs>
        {pathStrings.map((d, index) => {
          if (!d) return null;
          return (
            <path
              key={`line-${index}`}
              ref={(el) => {
                if (pathRefs.current) pathRefs.current[index] = el;
              }}
              d={d}
              fill="none"
              stroke="url(#neon-glow)"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* LAYER 2: Foreground Glowing Particles (z-30) 
          This container sits safely above the z-20 cards!
      */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible">
        {pathStrings.map((d, index) => {
          if (!d) return null;
          return (
            <circle
              key={`dot-${index}`}
              ref={(el) => {
                if (dotRefs.current) dotRefs.current[index] = el;
              }}
              r="5" // Made slightly larger so it looks sharp on the border edge
              fill="#22d3ee"
              style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }}
            />
          );
        })}
      </svg>
    </>
  );
};
