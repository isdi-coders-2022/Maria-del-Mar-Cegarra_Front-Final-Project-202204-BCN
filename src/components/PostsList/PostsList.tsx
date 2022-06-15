import { IPost } from "../../types/PostTypes";
import Post from "../Post/Post";

interface Props {
  posts: IPost[];
}

const PostsList = (props: Props): JSX.Element => {
  return (
    <>
      <ul className="flex flex-col">
        {props.posts.map((post: IPost) => (
          <li className="flex justify-center" key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostsList;
