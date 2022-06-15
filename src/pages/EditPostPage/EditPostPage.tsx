import { useParams } from "react-router-dom";
import PostForm from "../../components/PostForm/PostForm";

const EditPostPage = (): JSX.Element => {
  const { postId } = useParams();
  return (
    <div className="backdrop-blur-md relative min-h-screen border rounded-3xl content-center inset-x-0 bottom-0 top-16 mb-40">
      <h1 className="text-6xl m-4 font-semibold">Edit Post</h1>
      <PostForm postId={postId} />
    </div>
  );
};

export default EditPostPage;
