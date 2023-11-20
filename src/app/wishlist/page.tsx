"use client";

import BreadCrumb from "@/components/BreadCrumb";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetCurrentUserQuery } from "@/redux/api/users/userApi";
import React from "react";
import Loading from "../Loading";
import Image from "next/image";
import {
  useGetAllWishlistsQuery,
  useRemoveAllWishlistsMutation,
  useRemoveSingleWishlistMutation,
} from "@/redux/api/wishlist/wishlistApi";

import { SiAmazoncloudwatch } from "react-icons/si";
import { BiTrash } from "react-icons/bi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Wishlists = () => {
  const currentUser = getUserFromLocalStorage() as any;
  const router = useRouter();
  const { data: user, isLoading } = useGetCurrentUserQuery(currentUser?.id);
  const [removeSingleWishlist] = useRemoveSingleWishlistMutation();
  const [removeAllWishlists] = useRemoveAllWishlistsMutation();

  const { data: wishlists, isLoading: wishlistLoading } =
    useGetAllWishlistsQuery(currentUser?.id);

  if (isLoading || wishlistLoading) {
    return <Loading />;
  }

  if (!currentUser) {
    router.push("/sign-in");
  }

  const handleSingleRemove = (wishlist: any) => {
    try {
      const result: any = removeSingleWishlist(wishlist.id);
      if (result?.data?.success !== false) {
        toast.success("Wishlist Removed");
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  const handleAllRemove = (user: any) => {
    try {
      setTimeout(() => {
        const result: any = removeAllWishlists(user.id);
        if (result?.data?.success !== false) {
          toast.success("Wishlist cleared");
        }
      }, 1000);
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <BreadCrumb current="Wishlists" redirectTo="cart" link="/cart" />
      <div className="max-w-[1000px] mx-auto">
        <div className="px-[30px] lg:px-[50px] my-10">
          <p className="text-2xl font-semibold text-center mb-5">
            Your Wishlists
          </p>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col gap-4 md:max-h-[400px] border border-gray-300 p-3 md:w-[40%] w-full">
              <div className="flex flex-row justify-center">
                <div className="flex flex-col gap-5">
                  <div className="relative h-[100px] w-[100px]">
                    <Image
                      src={
                        user?.image ? user?.image : "/assets/placeholder.png"
                      }
                      alt="user profile"
                      fill
                      objectFit="contain"
                    />
                  </div>
                  <div>
                    <p className="text-center font-bold text-xl text-gray-700 hover:text-green-400 transition duration-300">
                      {user?.name}
                    </p>
                    <p className="text-center text-sm text-gray-700">
                      {user?.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-gray-700">
                <p>👋 Hi {user.name}</p>
                <p>Welcome to your wishlist server</p>
              </div>
            </div>
            {/* right side */}
            <div className="md:w-[60%] w-full">
              <ul className="flex flex-col gap-2 border border-gray-300 p-3">
                {wishlists && wishlists.length > 0 ? (
                  wishlists?.map((wishlist: any) => (
                    <li
                      key={wishlist?.id}
                      className="hover:shadow-md p-3 border border-gray-300"
                    >
                      <div className="">
                        <div className="flex flex-row justify-between items-center w-full">
                          <div className="relative h-[70px] w-[70px]">
                            <Image
                              src={wishlist?.watch?.image}
                              fill
                              alt="user-profile"
                              objectFit="contain"
                            />
                          </div>
                          <div className="">
                            <p className="font-bold text-gray-500">
                              {wishlist?.watch?.title}
                            </p>
                            <p className="text-gray-500">
                              $ {wishlist?.watch?.price}
                            </p>
                          </div>

                          <div className="flex justify-center gap-2">
                            <button
                              className={`p-3 text-gray-100 font-semibold bg-rose-500 rounded-full hover:bg-rose-600 transition duration-300 transform hover:rotate-360`}
                              onClick={() => handleSingleRemove(wishlist)}
                            >
                              <BiTrash className="text-xl" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>
                    <div className="flex justify-center items-center text-gray-400">
                      <div>
                        <p className="flex gap-1 items-center font-medium">
                          <SiAmazoncloudwatch /> SORRY
                        </p>
                        <h2 className="text-2xl font-semibold">
                          No Wishlists To Display
                        </h2>
                      </div>
                    </div>
                  </li>
                )}
                {wishlists.length > 0 && (
                  <div className="flex justify-end">
                    <button
                      className="px-3 py-2 border font-bold border-rose-500 text-rose-500 hover:bg-rose-600 hover:text-white transition-all duration-300"
                      onClick={() => handleAllRemove(currentUser)}
                    >
                      Remove All
                    </button>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlists;
