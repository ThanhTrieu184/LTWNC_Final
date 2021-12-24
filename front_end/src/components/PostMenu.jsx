import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ConfirmModal } from ".";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/slices";

const PostMenu = ({ post }) => {
  const dispatch = useDispatch();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { userTheme } = useSelector((state) => state.responsive);
  const handleDeletePost = () => {
    setIsOpenConfirmModal(false);
    dispatch(deletePost(post._id));
  };

  return (
    <Fragment>
      <Menu as="div" className="inline-block text-left ">
        <div>
          <Menu.Button className="flex justify-center items-center px-1">
            <FontAwesomeIcon icon={Icon.faEllipsisH} />
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
            className={`absolute z-20 right-2 top-12 ${
              userTheme === "light" ? "bg-white" : "bg-gray-700"
            } rounded-lg shadow-lg ring-1 ring-indigo-900 ring-opacity-5 focus:outline-none`}
          >
            {user.id === post.posted_by?._id && (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`/posts/${post._id}/edit`}
                    className={`${
                      active && "bg-gray-100"
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
                      Sửa bài viết
                    </span>
                  </Link>
                )}
              </Menu.Item>
            )}
            {user.id === post.posted_by?._id && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setIsOpenConfirmModal(true)}
                    className={`${
                      active && "bg-gray-100"
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
                      Xóa bài viết
                    </span>
                  </button>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/users/${post.posted_by?._id}/profile`}
                  className={`${
                    active && "bg-gray-100"
                  } group flex rounded-md items-center w-full px-4 py-2 text-sm `}
                >
                  {active ? (
                    <FontAwesomeIcon
                      icon={Icon.faUser}
                      className="mr-2 text-gray-800"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={Icon.faUser}
                      className="mr-2 text-gray-600"
                    />
                  )}
                  <span
                    className={`${userTheme !== "light" && "text-gray-400"}`}
                  >
                    Xem trang cá nhân
                  </span>
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
      <ConfirmModal
        title="Bạn có chắc muốn xóa bài viết này?"
        message="Một khi nhấn vào xác nhận, bạn sẽ không thể khôi phục lại bài viết mà bạn đã xóa."
        isOpen={isOpenConfirmModal}
        handleCancel={() => setIsOpenConfirmModal(false)}
        handleConfirm={() => handleDeletePost()}
      />
    </Fragment>
  );
};

export default PostMenu;
