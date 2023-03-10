import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
const Navbar = ({ darkTheme, setDarkTheme }) => {
  return (
    <div className="p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-200">
      <div className="flex justify-between items-center space-x-5 w-screen">
        <Link to="/">
          <span className="text-2xl bg-blue-500 rounded px-2 py-1">
            Google 🔍
          </span>
        </Link>
        <button
          type="submit"
          onClick={() => {
            setDarkTheme(!darkTheme);
          }}
          className="rounded-full text-xl dark-bg-50 dark:text-gray-800 bg-white border px-2 py-1 hover:shadow"
        >
          {darkTheme ? "Light ☀️" : "Dark 🌙"}
        </button>
      </div>
      <Search />
    </div>
  );
};

export default Navbar;
