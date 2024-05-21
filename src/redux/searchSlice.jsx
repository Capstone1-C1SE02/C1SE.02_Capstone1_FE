import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchAction",
  initialState: {
    data: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    searchStart: (state) => {
      state.isFetching = true;
    },
    searchSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.error = false;
    },
    searchFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { searchFailed, searchStart, searchSuccess } = searchSlice.actions;

export default searchSlice.reducer;
