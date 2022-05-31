import { render, screen } from "@testing-library/react";
import RegisterForm from "./RegisterForm";

describe("Given the RegisterForm component", () => {
  describe("When its invoked", () => {
    test("Then it should render 5 labels with accessible names: name, username, email, password, repeat password and a REGISTER submit", () => {
      const expectedLabels: string[] = [
        "Name",
        "Username",
        "Email",
        "Password",
        "Repeat password",
      ];

      render(<RegisterForm />);
      const allInputs = expectedLabels.map((expectedLabel) =>
        screen.getByLabelText(expectedLabel, { selector: "input" })
      );

      allInputs.forEach((input) => {
        expect(input).toBeInTheDocument();
      });
    });

    test("Then it should render a submit with accessible name 'REGISTER'", () => {
      const expectedSubmit: string = "REGISTER";

      render(<RegisterForm />);
      const submit = screen.getByRole("button", { name: expectedSubmit });

      expect(submit).toBeInTheDocument();
    });
  });
});
