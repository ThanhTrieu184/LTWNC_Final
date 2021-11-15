import React from "react";
import imageIcon from "../assets/img/image_icon.png";

const InputPost = () => {
  return (
    <div className="col-span-12 sm:col-span-12 md:col-span-8">
      <div className="flex items-center space-x-4">
        <input
          placeholder="Bạn đang nghĩ gì?"
          className="px-4 flex-1 py-3 focus:outline-none text-gray-600 text-xl resize-none border rounded-full"
        />
        <img src={imageIcon} alt="" className="h-14 w-14 border-red-500" />
        <button className="border rounded-full px-4 py-3 bg-gradient-to-br from-red-600 to-indigo-600 text-white">
          Đăng bài
        </button>
      </div>
    </div>
  );
};

export default InputPost;
