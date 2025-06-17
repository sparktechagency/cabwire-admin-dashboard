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




  }),
});

export const {
  usePrivacyPolicyMutation,
  useTermsAndConditionsMutation
} = userApi;
