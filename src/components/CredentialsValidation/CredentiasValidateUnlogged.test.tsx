import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store/store";
import CredentialsValidation from "./CredentialsValidation";

let mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Given the CredentialsValidate component", () => {
  describe("When its invoked receiving a JSX element and its not logged", () => {
    test("Then it should call navigate function to '/login'", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <CredentialsValidation children={<h1>Hola</h1>} />
          </Provider>
        </BrowserRouter>
      );

      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
