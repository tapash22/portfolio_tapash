import { useEffect, useRef } from "react";
import gsap from "gsap";
import { fadeInUp } from "../animations/gsap";

export default function Home() {
  const boxRef = useRef<HTMLHeadingElement | null>(null);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 20, duration: 1 },
    );

    fadeInUp(titleRef.current);
    fadeInUp(descRef.current);
  }, []);

  return (
    <div className="bg-red-900 h-screen">
      <h1 className="#text=-xl font-bold text-white" ref={boxRef}>
        Home Page Animation OLD 🚀
      </h1>

      <h1 ref={titleRef} className="text-4xl font-bold">
        🚀 Home Page Animation
      </h1>

      <p ref={descRef} className="text-lg text-slate-300">
        GSAP reusable animation helper working in TypeScript
      </p>
    </div>
  );
}
