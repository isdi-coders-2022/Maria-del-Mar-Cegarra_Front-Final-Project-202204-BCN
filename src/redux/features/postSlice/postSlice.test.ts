import postSlice, {
  deletePostDetailActionCreator,
  loadPostActionCreator,
} from "./postSlice";

const initialPostState = {
  picture: "",
  caption: "",
  hashtags: [],
  date: "",
  likes: 0,
  comments: 0,
  pictureBackup: "",
  gallery: {
    name: "",
    location: "",
    id: "",
  },
  user: {
    id: "",
    name: "",
    username: "",
    profilePic: "",
    profilePicBackup: "",
  },
};

const previusPostState = {
  picture: "algo",
  caption: "algo",
  hashtags: ["#algo"],
  date: "algo",
  likes: 0,
  comments: 0,
  pictureBackup: "",
  gallery: {
    name: "algo",
    location: "algo",
    id: "1234",
  },
  user: {
    id: "1234",
    name: "algo",
    username: "algo",
    profilePic: "",
    profilePicBackup: "",
  },
};
const post = {
  picture: "Picture of a mock of Tomas",
  caption: "It's Marion not Tomas",
  hashtags: ["#liar", "#mock"],
  date: "date zero",
  likes: 5,
  comments: 7,
  pictureBackup: "Picture of a mock of Tomas backup",
  gallery: {
    name: "Galerias Maldá",
    location: "pepepepe",
    id: "1234",
  },
  user: {
    id: "1234",
    name: "Mario",
    username: "MarioBeingTomas",
    profilePic: "Mario con gorro de mariachi",
    profilePicBackup: "Mario con gorro de mariachi backup",
  },
};
describe("Given the postSlice", () => {
  describe("When it receives the previous state and an unknown action", () => {
    test("Then it should return the same previous state", () => {
      const currentState = postSlice(previusPostState, {
        type: "unknown",
        payload: "anything",
      });

      expect(currentState).toEqual(previusPostState);
    });
  });

  describe("When it receives the previous state and a loadPost action creator", () => {
    test("Then it should return the Post received", () => {
      const currentState = postSlice(
        previusPostState,
        loadPostActionCreator(post)
      );

      expect(currentState).toEqual(post);
    });
  });

  describe("When it receives the previousState and deletePostActionCreator", () => {
    test("Then it should return the initial state", () => {
      const currentState = postSlice(
        previusPostState,
        deletePostDetailActionCreator()
      );

      expect(currentState).toEqual(initialPostState);
    });
  });
});
