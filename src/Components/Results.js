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
    console.log(searchQuery);
    if (searchQuery) {
      if (location.pathname === "/search") {
        getResult(`/search?query=${searchQuery}&num=20`);
      } else if (location.pathname === "/imagesearch") {
        getResult(`/imagesearch?query==${searchQuery}&num=20`);
      } else if (location.pathname === "/videos") {
        getResult(`/search?query=${searchQuery}&num=20 videos`);
      } else {
        getNewsResult(`/search?q=${searchQuery}&pageSize=20`);
      }
    }
  }, [searchQuery, location.pathname]);

  if (isLoading) {
    return <Loading />;
  }

  console.log(location.pathname);
  console.log(searchQuery);
  console.log(results);
  // using switch for rendering for diff pathname----
  switch (location.pathname) {
    case "/search":
      // return "SEARCH";
      return (
        <div className="flex flex-wrap justify-between space-y-6 space-x-3 sm:px-56 mt-10 p-2 min-h-screen">
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
        <div className="flex flex-wrap justify-center items-center  min-h-screen">
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
        <div className="flex flex-wrap justify-between items-center space-y-6 sm:px-56 min-h-screen">
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
      // return "VIDEOS";
      return (
        <div className="flex flex-wrap flex-col justify-between space-y-6 sm:px-36 min-h-screen">
          {results?.map(({ title, link, snippet }, index) => (
            <div key={index} className="p-2 w-">
              <a href={link} rel="noreferrer">
                <p className="text-lg text-blue-700 dark:text-blue-200 hover:underline break-word">
                  {title}
                </p>
              </a>
              <div className="flex gap-2 p-2 ">
                <ReactPlayer url={link} controls width="250px" height="150px" />
                <div className="flex flex-col items-between">
                  <p className="text-lg break-word">
                    {snippet.length > 80
                      ? snippet.substring(0, 80) + "..."
                      : snippet}
                  </p>
                  <a href={link} rel="noreferrer">
                    <p className="text-sm hover:undeline color-blue-400 break-word">
                      {link}
                    </p>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    default:
      return "ERROR";
  }
};

export default Results;
