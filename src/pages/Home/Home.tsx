import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import './Home.css'

type Props = {
  socket: Socket
}

export const Home: React.FC<Props> = ({ socket }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    localStorage.setItem('user', name);
    socket.emit('newUser', { user: name, socketId: socket.id });
    navigate('/chat');
  }

  return (
    <form className="bg-light form" onSubmit={handleSubmit}>
      <h2>Enter to the chat</h2>

      <div className="input-container">
        <label htmlFor="user" className="mb10">User: </label>
        <input
          type="text"
          id="user"
          className="mb10"
          value={name}
          onChange={e => setName(e.target.value)}
        />

      <button type="submit" className="btn btn-block btn-primary">
        Log in
      </button>
      </div>
    </form>
  )
}
