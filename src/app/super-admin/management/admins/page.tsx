"use client";

import React, { useState } from "react";
import Loading from "@/app/loading";
import BreadCrumb from "@/components/BreadCrumb";
import { SiAmazoncloudwatch } from "react-icons/si";
import PageSelect from "@/components/admin/PageSelect";
import UserCard from "@/components/admin/UserCard";
import { useGetAllAdminsQuery } from "@/redux/api/users/userApi";
import Link from "next/link";

const WatchManagement = () => {
  const { data: admins, isLoading } = useGetAllAdminsQuery(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState<number | null>(null);
  let itemsPerPage = size || 12;

  // Logic to get current items based on the selected page
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = admins
    ? admins.slice(indexOfFirstUser, indexOfLastUser)
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
      <BreadCrumb current="User Management" redirectTo="Home" link="/" />

      <div className="max-w-[1200px] mx-auto mt-10">
        <div className="px-[30px] lg:px-[50px]">
          <div className="flex justify-end">
            <Link href="/super_admin/management/admins/add-user">
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
                Add New User
              </button>
            </Link>
          </div>

          {/* User cards */}
          <div className="flex flex-col gap-3 border mt-5 p-5">
            {admins && admins.length > 0 && (
              <div className="flex justify-end">
                <div className="w-full sm:w-[300px]">
                  <PageSelect setSize={setSize} />
                </div>
              </div>
            )}

            <div className="flex justify-center gap-5 flex-col sm:flex-row sm:flex-wrap w-full">
              {admins && admins.length > 0 ? (
                currentUsers.map((user: any) => (
                  <UserCard key={user.id} {...user} />
                ))
              ) : (
                <div className="flex justify-center items-center text-gray-400">
                  <div>
                    <p className="flex gap-1 items-center font-medium">
                      <SiAmazoncloudwatch /> SORRY
                    </p>
                    <h2 className="text-2xl font-semibold">
                      No Users To Display
                    </h2>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {admins && admins.length > 0 && (
            <div className="flex justify-end mt-5">
              <div className="mb-5">
                {Array.from(
                  { length: Math.ceil(admins.length / itemsPerPage) },
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
