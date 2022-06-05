import {
  LoginFormData,
  RegisterFormData,
  TokenUserData,
  UserData,
  UserState,
} from "../types/UserTypes";

export const mockTokenUserData: TokenUserData = {
  name: "Maria",
  username: "maria23",
  id: "0",
};

export const mockUserStateLogged: UserState = {
  name: "Maria",
  username: "maria23",
  id: "0",
  logged: true,
};

export const mockUserStateUnLogged: UserState = {
  ...mockUserStateLogged,
  logged: false,
};

export const mockRegisterFormData: RegisterFormData = {
  name: "Maria",
  username: "maria23",
  email: "uwu@gmail.com",
  password: "122343",
  repeatPassword: "122343",
};

export const mockWrongUserDataRegister: RegisterFormData = {
  name: "",
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export const wrongUserDataLogin: LoginFormData = {
  username: "",
  password: "",
};

export const mockUsersData: UserData[] = [
  {
    id: "3",
    name: "Maicol",
    username: "maicol69",
    email: "maicol@gmail.com",
    avatar: "qrigbqr.jpg",
    followers: 4,
    following: 5,
    logged: false,
  },
  {
    id: "4",
    name: "Albert",
    username: "albert 68",
    email: "albert@gmail.com",
    avatar: "qrigbqr.jpg",
    followers: 4,
    following: 5,
    logged: false,
  },
];
