import { useState } from "react";
import { RegisterFormData } from "../../types/UserTypes";

const blankForm: RegisterFormData = {
  name: "",
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const RegisterForm = (): JSX.Element => {
  const [formData, setFormData] = useState<RegisterFormData>(blankForm);

  const changeFormData = (event: {
    target: { id: string; value: string };
  }): void => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  return (
    <>
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Name..."
          onChange={changeFormData}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username..."
          onChange={changeFormData}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder="Email..."
          onChange={changeFormData}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          placeholder="Password..."
          onChange={changeFormData}
        />
        <label htmlFor="repeatPassword">Repeat password</label>
        <input
          type="text"
          id="repeatPassword"
          placeholder="Repeat password..."
          onChange={changeFormData}
        />
        <input type="submit" value="REGISTER" />
      </form>
    </>
  );
};

export default RegisterForm;
