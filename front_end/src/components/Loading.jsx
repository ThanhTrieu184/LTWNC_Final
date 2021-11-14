import React from "react";
import loadAnimation from "../assets/loading.json";
import { Lottie } from "@crello/react-lottie";

const Loading = (props) => {
  const { height, width } = props;
  return (
    <Lottie
      config={{ animationData: loadAnimation, autoplay: true, loop: true }}
      height={height}
      width={width}
      style={{ margin: "auto" }}
    ></Lottie>
  );
};

export default Loading;
