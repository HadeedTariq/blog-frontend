import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSinglePost, setSingleError } from "../store/reducres/blogReducer";
import { format, parseISO } from "date-fns";

function SinglePost() {
  const { singlePost, singleError } = useSelector((state) => state.blogPosts);
  const dispatch = useDispatch();
  const { search } = useLocation();
  useEffect(() => {
    dispatch(setSingleError(null));
  }, []);
  useEffect(() => {
    const id = search.split("=")[1];
    dispatch(getSinglePost(id));
  }, [search]);
  if (singleError) {
    return (
      <div className="flex justify-center">
        <h3 className="text-3xl font-semibold my-64">{singleError}</h3>
      </div>
    );
  }
  return (
    <>
      {singlePost && (
        <div className="flex flex-col py-3 overflow-hidden px-20 max-[640px]:px-5">
          <img
            src={singlePost.thumbnail}
            className="w-full h-96 rounded-sm gap-2 object-cover max-[640px]:object-fill"
          />
          <div className="flex flex-col my-2">
            <div className="flex items-center gap-2">
              <img
                src={singlePost.userImage}
                alt="user"
                className="w-8 h-8 rounded-full"
              />
              <p className="font-semibold text-[16px]">{singlePost.userName}</p>
            </div>
            <p className="text-right text-base font-bold">
              Created At :
              <span className="text-orange-500 mx-2 font-semibold text-[17px]">
                {" "}
                {format(parseISO(singlePost.createdAt), "dd/MM/yyyy")}
              </span>
            </p>
          </div>
          <h3 className="text-2xl font-semibold my-2 text-orange-400">
            {singlePost.title}
          </h3>
          <p className="my-2 text-lg font-medium text-amber-300">
            {singlePost.description}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: singlePost?.content }}
            className="blogPost"
          />
        </div>
      )}
    </>
  );
}

export default SinglePost;
