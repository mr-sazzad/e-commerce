"use client";

import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetAllPaymentsQuery } from "@/redux/api/payment/paymentApi";
import { useGetCurrentUserQuery } from "@/redux/api/users/userApi";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import BreadCrumb from "@/components/BreadCrumb";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Orders = () => {
  const currentUser = getUserFromLocalStorage() as any;
  const router = useRouter();

  useEffect(() => {
    const redirectUser = () => {
      if (!currentUser) {
        router.push("/sign-in");
      }
    };

    const redirectTimeout = setTimeout(redirectUser, 500);

    return () => clearTimeout(redirectTimeout);
  }, [currentUser, router]);

  const { data: orders, isLoading: isOrdersLoading } = useGetAllPaymentsQuery(
    currentUser?.id
  );
  const { data: user, isLoading: isUserLoading } = useGetCurrentUserQuery(
    currentUser?.id
  );

  if (isOrdersLoading || isUserLoading) {
    return <Loading />;
  }

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  return (
    <>
      <BreadCrumb current="Orders" redirectTo="Cart" link="/cart" />

      <div className="max-w-[1000px] mx-auto">
        <div className="px-[30px] lg:px-[50px] my-10">
          <p className="text-2xl font-semibold text-center mb-5">
            Order History
          </p>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col gap-4 md:max-h-[400px] border border-gray-300 p-3 md:w-[40%] w-full">
              <div className="flex flex-row justify-center">
                <div className="flex flex-col gap-5">
                  <div className="relative h-[100px] w-[100px]">
                    <Image
                      src={
                        user?.image ? user?.image : "/assets/placeholder.png"
                      }
                      alt="user profile"
                      fill
                      objectFit="contain"
                    />
                  </div>
                  <div>
                    <p className="text-center font-bold text-xl text-gray-700 hover:text-green-400 transition duration-300">
                      {user?.name}
                    </p>
                    <p className="text-center text-sm text-gray-700">
                      {user?.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-gray-700">
                  Your feedback is crucial! Share your thoughts on recent
                  purchases to help us improve and assist fellow customers. Your
                  review adds value to our products and enhances the overall
                  shopping experience. Log in now to contribute—your opinion
                  matters!
                </p>
              </div>
            </div>
            {/* right side */}
            <div className="md:w-[60%] w-full">
              <ul className="flex flex-col gap-2 border border-gray-300 p-3">
                {orders &&
                  orders?.map((order: any) => (
                    <li
                      key={order?.id}
                      className="hover:shadow-md p-3 border border-gray-300"
                    >
                      <div className="">
                        <div className="flex flex-row justify-between items-center w-full">
                          <div className="relative h-[70px] w-[70px]">
                            <Image
                              src={order?.product?.image}
                              fill
                              alt="user-profile"
                              objectFit="contain"
                            />
                          </div>
                          <div className="">
                            <p className="font-bold text-gray-500">
                              {order?.product?.title}
                            </p>
                            <p className="text-gray-500">
                              $ {order?.product?.price}
                            </p>
                          </div>

                          <div className="flex justify-center gap-2">
                            <button
                              className={`px-3 py-2 text-gray-100 font-semibold cursor-not-allowed ${
                                order?.status === "Paid"
                                  ? "bg-green-400 px-4"
                                  : "bg-red-400"
                              }`}
                            >
                              {order?.status === "Unpaid"
                                ? "Cancelled"
                                : "Success"}
                            </button>
                            {order?.status === "Paid" && (
                              <Link
                                href={`/review/${order?.product?.id}`}
                                className="px-3 py-2 bg-orange-400 font-semibold text-gray-100"
                              >
                                Review
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Orders), {
  ssr: false,
});
