import { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  logOut,
  authSlice,
  departmentSlice,
  responsiveSlice,
} from "../../redux/slices";
import toast, { Toaster } from "react-hot-toast";
import { SidebarDetail } from "./";
import { Loading, ConfirmModal, ChangePasswordModal, ProfileModal } from "../";
import { Link } from "react-router-dom";

const { clearState } = authSlice.actions;
const { clearDepartmentState } = departmentSlice.actions;
const { openMenu } = responsiveSlice.actions;

const SideBar = () => {
  const { user, isFetching, isError, isSuccess, errorMessages } = useSelector(
    (state) => state.auth
  );
  const { isOpenMenu } = useSelector((state) => state.responsive);
  const imageUrl =
    user && user.imageUrl
      ? user.imageUrl
      : "https://res.cloudinary.com/mrafternoon184/image/upload/v1638073308/ltwnc/user_icon_lp4u7l.png";
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
  const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
  const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] =
    useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    setIsOpenLogoutModal(false);
    dispatch(logOut());
  };

  useEffect(() => {
    if (isError) {
      if (typeof errorMessages === "string") {
        toast.error(errorMessages);
        dispatch(clearState());
      }
    }
    if (isSuccess) {
      dispatch(clearDepartmentState());
    }
  }, [dispatch, isError, errorMessages, isSuccess]);

  return isFetching ? (
    <Loading />
  ) : (
    <Fragment>
      <Toaster />
      <aside className="w-20 relative z-0 px-2 my-bg-gradient">
        <div className="mb-6">
          <div className="flex justify-center">
            <div
              className="bg-gray-50 rounded-full border-2 border-white shadow-md mt-2 cursor-pointer"
              onClick={() => setIsOpenProfileModal(true)}
            >
              <img
                src={imageUrl}
                alt="avt"
                className="w-12 h-12 rounded-full"
              />
            </div>
          </div>

          <div>
            <ul className="mt-6 leading-10 px-4 text-gray-50">
              <li
                onClick={() => dispatch(openMenu(!isOpenMenu))}
                className={`flex lg:hidden mb-3 p-2 rounded-md items-center justify-center bg-white text-yellow-500 cursor-pointer `}
              >
                <FontAwesomeIcon icon={Icon.faBars}></FontAwesomeIcon>
              </li>
              <li
                onClick={() => setIsOpenChangePasswordModal(true)}
                className={` mb-3 p-2 rounded-md flex items-center justify-center bg-pink-500 cursor-pointer`}
              >
                <FontAwesomeIcon icon={Icon.faKey}></FontAwesomeIcon>
              </li>
              <Link to="/">
                <li
                  onClick={() => isOpenMenu && dispatch(openMenu(false))}
                  className={` mb-3 p-2 rounded-md flex items-center justify-center bg-purple-500 cursor-pointer`}
                >
                  <FontAwesomeIcon icon={Icon.faHome}></FontAwesomeIcon>
                </li>
              </Link>

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
      <SidebarDetail />
      <ConfirmModal
        title="Xác nhận đăng xuất?"
        message="Một khi bạn nhấn vào 'Có', bạn sẽ bị đăng xuất khỏi hệ thống. Để truy cập vào hệ thống bạn cần phải đăng nhập lại."
        isOpen={isOpenLogoutModal}
        handleCancel={() => setIsOpenLogoutModal(false)}
        handleConfirm={() => handleLogout()}
      />
      <ChangePasswordModal
        isOpen={isOpenChangePasswordModal}
        handleCancel={() => setIsOpenChangePasswordModal(false)}
      />
      <ProfileModal
        isOpen={isOpenProfileModal}
        handleCancel={() => setIsOpenProfileModal(false)}
      />
    </Fragment>
  );
};

export default SideBar;
