import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ConfirmModal } from ".";
import { deleteAnnouncement } from "../redux/slices";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AnnouncementMenu = ({ announcementId, departmentId }) => {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const { userTheme } = useSelector((state) => state.responsive);
  const dispatch = useDispatch();
  const handleDeleteAnnouncement = () => {
    setIsOpenConfirmModal(false);
    dispatch(deleteAnnouncement({ announcementId, departmentId }));
  };

  return (
    <Fragment>
      <Menu as="div" className="inline-block text-left ">
        <div>
          <Menu.Button className="flex justify-center items-center px-1">
            <FontAwesomeIcon icon={Icon.faEllipsisV} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute z-20 right-0 top-6 ${
              userTheme === "light" ? "bg-white" : "bg-gray-700"
            } rounded-lg shadow-lg focus:outline-none`}
          >
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/announcements/${announcementId}/edit`}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } group flex rounded-md items-center w-full px-4 py-2 text-sm`}
                >
                  {active ? (
                    <FontAwesomeIcon
                      icon={Icon.faPen}
                      className="mr-2 text-gray-800"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={Icon.faPen}
                      className="mr-2 text-gray-600"
                    />
                  )}
                  <span
                    className={`${userTheme !== "light" && "text-gray-400"}`}
                  >
                    Sửa thông báo
                  </span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setIsOpenConfirmModal(true)}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } group flex rounded-md items-center w-full px-4 py-2 text-sm`}
                >
                  {active ? (
                    <FontAwesomeIcon
                      icon={Icon.faTrash}
                      className="mr-2 text-gray-800"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={Icon.faTrash}
                      className="mr-2 text-gray-600"
                    />
                  )}
                  <span
                    className={`${userTheme !== "light" && "text-gray-400"}`}
                  >
                    Xóa thông báo
                  </span>
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
      <ConfirmModal
        title="Bạn có chắc muốn xóa thông báo này?"
        message="Một khi nhấn vào xác nhận, bạn sẽ không thể khôi phục lại thông báo mà bạn đã xóa."
        isOpen={isOpenConfirmModal}
        handleCancel={() => setIsOpenConfirmModal(false)}
        handleConfirm={() => handleDeleteAnnouncement()}
      />
    </Fragment>
  );
};

export default AnnouncementMenu;
