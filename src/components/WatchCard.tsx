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
  const gridActive = isBrowser ? localStorage.getItem("grid") : null;
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const active = gridActive === "true";

  const currentUser = getUserFromLocalStorage() as any;

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

    if (user && user.Cart) {
      // Check if the product already exists in the cart
      const existingProduct = user.Cart.find((item: any) => {
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

        const result = await updateSingleFromCart({
          id: cartId,
          ...updatedCartItem,
        });

        // if(result?.data?.success !== false){
        //   toast.success("your cart has been updated")
        // }
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
  };

  // const handleAddToCart = async (watch: IWatch) => {
  //   if (!currentUser) {
  //     router.push("/sign-in");
  //   }

  //   if (!user) {
  //     router.push("/sign-in");
  //   }

  //   if (user && user.Cart) {
  //     // Check if the product already exists in the cart
  //     const existingProductIndex = user.Cart.findIndex(
  //       (item: any) => item.watchId === watch.id
  //     );

  //     if (existingProductIndex !== -1) {
  //       const existingProduct = user.Cart[existingProductIndex];
  //       const updatedCart = [...user.Cart];
  //       updatedCart[existingProductIndex] = {
  //         ...existingProduct,
  //         quantity: existingProduct.quantity + 1,
  //       };

  //       const result = await updateSingleFromCart({
  //         id: existingProduct.id,
  //         ...updatedCart[existingProductIndex],
  //       });

  //       console.log(result, "updated cart");
  //     } else {
  //       const addToCartData = {
  //         userId: currentUser?.id,
  //         watchId: watch?.id,
  //         quantity: 1,
  //       };

  //       if (watch.status === "Available") {
  //         const result = await addToCart(addToCartData);
  //         console.log(result, "add to cart");
  //       }
  //     }
  //   }
  // };

  if (isLoading) {
    return <Loading />;
  }
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
