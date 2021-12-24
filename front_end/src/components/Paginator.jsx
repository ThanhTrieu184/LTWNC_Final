import React, { useState, useEffect } from "react";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import {
  getAnnouncements,
  getAnnouncementsByDepartment,
  announcementSlice,
} from "../redux/slices";
import { useParams, useLocation } from "react-router-dom";

const { setLocation } = announcementSlice.actions;

const Paginator = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { announcementCount, isAnnouncementFetching, currentLocation } =
    useSelector((state) => state.announcement);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);
  const [pageList, setPageList] = useState([]);
  const { departmentId } = useParams();

  useEffect(() => {
    if (announcementCount !== null) {
      let totalPages = Math.ceil(announcementCount / 10);
      setPages(Array.from({ length: totalPages }, (_, i) => i + 1));
      if (totalPages > 7) {
        setPageList(Array.from({ length: 7 }, (_, i) => i + 1));
      }
    }
  }, [announcementCount, dispatch]);

  useEffect(() => {
    if (location.pathname !== currentLocation) {
      if (activePage !== 1) {
        setActivePage(1);
      }
      departmentId
        ? dispatch(getAnnouncementsByDepartment({ departmentId, page: 1 }))
        : dispatch(getAnnouncements(1));
      dispatch(setLocation(location.pathname));
    } else {
      departmentId
        ? dispatch(
            getAnnouncementsByDepartment({ departmentId, page: activePage })
          )
        : dispatch(getAnnouncements(activePage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, dispatch, location]);

  useEffect(() => {
    if (activePage === pageList[6]) {
      setPageList(pages.slice(activePage - 1, activePage + 6));
    } else if (activePage === pageList[0] - 1) {
      if (activePage < 7) {
        setPageList(pages.slice(0, activePage + 1));
      } else {
        setPageList(pages.slice(activePage - 6, activePage + 1));
      }
    }
  }, [activePage, pageList, pages]);

  const handlePrevious = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };
  const handleNext = () => {
    if (activePage < pages.length) {
      setActivePage(activePage + 1);
    }
  };
  const handleLast = () => {
    setActivePage(pages.length);
    let totalPaginators = (pages.length - (pages.length % 7)) / 7;
    setPageList(pages.slice(totalPaginators * 6, pages.length));
  };
  const handleFirst = () => {
    setActivePage(1);
    setPageList(pages.slice(0, 7));
  };

  return (
    <div
      className={`${
        isAnnouncementFetching ? "hidden" : "flex"
      } flex-col items-center my-4 w-full md:w-2/3`}
    >
      <div className="flex text-gray-800 space-x-4">
        <div
          onClick={() => handleFirst()}
          className={`${
            activePage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-50 cursor-pointer"
          } h-8 w-8 mr-1 flex justify-center items-center rounded-lg bg-white shadow`}
        >
          <FontAwesomeIcon icon={Icon.faAngleDoubleLeft} />
        </div>
        <div
          onClick={() => handlePrevious()}
          className={`${
            activePage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-50 cursor-pointer"
          } h-8 w-8 mr-1 flex justify-center items-center rounded-lg bg-white shadow`}
        >
          <FontAwesomeIcon icon={Icon.faChevronLeft} />
        </div>
        <div className="flex h-8 font-medium rounded-lg space-x-2">
          {pages.length <= 7
            ? pages.map((p) => (
                <div
                  onClick={() => setActivePage(p)}
                  key={p}
                  className={`${
                    p === activePage
                      ? "my-bg-gradient text-white animate-bounce"
                      : "bg-white"
                  } w-8 md:flex bg-white justify-center items-center hidden cursor-pointer leading-5 transition duration-150 ease-in rounded-lg hover:bg-gray-50 shadow `}
                >
                  {p}
                </div>
              ))
            : pageList.map((p) => (
                <div
                  onClick={() => setActivePage(p)}
                  key={p}
                  className={`${
                    p === activePage
                      ? "my-bg-gradient text-white animate-bounce"
                      : "bg-white"
                  } w-8 md:flex bg-white justify-center items-center hidden cursor-pointer leading-5 transition duration-150 ease-in rounded-lg hover:bg-gray-50 shadow `}
                >
                  {p}
                </div>
              ))}
        </div>
        <div
          onClick={() => handleNext()}
          className={`${
            activePage === pages.length || pages.length === 0
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-50 cursor-pointer"
          } h-8 w-8 ml-1 flex justify-center items-center rounded-lg bg-white shadow `}
        >
          <FontAwesomeIcon icon={Icon.faChevronRight} />
        </div>
        <div
          onClick={() => handleLast()}
          className={`${
            activePage === pages.length || pages.length === 0
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-50 cursor-pointer"
          } h-8 w-8 mr-1 flex justify-center items-center rounded-lg bg-white shadow`}
        >
          <FontAwesomeIcon icon={Icon.faAngleDoubleRight} />
        </div>
      </div>
    </div>
  );
};

export default Paginator;
