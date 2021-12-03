import React, { useState } from "react";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Paginator = () => {
  const [activePage, setActivePage] = useState(1);
  const pages = [1, 2, 3, 4, 5];
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
