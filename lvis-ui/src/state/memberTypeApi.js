import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/env";

const MEMBER_TYPE_URL = "/member-types";

export const memberTypeApi = createApi({
  reducerPath: "memberTypeApi",
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
  tagTypes: ["MemberType"],
  endpoints: (builder) => ({
    // --- Queries ---
    getAllMemberTypes: builder.query({
      query: () => MEMBER_TYPE_URL,
      providesTags: ["MemberType"],
    }),
    getMemberTypeByCode: builder.query({
      query: (code) => `${MEMBER_TYPE_URL}/${code}`,
      providesTags: (result, error, code) => [{ type: "MemberType", id: code }],
    }),

    // --- Mutations ---
    createMemberType: builder.mutation({
      query: (body) => ({
        url: MEMBER_TYPE_URL,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["MemberType"],
    }),
    updateMemberType: builder.mutation({
      query: ({ code, body }) => ({
        url: `${MEMBER_TYPE_URL}/${code}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "MemberType", id: arg.code },
      ],
    }),
    deleteMemberType: builder.mutation({
      query: (code) => ({
        url: `${MEMBER_TYPE_URL}/${code}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MemberType"],
    }),
  }),
});

export const {
  useGetAllMemberTypesQuery,
  useGetMemberTypeByCodeQuery,
  useCreateMemberTypeMutation,
  useUpdateMemberTypeMutation,
  useDeleteMemberTypeMutation,
} = memberTypeApi;