import { createSlice } from "@reduxjs/toolkit";
import { getKeycloak } from './UserService';

const initialState = {
  mode: "light",
  isAuthenticated: false,
  user: null,
  token: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { setMode, setAuthState, logout } = globalSlice.actions;
export const initializeAuth = () => (dispatch) => {
  const keycloak = getKeycloak();
  if (keycloak.authenticated) {
    dispatch(
      setAuthState({
        isAuthenticated: true,
        token: keycloak.token,
        user: keycloak.tokenParsed,
      })
    );
  }
};

export const initialLoginAuth = () => ({ token, payload, dispatch}) => {
    dispatch(
        setAuthState({
            isAuthenticated: true,
            token: token,
            user: payload,
        })
    );
};

export const selectAuth = (state) => state.global;
export const selectIsAuthenticated = (state) => state.global.isAuthenticated;
export const selectUser = (state) => state.global.user;
export const selectToken = (state) => state.global.token;

export default globalSlice.reducer;
