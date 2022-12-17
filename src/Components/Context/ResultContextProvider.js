import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseURL = "https://google-search72.p.rapidapi.com";

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
    setResults(data);
    setIsLoading(false);
  };
  return (
    <ResultContext.Provider
      value={{ getResult, results, searchQuery, setSearchQuery, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
