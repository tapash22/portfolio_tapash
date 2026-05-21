import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useEffect, useRef } from "react";

gsap.registerPlugin(MotionPathPlugin);

export function StockLine() {
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    gsap.to(dotRef.current, {
      duration: 4,
      repeat: -1,
      ease: "none",
      motionPath: {
        path: "#stockPath",
        align: "#stockPath",
        autoRotate: true,
      },
    });
  }, []);
  //   const pathRef = useRef<SVGPathElement>(null);

  //   useEffect(() => {
  //     gsap.fromTo(
  //       pathRef.current,
  //       {
  //         strokeDasharray: 1000,
  //         strokeDashoffset: 1000,
  //       },
  //       {
  //         strokeDashoffset: 0,
  //         duration: 2,
  //         ease: "power2.out",
  //       },
  //     );
  //   }, []);

  return (
    <svg viewBox="0 0 500 200" className="w-full">
      <path
        id="stockPath"
        d="M0 150 L80 120 L160 140 L240 60 L320 90 L400 30 L500 70"
        fill="none"
        stroke="cyan"
        strokeWidth="3"
      />
      <circle ref={dotRef} r="8" fill="cyan" />
    </svg>
  );
}
