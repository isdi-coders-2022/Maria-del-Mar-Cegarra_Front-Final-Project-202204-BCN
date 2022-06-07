import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store/store";
import ProfilePage from "./ProfilePage";

describe("Given the ProfilePage page", () => {
  describe("When its invoked", () => {
    test("Then it should render a heading 'My Profile'", () => {
      const expectedHeading = "My Profile";
      render(
        <BrowserRouter>
          <Provider store={store}>
            <ProfilePage />
          </Provider>
        </BrowserRouter>
      );

      const heading = screen.getByRole("heading", { name: expectedHeading });

      expect(heading).toBeInTheDocument();
    });
  });
});
