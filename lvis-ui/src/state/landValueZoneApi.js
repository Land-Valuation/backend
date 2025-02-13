import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/env";

export const landValueZoneApi = createApi({
  reducerPath: "landValueZoneApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL.DATA_MODEL_API,
    // Optional: Add authentication headers here if needed
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token;
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["LandValueZone"], // Define a tag type for Land Value Zones
  endpoints: (builder) => ({
    // --- Queries ---

    //  Infinite Scrolling: listLandValueZones
    getListLandValueZones: builder.query({
      query: ({ page, size }) => `/land-value-zones/list?page=${page}&size=${size}`,
      providesTags: (result) => {
        // Tag each item in the list for re-fetching on updates
        return result?.data?.items
          ? [
              ...result.data.items.map(({ id }) => ({ type: 'LandValueZone', id })),
              'LandValueZone', // Tag the entire list
            ]
          : ['LandValueZone'];
      },
      // Optional:  Transform the response to extract data and pagination info
      transformResponse: (response) => {
        // Assuming your API returns a structure like:
        // { data: { content: [], totalElements: number, ... } }
        return {
          data: response.data.items,
          totalElements: response.data.records,
        };
      },
      // Optional: Keep previous data while fetching the next page
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (existing, incoming) => {
        existing.data.push(...incoming.data)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),

    getLandValueZoneById: builder.query({
      query: (id) => `/land-value-zones/${id}`,
      providesTags: (result, error, id) => [{ type: 'LandValueZone', id }],
    }),
  }),
});

export const {
  useGetListLandValueZonesQuery,
  useGetLandValueZoneByIdQuery,
} = landValueZoneApi;