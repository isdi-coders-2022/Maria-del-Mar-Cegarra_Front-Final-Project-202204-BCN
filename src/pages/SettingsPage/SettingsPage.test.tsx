import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { logOutActionCreator } from "../../redux/features/userSlice/userSlice";
import { store } from "../../redux/store/store";
import SettingsPage from "./SettingsPage";

window.localStorage.setItem("token", "tokenMock");

const mockDispatch = jest.fn();

jest.mock("../../redux/hooks/hooks", () => ({
  ...jest.requireActual("../../redux/hooks/hooks"),
  useAppDispatch: () => mockDispatch,
}));

describe("Given the SettingsPage component", () => {
  describe("When its invoked", () => {
    test("Then it should render a button with 'Log Out' and an icon", () => {
      const expectedButton = "Log Out";
      render(
        <BrowserRouter>
          <Provider store={store}>
            <SettingsPage />
          </Provider>
        </BrowserRouter>
      );

      const button = screen.getByRole("button", { name: expectedButton });
      const icon = screen.getByRole("img");

      expect(button).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });

    test("Then it should call dispatch with logOutActionCreator and remove token from localStorage", () => {
      const expectedAction = logOutActionCreator();
      const expectedButton = "Log Out";
      render(
        <BrowserRouter>
          <Provider store={store}>
            <SettingsPage />
          </Provider>
        </BrowserRouter>
      );

      const button = screen.getByRole("button", { name: expectedButton });
      userEvent.click(button);

      expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
