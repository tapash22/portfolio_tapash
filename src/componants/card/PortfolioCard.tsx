import { useRef } from "react";
import gsap from "gsap";
import type { ServiceType } from "../../storage/type/data-type";

type Portfolio = {
  portfolio: ServiceType;
  onClick?: () => void;
};

export function PortfolioCard({ portfolio, onClick }: Portfolio) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const handleEnter = () => {
    if (!overlayRef.current || !textRef.current) return;

    // kill previous timeline if exists (prevents stacking)
    tl.current?.kill();

    tl.current = gsap.timeline();

    tl.current
      // 🔻 Overlay from bottom
      .to(overlayRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power.out",
      })

      .fromTo(
        textRef.current.children,
        {
          x: -80,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.2",
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
        src={portfolio.image}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute left-0 top-0 w-full h-full bg-(--neon)/30 flex items-end p-5"
        style={{ transform: "translateY(100%)" }}
      >
        <div
          ref={textRef}
          className="space-y-3 p-3 bg-(--sidebar)/50 rounded-2xl"
        >
          <h1 className="text-xl font-semibold text-(--foreground)">
            {portfolio.title}
          </h1>

          <p className="text-sm text-(--foreground)">{portfolio.description}</p>

          <button
            className="bg-(--button-color) text-(--foreground)
            px-4 py-2 rounded-full text-sm tracking-wide
            ring-2 ring-(--border) hover:opacity-70 transition"
            onClick={onClick}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
