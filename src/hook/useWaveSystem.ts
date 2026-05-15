import gsap from "gsap";
import { useEffect } from "react";

type WaveDirection = "x" | "y";

interface UseWaveSystemProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  boxesRef: React.RefObject<HTMLDivElement[] | null>;
  boxRef: React.RefObject<HTMLDivElement | null>;
}

export function useWaveSystem({
  containerRef,
  boxesRef,
  boxRef,
}: UseWaveSystemProps) {
  useEffect(() => {
    const mm = gsap.matchMedia();

    let isMounted = true;

    // ================= GRID ANIMATION =================
    if (boxesRef.current?.length) {
      const validBoxes = boxesRef.current.filter(Boolean);

      gsap.fromTo(
        validBoxes,
        {
          opacity: 0.05,
        },
        {
          opacity: 0.15,
          duration: 2,
          stagger: {
            each: 0.02,
            from: "start",
          },
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
      );
    }

    // ================= CORE WAVE =================
    const createWave = (direction: WaveDirection, isMobile: boolean) => {
      const container = containerRef.current;

      if (!container) return;

      // ================= CREATE ELEMENTS =================
      const wave = document.createElement("div");
      const head = document.createElement("div");

      wave.className = "wave-system";

      // ================= WAVE STYLE =================
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
        wave.style.left = "0%";
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

      // ================= HEAD STYLE =================
      Object.assign(head.style, {
        position: "absolute",
        width: "140px",
        height: "140px",
        borderRadius: "50%",
        backdropFilter: "blur(15px)",
        background:
          "radial-gradient(circle, rgba(34,211,238,0.18), rgba(34,211,238,0.08), transparent 70%)",
        filter: window.innerWidth < 768 ? "blur(6px)" : "blur(14px)",

        boxShadow: "0 0 50px rgba(34,211,238,0.6)",
        opacity: "0.9",
      });

      // ================= HEAD POSITION =================
      if (direction === "y") {
        head.style.bottom = "30px";
        head.style.left = "-70px";
      } else {
        head.style.right = "0px";
        head.style.top = "-70px";
      }

      // ================= APPEND =================
      wave.appendChild(head);
      container.appendChild(wave);

      const state = {
        progress: 0,
        start: performance.now(),
      };

      const duration = 6000;

      // ================= ANIMATION LOOP =================
      const animate = (time: number) => {
        if (!isMounted) return;

        const elapsed = time - state.start;

        state.progress = elapsed / duration;

        // ================= REMOVE AFTER END =================
        if (state.progress >= 1) {
          wave.remove();
          return;
        }

        // ================= SINE MOVEMENT =================
        const sine = Math.sin(state.progress * Math.PI * 6) * 30;

        // ================= GLOW SCALE =================
        const scale = 0.4 + state.progress * 2;

        // ================= MOBILE MOVE =================
        if (direction === "y") {
          const y = (-70 * state.progress * window.innerHeight) / 100 + sine;

          gsap.set(wave, { y });
        }

        // ================= DESKTOP MOVE =================
        else {
          const x = (-140 * state.progress * window.innerWidth) / 100 + sine;

          gsap.set(wave, { x });
        }

        // ================= GLOW EFFECT =================
        const baseOpacity = isMobile ? 0.3 : 0.6;

        gsap.set(head, {
          scale,
          opacity: baseOpacity + scale * 0.2,
        });

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    };

    // ================= RESPONSIVE =================
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

        // ================= TEXT ANIMATION =================
        const children = Array.from(boxRef.current?.children || []);

        if (children.length) {
          gsap.fromTo(
            children,
            {
              opacity: 0,
              x: isMobile ? 200 : -100,
              y: isMobile ? 0 : 0,
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

        // ================= REPEATING WAVES =================
        const interval = setInterval(() => {
          createWave(isMobile ? "y" : "x", isMobile);
        }, 2000);

        // ================= INITIAL WAVE =================
        createWave(isMobile ? "y" : "x", isMobile);

        // ================= CLEANUP =================
        return () => {
          clearInterval(interval);

          const waves = container.querySelectorAll(".wave-system");

          waves.forEach((wave) => wave.remove());
        };
      },
    );

    // ================= MAIN CLEANUP =================
    return () => {
      isMounted = false;
      mm.revert();
    };
  }, [containerRef, boxesRef, boxRef]);
}
