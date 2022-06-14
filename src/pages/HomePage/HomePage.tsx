import { useEffect } from "react";
import PostsList from "../../components/PostsList/PostsList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { loadPublicPostsThunk } from "../../redux/thunks/postsThunks";

const HomePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.publicPosts);
  const { publicPostsPage } = useAppSelector((state) => state.pagination);

  useEffect(() => {
    const pageSize = 10;
    dispatch(loadPublicPostsThunk(pageSize, publicPostsPage));
  }, [dispatch, publicPostsPage]);

  return (
    <div className="backdrop-blur-md absolute border rounded-3xl content-center inset-x-0 bottom-0 top-16">
      <h1 className="text-6xl m-4 font-semibold">Explore</h1>
      <PostsList posts={posts} />
    </div>
  );
};

export default HomePage;
