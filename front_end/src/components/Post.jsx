import React from "react";

export const Post = () => {
  return (
    <div className="my-4 relative w-full h-96 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out">
      <div className="absolute inset-0 bg-blue-100 bg-opacity-75 transition duration-300 ease-in-out"></div>
      <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">
        <p>Post</p>
      </div>
    </div>
  );
};
