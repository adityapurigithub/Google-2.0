import React, { useEffect, useState } from "react";
import Links from "./Links";
import { useDebounce } from "use-debounce"; //used so that
import { useResultContext } from "./Context/ResultContextProvider";
const Search = () => {
  const [text, setText] = useState("Elon Musk");
  const { setSearchQuery } = useResultContext();

  const { debouncedValue } = useDebounce(text, 300); //=text, delay

  useEffect(() => {
    if (debouncedValue) {
      setSearchQuery(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className="relative sm:ml-40 md ml-2 sm:-mt-10 mt-4">
      <input
        value={text}
        type="text"
        className="sm:w-96 w-70 h-10 dark-bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
        placeholder="Search..."
        onChange={(e) => setText(e.target.value)}
      />
      {!text && (
        <button
          type="button"
          className="absolute top-1.5 right-4 text-2xl text-gray-500"
          onClick={() => setText("")}
        >
          X
        </button>
      )}
      <Links />
    </div>
  );
};

export default Search;
