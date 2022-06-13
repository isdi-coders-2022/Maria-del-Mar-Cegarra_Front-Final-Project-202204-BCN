import { useEffect } from "react";
import PostsList from "../../components/PostsList/PostsList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { loadUserPostsThunk } from "../../redux/thunks/postsThunks";

const ProfilePage = (): JSX.Element => {
  const profilePosts = useAppSelector((state) => state.posts.userPosts);
  const page = useAppSelector((state) => state.pagination.userPostsPage);
  const { id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const pageSize = 10;
    dispatch(loadUserPostsThunk(id, pageSize, page));
  }, [dispatch, id, page]);

  return (
    <div className="backdrop-blur-md absolute border rounded-3xl content-center inset-x-0 bottom-0 top-16">
      <h1 className="text-6xl m-4 font-semibold">My Profile</h1>
      <PostsList posts={profilePosts} />
    </div>
  );
};

export default ProfilePage;
