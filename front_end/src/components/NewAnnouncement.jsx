import React from "react";

const NewAnnouncement = () => {
  return (
    <div className="flex relative items-center leading-4 text-gray-600 rounded-full p-2 shadow-sm text-sm border  animate-bounce">
      <a href="/" className="pl-6 pr-2">
        <span className="animation-underline">
          Mr.Afternoon vừa đăng một thông báo mới. Nhấn vào đây để xem chi tiết.
        </span>
      </a>
      <div className="absolute -top-4 -left-4 flex bg-gradient-to-br from-red-600  to-indigo-600 text-white rounded-full p-2 justify-center items-center">
        New
      </div>
    </div>
  );
};

export default NewAnnouncement;
