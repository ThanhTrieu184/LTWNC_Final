import React, { useEffect } from "react";
import { Announcement, Loading } from ".";
import { useSelector, useDispatch } from "react-redux";
import { getHomePageAnnouncements } from "../redux/slices";

const AnnouncementSection = () => {
  const dispatch = useDispatch();
  const { homePageAnnouncements } = useSelector((state) => state.announcement);
  useEffect(() => {
    if (homePageAnnouncements.length === 0) {
      dispatch(getHomePageAnnouncements());
    }
  }, [homePageAnnouncements, dispatch]);

  return (
    <div className="w-1/3 hide-scroll-bar h-screen overflow-x-auto">
      {homePageAnnouncements.length > 0 ? (
        homePageAnnouncements.map((a) => (
          <Announcement key={a._id} announcement={a} />
        ))
      ) : (
        <Loading height="150px" />
      )}
    </div>
  );
};

export default AnnouncementSection;
