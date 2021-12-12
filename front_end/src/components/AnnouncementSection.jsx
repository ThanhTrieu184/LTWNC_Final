import React, { useEffect } from "react";
import { Announcement, Loading } from ".";
import { useSelector, useDispatch } from "react-redux";
import { getHomePageAnnouncements } from "../redux/slices";
import { Link } from "react-router-dom";

const AnnouncementSection = () => {
  const dispatch = useDispatch();
  const { homePageAnnouncements, isAnnouncementFetching } = useSelector(
    (state) => state.announcement
  );
  useEffect(() => {
    if (homePageAnnouncements.length === 0) {
      dispatch(getHomePageAnnouncements());
    }
  }, [homePageAnnouncements, dispatch]);

  return (
    <div className="w-full lg:w-1/3 hide-scroll-bar h-screen overflow-x-auto">
      {homePageAnnouncements.length > 0 && !isAnnouncementFetching ? (
        homePageAnnouncements.map((a) => (
          <Announcement key={a._id} announcement={a} />
        ))
      ) : (
        <Loading height="150px" />
      )}
      <div className="p-4 uppercase font-semibold text-right">
        <Link
          to="/announcements"
          className={`${
            homePageAnnouncements.length > 0 && !isAnnouncementFetching
              ? "block"
              : "hidden"
          } bg-clip-text text-transparent my-bg-gradient`}
        >
          xem tất cả &gt;&gt;
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementSection;
