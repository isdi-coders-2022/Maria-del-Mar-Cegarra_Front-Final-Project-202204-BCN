import axios from "axios";
import {
  mockRegisterFormData,
  mockTokenUserData,
  mockUserStateLogged,
} from "../mocks/userMocks";
import { loginActionCreator } from "../redux/features/userSlice";
import { AxiosReturn } from "../types/UserTypes";
import { loginUserThunk, registerUserThunk } from "./userThunks";

jest.mock("jwt-decode", () => () => mockTokenUserData);

describe("Given the registerUserThunk", () => {
  describe("When it receives the userState", () => {
    test("Then it calls the dispatch function witn logInActionCreator with the user State by payload", async () => {
      const mockAxiosReturn: AxiosReturn = {
        status: 201,
        data: {
          token: "uwuwuwu",
        },
      };
      const dispatch = jest.fn();
      const registerUserThunkTest = registerUserThunk(mockRegisterFormData);
      const expectedAction = loginActionCreator(mockUserStateLogged);
      axios.post = jest.fn().mockResolvedValue(mockAxiosReturn);
      await registerUserThunkTest(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});

describe("Given the loginUserThunk", () => {
  describe("When it receives the userState", () => {
    test("Then it calls the dispatch function witn logInActionCreator with the user State by payload", async () => {
      const mockAxiosReturn: AxiosReturn = {
        status: 200,
        data: {
          token: "uwuwuwu",
        },
      };
      const dispatch = jest.fn();
      const loginUserThunkTest = loginUserThunk(mockRegisterFormData);
      const expectedAction = loginActionCreator(mockUserStateLogged);
      axios.post = jest.fn().mockResolvedValue(mockAxiosReturn);
      await loginUserThunkTest(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
