import { current } from "@reduxjs/toolkit";
import { mockPosts } from "../../mocks/postMocks";
import { RootState } from "../store/store";
import postsSlice, {
  createPostActionCreator,
  deletePostActionCreator,
  loadPublicPostsActionCreator,
  PostsState,
  selectPost,
} from "./postsSlice";

describe("Given the postsSlice function", () => {
  describe("When it receives an unknown action", () => {
    test("Then it should return the initialState", () => {
      const initialState: PostsState = {
        publicPosts: [],
        userPosts: [],
      };
      const expectedState: PostsState = { ...initialState };

      const currentState = postsSlice(initialState, {
        type: "user/unknown",
        payload: "",
      });

      expect(currentState).toEqual(expectedState);
    });
  });

  describe("When it receives a loadPublicPosts with 2 posts on its payload", () => {
    test("Then it should return the initial state with the same posts in its publicPosts property", () => {
      const initialState: PostsState = {
        publicPosts: [],
        userPosts: [],
      };
      const expectedPublicPosts = mockPosts;
      const expectedState: PostsState = {
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

  describe("When it receives a deletePostActionCreator with an id ''", () => {
    test("Then it should return the initial state without the post with this id", () => {
      const id = "2323";
      const initialState: PostsState = {
        publicPosts: mockPosts,
        userPosts: [],
      };
      const expectedPublicPosts = mockPosts.filter(
        (mockPost) => mockPost.id !== id
      );
      const expectedState: PostsState = {
        ...initialState,
        publicPosts: [...expectedPublicPosts],
      };

      const currentState = postsSlice(
        initialState,
        deletePostActionCreator(id)
      );

      expect(currentState).toEqual(expectedState);
    });
  });

  describe("When it receives a createPostsActionCreator with a new post", () => {
    test("Then it should add the post to publicPosts and userPosts of the reducer", () => {
      const newPost = mockPosts[2];
      const initialState: PostsState = {
        publicPosts: [mockPosts[0], mockPosts[1]],
        userPosts: [mockPosts[0], mockPosts[1]],
      };
      const expectedPublicPosts = {
        ...initialState,
        publicPosts: [...initialState.publicPosts, newPost],
        userPosts: [...initialState.userPosts, newPost],
      };

      const currentState = postsSlice(
        initialState,
        createPostActionCreator(newPost)
      );

      expect(currentState).toEqual(expectedPublicPosts);
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
        post: {
          picture: "",
          caption: "",
          hashtags: [],
          date: "",
          gallery: "",
          likes: 0,
          comments: 0,
        },
        pagination: {
          publicPostsPage: 1,
          userPostsPage: 1,
        },
      };

      const postsState = selectPost(state);

      expect(postsState).toEqual(state.posts);
    });
  });
});
