import React, { useEffect } from "react";
import { SideBar, InputPost } from "../components";
import { Announcement, Post, NewAnnouncement } from "../components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [history, user]);

  return (
    <div className="flex justify-between h-screen w-full">
      <SideBar></SideBar>
      <div className="flex flex-col flex-1 overflow-y-auto hide-scroll-bar">
        <div className="grid grid-cols-12 gap-6 p-4">
          <p className="text-4xl col-span-8 font-thin uppercase pl-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-indigo-600">
            Trang chủ
          </p>
          <img src={logo} alt="logo" className="h-16 w-full col-span-4" />
        </div>
        <div className="grid grid-cols-12 gap-6 border-b py-4 ml-8 mr-4">
          <InputPost />
          <div className="col-span-12 md:col-span-4">
            <NewAnnouncement />
          </div>
        </div>
        <div className="flex justify-between space-x-4 mt-1">
          <div className="w-2/3 hide-scroll-bar h-screen overflow-x-auto pl-8">
            <Post></Post>

            <Post></Post>

            <Post></Post>

            <Post></Post>

            <Post></Post>

            <Post></Post>

            <Post></Post>

            <Post></Post>

            <Post></Post>
          </div>
          <div className="w-1/3 hide-scroll-bar h-screen overflow-x-auto">
            <Announcement></Announcement>

            <Announcement></Announcement>

            <Announcement></Announcement>

            <Announcement></Announcement>

            <Announcement></Announcement>

            <Announcement></Announcement>

            <Announcement></Announcement>

            <Announcement></Announcement>

            <Announcement></Announcement>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
