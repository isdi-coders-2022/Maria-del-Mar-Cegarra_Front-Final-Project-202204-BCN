import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store/store";
import CredentialsValidation from "./CredentialsValidation";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

let mockedToken = "uwuwu";
jest.mock("jwt-decode", () => () => mockedToken);

const saveToStorage = (value: string) => {
  window.localStorage.setItem("token", value);
};

describe("Given the CredentialsValidation component", () => {
  describe("When its invoked and receives a children JSX element and there is a token in the localStorage", () => {
    test("Then it should render the children JSX element and", () => {
      saveToStorage("token");
      render(
        <BrowserRouter>
          <Provider store={store}>
            <CredentialsValidation children={<h1>Hola</h1>} />
          </Provider>
        </BrowserRouter>
      );
      const expectedHeading = screen.getByRole("heading", { name: "Hola" });

      expect(expectedHeading).toBeInTheDocument();
    });
  });
});
