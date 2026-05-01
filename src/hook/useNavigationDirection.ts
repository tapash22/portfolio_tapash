import { useRef } from "react";
import { routeIndexMap } from "../routes/routeConfig";

export const useNavigationDirection = () => {
  const lastIndexRef = useRef(routeIndexMap["/"] ?? 0);

  const getDirection = (toPath: string) => {
    const fromIndex = lastIndexRef.current;
    const toIndex = routeIndexMap[toPath] ?? 0;

    const isGoingForward = toIndex > fromIndex;

    return {
      fromIndex,
      toIndex,
      isGoingForward,
    };
  };

  const updateIndex = (toIndex: number) => {
    lastIndexRef.current = toIndex;
  };

  return {
    getDirection,
    updateIndex,
  };
};
