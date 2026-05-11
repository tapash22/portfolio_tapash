import gsap from "gsap";
import { useEffect, useRef } from "react";

export function TimeLineSIdeBarWithDot({
  cardCount,
  height,
  animateTrigger,
}: {
  cardCount: number;
  height: number;
  animateTrigger: boolean;
}) {
  const dotsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!animateTrigger) return;

    const tl = gsap.timeline({ repeat: -1 });

    dotsRef.current.forEach((dot) => {
      tl.to(
        dot,
        {
          scale: 1.2,
          opacity: 0.3,
          duration: 0.5,
          ease: "power1.inOut",
        },
        "-=0.2", // overlap for smooth flow
      ).to(
        dot,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
        },
        "-=0.1",
      );
    });
  }, [animateTrigger]);

  return (
    <div
      className="
    absolute
    left-1/2 md:-left-3.5
    -translate-x-1/2
    translate-y-0
    -bottom-5 
    md:top-10 md:bottom-0
    w-1
    rounded-full
    bg-(--border)
      "
      style={{
        height,
      }}
    >
      {/* DOTS CONTAINER */}
      <div
        className="
         -mr-1.5
          h-full flex flex-col justify-between items-end 
        "
      >
        {Array.from({ length: cardCount }).map((_, index) => (
          <span
            key={index}
            ref={(el) => {
              if (el) dotsRef.current[index] = el;
            }}
            className="
                      w-4 h-4 rounded-full
                      bg-(--neon)
                      ring-8 ring-(--neon)/20
                    "
          />
        ))}
      </div>
    </div>
  );
}
