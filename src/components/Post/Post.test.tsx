import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { mockPosts } from "../../mocks/postMocks";
import { store } from "../../redux/store/store";
import { deletePostThunk } from "../../redux/thunks/postsThunks";
import Post from "./Post";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({ pathname: "/my-profile" }),
}));

const mockDispatch = jest.fn();

jest.mock("../../redux/hooks/hooks", () => ({
  ...jest.requireActual("../../redux/hooks/hooks"),
  useAppDispatch: () => mockDispatch,
}));

describe("Given the Post component", () => {
  describe("When its invoken and receives a post object", () => {
    test("Then it should render an image with the alternative test as its caption", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Post post={mockPosts[0]} />
          </Provider>
        </BrowserRouter>
      );

      const image = screen.getByRole("img", { name: mockPosts[0].caption });

      expect(image).toBeInTheDocument();
    });
  });

  describe("When its invoked and receives a post object and /my-profile page", () => {
    test("Then it should render a button 'DELETE'", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Post post={mockPosts[0]} />
          </Provider>
        </BrowserRouter>
      );

      const buttonDelete = screen.getByRole("button", { name: "Delete" });

      expect(buttonDelete).toBeInTheDocument();
    });

    test("Then it should call dispatch with deletePostThunk when clicked", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Post post={mockPosts[0]} />
          </Provider>
        </BrowserRouter>
      );
      const deletePost = deletePostThunk(mockPosts[0].id);

      const buttonDelete = screen.getByRole("button", { name: "Delete" });
      userEvent.click(buttonDelete);

      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
