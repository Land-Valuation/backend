import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL, // Cấu hình từ env
    // prepareHeaders: (headers) => {
    //   const cb = () => {
    //     if (UserService.isLoggedIn()) {
    //       const token = UserService.getToken() || localStorage.getItem("token");
    //       if (token) {
    //         headers.set("Authorization", `Bearer ${token}`);
    //       }
    //     }
    //     return headers;
    //   };
    //   return UserService.updateToken(cb);
    // },
  }),
  tagTypes: ["Task", "Draft"], // Định nghĩa tag
  endpoints: (builder) => ({
    // API tạo Task
    createTask: builder.mutation({
      query: (taskData) => ({
        url: "/tasks",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["Task"],
    }),

    // API lưu hoặc cập nhật Draft
    saveDraft: builder.mutation({
      query: ({ userId, taskId, step, draftData }) => ({
        url: `/drafts/save?userId=${userId}&taskId=${taskId}&step=${step}`,
        method: "POST",
        body: draftData,
      }),
      invalidatesTags: ["Draft"],
    }),

    // API lấy draft theo userId & taskId
    getDraftByStep: builder.query({
      query: ({ userId, taskId, step }) =>
        `/drafts/${taskId}/user/${userId}`,
      providesTags: ["Draft"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useSaveDraftMutation,
  useGetDraftByStepQuery,
} = taskApi;
