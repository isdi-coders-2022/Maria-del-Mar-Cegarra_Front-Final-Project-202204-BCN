import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store/store";
import PostForm from "./PostForm";

const mockDispatch = jest.fn();
jest.mock("../../redux/hooks/hooks", () => ({
  ...jest.requireActual("../../redux/hooks/hooks"),
  useAppDispatch: () => mockDispatch,
}));

describe("Given the PostForm component", () => {
  describe("When its invoked", () => {
    test("Then it should render 3 labels with texts 'Caption', 'Hashtags' and 'Gallery'", () => {
      const expectedLabels: string[] = ["Caption", "Hashtags", "Gallery"];
      render(
        <BrowserRouter>
          <Provider store={store}>
            <PostForm />
          </Provider>
        </BrowserRouter>
      );
      const labels = expectedLabels.map((expectedLabel) =>
        screen.getByLabelText(expectedLabel)
      );

      labels.map((label) => expect(label).toBeInTheDocument());
    });
  });

  test("Then it should render a submit and call dispatch when clicked", () => {
    const expectedSubmitText = "Add Post";
    render(
      <BrowserRouter>
        <Provider store={store}>
          <PostForm />
        </Provider>
      </BrowserRouter>
    );
    const submit = screen.getByRole("button", { name: expectedSubmitText });
    userEvent.click(submit);

    expect(mockDispatch).toHaveBeenCalled();
  });
});
