import { useLocation } from "react-router-dom";
import { routeConfig } from "../../routes/routeConfig";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiMenu, FiX } from "react-icons/fi";
import portfolio_icon from "../../assets/images/portfolio_icon.png";

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
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 w-full h-14 flex items-center justify-between px-4 bg-(--sidebar) z-50 shadow-(--shadow) backdrop-blur-xl">
        <img src={portfolio_icon} className="w-10 h-10" />

        <button onClick={openDrawer}>
          <FiMenu size={24} className="text-(--foreground)" />
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex w-72 h-screen justify-start items-center p-5 bg-(--sidebar) shadow-(--shadow) z-50 ">
        <div className="flex flex-col ">
          <img src={portfolio_icon} className="w-10 h-10 ml-5" />

          <ul className="flex flex-col space-y-3 w-full p-5">
            {routeConfig.map((route, i) => {
              const to = route.index ? "/" : `/${route.path}`;

              return (
                <button
                  key={i}
                  onClick={() => handleNavigation(to)}
                  className={`link text-left transition-colors ${
                    isActiveRoute(to)
                      ? "text-(--foreground) active-link"
                      : "text-(--muted) hover:text-(--foreground)"
                  }`}
                >
                  {route.title}
                </button>
              );
            })}
          </ul>
        </div>
      </div>

      {/* MOBILE OVERLAY + GLASS DRAWER */}
      {open && (
        <div className="fixed md:hidden inset-0 z-50">
          {/* OVERLAY */}
          <div
            ref={overlayRef}
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* DRAWER WRAPPER (moves together) */}
          <div className="absolute left-0 top-0 h-full flex items-start">
            {/* DRAWER */}
            <div
              ref={drawerRef}
              className="w-72 h-full bg-white/5 backdrop-blur-2xl relative
              space-y-5
              flex flex-col justify-center 
                 border-r border-(--border)
                 shadow-[0_10px_40px_rgba(0,0,0,0.4)]
                 p-16"
            >
              <img src={portfolio_icon} className="w-10 h-10" />

              <ul className="flex flex-col  space-y-3 h-full ">
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
              {/* CONNECTED CLOSE BUTTON */}
              <button
                onClick={closeDrawer}
                className="absolute top-2 -right-5 z-60
                 w-10 h-10 flex items-center justify-center
                 rounded-full bg-(--background) backdrop-blur-xl
                 border border-(--border)
                 hover:bg-white/20 hover:scale-110
                 transition-all duration-700"
              >
                <FiX size={22} className="text-(--foreground)" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
