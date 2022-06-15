import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "../features/loadingSlice/loadingSlice";
import paginationReducer from "../features/paginationSlice/paginationSlice";
import postReducer from "../features/postSlice/postSlice";
import postsSlice from "../features/postsSlice/postsSlice";
import UISlice from "../features/UISlice/UISlice";
import userSlice from "../features/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    ui: UISlice,
    posts: postsSlice,
    post: postReducer,
    pagination: paginationReducer,
    loading: loadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
