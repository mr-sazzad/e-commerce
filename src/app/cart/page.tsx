"use client";

import CartItem from "@/components/CartItem";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import {
  useGetAllFromCartQuery,
  useRemoveAllFromCartMutation,
} from "@/redux/api/cart/cartApi";
import { useStripePaymentMutation } from "@/redux/api/payment/paymentApi";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import BreadCrumb from "@/components/BreadCrumb";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import { setToLocalStorage } from "@/helpers/localStorage";

import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { HiMiniArrowSmallRight } from "react-icons/hi2";
import { AiFillHeart } from "react-icons/ai";
import toast from "react-hot-toast";

const stripeKey =
  "pk_test_51O7I6YSHcqDbqznpElzunzfMsBFHFu6tog3M1UGhXBb5DcqO15sSsbshWIewrqyLC7kOVmpb0aP2L2iFVwJ672ef00llYTcNGY";

const Cart = () => {
  const currentUser = getUserFromLocalStorage() as any;
  const [disable, setDisable] = useState(false);
  const [stripePayment] = useStripePaymentMutation();
  const [removeAllFromCart] = useRemoveAllFromCartMutation();
  const router = useRouter();

  const { data: cartProducts, isLoading } = useGetAllFromCartQuery(
    currentUser?.id
  );

  useEffect(() => {
    if (!currentUser) {
      router.push("/sign-in");
    }

    if (cartProducts && cartProducts.length <= 0) {
      setDisable(true);
    }
  }, [cartProducts, currentUser]);

  if (isLoading) {
    return <Loading />;
  }

  let totalAmount = 0;

  if (cartProducts) {
    totalAmount = cartProducts?.reduce(
      (accumulator: number, item: any) =>
        accumulator + item.product.price * item.quantity,
      0
    );
  }

  const handleCheckOut = async () => {
    const stripe = await loadStripe(stripeKey);
    try {
      const result: any = await stripePayment(cartProducts);

      if (result) {
        setToLocalStorage("sessionId", result?.data?.sessionId);
        router.push(result?.data?.sessionUrl);
        await removeAllFromCart(currentUser?.id);
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <BreadCrumb link="/" redirectTo="Home" current="Cart" />

      <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-col md:flex-row gap-16 justify-between mt-10 px-[30px] lg:px-[50px]">
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
            <h2 className="text-xl font-semibold mb-5 text-center">Checkout</h2>
            <div className="relative">
              <BiSolidQuoteAltLeft className="absolute text-[70px] -top-12 -left-9 text-gray-200 z-1" />
              <p className="text-gray-700 z-1000">
                To purchase quantities greater than one, kindly add the desired
                number of items to your cart. Please ensure to specify the
                quantity of the item you wish to purchase.
              </p>
            </div>
            <div className="flex justify-end gap-5 my-10">
              <div className="">
                <button
                  className="flex flex-row gap-1 items-center text-gray-600 px-5 py-2 border group border-gray-600 font-bold hover:bg-gray-600 hover:text-white transition duration-300"
                  onClick={() => router.push("/wishlist")}
                >
                  <p className="">wishlists</p>
                  <AiFillHeart
                    className="animate-bounce text-rose-500"
                    style={{
                      animationDuration: "1.5s",
                      animationIterationCount: "infinite",
                      animationTimingFunction: "ease",
                    }}
                  />
                </button>
              </div>
              <div className="">
                <button
                  className="flex flex-row gap-1 items-center text-gray-600 px-5 py-2 border group border-gray-600 font-bold hover:bg-gray-600 hover:text-white transition duration-300"
                  onClick={() => router.push("/orders")}
                >
                  <p className="">See All Orders</p>
                  <HiMiniArrowSmallRight
                    className="animate-bounce"
                    style={{
                      animationDuration: "1.5s",
                      animationIterationCount: "infinite",
                      animationTimingFunction: "ease",
                    }}
                  />
                </button>
              </div>

              <button
                onClick={handleCheckOut}
                className={`
                  border 
                  border-gray-300 
                  px-4 py-[6px]
                  ${
                    disable
                      ? "cursor-not-allowed text-gray-400"
                      : `bg-gray-700 
                         text-white 
                         hover:bg-white 
                         hover:text-black 
                         transition 
                         duration-500
                        `
                  }
                `}
                disabled={disable}
                type="submit"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
