import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { Loading } from "../components";
import { getAnnouncementById } from "../redux/slices";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

const AnnouncementDetail = () => {
  const dispatch = useDispatch();
  const { currentAnnouncement, isAnnouncementFetching } = useSelector(
    (state) => state.announcement
  );
  const { userTheme } = useSelector((state) => state.responsive);
  const { announcementId } = useParams();

  useEffect(() => {
    if (announcementId) {
      dispatch(getAnnouncementById(announcementId));
    }
  }, [announcementId, dispatch]);

  return (
    <main
      className={`w-full mx-auto px-4 py-2 shadow-md ${
        userTheme !== "light" && "text-yellow-50"
      }`}
    >
      <div
        className={`h-60 w-fulll ${
          userTheme === "light"
            ? "bg-gradient-to-br from-red-50 to-indigo-50"
            : "my-bg-gradient border-gray-700"
        } rounded-t-lg ml-0 lg:ml-4 mt-2 border`}
      ></div>
      <div
        className={`border border-t-0 ${
          userTheme !== "light" && "border-gray-700"
        } rounded-b-lg ml-0 lg:ml-4`}
      >
        <div
          className={`-mt-40 w-2/3 card mx-auto h-72 ${
            userTheme === "light"
              ? "shadow-md bg-gradient-to-br from-red-100 to-indigo-100"
              : "my-bg-gradient"
          }`}
        >
          <Loading type="announcement" />
        </div>
        {isAnnouncementFetching ? (
          <Loading height="150px" />
        ) : (
          <article className="w-10/12 lg:w-2/3 mx-auto py-8 ">
            <h1 className="text-2xl font-bold">
              {currentAnnouncement?.announcement_title}
            </h1>
            <h2 className="mt-2 text-sm text-gray-500 flex space-x-4">
              <span>
                <FontAwesomeIcon icon={Icon.faBuilding} />{" "}
                {currentAnnouncement?.department_id.department_name}
              </span>
              <span>
                <FontAwesomeIcon icon={Icon.faClock} />{" "}
                {currentAnnouncement?.published_date}
              </span>
            </h2>

            <pre className="mt-6 font-sans">
              {currentAnnouncement?.announcement_content}
            </pre>
          </article>
        )}
      </div>
    </main>
  );
};

export default AnnouncementDetail;
