import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../types/UserTypes";
import { RootState } from "../store/store";

const initialState: UserState = {
  name: "",
  username: "",
  id: 0,
  logged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (user, action: PayloadAction<UserState>) => ({
      ...action.payload,
    }),
    logOut: (user) => ({ ...initialState }),
    editUser: (user, action: PayloadAction<UserState>) => ({
      ...action.payload,
    }),
  },
});

export const {
  logIn: loginActionCreator,
  logOut: logOutActionCreator,
  editUser: editUserActionCreator,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
