import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../../types/PostTypes";
import { RootState } from "../../store/store";

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
      publicPosts: [...action.payload],
    }),
    loadUserPosts: (posts, action: PayloadAction<Posts>) => ({
      ...posts,
      userPosts: [...action.payload],
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
    editPost: (posts, action: PayloadAction<IPost>) => ({
      userPosts: posts.userPosts.map((post) =>
        post.id === action.payload.id ? { ...action.payload } : post
      ),
      publicPosts: posts.publicPosts.map((post) =>
        post.id === action.payload.id ? { ...action.payload } : post
      ),
    }),
  },
});

export const {
  loadPublicPosts: loadPublicPostsActionCreator,
  loadUserPosts: loadUserPostsActionCreator,
  deletePost: deletePostActionCreator,
  createPost: createPostActionCreator,
  editPost: editPostActionCreator,
} = postsSlice.actions;

export const selectPost = (state: RootState) => state.posts;

export default postsSlice.reducer;
