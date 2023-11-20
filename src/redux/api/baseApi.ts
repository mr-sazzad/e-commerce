import axiosBaseQuery from "@/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypeLists } from "./tagTypes";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://watch-server-two.vercel.app/api/v1",
  }),
  endpoints: (builder) => ({}),
  //  result cashing
  tagTypes: tagTypeLists,
});
