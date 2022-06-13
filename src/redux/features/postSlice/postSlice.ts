import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../../types/PostTypes";

const initialState: IPost = {
  picture: "",
  caption: "",
  hashtags: [],
  date: "",
  gallery: {
    name: "",
    location: "",
    id: "",
  },
  likes: 0,
  comments: 0,
  user: {
    id: "",
    name: "",
    username: "",
    profilePic: "",
    profilePicBackup: "",
  },
  pictureBackup: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    loadPost: (post, action: PayloadAction<IPost>) => ({
      ...action.payload,
    }),
    deletePost: () => ({ ...initialState }),
  },
});

export default postSlice.reducer;

export const {
  loadPost: loadPostActionCreator,
  deletePost: deletePostDetailActionCreator,
} = postSlice.actions;
