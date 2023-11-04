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
  }),
});

export const { useUserSignUpMutation, useLoginUserMutation } = userApi;
