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

const HomeBlogCard: React.FC<IBlog> = ({
  title,
  content,
  image,
  createdAt,
  id,
}) => {
  const createdData = new Date(createdAt).toLocaleDateString();
  const truncatedTitle =
    title.length > 20 ? title.slice(0, 20) + "..." : content;

  const truncatedContent =
    content.length > 70 ? content.slice(0, 70) + "..." : content;
  return (
    <div className="w-full sm:w-[45%] md:w-[30%] h-[340px] border border-gray-400 rounded p-3 relative">
      <div className="flex flex-col gap-3">
        <div className="relative h-[100px] w-full rounded">
          <Image
            src={image}
            alt="blog-image"
            fill
            priority
            className="object-cover rounded"
          />
        </div>
        <p className="text-end">{createdData}</p>
        <h3 className="text-center font-bold text-xl">{truncatedTitle}</h3>
        <p>{truncatedContent}</p>
        <Link
          href={`/blogs/${id}`}
          className="px-3 py-2 text-[#9F7A49] rounded border border-[#b3956e] absolute bottom-3 left-3 right-3 hover:bg-[#9F7A49] hover:text-white transition-all duration-300"
        >
          <p className="text-center">View This Blog</p>
        </Link>
      </div>
    </div>
  );
};

export default HomeBlogCard;
