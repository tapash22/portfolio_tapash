import { useLocation } from "react-router-dom";
import { routeConfig } from "../../routes/routeConfig";

type Props = {
  handleNavigation: (path: string) => void;
};

export function SideBar({ handleNavigation }: Props) {
  const location = useLocation();

  // FIX: define active route checker
  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <div className="w-72 h-screen flex justify-start items-center p-5 bg-(--sidebar) shadow-(--shadow) z-50 ">
      <div className="flex flex-col ">
        <h1 className="text-4xl font-bold text-start px-5 italic text-(--foreground)">
          T
        </h1>

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
  );
}
