import React, { Fragment } from "react";
import { AnnouncementSection, PostTimeline } from "../components";

const Home = () => {
  return (
    <Fragment>
      <div className="flex flex-col lg:flex-row lg:space-y-0 space-y-10 justify-between lg:space-x-4 mt-1 px-2 lg:px-0">
        <PostTimeline />
        <AnnouncementSection />
      </div>
    </Fragment>
  );
};

export default Home;
