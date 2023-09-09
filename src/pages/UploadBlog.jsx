import React, { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { url } from "../App";
import { options } from "../utils/options";
import { useNavigate } from "react-router-dom";
import { setSuccessMessage } from "../store/reducres/blogReducer";

function UploadBlog() {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const {
    logInUser: { userName, profileImage },
  } = useSelector((state) => state.user);
  const editor = useRef(null);
  const [content, setContent] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [category, setCategory] = useState(options[0]);
  const uploadToClient = (e) => {
    const loading = toast.loading("Uploading to client");
    const url = e.target.files[0];
    setImage(url);
    const uploadUrl = URL.createObjectURL(url);
    setImageUrl(uploadUrl);
    setTimeout(() => {
      toast.dismiss(loading);
    }, 2000);
  };
  const uploadBlog = async (e) => {
    e.preventDefault();
    if (!title || !description || !content || !image || !category) {
      toast.error("Please fill all the fields", { duration: 1300 });
      return;
    }
    setDisable(true);
    const loading = toast.loading("Uploading Blog");
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "n5y4fqsf");
    data.append("cloud_name", "ddfdfdfd");
    try {
      const { data: i } = await axios.post(
        "https://api.cloudinary.com/v1_1/ddfdfdfd/image/upload",
        data
      );
      const blogData = {
        userName,
        userImage: profileImage,
        title,
        description,
        content,
        category,
        thumbnail: i.url,
      };
      const { data: blog } = await axios.post(`${url}/blog/create`, blogData);
      toast.dismiss(loading);
      toast.success(blog.message, { duration: 1000 });
      dispatch(setSuccessMessage("Blog Uploaded"));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setDisable(false);
      toast.dismiss(loading);
      console.log(err);
      toast.error(err?.response?.date?.message || "Something went wrong", {
        duration: 1500,
      });
    }
  };
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "19px",
            fontWeight: "600",
          },
        }}
      />
      <form
        className="flex flex-col p-3 px-20 max-[590px]:px-5"
        onSubmit={uploadBlog}>
        <label className="text-lg font-semibold my-2">
          Enter your blog title
        </label>
        <input
          type="text"
          placeholder="Title"
          value={title ? title : ""}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent border border-emerald-300 py-1 px-2 rounded-sm text-base font-semibold placeholder:font-bold outline-none focus:outline-pink-400 focus:border-none my-1"
        />
        <label className="text-lg font-semibold my-2">
          Enter your blog description
        </label>
        <textarea
          type="text"
          placeholder="Description"
          value={description ? description : ""}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-transparent text- border border-emerald-300 py-1 px-2 rounded-sm text-base font-semibold placeholder:font-bold outline-none focus:outline-pink-400 focus:border-none resize-none my-1 overflow-y-auto h-32"
        />
        <label className="text-lg font-semibold my-2 ">
          Your blog thumbnail
        </label>
        <div className="border max-[590px]:w-full max-[590px]:h-72  w-80 h-64 mb-4 rounded-md">
          {imageUrl && (
            <img
              src={imageUrl}
              className="w-full h-full object-fill  overflow-hidden rounded-md"
            />
          )}
        </div>
        <input type="file" onChange={(e) => uploadToClient(e)} />
        <label className="text-lg font-semibold my-2 ">
          Select Blog Category
        </label>
        <select
          value={category ? category : ""}
          onChange={(e) => setCategory(e.target.value)}
          className="text-white bg-slate-700 gap-2 rounded-md p-1 text-lg cursor-pointer my-2">
          {options.map((opt, i) => (
            <option
              value={opt ? opt : ""}
              key={i}
              className="text-base font-semibold my-2 p-2  hover:cursor-pointer">
              {opt}
            </option>
          ))}
        </select>
        <label className="text-lg font-semibold my-2 ">
          Enter your blog content
        </label>
        <JoditEditor
          ref={editor}
          value={content ? content : ""}
          onChange={(e) => setContent(e)}
          className="my-2  text-black text-base font-semibold"
        />
        {!disable && (
          <button
            type="submit"
            className="text-lg font-semibold bg-sky-500 rounded-md py-1 px-6 my-3 w-fit mx-auto">
            Upload Blog
          </button>
        )}
      </form>
    </>
  );
}

export default UploadBlog;
