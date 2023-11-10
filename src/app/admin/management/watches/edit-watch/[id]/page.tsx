"use client";

import Loading from "@/app/loading";
import BreadCrumb from "@/components/BreadCrumb";
import MySelect, { OptionType } from "@/components/admin/Select";
import { UploadImageToImageBB } from "@/helpers/imageUpload";
import { useGetSingleWatchQuery } from "@/redux/api/watches/watchApi";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { BsArrowRightShort } from "react-icons/bs";

const EditWatch = () => {
  const { register, handleSubmit } = useForm();
  const [status, setStatus] = useState("Available");
  const { id } = useParams();

  const { data: watch, isLoading } = useGetSingleWatchQuery(id);
  console.log(watch, "watch");

  const handleSelectChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setStatus(selectedOption.value);
    }
  };

  const onSubmit = async (data: any) => {
    let image = "";
    if (data?.image) {
      image = await UploadImageToImageBB(data.image[0]);
    }

    const updatedData = {
      title: data.title || watch?.title,
      price: data.price || watch?.price,
      description: data.description || watch?.description,
      image: image || watch?.image,
      status: status || watch?.status,
      features: data.features || watch?.features,
    };

    // edit mutation code
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <BreadCrumb
        link="/admin/management/watches"
        current="Edit-Watch"
        redirectTo="All-Watches"
      />
      <div className="max-w-[1300px] mx-auto mt-10">
        <div className="flex flex-col md:flex-row gap-5 px-[30px] lg:px-[50px]">
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col">
              <h2 className="text-4xl font-semibold text-gray-600">Edit</h2>
              <h2 className="text-4xl font-semibold text-gray-600">Watch</h2>
              <div className="flex gap-1 items-center cursor-pointer group">
                <p className="hover:underline">Go To Watches</p>{" "}
                <BsArrowRightShort className="group-hover:translate-x-1 duration-300" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-center font-semibold text-2xl text-gray-700">
              Edit Watch
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

              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex flex-col gap-1 w-full text-gray-500 relative">
                  <label className="ml-3 absolute -top-[14px] px-2 bg-gray-200 border-l-2 border-gray-400">
                    Image
                  </label>
                  <input
                    type="file"
                    {...register("image")}
                    className="outline-none border border-gray-300 px-3 py-[4px]"
                  />
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
                Update Watch Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWatch;
