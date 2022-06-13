import { createSlice } from "@reduxjs/toolkit";

interface Pagination {
  publicPostsPage: number;
  userPostsPage: number;
}

const initialState: Pagination = {
  publicPostsPage: 1,
  userPostsPage: 1,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    loadMorePublicPosts: (pagination) => ({
      ...initialState,
      publicPostsPage: pagination.publicPostsPage + 1,
    }),
    loadMoreUserPosts: (pagination) => ({
      ...initialState,
      userPostsPage: pagination.userPostsPage + 1,
    }),
  },
});

export default paginationSlice.reducer;

export const {
  loadMorePublicPosts: loadMorePublicPostsActionCreator,
  loadMoreUserPosts: loadMoreUserPostsActionCreator,
} = paginationSlice.actions;
