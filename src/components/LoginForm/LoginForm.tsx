import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { loginUserThunk } from "../../thunks/userThunks";
import { LoginFormData } from "../../types/UserTypes";

const blankForm: LoginFormData = {
  username: "",
  password: "",
};

const LoginForm = (): JSX.Element => {
  const [formData, setFormData] = useState<LoginFormData>(blankForm);
  const dispatch = useAppDispatch();

  const changeFormData = (event: {
    target: { id: string; value: string };
  }): void => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const submitFormData = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await dispatch(loginUserThunk(formData));
    setFormData(blankForm);
  };

  return (
    <>
      <form onSubmit={submitFormData} noValidate autoComplete="off">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username..."
          onChange={changeFormData}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          placeholder="Password..."
          onChange={changeFormData}
        />
        <input type="submit" value="LOGIN" onSubmit={submitFormData} />
      </form>
    </>
  );
};

export default LoginForm;
