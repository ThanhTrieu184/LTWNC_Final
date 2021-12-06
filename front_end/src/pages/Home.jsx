import React, { Fragment } from "react";
import { AnnouncementSection, PostTimeline } from "../components";

const Home = () => {
  return (
    <Fragment>
      {/* <div className="flex justify-between space-x-4">
        <div className="w-2/3"></div>
        <div className="w-1/3 uppercase font-semibold px-4 pt-2">
          Xem tất cả
        </div>
      </div> */}
      <div className="flex justify-between space-x-4 mt-1">
        <PostTimeline />
        <AnnouncementSection />
      </div>
    </Fragment>
  );
};

export default Home;
