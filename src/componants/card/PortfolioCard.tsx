import gsap from "gsap";
import { useRef } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import type { PortfolioType } from "../../storage/type/data-type";

type Portfolio = {
  portfolio: PortfolioType;
  onClick?: () => void;
};

export function PortfolioCard({ portfolio, onClick }: Portfolio) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const handleEnter = () => {
    if (!overlayRef.current || !textRef.current) return;

    tl.current?.kill();

    tl.current = gsap.timeline();

    tl.current
      // Overlay
      .to(overlayRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      })

      // 👉 ALL elements (title, description, button)
      .fromTo(
        textRef.current.children,
        {
          x: -40,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: "power.out",
        },
        "-=0.3",
      );
  };

  const handleLeave = () => {
    tl.current?.reverse();
  };

  return (
    <div
      className="relative w-full h-72 overflow-hidden rounded-xl group cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Image */}
      <img
        src={portfolio?.image?.[0]}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute left-0 top-0 w-full h-full bg-(--neon)/30 flex justify-center items-center p-10 sm:p-10 md:p-5"
        style={{ transform: "translateX(-100%)" }}
      >
        <div
          ref={textRef}
          className="space-y-3 p-3 md:p-5 bg-(--sidebar)/70 rounded-lg sm:rounded-lg md:rounded-2xl"
        >
          <div className="flex justify-center md:justify-end items-start gap-3 ">
            <a
              href={portfolio.link}
              target="_blank"
              download
              className="
                ring-1 ring-(--border)
                p-1 md:p-3
                overflow-hidden
                rounded-full
                hover:shadow-(--shadow)
                transition-all duration-300
              "
            >
              <FaExternalLinkAlt
                size={20}
                className="
                  text-(--foreground)
                  transition-all duration-300
                  hover:text-(--neon)
                  hover:scale-110
                "
              />
            </a>
            <a
              href={portfolio.gitLink}
              target="_blank"
              download
              className="
                ring-1 ring-(--border)
                p-1 md:p-3
                overflow-hidden
                rounded-full
                hover:shadow-(--shadow)
                transition-all duration-300
              "
            >
              <FaGithub
                size={20}
                className="
                  text-(--foreground)
                  transition-all duration-300
                  hover:text-(--neon)
                  hover:scale-110
                "
              />
            </a>
          </div>
          <h1 className="text-xl font-semibold text-(--foreground) text-center md:text-start">
            {portfolio.title}
          </h1>
          <p className="text-sm text-(--foreground) text-center md:text-start ">
            {portfolio.description.length > 50
              ? `${portfolio.description.substring(0, 50)}...`
              : portfolio.description}
          </p>

          <button
            className="bg-(--button-color) text-(--foreground)
            px-8 sm:px-8 md:px-5 py-1 rounded-full text-sm font-normal tracking-wide
            ring-1 md:ring-2 ring-(--border) hover:opacity-70 transition w-full md:w-fit"
            onClick={onClick}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
