import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/env";

const VALUATION_MASTERS_URL = "/valuation-masters";

export const valuationMasterApi = createApi({
  reducerPath: "valuationMasterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL.DATA_MODEL_API,
  }),
  tagTypes: ["ValuationMaster"],
  endpoints: (builder) => ({
    // --- Queries ---
    getAllValuationMasters: builder.query({
      query: () => VALUATION_MASTERS_URL,
      providesTags: ["ValuationMaster"],
    }),
    getValuationMasterById: builder.query({
      query: (id) => `${VALUATION_MASTERS_URL}/${id}`,
      providesTags: (result, error, id) => [{ type: "ValuationMaster", id }],
    }),

    // --- Mutations ---
    createValuationMaster: builder.mutation({
      query: (body) => ({
        url: VALUATION_MASTERS_URL,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["ValuationMaster"],
    }),
    updateValuationMaster: builder.mutation({
      query: ({ id, body }) => ({
        url: `${VALUATION_MASTERS_URL}/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ValuationMaster", id: arg.id },
      ],
    }),
    deleteValuationMaster: builder.mutation({
      query: (id) => ({
        url: `${VALUATION_MASTERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ValuationMaster"],
    }),
  }),
});

export const {
  useGetAllValuationMastersQuery,
  useGetValuationMasterByIdQuery,
  useCreateValuationMasterMutation,
  useUpdateValuationMasterMutation,
  useDeleteValuationMasterMutation,
} = valuationMasterApi;