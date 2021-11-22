import React from "react";
import imageIcon from "../assets/img/image_icon.png";

const InputPost = () => {
  return (
    <div className="col-span-12 sm:col-span-12 md:col-span-8">
      <div className="flex items-center space-x-4">
        <input
          placeholder="Bạn đang nghĩ gì?"
          className="px-4 flex-1 py-3 focus:outline-none focus:border-indigo-300 text-gray-600 text-md border rounded-full focus:shadow-sm"
        />
        <img src={imageIcon} alt="" className="h-12 w-12 border-red-500" />
        <button className="my-btn-gradient">Đăng bài</button>
      </div>
    </div>
  );
};

export default InputPost;
