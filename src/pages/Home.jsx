import React from "react";
import { useSelector } from "react-redux";
import { Error, Loading, Pagination } from "../components";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

function Home() {
  const { isLoading, error, allBlogs, currentPage, recordPerPage } =
    useSelector((state) => state.blogPosts);
  const lastIndex = currentPage * recordPerPage;
  const startIndex = lastIndex - recordPerPage;
  const numberOfPages = Math.ceil(allBlogs.length / recordPerPage);
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="py-5 px-2 overflow-hidden w-full">
      <div className="flex gap-3  my-1 justify-center flex-wrap">
        {allBlogs.slice(startIndex, lastIndex).map((blog) => (
          <div
            key={blog._id}
            className="w-[350px] max-[708px]:w-full h-fit p-2 border border-pink-500 rounded-md flex flex-col m-2">
            <LazyLoadImage
              src={blog.thumbnail}
              placeholderSrc="blogDefault.jpg"
              className="w-full h-52 object-fill max-[708px]:object-fill max-[708px]:w-full max-[708px]:h-64 overflow-hidden"
              effect="blur"
            />
            <h4 className="my-2 text-lg font-bold text-yellow-400">
              {blog.title.slice(0, 25)}...
            </h4>
            <p className="font-semibold text-base my-1">
              {blog.description.slice(0, 30)}
              <span className="mx-2 text-green-500 font-extrabold">......</span>
            </p>
            <div className="flex flex-col my-2">
              <div className="flex items-center gap-2">
                <img
                  src={blog.userImage}
                  alt="user"
                  className="w-8 h-8 rounded-full"
                />
                <p className="font-semibold text-[16px]">{blog.userName}</p>
              </div>
              <p className="text-right text-base font-bold">
                Created At :
                <span className="text-pink-500 mx-2 font-semibold text-[17px]">
                  {" "}
                  {format(parseISO(blog.createdAt), "dd/MM/yyyy")}
                </span>
              </p>
            </div>
            <Link
              to={`/blogPost?seacrh=${blog._id}`}
              className="text-base font-semibold bg-sky-400 rounded-md py-0.5 px-3 w-fit my-2">
              Read More
            </Link>
          </div>
        ))}
      </div>
      <Pagination pageNum={numberOfPages} />
      {/* <Pagination pageNum={12} /> */}
    </div>
  );
}

export default Home;
