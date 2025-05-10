import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",
    prepareHeaders: (headers,api)=>{
      console.log(`api --> ${JSON.stringify(api)}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => {
        console.log(`builder --> ${JSON.stringify(builder)}`);
      },
    }),
  }),
});
export const { useGetUserQuery } = apiSlice;
