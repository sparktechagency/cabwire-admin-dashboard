import { baseApi } from "../../apiBaseQuery";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createService : builder.mutation({
      query: (data) => ({
        url: `/service/create-service`,
        method: "POST",
        body: data
      }),
    }),

    updateService : builder.mutation({
      query: (data , id) => ({
        url: `/service/${id}`,
        method: "PATCH",
        body: data
      }),
    }),

     getParticularService : builder.query({
      query: (id) => ({
        url: `/service/${id}`,
        method: "GET",
      }),
    }),

   getAllService : builder.query({
      query: () => ({
        url: `/service`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useGetParticularServiceQuery,
  useGetAllServiceQuery
} = userApi;
