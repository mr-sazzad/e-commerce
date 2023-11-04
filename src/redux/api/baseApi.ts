import axiosBaseQuery from "@/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypeLists } from "./tagTypes";

export const getBaseUrl = (): string => {
  // return "https://car-backend-bid9l3cvb-mr-sazzad.vercel.app/api/v1";
  return "http://localhost:3007/api/v1";
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: (builder) => ({}),
  //  result cashing
  tagTypes: tagTypeLists,
});
