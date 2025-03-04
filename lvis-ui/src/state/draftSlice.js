import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  formattedData: {},
};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    initializeDraft: (state) => {
      const steps = [0, 1, 2, 3, 4, 5, 6];
      state.data = {
        ...state.data,
        ...steps.reduce((acc, step) => {
          acc[step] = state.data[step] || {};
          return acc;
        }, {}),
      };
      state.formattedData = {
        ...state.formattedData,
        ...steps.reduce((acc, step) => {
          acc[step] = state.formattedData[step] || {};
          return acc;
        }, {})
      };
    },
    updateDraft: (state, action) => {
      const { step, draftData, formattedData } = action.payload;
      state.data = {
        ...state.data,
        [step]: { ...state.data[step], ...draftData },
      };
      if (formattedData) {
        state.formattedData = {
          ...state.formattedData,
          [step]: formattedData,
        };
      }
    },
  },
});

export const { initializeDraft, updateDraft } = draftSlice.actions;
export default draftSlice.reducer;
