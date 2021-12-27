import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NormalSelect, Loading } from "../components";
import {
  announcementSlice,
  createNewAnnouncement,
  getAnnouncementById,
  updateAnnouncement,
} from "../redux/slices";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useParams, useHistory } from "react-router";

const { clearAnnouncementState } = announcementSlice.actions;

const CreateAnnouncement = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { announcementId } = useParams();
  const [selected, setSelected] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const {
    isAnnouncementFetching,
    isAnnouncementSuccess,
    isAnnouncementError,
    announcementReturnedMessage,
    currentAnnouncement,
  } = useSelector((state) => state.announcement);
  const { userTheme } = useSelector((state) => state.responsive);

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
      department: Yup.object().required("Vui lòng nhập vào trường này!"),
    }),
    onSubmit: (values) => {
      values.announcementId = announcementId;
      isEdit
        ? dispatch(updateAnnouncement(values))
        : dispatch(createNewAnnouncement(values));
    },
  });

  useEffect(() => {
    if (isAnnouncementSuccess) {
      toast.success(announcementReturnedMessage);
      dispatch(clearAnnouncementState());
      formik.handleReset();
      setIsEdit(false);
      history.push("/announcements");
    } else if (isAnnouncementError) {
      toast.error(announcementReturnedMessage);
      dispatch(clearAnnouncementState());
    }
  }, [
    announcementReturnedMessage,
    dispatch,
    formik,
    history,
    isAnnouncementError,
    isAnnouncementSuccess,
  ]);

  useEffect(() => {
    if (announcementId) {
      dispatch(getAnnouncementById(announcementId));
    }
  }, [announcementId, dispatch]);

  useEffect(() => {
    if (currentAnnouncement && currentAnnouncement._id === announcementId) {
      setIsEdit(true);
      if (formik.values === formik.initialValues) {
        formik.setFieldValue(
          "announcementTitle",
          currentAnnouncement.announcement_title
        );
        formik.setFieldValue(
          "announcementContent",
          currentAnnouncement.announcement_content
        );
        formik.setFieldValue("department", currentAnnouncement.department_id);
        formik.setFieldValue("isImportant", currentAnnouncement.is_important);
        setSelected(currentAnnouncement.department_id);
      }
    }
  }, [announcementId, currentAnnouncement, formik]);

  const handleSelected = (item) => {
    setSelected(item);
    formik.setFieldValue("department", item);
  };
  return isAnnouncementFetching ? (
    <Loading />
  ) : (
    <section className="w-full my-4 pl-4 lg:pl-8 pr-4">
      <div
        className={`p-6 ${
          userTheme === "light"
            ? "bg-white text-gray-700"
            : "bg-gray-800 text-yellow-50"
        }  rounded-md shadow-md`}
      >
        <h1 className="text-2xl font-bold capitalize">Tạo thông báo mới</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col lg:flex-row mt-8 space-y-8 lg:space-y-0 lg:space-x-4">
            <div className="form-control space-y-8 w-full lg:w-1/2">
              <div className="form-control space-y-2 relative">
                <label
                  className="label font-semibold"
                  htmlFor="announcementTitle"
                >
                  <span className="font-semibold">Tên thông báo</span>
                </label>
                <input
                  id="announcementTitle"
                  name="announcementTitle"
                  type="text"
                  className={`input input-bordered focus:border-indigo-300 ${
                    userTheme === "light" ? "bg-white" : "bg-gray-700"
                  }`}
                  placeholder="Nhập tên thông báo tại đây"
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

              <div className="form-control relative w-full">
                <label
                  className="label font-semibold"
                  htmlFor="announcementContent"
                >
                  <span className="font-semibold">Nội dung thông báo</span>
                </label>
                <textarea
                  id="announcementContent"
                  name="announcementContent"
                  className={`textarea h-36 textarea-bordered ${
                    userTheme === "light" ? "bg-white" : "bg-gray-700"
                  }`}
                  value={formik.values.announcementContent}
                  onChange={formik.handleChange}
                  placeholder="Nhập nội dung thông báo tại đây"
                ></textarea>
                {formik.errors.announcementContent &&
                  formik.touched.announcementContent && (
                    <small className="text-red-500 p-1 -bottom-7 absolute">
                      {formik.errors.announcementContent}
                    </small>
                  )}
              </div>
            </div>
            <div className="form-control w-full lg:w-1/2 space-y-8">
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="font-semibold relative">
                    Chọn chuyên mục
                  </span>
                </label>
                <NormalSelect
                  handleSelected={handleSelected}
                  selectedItem={selected}
                />
              </div>
              <div className="form-control w-full lg:w-1/2">
                <label className="label font-semibold">
                  <span className="font-semibold">Đánh dấu</span>
                </label>
                <label className="cursor-pointer label justify-start space-x-4">
                  <input
                    type="checkbox"
                    className={`checkbox ${
                      userTheme !== "light" && "border-yellow-50"
                    }`}
                    name="isImportant"
                    checked={formik.values.isImportant}
                    onChange={formik.handleChange}
                  />
                  <span
                    className={`label-text ${
                      userTheme !== "light" && "text-yellow-50"
                    }`}
                  >
                    Thông báo quan trọng
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <button type="submit" className="w-full my-btn-gradient">
              <span>{isEdit ? "Cập nhật" : "Tạo"}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateAnnouncement;
