import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlog: build.mutation({
      query: (data) => ({
        url: `/blogs/create-blog`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    updateBlog: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    deleteBlog: build.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    getAllBlogs: build.query({
      query: () => ({
        url: `/blogs`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
  useUpdateBlogMutation,
} = blogApi;
