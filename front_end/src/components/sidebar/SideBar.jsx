import { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logOut, authSlice } from "../../redux/slices";
import toast, { Toaster } from "react-hot-toast";
import { SidebarDetail } from "./";
import { Loading, ConfirmLogoutModal, ChangePasswordModal } from "../";
import userIcon from "../../assets/img/user_icon.png";

const { clearState } = authSlice.actions;

const SideBar = () => {
  const { user, isFetching, isError, errorMessages } = useSelector(
    (state) => state.auth
  );
  const imageUrl = user && user.imageUrl ? user.imageUrl : userIcon;
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
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
  }, [dispatch, isError, errorMessages]);

  return isFetching ? (
    <Loading />
  ) : (
    <Fragment>
      <Toaster />
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
                onClick={() => setIsOpenChangePasswordModal(true)}
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
      <SidebarDetail />
      <ConfirmLogoutModal
        isOpen={isOpenLogoutModal}
        handleCancel={() => setIsOpenLogoutModal(false)}
        handleConfirm={() => handleLogout()}
      />
      <ChangePasswordModal
        isOpen={isOpenChangePasswordModal}
        handleCancel={() => setIsOpenChangePasswordModal(false)}
      />
    </Fragment>
  );
};

export default SideBar;
