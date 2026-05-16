import { useRef, useState } from "react";
import { timelineData } from "../../storage/data/blueprient-data";
import image from "/images/about.png";

import { TimelineImage } from "./TimelineImage";
import { TimelineList } from "./TimelineList";
import { TimelineSVGLayer } from "./TimelineSVGLayer";
import { useTimelineAnimation } from "./useTimelineAnimation";
import { useTimelinePaths } from "./useTimelinePaths";

export const ResponsiveTimeline = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageDotRef = useRef<HTMLDivElement | null>(null);

  // Array Refs managed locally
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const cardRectRefs = useRef<(SVGRectElement | null)[]>([]);
  const localDotTopRefs = useRef<(SVGCircleElement | null)[]>([]);
  const localDotBottomRefs = useRef<(SVGCircleElement | null)[]>([]);

  // Layout states
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  // 1️⃣ PATH CALCULATION (geometry calculation from DOM nodes)
  const pathStrings = useTimelinePaths(
    containerRef,
    imageDotRef,
    boxRefs,
    expandedIndex,
  );

  // 2️⃣ GSAP ANIMATION (isolated side-effects engine)
  useTimelineAnimation(
    pathRefs,
    dotRefs,
    cardRectRefs,
    localDotTopRefs,
    localDotBottomRefs,
    pathStrings,
  );

  // 3️⃣ CLEAN REF REGISTRATION HANDLER
  // This lives where the refs are allocated, preventing child-mutation warnings.
  const registerRef = (
    type: "box" | "cardRect" | "localDotTop" | "localDotBottom",
    index: number,
    element: any,
  ) => {
    if (type === "box" && boxRefs.current) {
      boxRefs.current[index] = element;
    }
    if (type === "cardRect" && cardRectRefs.current) {
      cardRectRefs.current[index] = element;
    }
    if (type === "localDotTop" && localDotTopRefs.current) {
      localDotTopRefs.current[index] = element;
    }
    if (type === "localDotBottom" && localDotBottomRefs.current) {
      localDotBottomRefs.current[index] = element;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col md:flex-row gap-12 items-center p-6 md:p-10 bg-black text-white overflow-hidden min-h-screen md:min-h-175"
    >
      {/* ================= SVG LAYER ================= */}
      <TimelineSVGLayer
        pathStrings={pathStrings}
        pathRefs={pathRefs}
        dotRefs={dotRefs}
      />

      {/* ================= LEFT IMAGE ================= */}
      <TimelineImage imageSrc={image} imageDotRef={imageDotRef} />

      {/* Spacing alignment node for desktop view layouts */}
      <div className="hidden md:block w-1/12" />

      {/* ================= RIGHT TIMELINE ================= */}
      <TimelineList
        timelineData={timelineData}
        expandedIndex={expandedIndex}
        hoveredIndex={hoveredIndex}
        setExpandedIndex={setExpandedIndex}
        setHoveredIndex={setHoveredIndex}
        onRegisterRef={registerRef}
      />
    </div>
  );
};
