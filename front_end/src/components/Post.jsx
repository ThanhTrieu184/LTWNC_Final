import {
  faEllipsisH,
  faThumbsUp,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ggIcon from "../assets/img/gg.png";

export const Post = () => {
  return (
    <div className="rounded-lg border w-full m-4 bg-white mx-auto shadow-sm">
      <div className="w-full flex justify-between p-3 border-b">
        <div className="flex items-center">
          <div className="rounded-full h-10 w-10 bg-gray-50 border-2 border-gray-100 flex items-center justify-center overflow-hidden">
            <img src={ggIcon} alt="profilepic" />
          </div>
          <a href="/" className="pt-1 ml-2 font-bold text-sm flex flex-col">
            Mr.Afternoon
            <small className="font-thin opacity-70 flex items-center space-x-1">
              <span>11/11/2021</span>
              <span className="text-gray-400">
                <FontAwesomeIcon icon={faClock} />
              </span>
            </small>
          </a>
        </div>
        <span className="px-2 my-auto cursor-pointer">
          <FontAwesomeIcon icon={faEllipsisH} />
        </span>
      </div>
      <div className="bg-gradient-to-br from-red-50 to-indigo-50">
        <img
          alt="alt"
          className="object-contain max-h-96 w-full"
          src={ggIcon}
        />
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
            <a href="/" className="font-medium mr-2">
              Mr.Afternoon
            </a>{" "}
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
