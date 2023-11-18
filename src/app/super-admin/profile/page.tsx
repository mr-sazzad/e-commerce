"use client";

// Import necessary modules and components
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetCurrentUserQuery } from "@/redux/api/users/userApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import BreadCrumb from "@/components/BreadCrumb";
import ProfileInformation from "@/components/profile/ProfileInformation";
import Inactive from "@/components/profile/Inactive";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import Loading from "@/app/Loading";

// Define the UserData interface
interface UserData {
  id: string;
  name: string;
  email: string;
  role: "User" | "Admin" | "super-admin";
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData>();
  const [toggle, setToggle] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("toggle") || "in-active";
    }
    return "in-active";
  });

  useEffect(() => {
    const currentUserData = getUserFromLocalStorage() as any;
    if (currentUserData) {
      setUserData(currentUserData);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("toggle", toggle);
    }
  }, [toggle]);

  const { data: user, isLoading } = useGetCurrentUserQuery(userData?.id);

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

                <ProfileInformation />
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
                    <UpdateProfileForm setToggle={setToggle} />
                  </div>
                )}
                {toggle === "in-active" && <Inactive setToggle={setToggle} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
