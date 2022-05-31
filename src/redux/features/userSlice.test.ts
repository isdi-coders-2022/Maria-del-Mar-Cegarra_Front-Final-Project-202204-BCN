import { userMock } from "../../mocks/userMocks";
import userSlice, {
  editUserActionCreator,
  loginActionCreator,
  logOutActionCreator,
} from "./userSlice";

describe("Given the userSlice function", () => {
  describe("When it receives an unknown action", () => {
    test("Then it should return the initialState", () => {
      const expectedState = {
        name: "Pepe",
        username: "pepe34",
        email: "pepe@gmail",
        avatar: "qouigbqg.jpg",
        followers: 5,
        following: 6,
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
        email: "",
        avatar: "",
        followers: 0,
        following: 0,
        logged: false,
      };
      const expectedState = { ...userMock, logged: true };

      const currentState = userSlice(
        initialState,
        loginActionCreator(userMock)
      );

      expect(currentState).toEqual(expectedState);
    });
  });

  describe("When it receives a logOutActionCreator with a user on its payload", () => {
    test("Then it should return an empty user with logged: false", () => {
      const expectedState = {
        name: "",
        username: "",
        email: "",
        avatar: "",
        followers: 0,
        following: 0,
        logged: false,
      };
      const initialState = { ...userMock, logged: true };

      const currentState = userSlice(initialState, logOutActionCreator());

      expect(currentState).toEqual(expectedState);
    });
  });

  describe("When it receives a edirUserActionCreator with a user on its payload", () => {
    test("Then it should return an empty user with logged: false", () => {
      const expectedState = {
        name: "Pepe",
        username: "pepe34",
        email: "pepe@gmail",
        avatar: "qouigbqg.jpg",
        followers: 5,
        following: 6,
        logged: true,
      };
      const initialState = { ...userMock };

      const currentState = userSlice(
        initialState,
        editUserActionCreator(expectedState)
      );

      expect(currentState).toEqual(expectedState);
    });
  });
});
