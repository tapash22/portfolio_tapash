import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const boxRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 20, duration: 1 },
    );
  }, []);

  return (
    <div>
      <h1 ref={boxRef}>Home Page Animation 🚀</h1>
    </div>
  );
}
