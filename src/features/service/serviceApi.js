import { baseApi } from "../../apiBaseQuery";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (data) => ({
        url: `/service/create-service`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['service'],
    }),

    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['service'],
    }),

    updateServiceStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/service/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ['service'],
    }),

    getParticularService: builder.query({
      query: (id) => ({
        url: `/service/${id}`,
        method: "GET",
      }),
      providesTags: ['service'],
    }),

    getAllServices: builder.query({
      query: () => ({
        url: `/service`,
        method: "GET",
      }),
      providesTags: ['service'],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['service'],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useUpdateServiceStatusMutation,
  useGetParticularServiceQuery,
  useGetAllServicesQuery,
  useDeleteServiceMutation,
} = serviceApi;