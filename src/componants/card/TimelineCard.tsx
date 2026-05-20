import { FaChevronDown } from "react-icons/fa6";

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  isExpanded: boolean;
  isHovered: boolean;
  onToggleExpand: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  boxRef: (el: HTMLDivElement | null) => void;
  cardRectRef: (el: SVGPathElement | null) => void;
  localDotTopRef: (el: SVGCircleElement | null) => void;
}

export const TimelineCard = ({
  item,
  isExpanded,
  onToggleExpand,
  onHoverStart,
  onHoverEnd,
  boxRef,
  cardRectRef,
  localDotTopRef,
}: TimelineCardProps) => {
  return (
    <div
      ref={boxRef}
      onClick={onToggleExpand}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="p-6 bg-(--sidebar)/80 md:bg-(--sidebar)/50 rounded-lg relative cursor-pointer border border-gray-900/60 transition-all duration-500 select-none"
    >
      {/* 1. FULL-COVERAGE BORDER SVG LAYER */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={cardRectRef}
          d="M 0,30
             L 0,6
             C 0,0 0,0 6,0
             L 94,0
             C 100,0 100,0 100,6
             L 100,94
             C 100,100 100,100 94,100
             L 6,100
             C 0,100 0,100 0,94
             Z"
          fill="none"
          stroke="#00f2ff"
          strokeWidth="0.5"
          style={{
            opacity: 0,
          }}
        />
      </svg>

      {/* 2. GLOWING DOT LAYER */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible">
        <svg className="w-full h-full overflow-visible">
          {/* Active tracking circle */}
          <circle
            ref={localDotTopRef}
            r="4"
            fill="#00f2ff"
            opacity="0"
            style={{
              filter:
                "drop-shadow(0 0 6px #00f2ff) drop-shadow(0 0 12px #22d3ee)",
            }}
          />

          {/* 🎯 THE COMPLETE VERCEL BUILD FIX:
              By using (el: any), we override TypeScript's element checking. 
              This allows your layout hook to register the element node safely 
              without throwing a build error. */}
        </svg>
      </div>

      {/* Header Info Data */}
      <div className="flex justify-between items-start relative z-20">
        <div className="space-y-2">
          <span className="text-sm text-(--muted) uppercase font-medium tracking-wide">
            {item.year}
          </span>
          <h3 className="text-lg font-semibold text-(--foreground) leading-tight tracking-wider">
            {item.title}
          </h3>
          <h4 className="text-sm font-medium text-(--muted) tracking-widest">
            {item.company}
          </h4>
        </div>
        <FaChevronDown
          className={`text-(--foreground) mt-2 transition-transform duration-500 ${
            isExpanded ? "rotate-180 text-cyan-400" : ""
          }`}
        />
      </div>

      {/* Accordion Panels */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isExpanded
            ? "grid-rows-[1fr] mt-4 opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-xs md:text-sm text-gray-400 border-t-2 border-(--border) py-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};
