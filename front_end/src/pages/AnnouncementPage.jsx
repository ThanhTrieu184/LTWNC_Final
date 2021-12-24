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
  const { userTheme } = useSelector((state) => state.responsive);

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
      <div className="flex flex-col md:flex-row justify-between md:space-x-4 mt-1">
        {isAnnouncementFetching ? (
          <Loading height="450px" />
        ) : (
          <div className="w-full md:w-2/3 pl-2 lg:pl-8 pr-2">
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

        <div className="w-full md:w-1/3 md:pl-0 p-4 form-control space-y-4">
          <div
            className={`p-6 card ${
              userTheme === "light"
                ? "bg-white bordered"
                : "bg-gray-800 text-yellow-50"
            } shadow`}
          >
            <div className="form-control">
              <label className="cursor-pointer label justify-start space-x-2">
                <input type="checkbox" className="checkbox border-yellow-50" />
                <span
                  className={`label-text ${
                    userTheme !== "light" && "text-yellow-50"
                  }`}
                >
                  Thông báo quan trọng
                </span>
              </label>
              <label className="cursor-pointer label justify-start space-x-2">
                <input type="checkbox" className="checkbox border-yellow-50" />
                <span
                  className={`label-text ${
                    userTheme !== "light" && "text-yellow-50"
                  }`}
                >
                  Thông báo mới
                </span>
              </label>
            </div>
          </div>
          <div
            className={`p-6 card ${
              userTheme === "light"
                ? "bg-white bordered"
                : "bg-gray-800 text-yellow-50"
            } shadow`}
          >
            <div className="form-control">
              <label className="cursor-pointer label justify-start space-x-2">
                <input
                  type="radio"
                  name="opt"
                  className="radio border-yellow-50"
                  value=""
                />
                <span
                  className={`label-text ${
                    userTheme !== "light" && "text-yellow-50"
                  }`}
                >
                  Đã xem
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label justify-start space-x-2">
                <input
                  type="radio"
                  name="opt"
                  className="radio border-yellow-50"
                  value=""
                />
                <span
                  className={`label-text ${
                    userTheme !== "light" && "text-yellow-50"
                  }`}
                >
                  Chưa xem
                </span>
              </label>
              <label className="cursor-pointer label justify-start space-x-2">
                <input
                  type="radio"
                  name="opt"
                  defaultChecked
                  className="radio border-yellow-50"
                  value=""
                />
                <span
                  className={`label-text ${
                    userTheme !== "light" && "text-yellow-50"
                  }`}
                >
                  Tất cả
                </span>
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
