import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/hooks";

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
