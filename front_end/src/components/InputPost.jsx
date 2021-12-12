import React from "react";

const InputPost = () => {
  return (
    <div className="col-span-12 sm:col-span-12 md:col-span-8">
      <div className="flex items-center space-x-4">
        <input
          placeholder="Bạn đang nghĩ gì?"
          className="input input-bordered flex-1 text-md rounded-full"
        />
        <button className="my-btn-gradient">Đăng bài</button>
      </div>
    </div>
  );
};

export default InputPost;
