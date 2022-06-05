import axios from "axios";
import { loadPublicPostsActionCreator } from "../features/postsSlice";
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

export const loadPublicPostsThunk =
  (pageSize: number, page: number) => async (dispatch: AppDispatch) => {
    const { data } = await axios.get(
      `${apiUrl}posts/pageSize=${pageSize}&page=${page}`
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
  };
