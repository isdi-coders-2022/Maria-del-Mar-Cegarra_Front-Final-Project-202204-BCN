import prettifyDate from "./prettifyDate";

describe("Given the prettifyDate function", () => {
  describe("When it receives a date from 10s ago", () => {
    test("Then it should return '10 seconds ago'", () => {
      var postDate = new Date(Date.now());
      postDate.setSeconds(postDate.getSeconds() - 10);
      const postDateString = postDate.toString();
      const expectedDateString = "10 seconds ago";

      const datePrettified = prettifyDate(postDateString);

      expect(datePrettified).toBe(expectedDateString);
    });
  });

  describe("When it receives a date from 10 minutes ago", () => {
    test("Then it should return '10 minutes ago'", () => {
      var postDate = new Date(Date.now());
      postDate.setMinutes(postDate.getMinutes() - 10);
      const postDateString = postDate.toString();
      const expectedDateString = "10 minutes ago";

      const datePrettified = prettifyDate(postDateString);

      expect(datePrettified).toBe(expectedDateString);
    });
  });

  describe("When it receives a date from 10 hours ago", () => {
    test("Then it should return '10 hours ago'", () => {
      var postDate = new Date(Date.now());
      postDate.setHours(postDate.getHours() - 10);
      const postDateString = postDate.toString();
      const expectedDateString = "10 hours ago";

      const datePrettified = prettifyDate(postDateString);

      expect(datePrettified).toBe(expectedDateString);
    });
  });

  describe("When it receives a date from 3 days ago", () => {
    test("Then it should return '3 days ago'", () => {
      var postDate = new Date(Date.now());
      postDate.setHours(postDate.getHours() - 72);
      const postDateString = postDate.toString();
      const expectedDateString = "3 days ago";

      const datePrettified = prettifyDate(postDateString);

      expect(datePrettified).toBe(expectedDateString);
    });
  });

  describe("When it receives a date from 23rd of march of 2020", () => {
    test("Then it should return '23 of Mar of 2020'", () => {
      var postDate = new Date("2020-03-23T14:45:36Z");
      const postDateString = postDate.toString();
      const expectedDateString = "23 of Mar of 2020";

      const datePrettified = prettifyDate(postDateString);

      expect(datePrettified).toBe(expectedDateString);
    });
  });
});
