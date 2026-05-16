// useTimelinePaths.ts
import { RefObject, useEffect, useState } from "react";

export const useTimelinePaths = (
  containerRef: RefObject<HTMLDivElement | null>,
  imageDotRef: RefObject<HTMLDivElement | null>,
  boxRefs: RefObject<(HTMLDivElement | null)[]>,
  expandedIndex: number,
): string[] => {
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const calculatePaths = () => {
      if (!containerRef.current || !imageDotRef.current || !boxRefs.current)
        return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const startDotRect = imageDotRef.current.getBoundingClientRect();

      const startX =
        startDotRect.left - containerRect.left + startDotRect.width / 2;
      const startY =
        startDotRect.top - containerRect.top + startDotRect.height / 2;

      const activeBoxes = boxRefs.current.filter((box) => box !== null);

      const newPaths = activeBoxes.map((box) => {
        const boxRect = box.getBoundingClientRect();

        const x = boxRect.left - containerRect.left;
        const y = boxRect.top - containerRect.top;
        const w = boxRect.width;
        const h = boxRect.height;
        const radius = 12;

        // FIXED TOUCH POINT: Locked to 28px from the top of the card (aligned with title).
        // This coordinate stays 100% still when the box expands downwards!
        const touchX = x;
        const touchY = y + 28;

        const approachLine = `M ${startX} ${startY} C ${(startX + touchX) / 2} ${startY}, ${(startX + touchX) / 2} ${touchY}, ${touchX} ${touchY}`;

        const boxBorderLoop = `
          V ${y + radius}
          A ${radius} ${radius} 0 0 1 ${x + radius} ${y}
          H ${x + w - radius}
          A ${radius} ${radius} 0 0 1 ${x + w} ${y + radius}
          V ${y + h - radius}
          A ${radius} ${radius} 0 0 1 ${x + w - radius} ${y + h}
          H ${x + radius}
          A ${radius} ${radius} 0 0 1 ${x} ${y + h - radius}
          V ${touchY}
        `;

        return `${approachLine} ${boxBorderLoop}`.replace(/\s+/g, " ");
      });

      setPaths(newPaths);
    };

    calculatePaths();

    // Track sizing changes smoothly during expansions
    const resizeObserver = new ResizeObserver(() => calculatePaths());
    boxRefs.current.forEach((box) => {
      if (box) resizeObserver.observe(box);
    });

    window.addEventListener("resize", calculatePaths);
    return () => {
      window.removeEventListener("resize", calculatePaths);
      resizeObserver.disconnect();
    };
  }, [containerRef, imageDotRef, boxRefs, expandedIndex]);

  return paths;
};
