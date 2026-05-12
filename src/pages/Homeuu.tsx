import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import image from "/images/home.png";
import mobile_image from "/images/mobile_image.png";

gsap.registerPlugin(useGSAP);

export default function Home() {
  // TEXT CONTENT
  const boxRef = useRef<HTMLDivElement | null>(null);

  // GRID BOXES
  const boxesRef = useRef<HTMLDivElement[]>([]);

  // CONTAINER
  const container = useRef<HTMLDivElement | null>(null);

  // GLOWS
  const glowRef = useRef<HTMLDivElement | null>(null);
  const desktopGlowRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const handleLink = () => {
    navigate("/contact");
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // =========================
      // GRID ANIMATION
      // =========================

      gsap.fromTo(
        boxesRef.current,
        {
          opacity: 0.03,
        },
        {
          opacity: 0.12,
          duration: 2,
          stagger: {
            each: 0.02,
            from: "random",
          },
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
      );

      // =========================
      // MOBILE ANIMATION
      // =========================

      mm.add("(max-width: 768px)", () => {
        const tl = gsap.timeline();

        // TEXT
        if (boxRef.current) {
          tl.fromTo(
            boxRef.current.children,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            },
          );
        }

        // MOBILE GLOW
        // MOBILE ONE SIDE WAVE
        if (glowRef.current) {
          gsap.set(glowRef.current, {
            yPercent: 100,
            opacity: 0,
          });

          gsap.to(glowRef.current, {
            yPercent: -150,
            opacity: 1,
            duration: 5,
            repeat: -1,
            ease: "none",
            modifiers: {
              yPercent: gsap.utils.wrap(-150, 100),
            },
          });

          // CIRCLE PULSE
          const circle = glowRef.current.querySelector("div:last-child");

          if (circle) {
            gsap.to(circle, {
              scale: 1.5,
              opacity: 0.25,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        }
      });

      // =========================
      // DESKTOP ANIMATION
      // =========================

      mm.add("(min-width: 769px)", () => {
        const tl = gsap.timeline();

        // TEXT
        if (boxRef.current) {
          tl.fromTo(
            boxRef.current.children,
            {
              opacity: 0,
              x: -80,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.18,
              ease: "power3.out",
            },
          );
        }

        // DESKTOP ONE SIDE WAVE
        if (desktopGlowRef.current) {
          gsap.set(desktopGlowRef.current, {
            xPercent: 100,
            opacity: 0,
          });

          gsap.to(desktopGlowRef.current, {
            xPercent: -160,
            opacity: 1,
            duration: 6,
            repeat: -1,
            ease: "none",
            modifiers: {
              xPercent: gsap.utils.wrap(-160, 100),
            },
          });

          // CIRCLE PULSE
          const circle = desktopGlowRef.current.querySelector("div:last-child");

          if (circle) {
            gsap.to(circle, {
              scale: 1.4,
              opacity: 0.3,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        }
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="
        w-full
        h-[84vh]
        md:h-screen
        flex
        flex-col
        md:flex-row
        items-stretch
        md:items-center
        justify-end
        md:justify-start
        relative
        bg-(--background)
        overflow-hidden
      "
    >
      {/* GRID BACKGROUND */}

      <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 z-0">
        {Array.from({ length: 96 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) {
                boxesRef.current[i] = el;
              }
            }}
            className="
              border
              border-cyan-400/5
              bg-cyan-400/2
            "
          />
        ))}
      </div>

      {/* MOBILE GLOW */}

      {/* MOBILE WAVE */}

      <div
        ref={glowRef}
        className="
    absolute
    bottom-[-30%]
    left-1/2
    -translate-x-1/2
    flex
    flex-col
    items-center
    md:hidden
    z-0
    pointer-events-none
  "
      >
        {/* WAVE */}

        <div
          className="
      w-1
      h-[70vh]
      rounded-full
      bg-linear-to-t
      from-cyan-400
      via-cyan-400/70
      to-cyan-400/0
    "
        />

        {/* CIRCLE */}

        <div
          className="
      absolute
      bottom-0
      w-14
      h-14
      rounded-full
      border-4
      border-cyan-300/70
      bg-cyan-400/20
      shadow-[0_0_50px_rgba(34,211,238,0.9)]
    "
        />
      </div>

      {/* DESKTOP GLOW */}

      {/* DESKTOP WAVE */}

      <div
        ref={desktopGlowRef}
        className="
    hidden
    md:flex
    absolute
    top-1/2
    right-[-40%]
    -translate-y-1/2
    items-center
    z-0
    pointer-events-none
  "
      >
        {/* WAVE LINE */}

        <div
          className="
      w-[90vw]
      h-1
      rounded-full
      bg-linear-to-l
      from-cyan-400/0
      via-cyan-400/70
      to-cyan-400
      blur-[1px]
    "
        />

        {/* END CIRCLE */}

        <div
          className="
      absolute
      left-0
      w-16
      h-16
      rounded-full
      border-4
      border-cyan-300/70
      bg-cyan-400/20
      shadow-[0_0_60px_rgba(34,211,238,0.9)]
    "
        />
      </div>

      {/* LEFT CONTENT */}

      <div
        ref={boxRef}
        className="
          w-full
          md:w-5/12
          flex
          flex-col
          justify-end
          md:justify-start
          items-center
          md:items-start
          space-y-2
          md:space-y-5
          px-3
          md:px-8
          py-10
          md:py-0
          z-10
        "
      >
        <h1
          className="
            text-2xl
            font-bold
            text-(--foreground)
            tracking-wider
            opacity-80
          "
        >
          I am Tapash Paul
        </h1>

        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-bold
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
            gap-3
          "
        >
          <button
            onClick={handleLink}
            className="
              bg-(--button-color)
              text-(--foreground)
              text-sm
              tracking-wider
              ring-1
              ring-(--border)
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
              border
              border-(--border)
              text-(--foreground)
              text-sm
              tracking-wider
              px-6
              py-3
              rounded-full
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

      <div
        className="
          absolute
          md:static
          inset-auto
          w-full
          md:w-7/12
          h-full
          flex
          justify-end
          md:justify-start
          items-start
          z-0
        "
      >
        {/* DESKTOP IMAGE */}

        <img
          src={image}
          alt="Desktop"
          className="
            hidden
            md:block
            w-[90%]
            object-contain
            opacity-90
            relative
            z-10
            pointer-events-none
            select-none
          "
        />

        {/* MOBILE IMAGE */}

        <img
          src={mobile_image}
          alt="Mobile"
          className="
            block
            md:hidden
            w-full
            object-cover
            scale-100
            pointer-events-none
            select-none
          "
        />
      </div>
    </div>
  );
}
