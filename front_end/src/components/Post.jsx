import React from "react";
import { faThumbsUp, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PostMenu, YoutubeEmbedded } from ".";
import { Link } from "react-router-dom";

const Post = () => {
  return (
    <div className="rounded-lg border border-opacity-70 w-full m-4 bg-white mx-auto shadow-sm">
      <div className="w-full flex justify-between p-3 border-b relative">
        <div className="flex items-center">
          <div className="rounded-full h-10 w-10 bg-gray-50 border-2 border-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src="https://res.cloudinary.com/mrafternoon184/image/upload/v1638073308/ltwnc/user_icon_lp4u7l.png"
              alt="profilepic"
            />
          </div>
          <Link to="/" className="pt-1 ml-2 font-bold text-sm flex flex-col">
            Mr.Afternoon
            <small className="font-thin opacity-70 flex items-center space-x-1">
              <span>11/11/2021</span>
              <span className="text-gray-400">
                <FontAwesomeIcon icon={faClock} />
              </span>
            </small>
          </Link>
        </div>
        <PostMenu />
      </div>
      <div className="bg-gradient-to-br from-red-50 to-indigo-50">
        {/* <img
          alt="alt"
          className="object-contain w-full"
          src="https://fiveflower.vn/wp-content/uploads/2020/11/Five-Flower-Slider1.jpg"
        /> */}
        <YoutubeEmbedded height="360px" embedId="kYRc7PsvLLI" />
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
            <Link to="/" className="font-medium mr-2">
              Mr.Afternoon
            </Link>
            Lord of the Rings is my favorite film-series. One day I'll make my
            way to New Zealand to visit the Hobbiton set!
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
