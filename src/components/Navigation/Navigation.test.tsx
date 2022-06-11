import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store/store";
import Navigation from "./Navigation";

describe("Given the Navigation component", () => {
  describe("When its invoked", () => {
    test("Then it should render a list with 5 listitems", () => {
      const expectedNumerOfListItems = 5;

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </BrowserRouter>
      );
      const numberOfListItems = screen.getAllByRole("listitem");
      const list = screen.getByRole("list");

      expect(list).toBeInTheDocument();
      expect(numberOfListItems).toHaveLength(expectedNumerOfListItems);
    });
  });

  describe("When its invoked at /home", () => {
    test("The first link should have style text-cyan-400", () => {
      window.history.pushState({}, "Home", "/home");
      const expectednavigation = "Home";
      const expectedStyle = "p-3 text-cyan-400 hover:text-cyan-400 active";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </BrowserRouter>
      );
      const homeListItem = screen.getByRole("link", {
        name: expectednavigation,
      });
      expect(homeListItem).toHaveClass(expectedStyle);
    });
  });
});
