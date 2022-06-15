import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store/store";
import EditPostPage from "./EditPostPage";

describe("Given the EditPostPage component", () => {
  describe("When it's invoked", () => {
    test("Then it should render a heading 'EditPost'", () => {
      const expectedHeading = "Edit Post";
      render(
        <BrowserRouter>
          <Provider store={store}>
            <EditPostPage />
          </Provider>
        </BrowserRouter>
      );

      const heading = screen.getByRole("heading", { name: expectedHeading });

      expect(heading).toBeInTheDocument();
    });
  });
});
