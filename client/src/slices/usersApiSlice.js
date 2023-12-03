import { apiSlice } from "./apiSlice";

const USERS_URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userList: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useUserListQuery } = usersApiSlice;
