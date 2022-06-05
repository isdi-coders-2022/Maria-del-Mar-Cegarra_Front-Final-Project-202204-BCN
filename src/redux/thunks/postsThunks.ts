import axios from "axios";
import { loadPublicPostsActionCreator } from "../features/postsSlice";
import { AppDispatch } from "../store/store";
import { showAdviseThunk, showErrorThunk } from "./UIThunks";

const apiUrl = process.env.REACT_APP_API_URL;

export const loadPublicPostsThunk =
  (pageSize: number, page: number) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.get(
        `${apiUrl}posts/pageSize=${pageSize}&page=${page}`
      );

      if (!data) {
        dispatch(
          showAdviseThunk(
            "You have reached the end",
            "There are no more posts to show"
          )
        );
      }

      dispatch(loadPublicPostsActionCreator(data.posts));
    } catch (error) {
      dispatch(
        showErrorThunk("An error has occurred", "Please try again later")
      );
    }
  };
