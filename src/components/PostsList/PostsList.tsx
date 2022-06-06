import { IPost } from "../../types/PostTypes";
import Post from "../Post/Post";

interface Props {
  posts: IPost[];
}

const PostsList = (props: Props): JSX.Element => {
  return (
    <ul>
      {props.posts.map((post: IPost) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
};

export default PostsList;
