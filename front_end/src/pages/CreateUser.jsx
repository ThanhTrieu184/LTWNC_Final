import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MultiSelect, Loading } from "../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createNewUser, departmentSlice } from "../redux/slices";

const { clearChoosedItem } = departmentSlice.actions;

const CreateUser = () => {
  const { choosedItems } = useSelector((state) => state.department);
  const { isFetching, isSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      departments: [],
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Tên đăng nhập tối thiểu 2 kí tự!")
        .max(100, "Tên đăng nhập tối đa 100 kí tự!")
        .required("Vui lòng nhập vào trường này!"),
      email: Yup.string()
        .email("Email không hợp lệ!")
        .required("Vui lòng nhập vào trường này!"),
      password: Yup.string()
        .min(6, "Mật khẩu tối thiểu 6 kí tự!")
        .required("Vui lòng nhập vào trường này!"),
      confirmPassword: Yup.string()
        .min(6, "Mật khẩu tối thiểu 6 kí tự!")
        .required("Vui lòng nhập vào trường này!")
        .oneOf([Yup.ref("password")], "Mật khẩu không khớp!"),
      departments: Yup.array().min(1, "Vui lòng chọn ít nhất 1 chuyên mục!"),
    }),
    onSubmit: (values) => {
      dispatch(createNewUser(values));
    },
  });

  useEffect(() => {
    if (formik.values.departments !== choosedItems) {
      formik.setFieldValue("departments", choosedItems);
    }
    if (isSuccess) {
      formik.handleReset();
      dispatch(clearChoosedItem());
    }
  }, [choosedItems, dispatch, formik, isSuccess]);

  return isFetching ? (
    <Loading />
  ) : (
    <section className="w-full my-4 pl-8 pr-4">
      <div className="p-6 bg-white rounded-md shadow-md text-gray-700">
        <h1 className="text-2xl font-bold capitalize">Tạo phòng ban mới</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4 flex lg:space-x-6 flex-col lg:flex-row">
            <div className="form-control space-y-8 flex-1 ">
              <div className="form-control space-y-2 relative">
                <label
                  className="font-semibold text-gray-700"
                  htmlFor="username"
                >
                  Tên đăng nhập
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="input input-bordered"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
                {formik.errors.username && formik.touched.username && (
                  <small className="text-red-500 p-1 -bottom-7 absolute">
                    {formik.errors.username}
                  </small>
                )}
              </div>
              <div className="form-control space-y-2 relative">
                <label className="font-semibold text-gray-700" htmlFor="email">
                  Địa chỉ email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input input-bordered"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && (
                  <small className="text-red-500 p-1 -bottom-7 absolute">
                    {formik.errors.email}
                  </small>
                )}
              </div>
              <div className="form-control space-y-2 relative">
                <label
                  className="font-semibold text-gray-700"
                  htmlFor="password"
                >
                  Mật khẩu
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="input input-bordered"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && (
                  <small className="text-red-500 p-1 -bottom-7 absolute">
                    {formik.errors.password}
                  </small>
                )}
              </div>

              <div className="form-control space-y-2 relative">
                <label
                  className="font-semibold text-gray-700"
                  htmlFor="confirmPassword"
                >
                  Xác nhận mật khẩu
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="input input-bordered"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <small className="text-red-500 p-1 -bottom-7 absolute">
                      {formik.errors.confirmPassword}
                    </small>
                  )}
              </div>
            </div>

            <div className="form-control space-y-2 flex-1">
              <label
                className="font-semibold text-gray-700"
                htmlFor="departments "
              >
                Các chuyên mục phụ trách
              </label>
              <MultiSelect />
              {formik.errors.departments && formik.touched.departments && (
                <small className="text-red-500">
                  {formik.errors.departments}
                </small>
              )}
            </div>
          </div>
          <div className="mt-20">
            <button type="submit" className="w-full my-btn-gradient">
              <span className="px-4">Tạo</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateUser;
