import React from "react";
import { Link } from "react-router-dom";

const SideBarItem = (props) => {
  const { title, iconProp, color, link } = props;
  return (
    <Link
      to={link ? link : "/"}
      className={`p-3 space-x-2 flex items-center bg-white rounded-md justify-start shadow-md cursor-pointer transform hover:scale-110 duration-200`}
    >
      <div
        className={`${color} rounded p-2 w-7 flex flex-col items-center text-white`}
      >
        {iconProp}
      </div>
      <p className="text-md font-normal text-left mt-1 truncate">{title}</p>
    </Link>
  );
};

export default SideBarItem;
