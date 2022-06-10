import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { deletePostThunk } from "../../redux/thunks/postsThunks";
import { IPost } from "../../types/PostTypes";

interface Props {
  post: IPost;
}

const Post = ({ post }: Props): JSX.Element => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const deletePost = (): void => {
    dispatch(deletePostThunk(post.id));
  };

  const goToDetails = (): void => {
    navigate(`post/${post.id}`);
  };

  return (
    <div className=" rounded overflow-hidden border w-screen lg:w-6/12 md:w-6/12 bg-purple-200 my-8">
      <div className="w-full flex justify-between p-3">
        <div className="flex">
          <div className="rounded-full h-16 w-16 bg-gray-500 flex items-center justify-center overflow-hidden">
            <img src="" alt="profilepic" />
          </div>
          <span className="py-3 ml-5 font-bold text-2xl">User</span>
        </div>
        <span className="px-2 hover:bg-gray-300 cursor-pointer rounded">
          <i className="fas fa-ellipsis-h pt-2 text-lg"></i>
        </span>
        {pathname === "/my-profile" && (
          <button
            type="button"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-large rounded-full text-lg px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={deletePost}
          >
            Delete
          </button>
        )}
      </div>
      <img
        onClick={goToDetails}
        className="w-full bg-cover"
        src={post.picture}
        alt={post.caption}
      />
      <div className="px-3 pb-2">
        <div className="pt-2">
          <i className="far fa-heart cursor-pointer"></i>
          <span className="text-sm text-gray-400 font-medium">
            {post.likes}
          </span>
        </div>
        <div className="pt-1">
          <div className="mb-2 text-2xl">
            <span className="font-medium mr-2">User</span>
            {post.caption}
          </div>
        </div>
        <div className="text-md mb-2 text-gray-400 cursor-pointer font-medium">
          View all {post.comments} comments
        </div>
      </div>
    </div>
  );
};

export default Post;
