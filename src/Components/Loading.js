import React from "react";
import { ColorRing } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ColorRing width={100} />
    </div>
  );
};

export default Loading;
