import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createNewPost } from "../redux/slices";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const InputPost = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userTheme } = useSelector((state) => state.responsive);
  const { isPostFetching, isPostSuccess } = useSelector((state) => state.post);
  const [postCaption, setPostCaption] = useState("");
  const handlePost = () => {
    if (postCaption) {
      dispatch(createNewPost({ postDesc: postCaption }));
      setPostCaption("");
    }
  };
  useEffect(() => {
    if (isPostSuccess) {
      history.push("/");
    }
  }, [history, isPostSuccess]);
  return (
    <div className="col-span-12 sm:col-span-12 md:col-span-8 lg:pr-3">
      <div className="flex items-center space-x-2 lg:space-x-4">
        <input
          placeholder="Bạn đang nghĩ gì?"
          className={`input input-bordered flex-1 text-md rounded-full ${
            userTheme !== "light" && "bg-gray-800 text-yellow-50"
          }`}
          value={postCaption}
          onChange={(e) => setPostCaption(e.target.value)}
        />
        <button
          className={` ${
            isPostFetching ? "btn rounded-full" : "my-btn-gradient"
          }`}
          onClick={() => handlePost()}
          disabled={isPostFetching}
        >
          Đăng bài
        </button>
      </div>
    </div>
  );
};

export default InputPost;
