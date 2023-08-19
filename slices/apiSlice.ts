import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type User = any;

const baseQuery = fetchBaseQuery({ baseUrl: '/api/' });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getCurrentUser: builder.query<User, void>({
            query: () => 'current',
        }),
        registerUser: builder.mutation<{ user: User }, { email: string; name: string; password: string }>({
            query: (newUserData) => ({
                url: 'register',
                method: 'POST',
                body: newUserData
            })
        }),


    }),
});

export const { useGetCurrentUserQuery,useRegisterUserMutation } = apiSlice;
