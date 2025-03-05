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
      console.log("Updating Redux draft:", { step, draftData, formattedData });

      if (!state.data[step]) {
        state.data[step] = {};
      }
    
      Object.assign(state.data[step], draftData);
    
      if (formattedData) {
        state.formattedData[step] = [...formattedData];
      }
    },
    
    updateDraftSelection: (state, action) => {
      const { step, selectedZoneIds } = action.payload;
      if (!state.data[step]) {
        state.data[step] = {};
      }
      state.data[step].selectedZoneIds = selectedZoneIds;
    },
  },
});

export const { initializeDraft, updateDraft, updateDraftSelection } = draftSlice.actions;
export default draftSlice.reducer;
