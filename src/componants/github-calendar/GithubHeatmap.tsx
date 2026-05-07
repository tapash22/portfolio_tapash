import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useGithubContributions } from "../../hook/useGithubContributions";
import "../../styles/github-heatmap.css";

interface GithubHeatmapProps {
  username: string;
}

export function GithubHeatmap({ username }: GithubHeatmapProps) {
  const { contributions, loading, error } = useGithubContributions(username);

  if (loading) {
    return (
      <div className="w-full animate-pulse rounded-xl border border-(--border) p-6">
        <div className="h-40 rounded-lg bg-white/5" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 p-6">
        Failed to load GitHub contributions
      </div>
    );
  }

  return (
    <div
      className="
        rounded-2xl
        border border-(--border)
        bg-white/3
        backdrop-blur-lg
        p-4 md:p-6
        shadow-(--shadow-footer)
        w-full
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg md:text-2xl font-bold">GitHub Activity</h2>

          <p className="text-sm opacity-70">Live contribution graph</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

          <span className="text-xs opacity-60">Live</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={
            new Date(new Date().setFullYear(new Date().getFullYear() - 1))
          }
          endDate={new Date()}
          values={contributions}
          gutterSize={4}
          showWeekdayLabels
          classForValue={(value) => {
            if (!value || value.count === 0) {
              return "color-empty";
            }

            if (value.count >= 10) {
              return "color-scale-4";
            }

            if (value.count >= 7) {
              return "color-scale-3";
            }

            if (value.count >= 4) {
              return "color-scale-2";
            }

            return "color-scale-1";
          }}
          tooltipDataAttrs={(value: any) => {
            if (!value || !value.date) {
              return null;
            }

            return {
              "data-tooltip-id": "github-tooltip",
              "data-tooltip-content": `
                ${value.count} contributions
                on ${value.date}
              `,
            };
          }}
        />
      </div>

      <Tooltip id="github-tooltip" />
    </div>
  );
}
