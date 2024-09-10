import React from "react";
const Loading = () => {
  return (
    <div className="message-wrap" id="message-wrap">
      <div className="message loading-placeholder" id="loading_message"></div>
      <div
        className="message myMessage loading-placeholder"
        id="loading_message"
      ></div>
      <div className="message loading-placeholder" id="loading_message"></div>
      <div
        className="message myMessage loading-placeholder"
        id="loading_message"
      ></div>
      <div className="message loading-placeholder" id="loading_message"></div>
    </div>
  );
};

export default Loading;
