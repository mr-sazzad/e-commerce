"use client";

import Loading from "@/app/Loading";
import { UploadImageToImageBB } from "@/helpers/imageUpload";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { setToLocalStorage } from "@/helpers/localStorage";
import {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
} from "@/redux/api/users/userApi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateProfileForm = ({
  setToggle,
}: {
  setToggle: (value: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const currentUser = getUserFromLocalStorage() as any;
  const { data: user, isLoading } = useGetCurrentUserQuery(currentUser?.id);
  const [updateCurrentUser] = useUpdateCurrentUserMutation();

  const handleUserInformationUpdate = async (data: any) => {
    try {
      setLoading(true);
      let profileImage = null;
      let coverImageURL = null;

      if (data.file[0]) {
        profileImage = await UploadImageToImageBB(data.file[0]);
      }

      if (data.coverImage[0]) {
        coverImageURL = await UploadImageToImageBB(data.coverImage[0]);
      }

      const updateUserData = {
        name: data.name || user.name,
        age: data.age || user.age,
        phone: data.phone || user.phone,
        gender: data.gender || user.gender,
        image: profileImage || user.profileImage,
        coverImage: coverImageURL || user.coverImage,
        address: data.address || user.address,
      };

      const userId = user?.id;
      const result: any = await updateCurrentUser({
        id: userId,
        ...updateUserData,
      });
      if (result?.data?.success !== false) {
        setLoading(false);
        toast.success("information Updated !");
        setTimeout(() => {
          setToggle("in-active");
          setToLocalStorage("editMode", "in-active");
        }, 1000);
      } else {
        setLoading(false);
        toast.error("something went wrong");
      }
    } catch (err: any) {
      setLoading(false);
      toast.error("something went wrong");
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <form
      className="w-full flex flex-col gap-3"
      onSubmit={handleSubmit(handleUserInformationUpdate)}
    >
      <div className="flex flex-col gap-3 md:flex-row w-full">
        {/* name field */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-gray-500 ml-2">Name</label>
          <input
            type="text"
            defaultValue={user?.name}
            {...register("name")}
            className="outline-none border border-gray-300 px-4 py-1 w-full"
          />
        </div>

        {/* age field */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-gray-500 ml-2">Age</label>
          <input
            type="text"
            defaultValue={user?.age}
            {...register("age")}
            className="outline-none border border-gray-300 px-4 py-1 w-full"
          />
        </div>
      </div>
      {/* 2nd row */}
      <div className="flex flex-col gap-3 md:flex-row w-full">
        {/* phone field */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-gray-500 ml-2">Phone</label>
          <input
            type="text"
            defaultValue={user?.phone}
            {...register("phone")}
            className="outline-none border border-gray-300 px-4 py-1 w-full"
          />
        </div>

        {/* gender field */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-gray-500 ml-2">Gender</label>
          <select
            {...register("gender")}
            defaultValue={user?.gender || "Male"}
            className="outline-none border border-gray-300 px-4 py-[6px] w-full"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>
      {/* profile image */}
      <div className="flex flex-col gap-1 w-full">
        <label className="text-gray-500 ml-2">Profile Image</label>
        <input
          type="file"
          {...register("file")}
          className="outline-none border border-gray-300 px-4 py-1 w-full bg-white"
        />
      </div>
      {/* cover Image */}
      <div className="flex flex-col gap-1 w-full">
        <label className="text-gray-500 ml-2">Cover Image</label>
        <input
          type="file"
          {...register("coverImage")}
          className="outline-none border border-gray-300 px-4 py-1 w-full bg-white"
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label className="text-gray-500 ml-2">Address</label>
        <textarea
          defaultValue={user?.address}
          {...register("address")}
          className="w-full outline-none border border-gray-300 px-4 py-1"
          rows={4}
        />
      </div>
      <div>
        <button
          className={`mt-3 px-5 py-1 w-full border border-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 ${
            loading && "disabled"
          }`}
          type="submit"
        >
          {loading ? "Loading..." : "Update Your Profile"}
        </button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
