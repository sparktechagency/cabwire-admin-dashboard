import { baseApi } from "../../apiBaseQuery";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "/category",
      providesTags: [],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),

    editCategory: builder.mutation({
      query: (data) => ({
        url: `/category/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [],
    }),

  }),
});

export const {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation
} = categoryApi;
