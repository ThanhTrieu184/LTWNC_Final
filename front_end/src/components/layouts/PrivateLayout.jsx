import React from "react";
import { SideBar, InputPost, NewAnnouncement } from "../";
import logo from "../../assets/img/logo.png";

const PrivateLayout = ({ children }) => {
  return (
    <div className="flex justify-between h-screen w-full bg-red-50 bg-opacity-10">
      <SideBar></SideBar>
      <div className="flex flex-col flex-1 overflow-y-auto hide-scroll-bar">
        <div className="grid grid-cols-12 gap-6 p-4">
          <p className="text-4xl col-span-12 md:col-span-8 hidden md:block font-semiBold uppercase pl-4 bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-indigo-700">
            Trang chủ
          </p>
          <img
            src={logo}
            alt="logo"
            className="h-16 w-full col-span-12 md:col-span-4"
          />
        </div>
        <div className="grid grid-cols-12 gap-6 border-b py-4 ml-8 mr-4">
          <InputPost />
          <div className="col-span-12 md:col-span-4">
            <NewAnnouncement />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PrivateLayout;
