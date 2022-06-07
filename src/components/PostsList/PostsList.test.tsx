import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { mockPosts } from "../../mocks/postMocks";
import { store } from "../../redux/store/store";
import PostsList from "./PostsList";

describe("Given the PostsList component", () => {
  describe("When its invoked and receives an array with 8 posts", () => {
    test("Then it should render a list with 8 listitems with keys the post id", () => {
      const expectedPostsNumber = 8;
      render(
        <BrowserRouter>
          <Provider store={store}>
            <PostsList posts={mockPosts} />
          </Provider>
        </BrowserRouter>
      );
      const listPosts = screen.getAllByRole("listitem");

      expect(listPosts).toHaveLength(expectedPostsNumber);
    });
  });
});
