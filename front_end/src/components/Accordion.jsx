import { Disclosure } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faChevronDown,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import { SideBarItem } from ".";

const Accordion = (props) => {
  const { title, content, iconProp } = props;
  return (
    <Disclosure>
      {({ open }) => (
        <Fragment>
          <Disclosure.Button className="flex justify-between items-center w-full p-3 text-md bg-white rounded-md focus:outline-none shadow-md transform hover:scale-110 duration-200">
            <div className="p-2 w-7 rounded flex items-center justify-center bg-red-500 cursor-pointer text-white">
              <FontAwesomeIcon icon={faBullhorn} size="xs"></FontAwesomeIcon>
            </div>
            <span>{title}</span>
            <FontAwesomeIcon
              icon={open ? faChevronDown : faChevronLeft}
              size="xs"
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pb-2 text-sm text-gray-800 flex flex-col gap-3 text-center font-semibold">
            {content.map((c) => (
              <a href="/" key={c._id}>
                <SideBarItem
                  title={c.department_name}
                  iconProp={iconProp}
                  color="bg-indigo-500"
                />
              </a>
            ))}
          </Disclosure.Panel>
        </Fragment>
      )}
    </Disclosure>
  );
};

export default Accordion;
