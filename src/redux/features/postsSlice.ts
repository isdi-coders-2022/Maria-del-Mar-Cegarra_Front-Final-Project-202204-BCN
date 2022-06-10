import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../types/PostTypes";
import { RootState } from "../store/store";

export interface PostsState {
  publicPosts: IPost[];
  userPosts: IPost[];
}

const initialState: PostsState = {
  publicPosts: [],
  userPosts: [],
};

type Posts = IPost[] | [];
type Id = string | undefined;

export const postsSlice = createSlice({
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
    createPost: (posts, action: PayloadAction<IPost>) => ({
      ...posts,
      userPosts: [...posts.userPosts, action.payload],
      publicPosts: [...posts.publicPosts, action.payload],
    }),
  },
});

export const {
  loadPublicPosts: loadPublicPostsActionCreator,
  deletePost: deletePostActionCreator,
  createPost: createPostActionCreator,
} = postsSlice.actions;

export const selectPost = (state: RootState) => state.posts;

export default postsSlice.reducer;
