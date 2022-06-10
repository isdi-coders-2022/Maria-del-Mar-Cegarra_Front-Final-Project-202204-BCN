import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { createPostThunk } from "../../redux/thunks/postsThunks";
import { editPostThunk } from "../../redux/thunks/postThunk";
import { FormPost, IPost } from "../../types/PostTypes";

const blankData = {
  picture: "",
  caption: "",
  hashtags: "",
  gallery: "",
};

interface Props {
  postId?: string;
}

const PostForm = ({ postId }: Props): JSX.Element => {
  const [formData, setFormData] = useState<FormPost>(blankData);
  const postInfo = useAppSelector((state) => state.post);
  const { id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      setFormData(postInfo as FormPost);
    }
  }, [postId, postInfo]);

  const changeFormData = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | any
  ): void => {
    setFormData({
      ...formData,
      [event.target.id]:
        event.target.type === "file"
          ? event.target.files?.[0] || ""
          : event.target.value,
    });
  };

  const clearData = () => {
    setFormData(blankData);
  };

  const convertHashtags = (event: React.ChangeEvent<HTMLInputElement>) => {
    const typedHashtags = event.target.value;
    const hashtags = typedHashtags
      .split(" ")
      .map((hashtag) => (hashtag[0] !== "#" ? `#${hashtag}` : hashtag));
    setFormData({
      ...formData,
      hashtags: hashtags,
    });
  };

  const options = [
    { value: "629fb4c6f04c2909a851993f", label: "Àmbit Galeria" },
    { value: "62a3028cac631a84cb141693", label: "Galería Maxó" },
    { value: "62a302fbac631a84cb141695", label: "Barcelona Art Galery" },
  ];

  const submitPost = (event: React.FormEvent) => {
    event.preventDefault();
    const newFormData = new FormData();
    newFormData.append("caption", formData.caption);
    newFormData.append("hashtags", JSON.stringify(formData.hashtags));
    newFormData.append("gallery", formData.gallery);
    newFormData.append("picture", formData.picture);
    newFormData.append("userId", id);
    postId
      ? dispatch(editPostThunk(postId, newFormData))
      : dispatch(createPostThunk(newFormData as unknown as IPost));
    clearData();
    navigate("/home");
  };

  return (
    <form
      className="w-full max-w-lg m-auto py-10 mt-10 px-10 border"
      action="add/edit post"
      noValidate
      autoComplete="off"
    >
      <img
        width="400px"
        height="300px"
        className="rounded-lg bg-violet-200"
        src={formData.picture}
        alt="Space for adding post"
      ></img>
      <input type="file" id="picture" onChange={changeFormData}></input>
      <label
        htmlFor="caption"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        hidden={true}
      >
        Caption
      </label>
      <input
        id="caption"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Add a caption..."
        onChange={changeFormData}
        value={formData.caption}
      />
      <label
        htmlFor="hashtags"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        hidden={true}
      >
        Hashtags
      </label>
      <input
        id="hashtags"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Hashtags..."
        onChange={convertHashtags}
        value={formData.hashtags}
      ></input>
      <label htmlFor="gallery" hidden={true}>
        Gallery
      </label>
      <select id="gallery" onChange={changeFormData}>
        <option disabled>Select gallery</option>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
      <input type="submit" onClick={submitPost} value="Add Post"></input>
    </form>
  );
};

export default PostForm;
