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
    <div className="flex justify-center transition-all">
      <div className="backdrop-blur-md relative md:w-8/12 lg:w-8/12 border rounded-3xl center content-center bottom-0 top-16 mb-40">
        <h1 className="text-6xl m-4 font-semibold">Explore</h1>
        <PostsList posts={posts} />
      </div>
    </div>
  );
};

export default HomePage;
