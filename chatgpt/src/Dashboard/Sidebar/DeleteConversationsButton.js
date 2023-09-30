import React from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import { deleteConversations } from '../dashboardSlice';
import { deleteConversationsFromSocket } from '../../socketConnection/socketConn';

const DeleteConversationsButton = () => {
  const dispatch = useDispatch();

  const handleDeleteConversations = () => {
    dispatch(deleteConversations([]));
    deleteConversationsFromSocket();
  };

  return (
    <div className='list_item delete_conv_button' onClick={handleDeleteConversations}>
    <div className='list_item_icon'>
      <AiOutlineDelete color='white' />
    </div>
    <p className='list_item_text'>Delete Conversations</p>
  </div>
  )
};

export default DeleteConversationsButton;
