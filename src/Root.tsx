import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import { App } from './App';
import { Chat } from './pages/Chat/Chat';
import { Home } from './pages/Home/Home';

const socket = io('http://localhost:5000');

export const Root: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home socket={socket} />} />
        <Route path="chat" element={<Chat socket={socket} />} />
      </Route>
    </Routes>
  </HashRouter>
);
