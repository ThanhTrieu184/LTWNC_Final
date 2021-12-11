import React, { Fragment } from "react";
import { PostTimeline } from "../components";

const Profile = () => {
  return (
    <Fragment>
      <div className="flex justify-between space-x-4 mt-1">
        <PostTimeline />
        {/* <AnnouncementSection /> */}
      </div>
    </Fragment>
  );
};

export default Profile;
