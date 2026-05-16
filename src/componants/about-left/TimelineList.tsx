// TimelineList.tsx
import { TimelineCard } from "./TimelineCard";

interface TimelineListProps {
  timelineData: any[];
  expandedIndex: number;
  hoveredIndex: number;
  setExpandedIndex: (index: number) => void;
  setHoveredIndex: (index: number) => void;
  onRegisterRef: (
    type: "box" | "cardRect" | "localDotTop" | "localDotBottom",
    index: number,
    element: any,
  ) => void;
}

export const TimelineList = ({
  timelineData,
  expandedIndex,
  hoveredIndex,
  setExpandedIndex,
  setHoveredIndex,
  onRegisterRef,
}: TimelineListProps) => {
  return (
    <div className="flex flex-col gap-5 w-full md:w-1/2 z-20">
      {timelineData.map((item, index) => (
        <TimelineCard
          key={index}
          item={item}
          index={index}
          expandedIndex={expandedIndex}
          hoveredIndex={hoveredIndex}
          setExpandedIndex={setExpandedIndex}
          setHoveredIndex={setHoveredIndex}
          onRegisterRef={onRegisterRef}
        />
      ))}
    </div>
  );
};
