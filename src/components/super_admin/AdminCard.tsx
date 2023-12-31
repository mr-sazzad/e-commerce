"use client";

import { useUpdateSingletUserMutation } from "@/redux/api/users/userApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

import { LiaEdit } from "react-icons/lia";
import { MdRotateRight } from "react-icons/md";

const AdminCard = (admin: any) => {
  const [updateSingleUser] = useUpdateSingletUserMutation();

  const handleChangeStatus = async (admin: any) => {
    try {
      const adminId = admin?.id;

      const requestedData = {
        isBanned: !admin?.isBanned,
      };

      const result: any = await updateSingleUser({
        id: adminId,
        ...requestedData,
      });

      if (result?.data?.success !== false) {
        toast.success("User Status Updated");
      }
    } catch (e: any) {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full sm:w-[46%] md:w-[31%] lg:w-[23%] border-2 border-gray-200 hover:shadow transition relative">
      <div className="relative">
        <div className="h-[70px] w-full relative">
          <Image
            src={admin?.coverImage ? admin?.coverImage : "/assets/cover.jpg"}
            alt="cover-image"
            fill
            objectFit="cover"
          />
        </div>
        <div className="absolute -bottom-6 left-2">
          <div className="relative w-[60px] h-[60px]">
            <Image
              src={admin?.image ? admin?.image : "/assets/placeholder.png"}
              alt="profile-image"
              fill
              objectFit="contain"
              className="p-2 border border-gray-300 rounded bg-white"
            />
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="font-semibold mt-5 border-l-2 pl-1 border-gray-400">
          {admin?.name}
        </p>
        <p className="">{admin?.email}</p>
        {!admin?.isBanned ? (
          <span className="bg-green-500 px-3 rounded-full py-[1px] text-white text-sm">
            Un-Banned
          </span>
        ) : (
          <span className="bg-red-500 px-3 rounded-full py-[1px] text-white text-sm">
            Banned
          </span>
        )}
      </div>
      <div className="mt-4 flex justify-center gap-4 mb-3">
        <Link href={`/super_admin/management/edit-admin/${admin.id}`}>
          <button
            className="
            group
            px-5 
            py-2 
            border 
            border-gray-500 
            bg-gray-700 
            hover:bg-white 
            transition 
            duration-300 
            text-white 
            hover:text-gray-800 
          "
          >
            <LiaEdit className="transform group-hover:scale-125 transition-transform" />
          </button>
        </Link>
        <button
          onClick={() => handleChangeStatus(admin)}
          className="
            group
            px-5 
            py-2 
            border 
            border-gray-500 
            bg-gray-700 
            hover:bg-white 
            transition 
            duration-300 
            text-white 
            hover:text-gray-800 
          "
        >
          <MdRotateRight className="transform group-hover:scale-125 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default AdminCard;
