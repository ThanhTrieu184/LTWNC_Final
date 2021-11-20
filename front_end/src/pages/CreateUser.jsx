import React, { useState, useEffect } from "react";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { MultiSelect } from "../components";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { createNewUser } from "../redux/slices";

const CreateUser = () => {
  const { choosedItems } = useSelector((state) => state.department);
  const [imgUrl, setImageUrl] = useState();
  // const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      departments: [],
      image: null,
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
      console.log(values);
      // dispatch(createNewUser(values))
    },
  });

  useEffect(() => {
    if (formik.values.departments !== choosedItems) {
      formik.setFieldValue("departments", choosedItems);
    }
  }, [choosedItems, formik]);

  return (
    <section className="w-full min-h-full my-4 pl-8 pr-4">
      <div className="p-6 bg-white rounded-md shadow-md text-gray-700 min-h-full">
        <h1 className="text-2xl font-bold capitalize">Tạo phòng ban mới</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
            <div className="flex flex-col space-y-2 relative">
              <label className="" htmlFor="username">
                Tên đăng nhập
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="input"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username && formik.touched.username && (
                <small className="text-red-500 p-1 -bottom-6 absolute">
                  {formik.errors.username}
                </small>
              )}
            </div>
            <div className="flex flex-col space-y-2 relative">
              <label className="" htmlFor="email">
                Địa chỉ email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="input"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <small className="text-red-500 p-1 -bottom-6 absolute">
                  {formik.errors.email}
                </small>
              )}
            </div>
            <div className="flex flex-col space-y-2 relative">
              <label className="" htmlFor="password">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="input"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <small className="text-red-500 p-1 -bottom-6 absolute">
                  {formik.errors.password}
                </small>
              )}
            </div>

            <div className="flex flex-col space-y-2 relative">
              <label className="" htmlFor="confirmPassword">
                Xác nhận mật khẩu
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="input"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <small className="text-red-500 p-1 -bottom-6 absolute">
                    {formik.errors.confirmPassword}
                  </small>
                )}
            </div>

            <div className="flex flex-col space-y-2 ">
              <label className="" htmlFor="departments ">
                Các chuyên mục phụ trách
              </label>
              <MultiSelect />
              {formik.errors.departments && formik.touched.departments && (
                <small className="text-red-500">
                  {formik.errors.departments}
                </small>
              )}
            </div>

            <div className="flex flex-col space-y-2 relative h-72">
              <label>Hình ảnh</label>
              <div className="mt-1 flex justify-center items-center bg-indigo-50 bg-opacity-10 p-6 border-2 border-gray-300 border-dashed rounded-md h-full">
                <div className="flex flex-col items-center space-y-4 text-lg ">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      className="h-24 w-28 border-4 border-gray-100 shadow-sm"
                      alt=""
                    />
                  ) : (
                    <FontAwesomeIcon icon={Icon.faImages} size="3x" />
                  )}

                  <label className="relative px-2 py-1 rounded-lg shadow-sm bg-white tracking-wide cursor-pointer border hover:shadow-md focus:shadow">
                    <span className="mt-1">Chọn ảnh</span>
                    <input
                      id="image"
                      name="image"
                      accept=".png,.jpg,.gif"
                      type="file"
                      className="mt-2 hidden"
                      onChange={(event) => {
                        if (event.target.files[0]) {
                          formik.setFieldValue("image", event.target.files[0]);
                          setImageUrl(
                            URL.createObjectURL(event.target.files[0])
                          );
                        }
                      }}
                    />
                  </label>
                  <span className="absolute bottom-6">
                    {formik.values.image ? formik.values.image.name : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-br from-red-600 to-indigo-600 text-white leading-5 rounded-full focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateUser;
