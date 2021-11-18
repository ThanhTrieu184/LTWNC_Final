import React, { useEffect } from "react";
import { SideBarItem } from "./";
import { Accordion } from "../";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllDepartments } from "../../redux/slices";
import { useSelector, useDispatch } from "react-redux";

const SidebarDetail = () => {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.department);

  useEffect(() => {
    if (departments.length === 0) {
      dispatch(getAllDepartments());
    }
  }, [departments, dispatch]);

  return (
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
            link="/users/add"
            title="Thêm tài khoản mới"
            iconProp={<FontAwesomeIcon icon={Icon.faUserPlus} size="xs" />}
            color="bg-blue-500"
          />
        </div>
      </div>
    </aside>
  );
};

export default SidebarDetail;
