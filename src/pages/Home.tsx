import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import AnimatedWaves from "../componants/landing/AnimatedWaves";
import BackgroundGrid from "../componants/landing/BackgroundGrid";

import { useWaveSystem } from "../hook/useWaveSystem";
import image from "/images/home.png";
import mobile_image from "/images/mobile_image.png";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const boxesRef = useRef<HTMLDivElement[]>([]);
  useWaveSystem({
    containerRef: container,
    boxesRef,
    boxRef,
  });

  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[84vh] overflow-hidden bg-black/8 flex">
      <BackgroundGrid />
      <AnimatedWaves />

      {/* STATIC DECORATION */}
      <div className="hidden md:block absolute right-16 bottom-0 -translate-y-1/2 w-80 h-80 rounded-full bg-linear-to-br from-cyan-400/50 via-cyan-400/10 to-transparent blur-2xl shadow-[0_0_120px_rgba(34,211,238,0.4)]" />

      {/* CONTENT AREA */}
      <div
        ref={boxRef}
        className="w-full md:w-1/2 flex flex-col justify-end md:justify-center space-y-0 md:space-y-3 px-5 md:px-10 py-5 md:py-0 z-10 relative"
      >
        <h1 className="text-xl md:text-2xl font-bold text-center md:text-start text-(--foreground) tracking-wider opacity-80">
          I am Tapash Paul
        </h1>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center md:text-start tracking-wide text-(--foreground)">
          Front End Developer
        </h1>
        <p className="text-sm hidden md:block text-(--muted) tracking-wide">
          I build modern, responsive and animated web experiences...
        </p>
        <div className="flex flex-col md:flex-row gap-2 md:gap-5 p-2">
          <button
            onClick={() => navigate("/contact")}
            className="bg-(--button-color) text-(--foreground) text-sm px-10 py-3 rounded-full uppercase hover:scale-105 transition-transform"
          >
            Contact Me
          </button>
          <a
            href="/cv/tapash-paul-cv.pdf"
            download
            className="border-2 border-(--border) text-(--foreground) text-sm px-6 py-3 rounded-full text-center uppercase hover:bg-(--button-color) hover:scale-105 transition-all"
          >
            Download CV
          </a>
        </div>
      </div>

      {/* HERO IMAGES */}
      <div className="absolute md:static w-full md:w-7/12 h-full flex justify-center items-start md:items-end z-0">
        <img
          src={image}
          className="hidden md:block w-full"
          alt="Desktop Hero"
        />
        <img
          src={mobile_image}
          className="block md:hidden w-auto px-2"
          alt="Mobile Hero"
        />
      </div>
    </div>
  );
}
