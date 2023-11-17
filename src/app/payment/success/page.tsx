"use client";

import React, { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetCurrentUserQuery } from "@/redux/api/users/userApi";
import {
  useGetAllPaymentsQuery,
  useUpdateStatusMutation,
} from "@/redux/api/payment/paymentApi";
import Loading from "@/app/loading";

const PaymentSuccess = () => {
  const currentUser = getUserFromLocalStorage() as any;

  const { data: user, isLoading: isUserLoading } = useGetCurrentUserQuery(
    currentUser?.id
  );

  const { data: payments, isLoading: isPaymentsLoading } =
    useGetAllPaymentsQuery(undefined);

  const [updateStatus] = useUpdateStatusMutation();
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    const updateStatusWithDelay = async () => {
      if (payments) {
        setIsUpdatingStatus(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));

        try {
          // Assuming 'status' property is used to update payment status
          payments.forEach(async (item: any) => {
            const sessionId = item.session;
            await updateStatus(sessionId);
          });
        } catch (error) {
          console.error("Error updating payment status:", error);
        } finally {
          setIsUpdatingStatus(false);
        }
      }
    };

    updateStatusWithDelay();
  }, [payments, updateStatus]);

  if (isUserLoading || isPaymentsLoading || isUpdatingStatus) {
    return <Loading />;
  }

  console.log(payments, "All Payments");

  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="flex justify-center items-center h-[100vh] w-full">
        <div>
          <div>
            <p className="text-lg font-semibold text-gray-500">
              👋 Hi! {user?.name}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold text-gray-600">Payment Success</p>
            <button className="mt-5 bg-green-400 text-white px-4 py-2">
              Go To E-commerce Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
