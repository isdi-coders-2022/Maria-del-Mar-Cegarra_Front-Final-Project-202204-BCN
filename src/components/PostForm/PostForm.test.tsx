import { render, screen, waitFor } from "@testing-library/react";
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

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/add-post",
  }),
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

    describe("Then it should render an input type file", () => {
      const expectedFileLabelText = "Picture";
      const expectedAltImage = "Your uploads";
      const expectedIdButton = "Delete";
      const fileValue = [{ picture: "PictureName" }];
      const pictureString = JSON.stringify(fileValue);
      const pictureBlob = new Blob([pictureString]);
      const pictureFile = new File([pictureBlob], "values.json", {
        type: "application/JSON",
      });
      global.URL.createObjectURL = jest.fn();

      test("And render an image and a delete button when clicked", async () => {
        render(
          <BrowserRouter>
            <Provider store={store}>
              <PostForm />
            </Provider>
          </BrowserRouter>
        );

        const fileInput = screen.getByLabelText(expectedFileLabelText);
        userEvent.upload(fileInput, pictureFile);
        const image = screen.getByRole("img", { name: expectedAltImage });
        const button = screen.getByTestId(expectedIdButton);

        await waitFor(() => expect(image).toBeInTheDocument());
        await waitFor(() => expect(button).toBeInTheDocument());
      });
    });
  });
});
