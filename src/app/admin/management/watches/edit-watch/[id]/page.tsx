"use client";

import Loading from "@/app/Loading";
import BreadCrumb from "@/components/BreadCrumb";
import MySelect from "@/components/admin/Select";
import { UploadImageToImageBB } from "@/helpers/imageUpload";
import {
  useGetSingleWatchQuery,
  useUpdateSingleWatchMutation,
} from "@/redux/api/watches/watchApi";
import { OptionType } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { BsArrowRightShort } from "react-icons/bs";

const EditWatch = () => {
  const { register, handleSubmit } = useForm();
  const [status, setStatus] = useState("Available");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const { data: watch, isLoading } = useGetSingleWatchQuery(id);
  const [updateSingleWatch] = useUpdateSingleWatchMutation();


  const handleSelectChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setStatus(selectedOption.value);
    }
  };

  const onSubmit = async (data: any) => {
    let image = "";

    const featuresArray = data.features.split(",");

    try {
      setLoading(true);
      if (data?.image && data.image[0]) {
        image = await UploadImageToImageBB(data.image[0]);
      }

      const updatedData = {
        title: data.title || watch?.title,
        price: Number(data.price) || watch?.price,
        image: image || watch?.image,
        status: status || watch?.status,
        features: featuresArray || watch?.features,
        desc: data.description || watch?.description,
      };

      const result: any = await updateSingleWatch({ id, ...updatedData });

      if (result?.data?.success !== false) {
        setLoading(false);
        toast.success("Watch Updated");
      }
    } catch (e) {
      setLoading(false);
      toast.error("something went wrong !");
    }
    setLoading(false);
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
      <div className="max-w-[1200px] mx-auto mt-10">
        <div className="flex flex-col md:flex-row gap-5 px-[30px] lg:px-[50px]">
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col">
              <h2 className="text-4xl font-semibold text-gray-600">Edit</h2>
              <h2 className="text-4xl font-semibold text-gray-600">Watch</h2>
              <Link
                href="/admin/management/watches"
                className="flex gap-1 items-center cursor-pointer group"
              >
                <p className="hover:underline">Go To Watches</p>{" "}
                <BsArrowRightShort className="group-hover:translate-x-1 duration-300" />
              </Link>
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
                    defaultValue={watch.title}
                    className="outline-none border border-gray-300 px-3 py-[5px]"
                  />
                </div>
                <div className="flex flex-col gap-1 w-full text-gray-500 relative">
                  <label className="ml-3 absolute -top-[14px] px-2 bg-gray-200 border-l-2 border-gray-400">
                    Price
                  </label>
                  <input
                    type="number"
                    defaultValue={watch.price}
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
                  defaultValue={watch.features}
                  {...register("features")}
                  className="p-3 border border-gray-400 outline-none"
                  placeholder="Separated By Comma"
                />
              </div>
              <div className="flex flex-col gap-1 w-full text-gray-500 relative">
                <label className="ml-3 absolute -top-[14px] px-2 bg-gray-200 border-l-2 border-gray-400">
                  Description
                </label>
                <textarea
                  rows={4}
                  defaultValue={watch.desc}
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
                {loading ? "Loading ..." : "Update Watch Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWatch;
