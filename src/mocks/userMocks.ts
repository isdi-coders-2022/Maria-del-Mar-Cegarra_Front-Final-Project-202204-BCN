import { UserData, UserState } from "../types/UserTypes";

export const userMock: UserState = {
  name: "Maria",
  username: "maria23",
  id: 0,
  logged: true,
};

export const usersMock: UserData[] = [
  {
    name: "Maicol",
    username: "maicol69",
    email: "maicol@gmail.com",
    avatar: "qrigbqr.jpg",
    followers: 4,
    following: 5,
    logged: false,
  },
  {
    name: "Albert",
    username: "albert 68",
    email: "albert@gmail.com",
    avatar: "qrigbqr.jpg",
    followers: 4,
    following: 5,
    logged: false,
  },
];
