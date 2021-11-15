import React from "react";

const SideBarItem = () => {
  return (
    <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-md cursor-pointer transform hover:scale-110 duration-200">
      <div className="rounded-full p-2 bg-indigo-200 flex flex-col items-center">
        <i className="fas fa-chart-pie fa-sm text-indigo-600"></i>
      </div>
      <p className="text-xs mt-1 text-center font-semibold">Dashboard</p>
    </div>
  );
};

export default SideBarItem;
