"use client";

import React, { useState } from "react";
import Loading from "@/app/Loading";
import BreadCrumb from "@/components/BreadCrumb";
import { SiAmazoncloudwatch } from "react-icons/si";
import PageSelect from "@/components/admin/PageSelect";
import Link from "next/link";
import { useGetAllBlogsQuery } from "@/redux/api/blogs/blogApi";
import BlogCard from "@/components/BlogCard";
import Masonry from "react-masonry-css";
import { blogBreakpoints } from "@/constants/masonry";

const Blogs = () => {
  const { data: blogs, isLoading } = useGetAllBlogsQuery(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState<number | null>(null);
  let itemsPerPage = size || 12;

  // Logic to get current items based on the selected page
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentBlogs = blogs
    ? blogs.slice(indexOfFirstUser, indexOfLastUser)
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
      <BreadCrumb current="Blogs Management" redirectTo="Home" link="/" />

      <div className="max-w-[1200px] mx-auto mt-10">
        <div className="px-[30px] lg:px-[50px]">
          <div className="flex justify-end">
            <Link href="/admin/management/blogs/add-blog">
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
                Add New Blog
              </button>
            </Link>
          </div>

          {/* Blog cards */}
          <div className="flex flex-col gap-3 border mt-5 p-5">
            {blogs && blogs.length > 0 && (
              <div className="flex justify-end">
                <div className="w-full sm:w-[300px]">
                  <PageSelect setSize={setSize} />
                </div>
              </div>
            )}

            <div className="flex justify-center gap-5 flex-col sm:flex-row sm:flex-wrap w-full">
              {blogs && blogs.length > 0 ? (
                <Masonry
                  breakpointCols={blogBreakpoints}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {currentBlogs.map((blog: any) => (
                    <BlogCard key={blog.id} {...blog} />
                  ))}
                </Masonry>
              ) : (
                <div className="flex justify-center items-center text-gray-400">
                  <div>
                    <p className="flex gap-1 items-center font-medium">
                      <SiAmazoncloudwatch /> SORRY
                    </p>
                    <h2 className="text-2xl font-semibold">
                      No Blogs To Display
                    </h2>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {blogs && blogs.length > 0 && (
            <div className="flex justify-end mt-5">
              <div className="mb-5">
                {Array.from(
                  { length: Math.ceil(blogs.length / itemsPerPage) },
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

export default Blogs;
