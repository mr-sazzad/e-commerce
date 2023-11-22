"use client";

import BreadCrumb from "@/components/BreadCrumb";
import GenderSelect from "@/components/admin/GenderSelect";
import { UploadImageToImageBB } from "@/helpers/imageUpload";
import { useUserSignUpMutation } from "@/redux/api/users/userApi";
import { OptionType } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { BsArrowRightShort } from "react-icons/bs";

const AddNewAdmin = () => {
  const router = useRouter();
  const [gender, setGender] = useState("");
  const { handleSubmit, register, reset } = useForm();

  const [userSignUp] = useUserSignUpMutation();

  const [profileImageName, setProfileImageName] = useState("");
  const [coverImageName, setCoverImageName] = useState("");

  const handleSelectChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setGender(selectedOption.value);
    }
  };

  const onSubmit = async (data: any) => {
    let coverImage = "";
    let profileImage = "";
    try {
      if (data.cover_image && data.cover_image[0]) {
        coverImage = await UploadImageToImageBB(data.cover_image[0]);
      }

      if (data.profile_image && data.profile_image[0]) {
        profileImage = await UploadImageToImageBB(data.profile_image[0]);
      }

      const requestedData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "admin",
        gender: gender || "NotSet",
        phone: data.phone || "",
        image: profileImage || "",
        coverImage: coverImage || "",
        address: data.address || "",
        age: data.age,
      };

      const result: any = await userSignUp(requestedData);

      if (result?.data?.success !== false) {
        toast.success("admin Created");
        // reset form
        reset();
        // redirect to users page
        setTimeout(() => {
          router.push("/super_admin/management/admins");
        }, 1000);
      }
    } catch (e) {
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <BreadCrumb
        current="Add-New-User"
        redirectTo="All-Users"
        link="/admin/management/users"
      />
      <div className="max-w-[1300px] mx-auto mt-10">
        <div className="flex flex-col md:flex-row gap-5 mx-[30px] lg:mx-[50px]">
          <div className="flex justify-center items-center flex-1 new-user-banner relative min-h-[300px]">
            <div className="my-10 z-[1000]">
              <h2 className="text-4xl font-semibold text-white">Add New</h2>
              <h2 className="text-4xl font-semibold text-white">Admin</h2>
              <div className="flex items-center gap-1 group cursor-pointer">
                <Link
                  href="/super_admin/management/admins"
                  className="text-white hover:underline"
                >
                  Go To Admins
                </Link>
                <BsArrowRightShort className="text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-center font-semibold text-3xl mb-8">
              New Admin
            </h2>

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
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className="outline-none border border-gray-300 px-3 py-[5px]"
                  />
                </div>
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
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="outline-none border border-gray-300 px-3 py-[5px]"
                  />
                </div>
              </div>

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
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="outline-none border border-gray-300 px-3 py-[5px]"
                  />
                </div>

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
                    Image
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
              </div>

              <div className="flex flex-col md:flex-row md:gap-5 gap-8">
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
                    Cover
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
              </div>

              <div className="flex flex-col md:flex-row md:gap-5 gap-8">
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
                    rows={3}
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
                Add New Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewAdmin;
