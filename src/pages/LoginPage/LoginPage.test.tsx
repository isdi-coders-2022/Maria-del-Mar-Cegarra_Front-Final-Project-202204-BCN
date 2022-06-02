import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store/store";
import LoginPage from "./LoginPage";

describe("Given the LoginPage page component", () => {
  describe("When it's invoked", () => {
    test("Then it should render a heading with 'Log in'", () => {
      const expectedHeading = "Log in";

      render(
        <Provider store={store}>
          <LoginPage />
        </Provider>
      );
      const heading = screen.getByRole("heading", { name: expectedHeading });

      expect(heading).toBeInTheDocument();
    });
  });
});
