import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

const NewAnnouncement = () => {
  return (
    <div className="flex relative items-center leading-4 text-gray-600 rounded-full p-2 shadow-sm text-sm border  animate-bounce">
      <a href="/" className="pl-6 pr-2">
        <span className="animation-underline">
          Mr.Afternoon vừa đăng một thông báo mới. Nhấn vào đây để xem chi tiết.
        </span>
      </a>
      <div className="absolute -top-3 -left-3 flex bg-gradient-to-br from-red-600  to-indigo-600 text-white rounded-full p-2 justify-center items-center">
        <FontAwesomeIcon icon={faBullhorn} />
      </div>
    </div>
  );
};

export default NewAnnouncement;
