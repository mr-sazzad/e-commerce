import Image from "next/image";
import React from "react";
import Link from "next/link";

import { AiOutlineShoppingCart } from "react-icons/ai";

const HeroSection = () => {
  return (
    <div className="max-w-[1200px] mx-auto relative">
      <div
        className="
            flex
            md:flex-row 
            md:justify-between 
            gap-5 
            items-center 
            h-[300px]
            md:h-[500px]
            pt-5
            px-[30px]
            lg:px-[50px]
            banner-bg
            overflow-hidden
          "
      >
        <div className="flex-1 relative z-20">
          <div className="flex flex-col items-center p-5 md:p-7 lg:-10">
            <div>
              <h1
                className="
                    text-3xl
                    sm:text-4xl
                    md:text-4xl 
                    lg:text-5xl 
                    xl:text-6xl 
                    font-semibold 
                    text-center 
                    md:text-start 
                    text-[#9F7A49]
                    transition
                    relative z-20
                  "
              >
                Where Time Comes Alive: Shop the Latest Watch Trends
              </h1>
              <div>
                <Link
                  href="/watches"
                  className="
                      flex 
                      gap-3 
                      items-center 
                      mt-8 
                      border
                      border-[#9F7A49]
                      text-[#9F7A49]
                      px-4 py-2 
                      rounded-sm 
                      hover:text-white
                      hover:bg-[#9F7A49] 
                      transition-all 
                      duration-300
                    "
                >
                  <AiOutlineShoppingCart />
                  <span className="ml-2">Shop Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 md:flex hidden relative z-20" />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-10"></div>
    </div>
  );
};

export default HeroSection;
