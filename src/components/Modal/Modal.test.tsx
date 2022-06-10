import { render, screen } from "@testing-library/react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Modal from "./Modal";
import userEvent from "@testing-library/user-event";

describe("Given the Modal component", () => {
  describe("When its invoked with any ui type among 'error', 'advise' or 'confirmation'", () => {
    test("Then it should render a button with 'Accept'", () => {
      const expectedButtonText = "Accept";

      const uiMockSlice = createSlice({
        name: "ui",
        initialState: { type: "error", header: "", body: "" },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { ui: uiMockSlice.reducer },
      });
      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <Modal />
          </Provider>
        </BrowserRouter>
      );
      const button = screen.getByRole("button", { name: expectedButtonText });

      expect(button).toBeInTheDocument();
    });

    test("Then it should close the modal when clicked", () => {
      const expectedButtonText = "Accept";
      const uiMockSlice = createSlice({
        name: "ui",
        initialState: { type: "error", header: "", body: "" },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { ui: uiMockSlice.reducer },
      });

      const { container } = render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <Modal />
          </Provider>
        </BrowserRouter>
      );
      const button = screen.getByRole("button", { name: expectedButtonText });
      userEvent.click(button);

      expect(container).toBeEmptyDOMElement();
    });
  });
  describe("When it invoked being the UI state type 'advise' with a body", () => {
    test("Then it should render a warning icon", () => {
      const uiMockSlice = createSlice({
        name: "ui",
        initialState: {
          type: "advise",
          header: "This is a header",
          body: "This is a body so it generates a warning icon",
        },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { ui: uiMockSlice.reducer },
      });
      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <Modal />
          </Provider>
        </BrowserRouter>
      );
      const icon = screen.getByRole("img");

      expect(icon).toBeInTheDocument();
    });
  });

  describe("When its invoked being the UI state type 'confirmation'", () => {
    test("Then it should render a button with 'Cancel'", () => {
      const expectedButtonText = "Cancel";

      const uiMockSlice = createSlice({
        name: "ui",
        initialState: { type: "confirmation", header: "", body: "" },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { ui: uiMockSlice.reducer },
      });
      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <Modal />
          </Provider>
        </BrowserRouter>
      );
      const button = screen.getByRole("button", { name: expectedButtonText });

      expect(button).toBeInTheDocument();
    });
  });

  describe("When it's invoked with UI state type being 'something'", () => {
    test("Then it should not render the modal", () => {
      const uiMockSlice = createSlice({
        name: "ui",
        initialState: { type: "something", header: "", body: "" },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { ui: uiMockSlice.reducer },
      });
      const { container } = render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <Modal />
          </Provider>
        </BrowserRouter>
      );

      expect(container).toBeEmptyDOMElement();
    });
  });
});
