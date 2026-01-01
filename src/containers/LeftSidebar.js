import routes from "../routes/sidebar";
import { NavLink, Routes, Link, useLocation } from "react-router-dom";
import SidebarSubmenu from "./SidebarSubmenu";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useDispatch } from "react-redux";

function LeftSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const close = (e) => {
    document.getElementById("left-sidebar-drawer").click();
  };

  return (
    <div className="drawer-side z-30">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu pt-2 w-80 bg-white min-h-full text-gray-600 shadow-lg">
        <button
          className="btn btn-ghost btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={() => close()}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>

        {/* Logo Section */}
        <li className="mb-8 mt-2">
          <Link
            to={"/app/welcome"}
            className="flex items-center gap-3 hover:bg-transparent"
          >
            <img className="w-8 h-8" src="/Group.png" alt="Logo" />
            <span className="text-xl font-semibold text-gray-800">EQUINIX</span>
          </Link>
        </li>

        {/* Menu Label */}
        <li className="px-4 mb-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            MENU
          </span>
        </li>

        {/* Menu Items */}
        {routes.map((route, k) => {
          return (
            <li className="mb-1" key={k}>
              {route.submenu ? (
                <SidebarSubmenu {...route} />
              ) : (
                <NavLink
                  end
                  to={route.path}
                  className="group flex items-center gap-3 px-4 py-3 rounded-lg mx-2
             transition-all duration-200
             text-gray-700
             hover:!bg-red-500 hover:!text-white"
                >
                  <span className="text-lg text-red-500">{route.icon}</span>
                  <span className="text-sm">{route.name}</span>
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftSidebar;
