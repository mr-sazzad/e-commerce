"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { SiAmazoncloudwatch } from "react-icons/si";
import { HiMiniArrowSmallRight } from "react-icons/hi2";

const PaymentCancel = () => {
  const router = useRouter();

  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="flex justify-center items-center h-[100vh] w-full">
        <div>
          <div></div>
          <div className="flex flex-col items-center">
            <div>
              <p className="font-semibold text-gray-500 flex gap-1 items-center">
                <SiAmazoncloudwatch />
                SORRY
              </p>
              <p className="text-2xl font-bold text-gray-600">Payment Cancel</p>
            </div>
            <button
              className="
                mt-5 
                border 
                border-rose-500 
                text-rose-500 
                hover:bg-rose-500 
                hover:text-white 
                px-4 py-[5px] 
                font-bold transition 
                duration-300
                flex
                gap-1
                items-center
              "
              onClick={() => router.push("/")}
            >
              Go To Home Page{" "}
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
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
