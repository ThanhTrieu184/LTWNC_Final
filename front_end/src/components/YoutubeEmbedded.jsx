import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbedded = ({ width, height, embedId }) => {
  return (
    <iframe
      width={width ? width : "100%"}
      height={height ? height : "100%"}
      className=""
      src={`https://www.youtube-nocookie.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  );
};

YoutubeEmbedded.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbedded;
