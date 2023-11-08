"use client";

import Loading from "@/app/loading";
import BreadCrumb from "@/components/BreadCrumb";
import { useGetAllWatchesQuery } from "@/redux/api/watches/watchApi";
import Image from "next/image";
import React from "react";

const WatchManagement = () => {
  const { data: watch, isLoading } = useGetAllWatchesQuery(undefined);
  console.log(watch);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <BreadCrumb current="Watch Management" redirectTo="Home" link="/" />

      <div className="max-w-[1300px] mx-auto mt-10">
        <div className="flex justify-end px-[30px] lg:px-[50px]">
          <button
            className="
                bg-gray-700 
                text-white
                hover:text-black 
                hover:bg-white
                hover:shadow
                border 
                border-gray-300 
                transition-all 
                duration-300
                px-4
                py-[5px]
            "
          >
            Add New Watch
          </button>
        </div>
        <div className="flex gap-5 flex-col sm:flex-row w-full border mt-5 p-5">
          <div className="flex flex-col gap-3 w-full sm:w-[50%] md:w-[33%] lg:w-[25%] h-[400px]">
            <div className="relative w-full h-[150px] p-3 border">
              <Image
                src={watch.image}
                alt="watch-image"
                fill
                // objectFit="contain"
              />
            </div>
            <div>
              <p>{watch?.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchManagement;
