"use client";

import Image from "next/image";
import React from "react";

const UpcomingCard = (watch: any) => {
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
            objectFit="contain"
          />
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
