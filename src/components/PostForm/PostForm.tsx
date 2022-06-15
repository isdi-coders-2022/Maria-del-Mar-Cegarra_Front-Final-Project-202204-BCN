import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { createPostThunk } from "../../redux/thunks/postsThunks";
import { editPostThunk } from "../../redux/thunks/postThunk";
import { FormPost, IPost } from "../../types/PostTypes";
import CrossIcon from "../Icons/CrossIcon";

const blankData = {
  picture: "",
  caption: "",
  hashtags: "",
  galleryId: "",
};

interface Props {
  postId?: string;
}

const PostForm = ({ postId }: Props): JSX.Element => {
  const [formData, setFormData] = useState<FormPost>(blankData);
  const postInfo = useAppSelector((state) => state.post);
  const { pathname } = useLocation();
  const { id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      const EditInitialForm: FormPost = {
        picture: postInfo.picture,
        caption: postInfo.caption,
        hashtags: postInfo.hashtags,
        galleryId: postInfo.gallery.id,
      };
      setFormData(EditInitialForm as FormPost);
    }
  }, [postId, postInfo]);

  const changeFormData = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | any
  ): void | string => {
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

  const removeSelectedImage = () => {
    setFormData({ ...formData, picture: "" });
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
    newFormData.append("gallery", formData.galleryId);
    newFormData.append("picture", formData.picture);
    newFormData.append("userId", id);
    postId
      ? dispatch(editPostThunk(postId, newFormData as unknown as IPost))
      : dispatch(createPostThunk(newFormData as unknown as IPost));
    navigate("/home");
    clearData();
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <>
      <form
        className="w-full max-w-lg rounded-md bg-violet-200 m-auto py-10 mt-10 px-10 border"
        action="add/edit post"
        noValidate
        autoComplete="off"
        onSubmit={submitPost}
      >
        <div className=" relative inline-block center my-2.5 p-2.5 w-full h-72 text-sm bg-violet-300 rounded-lg border border-gray-300 focus-border-input">
          {formData.picture && (
            <>
              <img
                src={
                  typeof formData.picture === "string"
                    ? `${apiUrl}uploads/${postInfo.picture}`
                    : URL.createObjectURL(formData.picture as Blob)
                }
                onError={(error: any) => {
                  let backupSrc = postInfo.pictureBackup
                    ? postInfo.pictureBackup
                    : "";
                  (error.target as HTMLImageElement).onerror = null;
                  (error.target as HTMLImageElement).src = backupSrc as string;
                }}
                alt="Your uploads"
                className="max-w-full max-h-64"
              />
              {pathname === "/add-post" && (
                <button
                  data-testid="Delete"
                  className="absolute top-0 right-2.5 my-2 p-2.5 w-50 text-sm text-gray-900 bg-violet-400 hover:bg-violet-500 rounded-full border border-gray-300 focus-border-input"
                  onClick={removeSelectedImage}
                >
                  <CrossIcon color="text-slate-900" />
                </button>
              )}
            </>
          )}
        </div>
        <>
          {pathname === "/add-post" && (
            <>
              <label htmlFor="picture" hidden={true}>
                Picture
              </label>
              <input
                type="file"
                id="picture"
                className="block center my-2.5 p-2.5 w-full text-sm text-gray-900 bg-violet-300 hover:bg-violet-500 rounded-lg border border-gray-300 focus-border-input file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100"
                onChange={changeFormData}
              ></input>
            </>
          )}
        </>
        <label htmlFor="caption" hidden={true}>
          Caption
        </label>
        <textarea
          id="caption"
          className="block my-2.5 p-5 w-full h-24 text-sm text-gray-900 bg-violet-300 rounded-lg border border-gray-300 focus-border-input"
          placeholder="Add a caption..."
          onChange={changeFormData}
          value={formData.caption}
        />
        <label htmlFor="hashtags" hidden={true}>
          Hashtags
        </label>
        <input
          id="hashtags"
          type="text"
          className="block my-2.5 p-2.5 w-full text-sm text-gray-900 bg-violet-300 rounded-lg border border-gray-300 focus-border-input"
          placeholder="Hashtags..."
          onChange={convertHashtags}
          value={formData.hashtags}
        ></input>
        <label htmlFor="galleryId" hidden={true}>
          Gallery
        </label>
        <select
          id="galleryId"
          onChange={changeFormData}
          className="block my-2.5 p-2.5 w-full text-sm text-gray-900 bg-violet-300 rounded-lg border border-gray-300 focus-border-input"
        >
          <option disabled>Select gallery</option>
          <option value="">--None</option>
          {options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="flex justify-center">
          <input
            type="submit"
            onClick={submitPost}
            value={postId ? "Edit Post" : "Add Post"}
            className="block place-self-center my-2.5 p-4 px-7 w-50 text-sm text-slate-100 font-semibold bg-violet-500 hover:bg-violet-500 rounded-2xl border hover:border-violet-600 focus-border-input cursor-pointer"
          ></input>
        </div>
      </form>
    </>
  );
};

export default PostForm;
