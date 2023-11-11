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

    getAllUsers: build.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    getAllAdmins: build.query({
      query: () => ({
        url: `/users/admin-user`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
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

    updateSingletUser: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/update/${id}`,
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
  useGetAllAdminsQuery,
  useGetAllUsersQuery,
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useUpdateSingletUserMutation,
} = userApi;
