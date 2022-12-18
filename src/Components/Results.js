import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

import { useResultContext } from "./Context/ResultContextProvider";
import Loading from "./Loading";

const Results = () => {
  const { results, getNewsResult, isLoading, getResult, searchQuery } =
    useResultContext(); //using result context as a hook here..

  //destructuring results...
  // const { items, entries: news } = results; //naming entries to news because entries is a resereved keyword ...

  const location = useLocation(); //for url eg..'/search' or '/videos';

  useEffect(() => {
    // getResult("search?query=spiderman&num=5");  //for a plain search
    // getResult("imagesearch?query=spiderman&num=2"); // for searching a image..
    if (searchQuery) {
      if (location.pathname === "/videos") {
        getResult(`search?query=${searchQuery} videos`);
      } else if (location.pathname === "/news") {
        getNewsResult(`search?q=${searchQuery}&pageSize=20`);
      } else {
        getResult(`${location.pathname}?query=${searchQuery}&num=10`);
      }
    }
  }, [searchQuery, location.pathname]);

  if (isLoading) {
    return <Loading />;
  }

  console.log(location.pathname);
  console.log(results);
  // using switch for rendering for diff pathname----
  switch (location.pathname) {
    case "/search":
      // return "SEARCH";
      return (
        <div className="flex flex-wrap justify-between space-y-6 space-x-3 sm:px-56 mt-10 p-2">
          {results?.map(({ link, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
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
    case "/imagesearch":
      // return "IMAGES";
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map(({ contextLink, thumbnailImageUrl, title }, index) => (
            <a
              className="sm:p-3 p-5"
              href={contextLink}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={thumbnailImageUrl}
                alt="title"
                loading="lazy"
                className="border dark:border-white-400"
              />
              <p className="w-36 break-word text-sm mt-2">{title}</p>
              <p className="text-sm">
                {contextLink.length > 30
                  ? contextLink.substring(0, 30) + "..."
                  : contextLink}
              </p>
            </a>
          ))}
        </div>
      );
    case "/news":
      // return "News";
      return (
        <div className="flex flex-wrap justify-between items-center space-y-6 sm:px-56">
          {results?.map(({ publisher, title, url }, id) => (
            <div key={id} className="md:w-2/5 w-full p-2">
              <a href={url} target="_blank" rel="noreferrer">
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <p className="text-sm hover:underline">
                  {url.length > 80 ? url.substring(0, 80) + "..." : url}
                </p>
              </a>
              <div className="flex gap-4">
                Published By:-
                <a
                  href={publisher.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {publisher.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    case "/videos":
      return "VIDEOS";
    default:
      return "ERROR";
  }
};

export default Results;
