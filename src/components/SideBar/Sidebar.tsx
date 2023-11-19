import React, { useCallback, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client'
import { User } from '../../utils/types';
import './SideBar.css'

type Props = {
  socket: Socket
}

export const SideBar: React.FC<Props> = ({ socket }) => {
  const [users, setUsers] = useState<User[]>([]);

  const handleResponse = useCallback((data: User[]) => {
    setUsers(data);
  }, []);

  useEffect(() => {
    socket.on('responseNewUser', handleResponse);

    return () => {
      socket.off('responseNewUser', handleResponse);
    }
  }, [socket]);

  const preparedUsers = users.filter((value, index, self) => {
    return index === self.findIndex((t) => (
      t.user === value.user && t.socketId === value.socketId
    ))
  })

  return (
    <div className="sidebar bg-dark">
      <h4 className="title">Users</h4>

      <ul className="sidebar__list mb10">
        {preparedUsers.map(user => (
          <li key={user.socketId}>
            {user.user}
          </li>
        ))}
      </ul>
    </div>
  )
}
