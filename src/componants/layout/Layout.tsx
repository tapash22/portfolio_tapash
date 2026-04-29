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
    if (!pageRef.current || !scrollRef.current) return;

    // 🔥 ALWAYS RESET SCROLL TO TOP ON ROUTE CHANGE
    scrollRef.current.scrollTop = 0;

    // enter animation
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

    // optional scroll hint animation
    gsap.to(scrollRef.current, {
      scrollTop: isGoingDown ? 120 : 0,
      duration: 0.4,
      ease: "power2.out",
    });

    // exit animation
    pageExit(pageRef.current, () => {
      navigate(path);
      lastIndexRef.current = toIndex;

      // 🔥 RESET SCROLL AFTER NAVIGATION SAFELY
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = 0;
        }
      });
    });
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-(--background)">
      <SideBar handleNavigation={handleNavigation} />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* ✅ MOBILE HEADER SPACE (GLOBAL FIX) */}
        <div className="h-14 md:hidden shrink-0" />

        {/* PAGE AREA */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin h-full"
        >
          <div ref={pageRef} className="w-full h-full">
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
