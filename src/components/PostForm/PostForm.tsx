import { Label } from "../../types/UserTypes";

const PostForm = (): JSX.Element => {
  const labels: Label[] = [
    {
      id: "picture",
      type: "file",
      text: "Add your picture",
    },
    {
      id: "hashtags",
      type: "text",
      text: "#Hashtags...",
    },
  ];

  return (
    <>
      <img width="400px" height="300px"></img>

      <input type="file" id="picture"></input>
      <label
        htmlFor="caption"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      ></label>
      <textarea
        id="caption"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Add a caption..."
      ></textarea>
    </>
  );
};

export default PostForm;
