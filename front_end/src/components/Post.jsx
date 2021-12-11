import React from "react";
import { faThumbsUp, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PostMenu, YoutubeEmbedded } from ".";
import { Link } from "react-router-dom";
import { formatDateFromNow } from "../utils/formatDate";

const Post = ({ post }) => {
  return (
    <div className="rounded-lg border border-opacity-70 w-full m-4 bg-white mx-auto shadow-sm">
      <div className="w-full flex justify-between p-3 border-b relative">
        <div className="flex items-center">
          <div className="rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={
                post.posted_by.image_url
                  ? post.posted_by.image_url
                  : "https://res.cloudinary.com/mrafternoon184/image/upload/v1638073308/ltwnc/user_icon_lp4u7l.png"
              }
              className="rounded-full h-10 w-10"
              alt="profilepic"
            />
          </div>
          <Link
            to={`/users/${post.posted_by._id}/profile`}
            className="pt-1 ml-2 font-bold text-sm flex flex-col"
          >
            {post.posted_by.username}
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
          <YoutubeEmbedded height="360px" embedId={post.post_video_id} />
        )}
      </div>
      <div className="px-3 pb-2 border-t">
        <div className="pt-2">
          <i className="far fa-heart cursor-pointer"></i>
          <span className="text-sm text-blue-400 font-medium">
            <FontAwesomeIcon icon={faThumbsUp} /> 12 likes
          </span>
        </div>
        <div className="pt-1">
          <div className="mb-2 text-sm">
            <Link
              to={`/users/${post.posted_by._id}/profile`}
              className="font-medium mr-2"
            >
              {post.posted_by.username}
            </Link>
            {post.post_caption}
          </div>
        </div>
        <div className="text-sm mt-4 mb-2 text-gray-400 cursor-pointer font-medium">
          View all 14 comments
        </div>
        <div className="mb-2">
          <div className="mb-2 text-sm">
            <span className="font-medium mr-2">Mr.Manh</span> Dude! How cool! I
            went to New Zealand last summer and had a blast taking the tour! So
            much to see! Make sure you bring a good camera when you go!
          </div>
          <div className="mb-2 text-sm">
            <span className="font-medium mr-2">Mr.Hieu</span> Dude! How cool! I
            went to New Zealand last summer and had a blast taking the tour! So
            much to see! Make sure you bring a good camera when you go!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
