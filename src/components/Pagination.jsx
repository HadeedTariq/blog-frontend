import React, { useEffect, useState } from "react";
import { AiFillLeftSquare, AiFillRightSquare } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../store/reducres/blogReducer";

function Pagination({ startInex, pageNum }) {
  const [pageNo, setPageNo] = useState([]);
  const dispatch = useDispatch();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const { currentPage } = useSelector((state) => state.blogPosts);
  const right = () => {
    setStart(end);
    let e;
    if (pageNo.length >= 10) {
      e = (pageNo.length - end) * 2;
    } else {
      e = pageNo.length * 2 - end;
    }
    setEnd(e);
  };
  const left = () => {
    const newStart = Math.max(0, start - end);
    const newEnd = Math.max(5, end - start);
    setStart(newStart);
    setEnd(newEnd);
  };
  useEffect(() => {
    const pageNumbers = [...Array(pageNum + 1).keys()].slice(1);
    if (pageNumbers.length < 5) {
      setEnd(pageNumbers.length);
    }
    setPageNo(pageNumbers);
  }, []);
  return (
    <>
      {pageNo.length > 1 && (
        <div className="flex gap-3 items-center justify-center my-4">
          {pageNo.length > 5 && start >= 5 && (
            <AiFillLeftSquare size={30} cursor={"pointer"} onClick={left} />
          )}
          {pageNo?.slice(start, end).map((page) => (
            <p
              key={page}
              onClick={() => dispatch(setCurrentPage(page))}
              className={`text-base font-semibold py-1 px-4 cursor-pointer ${
                currentPage === page ? "bg-cyan-600" : "bg-sky-400"
              } text-white rounded-sm`}>
              {page}
            </p>
          ))}
          {pageNo.length > 5 && pageNo.length > end && (
            <AiFillRightSquare size={30} cursor={"pointer"} onClick={right} />
          )}
        </div>
      )}
    </>
  );
}

export default Pagination;
