import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "../../styles/github-heatmap.css";

import { useRef, useState } from "react";
import { useGithubContributions } from "../../hook/useGithubContributions";

export function GithubHeatmap({ username }: { username: string }) {
  const { contributions, loading, error } = useGithubContributions(username);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading heatmap</div>;

  return (
    <div className="w-full h-full shadow-(--shadow-footer) rounded-xl border border-(--border) p-2 md:p-5">
      {/* HEADER */}
      <div className="flex justify-between p-2">
        <div className="space-y-0 md:space-y-2">
          <h2 className="text-sm md:text-2xl font-bold text-(--foreground)">
            GitHub Activity
          </h2>
          <p className="text-sm opacity-70 text-(--muted)">
            Live contribution graph
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-xs opacity-60 text-(--muted)">Live</span>
        </div>
      </div>

      {/* HEATMAP WRAPPER */}
      <div ref={containerRef} className="relative w-full overflow-x-hidden">
        {/* TOOLTIP (FIXED POSITIONING) */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-50 rounded-md bg-black/80 px-3 py-1 text-xs text-white"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            {tooltip.text}
          </div>
        )}

        {/* FORCE FULL WIDTH FOR MOBILE SCROLL */}
        <div className="min-w-187.5">
          <CalendarHeatmap
            startDate={
              new Date(new Date().setFullYear(new Date().getFullYear() - 1))
            }
            endDate={new Date()}
            values={contributions}
            gutterSize={4}
            showWeekdayLabels
            classForValue={(value) => {
              if (!value || value.count === 0) return "color-empty";
              if (value.count >= 10) return "color-scale-4";
              if (value.count >= 7) return "color-scale-3";
              if (value.count >= 4) return "color-scale-2";
              return "color-scale-1";
            }}
            // 🔥 TOOLTIP HANDLER
            onMouseOver={(e: any) => {
              const target = e.target as SVGRectElement;

              if (!target || target.tagName !== "rect") return;

              const allRects = document.querySelectorAll("rect");

              const index = Array.from(allRects).indexOf(target);

              const data = contributions[index];
              if (!data || !containerRef.current) return;

              const rect = target.getBoundingClientRect();
              const container = containerRef.current.getBoundingClientRect();

              const x = rect.left - container.left + rect.width / 2;

              const y = rect.top - container.top;

              setTooltip({
                x,
                y,
                text: `${data.count} contributions on ${data.date}`,
              });
            }}
            onMouseLeave={() => setTooltip(null)}
          />
        </div>
      </div>
    </div>
  );
}
