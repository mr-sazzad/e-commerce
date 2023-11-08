"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
// import { NavbarItems } from "@/constants/menubar";
// import { getUserFromLocalStorage } from "@/helpers/jwt";

const mobileMenuHeight = `calc(100vh - 64px)`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // const currentUser = getUserFromLocalStorage() as any;

  // const menuItems = NavbarItems(currentUser?.role);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="sticky z-[1000]">
      <div className="border-b border-gray-200">
        <div className="h-16 flex items-center justify-between lg:px-16 px-4 md:px-6 relative z-10 max-w-[1200px] mx-auto">
          <Logo />
          <div className="hidden lg:flex">
            <ul className="flex gap-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/watches">Products</Link>
              </li>
              <li>
                <Link href="/user/cart">Cart</Link>
              </li>
              <li>
                <Link href="/sign-in">Login</Link>
              </li>
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
          <ul className="flex flex-col gap-4 ml-5 pt-5">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/watches">Products</Link>
            </li>
            <li>
              <Link href="/user/cart">Cart</Link>
            </li>
            <li>
              <Link href="/sign-in">Login</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
