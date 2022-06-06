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
type Id = string | undefined;

export const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    loadPublicPosts: (posts, action: PayloadAction<Posts>) => ({
      ...posts,
      publicPosts: [...posts.publicPosts, ...action.payload],
    }),
    deletePost: (posts, action: PayloadAction<Id>) => ({
      ...posts,
      publicPosts: posts.publicPosts.filter(
        (post) => post.id !== action.payload
      ),
    }),
  },
});

export const {
  loadPublicPosts: loadPublicPostsActionCreator,
  deletePost: deletePostActionCreator,
} = postSlice.actions;

export const selectPost = (state: RootState) => state.posts;

export default postSlice.reducer;
