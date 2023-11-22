"use client";

import Loading from "@/app/Loading";
import BreadCrumb from "@/components/BreadCrumb";
import {
  useGetCurrentUserQuery,
  useUpdateSingletUserMutation,
} from "@/redux/api/users/userApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import GenderSelect from "@/components/admin/GenderSelect";
import toast from "react-hot-toast";
import { UploadImageToImageBB } from "@/helpers/imageUpload";

import { PiGenderMaleFill } from "react-icons/pi";
import { BsFillPhoneFill } from "react-icons/bs";
import { BiSolidHomeSmile } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { SiStatuspal } from "react-icons/si";
import { OptionType } from "@/types";

const EditAdmin = () => {
  const { id } = useParams();
  const { handleSubmit, register } = useForm();

  const { data: admin, isLoading } = useGetCurrentUserQuery(id);
  const [updateSingleUser] = useUpdateSingletUserMutation();

  const [profileImageName, setProfileImageName] = useState("");
  const [coverImageName, setCoverImageName] = useState("");
  const [gender, setGender] = useState("");

  console.log(gender, "gender");

  const handleSelectChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setGender(selectedOption.value);
    }
  };

  const onSubmit = async (data: any) => {
    let profileImage = "";
    let coverImage = "";
    try {
      if (data.profile_image && data.profile_image[0]) {
        profileImage = await UploadImageToImageBB(data.profile_image[0]);
      }

      if (data.cover_image && data.cover_image[0]) {
        coverImage = await UploadImageToImageBB(data.cover_image[0]);
      }

      const requestedData = {
        name: data.name || admin?.name,
        image: profileImage || admin?.image,
        coverImage: coverImage || admin?.coverImage,
        phone: data.phone || admin?.phone,
        gender: gender || admin?.gender,
        age: data.age || admin?.age,
        role: "admin",
        address: data.address || admin?.address,
      };

      const result: any = await updateSingleUser({
        id: admin?.id,
        ...requestedData,
      });

      if (result?.data?.status !== false) {
        toast.success("user updated");
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  const handleChangeStatus = async (user: any) => {
    const userId = user.id;

    try {
      const requestedData = {
        isBanned: !user?.isBanned,
      };

      const result = await updateSingleUser({ id: userId, ...requestedData });
    } catch (e: any) {
      toast.error("something went wrong");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <BreadCrumb
        redirectTo="Users Page"
        current="Edit User"
        link="/admin/management/users"
      />
      <div className="max-w-[1200px] mx-auto my-10">
        <div className="flex flex-col md:flex-row gap-5 px-[30px] lg:px-[50px]">
          <div className="w-full md:w-[300px]">
            <div className="flex flex-col gap-2 w-full">
              <div className="relative">
                <div className="relative w-full h-[120px]">
                  <Image
                    src={
                      admin?.coverImage
                        ? admin?.coverImage
                        : "/assets/cover.jpg"
                    }
                    alt="coverImage"
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="absolute h-[70px] w-[70px] -bottom-7 left-1/2 transform -translate-x-1/2">
                  <Image
                    src={
                      admin?.image ? admin?.image : "/assets/placeholder.png"
                    }
                    alt="placeholder-image"
                    fill
                    objectFit="cover"
                    className="p-1 rounded-full bg-white"
                  />
                </div>
              </div>
              <div className="p-5 mt-5 cursor-not-allowed">
                {/* information */}
                <p className="font-semibold text-lg text-gray-500">
                  {admin?.name}
                </p>
                <p className="flex gap-1 items-center">
                  <MdEmail className="text-gray-400" />
                  {admin?.email}
                </p>
                <p className="flex gap-1 items-center">
                  <PiGenderMaleFill className="text-gray-400" /> {admin?.gender}
                </p>
                <p className="flex gap-1 items-center">
                  <BsFillPhoneFill className="text-gray-400" /> {admin?.phone}
                </p>
                <p className="flex gap-1 items-center">
                  <BiSolidHomeSmile className="text-gray-400" />
                  {admin?.address}
                </p>
                <p className="flex gap-1 items-center">
                  <SiStatuspal className="text-gray-400" />
                  {admin?.isBanned ? (
                    <p className="bg-red-500 px-3 rounded-full text-white">
                      Banned
                    </p>
                  ) : (
                    <p className="bg-green-400 px-3 rounded-full text-white">
                      Safe
                    </p>
                  )}
                </p>
              </div>
              <div className="bg-red-100 w-full">
                {/* danger */}
                <div className="px-5 py-3">
                  <p className="text-lg font-semibold text-red-800 mb-3">
                    Danger Zone
                  </p>
                  <p className="text-gray-600 mb-3">
                    Report any inappropriate behavior for immediate action. We
                    reserve the right to ban users violating community standards
                  </p>

                  <button
                    className={`
                      px-5 
                      py-1 
                      transition-all 
                      duration-300
                      ${
                        admin?.isBanned
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-red-500 hover:bg-red-700 text-white"
                      }
                    `}
                    onClick={() => handleChangeStatus(admin)}
                  >
                    {admin?.isBanned ? "Unbanned This admin" : "Ban This admin"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* form part */}
          <div className="flex-1">
            <div>
              <p className="text-center sm:text-2xl text-xl font-bold">
                Update Admin Information
              </p>
            </div>
            <form
              className="flex flex-col gap-8 my-10"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col md:flex-row md:gap-5 gap-8">
                <div className="flex flex-col gap-1 w-full text-gray-500 relative">
                  <label
                    className="
                      ml-3 
                      absolute 
                      -top-[14px] 
                      px-2 
                      bg-gray-100 
                      border-l-2 
                      border-gray-400 
                      z-50
                    "
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    defaultValue={admin?.name}
                    {...register("name")}
                    className="outline-none border border-gray-300 px-3 py-[5px]"
                  />
                </div>
                {/* Phone Number */}
                <div className="flex flex-col gap-1 w-full text-gray-500 relative">
                  <label
                    className="
                      ml-3 
                      absolute 
                      -top-[14px] 
                      px-2 
                      bg-gray-100 
                      border-l-2 
                      border-gray-400
                    "
                  >
                    Phone
                  </label>
                  <input
                    type="string"
                    {...register("phone")}
                    className="outline-none border border-gray-300 px-3 py-[5px]"
                  />
                </div>
                {/* end */}
              </div>

              <div className="flex flex-col md:flex-row md:gap-5 gap-8">
                {/* email part */}
                <div className="flex flex-col gap-1 w-full text-gray-500 relative">
                  <label
                    className="
                      ml-3 
                      absolute 
                      -top-[14px] 
                      px-2 
                      bg-gray-100 
                      border-l-2 
                      border-gray-400 
                      z-50
                    "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    disabled
                    defaultValue={admin?.email}
                    {...register("email")}
                    className="outline-none border border-gray-300 px-3 py-[5px]"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:gap-5 gap-8">
                <div className="flex flex-col w-full text-gray-500 relative border border-gray-300">
                  <label
                    className="
                        ml-3 
                        absolute 
                        -top-[14px] 
                        px-2 
                        bg-gray-100 
                        border-l-2 
                        border-gray-400 
                        z-50
                    "
                    htmlFor="profile_image_upload"
                  >
                    Profile Image
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="file"
                      {...register("profile_image")}
                      id="profile_image_upload"
                      className="opacity-0 w-full h-full absolute inset-0 cursor-pointer"
                      onChange={(e) =>
                        e.target.files &&
                        setProfileImageName(e.target.files[0].name)
                      }
                    />
                    <label
                      htmlFor="profile_image_upload"
                      className="w-full px-3 py-2 text-center cursor-pointer"
                    >
                      {profileImageName || "Choose a file"}
                    </label>
                  </div>
                </div>
                {/* cover image part */}
                <div className="flex flex-col w-full text-gray-500 relative border border-gray-300">
                  <label
                    className="
                      ml-3 
                      absolute 
                      -top-[14px] 
                      px-2 
                      bg-gray-100 
                      border-l-2 
                      border-gray-400 
                      z-50
                    "
                    htmlFor="cover_image_upload"
                  >
                    Cover Image
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="file"
                      {...register("cover_image")}
                      id="cover_image_upload"
                      className="opacity-0 w-full h-full absolute inset-0 cursor-pointer"
                      onChange={(e) =>
                        e.target.files &&
                        setCoverImageName(e.target.files[0].name)
                      }
                    />

                    <label
                      htmlFor="cover_image_upload"
                      className="w-full px-3 py-2 text-center cursor-pointer"
                    >
                      {coverImageName || "Choose a file"}
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:gap-5 gap-8">
                {/* gender part */}
                <div className="flex flex-col gap-1 w-full text-gray-500 relative">
                  <label
                    className="
                      ml-3 
                      absolute 
                      -top-[14px] 
                      px-2 
                      bg-gray-100 
                      border-l-2 
                      border-gray-400 
                      z-[1000]
                    "
                  >
                    Gender
                  </label>
                  <GenderSelect onSelectChange={handleSelectChange} />
                </div>
                {/* Age */}
                <div className="flex flex-col gap-1 w-full text-gray-500 relative">
                  <label
                    className="
                      ml-3 
                      absolute 
                      -top-[14px] 
                      px-2 
                      bg-gray-100 
                      border-l-2 
                      border-gray-400
                    "
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    {...register("age")}
                    className="outline-none border border-gray-300 px-3 py-[5px]"
                  />
                </div>
              </div>
              {/* address */}
              <div className="flex flex-col md:flex-row md:gap-5 gap-8">
                <div className="flex flex-col gap-1 w-full text-gray-500 relative">
                  <label
                    className="
                      ml-3 
                      absolute 
                      -top-[14px] 
                      px-2 
                      bg-gray-100 
                      border-l-2 
                      border-gray-400
                    "
                  >
                    Address
                  </label>
                  <textarea
                    rows={4}
                    {...register("address")}
                    className="outline-none border border-gray-300 px-3 py-[5px]"
                  />
                </div>
              </div>
              <button
                className="
                  py-[5px] 
                  bg-gray-700 
                  text-white 
                  hover:text-gray-800 
                  hover:bg-white border 
                  border-gray-300 
                  transition 
                  duration-300
                "
                type="submit"
              >
                Update This Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdmin;
