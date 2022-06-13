import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { deletePostThunk } from "../../redux/thunks/postsThunks";
import { showConfirmationDeletePost } from "../../redux/thunks/UIThunks";
import { IPost } from "../../types/PostTypes";
import prettifyDate from "../utils/prettifyDate";

interface Props {
  post: IPost;
}

const Post = ({
  post: { id, user, picture, date, pictureBackup, caption, likes, comments },
}: Props): JSX.Element => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const deletePost = (): void => {
    dispatch(deletePostThunk(id));
  };

  const goToDetails = (): void => {
    navigate(`/post/${id}`);
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <div className=" rounded overflow-hidden border w-screen lg:w-6/12 md:w-6/12 bg-violet-200 my-8">
      <div className="w-full flex justify-between p-3">
        <div className="flex">
          <div className="rounded-full h-16 w-16 bg-gray-500 flex items-center justify-center overflow-hidden">
            <img src="userimage" alt="profilepic" />
          </div>
          <span className="py-3 ml-5 font-bold text-2xl">{user}</span>
        </div>
        <span className="px-2 hover:bg-gray-300 cursor-pointer rounded">
          <i className="fas fa-ellipsis-h pt-2 text-lg"></i>
        </span>
        {pathname === "/my-profile" && (
          <>
            <button
              type="button"
              className="text-white bg-violet-500 focus:outline-none focus:ring-4 focus:ring-purple-300 font-large rounded-full text-lg px-5 py-2.5 text-center mb-2 hover:bg-violet-600 ease-linear duration-200"
              onClick={() => dispatch(showConfirmationDeletePost(deletePost))}
            >
              Delete
            </button>
          </>
        )}
      </div>
      <img
        onClick={goToDetails}
        className="w-full bg-cover"
        alt={caption}
        src={`${apiUrl}uploads/${picture}`}
        onError={(error: any) => {
          let backupSrc = pictureBackup ? pictureBackup : "";
          (error.target as HTMLImageElement).onerror = null;
          (error.target as HTMLImageElement).src = backupSrc as string;
        }}
      />
      <div className="px-3 pb-2">
        <div className="pt-2">
          <i className="far fa-heart cursor-pointer"></i>

          <span className="text-sm text-gray-400 font-medium">{likes}</span>
        </div>
        <div className="pt-1">
          <span className="font-medium mr-2">{prettifyDate(date)}</span>
          <div className="mb-2 text-2xl">
            <span className="font-medium mr-2">User</span>
            {caption}
          </div>
        </div>
        <div className="text-md mb-2 text-gray-400 cursor-pointer font-medium">
          View all {comments} comments
        </div>
      </div>
    </div>
  );
};

export default Post;
