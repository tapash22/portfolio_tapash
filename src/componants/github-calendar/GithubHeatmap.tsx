import type { ReactCalendarHeatmapValue } from "react-calendar-heatmap";
import CalendarHeatmap from "react-calendar-heatmap";

import "react-calendar-heatmap/dist/styles.css";
import "../../styles/github-heatmap.css";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useGithubContributions } from "../../hook/useGithubContributions";
import { HeatmapLoader } from "../pre-loader/HeatmapLoader";

/** ---------------- TYPES ---------------- */
type HeatmapStage = "loading" | "ready";

type HeatmapValue = ReactCalendarHeatmapValue<string> & {
  date: string;
  count: number;
};

type TooltipState = {
  x: number;
  y: number;
  text: string;
} | null;

/** ---------------- TYPE GUARD ---------------- */
function isHeatmapValue(
  value: ReactCalendarHeatmapValue<string> | undefined,
): value is HeatmapValue {
  return (
    !!value &&
    typeof (value as HeatmapValue).count === "number" &&
    typeof (value as HeatmapValue).date === "string"
  );
}

/** ---------------- COMPONENT ---------------- */
export function GithubHeatmap({ username }: { username: string }) {
  const { contributions, loading, error } = useGithubContributions(username);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [stage, setStage] = useState<HeatmapStage>("loading");
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  /** ---------------- LOADING FLOW ---------------- */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let tween: gsap.core.Tween | undefined;

    if (!loading) {
      timer = setTimeout(() => {
        setStage("ready");

        if (contentRef.current) {
          tween = gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
          );
        }
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (tween) tween.kill();
    };
  }, [loading]);

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

      {/* WRAPPER */}
      <div ref={containerRef} className="relative w-full overflow-x-hidden">
        {/* ================= LOADER ================= */}
        {stage === "loading" && (
          <div className="heatmap-loader w-full h-full ">
            <HeatmapLoader />
          </div>
        )}

        {/* ================= HEATMAP ================= */}
        {stage === "ready" && (
          <div
            ref={contentRef}
            className="heatmap-content relative w-full overflow-x-auto md:overflow-x-hidden"
          >
            {/* TOOLTIP */}
            {tooltip && (
              <div
                className="pointer-events-none absolute z-50 rounded-lg bg-(--sidebar)/80 p-3 text-(--foreground) shadow-lg text-sm font-light tracking-wide whitespace-nowrap"
                style={{
                  left: tooltip.x,
                  top: tooltip.y,
                  transform: "translateY(-50%)",
                  whiteSpace: "nowrap",
                }}
              >
                {tooltip.text}
              </div>
            )}

            <div className="min-w-187">
              <CalendarHeatmap
                startDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                }
                endDate={new Date()}
                values={contributions}
                gutterSize={4}
                showWeekdayLabels
                /** ✅ FULL TYPE SAFE */
                classForValue={(
                  value: ReactCalendarHeatmapValue<string> | undefined,
                ) => {
                  if (!isHeatmapValue(value) || value.count === 0)
                    return "color-empty";

                  if (value.count >= 10) return "color-scale-4";
                  if (value.count >= 7) return "color-scale-3";
                  if (value.count >= 4) return "color-scale-2";

                  return "color-scale-1";
                }}
                /** ✅ FULL TYPE SAFE */
                onMouseOver={(
                  event: React.MouseEvent<SVGRectElement>,
                  value: ReactCalendarHeatmapValue<string> | undefined,
                ) => {
                  if (!isHeatmapValue(value) || !containerRef.current) return;

                  const target = event.target as SVGRectElement;
                  if (!target || target.tagName !== "rect") return;

                  const rect = target.getBoundingClientRect();
                  const container =
                    containerRef.current.getBoundingClientRect();

                  const tooltipWidth = 180;

                  let x = rect.right - container.left + 10;
                  let y = rect.top - container.top + rect.height / 2;

                  x = Math.min(x, container.width - tooltipWidth);
                  y = Math.max(10, y);

                  setTooltip({
                    x,
                    y,
                    text: `${value.count} contributions on ${value.date}`,
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
