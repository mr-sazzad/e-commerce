"use client";
import BreadCrumb from "@/components/BreadCrumb";
import MySelect from "@/components/admin/Select";
import { UploadImageToImageBB } from "@/helpers/imageUpload";
import { OptionType } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { BsArrowRightShort } from "react-icons/bs";

const NewWatch = () => {
  const [status, setStatus] = useState("Available");
  const { handleSubmit, register } = useForm();

  const handleSelectChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setStatus(selectedOption.value);
    }
  };

  const onSubmit = async (data: any) => {
    let image = "";
    if (data.image) {
      image = await UploadImageToImageBB(data.image[0]);
    }

    const createdData = {
      title: data.title,
      price: data.price,
      image: image,
      status: data.status,
      features: data.features,
      description: data.description,
    };

    console.log(createdData, "create New Watch");
  };
  return (
    <div>
      <BreadCrumb
        redirectTo="All-Watches"
        current="New-Watch"
        link="/admin/management/watches"
      />
      <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-col md:flex-row gap-5 my-10 px-[30px] lg:px-[50px]">
          <div className="flex justify-center items-center flex-1 new-watch-banner relative min-h-[300px]">
            <div className="my-10 z-[1000]">
              <h2 className="text-4xl font-semibold text-white">Add New</h2>
              <h2 className="text-4xl font-semibold text-white">Watch</h2>
              <div className="flex items-center gap-1 group cursor-pointer">
                <Link
                  href="/admin/management/watches"
                  className="text-white hover:underline"
                >
                  Go To Watches
                </Link>
                <BsArrowRightShort className="text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div>
              <h2 className="text-center font-semibold text-3xl mb-8">
                New Watch
              </h2>
              <form
                className="flex flex-col gap-8 my-10"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex flex-col gap-1 w-full text-gray-500 relative">
                    <label className="ml-3 absolute -top-[14px] px-2 bg-gray-200 border-l-2 border-gray-400">
                      Title
                    </label>
                    <input
                      type="text"
                      {...register("title")}
                      className="outline-none border border-gray-300 px-3 py-[5px]"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full text-gray-500 relative">
                    <label className="ml-3 absolute -top-[14px] px-2 bg-gray-200 border-l-2 border-gray-400">
                      Price
                    </label>
                    <input
                      type="number"
                      {...register("price")}
                      className="outline-none border border-gray-300 px-3 py-[5px]"
                    />
                  </div>
                </div>
                {/*  */}
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex flex-col w-full text-gray-500 relative border border-gray-300">
                    <label
                      className="ml-3 absolute -top-[14px] px-2 bg-gray-200 border-l-2 border-gray-400 z-50"
                      htmlFor="imageUpload"
                    >
                      Image
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="file"
                        {...register("image")}
                        id="imageUpload"
                        className="opacity-0 w-full h-full absolute inset-0 cursor-pointer"
                      />
                      <label
                        htmlFor="imageUpload"
                        className="w-full px-3 py-2 text-center cursor-pointer"
                      >
                        Choose a file
                      </label>
                    </div>
                  </div>

                  <div className="w-full">
                    <MySelect onSelectChange={handleSelectChange} />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full text-gray-500 relative">
                  <label className="ml-3 absolute -top-[14px] px-2 bg-gray-200 border-l-2 border-gray-400">
                    Features
                  </label>
                  <textarea
                    rows={4}
                    {...register("features")}
                    className="p-3 border border-gray-400 outline-none"
                    placeholder="separated by Quama"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full text-gray-500 relative">
                  <label className="ml-3 absolute -top-[14px] px-2 bg-gray-200 border-l-2 border-gray-400">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    {...register("description")}
                    className="p-3 border border-gray-400 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="
                  py-[4px] 
                  border 
                  border-gray-400 
                  bg-gray-700 
                  text-white 
                  hover:text-gray-900 
                  hover:bg-white 
                  transition-all 
                  duration-300 
                  hover:shadow
                "
                >
                  Add New Watch
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWatch;
