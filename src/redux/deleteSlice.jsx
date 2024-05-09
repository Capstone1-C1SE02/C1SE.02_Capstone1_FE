import { createSlice } from "@reduxjs/toolkit";

const deleteSlice = createSlice({
  name: "deleteAction",
  initialState: {
    dataDelete: null,
    isFetching: false,
    errorDelete: false,
    mode: false,
  },
  reducers: {
    deleteActionStart: (state) => {
      state.isFetching = true;
      state.mode = false;
    },
    deleteActionSuccess: (state, action) => {
      state.isFetching = false;
      state.dataDelete = action.payload;
      // state.mode = true;
      state.errorDelete = false;
    },
    deleteActionFailed: (state, action) => {
      state.isFetching = false;
      state.errorDelete = true;
      // state.dataDelete = action.payload;
    },
  },
});

export const { deleteActionStart, deleteActionSuccess, deleteActionFailed } =
  deleteSlice.actions;

export default deleteSlice.reducer;
