import Image from "next/image";
import Link from "next/link";
import React from "react";

const SecondPromotion = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:px-[50px] px-[30px] bg-gray-300 py-10 rounded">
        <div className="md:w-[40%] w-full h-full relative md:min-h-[270px] min-h-[250px]">
          <Image
            src="/assets/banner-2.png"
            alt="image"
            fill
            className="object-cover opacity-60 rounded"
          />
        </div>
        <div className="md:w-[60%] w-full flex flex-col gap-5">
          <p className="font-bold text-center md:text-start">
            ROMAN OR NUMERAL?
          </p>
          <p className="text-lg font-semibold text-center md:text-start">
            The Watches We Sell Are Original And Vendor Certified For A Peerless
            Performance!
          </p>
          <p className="text-sm text-center md:text-start">
            uis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis
            magna. Sed consequat, leo eget bibendum sodales, uis leo. Sed
            fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed
            consequat, leo eget. Donec sodales sagittis magna. Sed consequat,
            leo eget bibendum sodales, augue velit cursus nunc.uis leo. Sed
            fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed
            consequat, leo eget
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              href="/watches"
              className="px-5 py-2 text-[#9F7A49] border border-[#9F7A49] hover:text-white hover:bg-[#9F7A49] hover:transition duration-500"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPromotion;
