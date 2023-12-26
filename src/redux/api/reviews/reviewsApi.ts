import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSingleReview: build.mutation({
      query: (data) => ({
        url: "/reviews/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),

    getAllReviews: build.query({
      query: (watchId) => ({
        url: `/reviews/watch/${watchId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),

    getLatestReviews: build.query({
      query: () => ({
        url: `/reviews/latest`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
  }),
});

export const {
  useCreateSingleReviewMutation,
  useGetAllReviewsQuery,
  useGetLatestReviewsQuery,
} = reviewsApi;
