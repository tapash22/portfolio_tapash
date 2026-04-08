import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="w-full h-full bg-black">
      <div className="w-1/4 fixed left-0 top-0 h-full bg-gray-900">
        container
      </div>
      <div className="w-3/4 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}
