import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    showLoading: () => true,
    notShowLoading: () => false,
  },
});

export default loadingSlice.reducer;

export const {
  showLoading: showLoadingActionCreator,
  notShowLoading: notShowLoadingActionCreator,
} = loadingSlice.actions;
