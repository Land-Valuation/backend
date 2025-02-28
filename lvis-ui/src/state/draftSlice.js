import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    initializeDraft: (state) => {
      const steps = [1, 2, 3, 4, 5, 6, 7]; // ✅ Ensure all steps are initialized
      state.data = {
        ...state.data,
        ...steps.reduce((acc, step) => {
          acc[step] = state.data[step] || {}; // Keep existing or initialize
          return acc;
        }, {}),
      };
    },
    updateDraft: (state, action) => {
      const { step, draftData } = action.payload;
      state.data = {
        ...state.data,
        [step]: { ...state.data[step], ...draftData },
      };
    },
  },
});

export const { initializeDraft, updateDraft } = draftSlice.actions;
export default draftSlice.reducer;
