import Loading from "@/app/loading";
import { useGetSingleFromCartQuery } from "@/redux/api/cart/cartApi";
import { ICartItem } from "@/types";
import Image from "next/image";
import React from "react";

import { PiTrashSimpleLight } from "react-icons/pi";

const CartItem = (item: ICartItem) => {
  const { data: watch, isLoading } = useGetSingleFromCartQuery(item.id);

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
        <button className="px-5 py-2 bg-rose-500 hover:bg-rose-600 transition">
          <PiTrashSimpleLight className="text-xl text-white font-bold"/>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
