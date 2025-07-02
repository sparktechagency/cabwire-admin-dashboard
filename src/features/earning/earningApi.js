import { baseApi } from '../../apiBaseQuery';


export const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarning: builder.query({
      query: () => `/payment`,
      providesTags: [],
    }),
  }),
});

export const { useGetEarningQuery } = earningApi;
