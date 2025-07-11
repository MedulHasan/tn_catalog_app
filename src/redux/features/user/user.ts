import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = userApi;
