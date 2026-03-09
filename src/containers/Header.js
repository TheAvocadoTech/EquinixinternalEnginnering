import { themeChange } from "theme-change";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { openRightDrawer } from "../features/common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";
import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const { noOfNotifications, pageTitle } = useSelector((state) => state.header);
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme"),
  );

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
  }, []);

  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: "Notifications",
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      }),
    );
  };

  function logoutUser() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <>
      <div className="navbar sticky top-0 bg-white z-10 shadow-sm border-b border-gray-200 px-6 h-[4.5rem]">
        {/* <div className="hidden lg:block h-20 w-px mr-4 bg-gray-200 " /> */}
        {/* Left Section - Logo, Divider, Menu toggle and Search */}
        <div className="flex-1 flex items-center gap-4">
          {/* Equinix Logo with border box */}

          {/* Vertical Divider Line after Logo */}

          {/* Mobile menu toggle */}
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-ghost btn-circle lg:hidden"
          >
            <Bars3Icon className="h-6 w-6 text-gray-600" />
          </label>

          {/* Search Bar */}
          <div className="relative hidden md:block">
            <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2.5 w-96 shadow-sm">
              {/* Search Icon */}
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-3" />

              {/* Input Field */}
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-base text-gray-600 placeholder-gray-400 w-full"
              />

              {/* Keyboard Shortcut Hint */}
              <div className="flex items-center gap-1.5 ml-2 text-gray-400 select-none">
                {/* Windows Icon */}
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M0 3.449L9.75 2.1V11.59H0V3.449zm0 8.851h9.75v9.439L0 20.351V12.3zm10.65-10.42L24 0v11.59h-13.35V1.88zm0 10.42H24V24l-13.35-1.928V12.3z" />
                </svg>
                <span className="text-sm font-light">+</span>
                <span className="text-sm font-medium">F</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Icons and Profile */}
        <div className="flex items-center gap-6">
          {/* Notification Bell Section */}
          <div className="relative">
            <div className="p-3 bg-gray-50 rounded-2xl flex items-center justify-center">
              <div className="relative">
                <BellIcon className="h-7 w-7 text-gray-800" strokeWidth={1.5} />
                {/* Small Red Dot on Bell */}
                <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 border-2 border-gray-50 rounded-full"></span>
              </div>
            </div>
            {/* Notification Count Badge */}
            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[12px] font-bold text-white border-2 border-white">
              2
            </span>
          </div>

          {/* User Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded-xl transition-colors"
            >
              {/* Avatar Image */}
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-blue-100">
                <img
                  src="path_to_your_avatar_image.jpg"
                  alt="Vaasudeva"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Name */}
              <span className="text-xl font-bold text-gray-800">Vaasudeva</span>

              {/* Filled Down Arrow */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5101 15.1999L15.4801 13.2299L18.6901 10.0199C19.3601 9.33993 18.8801 8.17993 17.9201 8.17993L11.6901 8.17993L6.0801 8.17993C5.1201 8.17993 4.6401 9.33993 5.3201 10.0199L10.5001 15.1999C11.3201 16.0299 12.6801 16.0299 13.5101 15.1999Z"
                  fill="#2D2D2D"
                />
              </svg>
            </label>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow-xl bg-white rounded-xl w-52 border border-gray-100 z-[1]"
            >
              <li>
                <a
                  onClick={logoutUser}
                  className="text-red-600 font-medium py-3"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
