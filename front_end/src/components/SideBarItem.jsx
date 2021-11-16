import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import * as Icon from "@fortawesome/free-solid-svg-icons";

const SideBarItem = (props) => {
  const { title, iconProp, color } = props;
  return (
    <div className="p-3 space-x-2 flex items-center bg-white rounded-md justify-start shadow-md cursor-pointer transform hover:scale-110 duration-200">
      <div
        className={`${color} rounded p-2 w-7 flex flex-col items-center text-white`}
      >
        {iconProp}
      </div>
      <p className="text-xs text-left mt-1 font-semibold ">{title}</p>
    </div>
  );
};

export default SideBarItem;
