import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { TimeLineSIdeBarWithDot } from "./TimeLineSIdeBarWithDot";

const timelineData = [
  {
    year: "2025",
    title: "Frontend Developer",
    company: "Company Name",
  },
  {
    year: "2024",
    title: "Freelance Projects",
    company: "Self-employed",
  },
  {
    year: "2023",
    title: "Learning Phase",
    company: "Self-taught",
  },
];

export function Timeline() {
  const itemsRef = useRef<HTMLDivElement[]>([]);

  //calculate the height of the timeline line based on the number of items
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [boxHeight, setBoxHeight] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateHeight = () => {
      setBoxHeight(el.offsetHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const isSm = window.innerWidth <= 640;

  const finalHeight = isSm
    ? boxHeight * 0.76 // mobile: 90%
    : boxHeight * 0.7;

  useEffect(() => {
    gsap.fromTo(
      itemsRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.82,
        stagger: 0.2,
        ease: "power3.out",
      },
    );
  }, []);

  return (
    <div
      className="relative w-full md:w-full px-2 md:px-0 
    flex justify-center items-end sm:justify-center sm:items-end md:justify-center md:items-center   "
    >
      {/* Timeline Line (AUTO HEIGHT) */}
      <TimeLineSIdeBarWithDot
        cardCount={timelineData.length}
        height={finalHeight}
      />

      {/* Items */}
      <div ref={containerRef} className="space-y-8 w-full relative z-10 box">
        {timelineData.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
            className="relative flex flex-col md:flex-row md:items-start gap-3"
          >
            {/* Card */}
            <div
              className="
            w-full
            bg-white/3
            backdrop-blur-lg
            p-5 lg:p-6
            rounded-xl
            border border-(--border)
            shadow-(--shadow-footer)
            hover:scale-[1.02]
            transition-all duration-300
            space-y-2
          "
            >
              <h3 className="text-sm md:text-xl font-bold text-(--foreground)">
                {item.year}
              </h3>

              <h4 className="text-sm md:text-lg font-medium text-(--foreground)">
                {item.title}
              </h4>

              <p className="text-sm text-(--muted)">{item.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
