"use client";

import Loading from "@/app/loading";
import CartItem from "@/components/CartItem";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetAllFromCartQuery } from "@/redux/api/cart/cartApi";
import { useStripePaymentMutation } from "@/redux/api/payment/paymentApi";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { loadStripe } from "@stripe/stripe-js";
import BreadCrumb from "@/components/BreadCrumb";
import { useRouter } from "next/navigation";

const stripeKey =
  "pk_test_51O7I6YSHcqDbqznpElzunzfMsBFHFu6tog3M1UGhXBb5DcqO15sSsbshWIewrqyLC7kOVmpb0aP2L2iFVwJ672ef00llYTcNGY";

const Cart = () => {
  const currentUser = getUserFromLocalStorage() as any;
  const [disable, setDisable] = useState(false);
  const [stripePayment] = useStripePaymentMutation();
  const router = useRouter();

  const { data: cartProducts, isLoading } = useGetAllFromCartQuery(
    currentUser?.id
  );

  useEffect(() => {
    if (!currentUser) {
      // Redirect to login if user is not logged in
      router.push("/sign-in");
    }

    if (cartProducts && cartProducts.length <= 0) {
      setDisable(true);
    }
  }, [cartProducts, currentUser]);

  if (!currentUser || isLoading) {
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
        router.push(result.url);
      }
    } catch (err) {
      console.error(err, "payment error");
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
            <div className="flex justify-end my-10">
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
