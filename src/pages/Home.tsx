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
        x: "+=25",
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
      className="relative w-full h-[90vh] overflow-hidden flex"
    >
      {/* BACKGROUND GRAPHIC CANVAS LAYERS (Seated safely at z-0) */}
      {/* <BackgroundGrid /> */}
      <AnimatedWaves />

      {/* STATIC DECORATIVE AMBIENT GLOW */}
      <div
        ref={glowRef}
        className="hidden md:block absolute top-1/4 left-2/3 ring-8 w-150 h-150 rounded-full bg-linear-to-br from-(--neon)/20 via-(--neon)/5 to-transparent blur-3xl shadow-[0_0_50px_rgba(34,255,255,0.5)] pointer-events-none z-0 will-change-transform opacity-50"
      />

      {/* INTERACTIVE TEXT CONTENT AREA (Raised safely to z-20) */}
      <div
        ref={boxRef}
        className="w-full md:w-1/2 flex flex-col justify-end md:justify-center space-y-2 px-5 md:px-10 py-10 md:py-0 z-20 relative transform-gpu bg-(--sidebar)/10 rounded-tr-full rounded-br-full shadow-[0_0_70px_rgba(34,255,255,0.02)] "
      >
        <div className="w-70 h-12.5 sm:w-85 sm:h-15 md:w-120 md:h-18 flex items-center justify-center md:justify-start overflow-hidden select-none pointer-events-none mx-auto md:mx-0">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 480 75"
            className="will-change-transform transform-gpu"
          >
            <text
              // Starts at 50% width on mobile, returns to 0 on desktop viewports
              x="50%"
              y="70%"
              dominantBaseline="middle"
              // Centers the text anchor point on mobile, resets to left-aligned on desktop
              textAnchor="end"
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

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center md:text-start tracking-wide text-(--foreground) will-change-transform transform-gpu">
          Front End Developer
        </h1>

        <p className="text-sm hidden md:block text-(--muted) tracking-wide max-w-md leading-relaxed will-change-transform transform-gpu">
          I build modern, responsive and animated web experiences...
        </p>

        <div className="flex flex-col sm:flex-row gap-3 p-3 md:gap-5  will-change-transform transform-gpu">
          <button
            onClick={() => navigate("/contact")}
            className="bg-(--sidebar) text-(--foreground) border-2 border-(--border) shadow-(--shadoe-footer) text-sm px-10 py-3 rounded-full font-semibold uppercase hover:scale-105 active:scale-95 transition-transform cursor-pointer z-50 tracking-wider "
          >
            Contact Me
          </button>
          <a
            href="/cv/tapash-paul-cv.pdf"
            download
            className="bg-(--sidebar) border-2 border-(--border) md:border-0 md:bg-(sidebar) text-(--foreground) text-sm px-8 py-3 rounded-full text-center font-semibold uppercase hover:bg-(--button-color) hover:border-transparent hover:scale-105 active:scale-95 transition-all cursor-pointer z-50 tracking-wider shadow-(--shadow-footer) "
          >
            Download CV
          </a>
        </div>
      </div>

      {/* HERO ILLUSTRATIONS (Isolated cleanly to mid-tier z-10 index on mobile structures) */}
      <div className="absolute md:static inset-0 md:inset-auto w-full md:w-7/12 h-full flex justify-center items-end md:items-end z-30 px-5 pointer-events-none ">
        <img
          src={image}
          className="hidden md:block w-full max-h-[85vh] object-contain object-bottom transform-gpu"
          alt="Desktop Hero Layout"
        />
        <img
          src={mobile_image}
          className="block md:hidden w-auto h-fit object-cover mb-0 opacity-70 transform-gpu"
          alt="Mobile Hero Layout"
        />
      </div>
    </div>
  );
}
