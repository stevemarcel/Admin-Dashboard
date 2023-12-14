import { apiSlice } from "./apiSlice";

const USERS_URL = "https://mocki.io/v1/d3827c9a-c3f8-4030-8d0c-c153c390beae";

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
