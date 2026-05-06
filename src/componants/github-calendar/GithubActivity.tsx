import { GitHubCalendar } from "react-github-calendar";
import { useGithubStats } from "../../hook/useGithubStats";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const GithubActivity = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 1. Get the real repo count (we'll use this for the header placeholder)
  const { repos, loading } = useGithubStats("tapash22");
  const [count, setCount] = useState(0);

  // 2. Precise Native GitHub Dark Colors for the blocks
  const nativeGithubTheme = {
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  // -----------------------------
  // GSAP: container animation
  // -----------------------------
  useEffect(() => {
    if (!loading && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
      );
    }
  }, [loading]);

  // -----------------------------
  // GSAP: animated counter
  // -----------------------------
  useEffect(() => {
    if (!loading && repos) {
      const obj = { val: 0 };

      gsap.fromTo(
        obj,
        { val: 0 },
        {
          val: repos * 12,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            setCount(Math.floor(obj.val));
          },
        },
      );
    }
  }, [loading, repos]);

  // -----------------------------
  // LOADING STATE UI
  // -----------------------------
  if (loading) {
    return (
      <div className="w-full h-40 flex items-center justify-center text-white/60 border border-(--border) rounded-xl bg-black/20">
        Loading GitHub activity...
      </div>
    );
  }

  // -----------------------------
  // MAIN UI
  // -----------------------------
  return (
    <div
      ref={containerRef}
      className="w-full h-auto p-4 sm:p-6 border border-(--border) rounded-xl bg-black/20 shadow-(--shadow) space-y-4"
    >
      {/* 1. Header: Total Contributions */}
      <div className="flex justify-between items-center px-1">
        <h3 className="text-base sm:text-lg font-normal text-(--foreground)">
          {/* Using repo count as a placeholder for total contributions */}
          {count} contributions in the last year
        </h3>
      </div>

      {/* 2. The Board Container */}
      <div className="w-full p-6 border border-white/10 rounded-xl bg-[#0d1117] relative overflow-hidden">
        {/* Day Labels - White Text */}
        <div className="absolute left-4 top-18 flex flex-col space-y-5 text-[11px] text-white/70 pointer-events-none">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        {/* The Grid Wrapper: Ensuring it expands to 100% */}
        <div className="w-full pl-10">
          <GitHubCalendar
            username="tapash22"
            colorScheme="dark"
            blockSize={20}
            blockMargin={5}
            fontSize={12}
            theme={nativeGithubTheme}
            renderColorLegend={() => <></>}
            style={{
              width: "100%",
              color: "white",
              whiteSpace: "normal",
            }}
          />
        </div>
      </div>
    </div>
  );
};
