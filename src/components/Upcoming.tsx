"use client";
import React from "react";
import UpcomingCard from "./UpcomingCard";
import { useGetAllUpcomingWatchesQuery } from "@/redux/api/watches/watchApi";
import Loading from "@/app/Loading";

const Upcoming = () => {
  const { data: watches, isLoading } = useGetAllUpcomingWatchesQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-[30px] lg:px-[50px] mb-10">
      <h2 className="mt-10 mb-5 text-center font-semibold md:text-3xl text-2xl text-gray-600">
        Upcoming Watches
      </h2>
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row flex-wrap gap-5 justify-center">
          {watches &&
            watches?.map((watch: any) => (
              <UpcomingCard key={watch.title} {...watch} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
