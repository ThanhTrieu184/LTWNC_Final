import React, { Fragment } from "react";
import { AnnouncementSection, PostTimeline } from "../components";

const Home = () => {
  return (
    <Fragment>
      <div className="flex justify-between space-x-4 mt-1">
        <PostTimeline />
        <AnnouncementSection />
      </div>
    </Fragment>
  );
};

export default Home;
