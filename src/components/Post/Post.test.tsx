import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { mockPosts } from "../../mocks/postMocks";
import { store } from "../../redux/store/store";
import Post from "./Post";

describe("Given the Post component", () => {
  describe("When its invoken and receives a post object", () => {
    test("Then it should render an image with the alternative test as its caption", () => {
      render(
        <Provider store={store}>
          <Post post={mockPosts[0]} />
        </Provider>
      );

      const image = screen.getByRole("img", { name: mockPosts[0].caption });

      expect(image).toBeInTheDocument();
    });
  });
});
