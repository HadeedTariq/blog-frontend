import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  const [userBlogs, setUserBlogs] = useState([]);
  const {
    logInUser: { userName, profileImage },
  } = useSelector((state) => state.user);
  const { allBlogs } = useSelector((state) => state.blogPosts);
  useEffect(() => {
    const userBlogs = allBlogs.filter((blog) => blog.userName === userName);
    setUserBlogs(userBlogs);
  }, []);
  return (
    <>
      <div className="flex items-center p-5">
        <img
          src={profileImage}
          alt="profile"
          className="w-24 object-cover h-24 rounded-full"
        />
        <p className="mx-2 text-lg font-semibold text-orange-400">{userName}</p>
      </div>
      <div className="my-2 w-full flex flex-wrap justify-center gap-2">
        {userBlogs?.map((blog) => (
          <div
            key={blog._id}
            className="w-[320px] max-[708px]:w-full h-fit p-2 border border-pink-500 rounded-md flex flex-col m-2">
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
    </>
  );
}

export default Profile;
