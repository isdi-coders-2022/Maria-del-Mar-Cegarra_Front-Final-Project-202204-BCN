interface UserMock {
  name: String;
  username: String;
  email: String;
  avatar: String;
  followers: Number;
  following: Number;
  logged: boolean;
}

export const userMock: UserMock = {
  name: "Maria",
  username: "maria23",
  email: "maria@gmail.com",
  avatar: "qrigbqr.jpg",
  followers: 4,
  following: 5,
  logged: false,
};

export const usersMock: UserMock[] = [
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
