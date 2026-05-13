import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function FibonacciSVGDrawingGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const pathsRef = useRef<SVGRectElement[]>([]);
  const sheenRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      // Initial hidden/blurred state
      gsap.set(cardsRef.current, {
        opacity: 0.7,
        scale: 0.5,
        z: -100,
        filter: "blur(10px) brightness(0.5) ",
      });

      // Sheen starts off-screen to the left
      gsap.set(sheenRef.current, { x: "-150%", opacity: 0 });

      const triggerPopping = () => {
        const availableIndices = Array.from(
          { length: 100 },
          (_, i) => i,
        ).filter((i) => !gsap.isTweening(cardsRef.current[i]));

        if (availableIndices.length === 0) return;

        const idx =
          availableIndices[Math.floor(Math.random() * availableIndices.length)];
        const card = cardsRef.current[idx];
        const path = pathsRef.current[idx];
        const sheen = sheenRef.current[idx];
        const length = path.getTotalLength();

        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        const tl = gsap.timeline();

        // 1. POP & FOCUS
        tl.to(card, {
          opacity: 0.4,
          scale: 1,
          z: 200,
          filter: "blur(0px) brightness(0.6)",
          duration: 1.2,
          ease: "expo.out",
        });

        // 2. BORDER DRAW
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "0",
        );

        // 3. THE SHEEN SWEEP (This makes it look "cool")
        tl.to(
          sheen,
          {
            x: "150%",
            opacity: 0.8,
            duration: 1.5,
            ease: "power1.inOut",
          },
          "=0.5",
        );

        // 4. HOLD
        tl.to({}, { duration: 1 });

        // 5. REVERSE & SINK
        tl.to(path, {
          strokeDashoffset: length,
          duration: 1,
          ease: "power1.inOut",
          filter: "blur(50%)",
        });

        tl.to(
          card,
          {
            opacity: 0.5,
            scale: 0.9,
            z: -100,
            filter: "blur(2px) brightness(0.5)",
            duration: 1.2,
            ease: "power1.inOut",
          },
          "<",
        );

        gsap.delayedCall(0.8, triggerPopping);
      };

      for (let i = 0; i < 3; i++) {
        gsap.delayedCall(i * 0.6, triggerPopping);
      }
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-(--sidebar)/20 flex items-center justify-center overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      <div
        className="grid grid-cols-4 md:grid-cols-12 gap-1 p-1 min-h-full w-fit"
        style={{ transformStyle: "preserve-3d" }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="relative aspect-square w-full h-full transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* 1. SVG Stroke */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-20">
              <rect
                ref={(el) => {
                  if (el) pathsRef.current[i] = el;
                }}
                x="1"
                y="1"
                width="calc(100% - 2px)"
                height="calc(100% - 2px)"
                rx="6"
                className="fill-none stroke-1 stroke-(--neon) shadow-(--shadow)"
              />
            </svg>

            {/* 2. The Box Container */}
            <div className="relative w-full h-full rounded-md bg-cyan-950/50 border border-(--neon)/50 overflow-hidden shadow-inner">
              {/* 3. The Sheen/Shine Layer */}
              <div
                ref={(el) => {
                  if (el) sheenRef.current[i] = el;
                }}
                className="absolute inset-0 w-[200%] h-full opacity-0 z-10"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.4) 55%, transparent 100%)",
                  transform: "skewX(-5deg)",
                }}
              />

              {/* 4. Subtle Base Reflection */}
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
