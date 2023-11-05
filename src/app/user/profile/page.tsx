"use client";

// Import necessary modules and components
import Loading from "@/app/loading";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
} from "@/redux/api/users/userApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Import necessary icons
import {
  BsFillPersonFill,
  BsGenderMale,
  BsTelephone,
  BsHeartPulse,
} from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { BiHomeSmile } from "react-icons/bi";
import { PiWarningOctagonLight } from "react-icons/pi";
import { getFromLocalStorage, setToLocalStorage } from "@/helpers/localStorage";
import { UploadImageToImageBB } from "@/helpers/imageUpload";
import BreadCrumb from "@/components/BreadCrumb";
import toast from "react-hot-toast";

// Define the UserData interface
interface UserData {
  id: string;
  name: string;
  email: string;
  role: "User" | "Admin" | "super-admin";
}

// Define the Profile component
const Profile = () => {
  const [userData, setUserData] = useState<UserData>();
  const [toggle, setToggle] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const currentUserData = getUserFromLocalStorage() as any;
    if (currentUserData) {
      setUserData(currentUserData);
    }

    const toggleEditMode = getFromLocalStorage("editMode") as any;
    if (toggleEditMode) {
      setToggle(toggleEditMode);
    }
  }, []);

  const { data: user, isLoading } = useGetCurrentUserQuery(userData?.id);
  const [updateCurrentUser] = useUpdateCurrentUserMutation();

  const handleUserInformationUpdate = async (data: any) => {
    try {
      setLoading(true);
      let profileImage = null;
      let coverImageURL = null;

      if (data.file[0] || data.coverImage[0]) {
        profileImage = await UploadImageToImageBB(data.file[0]);
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
      const result = await updateCurrentUser({ id: userId, ...updateUserData });
      if (result) {
        setLoading(false);
        toast.success("information Updated !");
        setToLocalStorage("editMode", "in-active");
        setTimeout(() => {
          setToggle("active");
        }, 500);
      }
    } catch (err: any) {
      setLoading(false);
      toast.error("something went wrong");
      console.error("Error occurred:", err);
    }
  };

  const handleEditModeOn = () => {
    setToLocalStorage("editMode", "active");
    setTimeout(() => {
      setToggle("active");
    }, 500);
  };

  console.log(toggle, "toggle");

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <BreadCrumb link="/" redirectTo="Home" current="Profile" />
      {/* content part */}
      <div className="max-w-[1200px] mx-auto mt-10">
        <div className="flex flex-col md:flex-row gap-5 px-[20px] sm:px-[30px] lg:px-[50px]">
          <div className="flex-1 flex flex-col gap-3">
            <div className="relative">
              <div className="lg:h-[200px] md:h-[150px] h-[120px] w-full relative">
                <Image
                  src={
                    user?.coverImage ? user?.coverImage : "/assets/cover.jpg"
                  }
                  alt="cover-image"
                  fill
                  objectFit="cover"
                />
              </div>
              <div className="absolute left-5 -bottom-12 bg-white p-2 rounded-md">
                <Image
                  src={user?.image ? user?.image : "/assets/placeholder.png"}
                  alt="profile-image"
                  height={100}
                  width={100}
                  objectFit="contain"
                  className="z-[1000] object-center"
                />
              </div>
            </div>
            {/* information */}
            <div className="mt-10 p-5 flex flex-col md:flex-row gap-8">
              <div className="py-5">
                <h3 className="text-2xl font-semibold">Information</h3>

                <div className="mt-3 md:w-[200px] w-full">
                  <div className="mb-2 flex gap-2 items-center">
                    <BsFillPersonFill className="text-gray-500" />
                    <p>{user?.name}</p>
                  </div>
                  <div className="mb-2 flex gap-2 items-center">
                    <MdAlternateEmail className="text-gray-500" />
                    <p>{user?.email}</p>
                  </div>
                  <div className="mb-2 flex gap-2 items-center">
                    <BsHeartPulse className="text-gray-500" />
                    <p>{user?.age ? `${user?.age} Years Old` : "Not Set"}</p>
                  </div>
                  <div className="mb-2 flex gap-2 items-center">
                    <BsTelephone className="text-gray-500" />
                    <p>{user?.phone ? user?.phone : "Not Set"}</p>
                  </div>
                  <div className="mb-2 flex gap-2 items-center">
                    <BsGenderMale className="text-gray-500" />
                    <p>{user?.gender ? user?.gender : "Not Set"}</p>
                  </div>
                  <div className="mb-2 flex gap-2 items-center">
                    <BiHomeSmile className="text-gray-500" />
                    <p>{user?.address ? user?.address : "Not Set"}</p>
                  </div>
                  <div className="mt-5">
                    <div className="flex flex-row gap-2 items-center">
                      <PiWarningOctagonLight className="text-red-400" />
                      <p className="font-semibold">Notice:</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Your account will be permanently suspended for any
                      inappropriate behavior.
                    </p>
                  </div>
                </div>
              </div>
              {/* user update form */}
              <div className="w-full">
                <p className="text-center text-2xl font-semibold">
                  Update User Info
                </p>
                <p className="text-center">
                  Welcome to our E-commerce website.
                </p>
                {toggle === "active" && (
                  <div className="mt-5 w-full p-5 flex justify-center bg-gray-100">
                    {/* ------------------------------------------------------- */}
                    {/* update Form */}
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
                        <label className="text-gray-500 ml-2">
                          Profile Image
                        </label>
                        <input
                          type="file"
                          {...register("file")}
                          className="outline-none border border-gray-300 px-4 py-1 w-full bg-white"
                        />
                      </div>
                      {/* cover Image */}
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-gray-500 ml-2">
                          Cover Image
                        </label>
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
                  </div>
                )}
                ;
                {toggle === "in-active" && (
                  <div className="mt-5">
                    <p>👋 Hello,</p>
                    <p className="ml-2">{user?.name}!</p>
                    <p className="mt-5">
                      Take a moment to ensure your information is up to date.
                      Keeping your profile information accurate helps us serve
                      you better and enhances your overall experience. We hope
                      you are doing well and are enjoying your time on our
                      platform. If you have any questions or need assistance,
                      please don&lsquo;t hesitate to reach out to us. Thank you
                      for being a part of our community!
                    </p>
                    <button
                      className="px-4 py-2 mt-4 hover:text-white rounded-sm hover:bg-gray-700 transition-all duration-300 border border-gray-300"
                      onClick={handleEditModeOn}
                    >
                      Update Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
