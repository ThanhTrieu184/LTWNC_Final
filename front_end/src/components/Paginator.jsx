import React, { useState, useEffect } from "react";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { getAnnouncements } from "../redux/slices";

const Paginator = () => {
  const dispatch = useDispatch();
  const { announcementCount } = useSelector((state) => state.announcement);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);
  // const pages = Array.from({ length: count }, (_, i) => i + 1);
  useEffect(() => {
    if (announcementCount !== null) {
      setPages(
        Array.from(
          { length: Math.ceil(announcementCount / 10) },
          (_, i) => i + 1
        )
      );
    }
  }, [announcementCount]);

  const handlePrevious = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
      dispatch(getAnnouncements(activePage));
    }
  };
  const handleNext = () => {
    if (activePage < pages.length) {
      dispatch(getAnnouncements(activePage + 1));
      setActivePage(activePage + 1);
    }
  };
  return (
    <div className="flex flex-col items-center my-4 w-2/3">
      <div className="flex text-gray-800 space-x-4">
        <div
          onClick={() => setActivePage(1)}
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
          {pages.map((p) => (
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
            activePage === pages.length
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-50 cursor-pointer"
          } h-8 w-8 ml-1 flex justify-center items-center rounded-lg bg-white shadow `}
        >
          <FontAwesomeIcon icon={Icon.faChevronRight} />
        </div>
        <div
          onClick={() => setActivePage(pages.length)}
          className={`${
            activePage === pages.length
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
