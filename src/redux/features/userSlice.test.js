import { userMock } from "../../mocks/userMocks";
import userSlice, { loginActionCreator } from "./userSlice";

describe("Given the userSlice function", () => {
  describe("When it receives a logInActionCreator with a user on its payload", () => {
    test("Then it should return the user given", () => {
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
});
