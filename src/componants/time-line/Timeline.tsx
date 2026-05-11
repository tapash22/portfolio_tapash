import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
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
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const [boxHeight, setBoxHeight] = useState(0);
  const [isSm, setIsSm] = useState(false);

  const [animate, setAnimate] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsSm(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current || !lastItemRef.current) return;

    const calculateHeight = () => {
      const containerRect = containerRef.current!.getBoundingClientRect();
      const lastItemRect = lastItemRef.current!.getBoundingClientRect();

      // Calculate distance from container top to the middle of the last card's header
      // This keeps the dot perfectly centered even when the last card expands
      const relativeTop = lastItemRect.top - containerRect.top;
      const mobileOffset = isSm ? -40 : 0;

      setBoxHeight(relativeTop + mobileOffset);
    };

    // Small timeout ensures the DOM has finished the expansion transition before measuring
    const timeoutId = setTimeout(calculateHeight, 300);
    calculateHeight();

    return () => clearTimeout(timeoutId);
  }, [expandedIndex, isSm]);

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

  const handleExpand = (index: number) => {
    if (isSm) return;
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div
      className="relative w-full md:w-full px-2 md:px-0 
    flex justify-center items-end sm:justify-center sm:items-end md:justify-center md:items-center   "
    >
      {/* Timeline Line (AUTO HEIGHT) */}
      <TimeLineSIdeBarWithDot
        cardCount={timelineData.length}
        height={boxHeight}
        animateTrigger={animate}
      />

      {/* Items */}
      <div
        ref={containerRef}
        className="space-y-8 sm:space-y-8 md:space-y-5 w-full relative z-10 box"
      >
        {timelineData.map((item, index) => {
          const isLast = index === timelineData.length - 1;
          const isExpanded = expandedIndex === index;

          return (
            <div
              key={index}
              ref={(el) => {
                if (el) {
                  itemsRef.current[index] = el;
                  if (isLast) lastItemRef.current = el;
                }
              }}
              onClick={() => handleExpand(index)}
              className="
                group w-full
                bg-(--background)/20
                backdrop-blur-xl
                p-6 rounded-xl
                border border-(--border)
                shadow-(--shadow-footer)
                hover:border-(--primary)/50
                transition-all duration-300
                cursor-pointer
              "
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm md:text-xl font-bold text-(--foreground)">
                    {item.year}
                  </h3>
                  <h4 className="text-sm md:text-lg font-medium text-(--foreground)">
                    {item.title}
                  </h4>
                  <p className="text-lg text-(--muted)">{item.company}</p>
                </div>
                {!isSm && (
                  <div
                    className={`mt-1 p-1 rounded-full bg-(--foreground)/5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                  >
                    <FaChevronDown size={20} className="text-(--muted)" />
                  </div>
                )}
              </div>

              {/* Expandable Content */}
              {!isSm && (
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden -ml-6 -mr-6  ">
                    <p className="text-sm leading-relaxed text-(--foreground)/80 border-t border-(--border) px-4 py-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
