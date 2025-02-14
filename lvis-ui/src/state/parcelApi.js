import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/env";

export const parcelApi = createApi({
  reducerPath: "parcelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL.DATA_MODEL_API,
    // Optional: Add authentication headers here if needed
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token;
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
  }),
  tagTypes: ["Parcel"], // Define a tag type for Parcels
  endpoints: (builder) => ({
    // --- Queries ---

    // Infinite Scrolling: getParcelsByZoneId
    getParcelsByZoneId: builder.query({
      query: ({ zoneId, page, size }) => `/parcels/by-zone?zoneId=${zoneId}&page=${page}&size=${size}`,
      providesTags: (result) => {
        // Tag each item in the list for re-fetching on updates
        return result?.data?.items
          ? [
              ...result.data.items.map(({ id }) => ({ type: 'Parcel', id })),
              'Parcel', // Tag the entire list
            ]
          : ['Parcel'];
      },
      transformResponse: (response) => {
        return {
          data: response.data.items,
          totalElements: response.data.records,
        };
      },
      // Optional: Keep previous data while fetching the next page
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.zoneId}` // Unique key per zoneId
      },
      merge: (existing, incoming) => {
        existing.data.push(...incoming.data)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    // Infinite Scrolling: getParcelDTOsByZoneId
    getParcelDTOsByZoneId: builder.query({
      query: ({ zoneId, page, size }) => `/parcels/dto/by-zone?zoneId=${zoneId}&page=${page}&rpp=${size}`,
      providesTags: (result) => {
        // Tag each item in the list for re-fetching on updates
        return result?.data?.items
          ? [
              ...result.data.items.map(({ id }) => ({ type: 'Parcel', id })),
              'Parcel', // Tag the entire list
            ]
          : ['Parcel'];
      },
      transformResponse: (response) => {
        return {
          data: response?.data?.items ?? [],
          totalElements: response?.data?.records ?? 0,
        };
      },
      // Optional: Keep previous data while fetching the next page
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.zoneId}` // Unique key per zoneId
      },
      merge: (existing, incoming) => {
        existing.data.push(...incoming.data)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    // Infinite Scrolling: getParcels
    getParcels: builder.query({
      query: ({ id, page, size }) => `/parcels?id=${id}&page=${page}&size=${size}`,
      providesTags: (result) => {
        // Tag each item in the list for re-fetching on updates
        return result?.data?.items
          ? [
              ...result.data.items.map(({ id }) => ({ type: 'Parcel', id })),
              'Parcel', // Tag the entire list
            ]
          : ['Parcel'];
      },
      transformResponse: (response) => {
        return {
          data: response.data.items,
          totalElements: response.data.records,
        };
      },
      // Optional: Keep previous data while fetching the next page
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.id}` // Unique key per zoneId
      },
      merge: (existing, incoming) => {
        existing.data.push(...incoming.data)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
  }),
});

export const {
  useGetParcelsByZoneIdQuery,
  useGetParcelDTOsByZoneIdQuery,
  useGetParcelsQuery,
} = parcelApi;