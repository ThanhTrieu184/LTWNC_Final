import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NewAnnouncement = () => {
  return (
    <div className="flex relative items-center bg-white leading-4 rounded-xl py-4 px-2 shadow-md text-sm animate-bounce">
      <Link
        to="/"
        className="pl-6 pr-2 bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-indigo-700"
      >
        Mr.Afternoon vừa đăng một thông báo mới. Nhấn vào đây để xem chi tiết.
      </Link>
      <div className="absolute -top-3 -left-3 flex bg-gradient-to-br from-red-600  to-indigo-600 text-white rounded-md p-2 justify-center items-center">
        <FontAwesomeIcon icon={faBullhorn} />
      </div>
    </div>
  );
};

export default NewAnnouncement;
