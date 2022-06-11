import { configureStore, createSlice } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CredentialsValidation from "./CredentialsValidation";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

let mockedToken = "uwuwu";
jest.mock("jwt-decode", () => () => mockedToken);

const saveToStorage = (value: string) => {
  window.localStorage.setItem("token", value);
};

window.location.pathname = "/login";
const userMockSlice = createSlice({
  name: "user",
  initialState: { logged: true },
  reducers: {},
});
const mockStore = configureStore({
  reducer: { user: userMockSlice.reducer },
});

describe("Given the CredentialsValidation component", () => {
  describe("When its invoked and receives a children JSX element and there is a token in the localStorage", () => {
    test("Then it should render the children JSX element and", () => {
      saveToStorage("token");
      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <CredentialsValidation children={<h1>Hola</h1>} />
          </Provider>
        </BrowserRouter>
      );
      const expectedHeading = screen.getByRole("heading", { name: "Hola" });

      expect(expectedHeading).toBeInTheDocument();
    });
  });

  describe("When its invoked receiving a JSX element and its logged at '/login'", () => {
    test("Then it should call navigate function to '/home'", () => {
      saveToStorage("token");
      window.history.pushState({}, "Login", "/login");
      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <CredentialsValidation children={<h1>Hola</h1>} />
          </Provider>
        </BrowserRouter>
      );

      expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
  });

  describe("When its invoked receiving a JSX element and its logged at '/register'", () => {
    test("Then it should call navigate function to '/home'", () => {
      saveToStorage("token");
      window.history.pushState({}, "Register", "/register");
      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <CredentialsValidation children={<h1>Hola</h1>} />
          </Provider>
        </BrowserRouter>
      );

      expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
  });

  describe("When its invoked receiving a JSX element and its logged at '/home'", () => {
    test("Then it should not call navigate function", () => {
      saveToStorage("token");
      window.history.pushState({}, "Home", "/home");
      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <CredentialsValidation children={<h1>Hola</h1>} />
          </Provider>
        </BrowserRouter>
      );

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
