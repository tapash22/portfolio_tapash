import gsap from "gsap";
import { useEffect, useRef } from "react";
// import { fadeInUp } from "../animations/gsap";
import { useNavigate } from "react-router-dom";
import image from "/images/home.png";
import mobile_image from "/images/mobile_image.png";

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
        if (!el) return;

        const tl = gsap.timeline();

        tl.fromTo(
          el.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.15,
          },
        );
      });

      mm.add("(min-width: 769px)", () => {
        if (!boxRef.current) return;

        gsap.fromTo(
          boxRef.current,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 100, duration: 0.8, ease: "power3.out" },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="
              w-full h-[84vh] md:h-full
              flex flex-col md:flex-row
              items-stretch md:items-center
              justify-end md:justify-start
              relative
              bg-(--background)
              overflow-hidden
            "
    >
      {/* LEFT SECTION */}
      <div
        ref={boxRef}
        className="w-full md:w-5/12 flex flex-col
                  justify-end md:justify-start items-center md:items-start
                  space-y-1 sm:space-y-1 md:space-y-5
                  px-1 sm:px-1 md:px-5 py-10 md:py-0 z-10 
                "
      >
        <h1 className="text-2xl sm:text-2xl font-bold text-(--foreground) tracking-wider opacity-80">
          I am Tapash Paul
        </h1>

        <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold tracking-wide text-(--foreground)">
          Front End Developer
        </h1>

        <p className="text-sm text-start tracking-wide hidden md:block text-(--muted) whitespace-nowrap ">
          I build modern, responsive and animated web experiences with clean UI
          and performance in mind.
        </p>
        <div className="flex flex-col sm:flex-col md:flex-row space-x-3 space-y-3 sm:space-y-3 md:space-y-0 ">
          <button
            onClick={handleLink}
            className="
                    bg-(--button-color)
                    text-(--foreground)
                    text-sm
                    font-normal tracking-wider
                    ring-1 ring-(--border)
                    px-10 py-2 sm:py-2 md:py-3
                    rounded-full uppercase
                    hover:scale-105 active:scale-95
                    transition-transform duration-300
                    whitespace-nowrap
                  "
          >
            Contact Me
          </button>

          {/* CV Download */}
          <a
            href="/cv/tapash-paul-cv.pdf"
            download
            className="
            border border-(--border)
            text-(--foreground)
            text-sm
            tracking-wider
            px-6 py-2 md:py-3
            rounded-full uppercase
            hover:bg-(--button-color) hover:scale-105 active:scale-95
            transition-all duration-300
            whitespace-nowrap
          "
          >
            Download CV
          </a>
        </div>
      </div>

      {/* RIGHT SECTION (MOBILE BACKGROUND STYLE) */}
      <div
        className="
      absolute md:static
      inset-auto
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
          src={mobile_image}
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
