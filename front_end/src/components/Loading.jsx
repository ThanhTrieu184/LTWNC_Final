import React from "react";
import Lottie from "react-lottie";
import * as loadAnimation from "../assets/loading.json";

const Loading = (props) => {
  const { height, width } = props;

  const defaultLoading = {
    loop: true,
    autoplay: true,
    animationData: loadAnimation.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultLoading} height={height} width={width} />;
};

export default Loading;
