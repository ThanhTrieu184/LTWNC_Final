import React from "react";
import loadAnimation from "../assets/cat_loading.json";
import announcementAnimation from "../assets/announcement.json";
import { Lottie } from "@crello/react-lottie";

const Loading = (props) => {
  const { height, width, type } = props;
  return (
    <Lottie
      config={{
        animationData: type ? announcementAnimation : loadAnimation,
        autoplay: true,
        loop: true,
      }}
      height={height}
      width={width}
      className="m-auto z-30"
    ></Lottie>
  );
};

export default Loading;
