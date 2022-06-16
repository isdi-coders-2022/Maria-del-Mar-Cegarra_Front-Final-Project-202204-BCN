import PostForm from "../../components/PostForm/PostForm";

const AddPostPage = (): JSX.Element => {
  return (
    <div className="flex justify-center transition-all">
      <div className="backdrop-blur-md relative md:w-8/12 lg:w-8/12 border rounded-3xl center content-center bottom-0 top-16 pb-40">
        <h1 className="text-6xl m-4 font-semibold">Add Post</h1>
        <PostForm />
      </div>
    </div>
  );
};

export default AddPostPage;
