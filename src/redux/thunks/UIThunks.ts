import {
  closeUIActionCreator,
  showAdviseActionCreator,
  showConfirmationActionCreator,
  showErrorActionCreator,
} from "../features/UISlice";
import { AppDispatch } from "../store/store";

export const dispatchCloseUI = (dispatch: AppDispatch) => {
  dispatch(closeUIActionCreator());
};

export const showAdviseThunk =
  (header: string, body: string) => (dispatch: AppDispatch) => {
    dispatch(showAdviseActionCreator({ header, body }));
    setTimeout(dispatchCloseUI, 5000);
  };

export const showErrorThunk =
  (header: string, body: string) => (dispatch: AppDispatch) => {
    dispatch(showErrorActionCreator({ header, body }));
  };

export const showConfirmationThunk =
  (header: string, body: string) => (dispatch: AppDispatch) => {
    dispatch(showConfirmationActionCreator({ header, body }));
  };
