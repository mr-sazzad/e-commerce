"use client";

import React, { useEffect, useState } from "react";
import Loading from "@/app/Loading";
import BreadCrumb from "@/components/BreadCrumb";
import AdminWatchCard from "@/components/admin/AdminWatchCard";
import { useGetAllWatchesQuery } from "@/redux/api/watches/watchApi";
import { AdminWatch } from "@/types";
import { SiAmazoncloudwatch } from "react-icons/si";
import PageSelect, { OptionType } from "@/components/admin/PageSelect";
import Link from "next/link";

const WatchManagement = () => {
  const { data: watches, isLoading } = useGetAllWatchesQuery(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState<number | null>(null);
  let itemsPerPage = size || 12;

  console.log(size, "size");

  // Logic to get current items based on the selected page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = watches
    ? watches.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // Logic to handle page changes
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <BreadCrumb current="Watch Management" redirectTo="Home" link="/" />

      <div className="max-w-[1200px] mx-auto mt-10">
        <div className="px-[30px] lg:px-[50px]">
          <div className="flex justify-end">
            <Link href="/admin/management/watches/new-watch">
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
            </Link>
          </div>
          {/* watches card */}

          <div className="flex flex-col gap-3 border mt-5 p-5">
            {watches && watches.length > 0 && (
              <div className="flex justify-end">
                <div className="w-full sm:w-[300px]">
                  <PageSelect setSize={setSize} />
                </div>
              </div>
            )}
            <div className="flex justify-center gap-5 flex-col sm:flex-row sm:flex-wrap w-full">
              {watches && watches.length > 0 ? (
                currentItems.map((watch: AdminWatch) => (
                  <AdminWatchCard key={watch.id} {...watch} />
                ))
              ) : (
                <div className="flex justify-center items-center text-gray-400">
                  <div>
                    <p className="flex gap-1 items-center font-medium">
                      <SiAmazoncloudwatch /> SORRY
                    </p>
                    <h2 className="text-2xl font-semibold">
                      No watches to display
                    </h2>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {watches && watches.length > 0 && (
            <div className="flex justify-end mt-5">
              <div className="mb-5">
                {Array.from(
                  { length: Math.ceil(watches.length / itemsPerPage) },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`mx-1 px-3 py-1 bg-gray-300 ${
                        currentPage === index + 1
                          ? "text-white bg-gray-700"
                          : "text-gray-700"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchManagement;
