import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SideBar } from "../sidebar/SIdeBar";
import { useLayoutEffect, useRef } from "react";
import { pageEnter, pageExit } from "../../animations/pageTransition";
import { routeIndexMap } from "../../routes/routeConfig";
import gsap from "gsap";
import { SocialMediaList } from "../list/SocialMediaList";
import { socialMediaLinkList } from "../../storage/data/social-media-links";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const pageRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  //stable index tracker (DO NOT depend on location during animation)
  const lastIndexRef = useRef(routeIndexMap[location.pathname] ?? 0);

  // ENTER animation on route change
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

    // SCROLL ANIMATION
    gsap.to(scrollRef.current, {
      scrollTop: isGoingDown ? 120 : 0,
      duration: 0.5,
      ease: "power2.out",
    });

    // EXIT ANIMATION + NAVIGATE
    pageExit(pageRef.current, () => {
      navigate(path);

      // update index AFTER navigation logic
      lastIndexRef.current = toIndex;

      // RESET SCROLL AFTER ROUTE CHANGE
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
    <div className="h-full md:h-screen w-full flex overflow-hidden bg-(--background)">
      <SideBar handleNavigation={handleNavigation} />
      <div className="bg-amber-800 h-28 sm:h-28 md:hidden shrink-0 " />
      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* PAGE AREA (NO NATIVE SCROLL CONFLICT) */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto md:overflow-y-hidden h-full py-5"
        >
          <div ref={pageRef} className="w-full h-full py-2">
            <Outlet />
          </div>
        </div>

        {/* FOOTER */}
        <div className="shrink-0 w-full">
          <SocialMediaList
            socailMediaItems={socialMediaLinkList}
            listDirection="row"
            iconColor="foreground"
            iconSize={24}
            backgroundColor="sidebar"
          />
        </div>
      </div>
    </div>
  );
}
