import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authSlice, loginUser, loginGoogle } from "../redux/slices/auth.slice";
import toast, { Toaster } from "react-hot-toast";
import { Loading } from "../components";
import { signInWithGoogle } from "../services/firebase";
import { checkValidEmail } from "../utils/checkValidEmail";

const { clearState } = authSlice.actions;

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Tên đăng nhập tối thiểu 2 kí tự!")
        .max(30, "Tên đăng nhập tối đa 30 kí tự!")
        .required("Vui lòng nhập vào trường này!"),
      password: Yup.string()
        .min(6, "Mật khẩu tối thiểu 6 kí tự!")
        .required("Vui lòng nhập vào trường này!"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  const [loading, setLoading] = useState(false);
  const { isFetching, isSuccess, isError, errorMessages, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [history, user]);

  useEffect(() => {
    setLoading(isFetching);
    if (isError) {
      if (typeof errorMessages === "string") {
        toast.error(errorMessages);
      } else if (typeof errorMessages === "object") {
        formik.setErrors(errorMessages);
      }
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      history.push("/");
    }
  }, [
    dispatch,
    errorMessages,
    formik,
    history,
    isError,
    isFetching,
    isSuccess,
  ]);

  const handleLoginGoogle = async () => {
    const res = await signInWithGoogle();
    if (typeof res === "object") {
      if (
        checkValidEmail(res.email, "@tdtu.edu.vn") ||
        checkValidEmail(res.email, "@student.tdtu.edu.vn")
      ) {
        dispatch(
          loginGoogle({
            uid: res.uid,
            email: res.email,
            photoURL: res.photoURL,
          })
        );
      } else {
        toast.error("Vui lòng sử dụng email TDTU!");
      }
    }
  };
  return (
    <Fragment>
      <Toaster />
      {isFetching || isSuccess ? (
        <Loading height="500px" width="500px" />
      ) : (
        <section className="max-w-6xl mx-auto my-10 border shadow-lg rounded-xl flex hover:shadow-xl">
          <div className="lg:flex w-1/2 hidden relative items-center">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-600  to-indigo-600 rounded-l-lg"></div>
            <div className="w-full px-12 z-10 text-center text-gray-100">
              <h1 className="text-5xl font-bold tracking-wide uppercase">
                Cổng thông tin sinh viên
              </h1>
              <p className="text-md font-thin my-4">
                Đăng nhập để sử dụng hệ thống thông tin sinh viên nhé!
              </p>
            </div>
            <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-6 text-white">
              <a
                href="https://www.youtube.com/c/TDTUniversity/"
                className="cursor-pointer"
              >
                <FontAwesomeIcon icon={["fab", "youtube"]} />
              </a>
              <a
                href="https://www.facebook.com/tonducthanguniversity/"
                className="cursor-pointer"
              >
                <FontAwesomeIcon icon={["fab", "facebook"]} />
              </a>
              <a href="https://tdtu.edu.vn/" className="cursor-pointer">
                <FontAwesomeIcon icon={faGlobe} />
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
            <div className="w-full py-6 z-20 ">
              <h1 className="my-6">
                <img
                  src="https://res.cloudinary.com/mrafternoon184/image/upload/v1638073300/ltwnc/logo_whrc9h.png"
                  alt="logo"
                  className="mx-auto"
                />
              </h1>

              <form
                onSubmit={formik.handleSubmit}
                className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto pt-8 text-left"
              >
                <div className="form-control py-4 relative">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Tên đăng nhập"
                    className={`text-lg w-full input input-lg input-bordered`}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.username && formik.touched.username && (
                    <small className="text-red-500 p-1 -bottom-3 absolute">
                      {formik.errors.username}
                    </small>
                  )}
                </div>
                <div className="form-control py-4 relative">
                  <input
                    className={`text-lg w-full input input-lg input-bordered`}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Mật khẩu"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <small className="text-red-500 p-1 -bottom-3 absolute">
                      {formik.errors.password}
                    </small>
                  )}
                </div>
                <p className="separator py-8 text-gray-500">Hoặc</p>

                <div className="space-x-2 flex justify-center items-center text-gray-600">
                  <span
                    onClick={handleLoginGoogle}
                    className="flex w-full items-center justify-center space-x-4 border px-4 py-2 rounded-xl shadow-sm cursor-pointer hover:shadow"
                  >
                    <img
                      src="https://res.cloudinary.com/mrafternoon184/image/upload/v1638073280/ltwnc/gg_ikkhhk.png"
                      alt="gg icon"
                      className="h-8 w-8"
                    />
                    <button type="button">Đăng nhập bằng Gmail</button>
                  </span>
                </div>

                <div className="px-2 py-10">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`${
                      loading ? "cursor-not-allowed" : ""
                    } w-full my-btn-gradient`}
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Login;
