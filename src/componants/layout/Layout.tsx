import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SideBar } from "../sidebar/SIdeBar";
import { useLayoutEffect, useRef } from "react";
import { pageEnter, pageExit } from "../../animations/pageTransition";
import { routeIndexMap } from "../../routes/routeConfig";
import gsap from "gsap";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const pageRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ✅ FIX: stable index tracker (DO NOT depend on location during animation)
  const lastIndexRef = useRef(routeIndexMap[location.pathname] ?? 0);

  //   const currentPath = location.pathname;

  //  ENTER animation on route change
  useLayoutEffect(() => {
    if (!pageRef.current) return;
    pageEnter(pageRef.current);
  }, [location.pathname]);

  // NAVIGATION WITH EXIT + SCROLL CONTROL
  const handleNavigation = (path: string) => {
    if (!pageRef.current || !scrollRef.current) {
      navigate(path);
      return;
    }

    const fromIndex = lastIndexRef.current;
    const toIndex = routeIndexMap[path] ?? 0;

    const isGoingDown = toIndex > fromIndex;

    console.log("FROM INDEX:", fromIndex);
    console.log("TO INDEX:", toIndex);
    console.log("DIRECTION:", isGoingDown ? "DOWN ⬇" : "UP ⬆");

    // -----------------------------
    // SCROLL ANIMATION
    // -----------------------------
    gsap.to(scrollRef.current, {
      scrollTop: isGoingDown ? 120 : 0,
      duration: 0.5,
      ease: "power2.out",
    });

    // -----------------------------
    // EXIT ANIMATION + NAVIGATE
    // -----------------------------
    pageExit(pageRef.current, () => {
      navigate(path);

      // ✅ update index AFTER navigation logic
      lastIndexRef.current = toIndex;

      // -----------------------------
      // RESET SCROLL AFTER ROUTE CHANGE
      // -----------------------------
      setTimeout(() => {
        gsap.to(scrollRef.current, {
          scrollTop: isGoingDown ? 40 : 0,
          duration: 0.6,
          ease: "power2.out",
        });
      }, 200);
    });
  };

  return (
    <div className="h-screen w-full flex overflow-hidden  bg-(--background)">
      <div className="w-1/6 fixed left-0 top-0 h-full bg-gray-900">
        <SideBar handleNavigation={handleNavigation} />
      </div>
      <div
        ref={scrollRef}
        className="ml-[16.6%] w-5/6 overflow-y-auto p-5 scrollbar-thin"
      >
        <div ref={pageRef} className="w-full min-h-full">
          <Outlet
          // context={{
          //   handleNavigation,
          // }}
          />
        </div>
      </div>
    </div>
  );
}
