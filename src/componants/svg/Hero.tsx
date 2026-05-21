import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function Hero() {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".title", {
        y: 50,
        opacity: 0,
        duration: 1,
      })
        .from(".subtitle", {
          y: 30,
          opacity: 0,
          duration: 0.8,
        })
        .from(".btn", {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
        });
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <h1 className="title">Hello Portfolio</h1>
      <p className="subtitle">Frontend Developer</p>
      <button className="btn">View Work</button>
    </div>
  );
}
