import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/env";

export const provinceApi = createApi({
  reducerPath: "provinceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL.DATA_MODEL_API,
    // You can add prepareHeaders here if you have authentication
    prepareHeaders: (headers, { getState }) => {
      const token = getState().global.token; // Example: Get token from Redux state
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Province"],
  endpoints: (builder) => ({
    // --- Queries ---
    getAllProvinces: builder.query({
      query: () => "/provinces",
      providesTags: ["Province"]
    }),
    getProvinceById: builder.query({
      query: (id) => `/provinces/${id}`,
      providesTags: (result, error, id) => [{ type: 'Province', id }],
    }),

    // --- Mutations ---
    createProvince: builder.mutation({
      query: (body) => ({
        url: "/provinces",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Province"],
    }),
    updateProvince: builder.mutation({
      query: ({ id, body }) => ({
        url: `/provinces/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Province', id: arg.id }],
    }),
    deleteProvince: builder.mutation({
      query: (id) => ({
        url: `/provinces/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Province"],
    }),
  }),
});

export const {
  useGetAllProvincesQuery,
  useGetProvinceByIdQuery,
  useCreateProvinceMutation,
  useUpdateProvinceMutation,
  useDeleteProvinceMutation,
} = provinceApi;