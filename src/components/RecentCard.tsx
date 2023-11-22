"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { ImEye } from "react-icons/im";
import AddToCart from "./buttons/AddToCart";
import toast from "react-hot-toast";
import {
  useAddToWishlistMutation,
  useGetAllWishlistsQuery,
  useRemoveSingleWishlistMutation,
} from "@/redux/api/wishlist/wishlistApi";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useRouter } from "next/navigation";
import Loading from "@/app/Loading";

const RecentCard = (watch: any) => {
  const router = useRouter();
  const currentUser = getUserFromLocalStorage() as any;
  const [hovered, setHovered] = useState(false);
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeSingleWishlist] = useRemoveSingleWishlistMutation();
  const { data: wishlists, isLoading } = useGetAllWishlistsQuery(
    currentUser?.id
  );

  const [exist, setExist] = useState(false);

  useEffect(() => {
    setExist(
      wishlists?.some((wishlist: any) => wishlist?.watchId === watch.id)
    );
  }, [wishlists, watch.id]);

  if (isLoading) {
    return <Loading />;
  }

  const handleWishlist = async (watch: any) => {
    try {
      if (!currentUser) {
        toast.error("something went wrong");
        router.push("/sign-in");
        return;
      }

      const isExists = await Promise.all(
        wishlists.map(async (wishlist: any) => {
          if (wishlist.watchId === watch.id) {
            const wishlistId = wishlist.id;
            const result = await removeSingleWishlist(wishlistId);
            setExist(false);
            return true;
          }
          return false;
        })
      );

      const requestedData = {
        userId: currentUser.id,
        watchId: watch.id,
      };

      if (isExists.includes(true)) {
        toast.success("removed From wishlist");
      } else {
        const result: any = await addToWishlist(requestedData);
        if (result?.data?.success !== false) {
          toast.success("Wishlist added");
          setExist(true);
        }
      }
    } catch (err) {
      toast.error("something went wrong!");
    }
  };

  return (
    <div
      className="
        flex 
        flex-row 
        sm:flex-col 
        w-full
        sm:w-[245px]
        gap-3 
        relative 
        border 
        border-gray-200
        items-center 
      "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="
            p-2 
            relative 
            group
        "
      >
        <div
          className="
            relative 
            w-[160px] 
            sm:w-[230px] 
            h-[160px]
            overflow-hidden
        "
        >
          <Image
            src={watch.image}
            alt={watch.title}
            layout="fill"
            objectFit="contain"
          />
          {hovered && (
            <div className="absolute bottom-0 w-full flex justify-center pb-4 transition duration-300 ease-in-out">
              <AddToCart watch={watch} />
              <Link href={`/watches/${watch.id}`}>
                <button className="bg-white text-[#9F7A49] py-2 text-xl px-2 mx-1 transition duration-300 ease-in-out hover:bg-[#9F7A49] hover:text-white">
                  <ImEye />
                </button>
              </Link>
              <button
                className="py-2 text-xl px-2 mx-1 transition duration-300 ease-in-out bg-white hover:bg-[#9F7A49]"
                onClick={() => handleWishlist(watch)}
              >
                {exist ? (
                  <IoMdHeart className="text-rose-700 hover:text-rose-800" />
                ) : (
                  <IoMdHeartEmpty className="text-[#9F7A49] hover:text-white" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-5">
        <p className="text-lg font-medium">{watch.title}</p>
        <p>${watch.price}</p>
      </div>
      <style jsx>{`
        button {
          transition: all 0.3s ease;
        }
        button:hover {
          background-color: #9f7a49;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default RecentCard;
