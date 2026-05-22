import { useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { pageEnter, pageExit } from "../../animations/pageTransition";
import { useNavigationDirection } from "../../hook/useNavigationDirection";
import { socialMediaLinkList } from "../../storage/data/social-media-links";
import { SocialMediaList } from "../list/SocialMediaList";
import { GsapLoader } from "../pre-loader/GsapLoader";
import { SideBar } from "../sidebar/SIdeBar";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const pageRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [isChangingRoute, setIsChangingRoute] = useState(false);
  const [isContentReady, setIsContentReady] = useState(true);

  //stable index tracker (DO NOT depend on location during animation)
  const { getDirection, updateIndex } = useNavigationDirection();

  // ENTER animation
  useLayoutEffect(() => {
    if (!pageRef.current || !scrollRef.current || !isContentReady) return;

    const { isGoingForward, toIndex } = getDirection(location.pathname);

    updateIndex(toIndex);

    scrollRef.current.scrollTo({ top: 0 });

    pageEnter(pageRef.current, isGoingForward);
  }, [location.pathname, getDirection, updateIndex, isContentReady]);

  // NAVIGATION
  const handleNavigation = (path: string) => {
    if (!pageRef.current || !scrollRef.current) return;

    const { isGoingForward, toIndex } = getDirection(path);

    // 1. Fire page exit slide/fade
    pageExit(
      pageRef.current,
      () => {
        // 2. Mid-transition: Bring up the GSAP loader curtain
        setIsChangingRoute(true);
        setIsContentReady(false);

        // 3. Mount the new local route component structure
        navigate(path);
        updateIndex(toIndex);

        requestAnimationFrame(() => {
          scrollRef.current?.scrollTo({ top: 0 });
        });

        // 4. Since data is local, a crisp 500ms beat is perfect for the loop to shine
        setTimeout(() => {
          setIsChangingRoute(false);
          setIsContentReady(true);
        }, 1000);
      },
      isGoingForward,
    );
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-(--background)">
      {/* Absolute high-z overlay loader layer */}

      <SideBar handleNavigation={handleNavigation} />

      {/* RIGHT SIDE */}
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        {isChangingRoute && <GsapLoader />}

        {/* ✅ MOBILE HEADER SPACE (GLOBAL FIX) */}
        <div className="h-14 shrink-0 md:hidden" />

        {/* PAGE AREA */}
        <div
          ref={scrollRef}
          className={`scrollbar-thin h-full flex-1 overflow-x-hidden overflow-y-auto`}
        >
          <div ref={pageRef} className="flex min-h-full w-full items-center">
            <Outlet
              context={{
                scrollRef,
              }}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="w-full shrink-0">
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
