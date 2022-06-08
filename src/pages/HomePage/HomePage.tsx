import { useEffect } from "react";
import PostsList from "../../components/PostsList/PostsList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { loadPublicPostsThunk } from "../../redux/thunks/postsThunks";

const HomePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.publicPosts);

  const pageSize = 2;
  const page = 2;

  useEffect(() => {
    dispatch(loadPublicPostsThunk(pageSize, page));
  }, [dispatch, page, pageSize]);

  return (
    <div className="bg-scroll bg-main-img  bg-no-repeat bg-cover h-screen w-screen ">
      <div className="backdrop-blur-md absolute border rounded-3xl content-center inset-x-0 bottom-0 top-16">
        <h1 className="text-6xl m-4 font-semibold">Explore</h1>
        <PostsList posts={posts} />
      </div>
    </div>
  );
};

export default HomePage;
