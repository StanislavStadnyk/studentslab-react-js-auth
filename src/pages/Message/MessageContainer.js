import React from 'react';

import Message from './Message';

const MessageContainer = ({ data, sendMessage }) => {
  if (!data) {
    return null;
  }

  return <Message list={data} sendMessage={sendMessage} />;
};

export default MessageContainer;
