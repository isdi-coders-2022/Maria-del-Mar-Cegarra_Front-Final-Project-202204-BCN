import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/hooks";

interface Props {
  children: JSX.Element;
}

const CredentialsValidation = ({ children }: Props) => {
  const navigate = useNavigate();
  const { logged } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  useEffect((): any => {
    if (!logged) {
      navigate("/login");
    } else {
      if (["/login", "/register"].includes(pathname)) {
        navigate("/home");
      }
    }
  }, [navigate, logged, pathname]);
  return children;
};

export default CredentialsValidation;
