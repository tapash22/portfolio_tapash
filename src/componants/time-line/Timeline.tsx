import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TimeLineSIdeBarWithDot } from "./TimeLineSIdeBarWithDot";

const timelineData = [
  {
    year: "2024 - Present",
    title: "Frontend Developer",
    company: "Anwar Technologies",
    description:
      "Architecting scalable Vue 3 applications using Vue Macros and optimizing performance by 25%.", // [cite: 7, 28, 29]
  },
  {
    year: "2023 - 2024",
    title: "Frontend Developer",
    company: "Logic InfoTech Ltd",
    description:
      "Developed GIS-based mapping features with React and Leaflet, reducing load times by 15%.", // [cite: 35, 37, 38]
  },
  {
    year: "2021 - 2022",
    title: "Frontend Developer",
    company: "Ultrawave Digital",
    description:
      "Managed large-scale Vue/React apps and refactored legacy code into modular components.", // [cite: 41, 42, 44]
  },
];

export function Timeline() {
  const itemsRef = useRef<HTMLDivElement[]>([]);

  //calculate the height of the timeline line based on the number of items
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [boxHeight, setBoxHeight] = useState(0);
  const [isSm, setIsSm] = useState(false);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const check = () => setIsSm(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    setBoxHeight(containerRef.current.offsetHeight);
  }, []);

  const finalHeight = isSm
    ? boxHeight * 0.61 // mobile: 90%
    : boxHeight * 0.55;

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setAnimate(true),
    });

    tl.fromTo(
      itemsRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
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
        animateTrigger={animate}
      />

      {/* Items */}
      <div
        ref={containerRef}
        className="space-y-8 sm:space-y-8 md:space-y-5 w-full relative z-10 box"
      >
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
            bg-(--background)/20
            backdrop-blur-xl
            p-5 lg:p-4
            rounded-xl
            border border-(--border)
            shadow-(--shadow-footer)
            hover:scale-[1.02]
            transition-all duration-300
            space-y-1
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
