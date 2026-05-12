import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function AnimatedWaves() {
  const waveContainer = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const containerEl = waveContainer.current;
    if (!containerEl) return;

    mm.add(
      { isDesktop: "(min-width: 769px)", isMobile: "(max-width: 768px)" },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };

        const createWave = () => {
          const wave = document.createElement("div");
          const head = document.createElement("div");

          // Styling
          Object.assign(wave.style, {
            position: "absolute",
            pointerEvents: "none",
            borderRadius: "999px",
            background: "transparent",
          });

          if (isMobile) {
            wave.style.bottom = "0%";
            wave.style.left = "50%";
            wave.style.width = "4px";
            wave.style.height = "100%";
            head.style.bottom = "0px";
            head.style.left = "-70px";
          } else {
            wave.style.top = "50%";
            wave.style.right = "0%";
            wave.style.width = "100%";
            wave.style.height = "6px";
            head.style.right = "0px";
            head.style.top = "-70px";
          }

          Object.assign(head.style, {
            position: "absolute",
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            filter: "blur(18px)",
            opacity: "0.9",
            background:
              "linear-gradient(to bottom right, rgba(34,211,238,0.4), rgba(34,211,238,0.3), transparent)",
            boxShadow: "0 0 50px rgba(34,211,238,0.9)",
          });

          wave.appendChild(head);
          containerEl.appendChild(wave);

          const state = { progress: 0, start: performance.now() };
          const duration = 6000;

          const animate = (time: number) => {
            const elapsed = time - state.start;
            state.progress = elapsed / duration;
            if (state.progress >= 1) {
              wave.remove();
              return;
            }

            const sine = Math.sin(state.progress * Math.PI * 6) * 30;
            const scale = 0.1 + state.progress * 2;

            if (isMobile) {
              gsap.set(wave, {
                y: (-70 * state.progress * window.innerHeight) / 100 + sine,
              });
            } else {
              gsap.set(wave, {
                x: (-140 * state.progress * window.innerWidth) / 100 + sine,
              });
            }

            gsap.set(head, {
              scale,
              opacity: (isMobile ? 0.3 : 0.6) + scale * 0.2,
            });
            requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        };

        const interval = setInterval(createWave, 2000);
        createWave();
        return () => {
          clearInterval(interval);
          containerEl.innerHTML = "";
        };
      },
    );
  });

  return (
    <div
      ref={waveContainer}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    />
  );
}
