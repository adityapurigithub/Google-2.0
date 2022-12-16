import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Results from "./Results";

const Routez = () => {
  return (
    <div>
      <Routes>
        {/* for path "/" we are navigating to "/search" it means that we will not have "/" instead we have "/search"  */}
        <Route path="/" element={<Navigate to="/search" />} />

        {/* below is the way to use multiple routes for rendering a single component */}
        {["/search", "/images", "/news", "/videos"].map((path) => (
          <Route path={path} element={<Results />} /> //mapping on these paths and rendering Route accordingly..
        ))}
      </Routes>
    </div>
  );
};

export default Routez;
