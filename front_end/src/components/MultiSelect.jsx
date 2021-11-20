import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { departmentSlice } from "../redux/slices";

const { addItem, removeItem } = departmentSlice.actions;

const Select = () => {
  const { departments, choosedItems } = useSelector(
    (state) => state.department
  );
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const handleChoosed = (item) => {
    if (choosedItems.some((i) => i._id === item._id)) {
      dispatch(removeItem(item));
    } else {
      dispatch(addItem(item));
    }
  };
  return (
    <div className="w-full flex flex-col items-center relative">
      <div className="w-full">
        <div className="mb-2 py-2 px-3 flex border border-gray-200 bg-white rounded-lg">
          <div className="flex flex-auto flex-wrap">
            {choosedItems.map((item) => (
              <div
                key={item._id}
                className="flex space-x-2 w-28 lg:w-36 justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-indigo-700 bg-indigo-50 border border-indigo-300 "
              >
                <div className="text-xs font-normal leading-none max-w-full flex-initial truncate">
                  {item.department_name}
                </div>
                <FontAwesomeIcon
                  onClick={() => handleChoosed(item)}
                  className="cursor-pointer"
                  icon={Icon.faTimes}
                ></FontAwesomeIcon>
              </div>
            ))}

            <div className="flex-1">
              <input
                name="departments"
                disabled={true}
                className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
              />
            </div>
          </div>
          <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
            >
              <FontAwesomeIcon
                icon={isOpen ? Icon.faChevronDown : Icon.faChevronLeft}
              />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } shadow bg-white w-full rounded max-h-48 overflow-y-auto hide-scroll-bar`}
      >
        <div className="flex flex-col w-full">
          {departments.map((d) => (
            <div
              key={d._id}
              onClick={() => handleChoosed(d)}
              className="cursor-pointer w-full border-gray-100 border-b rounded-b hover:bg-indigo-50"
            >
              <div
                className={`flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative ${
                  choosedItems.some((i) => i._id === d._id)
                    ? "border-indigo-600"
                    : ""
                } `}
              >
                <div className="w-full items-center flex">
                  <div className="mx-2 leading-6  ">{d.department_name} </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
