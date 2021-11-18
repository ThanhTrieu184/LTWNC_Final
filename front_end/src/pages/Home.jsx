import React, { Fragment } from "react";
import { Announcement, Post } from "../components";

const Home = () => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Home;
