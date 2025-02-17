import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/env";

const COMMITTEE_STATUS_TYPE_URL = "/committee-status-types";

export const committeeStatusTypeApi = createApi({
  reducerPath: "committeeStatusTypeApi",
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
  tagTypes: ["CommitteeStatusType"],
  endpoints: (builder) => ({
    // --- Queries ---
    getAllCommitteeStatusTypes: builder.query({
      query: () => COMMITTEE_STATUS_TYPE_URL,
      providesTags: ["CommitteeStatusType"],
    }),
    getCommitteeStatusTypeById: builder.query({
      query: (code) => `${COMMITTEE_STATUS_TYPE_URL}/${code}`,
      providesTags: (result, error, code) => [{ type: "CommitteeStatusType", id: code }],
    }),

    // --- Mutations ---
    createCommitteeStatusType: builder.mutation({
      query: (body) => ({
        url: COMMITTEE_STATUS_TYPE_URL,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["CommitteeStatusType"],
    }),
    updateCommitteeStatusType: builder.mutation({
      query: ({ code, body }) => ({
        url: `${COMMITTEE_STATUS_TYPE_URL}/${code}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CommitteeStatusType", id: arg.code },
      ],
    }),
    deleteCommitteeStatusType: builder.mutation({
      query: (code) => ({
        url: `${COMMITTEE_STATUS_TYPE_URL}/${code}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CommitteeStatusType"],
    }),
  }),
});

export const {
  useGetAllCommitteeStatusTypesQuery,
  useGetCommitteeStatusTypeByIdQuery,
  useCreateCommitteeStatusTypeMutation,
  useUpdateCommitteeStatusTypeMutation,
  useDeleteCommitteeStatusTypeMutation,
} = committeeStatusTypeApi;