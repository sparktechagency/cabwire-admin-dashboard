import { baseApi } from "../../apiBaseQuery";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDriverManagement: builder.query({
      query: ({ page, searchTerm }) => `/user/all-drivers?page=${page}&searchTerm=${searchTerm}`,
      providesTags: [],
    }),

    updateDriverStatus: builder.mutation({
      query: (data) => ({
        url: `/user/block-driver/${data.id}`, // Updated endpoint
        method: "PATCH",
        body: data,  /* {
    "status": "active"
} */
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useGetDriverManagementQuery, useUpdateDriverStatusMutation } =
  userApi;
