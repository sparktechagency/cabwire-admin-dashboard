import { baseApi } from "../../apiBaseQuery";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDriver: builder.query({
      query: (page) => `/user/all-drivers?page=${page}`,
      providesTags: [],
    }),

    totalDriverCount: builder.query({
      query: () => "/user/all-driver-count",
      providesTags: [],
    }),

    getAllRecentDriver: builder.query({
      query: () => "/user/total-resent-driver",
      providesTags: [],
    }),

    driverBlock: builder.mutation({
      query: ({id , data}) => ({
        url: `/user/block-driver/${id}`,
        method: "PATCH",
        body:data
      }),
    }),



  }),
});

export const {
  useGetAllDriverQuery,
  useTotalDriverCountQuery,
  useGetAllRecentDriverQuery,
  useDriverBlockMutation
} = driverApi;
