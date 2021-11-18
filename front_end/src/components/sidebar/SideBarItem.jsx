import React from "react";

const SideBarItem = (props) => {
  const { title, iconProp, color, link } = props;
  return (
    <div className="p-3 space-x-2 flex items-center bg-white rounded-md justify-start shadow-md cursor-pointer transform hover:scale-110 duration-200">
      <div
        className={`${color} rounded p-2 w-7 flex flex-col items-center text-white`}
      >
        {iconProp}
      </div>
      <a
        href={link ? link : "/"}
        className="text-md font-normal text-left mt-1 truncate"
      >
        {title}
      </a>
    </div>
  );
};

export default SideBarItem;
