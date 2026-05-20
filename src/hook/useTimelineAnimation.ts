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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageDotRef = useRef<HTMLDivElement | null>(null);

  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  const cardRectRefs = useRef<(SVGPathElement | null)[]>([]);
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
        const targetX = bRect.left - containerRect.left;
        const targetY = bRect.top - containerRect.top + bRect.height * 0.5;

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

    const masterLoop = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
    loopTimelineInstance.current = masterLoop;

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
        "pulse+=1.42",
      );
    });
  }, [pathStrings]);

  return {
    containerRef,
    imageDotRef,
    boxRefs,
    pathRefs,
    dotRefs,
    cardRectRefs,
    localDotTopRefs,
    localDotBottomRefs,
    pathStrings,
    expandedIndex,
    setExpandedIndex,
    hoveredIndex,
    setHoveredIndex,
  };
};
