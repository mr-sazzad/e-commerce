import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addToWishlist: build.mutation({
      query: (data) => ({
        url: `/wishlists/add`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.wishlist],
    }),

    getAllWishlists: build.query({
      query: (userId) => ({
        url: `/wishlists/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.wishlist],
    }),

    removeSingleWishlist: build.mutation({
      query: (wishlistId) => ({
        url: `/wishlists/delete/${wishlistId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.wishlist],
    }),

    removeAllWishlists: build.mutation({
      query: (userId) => ({
        url: `/wishlists/delete/all/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.wishlist],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetAllWishlistsQuery,
  useRemoveSingleWishlistMutation,
  useRemoveAllWishlistsMutation,
} = wishlistApi;
