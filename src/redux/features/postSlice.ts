import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PostState {
  picture: string;
  caption: string;
  hashtags: string[];
  date: string;
  gallery: string;
  likes?: number;
  comments?: number;
}

const initialState: PostState = {
  picture: "",
  caption: "",
  hashtags: [],
  date: "",
  gallery: "",
  likes: 0,
  comments: 0,
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    loadPost: (post, action: PayloadAction<PostState>) => ({
      ...action.payload,
    }),
  },
});

export default postSlice.reducer;

export const { loadPost: loadPostActionCreator } = postSlice.actions;
