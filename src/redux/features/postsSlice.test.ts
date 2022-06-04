import { mockPosts } from "../../mocks/postMocks";
import { RootState } from "../store/store";
import postsSlice, {
  loadPublicPostsActionCreator,
  PostState,
  selectPost,
} from "./postsSlice";

describe("Given the postsSlice function", () => {
  describe("When it receives an unknown action", () => {
    test("Then it should return the initialState", () => {
      const initialState: PostState = {
        publicPosts: [],
        userPosts: [],
        detailPost: {},
      };
      const expectedState: PostState = { ...initialState };

      const currentState = postsSlice(initialState, {
        type: "user/unknown",
        payload: "",
      });

      expect(currentState).toEqual(expectedState);
    });
  });

  describe("When it receives a loadPublicPosts with 2 posts on its payload", () => {
    test("Then it should return the initial state with the same posts in its publicPosts property", () => {
      const initialState: PostState = {
        publicPosts: [],
        userPosts: [],
        detailPost: {},
      };
      const expectedPublicPosts = mockPosts;
      const expectedState: PostState = {
        ...initialState,
        publicPosts: [...expectedPublicPosts],
      };

      const currentState = postsSlice(
        initialState,
        loadPublicPostsActionCreator(expectedPublicPosts)
      );

      expect(currentState).toEqual(expectedState);
    });
  });
});

describe("Given the selectPost function", () => {
  describe("When it receives the state of the store with a posts state", () => {
    test("Then it should return the posts state", () => {
      const state: RootState = {
        posts: {
          publicPosts: [],
          userPosts: [],
          detailPost: {},
        },
        user: {
          name: "",
          username: "",
          id: "",
          logged: true,
        },
        ui: {
          type: "",
          body: "",
          header: "",
        },
      };

      const postsState = selectPost(state);

      expect(postsState).toEqual(state.posts);
    });
  });
});
