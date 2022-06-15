import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostDetails from "../../components/PostDetails/PostDetails";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { loadPostThunk } from "../../redux/thunks/postThunk";

const DetailPostPage = (): JSX.Element => {
  const { id } = useParams();
  const post = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPostThunk(id as string));
  }, [dispatch, id]);

  return (
    <>
      <div className="backdrop-blur-md relative min-h-screen border rounded-3xl content-center inset-x-0 bottom-0 top-16 mb-40">
        <PostDetails post={post} />
      </div>
    </>
  );
};

export default DetailPostPage;
