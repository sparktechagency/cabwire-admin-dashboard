import { baseApi } from "../../apiBaseQuery";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "/category",
      providesTags: ["category"],
    }),

    getParticularCategory: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    editCategory: builder.mutation({
      query: ({ data, id }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    updateCategoryStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

  }),
});

export const {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useUpdateCategoryStatusMutation,
  useGetParticularCategoryQuery
} = categoryApi;
