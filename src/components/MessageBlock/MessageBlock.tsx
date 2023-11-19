import React, { useState } from 'react'
import { Socket } from 'socket.io-client'
import './MessageBlock.css'

type Props = {
  socket: Socket;
}

export const MessageBlock: React.FC<Props> = ({ socket }) => {
  const [message, setMessage] = useState('');

  const isTyping = () => {
    socket.emit('typing', `${localStorage.getItem('user')} is typing...`);
  }

  const sendHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim() || !localStorage.getItem('user')) {
      return;
    }

    const newMessage = {
      id: `${socket.id}-${Math.random()}`,
      socketId: socket.id,
      text: message,
      name: localStorage.getItem('user'),
    }

    socket.emit('message', newMessage);

    setMessage('');
  }

  const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendHandler(e as any);
    } else {
      isTyping();
    }
  }

  return (
    <div className="message-block">
      <form className="message-block__form" onSubmit={sendHandler}>
        <textarea
          className="mb10"
          placeholder="Write a message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={keyDownHandler}
        ></textarea>

        <button className="btn btn-block btn-success">
          Send a message
        </button>
      </form>
    </div>
  )
}
