import React from "react";
import loadAnimation from "../assets/cat_loading.json";
import { Lottie } from "@crello/react-lottie";

const Loading = (props) => {
  const { height, width } = props;
  return (
    <Lottie
      config={{ animationData: loadAnimation, autoplay: true, loop: true }}
      height={height}
      width={width}
      className="m-auto z-30"
    ></Lottie>
  );
};

export default Loading;
