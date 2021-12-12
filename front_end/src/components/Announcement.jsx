import * as Icon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import moment from "moment";
import { AnnouncementMenu } from ".";
import { useSelector } from "react-redux";

const Announcement = ({ announcement, isShowDepartment }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="rounded-lg bg-gray-50 bg-opacity-20 text-gray-800 p-4 m-4 flex flex-col shadow hover:shadow-md transform hover:scale-105 transition duration-200">
      <div className="flex flex-col relative">
        <div className="flex justify-between">
          <Link
            to={`/announcements/${announcement._id}/detail`}
            className="text-md font-bold mb-2 uppercase leading-5 flex-1"
          >
            <span className="animation-underline">
              {announcement.announcement_title}
            </span>
          </Link>
          {user.departments.length > 0 &&
            user.departments.includes(announcement.department_id._id) && (
              <AnnouncementMenu
                announcementId={announcement._id}
                departmentId={announcement.department_id._id}
              />
            )}
        </div>
        <p className="opacity-70 pb-4 truncate font-thin">
          {announcement.announcement_content}
        </p>
      </div>
      <div className="pt-4 flex justify-between items-center z-10">
        <div className="flex space-x-2 items-center text-gray-600">
          <small className="">
            {moment(announcement.published_date, "DD/MM/YYYY-HH:mm:ss").format(
              "DD/MM/YYYY"
            )}
          </small>
          <p className="text-sm">
            {isShowDepartment && announcement.department_id.department_name}
          </p>
          <FontAwesomeIcon
            className="p-1 text-green-600 rounded-full bg-green-50 shadow-sm"
            icon={Icon.faCheck}
          />
          {announcement.is_important && (
            <FontAwesomeIcon
              className="p-1 text-yellow-600 rounded-full bg-yellow-50 shadow-sm"
              icon={Icon.faStar}
            />
          )}
        </div>
        <Link to={`/announcements/${announcement._id}/detail`}>
          <button className="my-btn-gradient">Xem chi tiết</button>
        </Link>
      </div>
    </div>
  );
};

export default Announcement;
