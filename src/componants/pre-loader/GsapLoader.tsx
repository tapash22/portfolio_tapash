import gsap from "gsap";
import { useEffect, useRef } from "react";

export function GsapLoader() {
  const dotsRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!dotsRef.current) return;
    const dots = dotsRef.current.children;

    const tl = gsap.timeline({ repeat: -1 });

    // Buttery smooth overlapping wave choreography using a small stagger index offset
    tl.to(dots, {
      y: -10,
      opacity: 1,
      stagger: 0.12,
      duration: 0.4,
      ease: "power2.out",
    }).to(
      dots,
      {
        y: 0,
        opacity: 0.4,
        stagger: 0.12,
        duration: 0.4,
        ease: "power2.in",
      },
      "-=0.25",
    ); // Seamless connection offset

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto absolute top-0 bottom-0 left-0 z-9999 flex h-fit w-full touch-none items-center justify-center bg-(--background)/60 backdrop-blur-md select-none md:left-1/4 md:h-[90vh] md:w-2/3"
    >
      <div className="flex flex-col items-center space-y-4">
        <div ref={dotsRef} className="flex gap-2.5">
          <span className="h-3 w-3 transform-gpu rounded-full bg-[#00FF66] opacity-40 shadow-[0_0_10px_rgba(0,255,102,0.5)] will-change-transform" />
          <span className="h-3 w-3 transform-gpu rounded-full bg-[#00FF66] opacity-40 shadow-[0_0_20px_rgba(0,255,102,0.5)] will-change-transform" />
          <span className="h-3 w-3 transform-gpu rounded-full bg-[#00FF66] opacity-40 shadow-[0_0_20px_rgba(0,255,102,0.5)] will-change-transform" />
        </div>
      </div>
    </div>
  );
}
