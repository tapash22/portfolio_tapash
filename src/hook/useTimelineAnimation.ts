import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

export const useTimelineAnimations = (timelineData: TimelineItem[]) => {
  // hold the ref of main timeline
  const containerRef = useRef<HTMLDivElement | null>(null);
  // hold the image ref
  const imageDotRef = useRef<HTMLDivElement | null>(null);

  // timeline each box
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  // svg ref start from image
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  // dot moving into svg path
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  //svg shapes outline card
  const cardRectRefs = useRef<(SVGPathElement | null)[]>([]);
  // refs svg circle to trace the border outline
  const localDotTopRefs = useRef<(SVGCircleElement | null)[]>([]);

  //path data strings calculated dynamically based on screen layout coordinates
  const [pathStrings, setPathStrings] = useState<string[]>([]);
  //Component-controlled track numbers indicating which cards are open
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  //Component-controlled track numbers indicating which cards are open hoverIndex
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  //Stores the master looping GSAP timeline instance so it can potentially be paused, resumed, or cleared elsewhere.
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
        const targetX = bRect.left - containerRect.left + bRect.width * 0.5;
        const targetY = bRect.top - containerRect.top;

        const midY = startY + (targetY - startY) * 0.5;

        // Creates a clean, fluid curve that swoops right into the side entrance of the card
        return `M ${startX} ${startY} C ${startX} ${midY}, ${targetX} ${midY}, ${targetX} ${targetY}`;
      } else {
        const targetX = bRect.left - containerRect.left;
        const targetY = bRect.top - containerRect.top + bRect.height * 0.3;
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

    // const masterLoop = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    const masterLoop = gsap
      .timeline({ repeat: -1, repeatDelay: 1.5 })
      .timeScale(0.8);
    loopTimelineInstance.current = masterLoop;

    const state = { progress: 0 };

    masterLoop.to(
      state,
      {
        progress: 1,
        duration: 1.8,
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

    // 🎯 SCRIPTED FULL PERIMETER RE-CONVERSION TRACKER
    timelineData.forEach((_, index) => {
      const cardRect = cardRectRefs.current[index];
      const topDot = localDotTopRefs.current[index];
      const box = boxRefs.current[index];

      if (!cardRect || !topDot || !box) return;

      const cardState = { p: 0 };

      masterLoop.to(
        cardState,
        {
          p: 1,
          duration: 1.8, // Slightly longer duration for a smooth full loop trace
          ease: "power1.inOut",
          onStart: () => {
            const rectLength = cardRect.getTotalLength();
            // Clear baseline state setup
            gsap.set(cardRect, {
              strokeDasharray: rectLength,
              strokeDashoffset: rectLength,
              opacity: 1,
            });
            gsap.set(topDot, { opacity: 1 });
          },
          onUpdate: () => {
            const v = cardState.p;
            const bRect = box.getBoundingClientRect();
            const rectLength = cardRect.getTotalLength();

            // 1. Move line border forward smoothly over its true absolute length
            gsap.set(cardRect, {
              strokeDashoffset: rectLength * (1 - v),
            });

            // 2. Extract path positions relative to view coordinates
            const travelDist = rectLength * v;
            const pt = cardRect.getPointAtLength(travelDist);

            // 3. Map values safely onto the screen wrapper dimensions to prevent clipping
            const realX = (pt.x / 100) * bRect.width;
            const realY = (pt.y / 100) * bRect.height;

            gsap.set(topDot, { attr: { cx: realX, cy: realY } });
          },
          onComplete: () => {
            // Smoothly fade out both elements together once the full loop finishes
            gsap.to([cardRect, topDot], {
              opacity: 0,
              duration: 0.3,
            });
          },
        },
        "pulse+=1.5",
      );
    });

    // timelineData.forEach((_, index) => {
    //   const cardRect = cardRectRefs.current[index];
    //   const topDot = localDotTopRefs.current[index];
    //   const box = boxRefs.current[index];

    //   if (!cardRect || !topDot || !box) return;

    //   const cardState = { p: 0 };
    //   const rectLength = cardRect.getTotalLength();

    //   // Adjust these variables to fine-tune the speed and timing easily:
    //   const traceDuration = 4.0; // INCREASE THIS to make it crawl slower (e.g., 5.0s, 6.0s)
    //   const traceDelay = 0.8; // INCREASE THIS to make it wait longer before it starts crawling
    //   const traceEase = "linear"; // "linear" keeps a perfectly steady, slow pace all the way around

    //   // 1. Reset baseline states instantly when the master timeline reaches this point
    //   masterLoop.set([cardRect, topDot], { opacity: 1 });
    //   masterLoop.set(
    //     cardRect,
    //     {
    //       strokeDasharray: rectLength,
    //       strokeDashoffset: rectLength,
    //     },
    //     "pulse+=1.42",
    //   );

    //   // 2. THE BORDER LINE: Draws slowly around the card
    //   masterLoop.to(
    //     cardRect,
    //     {
    //       strokeDashoffset: 0,
    //       duration: traceDuration,
    //       delay: traceDelay,
    //       ease: traceEase,
    //     },
    //     "pulse+=1.42",
    //   );

    //   // 3. THE TRACING DOT: Travels slowly, locking onto the line's position
    //   masterLoop.to(
    //     cardState,
    //     {
    //       p: 1,
    //       duration: traceDuration,
    //       delay: traceDelay,
    //       ease: traceEase,
    //       onUpdate: () => {
    //         const v = cardState.p;
    //         const bRect = box.getBoundingClientRect();

    //         // Extract path positions relative to view coordinates
    //         const travelDist = rectLength * v;
    //         const pt = cardRect.getPointAtLength(travelDist);

    //         // Map values safely onto the screen wrapper dimensions
    //         const realX = (pt.x / 100) * bRect.width;
    //         const realY = (pt.y / 100) * bRect.height;

    //         gsap.set(topDot, { attr: { cx: realX, cy: realY } });
    //       },
    //       onComplete: () => {
    //         // Smoothly fade out both elements together once the full loop finishes
    //         gsap.to([cardRect, topDot], {
    //           opacity: 0,
    //           duration: 0.5, // Slightly longer fade out to match the slower feel
    //         });
    //       },
    //     },
    //     "pulse+=1.42",
    //   );
    // });

    // timelineData.forEach((_, index) => {
    //   const cardRect = cardRectRefs.current[index];
    //   const topDot = localDotTopRefs.current[index];
    //   const box = boxRefs.current[index];

    //   if (!cardRect || !topDot || !box) return;

    //   const isMobile = window.innerWidth < 768;
    //   const cardState = { p: 0 };

    //   // 1. CONDITIONAL START PLACEMENT VIA SVG PATH ("d")
    //   if (isMobile) {
    //     // Mobile: Starts at top-center (50,0), goes clockwise around, ends at top-center
    //     cardRect.setAttribute("d", "M 50,0 L 100,0 L 100,100 L 0,100 L 0,0 Z");
    //   } else {
    //     // Desktop: Restored exactly to your original design (starts at top-left corner 0,0)
    //     cardRect.setAttribute("d", "M 0,0 L 100,0 L 100,100 L 0,100 Z");
    //   }

    //   const rectLength = cardRect.getTotalLength();

    //   // 2. DYNAMIC TIMING (Slow on Desktop, Fast on Mobile)
    //   // Customize these numbers to find your perfect speeds:
    //   const traceDuration = isMobile ? 1.2 : 7.0; // 1.2 seconds on mobile (FAST), 7.0 seconds on desktop (SLOW)
    //   const traceDelay = isMobile ? 0.1 : 1.0; // Tiny delay on mobile so it doesn't wait around
    //   const traceEase = isMobile ? "power2.out" : "linear"; // Snappy curve for mobile, smooth crawl for desktop

    //   // Reset baseline states instantly when the master timeline reaches this point
    //   masterLoop.set([cardRect, topDot], { opacity: 1 }, "pulse+=1.42");
    //   masterLoop.set(
    //     cardRect,
    //     {
    //       strokeDasharray: rectLength,
    //       strokeDashoffset: rectLength,
    //     },
    //     "pulse+=1.42",
    //   );

    //   // 3. THE BORDER LINE
    //   masterLoop.to(
    //     cardRect,
    //     {
    //       strokeDashoffset: 0,
    //       duration: traceDuration,
    //       delay: traceDelay,
    //       ease: traceEase,
    //     },
    //     "pulse+=1.42",
    //   );

    //   // 4. THE TRACING DOT
    //   masterLoop.to(
    //     cardState,
    //     {
    //       p: 1,
    //       duration: traceDuration,
    //       delay: traceDelay,
    //       ease: traceEase,
    //       onUpdate: () => {
    //         const v = cardState.p;
    //         const bRect = box.getBoundingClientRect();

    //         // Extract path positions relative to view coordinates
    //         const travelDist = rectLength * v;
    //         const pt = cardRect.getPointAtLength(travelDist);

    //         // Map values safely onto the screen wrapper dimensions
    //         const realX = (pt.x / 100) * bRect.width;
    //         const realY = (pt.y / 100) * bRect.height;

    //         gsap.set(topDot, { attr: { cx: realX, cy: realY } });
    //       },
    //       onComplete: () => {
    //         // Smoothly dissolve both elements together when loop ends
    //         gsap.to([cardRect, topDot], {
    //           opacity: 0,
    //           duration: isMobile ? 0.2 : 0.6, // Quick clean fade out on mobile
    //         });
    //       },
    //     },
    //     "pulse+=1.42",
    //   );
    // });
  }, [pathStrings]);

  return {
    containerRef,
    imageDotRef,
    boxRefs,
    pathRefs,
    dotRefs,
    cardRectRefs,
    localDotTopRefs,
    pathStrings,
    expandedIndex,
    setExpandedIndex,
    hoveredIndex,
    setHoveredIndex,
  };
};
