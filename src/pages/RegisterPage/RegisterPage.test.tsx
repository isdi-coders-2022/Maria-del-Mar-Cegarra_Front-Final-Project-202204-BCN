import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store/store";
import RegisterPage from "./RegisterPage";

describe("Given the LoginPage page component", () => {
  describe("When it's invoked", () => {
    test("Then it should render a heading with 'Log in'", () => {
      const expectedHeading = "Register";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <RegisterPage />
          </Provider>
        </BrowserRouter>
      );
      const heading = screen.getByRole("heading", { name: expectedHeading });

      expect(heading).toBeInTheDocument();
    });
  });
});
