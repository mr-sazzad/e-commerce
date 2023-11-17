"use client";

import Loading from "@/app/loading";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import {
  useAddToCartMutation,
  useUpdateSingleFromCartMutation,
} from "@/redux/api/cart/cartApi";
import { useGetCurrentUserQuery } from "@/redux/api/users/userApi";
import { IWatch } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";

const AddToCart = ({ watch }: { watch: IWatch }) => {
  const currentUser: any = getUserFromLocalStorage();
  const [updateSingleFromCart] = useUpdateSingleFromCartMutation();
  const [addToCart] = useAddToCartMutation();
  const { data: user, isLoading } = useGetCurrentUserQuery(currentUser?.id);

  const router = useRouter();

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
            toast.success("Your Cart has been updated");
          }
        } else {
          const addToCartData = {
            userId: currentUser?.id,
            watchId: watch?.id,
            quantity: 1,
          };

          if (watch.status !== "Available") {
            toast.error("This Item Temporarily Unavailable");
          }

          if (watch.status === "Available") {
            const result: any = await addToCart(addToCartData);
            if (result?.data?.success !== false) {
              toast.success("Product Added To Cart");
            } else {
              toast.error("something went wrong");
            }
          }
        }
      }
    } catch (error) {
      toast.error("something went wrong");
      console.error("Error fetching or updating user data:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <button
        className="bg-white text-[#9F7A49] py-2 text-xl px-2 mx-1 transition duration-300 ease-in-out hover:bg-[#9F7A49] hover:text-white"
        onClick={() => handleAddToCart(watch)}
      >
        <AiOutlineShoppingCart />
      </button>
    </div>
  );
};

export default AddToCart;
