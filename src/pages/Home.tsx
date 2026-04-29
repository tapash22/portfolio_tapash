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
        const el = boxRef.current;

        const tl = gsap.timeline();

        tl.fromTo(
          el.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.2,
          },
        );
      });

      mm.add("(min-width: 769px)", () => {
        gsap.fromTo(
          boxRef.current,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 100, duration: 1, ease: "power3.out" },
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
        w-full md:w-5/12
        flex flex-col
        justify-end sm:justify-end md:justify-start
        items-center  md:items-start
        space-y-1 sm:space-y-1 md:space-y-5
        px-1 sm:px-1 md:px-5
        py-10 md:py-0
        opacity-100
    "
      >
        <h1 className="text-2xl sm:text-2xl font-bold text-(--foreground) tracking-wider opacity-80">
          I am Tapash Paul
        </h1>

        <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold tracking-wide text-(--foreground)">
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
      w-full md:w-7/12
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
        md:object-cover
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
    </div>
  );
}
