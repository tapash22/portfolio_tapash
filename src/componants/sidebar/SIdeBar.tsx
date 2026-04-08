import { NavLink } from "react-router-dom";
import { routeConfig } from "../../routes/routeConfig";

export function SideBar() {
  return (
    <div className="w-full h-screen flex justify-start items-center p-5 bg-(--sidebar)">
      <div className="flex flex-col space-y-5">
        <h1 className="text-3xl text-center italic text-(--foreground)">T</h1>

        <ul className="flex flex-col space-y-3 w-full p-5">
          {routeConfig.map((route, i) => {
            const to = route.index ? "/" : `/${route.path}`;

            return (
              <NavLink
                key={i}
                to={to}
                className="link text-(--muted) hover:text-(--foreground) transition-colors"
              >
                {route.title}
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
