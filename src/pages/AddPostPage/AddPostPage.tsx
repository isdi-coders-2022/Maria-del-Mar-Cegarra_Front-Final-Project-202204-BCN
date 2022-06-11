import PostForm from "../../components/PostForm/PostForm";

const AddPostPage = (): JSX.Element => {
  return (
    <div className="backdrop-blur-md absolute border rounded-3xl content-center inset-x-0 bottom-0 top-16">
      <h1 className="text-6xl m-4 font-semibold">Add Post</h1>
      <PostForm />
    </div>
  );
};

export default AddPostPage;
