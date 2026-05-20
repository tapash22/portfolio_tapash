import { useTimelineAnimations } from "../../hook/useTimelineAnimation";
import { timelineData } from "../../storage/data/blueprient-data";
import { TimelineCard } from "../card/TimelineCard";
import { ProfileImage } from "../image/ProfileImage";

export const ResponsiveTimeline = () => {
  const {
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
  } = useTimelineAnimations(timelineData);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col md:flex-row gap-12 items-center p-6 md:p-10  text-white overflow-hidden min-h-screen md:min-h-175"
    >
      {/* Background Connector Curves */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
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

      {/* Sub-component: Left/Top Profile Panel */}
      <ProfileImage ref={imageDotRef} />

      <div className="hidden md:block w-1/12" />

      {/* Sub-component Stack: Right/Bottom Cards List */}
      <div className="flex flex-col gap-5 w-full md:w-1/2 z-20">
        {timelineData.map((item, index) => (
          <TimelineCard
            key={index}
            item={item}
            index={index}
            isExpanded={expandedIndex === index}
            isHovered={hoveredIndex === index}
            onToggleExpand={() =>
              setExpandedIndex(expandedIndex === index ? -1 : index)
            }
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(-1)}
            boxRef={(el) => {
              boxRefs.current[index] = el;
            }}
            cardRectRef={(el) => {
              cardRectRefs.current[index] = el;
            }}
            localDotTopRef={(el) => {
              localDotTopRefs.current[index] = el;
            }}
            localDotBottomRef={(el) => {
              localDotBottomRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
};
