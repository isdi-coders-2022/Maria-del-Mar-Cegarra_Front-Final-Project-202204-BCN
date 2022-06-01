import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../redux/store/store";
import LoginForm from "./LoginForm";

describe("Given the RegisterForm component", () => {
  const expectedLabels: string[] = ["Enter username", "Enter password"];
  describe("When its invoked", () => {
    test("Then it should render 5 labels with accessible names: name, username, email, password, repeat password and a REGISTER submit", () => {
      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      const allInputs = expectedLabels.map((expectedLabel) =>
        screen.getByLabelText(expectedLabel, { selector: "input" })
      );

      allInputs.forEach((input) => {
        expect(input).toBeInTheDocument();
      });
    });

    test("Then it should render a submit with accessible name 'Sign in'", () => {
      const expectedSubmit: string = "Sign in";

      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );
      const submit = screen.getByRole("button", { name: expectedSubmit });

      expect(submit).toBeInTheDocument();
    });
  });

  describe("When the user types 'asdfg' on the inputs", () => {
    test("Then the value of the inputs shoould be 'asdfg'", () => {
      const expectedInputValue: string = "asdfg";

      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );
      const allInputs = expectedLabels.map((expectedLabel) =>
        screen.getByLabelText(expectedLabel, { selector: "input" })
      );
      allInputs.forEach((input) => userEvent.type(input, expectedInputValue));

      allInputs.forEach((input) =>
        expect(input).toHaveValue(expectedInputValue)
      );
    });
  });

  describe("When the user clicks on submit", () => {
    test("Then the value of the inputs should be ''", () => {
      const expectedInputValue: string = "";
      const expectedSubmit: string = "Sign in";

      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );
      const allInputs = expectedLabels.map((expectedLabel) =>
        screen.getByLabelText(expectedLabel, { selector: "input" })
      );
      const submit = screen.getByRole("button", { name: expectedSubmit });
      userEvent.click(submit);

      allInputs.forEach((input) =>
        expect(input).toHaveValue(expectedInputValue)
      );
    });
  });
});
