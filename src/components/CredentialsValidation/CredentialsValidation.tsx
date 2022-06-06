import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginActionCreator, selectUser } from "../../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { store } from "../../redux/store/store";
import { UserData } from "../../types/UserTypes";

interface Props {
  children: JSX.Element;
}

const CredentialsValidation = ({ children }: Props) => {
  const navigate = useNavigate();
  const { logged } = useAppSelector((state) => state.user);

  useEffect((): any => {
    if (!logged) {
      navigate("/login");
    }
  }, [navigate, logged]);
  return children;
};

export default CredentialsValidation;
