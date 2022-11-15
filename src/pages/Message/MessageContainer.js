import React from "react";

import Message from "./Message";

const MessageContainer = ({ data }) => {
  if (!data) {
    return null;
  }

  return <Message list={data} />;
};

export default MessageContainer;
