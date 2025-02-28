import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/env";  // Adjust the path if needed

const DOCUMENTS_URL = "/documents";

export const documentApi = createApi({
  reducerPath: "documentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL.DATA_MODEL_API, // Ensure DATA_MODEL_API is correctly defined in your env.js
  }),
  tagTypes: ["Document"],
  endpoints: (builder) => ({
    // --- Mutations ---
    uploadDocument: builder.mutation({
      query: (formData) => ({  // Expecting a FormData object here
        url: DOCUMENTS_URL,
        method: "POST",
        body: formData,
        // Important:  Set Content-Type to 'multipart/form-data; boundary=${formData._boundary}' for FormData.
        //  However, fetchBaseQuery usually handles this automatically when the body is a FormData object.  Double-check if needed.
      }),
      invalidatesTags: ["Document"], // Optionally invalidate a tag if you have a query that needs refreshing
    }),

    downloadDocument: builder.query({
      query: (id, name) => ({
        url: `${DOCUMENTS_URL}/${id}`,
        method: "GET",
        responseHandler: async (response) => {
          const blob = await response.blob();
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
      }),
      // no providesTags needed as this is a download, not typically cached in the same way
    }),

    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `${DOCUMENTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Document"], //  Optionally invalidate a tag if you have a query that needs refreshing
    }),
  }),
});

export const {
  useUploadDocumentMutation,
  useDownloadDocumentQuery,
  useDeleteDocumentMutation,
} = documentApi;