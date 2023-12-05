import { apiSlice } from "./apiSlice";

const USERS_URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
