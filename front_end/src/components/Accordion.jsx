import { Disclosure } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import { SideBarItem } from "./sidebar";
import { useSelector } from "react-redux";

const Accordion = (props) => {
  const { title, content, iconProp } = props;
  const { userTheme } = useSelector((state) => state.responsive);
  return (
    <Disclosure>
      {({ open }) => (
        <Fragment>
          <Disclosure.Button
            className={`flex justify-between space-x-2 items-center w-full p-3 text-md ${
              userTheme === "light" ? "bg-white" : "bg-gray-700 text-yellow-50"
            } rounded-md outline-none shadow-md transform hover:scale-110 duration-500`}
          >
            <div className="flex items-center space-x-2">
              <div className="p-2 w-7 rounded flex items-center justify-center bg-red-500 cursor-pointer text-white">
                <FontAwesomeIcon
                  icon={Icon.faBullhorn}
                  size="xs"
                ></FontAwesomeIcon>
              </div>
              <span className="text-md font-normal">{title}</span>
            </div>
            <FontAwesomeIcon
              icon={open ? Icon.faChevronDown : Icon.faChevronLeft}
              size="xs"
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pb-2 text-sm text-gray-800 flex flex-col gap-3 text-center font-semibold">
            {content.map((c) => (
              <div key={c._id}>
                <SideBarItem
                  title={c.department_name}
                  iconProp={iconProp}
                  color="bg-rose-500"
                  link={`/announcements/${c._id}`}
                />
              </div>
            ))}
          </Disclosure.Panel>
        </Fragment>
      )}
    </Disclosure>
  );
};

export default Accordion;
