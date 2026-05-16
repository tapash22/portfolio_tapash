interface TimelineCardProps {
  item: any;
  index: number;
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

export const TimelineCard = ({
  item,
  index,
  expandedIndex,
  hoveredIndex,
  setExpandedIndex,
  setHoveredIndex,
  onRegisterRef,
}: TimelineCardProps) => {
  const isExpanded = expandedIndex === index;

  return (
    <div
      ref={(el) => onRegisterRef("box", index, el)}
      className="relative p-6 rounded-xl bg-zinc-950/40 backdrop-blur-sm select-none border border-zinc-900 w-full z-20"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(-1)}
    >
      <div className="flex flex-col relative z-20">
        {/* Fixed Header Row */}
        <div className="flex items-center justify-between gap-4 h-8">
          <div className="space-y-1">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">
              {item.year}
            </span>
            <h3 className="text-lg font-bold text-white leading-tight">
              {item.title}
            </h3>
            <h4 className="text-sm font-medium text-cyan-400/80">
              {item.company}
            </h4>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Prevents click bubbling interference
              setExpandedIndex(isExpanded ? -1 : index);
            }}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0 z-30"
          >
            <svg
              className={`w-4 h-4 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* FIXED GRID EXPANSION SYSTEM:
          Uses inline style to dynamically adjust the grid-template-rows 
          property to ensure cross-browser/Tailwind compatibility.
        */}
        <div
          className="grid transition-[grid-template-rows] duration-500 ease-in-out"
          style={{
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
          }}
        >
          <div className="overflow-hidden">
            <p className="text-sm text-zinc-400 leading-relaxed mt-4 pt-1 border-t border-zinc-900/50">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
