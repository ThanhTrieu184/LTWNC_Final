import React, { Fragment } from "react";
import { PostTimeline } from "../components";

const Profile = () => {
  return (
    <Fragment>
      <div className="flex justify-center space-x-4 mt-1 px-2 lg:px-0">
        <PostTimeline />
      </div>
    </Fragment>
  );
};

export default Profile;
