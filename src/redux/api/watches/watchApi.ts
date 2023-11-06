import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const watchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    UploadWatch: build.mutation({
      query: (data) => ({
        url: "/watches/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.watches],
    }),
    getAllWatches: build.query({
      query: () => ({
        url: "/watches",
        method: "GET",
      }),
      providesTags: [tagTypes.watches],
    }),
    getSingleWatch: build.query({
      query: (id) => ({
        url: `/watches/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.watches],
    }),
    updateSingleWatch: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/watches/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.watches],
    }),
    deleteSingleWatch: build.mutation({
      query: (id) => ({
        url: `/watches/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.watches],
    }),
  }),
});

export const {
  useUploadWatchMutation,
  useGetAllWatchesQuery,
  useGetSingleWatchQuery,
  useUpdateSingleWatchMutation,
  useDeleteSingleWatchMutation,
} = watchApi;
