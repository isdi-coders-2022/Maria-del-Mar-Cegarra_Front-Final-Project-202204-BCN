import { useEffect } from "react";
import { useLocation } from "react-router";

interface Props {
  children: JSX.Element;
}

const ScrollToTop = ({ children }: Props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;
