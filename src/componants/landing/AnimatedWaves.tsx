import { forwardRef } from "react";

interface AnimatedWavesProps {
  className?: string;
}

/**
 * AnimatedWaves Layer Component
 * Establishes a hardware-accelerated mounting viewport plane for GSAP particle vectors.
 */
export const AnimatedWaves = forwardRef<HTMLDivElement, AnimatedWavesProps>(
  ({ className = "" }, ref) => {
    return (
      <div
        ref={ref}
        data-wave-layer="true"
        className={`wave-portal pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
        style={{ willChange: "transform" }}
      />
    );
  },
);
