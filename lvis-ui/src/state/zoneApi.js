import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const zoneApi = createApi({
  reducerPath: "zoneApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DATA_MODEL_API_BASE_URL,
  }),
  tagTypes: ["Zone"],
  endpoints: (builder) => ({
    getZone: builder.query({
      query: ({page, rpp}) => `/parcels/zone?page=${page}&rpp=${rpp}`,
      providesTags: ["Zone"],
    }),
  }),
});

export const { useGetZoneQuery } = zoneApi;
