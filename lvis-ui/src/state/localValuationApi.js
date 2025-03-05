// src/api/localValuationApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/env";

const LOCAL_VALUATIONS_URL = "/local-valuations";

export const localValuationApi = createApi({
  reducerPath: "localValuationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL.DATA_MODEL_API,
  }),
  tagTypes: ["LocalValuation"],
  endpoints: (builder) => ({
    // --- Queries ---
    getAllLocalValuations: builder.query({
      query: () => LOCAL_VALUATIONS_URL,
      providesTags: ["LocalValuation"],
    }),
    getLocalValuationById: builder.query({
      query: (id) => `${LOCAL_VALUATIONS_URL}/${id}`,
      providesTags: (result, error, id) => [{ type: "LocalValuation", id }],
    }),

    // --- Mutations ---
    createLocalValuation: builder.mutation({
      query: (body) => ({
        url: LOCAL_VALUATIONS_URL,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["LocalValuation"],
    }),
    updateLocalValuation: builder.mutation({
      query: ({ id, body }) => ({
        url: `${LOCAL_VALUATIONS_URL}/${id}`,
        method: "PUT", // Changed to PUT
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "LocalValuation", id: arg.id },
      ],
    }),
    deleteLocalValuation: builder.mutation({
      query: (id) => ({
        url: `${LOCAL_VALUATIONS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LocalValuation"],
    }),
  }),
});

export const {
  useGetAllLocalValuationsQuery,
  useGetLocalValuationByIdQuery,
  useCreateLocalValuationMutation,
  useUpdateLocalValuationMutation,
  useDeleteLocalValuationMutation,
} = localValuationApi;