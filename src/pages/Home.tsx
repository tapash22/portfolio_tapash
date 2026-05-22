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

      {/* INTERACTIVE TEXT CONTENT AREA (Raised safely to z-20) */}
      <div
        ref={boxRef}
        className="relative z-40 flex h-full w-full transform-gpu flex-col items-center justify-end space-y-0 bg-(--background)/40 px-5 py-0 shadow-[0_0_100px_rgba(34,255,255,0.09)] md:w-1/3 md:justify-center md:space-y-3 md:px-10 md:py-0"
      >
        <div className="pointer-events-none mx-auto flex h-14 w-70 items-center justify-end overflow-hidden select-none sm:h-14 sm:w-85 md:mx-0 md:h-18 md:w-120 md:justify-start">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 480 75"
            className="transform-gpu will-change-transform"
          >
            <text
              // Starts at 50% width on mobile, returns to 0 on desktop viewports
              x="50%"
              y="60%"
              dominantBaseline="middle"
              // Centers the text anchor point on mobile, resets to left-aligned on desktop
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

        <h1 className="transform-gpu text-center text-2xl font-bold tracking-wide text-(--foreground) will-change-transform md:text-start md:text-4xl">
          Front End Developer
        </h1>

        <p className="hidden max-w-lg transform-gpu border-r-4 border-l-4 border-(--border) bg-(--background)/50 p-3 text-center text-sm leading-relaxed font-normal tracking-wider text-wrap text-(--muted) will-change-transform md:block">
          Build responsive, and interactive web applications with modern
          frontend technologies, focusing on smooth user experience and clean UI
          architecture
        </p>

        <div className="md::py-0 flex h-auto transform-gpu flex-col space-y-3 py-3 will-change-transform md:flex-row md:space-y-0 md:space-x-5">
          <button
            onClick={() => navigate("/contact")}
            className="z-50 h-full cursor-pointer rounded-sm border-2 border-(--border) bg-(--sidebar)/30 px-8 py-2 text-sm font-semibold tracking-wider whitespace-nowrap text-(--foreground) uppercase shadow-(--shadoe-footer) transition-transform hover:scale-105 active:scale-95 md:rounded-full md:bg-(--sidebar)"
          >
            Contact Me
          </button>
          <a
            href="/cv/tapash-paul-cv.pdf"
            download
            className="z-50 flex cursor-pointer items-center justify-center rounded-sm border-2 border-(--border) bg-(--sidebar)/30 px-8 py-2 text-sm font-semibold tracking-wider whitespace-nowrap text-(--foreground) uppercase shadow-(--shadoe-footer) transition-transform hover:scale-105 active:scale-95 md:rounded-full md:bg-(--sidebar)"
          >
            Download CV
          </a>
        </div>
      </div>

      {/* HERO ILLUSTRATIONS (Isolated cleanly to mid-tier z-10 index on mobile structures) */}
      <div className="pointer-events-none absolute inset-0 z-30 flex h-full w-full items-end justify-center px-5 md:static md:inset-auto md:w-7/12 md:items-end">
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
