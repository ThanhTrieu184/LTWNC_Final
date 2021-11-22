import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faUser, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const PostMenu = () => {
  return (
    <Fragment>
      <Menu as="div" className="inline-block text-left ">
        <div>
          <Menu.Button className="flex justify-center items-center px-1">
            <FontAwesomeIcon icon={faEllipsisH} />
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
          <Menu.Items className="absolute right-2 top-12 bg-white rounded-lg shadow-lg ring-1 ring-indigo-900 ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-50" : ""
                  } group flex rounded-md items-center w-full px-4 py-2 text-sm`}
                >
                  {active ? (
                    <FontAwesomeIcon
                      icon={faPen}
                      className="mr-2 text-gray-800"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPen}
                      className="mr-2 text-gray-600"
                    />
                  )}
                  Sửa bài viết
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-50" : ""
                  } group flex rounded-md items-center w-full px-4 py-2 text-sm`}
                >
                  {active ? (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="mr-2 text-gray-800"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="mr-2 text-gray-600"
                    />
                  )}
                  Xem trang cá nhân
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </Fragment>
  );
};

export default PostMenu;
