import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SideBar } from "../sidebar/SIdeBar";
import { useLayoutEffect, useRef } from "react";
import { pageEnter, pageExit } from "../../animations/pageTransition";
import { SocialMediaList } from "../list/SocialMediaList";
import { socialMediaLinkList } from "../../storage/data/social-media-links";
import { useNavigationDirection } from "../../hook/useNavigationDirection";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const pageRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  //stable index tracker (DO NOT depend on location during animation)
  const { getDirection, updateIndex } = useNavigationDirection();

  // ENTER animation
  useLayoutEffect(() => {
    if (!pageRef.current || !scrollRef.current) return;

    const { isGoingForward, toIndex } = getDirection(location.pathname);

    updateIndex(toIndex);

    scrollRef.current.scrollTo({ top: 0 });

    pageEnter(pageRef.current, isGoingForward);
  }, [location.pathname, getDirection, updateIndex]);

  // NAVIGATION
  const handleNavigation = (path: string) => {
    if (!pageRef.current || !scrollRef.current) return;

    const { isGoingForward, toIndex } = getDirection(path);

    pageExit(
      pageRef.current,
      () => {
        navigate(path);

        updateIndex(toIndex);

        requestAnimationFrame(() => {
          scrollRef.current?.scrollTo({ top: 0 });
        });
      },
      isGoingForward,
    );
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
          className={`flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin h-full`}
        >
          <div ref={pageRef} className="w-full min-h-full">
            <Outlet
              context={{
                scrollRef,
              }}
            />
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
