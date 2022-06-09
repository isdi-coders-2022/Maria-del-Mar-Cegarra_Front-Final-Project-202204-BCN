import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store/store";
import AddPostPage from "./AddPostPage";

describe("Given the HomePage page component", () => {
  describe("When its invoked", () => {
    test("Then it should render a heading with 'Explore'", () => {
      const expectedHeading = "Add Post";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <AddPostPage />
          </Provider>
        </BrowserRouter>
      );
      const heading = screen.getByRole("heading", { name: expectedHeading });

      expect(heading).toBeInTheDocument();
    });
  });
});
