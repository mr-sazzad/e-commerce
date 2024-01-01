"use client";

import React, { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "@/helpers/jwt";

import { getFromLocalStorage } from "@/helpers/localStorage";
import Loading from "@/app/Loading";
import { useGetCurrentUserQuery } from "@/redux/api/users/userApi";
import {
  useGetAllPaymentsQuery,
  useUpdateStatusMutation,
} from "@/redux/api/payment/paymentApi";
import { useRouter } from "next/navigation";

// Define the PaymentSuccess component
const PaymentSuccess = () => {
  const router = useRouter();
  // Get current user and session from local storage
  const currentUser = getUserFromLocalStorage() as any;
  const session = getFromLocalStorage("sessionId");

  // Fetch current user and payments data
  const { data: user, isLoading: isUserLoading } = useGetCurrentUserQuery(
    currentUser?.id
  );
  const { data: payments, isLoading: isPaymentsLoading } =
    useGetAllPaymentsQuery(currentUser?.id);

  // Mutation for updating payment status
  const [updateStatus] = useUpdateStatusMutation();

  // Function to update payment status with a delay
  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (payments) {
        try {
          await Promise.all(
            payments.map(async (payment: any) => {
              if (payment.session === session) {
                await updateStatus(session);
              }
            })
          );
          setTimeout(() => {
            router.push("/");
          }, 3000);
        } catch (error) {
          console.error("Error updating payment status:", error);
        }
      }
    };

    updatePaymentStatus();
  }, [payments, session, updateStatus]);

  // Display loading spinner while data is being fetched or updated
  if (isUserLoading || isPaymentsLoading) {
    return <Loading />;
  }

  // Render the success message and button
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-center items-center h-[100vh] w-full">
        <div>
          <div>
            <p className="text-lg font-semibold text-gray-500">
              👋 Hi! {user?.name}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold text-gray-600">Payment Success</p>
            <button
              className="mt-5 bg-green-400 text-white px-4 py-2"
              onClick={() => router.push("/")}
            >
              Go To E-commerce Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
