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
  const { isOpenMenu } = useSelector((state) => state.responsive);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (departments.length === 0 && isLoggedIn) {
      dispatch(getAllDepartments());
    }
  }, [departments, dispatch, isLoggedIn]);

  return (
    <aside
      className={`w-64 relative px-4 border-r ${
        isOpenMenu ? "block" : "hidden"
      } lg:block bg-gradient-to-br from-red-50 to-indigo-50 overflow-y-auto hide-scroll-bar`}
    >
      <div className="mb-6">
        <div className="flex flex-col gap-4 mt-6">
          <Accordion
            title="Phân loại thông báo"
            content={departments}
            iconProp={<FontAwesomeIcon icon={Icon.faBuilding} size="xs" />}
          />
          {user && user.role === "Department" && (
            <SideBarItem
              link="/announcements/create"
              title="Thêm thông báo mới"
              iconProp={<FontAwesomeIcon icon={Icon.faNewspaper} size="xs" />}
              color="bg-green-500"
            />
          )}
          <SideBarItem
            title="Thêm bài viết mới"
            link="/posts/create"
            iconProp={<FontAwesomeIcon icon={Icon.faFileAlt} size="xs" />}
            color="bg-yellow-500"
          />
          {user && user.role === "Admin" && (
            <SideBarItem
              link="/users/create"
              title="Thêm tài khoản mới"
              iconProp={<FontAwesomeIcon icon={Icon.faUserPlus} size="xs" />}
              color="bg-blue-500"
            />
          )}
        </div>
      </div>
    </aside>
  );
};

export default SidebarDetail;
