import axios from "axios";
import { IPost } from "../../types/PostTypes";
import {
  notShowLoadingActionCreator,
  showLoadingActionCreator,
} from "../features/loadingSlice/loadingSlice";
import {
  createPostActionCreator,
  deletePostActionCreator,
  loadPublicPostsActionCreator,
  loadUserPostsActionCreator,
} from "../features/postsSlice/postsSlice";

import { AppDispatch } from "../store/store";
import { showAdviseThunk, showErrorThunk } from "./UIThunks";

const apiUrl = process.env.REACT_APP_API_URL;

export const showErrorLoadPublicPosts = showErrorThunk(
  "An error has occurred",
  "Please try again later"
);
export const showAdviseLoadPublicPosts = showAdviseThunk(
  "You have reached the end",
  "There are no more posts to show"
);

export const showErrorDeletePost = showErrorThunk(
  "Post has not been removed correctly",
  "Please try again later"
);

export const showExitDeletePost = showAdviseThunk(
  "Post deleted correctly!",
  ""
);

export const showErrorCreatePost = showErrorThunk(
  "Error posting: could not create post",
  "Please try again later"
);

export const showExitCreatePost = showAdviseThunk(
  "Post created successfully!",
  ""
);

export const loadPublicPostsThunk =
  (pageSize: number, page: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(showLoadingActionCreator());
      const token = window.localStorage.getItem("token");
      const { data } = await axios.get(
        `${apiUrl}posts/pageSize=${pageSize}&page=${page}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (!data) {
        dispatch(showErrorLoadPublicPosts);
        return;
      }
      if (!data.posts.length) {
        dispatch(showAdviseLoadPublicPosts);
        return;
      }
      dispatch(loadPublicPostsActionCreator(data.posts));
      dispatch(notShowLoadingActionCreator());
    } catch (error) {
      dispatch(showErrorLoadPublicPosts);
    }
  };

export const loadUserPostsThunk =
  (userId: string, pageSize: number, page: number) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(showLoadingActionCreator());
      const token = window.localStorage.getItem("token");
      const { data } = await axios.get(
        `${apiUrl}posts/user-posts/user=${userId}&pageSize=${pageSize}&page=${page}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (!data) {
        dispatch(showErrorLoadPublicPosts);
        return;
      }
      if (!data.posts.length) {
        dispatch(showAdviseLoadPublicPosts);
        return;
      }
      dispatch(loadUserPostsActionCreator(data.posts));
      dispatch(notShowLoadingActionCreator());
    } catch (error) {
      dispatch(showErrorLoadPublicPosts);
    }
  };

export const deletePostThunk =
  (id: string | undefined) => async (dispatch: AppDispatch) => {
    try {
      dispatch(showLoadingActionCreator());
      const token = window.localStorage.getItem("token");
      const { data } = await axios.delete(`${apiUrl}posts/delete/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!data) {
        dispatch(showErrorDeletePost);
        return;
      }
      dispatch(deletePostActionCreator(id));
      dispatch(showExitDeletePost);
    } catch (error) {
      dispatch(showErrorDeletePost);
    }
  };

export const createPostThunk =
  (newPost: IPost) => async (dispatch: AppDispatch) => {
    try {
      dispatch(showLoadingActionCreator());
      const token = window.localStorage.getItem("token");
      const {
        data: { post },
      } = await axios.post(`${apiUrl}posts/create`, newPost, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (!post) {
        dispatch(showErrorCreatePost);
        return;
      }
      dispatch(createPostActionCreator(post));
      dispatch(showExitCreatePost);
    } catch (error) {
      dispatch(showErrorCreatePost);
    }
  };
