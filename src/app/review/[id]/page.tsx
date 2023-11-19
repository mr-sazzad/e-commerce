"use client";

import BreadCrumb from "@/components/BreadCrumb";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useCreateSingleReviewMutation } from "@/redux/api/reviews/reviewsApi";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { MdStarHalf, MdOutlineStarPurple500 } from "react-icons/md";
import { TbSend } from "react-icons/tb";

const Review = () => {
  const router = useRouter();
  const { id } = useParams();

  const [createSingleReview] = useCreateSingleReviewMutation();
  const currentUser = getUserFromLocalStorage() as any;
  const [rating, setRating] = useState<number>(3.5);

  const handleRatingChange = (newRating: number): void => {
    setRating(newRating);
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      if (currentUser.role !== "user") {
        toast.error("only user is allowed to submit review");
      }

      const requestedData = {
        userId: currentUser.id,
        watchId: id,
        rating,
        review: data.review,
      };

      const result: any = await createSingleReview(requestedData);

      if (result?.data?.success !== false) {
        toast.success("Review Added");
        reset();

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  if (!currentUser) {
    router.push("/sign-in");
  }

  return (
    <div>
      <BreadCrumb current="Review" redirectTo="Orders" link="/orders" />

      <div className="max-w-[1000px] mx-auto my-10">
        <div className="px-[30px] lg:px-[50px]">
          <h2 className="text-2xl font-bold text-gray-700 text-center mb-5">
            Write Your Review
          </h2>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1">
              <div className="relative w-full h-[347px]">
                <Image
                  src="/assets/review.gif"
                  alt="review gif image"
                  fill
                  objectFit="contain"
                />
              </div>
            </div>
            <div className="flex flex-col flex-1 w-full border border-gray-300 px-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 mb-4 mt-2">
                  <label className="ml-1">Rating</label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleRatingChange(star)}
                        className={`cursor-pointer text-2xl ${
                          star <= rating
                            ? star === Math.floor(rating) ||
                              star === Math.ceil(rating)
                              ? "text-yellow-400" // Full star
                              : "text-yellow-400" // Half star
                            : "text-gray-300"
                        }`}
                      >
                        {star <= rating ? (
                          <MdOutlineStarPurple500 />
                        ) : (
                          <MdStarHalf />
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="ml-1">Review</label>
                  <textarea
                    rows={6}
                    {...register("review", { required: true })}
                    className="w-full border border-gray-300 outline-none p-3"
                    placeholder="Write Your Review Here..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-orange-400 text-white font-bold mt-4 hover:bg-orange-500 transition duration-300 flex justify-center items-center gap-3"
                >
                  <p>Post Your Review</p> <TbSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
