import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import portfolio_icon1 from "../../assets/images/logoi.png";

import { routeConfig } from "../../routes/routeConfig";

type Props = {
  handleNavigation: (path: string) => void;
};

export function SideBar({ handleNavigation }: Props) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const drawerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // FIX: define active route checker
  const isActiveRoute = (path: string) => location.pathname === path;

  const handleClick = (path: string) => {
    handleNavigation(path);
    closeDrawer();
  };

  const openDrawer = () => setOpen(true);

  const closeDrawer = () => {
    if (!drawerRef.current || !overlayRef.current) {
      setOpen(false);
      return;
    }

    gsap.to(drawerRef.current, {
      x: "-100%",
      duration: 0.4,
      ease: "power3.in",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setOpen(false),
    });
  };

  useEffect(() => {
    if (!open) return;

    // OPEN ANIMATION
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });

    gsap.fromTo(drawerRef.current, { x: "-100%" }, { x: "0%", duration: 0.5, ease: "power3.out" });
  }, [open]);

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-(--sidebar)/20 px-4 shadow-(--shadow) backdrop-blur-xl lg:hidden">
        <img
          src={portfolio_icon1}
          className="h-12 w-12 rounded-full p-1 shadow-(--shadow-footer) ring-4 ring-(--neon)/5"
        />

        <button onClick={openDrawer}>
          <FiMenu size={24} className="text-(--foreground)" />
        </button>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="relative z-50 hidden h-screen w-72 flex-col justify-center space-y-5 border-r border-(--border) bg-(--sidebar)/20 shadow-(--shadow) backdrop-blur-xl lg:flex">
        {/* LOGO */}

        <div className="flex w-full items-center justify-start rounded-full px-5 py-3">
          <img
            src={portfolio_icon1}
            className="h-28 w-28 rounded-full p-1 shadow-(--shadow-footer) ring-4 ring-(--neon)/5"
          />
        </div>

        {/* MENU */}
        <ul className="flex w-fit flex-col space-y-3 px-10">
          {routeConfig.map((route, i) => {
            const to = route.index ? "/" : `/${route.path}`;

            return (
              <button
                key={i}
                onClick={() => handleNavigation(to)}
                className={`link text-left text-lg transition-colors ${
                  isActiveRoute(to) ? "active-link text-(--foreground)" : "text-(--muted) hover:text-(--neon)"
                }`}
              >
                {route.title}
              </button>
            );
          })}
        </ul>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* OVERLAY */}
          <div
            ref={overlayRef}
            onClick={closeDrawer}
            className="absolute inset-0 bg-(--background)/40 backdrop-blur-md"
          />

          {/* DRAWER */}
          <div className="absolute top-0 left-0 flex h-full w-72">
            <div
              ref={drawerRef}
              className="flex h-screen w-72 flex-col overflow-hidden border-r-2 border-(--border) shadow-(--shadow)"
            >
              {/* LOGO */}
              <div className="flex items-center border-b-2 border-(--border) p-3 shadow-(--shadow-footer)">
                <img src={portfolio_icon1} className="h-14 w-14" />
              </div>

              {/* MENU */}
              <ul className="flex flex-1 flex-col space-y-3 px-6 py-6">
                {routeConfig.map((route, i) => {
                  const to = route.index ? "/" : `/${route.path}`;

                  return (
                    <button
                      key={i}
                      onClick={() => handleClick(to)}
                      className={`text-left transition-colors ${
                        isActiveRoute(to) ? "text-(--foreground)" : "text-(--muted) hover:text-(--foreground)"
                      }`}
                    >
                      {route.title}
                    </button>
                  );
                })}
              </ul>

              {/* CLOSE BUTTON */}
              <button
                onClick={closeDrawer}
                className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-(--border)/20 bg-(--background) transition hover:scale-110"
              >
                <FiX size={24} className="text-(--foreground)" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
