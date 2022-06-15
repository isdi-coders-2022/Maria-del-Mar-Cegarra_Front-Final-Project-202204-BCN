import { mockPosts } from "../../../mocks/postMocks";
import { RootState } from "../../store/store";
import postsSlice, {
  selectPost,
  createPostActionCreator,
  deletePostActionCreator,
  loadPublicPostsActionCreator,
  loadUserPostsActionCreator,
  PostsState,
  editPostActionCreator,
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
    test("Then it should return the previus state with the same posts in its publicPosts property", () => {
      const previusState: PostsState = {
        publicPosts: [],
        userPosts: [],
      };
      const expectedPublicPosts = mockPosts;
      const expectedState: PostsState = {
        ...previusState,
        publicPosts: [...expectedPublicPosts],
      };

      const currentState = postsSlice(
        previusState,
        loadPublicPostsActionCreator(expectedPublicPosts)
      );

      expect(currentState).toEqual(expectedState);
    });
  });

  describe("When it receives a loadUserPostsActionCreator with 2 posts by payload", () => {
    test("Then it should return the state with", () => {
      const previusState: PostsState = {
        publicPosts: [],
        userPosts: [],
      };
      const expectedUserPosts = mockPosts;
      const expectedState: PostsState = {
        ...previusState,
        userPosts: [...expectedUserPosts],
      };

      const currentState = postsSlice(
        previusState,
        loadUserPostsActionCreator(expectedUserPosts)
      );

      expect(currentState).toEqual(expectedState);
    });
  });

  describe("When it receives a deletePostActionCreator with an id ''", () => {
    test("Then it should return the previus state without the post with this id", () => {
      const id = "2323";
      const previusState: PostsState = {
        publicPosts: mockPosts,
        userPosts: [],
      };
      const expectedPublicPosts = mockPosts.filter(
        (mockPost) => mockPost.id !== id
      );
      const expectedState: PostsState = {
        ...previusState,
        publicPosts: [...expectedPublicPosts],
      };

      const currentState = postsSlice(
        previusState,
        deletePostActionCreator(id)
      );

      expect(currentState).toEqual(expectedState);
    });
  });

  describe("When it receives a createPostsActionCreator with a new post", () => {
    test("Then it should add the post to publicPosts and userPosts of the reducer", () => {
      const newPost = mockPosts[2];
      const previusState: PostsState = {
        publicPosts: [mockPosts[0], mockPosts[1]],
        userPosts: [mockPosts[0], mockPosts[1]],
      };
      const expectedPublicPosts = {
        ...previusState,
        publicPosts: [...previusState.publicPosts, newPost],
        userPosts: [...previusState.userPosts, newPost],
      };

      const currentState = postsSlice(
        previusState,
        createPostActionCreator(newPost)
      );

      expect(currentState).toEqual(expectedPublicPosts);
    });
  });

  describe("When it receives the previus state and editPostActionCreator with '2323'", () => {
    test("Then it should return th previous state without the post with id '2323'", () => {
      const postEdit = {
        ...mockPosts[0],
        caption: "mockcaption",
        hashtags: ["#hasChanged"],
      };
      const previusState: PostsState = {
        publicPosts: [mockPosts[0], mockPosts[1]],
        userPosts: [mockPosts[0], mockPosts[1]],
      };
      const expectedPostsState = {
        ...previusState,
        publicPosts: [postEdit, mockPosts[1]],
        userPosts: [postEdit, mockPosts[1]],
      };

      const currentState = postsSlice(
        previusState,
        editPostActionCreator(postEdit)
      );

      expect(currentState).toEqual(expectedPostsState);
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
          gallery: {
            name: "",
            location: "",
            id: "",
          },
          user: {
            id: "",
            name: "",
            username: "",
            profilePic: "",
            profilePicBackup: "",
          },
          likes: 0,
          comments: 0,
        },
        pagination: {
          publicPostsPage: 1,
          userPostsPage: 1,
        },
        loading: false,
      };

      const postsState = selectPost(state);

      expect(postsState).toEqual(state.posts);
    });
  });
});
