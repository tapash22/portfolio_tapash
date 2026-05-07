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
    absolute
    left-1/2 md:-left-3.5
    -translate-x-1/2
    md:translate-y-[22%]
    translate-y-5
    md:top-0 md:bottom-0 
    w-1
    rounded-full
    bg-(--border)
      "
      style={{
        height,
      }}
    >
      {/* DOTS CONTAINER */}
      <div
        className="
        md:-mr-2 -mr-1.5 sm:-mr-1.5

          h-full flex flex-col justify-between items-end 
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
