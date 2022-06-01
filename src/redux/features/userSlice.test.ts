import {
  mockUserStateLogged,
  mockUserStateUnLogged,
} from "../../mocks/userMocks";
import { UserState } from "../../types/UserTypes";
import userSlice, {
  editUserActionCreator,
  loginActionCreator,
  logOutActionCreator,
} from "./userSlice";

describe("Given the userSlice function", () => {
  describe("When it receives an unknown action", () => {
    test("Then it should return the initialState", () => {
      const expectedState: UserState = {
        name: "Pepe",
        username: "pepe34",
        id: 342,
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
        id: 0,
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
        id: 0,
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
        id: 0,
        logged: true,
      };
      const newUserData = {
        name: "Pepe",
        username: "pepe34",
        id: 0,
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
