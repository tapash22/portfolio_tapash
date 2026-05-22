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
      className="relative w-full h-[84vh] md:h-[90vh] overflow-hidden flex"
    >
      {/* BACKGROUND GRAPHIC CANVAS LAYERS (Seated safely at z-0) */}
      {/* <BackgroundGrid /> */}
      <AnimatedWaves />

      {/* STATIC DECORATIVE AMBIENT GLOW */}
      <div
        ref={glowRef}
        className="hidden md:block absolute top-1/4 left-2/3 ring-8 w-150 h-150 
        rounded-full bg-linear-to-br from-(--neon)/20 via-(--neon)/5 to-transparent blur-3xl 
        shadow-[0_0_100px_rgba(34,255,255,0.5)] pointer-events-none z-0
        will-change-transform opacity-100"
      />

      {/* INTERACTIVE TEXT CONTENT AREA (Raised safely to z-20) */}
      <div
        ref={boxRef}
        className="
        w-full h-full md:w-1/3 flex flex-col justify-end md:justify-center items-center 
        space-y-0 md:space-y-3 px-5 md:px-10 py-0 md:py-0 z-40 relative transform-gpu 
        bg-(--background)/40 shadow-[0_0_100px_rgba(34,255,255,0.09)] 
        "
      >
        <div
          className="
          w-70 h-14 sm:w-85 sm:h-14 md:w-120 md:h-18 flex items-center justify-end 
          md:justify-start overflow-hidden select-none pointer-events-none mx-auto 
          md:mx-0 
          "
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 480 75"
            className="will-change-transform transform-gpu"
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

        <h1
          className="
        text-2xl md:text-4xl font-bold text-center md:text-start tracking-wide 
        text-(--foreground) will-change-transform transform-gpu"
        >
          Front End Developer
        </h1>

        <p
          className="
          text-sm font-normal hidden md:block text-center  text-(--muted) tracking-wide
          max-w-lg leading-relaxed will-change-transform transform-gpu p-3
          ring-1 ring-(--border) bg-(--background)/50 shadow-(--shadow-footer) rounded-xl
          drop-shadow-sm"
        >
          Build responsive, and interactive web applications with modern
          frontend technologies, focusing on smooth user experience and clean UI
          architecture
        </p>

        <div
          className="
          flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-5 py-3 md::py-0
          will-change-transform transform-gpu h-auto"
        >
          <button
            onClick={() => navigate("/contact")}
            className="
            bg-(--sidebar)/30 md:bg-(--sidebar) text-(--foreground) border-2 border-(--border) 
            shadow-(--shadoe-footer) text-sm px-8 py-2 rounded-sm md:rounded-full font-semibold
            uppercase hover:scale-105 active:scale-95 transition-transform cursor-pointer 
            z-50 tracking-wider h-full whitespace-nowrap "
          >
            Contact Me
          </button>
          <a
            href="/cv/tapash-paul-cv.pdf"
            download
            className="
            bg-(--sidebar)/30 md:bg-(--sidebar) text-(--foreground) border-2 border-(--border) 
            shadow-(--shadoe-footer) text-sm px-8 py-2 rounded-sm md:rounded-full  font-semibold
            uppercase hover:scale-105 active:scale-95 transition-transform cursor-pointer 
            z-50 tracking-wider flex justify-center items-center whitespace-nowrap"
          >
            Download CV
          </a>
        </div>
      </div>

      {/* HERO ILLUSTRATIONS (Isolated cleanly to mid-tier z-10 index on mobile structures) */}
      <div
        className="
        absolute md:static inset-0 md:inset-auto w-full md:w-7/12 h-full 
        flex justify-center items-end md:items-end z-30 px-5 pointer-events-none
        "
      >
        <img
          src={image}
          className="hidden md:block w-full max-h-[85vh] object-contain object-bottom transform-gpu"
          alt="Desktop Hero Layout"
        />
        <img
          src={mobile_image}
          className="block md:hidden w-full h-full object-cover mb-0 opacity-70 transform-gpu"
          alt="Mobile Hero Layout"
        />
      </div>
    </div>
  );
}
