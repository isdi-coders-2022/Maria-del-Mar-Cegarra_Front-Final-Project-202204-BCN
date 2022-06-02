import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { registerUserThunk } from "../../redux/thunks/userThunks";
import { Label, RegisterFormData } from "../../types/UserTypes";
import AtIcon from "../Icons/AtIcon";
import CheckIcon from "../Icons/CheckIcon";
import CrossIcon from "../Icons/CrossIcon";
import EyeIcon from "../Icons/EyeIcon";
import UserIcon from "../Icons/UserIcon";

const blankForm: RegisterFormData = {
  name: "",
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const RegisterForm = (): JSX.Element => {
  const [formData, setFormData] = useState<RegisterFormData>(blankForm);
  const dispatch = useAppDispatch();
  const labels: Label[] = [
    {
      id: "name",
      type: "text",
      text: "Enter your name",
      icon: <UserIcon />,
    },
    {
      id: "username",
      type: "text",
      text: "Create username",
      icon: <UserIcon />,
    },
    {
      id: "email",
      type: "email",
      text: "Enter your email",
      icon: <AtIcon />,
    },
    {
      id: "password",
      type: "password",
      text: "Create password",
      icon: <EyeIcon />,
    },
    {
      id: "repeatPassword",
      type: "password",
      text: "Repeat password",
      icon: <></>,
    },
  ];

  const changeFormData = (event: {
    target: { id: string; value: string };
  }): void => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const submitFormData = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await dispatch(registerUserThunk(formData));
    setFormData(blankForm);
  };

  const checkPassword = (): boolean =>
    formData.repeatPassword
      ? formData.password === formData.repeatPassword
      : false;

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
          <p className="text-2xl font-bold text-left text-indigo-600 sm:text-3xl">
            Register
          </p>
          {labels.map((label) => (
            <div>
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
                  {label.id === "repeatPassword" ? (
                    checkPassword() ? (
                      <CheckIcon />
                    ) : (
                      <CrossIcon />
                    )
                  ) : (
                    label.icon
                  )}
                </span>
              </div>
            </div>
          ))}
          <button
            type="submit"
            onSubmit={submitFormData}
            className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
          >
            Sign up
          </button>

          <p className="text-sm text-center text-gray-500">
            Already have an account?
            <a className="underline" href="/login">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
