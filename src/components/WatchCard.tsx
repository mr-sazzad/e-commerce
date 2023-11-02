// WatchCard.tsx
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { ImEye } from "react-icons/im";

const isBrowser = typeof window !== "undefined";

const WatchCard = (watch: any) => {
  const gridActive = isBrowser ? localStorage.getItem("grid") : null;
  const [hovered, setHovered] = useState(false);

  const active = gridActive === "true";

  return (
    <div
      className={`flex flex-row items-center w-full gap-3 relative ${
        active ? "flex-col w-[260px] sm:w-[240px]" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-1 relative group">
        <div
          className={`w-[250px] sm:w-[230px] h-[250px] relative overflow-hidden ${
            active ? "w-[256px] sm:w-[236px]" : ""
          }`}
        >
          <Image
            src={watch.image}
            alt={watch.title}
            layout="fill"
            objectFit="cover"
          />
          {hovered && (
            <div className="absolute bottom-0 w-full flex justify-center pb-4 transition duration-300 ease-in-out">
              <button className="bg-white text-[#9F7A49] py-2 text-xl px-2 mx-1 transition duration-300 ease-in-out hover:bg-[#9F7A49] hover:text-white">
                <AiOutlineShoppingCart />
              </button>
              <button className="bg-white text-[#9F7A49] py-2 text-xl px-2 mx-1 transition duration-300 ease-in-out hover:bg-[#9F7A49] hover:text-white">
                <ImEye />
              </button>
              <button className="bg-white text-[#9F7A49] py-2 text-xl px-2 mx-1 transition duration-300 ease-in-out hover:bg-[#9F7A49] hover:text-white">
                <AiOutlineHeart />
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

export default WatchCard;
