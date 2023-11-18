"use client";

import SortBySection from "@/components/SortBy";
import WatchCard from "@/components/WatchCard";
import React, { useEffect, useState } from "react";
import { TfiLayoutGrid3Alt, TfiMenuAlt } from "react-icons/tfi";
import { useGetAllWatchesQuery } from "@/redux/api/watches/watchApi";
import BreadCrumb from "@/components/BreadCrumb";
import Loading from "../Loading";

const Page = () => {
  const [loading, setLoading] = useState(true);

  const { data: watches, isLoading } = useGetAllWatchesQuery(undefined);

  // console.log(watches, "all watches");

  const [gridActive, setGridActive] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("grid");
      return localData !== null ? localData : "false";
    }
    return "false";
  });

  const [flexActive, setFlexActive] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const flexData = localStorage.getItem("flex");
      return flexData !== null ? flexData : "true";
    }
    return "true";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<any[]>(watches);

  useEffect(() => {
    if (watches) {
      setProducts(watches);
    }
  }, [watches]);

  // console.log(products, "Products");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("grid", gridActive);
      localStorage.setItem("flex", flexActive);
    }
  }, [gridActive, flexActive]);

  const handleGridActive = () => {
    setGridActive("true");
    setFlexActive("false");
    localStorage.setItem("grid", "true");
    localStorage.removeItem("flex");
  };

  const handleFlexActive = () => {
    setFlexActive("true");
    setGridActive("false");
    localStorage.setItem("flex", "true");
    localStorage.removeItem("grid");
  };

  if (loading || isLoading) {
    return <Loading />;
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (value: string) => {
    let sortedProducts = [...products];

    switch (value) {
      case "a-z":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  };

  const filteredProducts = products?.filter((product) =>
    product?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <BreadCrumb link="/" redirectTo="Home" current="Collection" />
      <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-col md:flex-row gap-5 px-[30px] lg:px-[50px] mt-[100px]">
          <div className="md:w-[40%] w-full">
            <div className="flex flex-col gap-5 w-full bg-gray-100 px-5 mt-5 pt-5">
              <div>
                <p className="mb-1 font-medium">Search Your Watch</p>
                <input
                  type="text"
                  className="border border-gray-500 outline-none p-1 px-2 w-full"
                  onChange={handleSearch}
                />
              </div>

              <div>
                <SortBySection handleSort={handleSort} />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full h-[60px] border border-[#f6d7ad] mb-4 flex items-center">
              <div className="flex justify-between items-center w-full px-5">
                <div className="flex gap-0 cursor-pointer">
                  <TfiLayoutGrid3Alt
                    className={`p-2 border border-r-0 h-[35px] w-[35px] border-[#f9ddb9] text-[#9F7A49] ${
                      gridActive === "true"
                        ? "bg-[#9F7A49] text-white"
                        : "bg-white text-[#9F7A49]"
                    }`}
                    onClick={handleGridActive}
                  />
                  <TfiMenuAlt
                    className={`p-2 border border-l-0  h-[35px] w-[35px] text-[#9F7A49] border-[#f6d7ad] ${
                      flexActive === "true"
                        ? "bg-[#9F7A49] text-white"
                        : "bg-white text-[#9F7A49]"
                    }`}
                    onClick={handleFlexActive}
                  />
                </div>
                <div>
                  <p className="text-xl font-semibold">
                    {filteredProducts?.length} products
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-7 flex-wrap">
              {filteredProducts?.map((product) => (
                <WatchCard key={product.title} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
