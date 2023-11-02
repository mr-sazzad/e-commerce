import { watches } from "@/constants";
import React from "react";
import RecentCard from "./RecentCard";

const Recent = () => {
  const products = watches;

  return (
    <div className="max-w-[1300px] mx-auto px-[30px] lg:px-[50px] mb-10">
      <h2 className="mt-10 mb-5 text-center font-semibold text-4xl text-gray-600">
        Recently Added
      </h2>
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row flex-wrap gap-5 justify-center">
          {watches.map((watch: any) => (
            <RecentCard key={watch.title} {...watch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recent;
