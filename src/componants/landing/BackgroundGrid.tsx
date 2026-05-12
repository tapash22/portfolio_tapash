import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function BackgroundGrid() {
  const boxesRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    gsap.fromTo(
      boxesRef.current,
      { opacity: 0.05 },
      {
        opacity: 0.15,
        duration: 2,
        stagger: { each: 0.02, from: "random" },
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      },
    );
  });

  return (
    <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 z-0">
      {Array.from({ length: 96 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) boxesRef.current[i] = el;
          }}
          className="border border-cyan-400/5 bg-cyan-400/2"
        />
      ))}
    </div>
  );
}
