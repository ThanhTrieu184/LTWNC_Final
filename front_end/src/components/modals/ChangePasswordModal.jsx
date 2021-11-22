import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { userSlice, changePassword } from "../../redux/slices";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const { clearUserState } = userSlice.actions;

const ChangePasswordModal = (props) => {
  const dispatch = useDispatch();
  const { isSuccess, isError, returnedMessage } = useSelector(
    (state) => state.user
  );
  const { isOpen, handleCancel } = props;
  const [isShowOldPass, setIsShowOldPass] = useState(false);
  const [isShowNewPass, setIsShowNewPass] = useState(false);
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
  const formik = useFormik({
    initialValues: {
      oldPass: "",
      newPass: "",
      confirmPass: "",
    },
    validationSchema: Yup.object({
      oldPass: Yup.string()
        .min(6, "Mật khẩu tối thiểu 6 kí tự!")
        .required("Vui lòng nhập vào trường này!"),
      newPass: Yup.string()
        .min(6, "Mật khẩu tối thiểu 6 kí tự!")
        .required("Vui lòng nhập vào trường này!")
        .notOneOf([Yup.ref("oldPass")], "Mật khẩu mới phải khác mật khẩu cũ!"),
      confirmPass: Yup.string()
        .min(6, "Mật khẩu tối thiểu 6 kí tự!")
        .required("Vui lòng nhập vào trường này!")
        .oneOf([Yup.ref("newPass")], "Mật khẩu không khớp với mật khẩu mới!"),
    }),
    onSubmit: (values) => {
      dispatch(changePassword(values));
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error(returnedMessage);
      dispatch(clearUserState());
    } else if (isSuccess) {
      formik.handleReset();
      handleCancel();
      toast.success(returnedMessage);
      dispatch(clearUserState());
    }
  }, [dispatch, returnedMessage, isError, isSuccess, handleCancel, formik]);

  return (
    <Fragment>
      <Toaster />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto"
          onClose={handleCancel}
        >
          <div className="min-h-screen text-center bg-gray-500 bg-opacity-40">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-6 overflow-hidden align-middle transition-all transform bg-gradient-to-br from-red-600 to-indigo-600 shadow-xl rounded-2xl">
                <div className="p-8 bg-white rounded-2xl shadow-xl">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Đổi mật khẩu</h1>
                    <p className="px-4 text-sm mb-8 font-thin text-gray-700 tracking-wide">
                      Đổi mật khẩu thường xuyên để giữ tài khoản của bạn luôn
                      được an toàn nhé!
                    </p>
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-6 text-left">
                      <div className="py-2 relative">
                        <input
                          name="oldPass"
                          type={isShowOldPass ? "text" : "password"}
                          placeholder="Mật khẩu cũ"
                          className="text-sm my-input focus:border-indigo-300"
                          value={formik.values.oldPass}
                          onChange={formik.handleChange}
                        />
                        <div
                          className="absolute right-4 top-5 text-gray-400 cursor-pointer"
                          onClick={() => setIsShowOldPass(!isShowOldPass)}
                        >
                          <FontAwesomeIcon
                            icon={isShowOldPass ? Icon.faEye : Icon.faEyeSlash}
                          />
                        </div>
                        {formik.errors.oldPass && formik.touched.oldPass && (
                          <small className="text-red-500 p-1 absolute">
                            {formik.errors.oldPass}
                          </small>
                        )}
                      </div>
                      <div className="py-2 relative">
                        <input
                          type={isShowNewPass ? "text" : "password"}
                          name="newPass"
                          placeholder="Mật khẩu mới"
                          className="text-sm my-input focus:border-indigo-300"
                          value={formik.values.newPass}
                          onChange={formik.handleChange}
                        />
                        <div
                          className="absolute right-4 top-5 text-gray-400 cursor-pointer"
                          onClick={() => setIsShowNewPass(!isShowNewPass)}
                        >
                          <FontAwesomeIcon
                            icon={isShowNewPass ? Icon.faEye : Icon.faEyeSlash}
                          />
                        </div>
                        {formik.errors.newPass && formik.touched.newPass && (
                          <small className="text-red-500 p-1 absolute">
                            {formik.errors.newPass}
                          </small>
                        )}
                      </div>
                      <div className="py-2 relative">
                        <input
                          type={isShowConfirmPass ? "text" : "password"}
                          name="confirmPass"
                          placeholder="Xác nhận mật khẩu mới"
                          className="text-sm my-input focus:border-indigo-300"
                          value={formik.values.confirmPass}
                          onChange={formik.handleChange}
                        />
                        <div
                          className="absolute right-4 top-5 text-gray-400 cursor-pointer"
                          onClick={() =>
                            setIsShowConfirmPass(!isShowConfirmPass)
                          }
                        >
                          <FontAwesomeIcon
                            icon={
                              isShowConfirmPass ? Icon.faEye : Icon.faEyeSlash
                            }
                          />
                        </div>
                        {formik.errors.confirmPass &&
                          formik.touched.confirmPass && (
                            <small className="text-red-500 p-1 absolute">
                              {formik.errors.confirmPass}
                            </small>
                          )}
                      </div>
                    </div>
                    <div className="text-center mt-8">
                      <button type="submit" className="w-64 my-btn-gradient">
                        Cập nhật
                      </button>
                      <p className="mt-4 text-sm">
                        <Link to="/">Quên mật khẩu?</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default ChangePasswordModal;
