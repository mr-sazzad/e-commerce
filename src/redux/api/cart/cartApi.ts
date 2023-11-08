import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addToCart: build.mutation({
      query: (data) => ({
        url: "/cart/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.cart],
    }),

    getAllFromCart: build.query({
      query: (id) => ({
        url: "/cart",
        method: "GET",
        id,
      }),
      providesTags: [tagTypes.cart],
    }),

    getSingleFromCart: build.query({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.cart],
    }),

    updateSingleFromCart: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/cart/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.cart],
    }),

    deleteSingleFromCart: build.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.cart],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetAllFromCartQuery,
  useGetSingleFromCartQuery,
  useUpdateSingleFromCartMutation,
  useDeleteSingleFromCartMutation,
} = cartApi;
