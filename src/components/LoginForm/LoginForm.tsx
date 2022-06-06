import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { loginUserThunk } from "../../redux/thunks/userThunks";
import { Label, LoginFormData } from "../../types/UserTypes";
import EyeIcon from "../Icons/EyeIcon";
import UserIcon from "../Icons/UserIcon";

const blankForm: LoginFormData = {
  username: "",
  password: "",
};

const LoginForm = (): JSX.Element => {
  const [formData, setFormData] = useState<LoginFormData>(blankForm);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const labels: Label[] = [
    {
      id: "username",
      type: "text",
      text: "Enter username",
      icon: <UserIcon color="text-gray-400" />,
    },
    {
      id: "password",
      type: "password",
      text: "Enter password",
      icon: <EyeIcon />,
    },
  ];

  const changeFormData = (event: {
    target: { id: string; value: string };
  }): void => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const submitFormData = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await dispatch(loginUserThunk(formData));
    setFormData(blankForm);

    navigate("/home");
  };

  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <form
          action="register"
          onSubmit={submitFormData}
          className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl"
          autoComplete="off"
          noValidate
        >
          <h1 className="text-2xl font-bold text-left text-indigo-600 sm:text-3xl">
            Log in
          </h1>
          {labels.map((label) => (
            <div key={label.id}>
              <label
                htmlFor={label.id}
                hidden={true}
                className="text-sm font-medium"
              >
                {label.text}
              </label>

              <div className="relative mt-1">
                <input
                  type={label.type}
                  id={label.id}
                  className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder={label.text}
                  onChange={changeFormData}
                />

                <span className="absolute inset-y-0 inline-flex items-center right-4">
                  {label.icon}
                </span>
              </div>
            </div>
          ))}
          <button
            type="submit"
            onSubmit={submitFormData}
            className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
          >
            Sign in
          </button>

          <p className="text-sm text-center text-gray-500">
            No account?
            <a className="underline" href="/register">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
