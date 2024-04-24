import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access: null,
    refresh: null,
    isFetching: false,
    error: false,
    isLoggedIn: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.access = action.payload?.access;
      state.refresh = action.payload?.refresh;
      state.error = false;
      state.isLoggedIn = true;
    },
    loginFailed: (state) => {
      state.isFetching = false;
      state.error = true;
      state.isLoggedIn = false;
      state.access = null;
      state.refresh = null;
    },

    logOutSuccess: (state) => {
      state.isFetching = false;
      state.access = null;
      state.error = false;
      state.isLoggedIn = false;
      state.refresh = null;
    },
    logOutFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOutStart: (state) => {
      state.isFetching = true;
    },
  },
});

export const {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
