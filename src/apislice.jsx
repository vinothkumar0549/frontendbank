import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/ServletApp/jersey/annotation",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    withdraw: builder.mutation({
      query: (withdrawData) => ({
        url: "/withdraw",
        method: "POST",
        body: withdrawData,
      }),
    }),
    deposit: builder.mutation({
      query: (depositData) => ({
        url: "/deposit",
        method: "POST",
        body: depositData,
      })
    }),
    moneytransfer: builder.mutation({
      query: (moneytransferData) => ({
        url: "/moneytransfer",
        method: "POST",
        body: moneytransferData,
      })
    }),
    getactivity: builder.mutation({
      query: (getactivityData) => ({
        url: "/getactivity",
        method: "POST",
        body: getactivityData,
      }),
       transformResponse: (response) => response.Activity || [] // Ensure array
    })
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useWithdrawMutation, 
  useDepositMutation, 
  useMoneytransferMutation, 
  useGetactivityMutation
 } = apiSlice;
