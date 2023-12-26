import Image from "next/image";
import React from "react";
import RatingToStar from "./RatingToStart";

const ReviewCard = ({ review }: { review: any }) => {
  return (
    <div key={review.id} className="flex flex-col gap-3 p-5">
      <div className="flex flex-row justify-between">
        <div className="">
          <div className="flex flex-row gap-2 items-center">
            <div className="relative h-[50px] w-[50px]">
              <Image
                src={
                  review?.author?.image
                    ? review?.author?.image
                    : "/assets/placeholder.png"
                }
                alt="author image"
                fill
                objectFit="contain"
              />
            </div>
            <div>
              <p>{review?.author?.name}</p>
              <p className="text-sm">
                {new Date(review?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <RatingToStar rating={review?.rating} />
        </div>
      </div>
      <div>
        <p>{review?.review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
