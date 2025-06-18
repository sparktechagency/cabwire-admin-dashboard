import { baseApi } from "../../apiBaseQuery";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    totalRevinue: builder.query({
      query: () => "/payment/total-revinue",
      providesTags: [],
    }),

    totalEarning: builder.query({
      query: () => "/payment/total-erning",
      providesTags: [],
    }),

    totalUserCount: builder.query({
      query: () => "/user/total-users-count",
      providesTags: [],
    }),

    totalDriverCount: builder.query({
      query: () => "/user/all-driver-count",
      providesTags: [],
    }),

    

  }),
});

export const {
  useTotalRevinueQuery,
  useTotalEarningQuery,
  useTotalUserCountQuery,
  useTotalDriverCountQuery,
} = dashboardApi;
