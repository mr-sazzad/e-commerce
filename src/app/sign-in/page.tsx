"use client";

// Import necessary packages and components
import { setToLocalStorage } from "@/helpers/localStorage";
import { useLoginUserMutation } from "@/redux/api/users/userApi";
import { ILoginCredentials } from "@/types";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginCredentials>();
  const [loginUser, { isError }] = useLoginUserMutation();

  const onSubmit = async (data: ILoginCredentials) => {
    try {
      const result: any = await loginUser(data);
      if (result?.data?.success === false) {
        toast.error("something went wrong");
      } else {
        setToLocalStorage("access-token", result?.data);
        toast.success("User signed in");
      }
      console.log(result, "result");
    } catch (error) {
      toast.error("Failed to sign in.");
    }
  };

  if (isError) {
    toast.error("Failed to login. Please try again");
  }

  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="h-[150px] w-full">
        <div className="flex justify-center items-center h-full w-full">
          <div>
            <h2 className="text-xl font-bold">Collection</h2>
            <Link href="/">Home</Link> / <span>Login</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center lg:px-[50px] px-[30px] py-10">
        {/* banner part */}
        <div className="flex-1 mb-10 md:mb-0">
          <div className="flex justify-center items-center">
            <div>
              <h2 className="text-center text-2xl font-semibold">E-commerce</h2>
              <p className="text-center font-medium">Login Page</p>
            </div>
          </div>
        </div>

        {/* form part */}
        <div className="flex flex-col gap-3 flex-1">
          <p className="text-center text-2xl font-semibold">Sign In</p>
          <form
            className="flex flex-col justify-center gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email Address"
              className="w-full border-b border-gray-300 outline-none p-3 focus:border-black transition duration-300 bg-transparent"
            />
            {errors.email && (
              <span className="text-red-500 -mt-4 text-sm pl-3">
                Email is required
              </span>
            )}
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="w-full border-b border-gray-300 outline-none p-3 focus:border-black transition duration-300 bg-transparent"
            />
            {errors.password && (
              <span className="text-red-500 -mt-4 text-sm pl-3">
                Password is required
              </span>
            )}
            <button
              className="p-2 bg-gray-200 hover:bg-gray-900 hover:text-white transition duration-1000"
              type="submit"
            >
              Sign in
            </button>
          </form>
          <div className="mt-5 flex gap-1 items-center">
            <p className="text-gray-600">Don&lsquo;t have an account yet?</p>
            <Link href="/sign-up" className="underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
