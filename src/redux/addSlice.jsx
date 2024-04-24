import { createSlice } from "@reduxjs/toolkit";

const addSlice = createSlice({
  name: "addAction",
  initialState: {
    data: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    addActionStart: (state) => {
      state.isFetching = true;
    },
    addActionSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.error = false;
    },
    addActionFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { addActionStart, addActionSuccess, addActionFailed } =
  addSlice.actions;

export default addSlice.reducer;
