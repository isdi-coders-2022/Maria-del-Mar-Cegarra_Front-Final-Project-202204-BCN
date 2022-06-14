import axios from "axios";
import jwtDecode from "jwt-decode";
import { AppDispatch } from "../store/store";
import {
  LoginFormData,
  RegisterFormData,
  UserState,
} from "../../types/UserTypes";
import { showAdviseThunk, showErrorThunk } from "./UIThunks";
import {
  closeUIActionCreator,
  showLoadingActionCreator,
} from "../features/UISlice/UISlice";
import { loginActionCreator } from "../features/userSlice/userSlice";

const apiUrl = process.env.REACT_APP_API_URL;

interface UserData {
  name: string;
  username: string;
  id: string;
}
export const showAdviseNoRegisterData = showAdviseThunk(
  "User data not provided",
  "Please fill all the fields and ty again"
);

export const showAdviseAlreadyRegistered = showAdviseThunk(
  "User already registered",
  "Please try again"
);
export const showErrorRegisterUser = showErrorThunk(
  "An error has occurred",
  "Please, try again later"
);

export const showAdviseWrongUsernamePaswword = showAdviseThunk(
  "Wrong username or password",
  "Please try again"
);

export const showAdviseLoginUser = showAdviseThunk(
  "User data not provided",
  "Please fill all the fields and ty again"
);
export const showErrorLoginUser = showErrorThunk(
  "An error has occurred",
  "Please, try again later"
);

export const registerUserThunk =
  (formData: RegisterFormData) => async (dispatch: AppDispatch) => {
    const { name, username, password } = formData;
    if (!(name || username || password)) {
      dispatch(showAdviseNoRegisterData);
    }
    try {
      dispatch(showLoadingActionCreator());
      const { data } = await axios.post(`${apiUrl}user/register`, {
        name,
        username,
        password,
      });
      if (!data) {
        dispatch(showAdviseAlreadyRegistered);
        return;
      }
      const userInfo: UserState = { ...jwtDecode(data.token), logged: true };
      localStorage.setItem("token", data.token);

      dispatch(loginActionCreator(userInfo));
      dispatch(closeUIActionCreator());
    } catch (error) {
      dispatch(showErrorRegisterUser);
    }
  };

export const loginUserThunk =
  (formData: LoginFormData) => async (dispatch: AppDispatch) => {
    const { username, password } = formData;
    if (!(username && password)) {
      dispatch(showAdviseLoginUser);
    }
    try {
      const { data } = await axios.post(`${apiUrl}user/login`, {
        username,
        password,
      });
      if (!data) {
        dispatch(showAdviseWrongUsernamePaswword);
        return;
      }
      localStorage.setItem("token", data.token);
      const userData: UserData = jwtDecode(data.token);
      const userInfo: UserState = {
        name: userData.name,
        username: userData.username,
        id: userData.id,
        logged: true,
      };

      dispatch(loginActionCreator(userInfo));
    } catch (error) {
      dispatch(showErrorLoginUser);
    }
  };
