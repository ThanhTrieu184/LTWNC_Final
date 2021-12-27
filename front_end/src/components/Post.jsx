import React from "react";
import { faHeart, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommentSection, PostMenu, YoutubeEmbedded } from ".";
import { Link } from "react-router-dom";
import { formatDateFromNow } from "../utils/formatDate";
import { useSelector } from "react-redux";

const Post = ({ post }) => {
  const { userTheme } = useSelector((state) => state.responsive);
  return (
    <div
      className={`rounded-lg border border-opacity-70 w-full m-4 ${
        userTheme === "light"
          ? "bg-white"
          : "bg-gray-800 border-gray-700 text-yellow-50"
      }  mx-auto shadow-sm transition duration-500`}
    >
      <div
        className={`w-full flex justify-between p-3 border-b ${
          userTheme !== "light" && "border-gray-700"
        } relative`}
      >
        <div className="flex items-center">
          <div
            className={`rounded-full border bg-gray-50 flex items-center justify-center overflow-hidden`}
          >
            <img
              src={
                post.posted_by?.image_url
                  ? post.posted_by.image_url
                  : "https://res.cloudinary.com/mrafternoon184/image/upload/v1638073308/ltwnc/user_icon_lp4u7l.png"
              }
              className="rounded-full h-10 w-10"
              alt="profilepic"
            />
          </div>
          <Link
            to={`/users/${post.posted_by?._id}/profile`}
            className="pt-1 ml-2 font-bold text-sm flex flex-col"
          >
            {post.posted_by?.username}
            <small className="font-thin opacity-70 flex items-center space-x-1">
              <span className="opacity-50">
                <FontAwesomeIcon icon={faClock} />
              </span>
              <span>{formatDateFromNow(post.posted_date)}</span>
            </small>
          </Link>
        </div>
        <PostMenu post={post} />
      </div>
      <div className="bg-gradient-to-br from-red-50 to-indigo-50">
        {post.post_image_url ? (
          <img
            alt="alt"
            className="object-contain w-full"
            src={post.post_image_url}
          />
        ) : (
          post.post_video_id && (
            <YoutubeEmbedded height="360px" embedId={post.post_video_id} />
          )
        )}
      </div>
      <div
        className={`px-3 pb-2 border-t ${
          userTheme !== "light" && "border-gray-700"
        }`}
      >
        <div className="pt-2">
          <span className="text-sm text-red-400 font-medium">
            <FontAwesomeIcon icon={faHeart} /> 0 lượt thích
          </span>
        </div>
        <div className="pt-2 pb-4">
          <div className="mb-2 text-sm">
            <Link
              to={`/users/${post.posted_by?._id}/profile`}
              className="font-medium mr-2"
            >
              {post.posted_by?.username}
            </Link>
            {post.post_caption}
          </div>
        </div>
        <CommentSection postId={post._id} />
      </div>
    </div>
  );
};

export default Post;
