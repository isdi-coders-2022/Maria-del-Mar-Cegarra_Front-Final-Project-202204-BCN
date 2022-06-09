import axios from "axios";
import { mockPosts } from "../../mocks/postMocks";
import { AxiosPostsReturn } from "../../types/PostTypes";
import {
  createPostActionCreator,
  deletePostActionCreator,
  loadPublicPostsActionCreator,
} from "../features/postsSlice";
import {
  createPostThunk,
  deletePostThunk,
  loadPublicPostsThunk,
  showAdviseLoadPublicPosts,
  showErrorCreatePost,
  showErrorDeletePost,
  showErrorLoadPublicPosts,
  showExitCreatePost,
  showExitDeletePost,
} from "./postsThunks";

describe("Given the loadPublicThunks function", () => {
  describe("When it receives 2 and 2", () => {
    test("Then it should call dispatch with loadPublicPostsActionCreator", async () => {
      const expectedPosts = [mockPosts[2], mockPosts[3]];
      const mockAxiosReturn: AxiosPostsReturn = {
        status: 200,
        data: {
          posts: expectedPosts,
        },
      };
      const dispatch = jest.fn();
      const loadPublicPostsThunkTest = loadPublicPostsThunk(2, 2);
      const expectedAction = loadPublicPostsActionCreator(expectedPosts);
      axios.get = jest.fn().mockResolvedValue(mockAxiosReturn);

      await loadPublicPostsThunkTest(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe("When it receives 2 and 10", () => {
    test("Then it should call dispatch with loadPublicPostsActionCreator", async () => {
      const mockAxiosReturn: AxiosPostsReturn = {
        status: 200,
        data: {
          posts: [],
        },
      };
      const dispatch = jest.fn();
      const loadPublicPostsThunkTest = loadPublicPostsThunk(2, 10);
      const expectedAction = showAdviseLoadPublicPosts;
      axios.get = jest.fn().mockResolvedValue(mockAxiosReturn);

      await loadPublicPostsThunkTest(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe("When it receives no data from call to api", () => {
    test("Then it should call dispatch with loadPublicPostsActionCreator", async () => {
      const mockAxiosReturn: AxiosPostsReturn = {
        status: 200,
        data: null,
      };
      const dispatch = jest.fn();
      const loadPublicPostsThunkTest = loadPublicPostsThunk(2, 10);
      const expectedAction = showErrorLoadPublicPosts;
      axios.get = jest.fn().mockResolvedValue(mockAxiosReturn);

      await loadPublicPostsThunkTest(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});

describe("Given the deletePostThunk function", () => {
  describe("When it receives '2323' and has data from axios", () => {
    test("Then it should call dispatch with deletePostActionCreator", async () => {
      const id = "2323";
      const expectedPosts = mockPosts.filter((mockPost) => mockPost.id !== id);
      const mockAxiosReturn: AxiosPostsReturn = {
        status: 200,
        data: {
          posts: expectedPosts,
        },
      };
      const dispatch = jest.fn();
      const deletePostThunkTest = deletePostThunk(id);
      const expectedAction = deletePostActionCreator(id);
      axios.delete = jest.fn().mockResolvedValue(mockAxiosReturn);

      await deletePostThunkTest(dispatch);

      expect(dispatch).toHaveBeenNthCalledWith(1, expectedAction);
    });

    test("Then it should call dispatch with showAdviseThunk with 'Post deleted correctly!' and ''", async () => {
      const id = "2323";
      const expectedPosts = mockPosts.filter((mockPost) => mockPost.id !== id);
      const mockAxiosReturn: AxiosPostsReturn = {
        status: 200,
        data: {
          posts: expectedPosts,
        },
      };
      const dispatch = jest.fn();
      const deletePostThunkTest = deletePostThunk(id);
      const expectedAction = showExitDeletePost;
      axios.delete = jest.fn().mockResolvedValue(mockAxiosReturn);

      await deletePostThunkTest(dispatch);

      expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
    });
  });

  describe("When it receives id '2323'", () => {
    test("Then it should call dispatch with showErrorDeletePost", async () => {
      const id = "2323";
      const mockAxiosReturn: AxiosPostsReturn = {
        status: 200,
        data: null,
      };
      const dispatch = jest.fn();
      const deletePostThunkTest = deletePostThunk(id);
      const expectedAction = showErrorDeletePost;
      axios.delete = jest.fn().mockResolvedValue(mockAxiosReturn);

      await deletePostThunkTest(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});

describe("Given the createPostThunk thunk", () => {
  describe("When it receives a post object and data from response api", () => {
    test("Then it should call dispatch with createPostActionCreator with the post by payload", async () => {
      const newPost = mockPosts[0];
      const mockAxiosReturn: AxiosPostsReturn = {
        status: 201,
        data: {
          post: mockPosts[0],
        },
      };
      const dispatch = jest.fn();
      const createPostThunkTest = createPostThunk(newPost);
      const expectedAction = createPostActionCreator(newPost);
      axios.post = jest.fn().mockResolvedValue(mockAxiosReturn);

      await createPostThunkTest(dispatch);

      expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
    });

    test("Then it should call dispatch with showExitCreatePost", async () => {
      const newPost = mockPosts[0];
      const mockAxiosReturn: AxiosPostsReturn = {
        status: 201,
        data: {
          post: mockPosts[0],
        },
      };
      const dispatch = jest.fn();
      const createPostThunkTest = createPostThunk(newPost);
      const expectedAction = showExitCreatePost;
      axios.post = jest.fn().mockResolvedValue(mockAxiosReturn);

      await createPostThunkTest(dispatch);

      expect(dispatch).toHaveBeenNthCalledWith(4, expectedAction);
    });
  });

  describe("When it receives no data from axios response", () => {
    test("Then it should call dispatch with showErrorCreatePost", async () => {
      const newPost = mockPosts[0];
      const mockAxiosReturn = new Error();
      const dispatch = jest.fn();
      const createPostThunkTest = createPostThunk(newPost);
      const expectedAction = showErrorCreatePost;
      axios.post = jest.fn().mockResolvedValue(mockAxiosReturn);

      await createPostThunkTest(dispatch);

      expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
    });
  });
});
