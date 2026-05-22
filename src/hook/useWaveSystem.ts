import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useEffect } from "react";

// Register premium GSAP engine features
gsap.registerPlugin(DrawSVGPlugin);

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
    const container = containerRef.current;
    if (!container) return;

    // ================= GRID BACKGROUND ANIMATION =================
    let gridTween: gsap.core.Tween | null = null;

    if (boxesRef.current?.length) {
      const validBoxes = boxesRef.current.filter(Boolean);
      gridTween = gsap.fromTo(
        validBoxes,
        { opacity: 0.05 },
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

    // ================= CORE WAVE CREATION ENGINE =================
    const createWave = (direction: WaveDirection, isMobile: boolean) => {
      const currentContainer = containerRef.current;
      if (!currentContainer) return;

      const wave = document.createElement("div");
      const head = document.createElement("div");
      wave.className = "wave-system";

      // Base Wave Node Formatting
      Object.assign(wave.style, {
        position: "absolute",
        pointerEvents: "none",
        borderRadius: "999px",
        zIndex: "10",
        willChange: "transform",
      });

      // Directional Structural Layouts
      if (direction === "y") {
        // MOBILE ONLY: Fixed to horizontal center, originating flat at the absolute bottom
        Object.assign(wave.style, {
          bottom: "0%",
          left: isMobile ? "50%" : "0%",
          width: "4px",
          height: "100%",
        });

        // Ensure the absolute pixel coordinate stays mathematically centered on mobile tracks
        if (isMobile) {
          gsap.set(wave, { xPercent: -50 });
        }
      } else {
        // DESKTOP ONLY
        Object.assign(wave.style, {
          top: "50%",
          right: "0%",
          width: "100%",
          height: "6px",
        });
      }

      // Glow Lens Styles
      Object.assign(head.style, {
        position: "absolute",
        width: "140px",
        height: "140px",
        borderRadius: "50%",
        backdropFilter: "blur(15px)",
        background:
          "radial-gradient(circle, rgba(34,211,238,0.18), rgba(34,211,238,0.08), transparent 70%)",
        filter: isMobile ? "blur(8px)" : "blur(14px)",
        boxShadow: "0 0 50px rgba(34,211,238,0.6)",
        willChange: "transform, opacity",
      });

      if (direction === "y") {
        head.style.bottom = "0px"; // Pin trace directly to bottom start
        head.style.left = "-70px"; // Centers the 140px wide circle on the line midpoint
      } else {
        head.style.right = "0px";
        head.style.top = "-70px";
      }

      wave.appendChild(head);
      currentContainer.appendChild(wave);

      // Animation Timeline
      const waveTl = gsap.timeline({
        onComplete: () => wave.remove(),
      });

      const duration = 6;
      const baseOpacity = isMobile ? 0.4 : 0.6;

      if (direction === "y") {
        // Shoots straight upward towards the top viewport limits
        waveTl.to(
          wave,
          {
            y: () => -1.1 * window.innerHeight,
            duration: duration,
            ease: "none",
          },
          0,
        );

        // Subtle side-to-side snaking sway behavior
        waveTl.to(
          wave,
          {
            x: isMobile ? "+=15" : "+=30", // Tighter oscillation on narrow viewports
            duration: duration / 6,
            repeat: 5,
            yoyo: true,
            ease: "sine.inOut",
          },
          0,
        );
      } else {
        // Desktop horizontal sweep animation parameters
        waveTl.to(
          wave,
          {
            x: () => -1.4 * window.innerWidth,
            duration: duration,
            ease: "none",
          },
          0,
        );

        waveTl.to(
          wave,
          {
            y: "+=30",
            duration: duration / 6,
            repeat: 5,
            yoyo: true,
            ease: "sine.inOut",
          },
          0,
        );
      }

      waveTl.fromTo(
        head,
        { scale: 0.4, opacity: baseOpacity },
        {
          scale: 2.2,
          opacity: baseOpacity + 0.3,
          duration: duration,
          ease: "power1.inOut",
        },
        0,
      );
    };

    // ================= RESPONSIVE ENVIRONMENT =================
    mm.add(
      {
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)",
      },
      (config) => {
        const conditions = config.conditions || { isMobile: false };
        const isMobile = !!conditions.isMobile;
        const activeDirection = isMobile ? "y" : "x";

        const svgText = container.querySelectorAll("svg text");
        const currentBox = boxRef.current;

        const textElements = currentBox
          ? Array.from(currentBox.children).filter(
              (el) =>
                el.tagName.toLowerCase() !== "div" || !el.querySelector("svg"),
            )
          : [];

        const introTl = gsap.timeline({ delay: 0.4 });

        if (svgText.length) {
          introTl
            .from(svgText, {
              drawSVG: "0%",
              duration: 1.5,
              ease: "power3.inOut",
            })
            .to(
              svgText,
              {
                fill: "#ffffff",
                duration: 1.5,
              },
              "-=0.3",
            );
        }

        if (textElements.length) {
          introTl.fromTo(
            textElements,
            {
              opacity: 0,
              x: isMobile ? 40 : -25,
              y: isMobile ? 5 : 0,
            },
            {
              opacity: 1,
              x: 0,
              y: -10,
              duration: 0.5,
              stagger: 0.08,
              ease: "power2.out",
              force3D: true,
            },
            "-=0.4",
          );
        }

        createWave(activeDirection, isMobile);

        const waveSpawner = gsap.delayedCall(2.5, function repeat() {
          createWave(activeDirection, isMobile);
          waveSpawner.restart(true);
        });

        return () => {
          waveSpawner.kill();
          introTl.kill();
          const activeWaves = container.querySelectorAll(".wave-system");
          activeWaves.forEach((w) => w.remove());
        };
      },
    );

    return () => {
      gridTween?.kill();
      mm.revert();
    };
  }, [containerRef, boxesRef, boxRef]);
}
