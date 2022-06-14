import {
  mockUserStateLogged,
  mockUserStateUnLogged,
} from "../../../mocks/userMocks";
import { UserState } from "../../../types/UserTypes";
import { RootState } from "../../store/store";
import userSlice, {
  editUserActionCreator,
  loginActionCreator,
  logOutActionCreator,
  selectUser,
} from "./userSlice";

describe("Given the userSlice function", () => {
  describe("When it receives an unknown action", () => {
    test("Then it should return the initialState", () => {
      const expectedState: UserState = {
        name: "Pepe",
        username: "pepe34",
        id: "342",
        logged: true,
      };
      const initialState = { ...expectedState };

      const currentState = userSlice(initialState, {
        type: "user/unknown",
        payload: "",
      });

      expect(currentState).toEqual(expectedState);
    });
  });
  describe("When it receives a logInActionCreator with a user on its payload", () => {
    test("Then it should return the user given with logged: true", () => {
      const initialState = {
        name: "",
        username: "",
        id: "",
        logged: false,
      };
      const expectedState: UserState = { ...mockUserStateLogged };

      const currentState = userSlice(
        initialState,
        loginActionCreator(mockUserStateLogged)
      );

      expect(currentState).toEqual(expectedState);
    });
  });

  describe("When it receives a logOutActionCreator with a user on its payload", () => {
    test("Then it should return an empty user with logged: false", () => {
      const expectedState = {
        name: "",
        username: "",
        id: "",
        logged: false,
      };
      const initialState = { ...mockUserStateLogged };

      const currentState = userSlice(initialState, logOutActionCreator());

      expect(currentState).toEqual(expectedState);
    });
  });

  describe("When it receives a edirUserActionCreator with a user on its payload", () => {
    test("Then it should return an empty user with logged: false", () => {
      const expectedState = {
        name: "Pepe",
        username: "pepe34",
        id: "",
        logged: true,
      };
      const newUserData = {
        name: "Pepe",
        username: "pepe34",
        id: "",
        logged: true,
      };
      const initialState = { ...mockUserStateUnLogged };

      const currentState = userSlice(
        initialState,
        editUserActionCreator(newUserData)
      );

      expect(currentState).toEqual(expectedState);
    });
  });
});

describe("Given the selectPost function", () => {
  describe("When it receives the state of the store with a posts state", () => {
    test("Then it should return the posts state", () => {
      const state: RootState = {
        posts: {
          publicPosts: [],
          userPosts: [],
        },
        user: {
          name: "",
          username: "",
          id: "",
          logged: true,
        },
        ui: {
          type: "",
          body: "",
          header: "",
        },
        post: {
          picture: "",
          caption: "",
          hashtags: [],
          date: "",
          gallery: {
            name: "",
            location: "",
            id: "",
          },
          user: {
            id: "",
            name: "",
            username: "",
            profilePic: "",
            profilePicBackup: "",
          },
          likes: 0,
          comments: 0,
        },
        pagination: {
          publicPostsPage: 1,
          userPostsPage: 1,
        },
      };

      const userState = selectUser(state);

      expect(userState).toEqual(state.user);
    });
  });
});
