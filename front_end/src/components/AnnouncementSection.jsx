import React, { useEffect } from "react";
import { Announcement, Loading } from ".";
import { useSelector, useDispatch } from "react-redux";
import { getAnnouncements } from "../redux/slices";

const AnnouncementSection = () => {
  const dispatch = useDispatch();
  const { announcements } = useSelector((state) => state.announcement);
  useEffect(() => {
    if (announcements.length === 0) {
      dispatch(getAnnouncements(1));
    }
  }, [announcements, dispatch]);

  return (
    <div className="w-1/3 hide-scroll-bar h-screen overflow-x-auto">
      {announcements.length > 0 ? (
        announcements.map((a) => <Announcement key={a._id} announcement={a} />)
      ) : (
        <Loading height="150px" />
      )}
    </div>
  );
};

export default AnnouncementSection;
