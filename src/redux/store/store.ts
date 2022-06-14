import { configureStore } from "@reduxjs/toolkit";
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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
