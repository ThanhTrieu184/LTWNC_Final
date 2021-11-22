import * as Icon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Announcement = ({ postedBy }) => {
  return (
    <div className="rounded-lg bg-white text-gray-800 p-4 m-4 flex flex-col shadow hover:shadow-md transform hover:scale-105 transition duration-200">
      <div className="flex flex-col">
        <Link to="/" className="text-md font-bold mb-2 uppercase leading-5">
          <span className="animation-underline">
            You need more informations? You need more informations? You need
            more informations?
          </span>
        </Link>
        <p className="opacity-70 pb-4 truncate font-thin">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod
        </p>
      </div>
      <div className="pt-4 flex justify-between items-center z-10">
        <div className="flex space-x-2 items-center text-gray-600">
          <small className="">11/11/2021</small>
          <p className="text-sm">{postedBy}</p>
          <FontAwesomeIcon
            className="p-1 text-green-600 rounded-full bg-green-50 shadow-sm"
            icon={Icon.faCheck}
          />
          <FontAwesomeIcon
            className="p-1 text-yellow-600 rounded-full bg-yellow-50 shadow-sm"
            icon={Icon.faStar}
          />
        </div>
        <Link to="/announcements/123">
          <button className="my-btn-gradient">Xem chi tiết</button>
        </Link>
      </div>
    </div>
  );
};

export default Announcement;
