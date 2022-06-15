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
    if (!logged && !["/register", "/login"].includes(pathname)) {
      navigate("/login");
    }
    if (logged && pathname === "/register") {
      navigate("/home");
    }
    if (logged && pathname === "/login") {
      navigate("/home");
    }
    if (pathname === "/register" && !logged) {
      return;
    }
    if (pathname === "/login" && !logged) {
      return;
    }
  }, [navigate, logged, pathname]);
  return children;
};

export default CredentialsValidation;
