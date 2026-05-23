import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { AnimatedWaves } from "../componants/landing/AnimatedWaves";

import { useWaveSystem } from "../hook/useWaveSystem";
import image from "/images/home.png";
import mobile_image from "/images/mobile_image.png";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxesRef = useRef<HTMLDivElement[]>([]);
  const navigate = useNavigate();

  useWaveSystem({
    containerRef: containerRef,
    boxesRef,
    boxRef,
  });

  const glowRef = useRef<HTMLDivElement | null>(null);

  // 2. Add this mouse-tracking event handler to your page
  useGSAP(
    () => {
      if (!glowRef.current) return;

      // Create an infinite, automated floating loop for the glow ring
      gsap.to(glowRef.current, {
        x: "+=55",
        y: "-=50",
        duration: 4,
        repeat: -1, // Runs infinitely
        yoyo: true, // Reverses direction smoothly back to origin point
        ease: "sine.inOut", // Soft, non-linear drifting acceleration curve
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative flex h-[84vh] w-full overflow-hidden md:h-[90vh]"
    >
      {/* BACKGROUND GRAPHIC CANVAS LAYERS (Seated safely at z-0) */}
      {/* <BackgroundGrid /> */}
      <AnimatedWaves />

      {/* STATIC DECORATIVE AMBIENT GLOW */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-1/4 left-2/3 z-0 hidden h-150 w-150 rounded-full bg-linear-to-br from-(--neon)/20 via-(--neon)/5 to-transparent opacity-100 shadow-[0_0_100px_rgba(34,255,255,0.5)] ring-8 blur-3xl will-change-transform md:block"
      />
      {/* <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 via-black/5 to-transparent md:bg-linear-to-l md:from-black/80 md:via-black/20" /> */}
      <div className="pointer-events-none absolute inset-0 z-30 bg-linear-to-t from-(--neon)/30 via-(--neon)/10 to-transparent md:left-1/3 md:z-0 md:bg-linear-to-r md:from-black/10 md:via-black/25" />

      {/* INTERACTIVE TEXT CONTENT AREA (Raised safely to z-20) */}
      <div
        ref={boxRef}
        className="relative z-9999 flex h-full w-full transform-gpu flex-col items-center justify-end space-y-0 bg-(--background)/20 px-5 py-0 md:z-40 md:w-1/3 md:justify-center md:space-y-3 md:px-10 md:py-0"
      >
        {/* Absolute linear gradient active across all breakpoints */}
        {/* <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 via-black/5 to-transparent md:bg-linear-to-l md:from-black/50 md:via-black/50" /> */}
        <div className="pointer-events-none mx-auto flex h-14 w-70 items-center justify-end overflow-hidden select-none sm:h-14 sm:w-85 md:mx-0 md:h-18 md:w-120 md:justify-start">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 480 75"
            className="transform-gpu will-change-transform"
          >
            <text
              x="50%"
              y="60%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="text-4xl font-bold"
              fill="transparent"
              stroke="#ffffff"
              strokeWidth="0.6"
              style={{
                fontFamily: "inherit",
                letterSpacing: "0.1em",
              }}
            >
              Tapash Paul
            </text>
          </svg>
        </div>

        <div className="flex flex-col items-center justify-center space-y-2 md:space-y-3">
          <h1 className="transform-gpu text-center text-3xl font-bold tracking-wide text-(--foreground) will-change-transform md:text-start md:text-4xl md:text-(--foreground)">
            Frontend Developer
          </h1>

          <p className="hidden max-w-lg transform-gpu border-r-4 border-l-4 border-(--border) bg-(--background) p-3 text-center text-sm leading-relaxed font-normal tracking-wider text-wrap text-(--foreground) shadow-lg will-change-transform md:block">
            Build responsive, and interactive web applications with modern
            frontend technologies, focusing on smooth user experience and clean
            UI architecture
          </p>

          <div className="relative flex w-full flex-col items-center justify-center space-y-3 rounded-xl border border-white/10 bg-black/20 p-4 shadow-2xl backdrop-blur-md md:flex-row md:space-y-0 md:space-x-5 md:border-none md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
            <button
              onClick={() => navigate("/contact")}
              className="z-50 h-full cursor-pointer rounded-md border-2 border-white bg-black/40 px-10 py-3 text-sm font-semibold tracking-wider whitespace-nowrap text-white uppercase shadow-(--shadoe-footer) transition-transform hover:scale-105 active:scale-95 md:rounded-full md:border-(--border) md:bg-(--sidebar) md:text-(--foreground)"
            >
              Contact Me
            </button>
            <a
              href="/cv/tapash-paul-cv.pdf"
              download
              className="hover:shadow(--shadow) z-50 flex h-full cursor-pointer items-center justify-center rounded-md border-2 border-white bg-black/40 px-8 py-3 text-sm font-semibold tracking-wider whitespace-nowrap text-white uppercase shadow-(--shadow-footer) transition-transform hover:scale-105 hover:shadow-(--shadow-footer) active:scale-95 md:rounded-full md:border-(--border) md:bg-(--sidebar) md:text-(--foreground)"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>

      {/* HERO ILLUSTRATIONS (Isolated cleanly to mid-tier z-10 index on mobile structures) */}
      <div className="pointer-events-none absolute inset-0 z-50 flex h-full w-full items-end justify-center px-5 md:static md:inset-auto md:w-8/12 md:items-end">
        <img
          src={image}
          className="hidden max-h-[85vh] w-full transform-gpu object-contain object-bottom md:block"
          alt="Desktop Hero Layout"
        />
        <img
          src={mobile_image}
          className="mb-0 block h-full w-full transform-gpu object-cover opacity-70 md:hidden"
          alt="Mobile Hero Layout"
        />
      </div>
    </div>
  );
}
