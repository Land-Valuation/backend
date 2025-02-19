import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/env";

const VALUATION_STATUS_TYPE_URL = "/valuation-status-types";

export const valuationStatusTypeApi = createApi({
  reducerPath: "valuationStatusTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL.DATA_MODEL_API,
    // You can add prepareHeaders here if you have authentication
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token; // Example: Get token from Redux state
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["ValuationStatusType"],
  endpoints: (builder) => ({
    // --- Queries ---
    getAllValuationStatusTypes: builder.query({
      query: () => VALUATION_STATUS_TYPE_URL,
      providesTags: ["ValuationStatusType"],
    }),
    getValuationStatusTypeById: builder.query({
      query: (code) => `${VALUATION_STATUS_TYPE_URL}/${code}`,
      providesTags: (result, error, code) => [{ type: "ValuationStatusType", id: code }],
    }),

    // --- Mutations ---
    createValuationStatusType: builder.mutation({
      query: (body) => ({
        url: VALUATION_STATUS_TYPE_URL,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["ValuationStatusType"],
    }),
    updateValuationStatusType: builder.mutation({
      query: ({ code, body }) => ({
        url: `${VALUATION_STATUS_TYPE_URL}/${code}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ValuationStatusType", id: arg.code },
      ],
    }),
    deleteValuationStatusType: builder.mutation({
      query: (code) => ({
        url: `${VALUATION_STATUS_TYPE_URL}/${code}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ValuationStatusType"],
    }),
  }),
});

export const {
  useGetAllValuationStatusTypesQuery,
  useGetValuationStatusTypeByIdQuery,
  useCreateValuationStatusTypeMutation,
  useUpdateValuationStatusTypeMutation,
  useDeleteValuationStatusTypeMutation,
} = valuationStatusTypeApi;