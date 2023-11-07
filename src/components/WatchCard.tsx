"use client";

import Loading from "@/app/loading";
// WatchCard.tsx
import { getUserFromLocalStorage } from "@/helpers/jwt";
import {
  useAddToCartMutation,
  useUpdateSingleFromCartMutation,
} from "@/redux/api/cart/cartApi";
import { useGetCurrentUserQuery } from "@/redux/api/users/userApi";
import { IWatch } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { ImEye } from "react-icons/im";

const isBrowser = typeof window !== "undefined";

const WatchCard = (watch: any) => {
  const [cart, setCart] = useState<any[]>([]);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const currentUser: any = getUserFromLocalStorage();

  const { data: user, isLoading } = useGetCurrentUserQuery(currentUser?.id);
  const [addToCart] = useAddToCartMutation();
  const [updateSingleFromCart] = useUpdateSingleFromCartMutation();

  const handleAddToCart = async (watch: IWatch) => {
    if (!currentUser) {
      router.push("/sign-in");
    }

    if (!user) {
      router.push("/sign-in");
    }

    // Fetch the latest user data, including the cart
    try {
      const response = await fetch(
        `http://localhost:3007/api/v1/users/${currentUser?.id}`
      );
      const updatedUser = await response.json();

      if (updatedUser && updatedUser?.data?.Cart) {
        const existingProduct = updatedUser?.data?.Cart.find((item: any) => {
          return item.watchId === watch.id;
        });

        console.log(existingProduct, "existing product");

        if (existingProduct) {
          const updatedCartItem = {
            userId: existingProduct.userId,
            watchId: existingProduct.watchId,
            quantity: existingProduct.quantity + 1,
          };

          const cartId = existingProduct?.id;

          const result: any = await updateSingleFromCart({
            id: cartId,
            ...updatedCartItem,
          });

          if (result?.data?.success !== false) {
            toast.success("Your cart has been updated");
          }
        } else {
          const addToCartData = {
            userId: currentUser?.id,
            watchId: watch?.id,
            quantity: 1,
          };

          if (watch.status === "Available") {
            const result = await addToCart(addToCartData);
            console.log(result, "add to cart");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching or updating user data:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const isBrowser = typeof window !== "undefined";
  const gridActive = isBrowser ? localStorage.getItem("grid") : null;
  const active = gridActive === "true";

  return (
    <div
      className={`flex flex-row items-center w-full gap-3 relative border border-gray-200 hover:shadow transition ${
        active ? "flex-col w-[260px] sm:w-[240px]" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-1 relative group">
        <div
          className={`w-[250px] sm:w-[230px] h-[250px] relative overflow-hidden ${
            active ? "w-[256px] sm:w-[236px]" : ""
          }`}
        >
          <Image
            src={watch.image}
            alt={watch.title}
            fill
            objectFit="cover"
            className="p-2"
          />
          {hovered && (
            <div className="absolute bottom-0 w-full flex justify-center pb-4 transition duration-300 ease-in-out">
              <button
                className="bg-white text-[#9F7A49] py-2 text-xl px-2 mx-1 transition duration-300 ease-in-out hover:bg-[#9F7A49] hover:text-white"
                onClick={() => handleAddToCart(watch)}
              >
                <AiOutlineShoppingCart />
              </button>
              <button className="bg-white text-[#9F7A49] py-2 text-xl px-2 mx-1 transition duration-300 ease-in-out hover:bg-[#9F7A49] hover:text-white">
                <ImEye />
              </button>
              <button className="bg-white text-[#9F7A49] py-2 text-xl px-2 mx-1 transition duration-300 ease-in-out hover:bg-[#9F7A49] hover:text-white">
                <AiOutlineHeart />
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

export default WatchCard;
