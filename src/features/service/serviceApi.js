import { baseApi } from "../../apiBaseQuery";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (data) => ({
        url: `/service/create-service`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Services'],
    }),

    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['Services'],
    }),

    updateServiceStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/service/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ['Services'],
    }),

    getParticularService: builder.query({
      query: (id) => ({
        url: `/service/${id}`,
        method: "GET",
      }),
      providesTags: ['Service'],
    }),

    getAllServices: builder.query({
      query: () => ({
        url: `/service`,
        method: "GET",
      }),
      providesTags: ['Services'],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Services'],
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