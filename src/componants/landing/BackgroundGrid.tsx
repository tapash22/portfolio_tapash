import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function BackgroundGrid() {
  const boxesRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    gsap.set(boxesRef.current, {
      opacity: 0.05,
    });

    const blink = () => {
      const randomBox =
        boxesRef.current[Math.floor(Math.random() * boxesRef.current.length)];

      gsap.fromTo(
        randomBox,
        {
          opacity: 0.9,
        },
        {
          opacity: 0.05,
          duration: 0.3,
          ease: "sine.out",
        },
      );
    };

    gsap.timeline({
      repeat: -1,
      onRepeat: blink,
    });

    gsap.delayedCall(0, function repeatBlink() {
      blink();
      gsap.delayedCall(0.1, repeatBlink);
    });
  });

  return (
    <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-12 grid-rows-8 z-0">
      {Array.from({ length: 96 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) boxesRef.current[i] = el;
          }}
          className=" bg-transparent border
          border-(--box)
            md:border-(--border)
            transition-all"
        />
      ))}
    </div>
  );
}
