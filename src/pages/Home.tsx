import { useEffect, useRef } from "react";
import gsap from "gsap";
// import { fadeInUp } from "../animations/gsap";
import { useNavigate } from "react-router-dom";
import image from "../assets/images/home.png";
import image1 from "../assets/images/about.png";

export default function Home() {
  const boxRef = useRef<HTMLHeadingElement | null>(null);

  const navigate = useNavigate();

  const handleLink = () => {
    navigate("/contact");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 768px)", () => {
        gsap.fromTo(
          boxRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
        );
      });

      mm.add("(min-width: 769px)", () => {
        gsap.fromTo(
          boxRef.current,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 200, duration: 1, ease: "power3.out" },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="
    w-full min-h-full
    flex flex-col md:flex-row
    items-end md:items-center justify-end md:justify-start
    relative
    bg-(--background)
    overflow-hidden
  "
    >
      {/* LEFT SECTION */}
      <div
        ref={boxRef}
        className="
        z-10
        w-full md:w-1/2
        flex flex-col
        justify-end sm:justify-end md:justify-start
        items-center  md:items-start
        space-y-1 sm:space-y-1 md:space-y-5
        px-1 sm:px-1 md:px-5
        py-3 md:py-0
        opacity-50
    "
      >
        <h1 className="text-xl sm:text-2xl font-medium text-(--foreground) tracking-wide opacity-90">
          I am Tapash Paul
        </h1>

        <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold tracking-wider text-(--foreground)">
          Front End Developer
        </h1>

        <p className="text-sm text-center hidden md:block text-(--muted) px-5 sm:px-5 md:px-0 ">
          I build modern, responsive and animated web experiences with clean UI
          and performance in mind.
        </p>

        <button
          onClick={handleLink}
          className="
        bg-(--button-color)
        text-(--foreground)
        text-sm
        font-normal tracking-wider
        ring-1 ring-(--border)
        px-6 py-1 sm:py-1 md:py-3
        rounded-full uppercase

        hover:scale-105 active:scale-95
        transition-transform duration-300
      "
        >
          Contact Me
        </button>
      </div>

      {/* RIGHT SECTION (MOBILE BACKGROUND STYLE) */}
      <div
        className="
      absolute md:static
inset-0 md:inset-auto
      w-full md:w-1/2
      h-full
      flex justify-end md:justify-start items-start
      z-0
    "
      >
        <img
          src={image}
          className="
        w-[120%] sm:w-full md:w-auto
        max-w-none md:max-w-full
        md:object-contain
        md:opacity-70
        md:scale-100
      "
        />
        <img
          src={image1}
          className="
      block md:hidden
      w-full
      object-cover
      scale-80
      opacity-90
    "
        />
      </div>

      {/* MOBILE DARK OVERLAY FOR FOCUS */}
      <div className="absolute inset-0 bg-black/30 md:hidden" />
    </div>
  );
}
