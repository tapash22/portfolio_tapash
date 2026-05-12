import gsap from "gsap";
import { useEffect } from "react";

type WaveDirection = "x" | "y";

interface UseWaveSystemProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  boxesRef: React.RefObject<HTMLDivElement[]>;
  boxRef: React.RefObject<HTMLDivElement | null>;
}

export function useWaveSystem({
  containerRef,
  boxesRef,
  boxRef,
}: UseWaveSystemProps) {
  useEffect(() => {
    const mm = gsap.matchMedia();

    // ================= GRID =================
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

    // ================= CORE WAVE =================
    const createWave = (direction: WaveDirection, isMobile: boolean) => {
      const container = containerRef.current;
      if (!container) return;

      const wave = document.createElement("div");
      const head = document.createElement("div");

      // ================= WAVE LINE =================
      Object.assign(wave.style, {
        position: "absolute",
        pointerEvents: "none",
        borderRadius: "999px",
        zIndex: "10",
        willChange: "transform",
      });

      // ================= MOBILE =================
      if (direction === "y") {
        wave.style.bottom = "0%";
        wave.style.left = "50%";
        wave.style.width = "4px";
        wave.style.height = "100%";
      }

      // ================= DESKTOP =================
      else {
        wave.style.top = "50%";
        wave.style.right = "0%";
        wave.style.width = "100%";
        wave.style.height = "6px";
      }

      // ================= HEAD =================
      Object.assign(head.style, {
        position: "absolute",
        width: "140px",
        height: "140px",
        borderRadius: "50%",
        backdropFilter: "blur(15px)",
        background:
          "radial-gradient(circle, rgba(34,211,238,0.18), rgba(34,211,238,0.08), transparent 70%)",
        filter: "blur(14px)",
        boxShadow: "0 0 50px rgba(34,211,238,0.6)",
        opacity: "0.9",
      });

      if (direction === "y") {
        head.style.bottom = "0px";
        head.style.left = "-70px";
      } else {
        head.style.right = "0px";
        head.style.top = "-70px";
      }

      wave.appendChild(head);
      container.appendChild(wave);

      const state = {
        progress: 0,
        start: performance.now(),
      };

      const duration = 6000;

      const animate = (time: number) => {
        const elapsed = time - state.start;
        state.progress = elapsed / duration;

        if (state.progress >= 1) {
          wave.remove();
          return;
        }

        const sine = Math.sin(state.progress * Math.PI * 6) * 30;
        const scale = 0.4 + state.progress * 2;

        if (direction === "y") {
          const y = (-70 * state.progress * window.innerHeight) / 100 + sine;

          gsap.set(wave, { y });
        } else {
          const x = (-140 * state.progress * window.innerWidth) / 100 + sine;

          gsap.set(wave, { x });
        }

        const baseOpacity = isMobile ? 0.3 : 0.6;

        gsap.set(head, {
          scale,
          opacity: baseOpacity + scale * 0.2,
        });

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    };

    // ================= MATCH MEDIA =================
    mm.add(
      {
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)",
      },
      (context) => {
        const { isMobile } = context.conditions as {
          isMobile: boolean;
        };

        const container = containerRef.current;
        if (!container) return;

        // ================= TEXT =================
        if (boxRef.current) {
          gsap.fromTo(
            boxRef.current.children,
            {
              opacity: 0,
              x: isMobile ? 0 : -100,
              y: isMobile ? 80 : 0,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.8,
              stagger: 0.18,
              ease: "power3.out",
            },
          );
        }

        const interval = setInterval(() => {
          createWave(isMobile ? "y" : "x", isMobile);
        }, 2000);

        createWave(isMobile ? "y" : "x", isMobile);

        return () => {
          clearInterval(interval);
          container.innerHTML = "";
        };
      },
    );

    return () => mm.revert();
  }, [containerRef, boxesRef, boxRef]);
}
