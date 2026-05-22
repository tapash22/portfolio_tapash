import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { timelineData } from "../../storage/data/blueprient-data";
import image from "/images/about.png";

export const ResponsiveTimeline = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageDotRef = useRef<HTMLDivElement | null>(null);

  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  const cardRectRefs = useRef<(SVGRectElement | null)[]>([]);
  const localDotTopRefs = useRef<(SVGCircleElement | null)[]>([]);
  const localDotBottomRefs = useRef<(SVGCircleElement | null)[]>([]);

  const [pathStrings, setPathStrings] = useState<string[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const loopTimelineInstance = useRef<gsap.core.Timeline | null>(null);

  const updatePaths = () => {
    if (!containerRef.current || !imageDotRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const imgDotRect = imageDotRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;

    const startX = imgDotRect.left - containerRect.left + imgDotRect.width / 2;
    const startY = imgDotRect.top - containerRect.top + imgDotRect.height / 2;

    const computedPaths = timelineData.map((_, index) => {
      const box = boxRefs.current[index];
      if (!box) return "";
      const bRect = box.getBoundingClientRect();

      if (isMobile) {
        const targetX = bRect.left - containerRect.left + bRect.width / 2;
        const targetY = bRect.top - containerRect.top;
        const midY = startY + (targetY - startY) * 0.5;
        return `M ${startX} ${startY} C ${startX} ${midY}, ${targetX} ${midY}, ${targetX} ${targetY}`;
      } else {
        const targetX = bRect.left - containerRect.left;
        const targetY = bRect.top - containerRect.top + bRect.height / 2;
        const midX = startX + (targetX - startX) * 0.5;
        return `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${targetY}, ${targetX} ${targetY}`;
      }
    });

    setPathStrings(computedPaths);
  };

  useEffect(() => {
    updatePaths();
    const timer = setTimeout(updatePaths, 200);
    window.addEventListener("resize", updatePaths);
    return () => {
      window.removeEventListener("resize", updatePaths);
      clearTimeout(timer);
    };
  }, [expandedIndex]);

  useGSAP(() => {
    const validPaths = pathRefs.current.filter(Boolean) as SVGPathElement[];
    const validDots = dotRefs.current.filter(Boolean) as SVGCircleElement[];

    if (validPaths.length === 0 || pathStrings.length === 0) return;

    const lengths = validPaths.map((p) => p.getTotalLength());

    validPaths.forEach((path, i) => {
      gsap.set(path, {
        strokeDasharray: lengths[i],
        strokeDashoffset: lengths[i],
      });
    });

    gsap.to(validPaths, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power3.out",
    });

    const masterLoop = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
    loopTimelineInstance.current = masterLoop;

    // Fix for TS Overload error: Use a plain object for the tween
    const state = { progress: 0 };

    masterLoop.to(
      state,
      {
        progress: 1,
        duration: 1.4,
        ease: "power2.inOut",
        onStart: () => {
          gsap.set(validDots, { opacity: 1 });
        },
        onUpdate: () => {
          validPaths.forEach((path, index) => {
            const dot = validDots[index];
            if (!path || !dot) return;
            const point = path.getPointAtLength(
              state.progress * lengths[index],
            );
            gsap.set(dot, { attr: { cx: point.x, cy: point.y } });
          });
        },
        onComplete: () => {
          gsap.set(validDots, { opacity: 0 });
        },
      },
      "pulse",
    );

    timelineData.forEach((_, index) => {
      const cardRect = cardRectRefs.current[index];
      const topDot = localDotTopRefs.current[index];
      const bottomDot = localDotBottomRefs.current[index];

      if (!cardRect || !topDot || !bottomDot) return;
      const rectLength = cardRect.getTotalLength();

      gsap.set(cardRect, {
        strokeDasharray: rectLength,
        strokeDashoffset: rectLength,
      });

      // Local card animation logic
      const cardState = { p: 0 };
      masterLoop.to(
        cardState,
        {
          p: 0.5,
          duration: 1.2,
          ease: "sine.inOut",
          onStart: () => {
            gsap.set([topDot, bottomDot, cardRect], { opacity: 1 });
          },
          onUpdate: () => {
            const v = cardState.p;
            gsap.set(cardRect, { strokeDashoffset: rectLength * (1 - v * 2) });
            const ptT = cardRect.getPointAtLength(v * rectLength);
            const ptB = cardRect.getPointAtLength(rectLength - v * rectLength);
            gsap.set(topDot, { attr: { cx: ptT.x, cy: ptT.y } });
            gsap.set(bottomDot, { attr: { cx: ptB.x, cy: ptB.y } });
          },
          onComplete: () => {
            gsap.to([cardRect, topDot, bottomDot], {
              opacity: 0,
              duration: 0.4,
            });
          },
        },
        "pulse+=1.32",
      );
    });
  }, [pathStrings]);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center gap-12 overflow-hidden bg-black p-6 text-white md:min-h-175 md:flex-row md:p-10"
    >
      <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full">
        {pathStrings.map((d, i) => (
          <g key={i}>
            <path
              ref={(el) => {
                pathRefs.current[i] = el;
              }}
              d={d}
              stroke="#00f2ff"
              strokeWidth="2"
              fill="none"
              opacity="0.15"
            />
            <circle
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              r="3.5"
              fill="#22d3ee"
              filter="drop-shadow(0 0 8px #06b6d4)"
              opacity="0"
            />
          </g>
        ))}
      </svg>

      <div className="z-20 w-full max-w-95 md:w-1/2">
        <div className="relative rounded-2xl bg-(--background)/40 p-1.5 shadow-(--shadow) ring-1 ring-(--border)">
          <img
            src={image}
            alt="Profile"
            className="h-auto w-full rounded-xl object-cover"
          />
          <div
            ref={imageDotRef}
            className="absolute -bottom-1.5 left-1/2 z-30 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_15px_#06b6d4] md:top-1/2 md:-right-1.5 md:left-auto md:translate-x-0 md:-translate-y-1/2"
          />
        </div>
      </div>

      <div className="hidden w-1/12 md:block" />

      <div className="z-20 flex w-full flex-col gap-5 md:w-1/2">
        {timelineData.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              boxRefs.current[index] = el;
            }}
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? -1 : index)
            }
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
            className="relative cursor-pointer rounded-3xl border border-gray-900 bg-[#0c0c0e] p-6 transition-all duration-500"
          >
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full rounded-xl"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <rect
                ref={(el) => {
                  cardRectRefs.current[index] = el;
                }}
                x="0.5"
                y="0.5"
                width="99"
                height="99"
                rx="10"
                fill="none"
                stroke="#00f2ff"
                strokeWidth="1"
                style={{
                  strokeDashoffset:
                    hoveredIndex === index || expandedIndex === index
                      ? 0
                      : undefined,
                  strokeDasharray:
                    hoveredIndex === index || expandedIndex === index
                      ? 400
                      : undefined,
                }}
              />
              <circle
                ref={(el) => {
                  localDotTopRefs.current[index] = el;
                }}
                r="1"
                fill="#22d3ee"
              />
              <circle
                ref={(el) => {
                  localDotBottomRefs.current[index] = el;
                }}
                r="1"
                fill="#22d3ee"
              />
            </svg>

            <div className="relative z-10 flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                  {item.year}
                </span>
                <h3 className="text-lg leading-tight font-bold text-white">
                  {item.title}
                </h3>
                <h4 className="text-sm font-medium text-cyan-400/80">
                  {item.company}
                </h4>
              </div>
              <FaChevronDown
                className={`mt-2 text-gray-600 transition-transform duration-500 ${expandedIndex === index ? "rotate-180 text-cyan-400" : ""}`}
              />
            </div>

            <div
              className={`grid transition-all duration-500 ease-in-out ${expandedIndex === index ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="border-t border-gray-800 pt-4 text-xs leading-relaxed text-gray-400 md:text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
