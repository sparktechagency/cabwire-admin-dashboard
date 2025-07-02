import { baseApi } from "../../apiBaseQuery";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    privacyPolicy: builder.mutation({
      query: (data) => ({
        url: `/rule/privacy-policy`,
        method: "POST",
        body: data
      }),
    }),

    termsAndConditions: builder.mutation({
      query: (data) => ({
        url: `/rule/terms-and-conditions`,
        method: "POST",
        body: data
      }),
    }),

    getPrivacy: builder.query({
      query: () => `/rule/privacy-policy`,
      providesTags: [],
    }),

    getTerms: builder.query({
      query: () => `/rule/terms-and-conditions`,
      providesTags: [],
    }),


    

  }),
});

export const {
  usePrivacyPolicyMutation,
  useTermsAndConditionsMutation,
  useGetPrivacyQuery,
  useGetTermsQuery
} = userApi;
