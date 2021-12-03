import React, { useEffect, useState } from "react";
import { SideBar, InputPost, NewAnnouncement } from "../";
import io from "socket.io-client";

const socket = io("localhost:1804");

const PrivateLayout = ({ children }) => {
  const [isShowNewAnnouncement, setIsShowNewAnnouncement] = useState(false);
  const [announcementToPass, setAnnouncementToPass] = useState();
  useEffect(() => {
    socket.on("newAnnouncement", (res) => {
      setIsShowNewAnnouncement(true);
      setAnnouncementToPass(res);
    });
  }, []);
  return (
    <div className="flex justify-between h-screen w-full bg-white">
      <SideBar></SideBar>
      <div className="flex flex-col flex-1 overflow-y-auto hide-scroll-bar">
        <div className="grid grid-cols-12 gap-6 p-4">
          <p className="text-4xl col-span-12 md:col-span-8 hidden md:block font-semiBold uppercase pl-4 bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-indigo-700">
            Trang chủ
          </p>
          <img
            src="https://res.cloudinary.com/mrafternoon184/image/upload/v1638073300/ltwnc/logo_whrc9h.png"
            alt="logo"
            className="h-16 w-full col-span-12 md:col-span-4"
          />
        </div>
        <div className="grid grid-cols-12 gap-6 border-b py-4 ml-8 mr-4">
          <InputPost />
          {isShowNewAnnouncement ? (
            <div
              className="col-span-12 md:col-span-4 cursor-pointer"
              onClick={() => setIsShowNewAnnouncement(false)}
            >
              <NewAnnouncement announcementToPass={announcementToPass} />
            </div>
          ) : (
            <></>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default PrivateLayout;
