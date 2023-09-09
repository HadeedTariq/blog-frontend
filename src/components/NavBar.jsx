import React from "react";
import MyDropdown from "./DropDown";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="h-11 bg-gradient-to-r from-purple-500 to-pink-600 shadow-md shadow-pink-400 flex justify-between items-center px-3">
        <Link to={"/"} className="text-xl font-semibold">
          Blogify
        </Link>
        <ul className="z-50">
          <MyDropdown />
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
