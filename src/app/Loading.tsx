import React from "react";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="flex flex-col gap-3">
        <div className="loader"></div>
        <p className="text-sm text-gray-500">Loading ...</p>
      </div>
    </div>
  );
};

export default Loading;
