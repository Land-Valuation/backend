import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_DATA_MODEL_API_BASE_URL;

export const localSurveyInformationApi = createApi({
  reducerPath: "localSurveyInformationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // You can add prepareHeaders here if you have authentication
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token; // Example: Get token from Redux state
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["LocalSurveyInformation", "AllListData"], // Define tag types
  endpoints: (builder) => ({
    // --- Queries ---
    getAllLocalSurveyInformation: builder.query({
      query: () => "/local-survey-information",
      providesTags: ["LocalSurveyInformation"], // Provide a tag
    }),
    getLocalSurveyInformationById: builder.query({
      query: (id) => `/local-survey-information/${id}`,
      providesTags: (result, error, id) => [{ type: 'LocalSurveyInformation', id }], // Dynamic tag for specific ID
    }),
    getAllListData: builder.query({
      query: () => "/local-survey-information/get-all-list-data",
      providesTags: ["AllListData"],
    }),

    // --- Mutations ---
    createLocalSurveyInformation: builder.mutation({
      query: (body) => ({
        url: "/local-survey-information",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["LocalSurveyInformation", "AllListData"], // Invalidate the tag
    }),
    updateLocalSurveyInformation: builder.mutation({
      query: ({ id, body }) => ({
        url: `/local-survey-information/${id}`,
        method: "PATCH", // Or PUT, depending on your API
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'LocalSurveyInformation', id: arg.id }],
    }),
    deleteLocalSurveyInformation: builder.mutation({
      query: (id) => ({
        url: `/local-survey-information/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LocalSurveyInformation"],
    }),
  }),
});

export const {
  useGetAllLocalSurveyInformationQuery,
  useGetLocalSurveyInformationByIdQuery,
  useGetAllListDataQuery,
  useCreateLocalSurveyInformationMutation,
  useUpdateLocalSurveyInformationMutation,
  useDeleteLocalSurveyInformationMutation,
} = localSurveyInformationApi;