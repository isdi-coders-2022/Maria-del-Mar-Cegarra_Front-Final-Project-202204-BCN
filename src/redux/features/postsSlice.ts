import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../types/PostTypes";
import { RootState } from "../store/store";

export interface PostState {
  publicPosts: IPost[];
  userPosts: IPost[];
  detailPost: IPost | {};
}

const initialState: PostState = {
  publicPosts: [],
  userPosts: [],
  detailPost: {},
};

type Posts = IPost[] | [];

export const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    loadPublicPosts: (posts, action: PayloadAction<Posts>) => ({
      ...posts,
      publicPosts: [...posts.publicPosts, ...action.payload],
    }),
  },
});

export const { loadPublicPosts: loadPublicPostsActionCreator } =
  postSlice.actions;

export const selectPost = (state: RootState) => state.posts;

export default postSlice.reducer;
