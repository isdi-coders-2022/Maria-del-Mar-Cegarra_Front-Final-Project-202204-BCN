import loadingSlice, {
  notShowLoadingActionCreator,
  showLoadingActionCreator,
} from "./loadingSlice";

describe("Given the loadingSlice", () => {
  describe("When it receives the previous state and showLoadingActionCreator", () => {
    test("Then it return the state loading on true", () => {
      const previousLoadingState = false;
      const expectedLoadingState = true;

      const currentLoadingState = loadingSlice(
        previousLoadingState,
        showLoadingActionCreator
      );

      expect(currentLoadingState).toEqual(expectedLoadingState);
    });
  });

  describe("When it receives the previous state and notShowLoadingActionCreator", () => {
    test("Then it return the state loading on false", () => {
      const previousLoadingState = true;
      const expectedLoadingState = false;

      const currentLoadingState = loadingSlice(
        previousLoadingState,
        notShowLoadingActionCreator
      );

      expect(currentLoadingState).toEqual(expectedLoadingState);
    });
  });
});
