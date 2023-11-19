import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Socket } from 'socket.io-client'
import { Message } from '../../utils/types';
import './Body.css'

type Props = {
  messages: Message[];
  socket: Socket;
  status: string;
}

export const Body: React.FC<Props> = ({ messages, socket, status }) => {
  const navigate = useNavigate();

  const handleLeave = () => {
    localStorage.removeItem('user');
    socket.emit('logout', socket.id);
    navigate('/');
  }

  return (
    <div className="body bg-dark">
      <header className="header">
        <button className="btn btn-block btn-danger" onClick={handleLeave}>
          Leave the chat
        </button>
      </header>

      <div className="container bg-light mb10">
        {messages.map(element => (
          <div className="chats mb10" key={element.id}>
            <p className={cn({
              'sender-name': element.name === localStorage.getItem('user')
            })}>
              {element.name === localStorage.getItem('user') ? 'You' : element.name}
            </p>

            <div className={cn({
              'message-sender': element.name === localStorage.getItem('user'),
              'message-recipient': element.name !== localStorage.getItem('user')
            })}>
              <p>{element.text}</p>
            </div>
          </div>
        ))}

        <div className="status">
          <p>{status}</p>
        </div>
      </div>
    </div>
  )
}
