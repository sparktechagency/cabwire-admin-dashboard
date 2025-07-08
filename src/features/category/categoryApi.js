import { baseApi } from "../../apiBaseQuery";
import { useGetParticularServiceQuery } from '../service/serviceApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "/category",
      providesTags: [],
    }),

    getParticularCategory: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: [''],
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
      query: ({ data, id }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [],
    }),

    updateCategoryStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/category/${id}`,
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
  useEditCategoryMutation,
  useUpdateCategoryStatusMutation, 
  useGetParticularCategoryQuery
} = categoryApi;
