import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'react-avatar';
import { setMessages, clearExtraMessages } from '../utils/liveChatSlice';
import { generateRandomName, getRandomMessage } from './helper';

function LiveChat() {
  const messages = useSelector((store) => store.liveChat.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(setMessages({ name: generateRandomName(), messages: getRandomMessage() }));
    }, 2000);

    const cleanupTimer = setInterval(() => {
      dispatch(clearExtraMessages());
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(cleanupTimer);
    };
  }, [dispatch]);

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index} className='flex mb-2'>
          <div className='pr-2 flex-shrink-0'>
            <Avatar size='28px' round name={msg.name} />
          </div>
          <div className='flex flex-col'>
            <div className='flex'>
              <h2 className='text-white/40 font-bold text-sm mr-2'>{msg.name}</h2>
              <pre className='text-sm whitespace-pre-wrap'>{msg.messages}</pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LiveChat;