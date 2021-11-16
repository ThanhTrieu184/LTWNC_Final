import { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/slices/auth.slice";
import { getAllDepartments } from "../redux/slices/department.slice";
import {
  Loading,
  SideBarItem,
  ConfirmLogoutModal,
  Accordion,
} from "../components";
import userIcon from "../assets/img/user_icon.png";

const SideBar = () => {
  const { user, isFetching } = useSelector((state) => state.auth);
  const { departments } = useSelector((state) => state.department);

  const imageUrl = user.imageUrl ? user.imageUrl : userIcon;
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    setIsOpenLogoutModal(false);
    dispatch(logOut());
  };
  useEffect(() => {
    if (departments.length === 0) {
      dispatch(getAllDepartments());
    }
  }, [dispatch, departments]);

  return isFetching ? (
    <Loading />
  ) : (
    <Fragment>
      <aside className="w-20 relative z-0 px-2 bg-gradient-to-br from-red-600 to-indigo-600">
        <div className="mb-6">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-gray-50 border-2 border-white shadow-md mt-2">
              <img src={imageUrl} alt="" className="rounded-full w-auto" />
            </div>
          </div>

          <div>
            <ul className="mt-6 leading-10 px-4 text-gray-50">
              <li
                className={` mb-3 p-2 rounded-md flex items-center justify-center bg-white text-yellow-500 cursor-pointer `}
              >
                <FontAwesomeIcon icon={Icon.faSun}></FontAwesomeIcon>
              </li>
              <li
                className={` mb-3 p-2 rounded-md flex items-center justify-center bg-pink-500 cursor-pointer`}
              >
                <FontAwesomeIcon icon={Icon.faKey}></FontAwesomeIcon>
              </li>
              <li
                className={` mb-3 p-2 rounded-md flex items-center justify-center bg-purple-500 cursor-pointer`}
              >
                <FontAwesomeIcon icon={Icon.faCog}></FontAwesomeIcon>
              </li>

              <li
                onClick={() => setIsOpenLogoutModal(true)}
                className="absolute bottom-0 mb-3 p-2 rounded-full flex items-center mx-auto bg-white cursor-pointer text-gray-400"
              >
                <FontAwesomeIcon icon={Icon.faPowerOff}></FontAwesomeIcon>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <aside
        className={`w-64 z-20 relative px-4 border-r hidden lg:block bg-gradient-to-br from-red-50 to-indigo-50 overflow-y-auto hide-scroll-bar`}
      >
        <div className="mb-6">
          <div className="flex flex-col gap-4 mt-6">
            <Accordion
              title="Phân loại thông báo"
              content={departments}
              iconProp={<FontAwesomeIcon icon={Icon.faBuilding} size="xs" />}
            />
            <SideBarItem
              title="Thêm thông báo mới"
              iconProp={<FontAwesomeIcon icon={Icon.faNewspaper} size="xs" />}
              color="bg-green-500"
            />
            <SideBarItem
              title="Thêm bài viết mới"
              iconProp={<FontAwesomeIcon icon={Icon.faFileAlt} size="xs" />}
              color="bg-yellow-500"
            />
            <SideBarItem
              title="Thêm tài khoản mới"
              iconProp={<FontAwesomeIcon icon={Icon.faUserPlus} size="xs" />}
              color="bg-blue-500"
            />
          </div>
        </div>
      </aside>

      <ConfirmLogoutModal
        isOpen={isOpenLogoutModal}
        handleCancel={() => setIsOpenLogoutModal(false)}
        handleConfirm={() => handleLogout()}
      />
    </Fragment>
  );
};

export default SideBar;
