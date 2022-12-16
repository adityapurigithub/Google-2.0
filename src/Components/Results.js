import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

import { useResultContext } from "./Context/ResultContextProvider";
import Loading from "./Loading";

const Results = () => {
  const { results, isLoading, getResult, searchQuery } = useResultContext(); //using result context as a hook here..
  const location = useLocation(); //for url eg..'/search' or '/videos';

  useEffect(() => {
    getResult("search?query=superman&num=20");
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  console.log(location.pathname);

  // using switch for rendering for diff pathname----
  switch (location.pathname) {
    case "/search":
      // return "SEARCH";
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 mt-10">
          {results?.items?.map(({ link, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank">
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/images":
      // return "IMAGES";
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.image_results?.map(
            ({ image, link: { href, title } }, index) => (
              <a className="sm:p-3 p-5" href={href} key={index} target="_blank">
                <img src={image?.src} alt="title" loading="lazy" />
              </a>
            )
          )}
        </div>
      );
    case "/videos":
      return "VIDEOS";
    default:
      return "ERROR";
  }
};

export default Results;
