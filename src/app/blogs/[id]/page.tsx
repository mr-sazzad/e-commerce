"use client";

import Loading from "@/app/Loading";
import { useGetSingleBlogQuery } from "@/redux/api/blogs/blogApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const ViewBlog = () => {
  const { id } = useParams();
  const { data: blog, isLoading } = useGetSingleBlogQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  const createTime = new Date(blog.createdAt).toLocaleDateString();
  return (
    <div className="max-w-[600px] mx-auto px-[30px] md:flex-[50px]">
      <div className="flex flex-col gap-3">
        <div className="relative w-full h-[200px]">
          <Image
            src={blog.image}
            alt="blog-image"
            fill
            priority
            className="object-contain"
          />
        </div>
        <p className="text-end text-gray-600 cursor-not-allowed">
            {createTime}
          </p>

          <h2 className="text-3xl font-bold text-gray-900 text-center">{blog.title}</h2>

          <p className="mt-5">{blog.content}</p>
      </div>
    </div>
  );
};

export default ViewBlog;
