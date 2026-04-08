import { Outlet } from "react-router-dom";
import { SideBar } from "../sidebar/SIdeBar";

export function Layout() {
  return (
    <div className="h-screen w-full flex overflow-hidden  bg-(--background)">
      <div className="w-1/6 fixed left-0 top-0 h-full bg-gray-900">
        <SideBar />
      </div>
      <div className="ml-[16.6%] w-5/6 overflow-y-scroll p-5 scrollbar-thin">
        <Outlet />
      </div>
    </div>
  );
}
