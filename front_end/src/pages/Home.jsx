import React, { Fragment } from "react";
import { Announcement, PostTimeline } from "../components";

const Home = () => {
  return (
    <Fragment>
      <div className="flex justify-between space-x-4 mt-1">
        <PostTimeline />
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
