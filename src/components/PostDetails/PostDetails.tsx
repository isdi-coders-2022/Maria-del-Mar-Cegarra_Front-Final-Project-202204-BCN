import { useNavigate } from "react-router-dom";
import { deletePostDetailActionCreator } from "../../redux/features/postSlice/postSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { deletePostThunk } from "../../redux/thunks/postsThunks";
import { showConfirmationDeletePost } from "../../redux/thunks/UIThunks";
import { IPost } from "../../types/PostTypes";
import prettifyDate from "../utils/prettifyDate";

interface Props {
  post: IPost;
}

const PostDetails = ({
  post: {
    id,
    user: { id: userId, name, username, profilePic, profilePicBackup },
    picture,
    caption,
    date,
    pictureBackup,
    gallery: { name: galleryName, location },
    comments,
    likes,
  },
}: Props): JSX.Element => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: loggedUserId } = useAppSelector((state) => state.user);

  const goToEdit = () => {
    navigate(`/post/edit/${id}`);
  };

  const deletePost = (): void => {
    dispatch(deletePostThunk(id));
    dispatch(deletePostDetailActionCreator());
    navigate("/home");
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="lg:w-8/12 md:w-10/12 p-4 rounded-2xl bg-violet-200 shadow-lg  flex flex-col ease-linear duration-200 md:flex-row">
          <div className="relative">
            <div className="flex my-2">
              <div className="rounded-full h-16 w-16 bg-gray-500 flex items-center justify-center overflow-hidden">
                <img
                  src={`${apiUrl}uploads/${profilePic}`}
                  onError={(error: any) => {
                    let backupSrc = profilePicBackup ? profilePicBackup : "";
                    (error.target as HTMLImageElement).onerror = null;
                    (error.target as HTMLImageElement).src =
                      backupSrc as string;
                  }}
                  alt="profilepic"
                />
              </div>
              <span className="py-3 ml-5 font-bold text-xl">{name}</span>
              <span className="px-2 hover:bg-gray-300 cursor-pointer rounded">
                <i className="fas fa-ellipsis-h pt-2 text-lg"></i>
              </span>
            </div>
            <div className="w-full shadow-md rounded-2xl relative">
              <div className="w-full relative rounded-2xl">
                <img
                  src={`${apiUrl}uploads/${picture}`}
                  onError={(error: any) => {
                    let backupSrc = pictureBackup ? pictureBackup : "";
                    (error.target as HTMLImageElement).onerror = null;
                    (error.target as HTMLImageElement).src =
                      backupSrc as string;
                  }}
                  alt="Post"
                  className=" rounded-2xl"
                />
              </div>
            </div>
          </div>
          <div className="md:mx-10 md:pt-16 flex flex-col justify-evenly">
            <div className="pb-2">
              <div className="pt-2">
                <i className="far fa-heart cursor-pointer"></i>
                <span className="text-sm text-gray-400 font-medium">
                  {likes}
                </span>
              </div>
              <div className="pt-1">
                <span className="font-medium mr-2">{prettifyDate(date)}</span>
                <div className="mb-2 text-lg">
                  <span className="font-medium mr-2">{username}</span>
                  {caption}
                </div>
              </div>
              <div className="text-md mb-2 text-gray-400 cursor-pointer font-medium">
                View all {comments} comments
              </div>
            </div>

            <div className="flex flex-row items-center bg-violet-400 rounded-md cursor-pointer shadow-md shadow-[#5865f28a] hover:bg-violet-500 ease-linear duration-200">
              <i className="p-2">
                <img
                  src="/maps-icon.png"
                  width="50px"
                  height="50px"
                  alt="maps icon"
                />
              </i>
              <p className="m-2 text-white text-md font-regular">
                {galleryName}
              </p>
            </div>

            {userId === loggedUserId && (
              <div className="flex flex-row">
                <button
                  className="md:m-2 m-auto mt-8 bg-violet-500 shadow-md shadow-[#5865f28a]  py-2 px-6 rounded-xl  hover:bg-violet-600 ease-linear duration-200"
                  onClick={goToEdit}
                >
                  <span className="text-white text-md font-semibold">Edit</span>
                </button>
                <button
                  className="md:m-2 m-auto mt-8 bg-red-600 shadow-md shadow-[#5865f28a]  py-2 px-6 rounded-xl  hover:bg-red-700 ease-linear duration-200"
                  onClick={() =>
                    dispatch(showConfirmationDeletePost(deletePost))
                  }
                >
                  <span className="text-white text-md font-semibold">
                    Delete
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
