import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store/store";
import RegisterForm from "./RegisterForm";

describe("Given the RegisterForm component", () => {
  const expectedLabels: string[] = [
    "Enter your name",
    "Create username",
    "Enter your email",
    "Create password",
    "Repeat password",
  ];
  describe("When its invoked", () => {
    test("Then it should render 5 labels with accessible names: name, username, email, password, repeat password and a REGISTER submit", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <RegisterForm />
          </Provider>
        </BrowserRouter>
      );
      const allInputs = expectedLabels.map((expectedLabel) =>
        screen.getByLabelText(expectedLabel, { selector: "input" })
      );

      allInputs.forEach((input) => {
        expect(input).toBeInTheDocument();
      });
    });

    test("Then it should render a submit with accessible name 'Sign up'", () => {
      const expectedSubmit: string = "Sign up";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <RegisterForm />
          </Provider>
        </BrowserRouter>
      );
      const submit = screen.getByRole("button", { name: expectedSubmit });

      expect(submit).toBeInTheDocument();
    });
  });

  test("Then it should render an SVG image", () => {
    const expectedNumberSVG = 5;

    render(
      <BrowserRouter>
        <Provider store={store}>
          <RegisterForm />
        </Provider>
      </BrowserRouter>
    );
    const svgs = screen.getAllByRole("img");

    expect(svgs).toHaveLength(expectedNumberSVG);
  });

  describe("When the user types 'asdfg' on the inputs", () => {
    test("Then the value of the inpust shoould be 'asdfg'", () => {
      const expectedInputValue: string = "asdfg";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <RegisterForm />
          </Provider>
        </BrowserRouter>
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
    test("Then the value of the inputs should be '' because of formData is set to blank fields", () => {
      const expectedInputValue: string = "";
      const expectedSubmit: string = "Sign up";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <RegisterForm />
          </Provider>
        </BrowserRouter>
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
