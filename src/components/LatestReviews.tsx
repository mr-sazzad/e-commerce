"use client";

import { useGetLatestReviewsQuery } from "@/redux/api/reviews/reviewsApi";
import React from "react";
import Masonry from "react-masonry-css";
import ReviewCard from "./ReviewCard";
import Loading from "@/app/Loading";
import { breakpointColumnsObj } from "@/constants/masonry";

const LatestReviews = () => {
  const { data: reviews, isLoading } = useGetLatestReviewsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  console.log(reviews, "reviews");

  return (
    <div className="max-w-[1200px] mx-auto relative">
      <h2 className="md:text-3xl sm:text-2xl text-xl font-semibold text-center text-gray-600">
        Our Customer Says
      </h2>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid mt-10"
        columnClassName="my-masonry-grid_column"
      >
        {reviews &&
          reviews.map((review: any) => (
            <div key={review.id}>
              <ReviewCard review={review} />
            </div>
          ))}
      </Masonry>
    </div>
  );
};

export default LatestReviews;
