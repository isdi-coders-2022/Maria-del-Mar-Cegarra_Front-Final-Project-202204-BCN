import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

describe("Given the ScrollToTop component", () => {
  describe("When its invoked and receives a children component", () => {
    test("Then it should call window.scrollTo with {top: 0, behavior: 'smooth'}", () => {
      const expectedScroll = { top: 0, behavior: "smooth" };
      const spyScrollTo = jest.fn();
      Object.defineProperty(global.window, "scrollTo", { value: spyScrollTo });

      render(
        <BrowserRouter>
          <ScrollToTop>
            <h1>Hola</h1>
          </ScrollToTop>
        </BrowserRouter>
      );

      expect(spyScrollTo).toHaveBeenCalledWith(expectedScroll);
    });
  });
});
