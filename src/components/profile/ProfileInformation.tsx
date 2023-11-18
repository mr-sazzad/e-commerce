import Loading from "@/app/Loading";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetCurrentUserQuery } from "@/redux/api/users/userApi";
import React from "react";
import { BiHomeSmile } from "react-icons/bi";
import {
  BsFillPersonFill,
  BsGenderMale,
  BsHeartPulse,
  BsTelephone,
} from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { PiWarningOctagonLight } from "react-icons/pi";
import { SiStatuspal } from "react-icons/si";

const ProfileInformation = () => {
  const currentUser = getUserFromLocalStorage() as any;

  const { data: user, isLoading } = useGetCurrentUserQuery(currentUser?.id);

  if (isLoading) {
    return <Loading />;
  }

  return (
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
      <div className="mb-2 flex gap-2 items-center">
        <SiStatuspal className="text-gray-500" />
        <p className="text-gray-500 cursor-not-allowed">
          {user?.role && `Logged in as ${user.role}`}
        </p>
      </div>
      <div className="mt-5">
        <div className="flex flex-row gap-2 items-center">
          <PiWarningOctagonLight className="text-red-400" />
          <p className="font-semibold">Notice:</p>
        </div>
        <p className="text-sm text-gray-500">
          Your account will be permanently suspended for any inappropriate
          behavior.
        </p>
      </div>
    </div>
  );
};

export default ProfileInformation;
