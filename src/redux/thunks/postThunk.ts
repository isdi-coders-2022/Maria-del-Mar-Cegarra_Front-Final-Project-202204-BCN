import axios from "axios";
import { IPost } from "../../types/PostTypes";
import {
  notShowLoadingActionCreator,
  showLoadingActionCreator,
} from "../features/loadingSlice/loadingSlice";
import { loadPostActionCreator } from "../features/postSlice/postSlice";
import { editPostActionCreator } from "../features/postsSlice/postsSlice";

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
        setTimeout(() => {
          dispatch(notShowLoadingActionCreator());
        }, 3000);
        return;
      }
    } catch (error) {
      dispatch(showErrorLoadPost);
    }
  };

export const editPostThunk =
  (postId: string, postInfo: IPost) => async (dispatch: AppDispatch) => {
    try {
      dispatch(showLoadingActionCreator());
      const token = localStorage.getItem("token");
      const { status, data: post } = await axios.put(
        `${apiUrl}posts/edit/${postId}`,
        postInfo,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (status === 204) {
        dispatch(editPostActionCreator(post));
        dispatch(showExitEditPost);
      } else {
        dispatch(showErrorEditPost);
      }
    } catch (error) {
      dispatch(showErrorEditPost);
    }
  };
