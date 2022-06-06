import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginActionCreator } from "../../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { UserData } from "../../types/UserTypes";

interface Props {
  children: JSX.Element;
}

const CredentialsValidation = ({ children }: Props) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect((): any => {
    if (!token) {
      navigate("/login");
      return null;
    }
    if (token) {
      const userData: UserData = jwtDecode(token as string);
      dispatch(
        loginActionCreator({
          name: userData.name,
          username: userData.username,
          id: userData.id,
          logged: true,
        })
      );
    }
  }, [dispatch, navigate, token]);
  return children;
};

export default CredentialsValidation;
