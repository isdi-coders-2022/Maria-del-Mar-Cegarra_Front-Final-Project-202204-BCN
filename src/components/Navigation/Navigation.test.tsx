import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store/store";
import Navigation from "./Navigation";

describe("Given the Navigation component", () => {
  describe("When its invoked", () => {
    test("Then it should render a list with 5 listitems", () => {
      const expectedNumerOfListItems = 5;

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );
      const numberOfListItems = screen.getAllByRole("listitem");
      const list = screen.getByRole("list");

      expect(list).toBeInTheDocument();
      expect(numberOfListItems).toHaveLength(expectedNumerOfListItems);
    });
  });
});
