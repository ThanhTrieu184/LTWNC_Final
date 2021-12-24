import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loading, YoutubeEmbedded } from "../components";
import {
  postSlice,
  createNewPost,
  getPostById,
  updatePost,
} from "../redux/slices";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

const { clearPostState } = postSlice.actions;

const CreatePost = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const {
    isPostFetching,
    isPostSuccess,
    isPostError,
    postReturnedMessage,
    currentPost,
  } = useSelector((state) => state.post);
  const { userTheme } = useSelector((state) => state.responsive);
  const [imgUrl, setImageUrl] = useState();
  const [videoId, setVideoId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const formik = useFormik({
    initialValues: {
      postDesc: "",
      videoLink: "",
      image: null,
    },
    validationSchema: Yup.object({
      postDesc: Yup.string().required("Vui lòng nhập vào trường này!"),
      videoLink: Yup.string().when("image", {
        is: (image) => image === null,
        then: Yup.string().required("Vui lòng thêm link video hoặc thêm ảnh!"),
      }),
    }),
    onSubmit: (values) => {
      if (formik.values.image) {
        const data = new FormData();
        data.append("image", values.image);
        data.append("postDesc", values.postDesc);
        isEdit
          ? dispatch(updatePost({ postId, values: data }))
          : dispatch(createNewPost(data));
      } else {
        isEdit
          ? dispatch(updatePost({ postId, values }))
          : dispatch(createNewPost(values));
      }
    },
  });
  useEffect(() => {
    if (isPostError) {
      toast.error(postReturnedMessage);
      dispatch(clearPostState());
    } else if (isPostSuccess) {
      toast.success(postReturnedMessage);
      dispatch(clearPostState());
      formik.handleReset();
      setVideoId();
      setImageUrl();
      setIsEdit(false);
      history.push("/");
    }
  }, [
    dispatch,
    formik,
    history,
    isPostError,
    isPostSuccess,
    postReturnedMessage,
  ]);
  useEffect(() => {
    if (postId) {
      dispatch(getPostById(postId));
      setIsEdit(true);
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (
      currentPost &&
      currentPost?._id === postId &&
      formik.values === formik.initialValues
    ) {
      formik.setFieldValue("postDesc", currentPost.post_caption);
      if (currentPost.post_image_url) {
        setImageUrl(currentPost.post_image_url);
        formik.setFieldValue("image", currentPost.post_image_url);
      } else {
        setVideoId(currentPost?.post_video_id);
        formik.setFieldValue(
          "videoLink",
          `https://www.youtube.com/watch?v=${currentPost?.post_video_id}`
        );
      }
    }
  }, [currentPost, formik, postId]);

  return isPostFetching ? (
    <Loading heught="500px" />
  ) : (
    <div className="my-4 px-4 lg:pl-8">
      <form onSubmit={formik.handleSubmit}>
        <div className={`block md:flex`}>
          <div
            className={`w-full md:w-3/5 p-4 my-4 md:my-0 sm:p-6 lg:p-8 shadow-md rounded-lg border text-center transition duration-500 ${
              userTheme === "light"
                ? "border-gray-100"
                : "bg-gray-800 text-yellow-50 border-gray-700"
            }`}
          >
            <span className="text-2xl font-bold capitalize block">
              Thêm bài viết mới
            </span>
            <span
              className={`${
                userTheme === "light" ? "text-gray-700" : "text-yellow-50"
              } text-sm font-thin`}
            >
              Hãy chia sẻ với mọi người suy nghĩ của bạn lúc này
            </span>
            <div className="w-full my-4 h-64">
              {imgUrl ? (
                <img
                  id="showImage"
                  className="max-w-full mx-auto max-h-64 items-center rounded-md"
                  src={imgUrl}
                  alt=""
                />
              ) : videoId ? (
                <YoutubeEmbedded embedId={videoId} />
              ) : (
                <div
                  className={`${
                    userTheme === "light" ? "bg-gray-50" : "bg-gray-700"
                  }bg-opacity-20 border-2 border-gray-300 border-dashed rounded-md h-full flex justify-center items-center`}
                >
                  <FontAwesomeIcon
                    icon={Icon.faImage}
                    size="6x"
                    className="text-gray-200"
                  />
                </div>
              )}
            </div>
            <div className="form-control items-center space-y-4 text-lg ">
              <label
                className={`px-2 py-1 rounded-lg shadow-sm ${
                  userTheme === "light"
                    ? "bg-white"
                    : "text-yellow-50 bg-gray-700 border-gray-700"
                } cursor-pointer border hover:shadow-md focus:shadow`}
              >
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
                      formik.setFieldValue("videoLink", "");
                      setVideoId("");
                      setImageUrl(URL.createObjectURL(event.target.files[0]));
                      event.target.value = null;
                    }
                  }}
                />
              </label>
              <div
                className={`${
                  formik.values.image ? "flex" : "hidden"
                } space-x-8 items-center`}
              >
                <span className="mx-2">
                  {formik.values.image?.name
                    ? formik.values.image.name
                    : "Old picture"}
                </span>
                <span
                  onClick={() => {
                    setImageUrl("");
                    formik.setFieldValue("image", null);
                  }}
                >
                  <FontAwesomeIcon
                    icon={Icon.faTimes}
                    className="text-gray-500 cursor-pointer"
                  />
                </span>
              </div>
            </div>
          </div>

          <div
            className={`w-full md:w-2/5 p-8 lg:ml-4 shadow-md rounded-lg border ${
              userTheme === "light" ? "border-gray-100" : "border-gray-700"
            }`}
          >
            <div
              className={`rounded-lg shadow p-6 h-full transition duration-500 ${
                userTheme === "light" ? "bg-white" : "bg-gray-800 "
              }`}
            >
              <div className="pb-8">
                <label
                  htmlFor="postDesc"
                  className={`font-semibold ${
                    userTheme === "light" ? "text-gray-700" : "text-yellow-50"
                  } block pb-1`}
                >
                  Bạn đang nghĩ gì?
                </label>
                <div className="flex relative">
                  <textarea
                    id="postDesc"
                    name="postDesc"
                    className={`textarea h-24 textarea-bordered w-full ${
                      userTheme !== "light" && "bg-gray-700"
                    }`}
                    value={formik.values.postDesc}
                    onChange={formik.handleChange}
                    placeholder="Nêu cảm nghĩ của bạn lúc này"
                  ></textarea>
                  {formik.errors.postDesc && formik.touched.postDesc && (
                    <small className="text-red-500 p-1 -bottom-7 absolute">
                      {formik.errors.postDesc}
                    </small>
                  )}
                </div>
              </div>
              <div className="pb-8">
                <label
                  htmlFor="videoLink"
                  className={`font-semibold pb-1 label`}
                >
                  <span
                    className={`label-text ${
                      userTheme === "light" ? "text-gray-700" : "text-yellow-50"
                    }`}
                  >
                    Link Youtube
                  </span>
                  <p
                    onClick={() => {
                      let id = formik.values.videoLink.split("=")[1];
                      setVideoId(id);
                    }}
                    className={`label-text-alt cursor-pointer ${
                      userTheme === "light" ? "text-gray-700" : "text-yellow-50"
                    }`}
                  >
                    Xem trước
                  </p>
                </label>
                <div className="flex relative">
                  <input
                    id="videoLink"
                    className={`input input-bordered w-full ${
                      userTheme !== "light" && "bg-gray-700"
                    }`}
                    type="text"
                    value={formik.values.videoLink}
                    onChange={formik.handleChange}
                    placeholder="https://...."
                    name="videoLink"
                    disabled={imgUrl ? true : false}
                  />
                  {formik.errors.videoLink &&
                    formik.touched.videoLink &&
                    !formik.values.image && (
                      <small className="text-red-500 p-1 -bottom-7 absolute">
                        {formik.errors.videoLink}
                      </small>
                    )}
                </div>
              </div>
              <button type="submit" className="mt-6 w-full my-btn-gradient">
                {isEdit ? "Cập nhật" : "Đăng bài viết"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
