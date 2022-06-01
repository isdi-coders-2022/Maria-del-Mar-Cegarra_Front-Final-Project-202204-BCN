import axios from "axios";
import jwtDecode from "jwt-decode";
import { loginActionCreator } from "../redux/features/userSlice";
import { AppDispatch } from "../redux/store/store";
import { RegisterFormData, UserState } from "../types/UserTypes";

const apiUrl = process.env.REACT_APP_API_URL;

export const registerUserThunk =
  (formData: RegisterFormData) => async (dispatch: AppDispatch) => {
    const { name, username, email, password } = formData;
    const { status, data } = await axios.post(`${apiUrl}/user/register`, {
      name,
      username,
      email,
      password,
    });
    if (status === 200) {
      const userInfo: UserState = { ...jwtDecode(data.token), logged: true };
      localStorage.setItem("token", data.token);
      dispatch(loginActionCreator(userInfo));
    }
  };
