import React, { useEffect, useState } from "react";
import { SideBar, InputPost, NewAnnouncement } from "../";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { responsiveSlice } from "../../redux/slices";

const { openMenu } = responsiveSlice.actions;
const socket = io("https://ltwnc-final.herokuapp.com");

const PrivateLayout = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState("/");
  const [isShowNewAnnouncement, setIsShowNewAnnouncement] = useState(false);
  const [announcementToPass, setAnnouncementToPass] = useState();
  const { isOpenMenu, userTheme } = useSelector((state) => state.responsive);

  const [navigateText, setNavigateText] = useState("");
  useEffect(() => {
    socket.on("newAnnouncement", (res) => {
      setIsShowNewAnnouncement(true);
      setAnnouncementToPass(res);
    });
  }, []);

  useEffect(() => {
    setCurrentLocation(location.pathname.split("/")[1]);
    switch (currentLocation) {
      case "users":
        setNavigateText("Người dùng");
        break;
      case "announcements":
        setNavigateText("Thông báo");
        break;
      case "posts":
        setNavigateText("Bài viết");
        break;
      default:
        setNavigateText("Trang chủ");
    }
  }, [currentLocation, location, navigateText]);

  return (
    <div
      className={`flex justify-between h-screen w-full transition duration-500 ${
        userTheme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      <SideBar />
      <div
        className={`flex flex-col flex-1 overflow-y-auto hide-scroll-bar ${
          isOpenMenu && "invisible lg:visible"
        }`}
      >
        <div className="grid grid-cols-12 gap-6 py-4 lg:pl-4">
          <p className="text-4xl col-span-12 md:col-span-8 hidden md:block font-semiBold uppercase pl-4 bg-clip-text text-transparent my-bg-gradient">
            {navigateText}
          </p>
          <div
            className={`${
              isOpenMenu ? "hidden" : "col-span-2"
            } md:hidden text-gray-500 py-2 pl-4`}
          >
            <FontAwesomeIcon
              className="cursor-pointer text-2xl"
              onClick={() => dispatch(openMenu(!isOpenMenu))}
              icon={Icon.faBars}
            ></FontAwesomeIcon>
          </div>
          <img
            src="https://res.cloudinary.com/mrafternoon184/image/upload/v1638073300/ltwnc/logo_whrc9h.png"
            alt="logo"
            className="h-16 w-full col-span-10 md:col-span-4 pr-4"
          />
        </div>
        <div
          className={`grid grid-cols-12 gap-6 border-b ${
            userTheme !== "light" && "border-gray-700"
          } py-4 ml-4 lg:ml-8 mr-4`}
        >
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
