import React from "react";
import { useSelector } from "react-redux";

const InputPost = () => {
  const { userTheme } = useSelector((state) => state.responsive);
  return (
    <div className="col-span-12 sm:col-span-12 md:col-span-8">
      <div className="flex items-center space-x-4">
        <input
          placeholder="Bạn đang nghĩ gì?"
          className={`input input-bordered flex-1 text-md rounded-full ${
            userTheme !== "light" && "bg-gray-800"
          }`}
        />
        <button className="my-btn-gradient">Đăng bài</button>
      </div>
    </div>
  );
};

export default InputPost;
