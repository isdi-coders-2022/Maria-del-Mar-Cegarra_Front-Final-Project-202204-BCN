import { configureStore, createSlice } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { mockPosts } from "../../mocks/postMocks";
import { mockUserStateLogged } from "../../mocks/userMocks";
import DetailPostPage from "./DetailPostPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "2323",
  }),
}));

describe("Given the DetailsPostPage", () => {
  describe("When its invoked", () => {
    test("Then it should render a heading with ''", () => {
      const postMockSlice = createSlice({
        name: "post",
        initialState: mockPosts[0],
        reducers: {},
      });
      const userMockSlice = createSlice({
        name: "user",
        initialState: mockUserStateLogged,
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { post: postMockSlice.reducer, user: userMockSlice.reducer },
      });
      const expectedHeading = mockPosts[0].user.name;

      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <DetailPostPage />
          </Provider>
        </BrowserRouter>
      );

      const heading = screen.getByRole("heading", { name: expectedHeading });

      expect(heading).toBeInTheDocument();
    });
  });
});
