import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
  name: "editAction",
  initialState: {
    data: null,
    isFetching: false,
    error: false,
    mode: false,
  },
  reducers: {
    editActionStart: (state) => {
      state.isFetching = true;
    },
    editActionSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.mode = true;
      state.error = false;
    },
    editActionFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { editActionStart, editActionSuccess, editActionFailed } =
  editSlice.actions;

export default editSlice.reducer;
