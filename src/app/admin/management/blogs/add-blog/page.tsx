"use client";

import { UploadImageToImageBB } from "@/helpers/imageUpload";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useCreateBlogMutation } from "@/redux/api/blogs/blogApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

interface FormData {
  blogTitle: string;
  blogImage: FileList | null;
  blogContent: string;
}

const AddBlog: React.FC = () => {
  const router = useRouter();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const currentUser = getUserFromLocalStorage() as any;
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  useEffect(() => {
    if (!currentUser) {
      router.push("/sign-in");
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (!currentUser) {
        return router.push("/sign-in");
      } else if (currentUser.role !== "admin") {
        toast.error("Unauthorized access detected");
        return router.push("/sign-in");
      }

      setLoading(true);
      let image = null;

      if (data.blogImage) {
        image = await UploadImageToImageBB(data.blogImage[0]);
      }

      const requestedData = {
        title: data.blogTitle,
        content: data.blogContent,
        image: image,
        authorId: currentUser.id,
      };

      const result: any = await createBlog(requestedData);
      setLoading(false);
      if (result.success !== false) {
        reset();
        toast.success("Blog created successfully");
        router.back();
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="md:h-[80vh] flex justify-center items-center w-full px-[30px] md:px-[50px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 w-full">
          <div className="relative lg:w-[50%] md:w-[40%] w-full md:h-[350px] h-[200px] rounded md:mt-0 mt-5">
            <Image
              src="/assets/blog-image.jpg"
              alt="blog image"
              fill
              className="object-cover opacity-40 rounded"
            />
            <div className="absolute w-full h-full flex justify-center items-center">
              <div className="text-center">
                <h2 className="md:text-3xl sm:text-2xl text-xl font-bold">
                  New Blog
                </h2>
                <p className="text-gray-800">show your company updates</p>
                <p className="text-gray-800">over the users</p>
              </div>
            </div>
          </div>

          <div className="lg:w-[50%] md:w-[60%]">
            <h2 className="text-center md:text-3xl sm:text-2xl text-xl font-semibold my-5 text-gray-600">
              Create Blog
            </h2>
            <div>
              <input
                type="text"
                {...register("blogTitle", {
                  required: "Blog title is required",
                })}
                className="w-full px-3 py-2 rounded outline-none border border-gray-400"
                placeholder="write your blog title"
              />
              {errors.blogTitle && (
                <p className="text-red-500">{errors.blogTitle.message}</p>
              )}

              <div className="relative">
                <input
                  type="file"
                  {...register("blogImage", {
                    required: "Blog image is required",
                  })}
                  onChange={(e) =>
                    setSelectedFileName(
                      e.target.files && e.target.files[0].name
                    )
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  placeholder="Upload your blog image"
                />
                <input
                  type="text"
                  value={selectedFileName || ""}
                  className="w-full px-3 py-2 rounded outline-none border border-gray-400 mt-4 bg-black text-white"
                  placeholder="Upload your blog image"
                  readOnly
                />
              </div>

              <textarea
                {...register("blogContent", {
                  required: "Blog content is required",
                })}
                rows={5}
                className="w-full outline-none border border-gray-400 px-3 py-2 mt-4 rounded"
              />
              {errors.blogContent && (
                <p className="text-red-500">{errors.blogContent.message}</p>
              )}

              <button
                onClick={handleSubmit(onSubmit)}
                className={`w-full px-3 py-2 rounded bg-gray-200 mt-4 hover:bg-gray-900 hover:text-white transition duration-500 ${
                  loading || isLoading ? "cursor-not-allowed" : ""
                }`}
                disabled={isLoading || loading}
              >
                {isLoading || loading ? "Loading ..." : "Create Blog"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
