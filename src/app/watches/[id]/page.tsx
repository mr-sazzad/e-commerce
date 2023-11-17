"use client";

import Loading from "@/app/loading";
import BreadCrumb from "@/components/BreadCrumb";
import Divider from "@/components/Divider";
import { useGetSingleWatchQuery } from "@/redux/api/watches/watchApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

import { BsBookmarkCheck } from "react-icons/bs";

const SingleWatchPage = () => {
  const { id } = useParams();
  const { data: watch, isLoading } = useGetSingleWatchQuery(id);

  console.log(watch, "watch");

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <BreadCrumb
        link="/watches"
        redirectTo="Watches"
        current="Watch Details"
      />
      <div className="max-w-[1300px] mx-auto px-[30px] lg:px-[50px]">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row gap-5 mt-[100px] relative">
            <div className="relative w-full md:h-[300px] sm:h-[260px] h-[240px] flex-shrink-0 md:flex-1">
              <Image
                src={watch?.image}
                alt="watch_image"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-semibold">{watch?.title}</p>
              <div className="flex justify-between gap-10 items-center">
                <p className="text-lg ml-2">${watch?.price}</p>
                <p className="flex items-center gap-1">
                  <BsBookmarkCheck className="text-sm text-green-500" />
                  {watch?.status}
                </p>
              </div>
              <div>
                <p className="mt-3 text-lg font-bold text-gray-700">Features</p>
                <ul className="ml-2">
                  {watch?.features?.map((feature: string) => (
                    <div
                      key={feature}
                      className="flex gap-1 flex-row items-center"
                    >
                      <div className="w-2 h-1 bg-gray-400 rounded-xl mt-1" />
                      <li>{feature}</li>
                    </div>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mt-3 text-lg font-bold text-gray-700">
                  Description
                </p>
                <p className="ml-2">{watch.desc}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-10">
          <Divider firstLetter="C" secondWard="ustomer Reviews" />
        </div>
      </div>
    </div>
  );
};

export default SingleWatchPage;
