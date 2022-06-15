import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { mockPosts } from "../../mocks/postMocks";
import { store } from "../../redux/store/store";
import PostDetails from "./PostDetails";

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../../redux/hooks/hooks", () => ({
  ...jest.requireActual("../../redux/hooks/hooks"),
  useAppDispatch: () => mockDispatch,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Given the DetailPost component", () => {
  describe("When its invoked receiving a post object", () => {
    test("Then it should render 3 images", () => {
      const expectedNumberImages = 3;

      render(
        <BrowserRouter>
          <Provider store={store}>
            <PostDetails post={mockPosts[0]} />
          </Provider>
        </BrowserRouter>
      );

      const images = screen.getAllByRole("img");

      expect(images).toHaveLength(expectedNumberImages);
    });

    describe("When its invoked and the id of the user owner of the post matches with the id of the user logged", () => {
      test("Then it should render a button 'Edit' and call dispatch when clicked", () => {
        const expectedButton = "Edit";
        render(
          <BrowserRouter>
            <Provider store={store}>
              <PostDetails post={mockPosts[0]} />
            </Provider>
          </BrowserRouter>
        );

        const editButton = screen.getByRole("button", { name: expectedButton });
        userEvent.click(editButton);

        expect(mockNavigate).toHaveBeenCalled();
      });
    });

    test("Then it should render a button 'Delete' and call dispatch when clicked", () => {
      const expectedButton = "Delete";
      render(
        <BrowserRouter>
          <Provider store={store}>
            <PostDetails post={mockPosts[0]} />
          </Provider>
        </BrowserRouter>
      );

      const deleteButton = screen.getByRole("button", { name: expectedButton });
      userEvent.click(deleteButton);

      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
