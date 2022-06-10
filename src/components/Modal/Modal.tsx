import { useEffect, useState } from "react";
import { closeUIActionCreator } from "../../redux/features/UISlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import CheckIcon from "../Icons/CheckIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import InfoIcon from "../Icons/infoIcon";
import WarningIcon from "../Icons/WarningIcon";

interface Style {
  colorButton: string;
  colorIcon: string;
  icon: JSX.Element;
  bgIcon: string;
}

type Error = "error";
type Advise = "advise";
type Confirmation = "confirmation";
type Styles = {
  [error in Error]: Style;
} & {
  [advise in Advise]: Style;
} & {
  [confirmation in Confirmation]: Style;
};

type Type = "error" | "advise" | "confirmation";

const Modal = (action: any): JSX.Element => {
  const { type, header, body } = useAppSelector((state) => state.ui);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(closeUIActionCreator());
    setModalOpen(false);
  };

  const checkModalOpen = (type: string): boolean | string =>
    type === "error" || type === "advise" || type === "confirmation"
      ? true
      : false;

  useEffect(() => {
    if (checkModalOpen(type)) {
      setModalOpen(true);
    }
  }, [dispatch, type]);

  const styles: Styles = {
    error: {
      colorButton: "button-red",
      colorIcon: "icon-red",
      icon: <ErrorIcon color="icon-red" />,
      bgIcon: "bg-icon-red",
    },
    advise: {
      colorButton: body === "" ? "button-green" : "button-amber",
      colorIcon: body === "" ? "icon-green" : "icon-amber",
      icon:
        body === "" ? (
          <CheckIcon color="icon-green" />
        ) : (
          <WarningIcon color="icon-amber" />
        ),
      bgIcon: body === "" ? "bg-icon-green" : "bg-icon-amber",
    },
    confirmation: {
      colorButton: "button-blue",
      colorIcon: "icon-blue",
      icon: <InfoIcon color="icon-blue" />,
      bgIcon: "bg-icon-blue",
    },
  };

  return (
    <>
      {modalOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={closeModal}
          ></div>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
                        styles[type as Type].bgIcon
                      } sm:mx-0 sm:h-10 sm:w-10`}
                    >
                      {modalOpen && styles[type as Type].icon}
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        {header}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{body}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                      styles[type as Type].colorButton
                    } text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
                    onClick={closeModal}
                  >
                    Accept
                  </button>
                  {type === "confirmation" && (
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={action}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
