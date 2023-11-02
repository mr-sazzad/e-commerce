import { watches } from "@/constants";
import React from "react";
import RecentCard from "./RecentCard";
import UpcomingCard from "./UpcomingCard";

const Upcoming = () => {
  const products = watches;

  return (
    <div className="max-w-[1300px] mx-auto px-[30px] lg:px-[50px] mb-10">
      <h2 className="mt-10 mb-5 text-center font-semibold text-4xl text-gray-600">
        Upcoming Watches
      </h2>
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row flex-wrap gap-5 justify-center">
          {watches.map((watch: any) => (
            <UpcomingCard key={watch.title} {...watch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
