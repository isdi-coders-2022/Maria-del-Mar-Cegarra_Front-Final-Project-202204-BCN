import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../features/postSlice";
import postsReducer from "../features/postsSlice";
import UIReducer from "../features/UISlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: UIReducer,
    posts: postsReducer,
    post: postSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
