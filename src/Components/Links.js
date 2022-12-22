import React from "react";
import { Link, NavLink } from "react-router-dom";

const Links = () => {
  const links = [
    { url: "/search", text: "All " },
    { url: "/imagesearch", text: "Images " },
    { url: "/videos", text: "Videos " },
    { url: "/news", text: "News " },
  ];
  return (
    <div className="flex sm:justify-around justify-center items-center mt-4">
      {links.map(({ url, text }) => (
        <Link
          to={url}
          className="text-lg text-blue-700 hover:border-b-2 dark:text-blue-300 p-2"
        >
          {text}
        </Link>
      ))}
    </div>
  );
};

export default Links;
