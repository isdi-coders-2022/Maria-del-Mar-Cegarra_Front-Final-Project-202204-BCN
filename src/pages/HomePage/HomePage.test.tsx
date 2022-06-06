import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store/store";
import HomePage from "./HomePage";

describe("Given the HomePage page component", () => {
  describe("When its invoked", () => {
    test("Then it should render a heading with 'Explore'", () => {
      const expectedHeading = "Explore";

      render(
        <Provider store={store}>
          <HomePage />
        </Provider>
      );
      const heading = screen.getByRole("heading", { name: expectedHeading });

      expect(heading).toBeInTheDocument();
    });
  });
});
