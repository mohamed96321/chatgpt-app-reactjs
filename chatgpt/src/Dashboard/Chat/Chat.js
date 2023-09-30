import React from 'react';
import { useSelector } from 'react-redux';

import NewMessageInput from './NewMessageInput';
import Messages from './Messages';

const ChatLogo = () => {
  return (
    <div className='chat_gpt_logo_container'>
      <p className='chat_gpt_logo'>ChatGPT</p>
    </div>
  );
};

const Chat = () => {
  const selectedConversationId = useSelector(
    state => state.dashboard.selectedConversationId
  );

  return (
    <div className='chat_container'>
      {
        !selectedConversationId ? (
          <ChatLogo />
        ) : (
          <div className='chat_selected_container'>
            <Messages />
            <NewMessageInput />
          </div>    
        )}
    </div>
  )
};

export default Chat;
