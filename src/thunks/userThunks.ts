import axios from "axios";
import jwtDecode from "jwt-decode";
import { loginActionCreator } from "../redux/features/userSlice";
import { AppDispatch } from "../redux/store/store";
import { LoginFormData, RegisterFormData, UserState } from "../types/UserTypes";

const apiUrl = process.env.REACT_APP_API_URL;

export const registerUserThunk =
  (formData: RegisterFormData) => async (dispatch: AppDispatch) => {
    const { name, username, password } = formData;
    const { data } = await axios.post(`${apiUrl}user/register`, {
      name,
      username,
      password,
    });
    if (data) {
      const userInfo: UserState = { ...jwtDecode(data.token), logged: true };
      localStorage.setItem("token", data.token);
      dispatch(loginActionCreator(userInfo));
    }
  };

export const loginUserThunk =
  (formData: LoginFormData) => async (dispatch: AppDispatch) => {
    const { username, password } = formData;
    const { data } = await axios.post(`${apiUrl}user/login`, {
      username,
      password,
    });
    if (data) {
      const userInfo: UserState = { ...jwtDecode(data.token), logged: true };
      localStorage.setItem("token", data.token);
      dispatch(loginActionCreator(userInfo));
    }
  };
