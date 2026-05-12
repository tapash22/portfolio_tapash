import gsap from "gsap";
import { useEffect, useRef } from "react";

export function HeatmapLoader() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cells = gsap.utils.toArray<HTMLElement>(".cell", gridRef.current);

    cells.forEach((cell) => {
      const intensity = Math.random();

      gsap.to(cell, {
        backgroundColor:
          intensity > 0.7
            ? "rgba(34, 197, 94, 0.6)"
            : intensity > 0.4
              ? "rgba(34, 197, 94, 0.35)"
              : "rgba(34, 197, 94, 0.15)",
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 1.2,
      });

      gsap.to(cell, {
        scale: intensity > 0.6 ? 1.15 : 1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 1.2,
      });
    });
  }, []);

  const rows = 10;
  const cols = 100;

  return (
    <div className="w-full flex justify-center">
      {/* FULL WIDTH GRID CONTAINER */}
      <div className="w-full overflow-x-hidden">
        <div
          ref={gridRef}
          className="grid gap-1 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${cols}, 10px)`,
            gridTemplateRows: `repeat(${rows}, 10px)`,
          }}
        >
          {Array.from({ length: rows * cols }).map((_, i) => (
            <div key={i} className="cell w-2 h-2 rounded-sm bg-green-900/20" />
          ))}
        </div>
      </div>
    </div>
  );
}
