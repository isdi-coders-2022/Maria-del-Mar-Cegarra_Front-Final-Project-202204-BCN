import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store/store";
import SettingsPage from "./SettingsPage";

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
  });
});
