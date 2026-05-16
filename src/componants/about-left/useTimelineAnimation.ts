// useTimelineAnimation.ts
import { gsap } from "gsap";
import { RefObject, useEffect } from "react";

export const useTimelineAnimation = (
  pathRefs: RefObject<(SVGPathElement | null)[]>,
  dotRefs: RefObject<(SVGCircleElement | null)[]>,
  cardRectRefs: RefObject<(SVGRectElement | null)[]>,
  localDotTopRefs: RefObject<(SVGCircleElement | null)[]>,
  localDotBottomRefs: RefObject<(SVGCircleElement | null)[]>,
  pathStrings: string[],
) => {
  useEffect(() => {
    if (!pathStrings.length) return;

    const ctx = gsap.context(() => {
      pathStrings.forEach((d, index) => {
        const path = pathRefs.current?.[index];
        const dot = dotRefs.current?.[index];

        if (path && dot) {
          // Instantly updates the path data string dynamically as the grid updates heights
          gsap.set(path, { attr: { d: d } });

          const totalLength = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: totalLength,
            strokeDashoffset: 0,
          });

          // Maintain the independent floating particle animation loop
          const tracker = { progress: 0 };
          gsap.to(tracker, {
            progress: 1,
            duration: 6,
            repeat: -1,
            ease: "none",
            onUpdate: () => {
              try {
                const currentLength = path.getTotalLength();
                const point = path.getPointAtLength(
                  tracker.progress * currentLength,
                );
                gsap.set(dot, { cx: point.x, cy: point.y });
              } catch (err) {
                // Safe catch block for rendering frame updates
              }
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, [pathStrings, pathRefs, dotRefs]);
};
