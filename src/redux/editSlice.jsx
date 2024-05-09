import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
  name: "editAction",
  initialState: {
    dataEdit: null,
    isFetching: false,
    errorEdit: false,
    mode: false,
  },
  reducers: {
    editActionStart: (state) => {
      state.isFetching = true;
    },
    editActionSuccess: (state, action) => {
      state.isFetching = false;
      state.dataEdit = action.payload;
      state.mode = true;
      state.errorEdit = false;
    },
    editActionFailed: (state, action) => {
      state.isFetching = false;
      state.errorEdit = true;
      state.dataEdit = action.payload;
    },
  },
});

export const { editActionStart, editActionSuccess, editActionFailed } =
  editSlice.actions;

export default editSlice.reducer;
