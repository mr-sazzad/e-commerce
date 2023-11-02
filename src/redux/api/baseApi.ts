import axiosBaseQuery from "@/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query";

export const getBaseUrl = (): string => {
  return "https://car-server-r2xmo7vpf-mr-sazzad.vercel.app/api/v1";
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: (builder) => ({}),
  //  result cashing
  tagTypes: [], //TODO tag type lists
});
