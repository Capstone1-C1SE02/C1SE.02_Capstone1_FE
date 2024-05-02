import { createSlice } from "@reduxjs/toolkit";

const deleteSlice = createSlice({
  name: "deleteAction",
  initialState: {
    data: null,
    isFetching: false,
    error: false,
    mode: false,
  },
  reducers: {
    deleteActionStart: (state) => {
      state.isFetching = true;
      state.mode = false;
    },
    deleteActionSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      // state.mode = true;
      state.error = false;
    },
    deleteActionFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { deleteActionStart, deleteActionSuccess, deleteActionFailed } =
  deleteSlice.actions;

export default deleteSlice.reducer;
