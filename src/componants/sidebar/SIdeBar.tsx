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
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
    );

    gsap.fromTo(
      drawerRef.current,
      { x: "-100%" },
      { x: "0%", duration: 0.5, ease: "power3.out" },
    );
  }, [open]);

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 bg-(--sidebar)/20 z-50 shadow-(--shadow) backdrop-blur-xl">
        <img
          src={portfolio_icon1}
          className="w-12 h-12 rounded-full p-1 shadow-(--shadow-footer) ring-4 ring-(--neon)/5"
        />

        <button onClick={openDrawer}>
          <FiMenu size={24} className="text-(--foreground)" />
        </button>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <div
        className="hidden lg:flex w-72 h-screen flex-col justify-center bg-(--sidebar)/20 z-50 backdrop-blur-xl 
                  border-r border-(--border)
                  shadow-(--shadow) 
                  space-y-5 relative"
      >
        {/* LOGO */}

        <div className="px-5 py-3 w-full rounded-full flex justify-start items-center">
          <img
            src={portfolio_icon1}
            className="w-28 h-28 rounded-full p-1 shadow-(--shadow-footer) ring-4 ring-(--neon)/5"
          />
        </div>

        {/* MENU */}
        <ul className="flex flex-col space-y-3 w-fit px-10 ">
          {routeConfig.map((route, i) => {
            const to = route.index ? "/" : `/${route.path}`;

            return (
              <button
                key={i}
                onClick={() => handleNavigation(to)}
                className={`link text-left transition-colors text-lg ${
                  isActiveRoute(to)
                    ? "text-(--foreground) active-link"
                    : "text-(--muted) hover:text-(--neon)"
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
        <div className="fixed lg:hidden inset-0 z-50">
          {/* OVERLAY */}
          <div
            ref={overlayRef}
            onClick={closeDrawer}
            className="absolute inset-0 bg-(--background)/40 backdrop-blur-md "
          />

          {/* DRAWER */}
          <div className="absolute left-0 top-0 h-full w-72 flex">
            <div
              ref={drawerRef}
              className="
                w-72 h-screen
                flex flex-col
 
                border-r-2 border-(--border)
                  shadow-(--shadow)
                overflow-hidden
              "
            >
              {/* LOGO */}
              <div className="p-3 border-b-2 border-(--border) shadow-(--shadow-footer) flex items-center">
                <img src={portfolio_icon1} className="w-14 h-14" />
              </div>

              {/* MENU */}
              <ul className="flex flex-col space-y-3 flex-1 px-6 py-6">
                {routeConfig.map((route, i) => {
                  const to = route.index ? "/" : `/${route.path}`;

                  return (
                    <button
                      key={i}
                      onClick={() => handleClick(to)}
                      className={`text-left transition-colors ${
                        isActiveRoute(to)
                          ? "text-(--foreground)"
                          : "text-(--muted) hover:text-(--foreground)"
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
                className="
                  absolute top-4 right-4
                  w-12 h-12 flex items-center justify-center
                  rounded-full bg-(--background)
                  border-4 border-(--border)/20
                  hover:scale-110 transition
                "
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
