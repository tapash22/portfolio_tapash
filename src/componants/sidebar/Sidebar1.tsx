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

    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });

    gsap.fromTo(drawerRef.current, { x: "-100%" }, { x: "0%", duration: 0.5, ease: "power3.out" });
  }, [open]);

  // Prettier-safe multiline layout classes
  const desktopSidebarClasses = [
    "hidden lg:flex w-72 h-screen flex-col justify-between",
    "bg-(--sidebar)/20 z-50 backdrop-blur-xl relative py-12",
    "border-r border-(--border) shadow-(--shadow)",
  ].join(" ");

  const mobileDrawerClasses = [
    "w-72 h-full flex flex-col bg-[#121212] relative z-10",
    "border-r border-(--border)/60 shadow-2xl overflow-hidden",
  ].join(" ");

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-(--sidebar)/20 px-4 shadow-(--shadow) backdrop-blur-xl lg:hidden">
        <img
          src={portfolio_icon1}
          alt="Branding Avatar"
          className="h-12 w-12 rounded-full p-1 shadow-(--shadow-footer) ring-4 ring-(--neon)/5"
        />
        <button onClick={openDrawer} className="cursor-pointer p-1">
          <FiMenu size={24} className="text-(--foreground)" />
        </button>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className={desktopSidebarClasses}>
        {/* LOGO CONTAINER */}
        <div className="flex w-full items-center justify-start px-8">
          <img
            src={portfolio_icon1}
            alt="Branding Logo"
            className="h-24 w-24 rounded-full bg-black/40 object-contain p-1 shadow-(--shadow-footer) ring-4 ring-(--neon)/10 transition-transform duration-300 hover:rotate-6"
          />
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex flex-1 items-center pl-3">
          <ul className="flex w-full flex-col space-y-1">
            {routeConfig.map((route, i) => {
              const to = route.index ? "/" : `/${route.path}`;
              const active = isActiveRoute(to);

              return (
                <li key={i} className="w-full">
                  <button
                    onClick={() => handleNavigation(to)}
                    className={`group relative flex w-full cursor-pointer items-center py-3 text-left text-lg font-medium tracking-wide transition-all duration-300 outline-none ${active ? "font-semibold text-(--foreground)" : "text-(--muted) hover:text-(--foreground)"} `}
                  >
                    {/* Hover Gradient Sheet Background */}
                    <div
                      className={`pointer-events-none absolute inset-0 z-0 rounded-md bg-linear-to-r from-(--neon)/10 via-(--neon)/5 to-transparent transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"} `}
                    />

                    {/* Glowing Active Track Accent Marker */}
                    <span
                      className={`absolute -left-3 z-10 h-full w-1 rounded-r-full bg-(--neon) shadow-[0_0_30px_rgba(34,255,255,0.5)] transition-all duration-300 ${active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 group-hover:scale-y-75 group-hover:opacity-50"} `}
                    />

                    {/* Micro-interaction text shift */}
                    <span className="relative z-10 px-5 transition-transform duration-300 group-hover:translate-x-2">
                      {route.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* BRAND FOOTER ACCENT */}
        <div className="px-8 font-mono text-[10px] tracking-widest text-(--muted)/40 uppercase">
          © {new Date().getFullYear()} Tapash Paul
        </div>
      </aside>

      {/* ================= MOBILE DRAWER ================= */}
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* INTERACTIVE BACKGROUND BACKDROP OVERLAY */}
          <div
            ref={overlayRef}
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* INNER PANEL DRAWER CONTAINMENT SHEET */}
          <div ref={drawerRef} className={mobileDrawerClasses}>
            {/* MOBILE LOGO HEADER TRACK */}
            <div className="flex items-center justify-between border-b border-(--border)/40 bg-black/20 p-6">
              <img
                src={portfolio_icon1}
                alt="Mobile Logo"
                className="h-12 w-12 rounded-full bg-black/40 p-0.5 ring-2 ring-(--neon)/20"
              />
              <button
                onClick={closeDrawer}
                aria-label="Close Menu"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-(--border)/60 bg-(--background) transition-transform active:scale-90"
              >
                <FiX size={20} className="text-(--foreground)" />
              </button>
            </div>

            {/* MOBILE MENU NAV LINKS */}
            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="flex flex-col space-y-5">
                {routeConfig.map((route, i) => {
                  const to = route.index ? "/" : `/${route.path}`;
                  const active = isActiveRoute(to);

                  return (
                    <li key={i}>
                      <button
                        onClick={() => handleClick(to)}
                        className={`w-full cursor-pointer py-2 text-left text-xl font-medium tracking-wide transition-colors ${active ? "font-bold text-(--neon)" : "text-(--muted) active:text-(--foreground)"} `}
                      >
                        {route.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
