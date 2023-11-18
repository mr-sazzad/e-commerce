"use client";
// "use client";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { NavbarItems } from "@/constants/menubar";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { removeFromLocalStorage } from "@/helpers/localStorage";
import { KEY } from "@/types";
import toast from "react-hot-toast";

const mobileMenuHeight = `calc(100vh - 64px)`;

const Navbar = () => {
  const [userKey, setUserKey] = useState(0);

  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!getUserFromLocalStorage()
  );

  const currentUser = getUserFromLocalStorage() as any;

  useEffect(() => {
    setIsAuthenticated(!!getUserFromLocalStorage());
  }, [currentUser, userKey]);

  useEffect(() => {
    setIsAuthenticated(!!getUserFromLocalStorage());
  }, [currentUser]);

  let menuItems = NavbarItems(currentUser?.role);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    setTimeout(() => {
      removeFromLocalStorage(KEY);
      toast.success("User Signed Out");
      setIsAuthenticated(false);
      setUserKey((prevKey) => prevKey + 1);
    }, 1500);
  };

  return (
    <div className="sticky z-[1000]">
      <div className="border-b border-gray-200">
        <div className="h-16 flex items-center justify-between lg:px-16 px-4 md:px-6 relative z-10 max-w-[1200px] mx-auto">
          <Logo />
          <div className="hidden lg:flex">
            <ul className="flex gap-4">
              {menuItems?.map((item: any) => (
                <li key={item?.key}>
                  <Link href={item?.href}>{item?.label}</Link>
                </li>
              ))}
              {isAuthenticated ? (
                <li>
                  <button onClick={handleSignOut}>Sign Out</button>
                </li>
              ) : (
                <li>
                  <Link href="/sign-in">Log In</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="lg:hidden">
            <div onClick={handleOpen}>
              {open ? (
                <RxCross2 className="text-[20px] cursor-pointer hover:text-gray-600 transition-all duration-300" />
              ) : (
                <HiMenuAlt3 className="text-[20px] cursor-pointer hover:text-gray-600 transition-all duration-300" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-gray-200 w-[200px] ml-auto absolute top-16 right-0 z-20"
        style={{
          height: open ? mobileMenuHeight : "0",
          transition: "height 300ms ease",
        }}
      >
        {open && (
          <ul className="flex flex-col gap-4 ml-5 pt-5 z-[2000]">
            {menuItems?.map((item: any) => (
              <li
                key={item?.key}
                className="py-1 px-2 hover:bg-gray-300 w-full"
              >
                <Link href={item?.href}>{item?.label}</Link>
              </li>
            ))}
            {isAuthenticated ? (
              <li className="py-1 px-2 hover:bg-gray-300 w-full">
                <button onClick={handleSignOut}>Sign Out</button>
              </li>
            ) : (
              <li className="py-1 px-2 hover:bg-gray-300 w-full">
                <Link href="/sign-in">Log In</Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
