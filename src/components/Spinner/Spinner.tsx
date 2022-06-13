import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

const Spinner = (): JSX.Element => {
  const { type } = useAppSelector((state) => state.ui);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (type === "loading") {
      setIsLoading(true);
    }
  }, [type, dispatch]);

  return (
    <>
      {isLoading && (
        <div className="absolute">
          <div className="w-12 h-12 rounded-full animate-spinborder-y border-solid border-violet-700 border-t-transparent shadow-md"></div>
        </div>
      )}
    </>
  );
};

export default Spinner;
