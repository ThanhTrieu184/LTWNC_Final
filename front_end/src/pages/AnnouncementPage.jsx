import React, { Fragment, useEffect } from "react";
import { Announcement, Loading, Paginator } from "../components";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { announcementSlice } from "../redux/slices";

const { clearAnnouncementState } = announcementSlice.actions;

const AnnouncementPage = () => {
  const dispatch = useDispatch();
  const {
    announcements,
    isAnnouncementError,
    announcementReturnedMessage,
    isAnnouncementFetching,
  } = useSelector((state) => state.announcement);

  useEffect(() => {
    if (isAnnouncementError) {
      toast.error(announcementReturnedMessage);
      dispatch(clearAnnouncementState());
    }
  }, [
    announcementReturnedMessage,
    announcements,
    dispatch,
    isAnnouncementError,
  ]);

  return (
    <Fragment>
      <div className="flex justify-between space-x-4 mt-1">
        {isAnnouncementFetching ? (
          <Loading height="450px" />
        ) : (
          <div className="w-2/3 pl-8 pr-2">
            {announcements.length > 0 &&
              announcements.map((a) => (
                <Announcement
                  key={a._id}
                  announcement={a}
                  isShowDepartment={true}
                />
              ))}
          </div>
        )}

        <div className="w-1/3 pr-4 py-4 form-control space-y-4">
          <div className="p-6 card bordered bg-white shadow">
            <div className="form-control">
              <label className="cursor-pointer label justify-start space-x-2">
                <input type="checkbox" className="checkbox" />
                <span className="label-text">Thông báo quan trọng</span>
              </label>
              <label className="cursor-pointer label justify-start space-x-2">
                <input type="checkbox" className="checkbox" />
                <span className="label-text">Thông báo mới</span>
              </label>
            </div>
          </div>
          <div className="p-6 card bordered bg-white shadow">
            <div className="form-control">
              <label className="cursor-pointer label justify-start space-x-2">
                <input type="radio" name="opt" className="radio" value="" />
                <span className="label-text">Đã xem</span>
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label justify-start space-x-2">
                <input type="radio" name="opt" className="radio" value="" />
                <span className="label-text">Chưa xem</span>
              </label>
              <label className="cursor-pointer label justify-start space-x-2">
                <input
                  type="radio"
                  name="opt"
                  defaultChecked
                  className="radio"
                  value=""
                />
                <span className="label-text">Tất cả</span>
              </label>
            </div>
          </div>
          <div className="text-center">
            <button className="my-btn-gradient w-28">Lọc</button>
          </div>
        </div>
      </div>
      <Paginator />
    </Fragment>
  );
};

export default AnnouncementPage;
