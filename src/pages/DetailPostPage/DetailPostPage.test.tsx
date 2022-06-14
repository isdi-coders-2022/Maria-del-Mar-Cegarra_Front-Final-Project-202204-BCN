import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store/store";
import DetailPostPage from "./DetailPostPage";

describe("Given the DetailsPostPage", () => {
  describe("When its invoked", () => {
    test("Then it should render a heading with ''", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <DetailPostPage />
          </Provider>
        </BrowserRouter>
      );
    });
  });
});
