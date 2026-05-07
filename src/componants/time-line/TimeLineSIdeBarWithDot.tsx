export function TimeLineSIdeBarWithDot({
  cardCount,
  height,
}: {
  cardCount: number;
  height: number;
}) {
  return (
    <div
      className="
        absolute left-1/2 md:-left-3 
        pointer-events-none z-0
        
        top-30 md:top-16
      "
      style={{
        height,
      }}
    >
      {/* LINE */}
      <div className="absolute left-1/2 md:left-0 top-0 bottom-0 w-1 bg-(--border) rounded-3xl transform -translate-x-1/2 md:translate-x-0" />

      {/* DOTS CONTAINER */}
      <div
        className="
          h-full flex flex-col justify-between items-center
        "
      >
        {Array.from({ length: cardCount }).map((_, index) => (
          <span
            key={index}
            className="
            ml-0 
            md:-ml-1.5
              w-4 h-4 rounded-full
              bg-(--foreground)
              ring-2 ring-(--neon)
              shadow-(--shadow-footer)
              relative
              before:content-['']
              before:absolute
              before:inset-0
              before:rounded-full
              before:bg-(--neon)/80
              before:animate-ping

            "
          />
        ))}
      </div>
    </div>
  );
}
