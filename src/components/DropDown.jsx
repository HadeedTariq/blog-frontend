import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiSearch, FiSettings, FiUploadCloud, FiUser } from "react-icons/fi";

const Dropdown = () => {
  const { logInUser } = useSelector((state) => state.user);
  const options = [
    { icon: <FiUser size={22} />, text: logInUser?.userName, link: "/profile" },
    {
      icon: <FiUploadCloud size={22} />,
      text: "Upload Blog",
      link: "/uploadBlog",
    },
    { icon: <FiSettings size={22} />, text: "Setting", link: "/setting" },
    { icon: <FiSearch size={22} />, text: "Search", link: "/search" },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {logInUser ? (
        <div className="relative  text-left">
          <img
            src={logInUser.profileImage}
            alt="profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />

          {isOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500 ring-1  text-white ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu">
                {options.map((opt, i) => (
                  <Link
                    key={i}
                    to={opt.link}
                    className=" px-4 py-2 text-white font-semibold text-base hover:bg-cyan-400 transition-colors flex items-center gap-3"
                    role="menuitem">
                    {opt.icon} {opt.text}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          to={"/auth"}
          className="bg-cyan-400 font-semibold text-lg py-0.5 px-3 rounded-md">
          SignIn
        </Link>
      )}
    </>
  );
};

export default Dropdown;
