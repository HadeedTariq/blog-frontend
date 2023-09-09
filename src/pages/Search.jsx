import React, { useState } from "react";
import { useSelector } from "react-redux";
import { options } from "../utils/options";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Search() {
  const { allBlogs } = useSelector((state) => state.blogPosts);
  const [filterBlogs, setFilterBlogs] = useState(allBlogs);
  const [loading, setLoading] = useState(false);
  const searchByCategory = (e) => {
    setLoading(true);
    const cat = e.currentTarget.value;
    if (cat === "All") {
      setFilterBlogs(allBlogs);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      return;
    }
    const filterBlog = allBlogs.filter((blog) => blog.category === cat);
    setFilterBlogs(filterBlog);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const searchByValue = (e) => {
    setLoading(true);
    const filterBlog = allBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterBlogs(filterBlog);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  return (
    <>
      <div className="flex justify-between items-center gap-2 py-2 px-5 min-[620px]:px-28">
        <form className="w-3/4 border-2 border-purple-500 flex items-center p-2 rounded-md ">
          <input
            type="text"
            placeholder="Search here"
            className="bg-transparent outline-none w-full text-base font-semibold"
            onChange={searchByValue}
          />
        </form>
        <select
          className="bg-gradient-to-r from-sky-400 to-cyan-400 p-1 border-none rounded-sm outline-none gap-2 h-fit cursor-pointer text-base font-semibold"
          onChange={(e) => searchByCategory(e)}>
          {["All", ...options].map((opt) => (
            <option
              value={opt}
              key={opt}
              className="bg-cyan-500 p-4 font-semibold cursor-pointer">
              {opt}
            </option>
          ))}
        </select>
      </div>
      {loading && (
        <div className="bg-[#1b2639] h-[86vh] flex justify-center items-center">
          <img src="Loading.gif" className="w-64 h-56" />
        </div>
      )}
      <div className="flex flex-col py-3 gap-2 items-center w-full max-[520px]:px-5">
        {filterBlogs &&
          filterBlogs.map((blog) => (
            <Link
              to={`/blogPost?seacrh=${blog._id}`}
              key={blog._id}
              className="w-4/5 max-[520px]:w-full  h-fit p-2 rounded-md flex items-center gap-4 m-2 bg-[#4634bf] hover:bg-[#2f58aa] transition duration-500">
              <LazyLoadImage
                src={blog.thumbnail}
                placeholderSrc="blogDefault.jpg"
                className="w-24 h-24 rounded-full object-fill "
                effect="blur"
              />
              <div className="flex flex-col w-4/5">
                <h4 className="my-1 text-lg font-bold text-yellow-400">
                  {blog.title}
                </h4>
                <h3 className="font-semibold text-base text-fuchsia-300">
                  {blog.description.slice(0, 120)}
                </h3>
              </div>
            </Link>
          ))}
        {filterBlogs.length === 0 && (
          <h3 className="text-white text-4xl font-bold my-48">
            No Blog Found With This Category 🧐{" "}
          </h3>
        )}
      </div>
    </>
  );
}

export default Search;
