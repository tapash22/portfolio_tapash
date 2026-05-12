import gsap from "gsap";
import { useEffect, useRef } from "react";

export function GsapLoader() {
  const dotsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!dotsRef.current) return;

    const dots = dotsRef.current.children;

    const tl = gsap.timeline({ repeat: -1, yoyo: false });

    tl.to(dots, {
      y: -8,
      opacity: 1,
      stagger: 0.15,
      duration: 0.4,
      ease: "power1.inOut",
    }).to(dots, {
      y: 0,
      opacity: 0.4,
      stagger: 0.15,
      duration: 0.4,
      ease: "power1.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-40">
      <div ref={dotsRef} className="flex gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full opacity-40" />
        <span className="w-2 h-2 bg-green-500 rounded-full opacity-40" />
        <span className="w-2 h-2 bg-green-500 rounded-full opacity-40" />
      </div>
    </div>
  );
}
