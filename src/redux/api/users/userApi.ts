import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userSignUp: build.mutation({
      query: (data) => ({
        url: `/users/signup`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    loginUser: build.mutation({
      query: (data) => ({
        url: `/users/login`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getCurrentUser: build.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateCurrentUser: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUserSignUpMutation,
  useLoginUserMutation,
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
} = userApi;
