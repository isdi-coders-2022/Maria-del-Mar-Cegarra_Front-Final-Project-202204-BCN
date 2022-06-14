import axios from "axios";

import { AxiosUserReturn } from "../../types/UserTypes";
import {
  loginUserThunk,
  registerUserThunk,
  showAdviseAlreadyRegistered,
  showAdviseLoginUser,
  showAdviseNoRegisterData,
  showAdviseWrongUsernamePaswword,
  showErrorRegisterUser,
} from "./userThunks";
import {
  mockRegisterFormData,
  mockTokenUserData,
  mockUserStateLogged,
  mockWrongUserDataRegister,
} from "../../mocks/userMocks";
import { loginActionCreator } from "../features/userSlice/userSlice";

jest.mock("jwt-decode", () => () => mockTokenUserData);

describe("Given the registerUserThunk", () => {
  describe("When it receives the userState", () => {
    test("Then it calls the dispatch function witn logInActionCreator with the user State by payload", async () => {
      const mockAxiosReturn: AxiosUserReturn = {
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

      expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
    });
  });

  describe("When it receives the userState without name, username or password", () => {
    test("Then it calls dispatch with showAdviseNoRegisterData", async () => {
      const dispatch = jest.fn();
      const registerUserThunkTest = registerUserThunk(
        mockWrongUserDataRegister
      );
      const expectedAction = showAdviseNoRegisterData;

      await registerUserThunkTest(dispatch);

      expect(dispatch).toHaveBeenNthCalledWith(1, expectedAction);
    });
  });

  describe("When it receives no data from the response from api", () => {
    test("Then it calls dispatch with showAdviseAlreadyRegistered", async () => {
      const mockAxiosReturn: AxiosUserReturn = {
        status: 409,
      };
      const dispatch = jest.fn();
      const registerUserThunkTest = registerUserThunk(mockRegisterFormData);
      const expectedAction = showAdviseAlreadyRegistered;
      axios.post = jest.fn().mockResolvedValue(mockAxiosReturn);

      await registerUserThunkTest(dispatch);

      expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
    });
  });
});

describe("Given the loginUserThunk", () => {
  describe("When it receives the userState", () => {
    test("Then it calls the dispatch function witn logInActionCreator with the user State by payload", async () => {
      const mockAxiosReturn: AxiosUserReturn = {
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

      expect(dispatch).toHaveBeenNthCalledWith(1, expectedAction);
    });
  });

  describe("When it receives the userState without name, username or password", () => {
    test("Then it calls dispatch with showAdviseNoRegisterData", async () => {
      const dispatch = jest.fn();
      const loginUserThunkTest = loginUserThunk(mockWrongUserDataRegister);
      const expectedAction = showAdviseLoginUser;

      await loginUserThunkTest(dispatch);

      expect(dispatch).toHaveBeenNthCalledWith(1, expectedAction);
    });
  });

  describe("When it receives no data from the response from api", () => {
    test("Then it calls dispatch with showAdviseAlreadyRegistered", async () => {
      const mockAxiosReturn: AxiosUserReturn = {
        status: 409,
      };
      const dispatch = jest.fn();
      const loginUserThunkTest = loginUserThunk(mockRegisterFormData);
      const expectedAction = showAdviseWrongUsernamePaswword;
      axios.post = jest.fn().mockResolvedValue(mockAxiosReturn);

      await loginUserThunkTest(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
