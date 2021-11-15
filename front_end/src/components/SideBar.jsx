import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faHeadphones,
  faPowerOff,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/slices/auth.slice";
import { Loading, SideBarItem } from "../components";

// const { clearState } = authSlice.actions;

const SideBar = () => {
  const { user, isFetching } = useSelector((state) => state.auth);
  const imageUrl = user ? user.imageUrl : "";
  const [isClicked, setIsClicked] = useState(1);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <Fragment>
      <aside className="w-20 relative z-0 px-2 bg-gradient-to-br from-red-600 to-indigo-600">
        <div className="mb-6">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white shadow-md mt-2">
              <img src={imageUrl} alt="" className="rounded-full w-auto" />
            </div>
          </div>

          <div>
            <ul className="mt-6 leading-10 px-4 text-gray-50">
              <li
                className={`${
                  isClicked === 1 ? "animate-bounce" : ""
                } mb-3 p-2 rounded-md flex items-center justify-center bg-blue-400 cursor-pointer `}
                onClick={() => setIsClicked(1)}
              >
                <FontAwesomeIcon icon={faAlignLeft}></FontAwesomeIcon>
              </li>
              <li
                className={`${
                  isClicked === 2 ? "animate-bounce" : ""
                } mb-3 p-2 rounded-md flex items-center justify-center bg-pink-400 cursor-pointer`}
                onClick={() => setIsClicked(2)}
              >
                <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>
              </li>
              <li
                className={`${
                  isClicked === 3 ? "animate-bounce" : ""
                } mb-3 p-2 rounded-md flex items-center justify-center bg-yellow-400 cursor-pointer`}
                onClick={() => setIsClicked(3)}
              >
                <FontAwesomeIcon icon={faHeadphones}></FontAwesomeIcon>
              </li>
              {isFetching ? (
                <li className="absolute bottom-0">
                  <Loading />
                </li>
              ) : (
                <li
                  onClick={handleLogout}
                  className="absolute bottom-0 mb-3 p-2 rounded-full flex items-center mx-auto bg-white cursor-pointer text-gray-400"
                >
                  <FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon>
                </li>
              )}
            </ul>
          </div>
        </div>
      </aside>
      <aside
        className={`w-64 z-20 relative px-4 border-r hidden lg:block bg-gradient-to-br from-red-50 to-indigo-50 overflow-y-auto hide-scroll-bar`}
      >
        <div className="mb-6">
          <div className="flex flex-col gap-4 mt-6">
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
          </div>
        </div>
      </aside>
    </Fragment>
  );
};

export default SideBar;
