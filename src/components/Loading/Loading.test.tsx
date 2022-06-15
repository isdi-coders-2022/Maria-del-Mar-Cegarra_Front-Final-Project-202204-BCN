import { configureStore, createSlice } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Loading from "./Loading";

describe("Given the Loading component", () => {
  describe("When its invoked when the state of loading slice is true", () => {
    test("Then it should render an image", () => {
      const mockLoadingSlice = createSlice({
        name: "loading",
        initialState: true,
        reducers: {},
      });

      const mockLoadingStore = configureStore({
        reducer: { loading: mockLoadingSlice.reducer },
      });

      render(
        <Provider store={mockLoadingStore}>
          <Loading />
        </Provider>
      );

      const loading = screen.getByRole("status");

      expect(loading).toBeInTheDocument();
    });
  });
});
