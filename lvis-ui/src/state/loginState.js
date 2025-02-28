import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isSaveInformation: false
};

export const loginSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSaveInformation: (state, action) => {
      state.isSaveInformation = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    getUser: (state) => {
      return state.user;
    },
    getSaveInformation: (state) => {
      return state.isSaveInformation;
    }
  },
});

export const { setSaveInformation, setUser, getUser, getSaveInformation } = loginSlice.actions;

export default loginSlice.reducer;