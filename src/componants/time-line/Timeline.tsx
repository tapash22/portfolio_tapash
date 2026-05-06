import { useEffect, useRef } from "react";
import gsap from "gsap";

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
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      },
    );
  }, []);

  return (
    <div className="relative px-2 md:px-0 min-w-2/3 max-w-full  ">
      {/* Vertical line (hidden on small screens) */}
      <div className="hidden md:block absolute -left-5 top-0 h-full border-l-4 border-(--border) rounded-3xl"></div>

      <div className="space-y-8 w-auto ">
        {timelineData.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
            className="
              relative
              flex flex-col md:flex-row
              md:items-start
              gap-3
            "
          >
            {/* Dot (hidden on mobile line style changes) */}
            <span
              className="hidden md:flex absolute -left-6.5 top-10 w-4 h-4 rounded-full bg-(--foreground)
            ring-1 ring-(--neon) shadow-(--shadow-footer)
            before:content-[''] before:absolute before:inset-0 before:rounded-full
            before:bg-(--neon)/80 before:animate-ping"
            ></span>

            {/* Card */}
            <div
              className="
                w-full
                bg-white/3
                backdrop-blur-lg
                p-4
                rounded-xl
                border border-(--border)
                shadow-(--shadow-footer)
                hover:scale-[1.02]
                transition-all duration-300
                space-y-2
              "
            >
              <h3 className="text-sm md:text-xl font-bold text-(--foreground) tracking-wide">
                {item.year}
              </h3>
              <h4 className="text-sm md:text-lg font-medium text-(--foreground) tracking-wider whitespace-nowrap">
                {item.title}
              </h4>

              <p className="text-sm font-normal tracking-wider text-(--muted) mt-1">
                {item.company}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
