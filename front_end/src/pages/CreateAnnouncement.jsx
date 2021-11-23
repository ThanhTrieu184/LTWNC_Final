import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NormalSelect } from "../components";

const CreateAnnouncement = () => {
  const [selected, setSelected] = useState();

  const formik = useFormik({
    initialValues: {
      announcementTitle: "",
      announcementContent: "",
      department: selected,
      isImportant: false,
    },
    validationSchema: Yup.object({
      announcementTitle: Yup.string()
        .max(200, "Tên đăng nhập tối đa 120 kí tự!")
        .required("Vui lòng nhập vào trường này!"),
      announcementContent: Yup.string().required(
        "Vui lòng nhập vào trường này!"
      ),
    }),
    onSubmit: (values) => {
      console.log(values);
      // dispatch(createNewUser(values));
    },
  });

  const handleSelected = (item) => {
    setSelected(item);
    formik.setFieldValue("department", item);
  };
  return (
    <section className="w-full my-4 pl-8 pr-4">
      <div className="p-6 bg-white rounded-md shadow-md text-gray-700">
        <h1 className="text-2xl font-bold capitalize">Tạo thông báo mới</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex mt-8 space-x-4">
            <div className="form-control space-y-8 w-1/2">
              <div className="form-control space-y-2 relative">
                <label
                  className="label font-semibold"
                  htmlFor="announcementTitle"
                >
                  <span className="text-md px-1">Tên thông báo</span>
                </label>
                <input
                  id="announcementTitle"
                  name="announcementTitle"
                  type="text"
                  className="input input-bordered focus:border-indigo-300"
                  value={formik.values.announcementTitle}
                  onChange={formik.handleChange}
                />
                {formik.errors.announcementTitle &&
                  formik.touched.announcementTitle && (
                    <small className="text-red-500 p-1 -bottom-7 absolute">
                      {formik.errors.announcementTitle}
                    </small>
                  )}
              </div>

              <div className="form-control relative">
                <label
                  className="label font-semibold"
                  htmlFor="announcementContent"
                >
                  <span className="text-md px-1">Nội dung thông báo</span>
                </label>
                <textarea
                  id="announcementContent"
                  name="announcementContent"
                  className="textarea h-36 textarea-bordered"
                  value={formik.values.announcementContent}
                  onChange={formik.handleChange}
                ></textarea>
                {formik.errors.announcementTitle &&
                  formik.touched.announcementTitle && (
                    <small className="text-red-500 p-1 -bottom-7 absolute">
                      {formik.errors.announcementTitle}
                    </small>
                  )}
              </div>
            </div>
            <div className="form-control w-1/2 space-y-8">
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="text-md px-1">Chọn chuyên mục</span>
                </label>
                <NormalSelect handleSelected={handleSelected} />
              </div>
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="text-md px-1">Đánh dấu</span>
                </label>
                <label className="cursor-pointer label justify-start space-x-4">
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="isImportant"
                    value={formik.values.isImportant}
                    onChange={formik.handleChange}
                  />
                  <span className="label-text">Thông báo quan trọng</span>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <button type="submit" className="w-full my-btn-gradient">
              <span>Tạo</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateAnnouncement;
