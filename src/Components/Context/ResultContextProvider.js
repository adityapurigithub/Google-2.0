import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseURL = "https://google-search72.p.rapidapi.com";

//using context
export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  //getting the required type of result...
  const getResult = async (type) => {
    setIsLoading(true);
    const response = await fetch(`${baseURL}/${type}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "75fc34c334msh75ba7f32839d961p16939cjsne25ed6c8a20d",
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
