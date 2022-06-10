import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store/store";
import Modal from "./Modal";

describe("Given the Modal component", () => {
  describe("When its invoked", () => {
    test("Then it should render a button with 'Accept'", () => {
      const expectedButtonText = "Accept";
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Modal />
          </Provider>
        </BrowserRouter>
      );
      const button = screen.getByRole("button", { name: expectedButtonText });

      expect(button).toBeInTheDocument();
    });
  });
});
