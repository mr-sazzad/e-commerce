"use client";

import Image from "next/image";
import React, { useState } from "react";

import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { ImEye } from "react-icons/im";

const UpcomingCard = (watch: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="
        flex 
        flex-row 
        sm:flex-col 
        w-full
        sm:w-[245px]
        gap-3 
        relative 
        border 
        border-gray-200
        items-center 
      "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="
            p-2 
            relative 
            group
        "
      >
        <div
          className="
            relative 
            w-[160px] 
            sm:w-[230px] 
            h-[160px]
            overflow-hidden
        "
        >
          <Image
            src={watch.image}
            alt={watch.title}
            layout="fill"
            objectFit="cover"
          />
          {hovered && (
            <div className="absolute bottom-0 w-full flex justify-center pb-4 transition duration-300 ease-in-out">
              <button className="bg-white text-[#9F7A49] py-3 text-xl px-5 mx-1 transition duration-300 ease-in-out hover:bg-[#9F7A49] hover:text-white">
                <AiOutlineHeart className="text-2xl" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-5">
        <p className="text-lg font-medium">{watch.title}</p>
        <p>${watch.price}</p>
      </div>
      <style jsx>{`
        button {
          transition: all 0.3s ease;
        }
        button:hover {
          background-color: #9f7a49;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default UpcomingCard;
