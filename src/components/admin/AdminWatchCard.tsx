import {
  useDeleteSingleWatchMutation,
  useUpdateSingleWatchMutation,
} from "@/redux/api/watches/watchApi";
import { AdminWatch } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

import { BiEdit, BiTrash, BiRotateRight } from "react-icons/bi";

const AdminWatchCard = (watch: AdminWatch) => {
  const [deleteSingleWatch] = useDeleteSingleWatchMutation();
  const [updateSingleWatch] = useUpdateSingleWatchMutation();

  const handleWatchDelete = async (watch: AdminWatch) => {
    try {
      // const result = await deleteSingleWatch(watch.id);
      toast.success("Watch deleted successfully");
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  //   update status
  const handleStatusChange = async (watch: AdminWatch) => {
    try {
      const newStatus =
        watch.status === "Available" ? "Unavailable" : "Available";
      const result = await updateSingleWatch({
        id: watch.id,
        status: newStatus,
      });

    } catch (err) {
      // handle errors
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full sm:w-[46%] md:w-[31%] lg:w-[23%] border hover:shadow transition">
      <div className="relative w-full h-[150px]">
        <Image
          src={watch?.image}
          alt="watch-image"
          fill
          objectFit="contain"
          className="p-3"
        />
      </div>
      <div className="p-3">
        <p className="text-xl font-semibold text-gray-700">{watch?.title}</p>
        <p className="text-lg font-medium text-gray-700">$ {watch?.price}</p>
        <div className="mb-5">
          {watch?.status.toLowerCase() === "available" ? (
            <span className="text-md text-green-500 font-semibold">
              {watch?.status.toLowerCase()}
            </span>
          ) : (
            <span className="text-md text-red-500 font-semibold">
              Out Of Stock
            </span>
          )}
        </div>
        <div className="flex gap-3 justify-center">
          <Link href={`/admin/management/watches/edit-watch/${watch.id}`}>
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
              <BiEdit className="transform group-hover:scale-125 transition-transform" />
            </button>
          </Link>
          <button
            type="button"
            onClick={() => handleWatchDelete(watch)}
            className="
                group
                px-5 
                py-2 
                border 
                border-gray-500 
                bg-gray-700 
                hover:bg-red-500 
                transition 
                duration-300 
                text-white 
                hover:text-white
                hover:border-red-500 
            "
          >
            <BiTrash className="transform group-hover:scale-125 transition-transform" />
          </button>
          <button
            type="button"
            onClick={() => handleStatusChange(watch)}
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
                hover:text-black 
            "
          >
            <BiRotateRight className="transform group-hover:scale-125 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminWatchCard;
