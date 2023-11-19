import React, { useCallback, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { Body } from '../../components/Body/Body'
import { MessageBlock } from '../../components/MessageBlock/MessageBlock'
import { SideBar } from '../../components/SideBar/Sidebar'
import { Message } from '../../utils/types'
import './Chat.css'

type Props = {
  socket: Socket
}

export const Chat: React.FC<Props> = ({ socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState('');

  const handleResponse = useCallback((data: Message) => {
    setMessages((prevMesages) => [...prevMesages, data]);
  }, []);

  useEffect(() => {
    socket.on('response', handleResponse);

    return () => {
      socket.off('response', handleResponse);
    }
  }, [socket, handleResponse]);

  useEffect(() => {
    socket.on('responseTyping', (data) => {
      setStatus(data);

      setTimeout(() => {
        setStatus('');
      }, 1500);
    });
  }, [socket]);

  return (
    <div className="chat bg-dark">
      <SideBar socket={socket} />

      <main className="main">
        <Body
          messages={messages}
          socket={socket}
          status={status}
        />

        <MessageBlock socket={socket} />
      </main>
    </div>
  )
}
