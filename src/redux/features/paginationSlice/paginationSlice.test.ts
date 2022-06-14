import paginationSlice, {
  goToStartPublicPostsActionCreator,
  goToStartUserPostsActionCreator,
  loadMorePublicPostsActionCreator,
  loadMoreUserPostsActionCreator,
} from "./paginationSlice";

describe("Given the paginationSlice", () => {
  describe("When it receives the previous state at page 4 of public posts and loadMorePublicPostsActionCreator", () => {
    test("Then it should return the current state with page 5 of public posts", () => {
      const previousState = {
        publicPostsPage: 4,
        userPostsPage: 1,
      };
      const expectedState = {
        publicPostsPage: 5,
        userPostsPage: 1,
      };

      const currentState = paginationSlice(
        previousState,
        loadMorePublicPostsActionCreator()
      );

      expect(currentState).toEqual(expectedState);
    });
  });
  describe("When it receives the previous state at page 4 of public posts and loadMoreUserPostsActionCreator", () => {
    test("Then it should return the current state with page 5 of public posts", () => {
      const previousState = {
        publicPostsPage: 1,
        userPostsPage: 4,
      };
      const expectedState = {
        publicPostsPage: 1,
        userPostsPage: 5,
      };

      const currentState = paginationSlice(
        previousState,
        loadMoreUserPostsActionCreator()
      );

      expect(currentState).toEqual(expectedState);
    });
  });
  describe("When it receives the previous state at page 4 of public posts and goToStartPublicPostsActionCreator", () => {
    test("Then it should return the current state with page 1 of public posts", () => {
      const previousState = {
        publicPostsPage: 4,
        userPostsPage: 4,
      };
      const expectedState = {
        publicPostsPage: 1,
        userPostsPage: 4,
      };

      const currentState = paginationSlice(
        previousState,
        goToStartPublicPostsActionCreator()
      );

      expect(currentState).toEqual(expectedState);
    });
  });
  describe("When it receives the previous state at page 4 of public posts and goToStartUserPostsActionCreator", () => {
    test("Then it should return the current state with page 1 of public posts", () => {
      const previousState = {
        publicPostsPage: 4,
        userPostsPage: 4,
      };
      const expectedState = {
        publicPostsPage: 4,
        userPostsPage: 1,
      };

      const currentState = paginationSlice(
        previousState,
        goToStartUserPostsActionCreator()
      );

      expect(currentState).toEqual(expectedState);
    });
  });
});
