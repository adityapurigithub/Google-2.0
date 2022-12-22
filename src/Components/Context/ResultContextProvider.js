import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseURL = "https://google-search72.p.rapidapi.com";
const newsURL = "https://news-api14.p.rapidapi.com";
//using context
export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [searchQuery, setSearchQuery] = useState("Elon musk");

  //getting the required type of result...
  const getResult = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${baseURL}/${type}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "3235425d18msh4e99d2e66fe728cp1bac12jsn11a7779fba34",
        "X-RapidAPI-Host": "google-search72.p.rapidapi.com",
      },
    });

    const data = await response.json();
    console.log(data);
    setResults(data.items);
    setIsLoading(false);
  };

  const getNewsResult = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${newsURL}/${type}`, {
      method: "GET",
      headers: {
        "x-rapidapi-subscription": "ultra",
        "x-rapidapi-proxy-secret": "c02cea90-4588-11eb-add9-c577b8ecdc8e",
        "x-rapidapi-user": "suprikurniyanto",
        "X-RapidAPI-Key": "3235425d18msh4e99d2e66fe728cp1bac12jsn11a7779fba34",
        "X-RapidAPI-Host": "news-api14.p.rapidapi.com",
      },
    });

    const data = await response.json();
    console.log(data);
    setResults(data.articles);
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{
        getResult,
        getNewsResult,
        results,
        searchQuery,
        setSearchQuery,
        isLoading,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
