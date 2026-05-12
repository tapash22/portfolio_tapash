import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import image from "/images/home.png";
import mobile_image from "/images/mobile_image.png";

gsap.registerPlugin(useGSAP);

export default function App() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const boxesRef = useRef<HTMLDivElement[]>([]);
  const container = useRef<HTMLDivElement | null>(null);
  const waveContainer = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const handleLink = () => navigate("/contact");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ================= GRID ANIMATION =================
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

      mm.add(
        {
          isDesktop: "(min-width: 769px)",
          isMobile: "(max-width: 768px)",
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };
          const containerEl = waveContainer.current;

          // ================= TEXT ANIMATION =================
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

          if (!containerEl) return;

          // ================= WAVE CREATION =================
          const createWave = () => {
            const wave = document.createElement("div");
            const head = document.createElement("div");

            wave.style.position = "absolute";
            wave.style.pointerEvents = "none";
            wave.style.borderRadius = "999px";

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

            head.style.position = "absolute";
            head.style.width = "140px";
            head.style.height = "140px";
            head.style.borderRadius = "50%";
            head.style.backdropFilter = "blur(15px)";
            head.style.background =
              "linear-gradient(to bottom right, rgba(34,211,238,0.4), rgba(34,211,238,0.3), transparent)";
            head.style.filter = "blur(18px)";
            head.style.boxShadow = "0 0 50px rgba(34,211,238,0.9)";
            head.style.opacity = "0.9";

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
                const y =
                  (-70 * state.progress * window.innerHeight) / 100 + sine;
                gsap.set(wave, { y });
              } else {
                const x =
                  (-140 * state.progress * window.innerWidth) / 100 + sine;
                gsap.set(wave, { x });
              }

              // FIXED: Calculate actual numbers instead of passing strings
              const baseOpacity = isMobile ? 0.3 : 0.6;
              const finalOpacity = baseOpacity + scale * 0.2; // Keep it under 1.0

              gsap.set(head, {
                scale: scale,
                opacity: finalOpacity,
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
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="relative w-full h-[84vh] overflow-hidden bg-black/8 flex"
    >
      {/* GRID */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 z-0">
        {Array.from({ length: 96 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) boxesRef.current[i] = el;
            }}
            className="border border-cyan-400/5 bg-cyan-400/2"
          />
        ))}
      </div>

      {/* WAVE CONTAINER */}
      <div
        ref={waveContainer}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      />

      {/* 🟦 STATIC 3D RIGHT SIDE CIRCLE */}
      <div
        className="
        hidden
          md:block
          absolute
          right-16
          bottom-0
          -translate-y-1/2
          w-80
          h-80
          rounded-full
          bg-linear-to-br
          from-cyan-400/50
          via-cyan-400/10
          to-transparent
          blur-2xl
          shadow-[0_0_120px_rgba(34,211,238,0.4)]
        "
      />

      {/* LEFT CONTENT */}
      <div
        ref={boxRef}
        className="
          w-full
          md:w-1/2
          flex
          flex-col
          justify-end
          md:justify-center
          space-y-0
          md:space-y-3
          px-5
          md:px-10
          py-5
          md:py-0
          z-10
          relative
        "
      >
        <h1
          className="
            text-xl
            md:text-2xl
            font-bold
            text-center md:text-start
            text-(--foreground)
            tracking-wider
            opacity-80
          "
        >
          I am Tapash Paul
        </h1>

        <h1
          className="
            text-2xl
            sm:text-4xl
            md:text-5xl
            font-bold
            text-center md:text-start
            tracking-wide
            text-(--foreground)
          "
        >
          Front End Developer
        </h1>

        <p
          className="
            text-sm
            hidden
            md:block
            text-(--muted)
            tracking-wide
          "
        >
          I build modern, responsive and animated web experiences with clean UI
          and performance in mind.
        </p>

        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-2
            md:gap-5
            p-2
          "
        >
          <button
            onClick={handleLink}
            className="
              bg-(--button-color)
              text-(--foreground)
              text-sm
              tracking-wider
           shadow-(--shadow)
              px-10
              py-3
              rounded-full
              uppercase
              hover:scale-105
              active:scale-95
              transition-transform
              duration-300
            "
          >
            Contact Me
          </button>

          <a
            href="/cv/tapash-paul-cv.pdf"
            download
            className="
              border-2
              border-(--border)
              text-(--foreground)
              text-sm
              tracking-wider
              px-6
              py-3
              rounded-full
              text-center
              uppercase
              hover:bg-(--button-color)
              hover:scale-105
              active:scale-95
              transition-all
              duration-300
            "
          >
            Download CV
          </a>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="absolute md:static w-full md:w-7/12 h-full flex justify-center items-start md:items-end z-0">
        <img src={image} className="hidden md:block w-full" />
        <img src={mobile_image} className="block md:hidden w-auto px-2" />
      </div>
    </div>
  );
}
