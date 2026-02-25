import routes from "../routes/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import SidebarSubmenu from "./SidebarSubmenu";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useDispatch } from "react-redux";

function LeftSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const close = () => {
    document.getElementById("left-sidebar-drawer").click();
  };

  return (
    <div className="drawer-side z-30">
      <label
        htmlFor="left-sidebar-drawer"
        className="drawer-overlay"
        onClick={close}
      ></label>

      <aside
        className="flex flex-col h-full bg-white shadow-lg"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        {/* Close button for mobile */}
        <button
          className="btn btn-ghost btn-circle absolute top-3 right-3 lg:hidden"
          onClick={close}
        >
          <XMarkIcon className="h-5 w-5 text-gray-500" />
        </button>

        {/* Logo Section */}
        <div className="flex items-center gap-2 px-5 pt-6 pb-5">
          <img
            src="http://localhost:3002/equi.png"
            alt="Equinix Logo"
            style={{ height: "28px", width: "auto", objectFit: "contain" }}
          />
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "#f0f0f0",
            margin: "8px 0 10px 0",
          }}
        />

        {/* Menu Label */}
        <div
          className="px-5 pb-2"
          style={{
            fontSize: "14px",
            fontWeight: "400",
            letterSpacing: "0.1em",
            marginLeft: "1rem",
            color: "#999",
            fontFamily: "sans-serif",
          }}
        >
          MENU
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-0.5 px-8 flex-1">
          {routes.map((route, k) => {
            const isActive = location.pathname === route.path;

            return (
              <div key={k}>
                {route.submenu ? (
                  <SidebarSubmenu {...route} />
                ) : (
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 mt-4  rounded-md text-sm font-medium transition-all  duration-150 ${
                        isActive
                          ? "bg-red-600 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`
                    }
                    style={{ fontFamily: "sans-serif", textDecoration: "none" }}
                  >
                    <span
                      className={`h-5 w-5 flex-shrink-0 ${
                        location.pathname === route.path
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      {route.icon}
                    </span>
                    <span>{route.name}</span>
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}

export default LeftSidebar;
