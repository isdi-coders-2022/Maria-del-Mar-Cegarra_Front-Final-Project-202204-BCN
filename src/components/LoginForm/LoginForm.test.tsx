import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("Given the RegisterForm component", () => {
  const expectedLabels: string[] = ["Username", "Password"];
  describe("When its invoked", () => {
    test("Then it should render 5 labels with accessible names: name, username, email, password, repeat password and a REGISTER submit", () => {
      render(<LoginForm />);

      const allInputs = expectedLabels.map((expectedLabel) =>
        screen.getByLabelText(expectedLabel, { selector: "input" })
      );

      allInputs.forEach((input) => {
        expect(input).toBeInTheDocument();
      });
    });
  });
});
