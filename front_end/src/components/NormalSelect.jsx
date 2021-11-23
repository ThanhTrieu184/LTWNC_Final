import React, { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { getDepartmentsByUser } from "../redux/slices";

const NormalSelect = (props) => {
  const dispatch = useDispatch();
  const { departmentsOfUser } = useSelector((state) => state.department);

  useEffect(() => {
    if (departmentsOfUser.length === 0) {
      dispatch(getDepartmentsByUser());
    }
  }, [departmentsOfUser, dispatch]);

  const { handleSelected } = props;
  const [selected, setSelected] = useState();
  const handleOnChange = (item) => {
    setSelected(item);
    handleSelected(item);
  };
  return (
    <div className="m-1">
      <Listbox value={selected} onChange={(item) => handleOnChange(item)}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-3 pl-3 pr-10 text-left bg-white rounded-lg border">
            <span className="block truncate">
              {selected
                ? selected.department_name
                : "Vui lòng chọn một chuyên mục"}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FontAwesomeIcon icon={Icon.faChevronDown} />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full max-h-52 py-1 mt-1 border overflow-auto hide-scroll-bar text-base bg-white rounded-md shadow-md">
              {departmentsOfUser.map((item) => (
                <Listbox.Option
                  key={item._id}
                  className={({ active }) =>
                    `${active ? "text-indigo-600 bg-indigo-50" : ""}
                        cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {item.department_name}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? "text-indigo-600" : ""}
                              absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <FontAwesomeIcon icon={Icon.faCheck} />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default NormalSelect;
