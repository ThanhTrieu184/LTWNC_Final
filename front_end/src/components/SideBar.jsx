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
import { Loading } from "../components";

// const { clearState } = authSlice.actions;

const SideBar = () => {
  const { user, isFetching } = useSelector((state) => state.auth);
  const imageUrl = user ? user.imageUrl : "";
  const [isShowSideBar, setIsShowSideBar] = useState("hidden");
  const [isClicked, setIsClicked] = useState();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  const handleShowSideBar = (item) => {
    if (isShowSideBar === "hidden") {
      setIsClicked(item);
      setIsShowSideBar("block");
    } else {
      setIsClicked(0);
      setIsShowSideBar("hidden");
    }
  };
  return (
    <Fragment>
      <aside className="w-20 relative z-20 flex-shrink-0  px-2 overflow-y-auto bg-red-800 sm:block">
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
                onClick={() => handleShowSideBar(1)}
              >
                <FontAwesomeIcon icon={faAlignLeft}></FontAwesomeIcon>
              </li>
              <li
                className={`${
                  isClicked === 2 ? "animate-bounce" : ""
                } mb-3 p-2 rounded-md flex items-center justify-center bg-pink-400 cursor-pointer`}
                onClick={() => handleShowSideBar(2)}
              >
                <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>
              </li>
              <li
                className={`${
                  isClicked === 3 ? "animate-bounce" : ""
                } mb-3 p-2 rounded-md flex items-center justify-center bg-yellow-400 cursor-pointer`}
                onClick={() => handleShowSideBar(3)}
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
        className={`${isShowSideBar} w-64 z-0 relative flex-shrink-0 px-4 overflow-y-auto bg-red-100`}
      >
        <div className="mb-6">
          <div className="grid gap-4 grid-cols-2 mt-6">
            <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
              <div className="rounded-full p-2 bg-indigo-200 flex flex-col items-center">
                <i className="fas fa-chart-pie fa-sm text-indigo-600"></i>
              </div>
              <p className="text-xs mt-1 text-center font-semibold">
                Dashboard
              </p>
            </div>

            <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
              <div className="rounded-full p-2 bg-indigo-200 flex flex-col items-center">
                <i className="fas fa-calculator fa-sm text-indigo-600"></i>
              </div>
              <p className="text-xs mt-1 text-center font-semibold">
                Calculator
              </p>
            </div>

            <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
              <div className="rounded-full p-2 bg-indigo-200 flex flex-col items-center">
                <i className="fas fa-wallet fa-sm text-indigo-600"></i>
              </div>
              <p className="text-xs mt-1 text-center font-semibold">Wallet</p>
            </div>

            <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
              <div className="rounded-full p-2 bg-indigo-200 flex flex-col items-center">
                <i className="fas fa-archive fa-sm text-indigo-600"></i>
              </div>
              <p className="text-xs mt-1 text-center font-semibold">Saving</p>
            </div>

            <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
              <div className="rounded-full p-2 bg-indigo-200 flex flex-col items-center">
                <i className="fas fa-money-bill-wave-alt fa-sm text-indigo-600"></i>
              </div>
              <p className="text-xs mt-1 text-center font-semibold">
                Currencies
              </p>
            </div>

            <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
              <div className="rounded-full p-2 bg-indigo-200 flex flex-col items-center">
                <i className="fas fa-shopping-basket fa-sm text-indigo-600"></i>
              </div>
              <p className="text-xs mt-1 text-center font-semibold">Expenses</p>
            </div>
          </div>
        </div>
      </aside>
    </Fragment>
  );
};

export default SideBar;
