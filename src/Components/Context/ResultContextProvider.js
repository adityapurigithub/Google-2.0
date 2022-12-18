import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseURL = "https://google-search72.p.rapidapi.com";
const newsURL = "https://news-api14.p.rapidapi.com";
//using context
export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [searchQuery, setSearchQuery] = useState("Spiderman");

  //getting the required type of result...
  const getResult = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${baseURL}/${type}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ad5a9b1348msh88f51ed9418a022p1e53edjsn9b81cca61824",
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
        "X-RapidAPI-Key": "6f330204f9msh43ae629dd32d2e6p10746ejsn81eee9bc381a",
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
