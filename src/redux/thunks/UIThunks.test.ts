import {
  closeUIActionCreator,
  showAdviseActionCreator,
  showConfirmationActionCreator,
  showErrorActionCreator,
} from "../features/UISlice";
import {
  dispatchCloseUI,
  showAdviseThunk,
  showConfirmationThunk,
  showErrorThunk,
} from "./UIThunks";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("Given the dispatchCloseUI function", () => {
  describe("When it receives a dispatch function", () => {
    test("Then it should call the function dispatch wit closeUIActionCreator", () => {
      const dispatch = jest.fn();
      const expectedAction = closeUIActionCreator();

      dispatchCloseUI(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});

describe("Given the showAdviseThunk function", () => {
  describe("When it receives a 'Wrong user data' and 'Please try again'", () => {
    test("Then it should call the dispatch function with a showAdviseActionCreator", () => {
      const header = "Wrong user data";
      const body = "Please try again";
      const dispatch = jest.fn();
      const showAdviseThunkTest = showAdviseThunk(header, body);
      const expectedAction = showAdviseActionCreator({ header, body });

      showAdviseThunkTest(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });

    test("Then it should call the dispatch function with a closeUIActionCreator", () => {
      const header = "Wrong user data";
      const body = "Please try again";
      const dispatch = jest.fn();
      const showAdviseThunkTest = showAdviseThunk(header, body);
      showAdviseThunkTest(dispatch);

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(dispatchCloseUI, 5000);
    });
  });
});

describe("Given the showErrorThunk function", () => {
  describe("When in receives 'An error occurred' and 'Try again later'", () => {
    test("Then it should call the dispatch function with a showErrorActionCreator", () => {
      const header = "An error occurred";
      const body = "Try again later";
      const dispatch = jest.fn();
      const showErrorThunkTest = showErrorThunk(header, body);
      const expectedAction = showErrorActionCreator({ header, body });

      showErrorThunkTest(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});

describe("Given the shoConfirmationThunk function", () => {
  describe("When in receives 'Sure to delete?' and 'Delete'", () => {
    test("Then it should call the dispatch function with a showErrorActionCreator", () => {
      const header = "Sure to delete?";
      const body = "Delete";
      const dispatch = jest.fn();
      const showConfirmationThunkTest = showConfirmationThunk(header, body);
      const expectedAction = showConfirmationActionCreator({ header, body });

      showConfirmationThunkTest(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
