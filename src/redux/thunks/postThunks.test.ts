import axios from "axios";
import { mockPosts } from "../../mocks/postMocks";
import { loadPostActionCreator } from "../features/postSlice/postSlice";
import { editPostActionCreator } from "../features/postsSlice/postsSlice";
import {
  editPostThunk,
  loadPostThunk,
  showErrorEditPost,
  showErrorLoadPost,
  showExitEditPost,
} from "./postThunk";

describe("Given the loadPostThunk", () => {
  describe("When it receives a post id '2323' and receives post from api", () => {
    test("Then it should call dispatch with loadPostActionCreator and the post received", async () => {
      const postId = "2323";
      const expectedPost = mockPosts[0];
      const mockAxiosReturn = {
        status: 200,
        data: { post: expectedPost },
      };
      const dispatch = jest.fn();
      const loadPostThunkTest = loadPostThunk(postId);
      const expectedAction = loadPostActionCreator(expectedPost);
      axios.get = jest.fn().mockResolvedValue(mockAxiosReturn);

      await loadPostThunkTest(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe("When it receives an id but no response from api", () => {
    test("Then dispatch should been called with showErrorLoadPost", async () => {
      const postId = "2323";
      const mockAxiosReturn = {
        status: 200,
        data: null,
      };
      const dispatch = jest.fn();
      const loadPostThunkTest = loadPostThunk(postId);
      const expectedAction = showErrorLoadPost;
      axios.get = jest.fn().mockResolvedValue(mockAxiosReturn);

      await loadPostThunkTest(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe("When it receives an id but an error on api response", () => {
    test("Then dispatch should been called with showErrorLoadPost", async () => {
      const postId = "2323";
      const mockAxiosReturn = new Error();
      const dispatch = jest.fn();
      const loadPostThunkTest = loadPostThunk(postId);
      const expectedAction = showErrorLoadPost;
      axios.get = jest.fn().mockResolvedValue(mockAxiosReturn);

      await loadPostThunkTest(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});

describe("Given the editPostThunk", () => {
  describe("When it receives a post id '2323' and post info and gets response from api", () => {
    test("Then dispatch should been called with editPostActionCreator", async () => {
      const postId = "2323";
      const postInfo = mockPosts[0];
      const mockAxiosReturn = {
        status: 204,
        data: {
          ...mockPosts[0],
        },
      };
      const dispatch = jest.fn();
      const editPostThunkTest = editPostThunk(postId, postInfo);
      const expectedAction = editPostActionCreator(mockPosts[0]);
      const expected3rdAction = showExitEditPost;
      axios.put = jest.fn().mockResolvedValue(mockAxiosReturn);

      await editPostThunkTest(dispatch);

      expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
      expect(dispatch).toHaveBeenNthCalledWith(3, expected3rdAction);
    });
  });

  describe("When it receives a post id '2323' and no data from api", () => {
    test("Then dispatch should been called with editPostActionCreator", async () => {
      const postId = "2323";
      const postInfo = mockPosts[0];
      const mockAxiosReturn = {
        status: 400,
        data: null,
      };
      const dispatch = jest.fn();
      const editPostThunkTest = editPostThunk(postId, postInfo);
      const expectedAction = showErrorEditPost;
      axios.put = jest.fn().mockResolvedValue(mockAxiosReturn);

      await editPostThunkTest(dispatch);

      expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
    });
  });

  describe("When it receives a post id '2323' and an error from api", () => {
    test("Then dispatch should been called with editPostActionCreator", async () => {
      const postId = "2323";
      const postInfo = mockPosts[0];
      const mockAxiosReturn = new Error();
      const dispatch = jest.fn();
      const editPostThunkTest = editPostThunk(postId, postInfo);
      const expectedAction = showErrorEditPost;
      axios.put = jest.fn().mockResolvedValue(mockAxiosReturn);

      await editPostThunkTest(dispatch);

      expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
    });
  });
});
