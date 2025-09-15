import { createContext, useState, useEffect } from 'react';
import { getUsers } from '../api/userService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users,setUsers,fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};
