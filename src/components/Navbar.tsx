"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";

const mobileMenuHeight = `calc(100vh - 85px)`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="sticky">
      <div className="h-16 border-b border-gray-300 flex items-center justify-between lg:px-16 px-4 md:px-6 relative z-10">
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
              <Link href="/cart">Cart</Link>
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
      {open && (
        <div
          className="bg-gray-200 w-[200px] ml-auto absolute top-16 right-0 z-20"
          style={{
            height: mobileMenuHeight,
            transitionProperty: "height",
            transitionDuration: "300ms",
            transitionTimingFunction: "ease",
          }}
        >
          <ul className="flex flex-col gap-4 ml-5">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/watches">Products</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <Link href="/sign-in">Login</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
