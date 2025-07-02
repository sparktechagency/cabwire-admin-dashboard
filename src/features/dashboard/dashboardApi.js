import { baseApi } from "../../apiBaseQuery";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allRevinueAnalysis: builder.query({
      query: () => "/payment/total-revinue",
      providesTags: [""],
    }),

    allUserCount : builder.query({
      query: () => "/user/total-users-count",
      providesTags: [""],
    }),

    allDriverCount : builder.query({
      query: () => "/user/all-driver-count",
      providesTags: [""],
    }),

    totalEarning : builder.query({
      query: () => "/payment/total-erning",
      providesTags: [""],
    }),

    totalResentDriver : builder.query({
      query: () => "/user/total-resent-driver",
      providesTags: [""],
    }),

  totalResentUser : builder.query({
      query: () => "/user/total-resent-users",
      providesTags: [""],
    }),
      
  
  }),
});

export const {
  useAllRevinueAnalysisQuery,
  useAllUserCountQuery,
  useAllDriverCountQuery,
  useTotalEarningQuery,
  useTotalResentDriverQuery,
  useTotalResentUserQuery
} = dashboardApi;
