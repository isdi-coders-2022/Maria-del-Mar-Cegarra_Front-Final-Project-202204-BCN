import { RootState } from "../store/store";
import UISlice, {
  closeUIActionCreator,
  selectUI,
  showAdviseActionCreator,
  showConfirmationActionCreator,
  showErrorActionCreator,
  showLoadingActionCreator,
  UIState,
} from "./UISlice";

describe("Given the uiSlice function", () => {
  describe("When it receives an unknown action", () => {
    test("Then it should return the initialState", () => {
      const initialState: UIState = {
        type: "",
        header: "",
        body: "",
      };
      const expectedState: UIState = { ...initialState };

      const currentState: UIState = UISlice(initialState, {
        type: "ui/unknown",
        payload: "",
      });

      expect(currentState).toEqual(expectedState);
    });
  });

  describe("When it receives the showError action with header:'An error occurred' and body:'Try again later' by payload", () => {
    test("Then it should return type: 'error', header: 'An error occurred' and body: 'Try again later'", () => {
      const initialState: UIState = {
        type: "",
        header: "",
        body: "",
      };
      const expectedUIState: UIState = {
        type: "error",
        header: "An error occurred",
        body: "Try again later",
      };
      const payload = {
        header: "An error occurred",
        body: "Try again later",
      };

      const currentState = UISlice(
        initialState,
        showErrorActionCreator(payload)
      );

      expect(currentState).toEqual(expectedUIState);
    });
  });

  describe("When it receives the showAdvise action with header:'Wrong user data' and body:'Please try again' by payload", () => {
    test("Then it should return type: 'error', header: 'Wrong user data' and body: 'Please try again'", () => {
      const initialState: UIState = {
        type: "",
        header: "",
        body: "",
      };
      const expectedUIState: UIState = {
        type: "advise",
        header: "Wrong user data",
        body: "Please try again",
      };
      const payload = {
        header: "Wrong user data",
        body: "Please try again",
      };

      const currentState = UISlice(
        initialState,
        showAdviseActionCreator(payload)
      );

      expect(currentState).toEqual(expectedUIState);
    });
  });

  describe("When it receives the showConfirmation action with header:'Are you sure to delete the post?' and body:'Delete' by payload", () => {
    test("Then it should return type: 'error', header: Are you sure to delete the post?' and body: 'Delete'", () => {
      const initialState: UIState = {
        type: "",
        header: "",
        body: "",
      };
      const expectedUIState: UIState = {
        type: "confirmation",
        header: "Are you sure to delete the post?",
        body: "Delete",
      };
      const payload = {
        header: "Are you sure to delete the post?",
        body: "Delete",
      };

      const currentState = UISlice(
        initialState,
        showConfirmationActionCreator(payload)
      );

      expect(currentState).toEqual(expectedUIState);
    });
  });

  describe("When it receives the showLoading", () => {
    test("Then it should return type: 'loading', body: '' and header: ''", () => {
      const initialState: UIState = {
        type: "",
        header: "",
        body: "",
      };
      const expectedUIState = {
        type: "loading",
        header: "",
        body: "",
      };

      const currentState = UISlice(initialState, showLoadingActionCreator());

      expect(currentState).toEqual(expectedUIState);
    });
  });

  describe("When it receives the closeUI", () => {
    test("Then it should return type: '' , body: '' and header: ''", () => {
      const initialState: UIState = {
        type: "",
        header: "",
        body: "",
      };
      const expectedUIState = {
        type: "",
        header: "",
        body: "",
      };

      const currentState = UISlice(initialState, closeUIActionCreator());

      expect(currentState).toEqual(expectedUIState);
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
          detailPost: {},
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
      };

      const uiState = selectUI(state);

      expect(uiState).toEqual(state.ui);
    });
  });
});
