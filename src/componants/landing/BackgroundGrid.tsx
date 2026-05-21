import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export default function BackgroundGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const pathsRef = useRef<SVGRectElement[]>([]);
  const sheenRef = useRef<HTMLDivElement[]>([]);

  const [totalCards, setTotalCards] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      setTotalCards(window.innerWidth < 768 ? 48 : 100);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Removed the unused 'context' parameter from the callback signature
  useGSAP(
    () => {
      gsap.set(cardsRef.current, {
        opacity: 0,
        scale: 0.5,
        z: -200,
        filter:
          window.innerWidth < 768
            ? "brightness(0.3)"
            : "blur(10px) brightness(0.2)",
      });

      gsap.set(sheenRef.current, { x: "-100%", opacity: 0 });

      const activeTimelines: gsap.core.Timeline[] = [];

      const triggerPopping = () => {
        const currentCount = cardsRef.current.filter(Boolean).length;
        if (!currentCount) return;

        const availableIndices = Array.from(
          { length: currentCount },
          (_, i) => i,
        ).filter(
          (i) => cardsRef.current[i] && !gsap.isTweening(cardsRef.current[i]),
        );

        if (!availableIndices.length) return;

        const idx =
          availableIndices[Math.floor(Math.random() * availableIndices.length)];
        const card = cardsRef.current[idx];
        const path = pathsRef.current[idx];
        const sheen = sheenRef.current[idx];

        if (!path || !card || !sheen) return;

        const length = path.getTotalLength() || 300;

        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        const tl = gsap.timeline({
          onComplete: () => {
            const index = activeTimelines.indexOf(tl);
            if (index > -1) activeTimelines.splice(index, 1);
          },
        });

        activeTimelines.push(tl);

        tl.to(card, {
          opacity: 0.4,
          scale: 1,
          z: 200,
          filter: "blur(0px) brightness(0.6)",
          duration: 1.2,
          ease: "expo.out",
        });

        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.inOut",
          },
          0,
        );

        tl.to(
          sheen,
          {
            x: "100%",
            opacity: 0.8,
            duration: 1.5,
            ease: "power2.inOut",
          },
          0.3,
        );

        tl.to(
          path,
          {
            strokeDashoffset: length,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "+=1",
        );

        tl.to(
          card,
          {
            opacity: 0.15,
            scale: 0.7,
            z: -100,
            filter: "blur(4px) brightness(0.3)",
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<",
        );
      };

      const spawners = [
        gsap.delayedCall(0, function loop1() {
          triggerPopping();
          gsap.delayedCall(window.innerWidth < 768 ? 1.5 : 0.6, loop1);
        }),
        gsap.delayedCall(0.4, function loop2() {
          triggerPopping();
          gsap.delayedCall(window.innerWidth < 768 ? 1.8 : 0.8, loop2);
        }),
        gsap.delayedCall(0.8, function loop3() {
          triggerPopping();
          gsap.delayedCall(window.innerWidth < 768 ? 2.2 : 1.2, loop3);
        }),
      ];

      return () => {
        spawners.forEach((s) => s.kill());
        activeTimelines.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [totalCards] },
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-zinc-950 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0"
      style={{
        perspective: window.innerWidth < 768 ? "1000px" : "1800px",
      }}
    >
      <div
        className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2 p-4 w-[110%] h-[110%]"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(15deg) rotateY(-5deg)",
        }}
      >
        {Array.from({ length: totalCards }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="relative aspect-square w-full h-full transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20">
              <rect
                ref={(el) => {
                  if (el) pathsRef.current[i] = el;
                }}
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="8"
                className="fill-none stroke-[1.5px] stroke-cyan-500/30"
              />
            </svg>

            <div className="relative w-full h-full rounded-lg bg-cyan-950/20 border border-white/3 overflow-hidden backdrop-blur-xs">
              <div
                ref={(el) => {
                  if (el) sheenRef.current[i] = el;
                }}
                className="absolute inset-0 w-[200%] h-full opacity-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.01) 30%, rgba(34,211,238,0.2) 50%, rgba(255,255,255,0.01) 70%, transparent 100%)",
                  transform: "skewX(-15deg)",
                }}
              />
              <div className="absolute inset-0 bg-linear-to-b from-white/4 to-transparent" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
