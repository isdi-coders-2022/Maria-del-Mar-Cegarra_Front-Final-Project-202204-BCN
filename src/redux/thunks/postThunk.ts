import axios from "axios";
import { loadPostActionCreator } from "../features/postSlice";

import {
  closeUIActionCreator,
  showLoadingActionCreator,
} from "../features/UISlice";
import { AppDispatch } from "../store/store";
import { showAdviseThunk, showErrorThunk } from "./UIThunks";

const apiUrl = process.env.REACT_APP_API_URL;

export const showErrorLoadPost = showErrorThunk(
  "Could not get details of post",
  "Please, try again later"
);

export const showExitEditPost = showAdviseThunk(
  "Post edited successfully!",
  ""
);

export const showErrorEditPost = showErrorThunk(
  "Could not edit post",
  "Please, try again later"
);

export const loadPostThunk =
  (postId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(showLoadingActionCreator());
      const token = localStorage.getItem("token");
      const {
        data: { post },
      } = await axios.get(`${apiUrl}posts/${postId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (post) {
        dispatch(loadPostActionCreator(post));
        dispatch(closeUIActionCreator());
        return;
      }
    } catch (error) {
      dispatch(showErrorLoadPost);
    }
  };

export const editPostThunk =
  (postId: string, post: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(showLoadingActionCreator());
      const token = localStorage.getItem("token");
      const { status } = await axios.patch(`${apiUrl}posts/edit/${postId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (status === 204) {
        dispatch(loadPostThunk(postId));
        dispatch(showExitEditPost);
      }
      dispatch(showErrorEditPost);
    } catch (error) {
      dispatch(showErrorEditPost);
    }
  };
