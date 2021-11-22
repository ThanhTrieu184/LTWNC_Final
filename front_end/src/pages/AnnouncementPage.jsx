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
