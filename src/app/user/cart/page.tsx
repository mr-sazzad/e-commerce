"use client";

import Loading from "@/app/loading";
import CartItem from "@/components/CartItem";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetAllFromCartQuery } from "@/redux/api/cart/cartApi";
// import { watches } from "@/constants";
import Link from "next/link";
import React from "react";

const Cart = () => {
  const currentUser = getUserFromLocalStorage() as any;
  const { data: cartProducts, isLoading } = useGetAllFromCartQuery(
    currentUser?.id
  );

  if (isLoading) {
    return <Loading />;
  }

  let totalAmount = 0;

  if (cartProducts) {
    totalAmount = cartProducts.reduce(
      (accumulator: number, item: any) =>
        accumulator + item.product.price * item.quantity,
      0
    );
  }

  return (
    <div>
      <div className="h-[200px] w-full bg-slate-100">
        <div className="flex justify-center items-center h-full w-full">
          <div>
            <h2 className="text-xl font-bold">Cart</h2>
            <Link href="/">Home</Link> / <span>Cart</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-col md:flex-row gap-10 justify-between mt-10 px-[30px] lg:px[50px]">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-5 text-center">
              Cart Products
            </h2>
            <div className="flex flex-col gap-3 p-5 border">
              {cartProducts?.map((item: any) => (
                <div key={item.title}>
                  <CartItem {...item} />
                </div>
              ))}
            </div>
            <div className="flex justify-end p-5">
              <p>Total Amount: ${totalAmount}</p>
            </div>
          </div>
          <div className="flex-1">
            {/* <h2 className="text-xl font-semibold mb-5 text-center">Checkout</h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
