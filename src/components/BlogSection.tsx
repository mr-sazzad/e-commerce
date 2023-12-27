"use client";

import Loading from "@/app/Loading";
import { useGetLatestBlogsQuery } from "@/redux/api/blogs/blogApi";
import { IBlog } from "@/types";
import React from "react";
import HomeBlogCard from "./HomeBlogCard";

const BlogSection = () => {
  const { data: blogs, isLoading } = useGetLatestBlogsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="my-10 px-[30px] md:px-[50px]">
      <h2 className="text-center md:text-3xl text-2xl text-gray-600 mt-10 font-semibold mb-5">
        Blogs
      </h2>

      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row flex-wrap gap-5">
          {blogs.map((blog: IBlog) => (
            <HomeBlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
