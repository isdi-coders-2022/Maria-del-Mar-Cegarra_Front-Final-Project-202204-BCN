import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { store } from "../../redux/store/store";

describe("Given the LoginPage page component", () => {
  describe("When it's invoked", () => {
    test("Then it should render a heading with 'Log in'", () => {
      const expectedHeading = "Register";

      render(
        <Provider store={store}>
          <RegisterForm />
        </Provider>
      );
      const heading = screen.getByRole("heading", { name: expectedHeading });

      expect(heading).toBeInTheDocument();
    });
  });
});
