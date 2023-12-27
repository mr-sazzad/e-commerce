import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IBlog {
  title: string;
  content: string;
  image: string;
  createdAt: string;
  id: string;
}

const BlogCard: React.FC<IBlog> = ({
  title,
  content,
  image,
  createdAt,
  id,
}) => {
  const createdData = new Date(createdAt).toLocaleDateString();
  const truncatedContent =
    content.length > 200 ? content.slice(0, 200) + "..." : content;
  return (
    <Link
      href={`/blogs/${id}`}
      className="flex flex-col gap-3 border border-gray-400 rounded p-3 mt-5"
    >
      <div className="relative h-[100px] w-full bg-gray-500 rounded">
        <Image
          src={image}
          alt="blog-image"
          fill
          priority
          className="object-cover rounded"
        />
      </div>
      <p className="text-end">{createdData}</p>
      <h3 className="text-center font-bold text-xl">{title}</h3>
      <p>{truncatedContent}</p>
    </Link>
  );
};

export default BlogCard;
