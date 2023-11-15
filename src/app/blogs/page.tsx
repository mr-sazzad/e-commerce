import BreadCrumb from "@/components/BreadCrumb";
import React from "react";

const Blogs = () => {
  return (
    <div>
      <BreadCrumb redirectTo="Home" link="/" current="Blogs" />
      <div className="max-w-[1300px] mx-auto">
        <p className="text-center text-3xl font-semibold text-gray-700 mt-10">Coming Soon...</p>
      </div>
    </div>
  );
};

export default Blogs;
