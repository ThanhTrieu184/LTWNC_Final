import React, { useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userSlice, updateProfile } from "../../redux/slices";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "..";

const { clearUserState } = userSlice.actions;

const ProfileModal = (props) => {
  const dispatch = useDispatch();
  const { isFetching, isSuccess } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const { isOpen, handleCancel } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [imgUrl, setImageUrl] = useState();
  let completeButtonRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      username: user ? user.username : "",
      email: user && user.email ? user.email : "",
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
    }),
    onSubmit: (values) => {
      const data = new FormData();
      data.append("image", values.image);
      data.append("username", values.username);
      data.append("email", values.email);
      dispatch(updateProfile(data));
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setIsEdit(false);
      dispatch(clearUserState);
      formik.handleReset();
    }
  }, [dispatch, formik, isSuccess]);

  return (
    <Fragment>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          initialFocus={completeButtonRef}
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto"
          onClose={handleCancel}
        >
          <div className="min-h-screen px-4 text-center bg-gray-500 bg-opacity-40">
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
              <div className="inline-block w-full max-w-lg overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {isFetching ? (
                  <Loading />
                ) : (
                  <div className="flex items-center w-full justify-center">
                    <div className="w-full relative">
                      <FontAwesomeIcon
                        icon={Icon.faPen}
                        className={`${
                          isEdit ? "hidden" : "block"
                        } text-gray-600 cursor-pointer absolute top-4 right-4`}
                        onClick={() => setIsEdit(true)}
                      />
                      <div className="bg-white shadow-xl rounded-lg py-3">
                        <div className=" p-2">
                          <img
                            className="w-32 h-32 rounded-full mx-auto border"
                            src={
                              imgUrl
                                ? imgUrl
                                : user && user.imageUrl
                                ? user.imageUrl
                                : "https://res.cloudinary.com/mrafternoon184/image/upload/v1638073308/ltwnc/user_icon_lp4u7l.png"
                            }
                            alt="Avatar"
                          />
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                          <div className="p-2 text-center">
                            <div className="flex items-center justify-center">
                              <input
                                type="text"
                                name="username"
                                className="input input-ghost input-sm text-xl font-medium text-center w-2/3"
                                value={formik.values.username}
                                placeholder="Nhập tên đăng nhập tại đây"
                                onChange={formik.handleChange}
                                disabled={!isEdit}
                              />
                            </div>
                            <div className=" text-gray-500 text-xs font-semibold my-1">
                              <p>{user ? user.role : ""}</p>
                            </div>
                            <div className="form-control my-4 justify-center space-y-2">
                              <div className="flex justify-center ">
                                <input
                                  type="text"
                                  name="email"
                                  className={`input input-sm w-2/3 text-center input-ghost font-semibold`}
                                  value={formik.values.email}
                                  disabled={!isEdit}
                                  placeholder="Nhập email tại đây"
                                  onChange={formik.handleChange}
                                />
                              </div>
                              <div
                                className={`${
                                  isEdit ? "block" : "hidden"
                                } form-control relative h-36`}
                              >
                                <div className="mt-1 mx-4 flex justify-center items-center border-2 border-gray-300 border-dashed rounded-md h-full">
                                  <div className="form-control items-center space-y-4 text-lg ">
                                    <label className="px-2 py-1 rounded-lg shadow-sm bg-white tracking-wide cursor-pointer border hover:shadow-md focus:shadow">
                                      <span className="mt-1">Chọn ảnh</span>
                                      <input
                                        id="image"
                                        name="image"
                                        accept=".png,.jpg,.gif"
                                        type="file"
                                        className="mt-2 hidden"
                                        onChange={(event) => {
                                          if (event.target.files[0]) {
                                            formik.setFieldValue(
                                              "image",
                                              event.target.files[0]
                                            );
                                            setImageUrl(
                                              URL.createObjectURL(
                                                event.target.files[0]
                                              )
                                            );
                                          }
                                        }}
                                      />
                                    </label>
                                    <span className="mx-2">
                                      {formik.values.image
                                        ? formik.values.image.name
                                        : ""}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <button
                                  type="submit"
                                  className={`${
                                    isEdit
                                      ? "my-btn-gradient"
                                      : "btn rounded-full"
                                  }  w-32 mt-8`}
                                  disabled={!isEdit}
                                  ref={completeButtonRef}
                                >
                                  Cập nhật
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default ProfileModal;
