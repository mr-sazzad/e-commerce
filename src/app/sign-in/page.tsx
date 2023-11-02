import Link from "next/link";
import React from "react";

const SingIn = () => {
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

      <div
        className="
            flex 
            flex-col
            md:flex-row
            justify-between 
            md:items-center 
            lg:px-[50px] 
            px-[30px] 
            py-10
        "
      >
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
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-center text-2xl font-semibold">Sign In</p>
          <form className="flex flex-col justify-center gap-5">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border-b border-gray-300 outline-none p-3 focus:border-black transition duration-300 bg-transparent"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border-b border-gray-300 outline-none p-3 focus:border-black transition duration-300 bg-transparent"
            />
            <button className="p-2 bg-gray-200 hover:bg-gray-900 hover:text-white transition duration-1000">
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

export default SingIn;
