import { baseApi } from "../../apiBaseQuery";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allCountAnalysis: builder.query({
      query: () => "/admin/dashboard/",
      providesTags: [],
    }),

    
  }),
});

export const {
  useAllCountAnalysisQuery,

} = dashboardApi;
