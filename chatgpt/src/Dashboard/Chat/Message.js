import React, { useEffect, useRef, useState } from 'react';
import { GrUser } from 'react-icons/gr';
import { FcMindMap } from 'react-icons/fc';

const SlowText = props => {
  const { speed, text } = props;
  const [placeholder, setPlaceHolder] = useState(text[0])
  const index = useRef(0);
  useEffect(() => {
    function tick() {
      index.current++;
      setPlaceHolder(prev => prev + text[index.current]);
    }
    if (index.current < text.length - 1) {
      let addChar = setInterval(tick, speed);
      return () => clearInterval(addChar);
    }
  }, [placeholder, speed, text]);
  return <span>{placeholder}</span>
};

const Message = ({ content, aiMessage, animate }) => {
  return (
    <div className='message_container'
      style={{ background: aiMessage ? 'rbg(247, 247, 248)' : 'white'}}
    >
      <div className='message_avater_container'>
        {aiMessage ? <FcMindMap /> : <GrUser />}
      </div>
      <p className='message_text'>
        {animate ? <SlowText speed={20} text={content} /> : content}
      </p>
    </div>
  )
};

export default Message;
