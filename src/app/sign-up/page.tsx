"use client";

import { useUserSignUpMutation } from "@/redux/api/users/userApi";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
};

const SignUp = () => {
  const router = useRouter();

  const [userSignUp] = useUserSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const requestedData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const result: any = await userSignUp(requestedData);

      if (!result || result?.data?.success === false) {
        toast.error("Something went wrong.");
      } else {
        toast.success("Sign-up successful");
        setTimeout(() => {
          router.push("/sign-in");
        }, 1000);
      }
    } catch (err: any) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="h-[150px] w-full">
        <div className="flex justify-center items-center h-full w-full">
          <div>
            <h2 className="text-xl font-bold">Collection</h2>
            <Link href="/">Home</Link> / <span>Sign up</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center lg:px-[50px] px-[30px] py-10">
        {/* banner part */}
        <div className="flex-1 mb-10 md:mb-0">
          <div className="flex justify-center items-center">
            <div>
              <h2 className="text-center text-2xl font-semibold">E-commerce</h2>
              <p className="text-center font-medium">Sign up Page</p>
            </div>
          </div>
        </div>

        {/* form part */}
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-center text-2xl font-semibold">Sign Up</p>
          <form
            className="flex flex-col justify-center gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="w-full border-b border-gray-300 outline-none p-3 focus:border-black transition duration-300 bg-transparent"
            />
            {errors.name && (
              <p className="text-red-500 -mt-4 text-sm pl-3">
                Name is required
              </p>
            )}

            <input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: true })}
              className="w-full border-b border-gray-300 outline-none p-3 focus:border-black transition duration-300 bg-transparent"
            />
            {errors.email && (
              <p className="text-red-500 -mt-4 text-sm pl-3">
                Email is required
              </p>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="w-full border-b border-gray-300 outline-none p-3 focus:border-black transition duration-300 bg-transparent"
            />
            {errors.password && (
              <p className="text-red-500 -mt-4 text-sm pl-3">
                Password is required
              </p>
            )}

            <input
              type="password"
              placeholder="Re Type Password"
              {...register("rePassword", {
                required: true,
                validate: (value) => value === watch("password"),
              })}
              className="w-full border-b border-gray-300 outline-none p-3 focus:border-black transition duration-300 bg-transparent"
            />
            {errors.rePassword && errors.rePassword.type === "required" && (
              <p className="text-red-500 -mt-4 text-sm pl-3">
                Please retype your password
              </p>
            )}
            {errors.rePassword && errors.rePassword.type === "validate" && (
              <p className="text-red-500 -mt-4 text-sm pl-3">
                Passwords do not match
              </p>
            )}

            <button
              type="submit"
              className={`p-2 ${
                Object.keys(errors).length === 0
                  ? "bg-gray-200 hover:bg-gray-900 hover:text-white transition duration-1000"
                  : "bg-gray-400 pointer-events-none"
              }`}
              disabled={Object.keys(errors).length > 0}
            >
              Sign Up
            </button>
          </form>
          <div className="mt-5 flex gap-1 items-center">
            <p className="text-gray-600">Already Have an Account?</p>
            <Link href="/sign-in" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
