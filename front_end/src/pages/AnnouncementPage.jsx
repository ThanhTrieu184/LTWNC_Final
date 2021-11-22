import React, { Fragment } from "react";
import { Announcement, Paginator } from "../components";

const AnnouncementPage = () => {
  return (
    <Fragment>
      <div className="flex justify-between space-x-4 mt-1">
        <div className="w-2/3 pl-8 pr-2">
          <Announcement postedBy="Phòng đại học"></Announcement>
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
        <div className="w-1/3"></div>
      </div>
      <Paginator />
    </Fragment>
  );
};

export default AnnouncementPage;
