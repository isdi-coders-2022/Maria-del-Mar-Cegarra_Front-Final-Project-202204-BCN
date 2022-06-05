import axios from "axios";
import { mockPosts } from "../../mocks/postMocks";
import { AxiosPostsReturn } from "../../types/PostTypes";
import { loadPublicPostsActionCreator } from "../features/postsSlice";
import {
  loadPublicPostsThunk,
  showAdviseLoadPublicPosts,
  showErrorLoadPublicPosts,
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
