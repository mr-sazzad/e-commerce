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
  }),
});

export const { useStripePaymentMutation } = paymentApi;
