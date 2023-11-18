import Loading from "@/app/Loading";
import {
  useDeleteSingleFromCartMutation,
  useGetSingleFromCartQuery,
} from "@/redux/api/cart/cartApi";
import { ICartItem } from "@/types";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

import { PiTrashBold } from "react-icons/pi";

const CartItem = (item: ICartItem) => {
  const { data: watch, isLoading } = useGetSingleFromCartQuery(item.id);
  const [deleteSingleFromCart] = useDeleteSingleFromCartMutation();

  const handleDelete = async (item: any) => {
    try {
      const result: any = await deleteSingleFromCart(item?.id);
      if (result?.data?.success !== false) {
        toast.success("item deleted");
      } else {
        toast.error("something went wrong");
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center gap-5 w-full hover:shadow transition relative">
      <Image src={watch?.product?.image} alt="image" height={100} width={100} />

      <div className="flex flex-col flex-1">
        <p>{watch?.product?.title}</p>
        <p>${watch?.product?.price}</p>
        <p>
          Qty: {watch?.quantity <= 9 ? `0${watch?.quantity}` : watch?.quantity}p
        </p>
      </div>
      <div className="absolute right-5 top-5">
        <button
          className="px-5 py-2 bg-red-500 hover:bg-red-600 transition"
          onClick={() => handleDelete(watch)}
        >
          <PiTrashBold className="text-xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
