import { createSlice } from "@reduxjs/toolkit";

const addSlice = createSlice({
  name: "addAction",
  initialState: {
    dataAdd: null,
    isFetching: false,
    errorAdd: false,
  },
  reducers: {
    addActionStart: (state) => {
      state.isFetching = true;
    },
    addActionSuccess: (state, action) => {
      state.isFetching = false;
      state.dataAdd = action.payload;
      state.errorAdd = false;
    },
    addActionFailed: (state, action) => {
      state.isFetching = false;
      state.errorAdd = true;
      state.dataAdd = action.payload;
    },
  },
});

export const { addActionStart, addActionSuccess, addActionFailed } =
  addSlice.actions;

export default addSlice.reducer;
