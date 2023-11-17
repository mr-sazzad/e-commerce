import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    stripePayment: build.mutation({
      query: (data) => ({
        url: "/payment/create-checkout-session",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.payment],
    }),

    getAllPayments: build.query({
      query: () => ({
        url: "/payment",
        method: "GET",
      }),
      providesTags: [tagTypes.payment],
    }),

    // getAllRecentPayments: build.query({
    //   query: (limit) => ({
    //     url: "/payment",
    //     method: "GET",
    //     limit,
    //   }),
    //   providesTags: [tagTypes.payment],
    // }),

    updateStatus: build.mutation({
      query: (id) => ({
        url: `/payment/update/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.payment],
    }),
  }),
});

export const {
  useStripePaymentMutation,
  useUpdateStatusMutation,
  useGetAllPaymentsQuery,
  // useGetAllRecentPaymentsQuery,
} = paymentApi;
